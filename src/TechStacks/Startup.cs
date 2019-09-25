using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Funq;
using ServiceStack;
using ServiceStack.Admin;
using ServiceStack.Api.OpenApi;
using ServiceStack.Auth;
using ServiceStack.Data;
using ServiceStack.Logging;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Validation;
using TechStacks.ServiceModel.Types;
using TechStacks.ServiceInterface;
using TechStacks.ServiceInterface.Admin;
using TechStacks.ServiceInterface.Auth;
using TechStacks.ServiceInterface.Notifications;

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
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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
            : base("TechStacks!", typeof(TechnologyServices).Assembly) {}

        private static ILog log;

        // Configure your AppHost with the necessary configuration and dependencies your App needs
        public override void Configure(Container container)
        {
//            LogManager.LogFactory = new ConsoleLogFactory(debugEnabled:true);
            log = LogManager.GetLogger(typeof(AppHost));

            GetPlugin<NativeTypesFeature>().MetadataTypesConfig.BaseUrl = "https://www.techstacks.io";

            var debugMode = AppSettings.Get(nameof(HostConfig.DebugMode), false);
            SetConfig(new HostConfig
            {
                AddRedirectParamsToQueryString = true,
                DebugMode = debugMode,
            });

            JsConfig.Init(new ServiceStack.Text.Config { DateHandler = DateHandler.ISO8601 });

            var dbFactory = new OrmLiteConnectionFactory(
              Environment.GetEnvironmentVariable("TECHSTACKS_DB") ?? AppSettings.GetString("OrmLite.ConnectionString"),
              PostgreSqlDialect.Provider);
            dbFactory.RegisterDialectProvider(nameof(PostgreSqlDialect), PostgreSqlDialect.Provider);

            container.Register<IDbConnectionFactory>(dbFactory);

            // enable server-side rendering, see: https://sharpscript.net
            Plugins.Add(new SharpPagesFeature());

            Plugins.Add(new AuthFeature(() => new CustomUserSession(), new IAuthProvider[]
            {
                new TwitterAuthProvider(AppSettings),
                new GithubAuthProvider(AppSettings),
                new JwtAuthProvider(AppSettings)
                {
                    RequireSecureConnection = false,
                    IncludeJwtInConvertSessionToTokenResponse = true,
                    CreatePayloadFilter = (payload, session) =>
                    {
                        var githubAuth = session.ProviderOAuthAccess.Safe()
                            .FirstOrDefault(x => x.Provider == "github");
                        payload["ats"] = githubAuth?.AccessTokenSecret;
                    },
                    PopulateSessionFilter = (session, obj, req) =>
                    {
                        session.ProviderOAuthAccess = new List<IAuthTokens>
                        {
                            new AuthTokens { Provider = "github", AccessTokenSecret = obj["ats"] }
                        };
                    }
                },
                new DiscourseAuthProvider {
                    Provider = "servicestack",
                    DiscourseUrl = "https://forums.servicestack.net",
                },
            }){
                HtmlRedirect = "/"
            });

            container.Register<IMarkdownProvider>(c =>
                new GitHubApiMarkdownProvider(Environment.GetEnvironmentVariable("GITHUB_AUTH")));

            container.Register(new TwitterUpdates(
                AppSettings.GetString("WebStacks.ConsumerKey"),
                AppSettings.GetString("WebStacks.ConsumerSecret"),
                AppSettings.GetString("WebStacks.AccessToken"),
                AppSettings.GetString("WebStacks.AccessSecret")) {
                    BaseUrl = AppSettings.GetString("PublicBaseUrl"),
                });

            container.Register(new EmailProvider {
              UserName = Environment.GetEnvironmentVariable("TECHSTACKS_SMTP_USER") ?? AppSettings.GetString("smtp.UserName"),
              Password = Environment.GetEnvironmentVariable("TECHSTACKS_SMTP_PASS") ?? AppSettings.GetString("smtp.Password"),
              EnableSsl = true,
              Host = AppSettings.GetString("smtp.Host"),
              Port = AppSettings.Get<int>("smtp.Port"),
              Bcc = AppSettings.GetString("smtp.Bcc"),
            });

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

                var baseUrl = "https://techstacks.io";

                Plugins.Add(new SitemapFeature
                {
                    SitemapIndex = {
                        new Sitemap {
                            Location = baseUrl + "/sitemap-techstacks.xml",
                            AtPath = "/sitemap-techstacks.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<TechnologyStack>().OrderByDescending(x => x.LastModified))
                                .Map(x => new SitemapUrl
                                {
                                    Location = baseUrl + new ClientTechnologyStack { Slug = x.Slug }.ToAbsoluteUri(),
                                    LastModified = x.LastModified,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                }),
                        },
                        new Sitemap {
                            Location = baseUrl + "/sitemap-technologies.xml",
                            AtPath = "/sitemap-technologies.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<Technology>().OrderByDescending(x => x.LastModified))
                                .Map(x => new SitemapUrl
                                {
                                    Location = baseUrl + new ClientTechnology { Slug = x.Slug }.ToAbsoluteUri(),
                                    LastModified = x.LastModified,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                })
                        },
                        new Sitemap
                        {
                            Location = baseUrl + "/sitemap-users.xml",
                            AtPath = "/sitemap-users.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<CustomUserAuth>().OrderByDescending(x => x.ModifiedDate))
                                .Map(x => new SitemapUrl
                                {
                                    Location = baseUrl + new ClientUser { UserName = x.UserName }.ToAbsoluteUri(),
                                    LastModified = x.ModifiedDate,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                })
                        },
                        new Sitemap {
                            Location = baseUrl + "/sitemap-organizations.xml",
                            AtPath = "/sitemap-organizations.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<Organization>().Where(x => x.Deleted == null).OrderByDescending(x => x.Modified))
                                .Map(x => new SitemapUrl
                                {
                                    Location = baseUrl + $"/{x.Slug}",
                                    LastModified = x.Modified,
                                    ChangeFrequency = SitemapFrequency.Weekly,
                                })
                        },
                        new Sitemap {
                            Location = baseUrl + "/sitemap-posts.xml",
                            AtPath = "/sitemap-posts.xml",
                            LastModified = DateTime.UtcNow,
                            UrlSet = db.Select(db.From<Post>().Where(x => x.Type != PostType.Question && x.Deleted == null && x.Hidden == null).Take(1000).OrderByDescending(x => x.Modified))
                                .Map(x => new SitemapUrl
                                {
                                    Location = baseUrl + $"/posts/{x.Id}/{x.Slug}",
                                    LastModified = x.Modified,
                                    ChangeFrequency = SitemapFrequency.Hourly,
                                })
                        }
                    }
                });
            }

            Plugins.Add(new CorsFeature(
                allowOriginWhitelist: new[] { "https://techstacks.io", "https://www.techstacks.io",
                  "http://localhost:3000", "http://localhost:16325", "http://localhost:8080", "http://null.jsbin.com", "http://run.plnkr.co" },
                allowCredentials: true,
                allowedHeaders: "Content-Type, Allow, Authorization",
                maxAge: 60 * 60)); //Cache OPTIONS permissions

            Plugins.Add(new ValidationFeature());
            container.RegisterValidators(typeof(AppHost).Assembly);
            container.RegisterValidators(typeof(TechnologyServices).Assembly);

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
            });
            Plugins.Add(new AdminFeature());
            Plugins.Add(new OpenApiFeature());

            RegisterTypedRequestFilter<IRegisterStats>((req,res,dto) =>
                dbFactory.RegisterPageView(dto.GetStatsId()));

            if (Config.DebugMode)
            {
                Plugins.Add(new LispReplTcpServer {
                    ScriptMethods = {
                        new DbScriptsAsync()
                    }
                });
            }

            container.Register<IMessageService>(c => new BackgroundMqService());
            var mqServer = container.Resolve<IMessageService>();

            mqServer.RegisterHandler<SendNotification>(ExecuteMessage, 4);
            mqServer.RegisterHandler<SendSystemEmail>(ExecuteMessage);
            mqServer.RegisterHandler<SendEmail>(ExecuteMessage);

            AfterInitCallbacks.Add(host => {
                mqServer.Start();
                ExecuteService(new RetryPendingNotifications());
            });
        }
    }
}
