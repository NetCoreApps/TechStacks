using System.Threading.Tasks;
using ServiceStack;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface;

public class SessionInfoServices : Service
{
    public async Task<SessionInfoResponse> Any(SessionInfo request)
    {
        var session = SessionAs<CustomUserSession>();
        var response = session.ConvertTo<SessionInfoResponse>();

        var userInfoTask = Gateway.SendAsync(new GetUserInfo {
            UserName = session.UserAuthName,
        });

        var userOrgTask = Gateway.SendAsync(new GetUserOrganizations());           

        var userInfo = await userInfoTask;
        response.PopulateWith(userInfo);
        response.ProfileUrl ??= response.AvatarUrl;

        var userOrg = await userOrgTask;
        response.Members = userOrg.Members;
        response.MemberInvites = userOrg.MemberInvites;
        response.Subscriptions = userOrg.Subscriptions;

        return response;
    }
}