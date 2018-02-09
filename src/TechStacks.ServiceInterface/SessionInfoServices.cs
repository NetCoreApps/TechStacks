using ServiceStack;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface
{
    [Authenticate]
    public class SessionInfoServices : Service
    {
        public object Any(SessionInfo request) =>
            SessionAs<CustomUserSession>().ConvertTo<SessionInfoResponse>();
    }
}
