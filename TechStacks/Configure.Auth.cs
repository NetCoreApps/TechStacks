using ServiceStack.Auth;
using ServiceStack;
using TechStacks.Data;
using TechStacks.ServiceInterface;

[assembly: HostingStartup(typeof(TechStacks.ConfigureAuth))]

namespace TechStacks;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            Console.WriteLine("ConfigureAuth.ConfigureServices()");
            services.AddPlugin(new AuthFeature(IdentityAuth.For<ApplicationUser,int>(options => {
                options.SessionFactory = () => new CustomUserSession();
                options.CredentialsAuth();
            })));
        });
}
