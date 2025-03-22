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
            services.AddPlugin(new AuthFeature(IdentityAuth.For<ApplicationUser,int>(options => {
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

            services.TryAddScoped(typeof(RoleManager<IdentityRole>), CreateRoleManagerAdapter<ApplicationRole>);
        });

    public static RoleManager<IdentityRole> CreateRoleManagerAdapter<TRole>(IServiceProvider services) where TRole : class
    {
        //var nativeRoleManager = services.GetRequiredService<RoleManager<TRole>>();
        var adapter = new RoleManager<IdentityRole>(
            CreateRoleStoreAdapter<TRole>(services),
            [],
            services.GetRequiredService<ILookupNormalizer>(),
            services.GetRequiredService<IdentityErrorDescriber>(),
            new Logger<RoleManager<IdentityRole>>(services.GetRequiredService<ILoggerFactory>())
        );
        return adapter;
    }

    public static IRoleStore<IdentityRole> CreateRoleStoreAdapter<TRole>(IServiceProvider services) where TRole : class
    {
        return new AdapterRoleStore<TRole>(services.GetRequiredService<IRoleStore<TRole>>());
    }

    class AdapterRoleStore<TRole>(IRoleStore<TRole> store) : IRoleStore<IdentityRole> where TRole : class
    {
        public void Dispose()
        {
        }

        public Task<IdentityResult> CreateAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> UpdateAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> DeleteAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleIdAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string?> GetRoleNameAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetRoleNameAsync(IdentityRole role, string? roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string?> GetNormalizedRoleNameAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedRoleNameAsync(IdentityRole role, string? normalizedName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityRole?> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityRole?> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
