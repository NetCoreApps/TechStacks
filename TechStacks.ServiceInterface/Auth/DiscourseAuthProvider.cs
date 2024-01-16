using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Auth;

namespace TechStacks.ServiceInterface.Auth;

public class DiscourseAuthProvider : CredentialsAuthProvider
{        
    public string DiscourseUrl { get; set; }

    public override async Task<bool> TryAuthenticateAsync(IServiceBase authService, string userName, string password,
        CancellationToken token = new())
    {
        var valid = await base.TryAuthenticateAsync(authService, userName, password, token);
        if (valid)
            return true;
            
        var csrfUrl = DiscourseUrl.CombineWith("/session/csrf");
            
        var cookies = new CookieContainer();
        var csrfJson = await csrfUrl.GetJsonFromUrlAsync(
            requestFilter: req =>
            {
                req.Headers.Add("Cookie",cookies.GetAllCookies().Join(";"));
            }, token: token);
        var csrfObj = (Dictionary<string,object>)JSON.parse(csrfJson);

        var csrf = csrfObj["csrf"] as string;
            
        var loginUrl = DiscourseUrl.CombineWith("/session");
            
        var sessionJson = await loginUrl.PostToUrlAsync(new {
            login = userName,
            password = password,
        }, requestFilter: req => {
            req.Headers.Add("Cookie",cookies.GetAllCookies().Join(";"));
            req.Headers.Add("X-CSRF-Token", csrf);
            req.AddHeader("Accept",MimeTypes.Json);
        }, token: token);

        var jsonObj = (Dictionary<string, object>) JSON.parse(sessionJson);
        if (jsonObj.TryGetValue("user", out var oUser) && 
            oUser is Dictionary<string, object> user &&
            user.TryGetValue("username", out var oUserName))
        {
            var authRepo = authService.TryResolve<IAuthRepository>();
            var userAuth = authRepo.GetUserAuthByUserName((string) oUserName);
                
            var isMatch = userAuth.UserName == (string) oUserName;
            if (isMatch)
            {
                authRepo.UpdateUserAuth(userAuth, userAuth, password);
                return true;
            }
        }

        return false;
    }

    public override bool IsAuthorized(IAuthSession session, IAuthTokens tokens, Authenticate request = null)
    {
        var ret = base.IsAuthorized(session, tokens, request);
        return ret;
    }
}