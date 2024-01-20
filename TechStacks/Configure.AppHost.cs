using System.Data;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Validation;
using TechStacks.ServiceModel.Types;
using TechStacks.ServiceInterface;
using TechStacks.ServiceInterface.Html;
using TechStacks.ServiceInterface.Notifications;

[assembly: HostingStartup(typeof(TechStacks.AppHost))]

namespace TechStacks;

public class AppHost() : AppHostBase("TechStacks!"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context,services) => {
            // Configure ASP.NET Core IOC Dependencies
            services.AddSingleton<IMessageService>(c => new BackgroundMqService());

            var dbFactory = new OrmLiteConnectionFactory(
                Environment.GetEnvironmentVariable("TECHSTACKS_DB") ??
                context.Configuration.GetConnectionString("DefaultConnection"),
                PostgreSqlDialect.Provider);
            //dbFactory.RegisterDialectProvider(nameof(PostgreSqlDialect), PostgreSqlDialect.Provider);

            services.AddSingleton<IDbConnectionFactory>(dbFactory);

            services.RegisterValidators(typeof(AppHost).Assembly);
            services.RegisterValidators(typeof(TechnologyServices).Assembly);

            services.AddSingleton(new EmailProvider {
                UserName = Environment.GetEnvironmentVariable("TECHSTACKS_SMTP_USER") ??
                           AppSettings.GetString("smtp.UserName"),
                Password = Environment.GetEnvironmentVariable("TECHSTACKS_SMTP_PASS") ??
                           AppSettings.GetString("smtp.Password"),
                EnableSsl = true,
                Host = AppSettings.GetString("smtp.Host"),
                Port = AppSettings.Get<int>("smtp.Port"),
                Bcc = AppSettings.GetString("smtp.Bcc"),
            });

            services.AddPlugin(new AutoQueryFeature {
                MaxLimit = 500,
                StripUpperInLike = false,
                IncludeTotal = true,
            });

            // enable server-side rendering, see: https://sharpscript.net
            services.AddPlugin(new SharpPagesFeature {
                HtmlExtension = "htm",
                ScriptMethods = {
                    new AppScriptMethods(DefaultCache, dbFactory)
                }
            });
        });

    // Configure your AppHost with the necessary configuration and dependencies your App needs
    public override void Configure()
    {
        SetConfig(new HostConfig {
            // UseSameSiteCookies = true,
            AddRedirectParamsToQueryString = true,
        });

        JsConfig.Init(new Config {
            DateHandler = DateHandler.ISO8601
        });

        using var db = GetDbConnection();
        Plugins.Add(CreateSiteMap(db, baseUrl:"https://techstacks.io"));

        RegisterTypedRequestFilterAsync<IRegisterStats>(async (req, res, dto) =>
        {
            using var db = GetDbConnection(req);
            await db.RegisterPageViewAsync(dto.GetStatsId());
        });
    }

    SitemapFeature CreateSiteMap(IDbConnection db, string baseUrl) =>
        new() {
            SitemapIndex = {
                new Sitemap {
                    Location = baseUrl + "/sitemap-techstacks.xml",
                    AtPath = "/sitemap-techstacks.xml",
                    LastModified = DateTime.UtcNow,
                    UrlSet = db.Select(db.From<TechnologyStack>().OrderByDescending(x => x.LastModified))
                        .Map(x => new SitemapUrl {
                            Location = baseUrl + new ClientTechnologyStack {Slug = x.Slug}.ToGetUrl(),
                            LastModified = x.LastModified,
                            ChangeFrequency = SitemapFrequency.Weekly,
                        }),
                },
                new Sitemap {
                    Location = baseUrl + "/sitemap-technologies.xml",
                    AtPath = "/sitemap-technologies.xml",
                    LastModified = DateTime.UtcNow,
                    UrlSet = db.Select(db.From<Technology>().OrderByDescending(x => x.LastModified))
                        .Map(x => new SitemapUrl {
                            Location = baseUrl + new ClientTechnology {Slug = x.Slug}.ToGetUrl(),
                            LastModified = x.LastModified,
                            ChangeFrequency = SitemapFrequency.Weekly,
                        })
                },
                new Sitemap {
                    Location = baseUrl + "/sitemap-organizations.xml",
                    AtPath = "/sitemap-organizations.xml",
                    LastModified = DateTime.UtcNow,
                    UrlSet = db.Select(db.From<Organization>().Where(x => x.Deleted == null)
                            .OrderByDescending(x => x.Modified))
                        .Map(x => new SitemapUrl {
                            Location = baseUrl + $"/{x.Slug}",
                            LastModified = x.Modified,
                            ChangeFrequency = SitemapFrequency.Weekly,
                        })
                },
                new Sitemap {
                    Location = baseUrl + "/sitemap-posts.xml",
                    AtPath = "/sitemap-posts.xml",
                    LastModified = DateTime.UtcNow,
                    UrlSet = db.Select(db.From<Post>()
                            .Where(x => x.Type != PostType.Question && x.Deleted == null && x.Hidden == null)
                            .Take(1000).OrderByDescending(x => x.Modified))
                        .Map(x => new SitemapUrl {
                            Location = baseUrl + $"/posts/{x.Id}/{x.Slug}",
                            LastModified = x.Modified,
                            ChangeFrequency = SitemapFrequency.Hourly,
                        })
                }
            }
        };

    public static void RegisterLicense() =>
        Licensing.RegisterLicense("OSS BSD-3-Clause 2024 https://github.com/NetCoreApps/TechStacks otNWkDy8SaBst+5+0DZ2jRhUpAXTzQil2M5/xjBVB6hX/zn6SZhuKxhZLF4VrsDfd5qPCoZmuShaxmGtLeovzMjof54vgk7+69i0icWaN5eD1aSr6hYO1eN/Lw3ee9AxQ5mDWPN8LHNk6s0zq9znAEET9y/6SM3X3FHHZ3QT1HU=");
}
