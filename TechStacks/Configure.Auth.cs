using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ServiceStack.Auth;
using ServiceStack;
using ServiceStack.Html;
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
            services.AddPlugin(new AuthFeature(IdentityAuth.For<ApplicationUser,ApplicationRole,int>(options => {
                options.SessionFactory = () => new CustomUserSession();
                options.CredentialsAuth();

                options.AdminUsersFeature(feature =>
                {
                    feature.FormLayout =
                    [
                        Input.For<ApplicationUser>(x => x.UserName, c => c.FieldsPerRow(2)),
                        Input.For<ApplicationUser>(x => x.Email, c => {
                            c.Type = Input.Types.Email;
                            c.FieldsPerRow(2);
                        }),
                        Input.For<ApplicationUser>(x => x.FirstName, c => c.FieldsPerRow(2)),
                        Input.For<ApplicationUser>(x => x.LastName, c => c.FieldsPerRow(2)),
                        Input.For<ApplicationUser>(x => x.DisplayName, c => c.FieldsPerRow(2)),
                        Input.For<ApplicationUser>(x => x.PhoneNumber, c =>
                        {
                            c.Type = Input.Types.Tel;
                            c.FieldsPerRow(2);
                        }),
                    ];
                    feature.QueryIdentityUserProperties =
                    [
                        nameof(ApplicationUser.Id),
                        nameof(ApplicationUser.DisplayName),
                        nameof(ApplicationUser.Email),
                        nameof(ApplicationUser.UserName),
                        nameof(ApplicationUser.LockoutEnd),
                    ];
                    feature.DefaultOrderBy = nameof(ApplicationUser.DisplayName);
                    feature.SearchUsersFilter = (q, query) =>
                    {
                        var queryUpper = query.ToUpper();
                        q = int.TryParse(query, out var idVal)
                            ? q.Where(x => x.Id == idVal)
                            : q.Where(x =>
                                x.DisplayName!.Contains(query) ||
                                x.NormalizedUserName!.Contains(queryUpper) ||
                                x.NormalizedEmail!.Contains(queryUpper));
                        return q;
                    };
                });

            })));
        });
}
