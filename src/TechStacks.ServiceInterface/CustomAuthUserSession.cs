using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    public class CustomUserSession : AuthUserSession
    {
        public string GithubProfileUrl { get; set; }
        public string TwitterProfileUrl { get; set; }

        public override void OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            base.OnAuthenticated(authService, session, tokens, authInfo);
            var appSettings = authService.TryResolve<IAppSettings>();
            var userAuthRepo = authService.TryResolve<IAuthRepository>();
            var userAuth = userAuthRepo.GetUserAuth(session, tokens);
            var dbFactory = authService.TryResolve<IDbConnectionFactory>();
            var userId = this.UserAuthId.ToInt();

            foreach (var authTokens in session.ProviderOAuthAccess)
            {
                if (authTokens.Provider.ToLower() == "github")
                {
                    if (authInfo != null && authInfo.TryGetValue("avatar_url", out var avatarUrl))
                    {
                        GithubProfileUrl = avatarUrl;
                    }
                }
                if (authTokens.Provider.ToLower() == "twitter")
                {
                    TwitterProfileUrl = session.GetProfileUrl();
                }

                ProfileUrl = GithubProfileUrl ?? TwitterProfileUrl;
                
                using (var db = dbFactory.OpenDbConnection())
                {
                    var userAuthInstance = db.Single<CustomUserAuth>(x => x.Id == userId);
                    if (userAuthInstance != null)
                    {
                        userAuthInstance.DefaultProfileUrl = this.ProfileUrl;
                        userAuthInstance.IpAddress = authService.Request.UserHostAddress;

                        db.Update(userAuthInstance);
                    }

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
}

