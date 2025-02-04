using System.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using TechStacks.Data;
using TechStacks.Migrations;
using TechStacks.ServiceInterface;

[assembly: HostingStartup(typeof(TechStacks.ConfigureDbMigrations))]

namespace TechStacks;

public class ConfigureDbMigrations : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost => {
            var migrator = new Migrator(appHost.Resolve<IDbConnectionFactory>(), typeof(Migration1000).Assembly);
            AppTasks.Register("migrate", _ =>
            {
                var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureDbMigrations>>();

                log.LogInformation("Running EF Migrations...");
                var scopeFactory = appHost.GetApplicationServices().GetRequiredService<IServiceScopeFactory>();
                using (var scope = scopeFactory.CreateScope())
                {
                    using var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    db.Database.EnsureCreated();
                    db.Database.Migrate();
                }

                log.LogInformation("Running OrmLite Migrations...");
                migrator.Run();
            });
            AppTasks.Register("migrate.revert", args => migrator.Revert(args[0]));
            AppTasks.Register("migrate.users", _ => {
                var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureDbMigrations>>();

                log.LogInformation("Running migrate.users...");
                var scopeFactory = appHost.GetApplicationServices().GetRequiredService<IServiceScopeFactory>();
                using var scope = scopeFactory.CreateScope();
                using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                using var db = scope.ServiceProvider.GetRequiredService<IDbConnectionFactory>().Open();
                var migrateUsers = db.Select(db.From<CustomUserAuth>().OrderBy(x => x.Id));

                log.LogInformation("Migrating {Count} Existing ServiceStack Users to Identity Auth Users...", migrateUsers.Count);
                MigrateExistingUsers(dbContext, scope.ServiceProvider, migrateUsers).Wait();
            });
            AppTasks.Register("migrate.roles", _ =>
            {
                var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureDbMigrations>>();

                log.LogInformation("Running migrate.roles...");

                var scopeFactory = appHost.GetApplicationServices().GetRequiredService<IServiceScopeFactory>();
                using var scope = scopeFactory.CreateScope();
                MigrateUserRoles(scope.ServiceProvider).Wait();
            });
            AppTasks.Register("App.json", args => // Default App.db
                appHost.VirtualFiles.WriteFile("App_Data/App.json", ClientConfig.ToSystemJson(
                    migrator.DbFactory.GetTables(namedConnection:null, schema:null))));
            AppTasks.Run();
        });

    private async Task MigrateExistingUsers(ApplicationDbContext dbContext, IServiceProvider services,
        List<CustomUserAuth> migrateUsers, string tempPassword="p@55wOrd")
    {
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var now = DateTime.UtcNow;

        foreach (var user in migrateUsers)
        {
            var appUser = new ApplicationUser
            {
                Id = user.Id,
                UserName = user.Email,
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileUrl = user.DefaultProfileUrl,
                LockoutEnabled = true,
                LockoutEnd = user.LockedDate != null ? now.AddYears(10) : now,
                CreatedDate = user.CreatedDate,
                ModifiedDate = user.ModifiedDate,
                IpAddress = user.IpAddress,
                RefSource = user.RefSource,
                RefUrn = user.RefUrn,
                Banned = user.Banned,
                BannedBy = user.BannedBy,
                DisableEmails = user.DisableEmails,
                CreatedBy = user.CreatedBy,
                EmailConfirmed = true,
            };

            await userManager.CreateAsync(appUser, tempPassword);
            if (user.PasswordHash != null)
            {
                // Update raw PasswordHash (which uses older ASP.NET Identity v2 format), after users successfully signs in
                // the password will be re-hashed using the latest ASP.NET Identity v3 implementation
                await dbContext.Users
                    .Where(x => x.Id == user.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.PasswordHash, user.PasswordHash));
            }
        }
    }

    private async Task MigrateUserRoles(IServiceProvider services)
    {
        await using var dbContext = services.GetRequiredService<ApplicationDbContext>();
        using var db = await services.GetRequiredService<IDbConnectionFactory>().OpenAsync();
        var migrateAdminUserEmails = await db.ColumnAsync<string>(
            db.From<CustomUserAuth>().Where("roles = '[\"Admin\"]'").Select(x => x.Email));

        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<ApplicationRole>>();

        var roleExists = await roleManager.RoleExistsAsync("Admin");
        if (!roleExists)
        {
            await roleManager.CreateAsync(new ApplicationRole(RoleNames.Admin));
        }

        foreach (var adminEmail in migrateAdminUserEmails)
        {
            var user = await userManager.FindByEmailAsync(adminEmail);
            if (user != null)
            {
                await userManager.AddToRoleAsync(user, RoleNames.Admin);
            }
        }
    }

}
