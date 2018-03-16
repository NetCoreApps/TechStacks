using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel
{
    public enum Frequency
    {
        Daily = 1,
        Weekly = 7,
        Monthly = 30,
        Quarterly = 90,
    }

    [Route("/orgs/{OrganizationId}/subscribe", "PUT")]
    public class SubscribeToOrganization : IReturnVoid
    {
        public int OrganizationId { get; set; }

        public PostType[] PostTypes { get; set; }

        public Frequency Frequency { get; set; }
    }

    [Route("/posts/{PostId}/subscribe", "PUT")]
    public class SubscribeToPost : IReturnVoid
    {
        public long PostId { get; set; }
    }

    [Route("/orgs/{OrganizationId}/subscribe", "DELETE")]
    public class DeleteOrganizationSubscription : IReturnVoid
    {
        public long OrganizationId { get; set; }
    }

    [Route("/posts/{PostId}/subscribe", "DELETE")]
    public class DeletePostSubscription : IReturnVoid
    {
        public long PostId { get; set; }
    }
}