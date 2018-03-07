using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Funq;
using ServiceStack;
using ServiceStack.Admin;
using ServiceStack.Api.OpenApi;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.Host.Handlers;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Validation;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;
using TechStacks.ServiceInterface;

namespace TechStacks
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration) => Configuration = configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseServiceStack(new AppHost
            {
                AppSettings = new NetCoreAppSettings(Configuration)
            });
        }
    }

    public class AppHost : AppHostBase
    {
        public AppHost() 
            : base("TechStacks", typeof(TechnologyServices).Assembly) {}

        // Configure your AppHost with the necessary configuration and dependencies your App needs
        public override void Configure(Container container)
        {
            Plugins.Add(new TemplatePagesFeature()); // enable server-side rendering, see: http://templates.servicestack.net

            var debugMode = AppSettings.Get(nameof(HostConfig.DebugMode), false);
            SetConfig(new HostConfig
            {
                AddRedirectParamsToQueryString = true,
                DebugMode = true,
            });

            JsConfig.DateHandler = DateHandler.ISO8601;

            var dbFactory = new OrmLiteConnectionFactory(
              Environment.GetEnvironmentVariable("TECHSTACKS_DB") ?? AppSettings.GetString("OrmLite.ConnectionString"),
              PostgreSqlDialect.Provider);
            dbFactory.RegisterDialectProvider(nameof(PostgreSqlDialect), PostgreSqlDialect.Provider);

            container.Register<IDbConnectionFactory>(dbFactory);

            this.Plugins.Add(new AuthFeature(() => new CustomUserSession(), new IAuthProvider[]
            {
                new TwitterAuthProvider(AppSettings), 
                new GithubAuthProvider(AppSettings),
                new JwtAuthProvider(AppSettings) { RequireSecureConnection = false },
            }){
                HtmlRedirect = "/"
            });

            container.Register<IMarkdownProvider>(c =>
                new GitHubApiMarkdownProvider(Environment.GetEnvironmentVariable("GITHUB_AUTH")));

            container.Register(new TwitterUpdates(
                AppSettings.GetString("WebStacks.ConsumerKey"),
                AppSettings.GetString("WebStacks.ConsumerSecret"),
                AppSettings.GetString("WebStacks.AccessToken"),
                AppSettings.GetString("WebStacks.AccessSecret")));

            var authRepo = new OrmLiteAuthRepository<CustomUserAuth, UserAuthDetails>(dbFactory);
            container.Register<IUserAuthRepository>(authRepo);
            authRepo.InitSchema();

            using (var db = dbFactory.OpenDbConnection())
            {
                db.CreateTableIfNotExists<TechnologyStack>();
                db.CreateTableIfNotExists<Technology>();
                db.CreateTableIfNotExists<TechnologyChoice>();
                db.CreateTableIfNotExists<UserFavoriteTechnologyStack>();
                db.CreateTableIfNotExists<UserFavoriteTechnology>();

                Plugins.Add(new SitemapFeature
                {
                    SitemapIndex = {
                        new Sitemap {
                            AtPath = "/sitemap-techstacks.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<TechnologyStack>().OrderByDescending(x => x.LastModified))
                                .Map(x => new SitemapUrl
                                {
                                    Location = new ClientTechnologyStack { Slug = x.Slug }.ToAbsoluteUri(),
                                    LastModified = x.LastModified,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                }),
                        },
                        new Sitemap {
                            AtPath = "/sitemap-technologies.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<Technology>().OrderByDescending(x => x.LastModified))
                                .Map(x => new SitemapUrl
                                {
                                    Location = new ClientTechnology { Slug = x.Slug }.ToAbsoluteUri(),
                                    LastModified = x.LastModified,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                })
                        },
                        new Sitemap
                        {
                            AtPath = "/sitemap-users.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<CustomUserAuth>().OrderByDescending(x => x.ModifiedDate))
                                .Map(x => new SitemapUrl
                                {
                                    Location = new ClientUser { UserName = x.UserName }.ToAbsoluteUri(),
                                    LastModified = x.ModifiedDate,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                })
                        }
                    }
                });
            }

            Plugins.Add(new ValidationFeature());
            Plugins.Add(new AutoQueryMetadataFeature
            {
                AutoQueryViewerConfig =
                {
                    ServiceDescription = "Discover what technologies were used to create popular Websites and Apps",
                    ServiceIconUrl = "/img/app/logo-76.png",
                    BackgroundColor = "#0095F5",
                    TextColor = "#fff",
                    LinkColor = "#ffff8d",
                    BrandImageUrl = "/img/app/brand.png",
                    BrandUrl = "http://techstacks.io",
                    BackgroundImageUrl = "/img/app/bg.png",
                    IsPublic = true,
                    OnlyShowAnnotatedServices = true,
                }
            });
            Plugins.Add(new AutoQueryFeature
            {
                MaxLimit = 500,
                StripUpperInLike = false,
                ResponseFilters =
                {
                   ctx => ctx.Response.Meta["Cache"] = Stopwatch.GetTimestamp().ToString()
                }
            }.RegisterQueryFilter<QueryPosts, Post>((q, dto, req) =>
              q.And(x => x.Deleted == null)
            ));
            Plugins.Add(new AdminFeature());
            Plugins.Add(new OpenApiFeature());

            container.RegisterValidators(typeof(AppHost).Assembly);
            container.RegisterValidators(typeof(TechnologyServices).Assembly);

            RegisterTypedRequestFilter<IRegisterStats>((req,res,dto) => 
                dbFactory.RegisterPageView(dto.GetStatsId()));

            Plugins.Add(new CorsFeature(
                allowOriginWhitelist: new[] { "http://localhost", "http://localhost:8080", "http://localhost:56500", "http://test.servicestack.net", "http://null.jsbin.com" },
                allowCredentials: true,
                allowedHeaders: "Content-Type, Allow, Authorization"));        }
    }
}
