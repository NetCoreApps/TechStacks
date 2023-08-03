using Funq;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Testing;
using TechStacks.ServiceInterface;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.Tests;

public class UnitTestHost : BasicAppHost
{
    public UnitTestHost() : base(typeof(TechnologyServices).Assembly)
    {
        ServiceStack.Licensing.RegisterLicense("OSS BSD-2-Clause 2023 https://github.com/NetCoreApps/TechStacks saetukAMlCkth5Y5cwlWBGdK7iv4MteXIIooIstIMz3lrJotPYulM15WYSnGxeg1Wc42Cp0rrN0KVSfXCinncvC8750lzxz4rDB4eGuJW/1p0wcspHH8IevKJUJ/EFe5AoDihHXIOj4ITXil11/Ouc3eGC4LtQcG8U2xVdQwD4Y=");
    }

    public override void Configure(Container container)
    {
        container.Register<IDbConnectionFactory>(new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider));
        var dbFactory = container.Resolve<IDbConnectionFactory>();
        this.Plugins.Add(new AuthFeature(() => new CustomUserSession(), 
            new IAuthProvider[]
            {
                new TwitterAuthProvider(this.AppSettings),
                new GithubAuthProvider(this.AppSettings),
                new CredentialsAuthProvider(),
            }));

        var authRepo = new OrmLiteAuthRepository<CustomUserAuth, UserAuthDetails>(dbFactory);
        container.Register<IUserAuthRepository>(authRepo);
        authRepo.InitSchema();

        container.RegisterAs<OrmLiteCacheClient, ICacheClient>();
        container.Resolve<ICacheClient>().InitSchema();

        using (var db = dbFactory.OpenDbConnection())
        {
            db.CreateTableIfNotExists<TechnologyStack>();
            db.CreateTableIfNotExists<Technology>();
            db.CreateTableIfNotExists<TechnologyChoice>();
            db.CreateTableIfNotExists<UserFavoriteTechnologyStack>();
            db.CreateTableIfNotExists<UserFavoriteTechnology>();
        }

        this.Plugins.Add(new AutoQueryFeature { MaxLimit = 1000 });
    }
}

public class IntegrationTestHost : AppSelfHostBase
{
    public IntegrationTestHost()
        : base("IntegrationTestHost", typeof(TechnologyServices).Assembly)
    {
        ServiceStack.Licensing.RegisterLicense("OSS BSD-2-Clause 2023 https://github.com/NetCoreApps/TechStacks saetukAMlCkth5Y5cwlWBGdK7iv4MteXIIooIstIMz3lrJotPYulM15WYSnGxeg1Wc42Cp0rrN0KVSfXCinncvC8750lzxz4rDB4eGuJW/1p0wcspHH8IevKJUJ/EFe5AoDihHXIOj4ITXil11/Ouc3eGC4LtQcG8U2xVdQwD4Y=");
    }

    public override void Configure(Container container)
    {
        container.Register<IDbConnectionFactory>(new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider));
        var dbFactory = container.Resolve<IDbConnectionFactory>();
        this.Plugins.Add(new AuthFeature(() => new CustomUserSession(), new IAuthProvider[]
        {
            new TwitterAuthProvider(this.AppSettings),
            new GithubAuthProvider(this.AppSettings),
            new CredentialsAuthProvider(),
        }));

        var authRepo = new OrmLiteAuthRepository<CustomUserAuth, UserAuthDetails>(dbFactory);
        container.Register<IUserAuthRepository>(authRepo);
        authRepo.InitSchema();

        container.RegisterAs<OrmLiteCacheClient, ICacheClient>();
        container.Resolve<ICacheClient>().InitSchema();

        using (var db = dbFactory.OpenDbConnection())
        {
            db.CreateTableIfNotExists<TechnologyStack>();
            db.CreateTableIfNotExists<Technology>();
            db.CreateTableIfNotExists<TechnologyChoice>();
            db.CreateTableIfNotExists<UserFavoriteTechnologyStack>();
            db.CreateTableIfNotExists<UserFavoriteTechnology>();
        }

        this.Plugins.Add(new AutoQueryFeature { MaxLimit = 1000 });
    }
}