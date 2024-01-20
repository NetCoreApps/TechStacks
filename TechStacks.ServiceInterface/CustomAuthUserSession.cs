using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using TechStacks.Data;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

public class CustomUserSession : AuthUserSession
{
    public string GithubProfileUrl { get; set; }

    public override void OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
    {
        base.OnAuthenticated(authService, session, tokens, authInfo);
        var userAuthRepo = authService.TryResolve<IAuthRepository>();
        var userAuth = userAuthRepo.GetUserAuth(session, tokens);
        var dbFactory = authService.TryResolve<IDbConnectionFactory>();

        foreach (var authTokens in session.ProviderOAuthAccess)
        {
            if (authTokens.Provider.ToLower() == "github")
            {
                if (authInfo != null && authInfo.TryGetValue("avatar_url", out var avatarUrl))
                {
                    GithubProfileUrl = avatarUrl;
                }
            }

            ProfileUrl = GithubProfileUrl;

            using var db = dbFactory.OpenDbConnection();
            var userActivity = db.SingleById<UserActivity>(userAuth.Id);
            if (userActivity == null)
            {
                db.Insert(new UserActivity
                {
                    Id = userAuth.Id,
                    UserName = session.UserName,
                    Created = DateTime.UtcNow,
                    Modified = DateTime.UtcNow,
                });
            }
        }
    }
}

public class AdditionalUserClaimsPrincipalFactory(
    UserManager<ApplicationUser> userManager,
    RoleManager<ApplicationRole> roleManager,
    IOptions<IdentityOptions> optionsAccessor)
    : UserClaimsPrincipalFactory<ApplicationUser, ApplicationRole>(userManager, roleManager, optionsAccessor)
{
    public override async Task<ClaimsPrincipal> CreateAsync(ApplicationUser user)
    {
        var principal = await base.CreateAsync(user);
        var identity = (ClaimsIdentity)principal.Identity!;

        var claims = new List<Claim>();
        if (user.ProfileUrl != null)
            claims.Add(new Claim(JwtClaimTypes.Picture, user.ProfileUrl));

        identity.AddClaims(claims);
        return principal;
    }
}


public class CustomUserAuth : UserAuth
{
    public string DefaultProfileUrl { get; set; }

    public string IpAddress { get; set; }

    public string RefSource { get; set; }

    public string RefUrn { get; set; }

    public DateTime? Banned { get; set; }

    public string BannedBy { get; set; }

    public string Notes { get; set; }

    public DateTime? DisableEmails { get; set; }

    public string CreatedBy { get; set; }
}

