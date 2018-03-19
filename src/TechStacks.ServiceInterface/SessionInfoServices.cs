using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Auth;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface
{
    [Authenticate]
    [CacheResponse(Duration = 3600)]
    public class SessionInfoServices : Service
    {
        public async Task<SessionInfoResponse> Any(SessionInfo request)
        {
            var session = SessionAs<CustomUserSession>();
            var jwtProvider = (JwtAuthProvider)AuthenticateService.GetJwtAuthProvider();
            var response = session.ConvertTo<SessionInfoResponse>();

            response.AccessToken = jwtProvider.CreateJwtBearerToken(Request, session);
            var userInfoTask = Gateway.SendAsync(new GetUserInfo {
                UserName = session.UserName,
            });

            var userOrgTask = Gateway.SendAsync(new GetUserOrganizations());           

            var userInfo = await userInfoTask;
            response.PopulateWith(userInfo);

            var userOrg = await userOrgTask;
            response.Members = userOrg.Members;
            response.MemberInvites = userOrg.MemberInvites;

            return response;
        }
    }
}
