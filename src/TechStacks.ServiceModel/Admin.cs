using ServiceStack;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceModel
{
    [ExcludeMetadata]
    [Route("/notifications/{Id}/send")]
    public class SendNotification : IReturnVoid, IPost
    {
        public long Id { get; set; }
    }

    [ExcludeMetadata]
    [Route("/email/system")]
    public class SendSystemEmail : IReturnVoid, IPost
    {
        public string Subject { get; set; }
        public string Body { get; set; }
    }
    
    [ExcludeMetadata]
    [Route("/email/send")]
    public class SendEmail : IReturnVoid, IPost
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
    
    [ExcludeMetadata]
    [Route("/notifications/retry-pending")]
    public class RetryPendingNotifications : IGet {}

    public class RetryPendingNotificationsResponse
    {
        public long[] ResentIds { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }

}