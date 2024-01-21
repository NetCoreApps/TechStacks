using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks;
using TechStacks.Data;
using TechStacks.ServiceInterface;

AppHost.RegisterLicense();
var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var config = builder.Configuration;
services.AddMvc(options => options.EnableEndpointRouting = false);

services.AddAuthentication(options =>
    {
        options.DefaultScheme = IdentityConstants.ApplicationScheme;
        options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
    })
    .AddGitHub(options =>
    {
        options.ClientId = Environment.GetEnvironmentVariable("GH_CLIENT_ID") ?? config["oauth.github.ClientId"]!;
        options.ClientSecret = Environment.GetEnvironmentVariable("GH_CLIENT_SECRET") ?? config["oauth.github.ClientSecret"]!;
        options.Scope.Add("user:email");
        options.CallbackPath = "/signin-oidc-github";
    })
    .AddScheme<AuthenticationSchemeOptions,BasicAuthenticationHandler<ApplicationUser,int>>(BasicAuthenticationHandler.Scheme, null)
    .AddIdentityCookies(options => options.DisableRedirectsForApis());
services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("App_Data"));

services.AddAuthorization();

services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.WithOrigins([
            "https://techstacks.io", "https://www.techstacks.io",
            "http://localhost:3000", "http://localhost:16325", "http://localhost:8080", "http://null.jsbin.com",
            "http://run.plnkr.co"
        ])
        .AllowCredentials()
        .WithHeaders(["Content-Type", "Allow", "Authorization"])
        .SetPreflightMaxAge(TimeSpan.FromHours(1));
    });
});

// $ dotnet ef migrations add CreateIdentitySchema
// $ dotnet ef database update
var connectionString = Environment.GetEnvironmentVariable("TECHSTACKS_DB") ??
                       config.GetConnectionString("DefaultConnection");
var dbFactory = new OrmLiteConnectionFactory(connectionString, PostgreSqlDialect.Provider);
using var db = dbFactory.OpenDbConnection();

services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly(nameof(TechStacks))));

services.AddIdentityCore<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();
builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, AdditionalUserClaimsPrincipalFactory>();

services.Configure<ForwardedHeadersOptions>(options => {
    //https://github.com/aspnet/IISIntegration/issues/140#issuecomment-215135928
    options.ForwardedHeaders = ForwardedHeaders.XForwardedProto;
});


services.AddRazorPages();
services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = false;
    options.Password.RequiredUniqueChars = 6;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    options.Lockout.MaxFailedAccessAttempts = 10;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.RequireUniqueEmail = true;
});
services.ConfigureApplicationCookie(options =>
{
    // Cookie settings
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromDays(150);
    // If the LoginPath isn't set, ASP.NET Core defaults
    // the path to /Account/Login.
    options.LoginPath = "/Identity/Account/Login";
    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
    options.LogoutPath = "/Identity/Account/Logout";
    options.SlidingExpiration = true;
});
// Add application services.
services.AddTransient<IEmailSender, EmailSender>();
services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, AdditionalUserClaimsPrincipalFactory>();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

builder.Services.AddServiceStack(typeof(TechnologyServices).Assembly, c => {
    c.AddSwagger(o => {
        o.AddBasicAuth();
    });
});

var app = builder.Build();

app.UseMigrationsEndPoint();
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseStaticFiles();
app.UseCookiePolicy();
app.UseCors();

app.UseServiceStack(new AppHost(), options => {
    options.MapEndpoints();
});

app.UseAntiforgery();
app.MapRazorPages();
app.MapAdditionalIdentityEndpoints();
app.MapFallbackToFile("index.html");

app.Run();
