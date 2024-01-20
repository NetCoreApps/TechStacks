using System.Collections.Generic;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceModel;

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
    public string ToName { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public string BodyHtml { get; set; }
}
    
[ExcludeMetadata]
[Route("/notifications/retry-pending")]
public class RetryPendingNotifications : IGet {}

public class RetryPendingNotificationsResponse
{
    public long[] ResentIds { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}

[Restrict(VisibleInternalOnly = true)]
[Route("/tasks/hourly")]
public class HourlyTask : IGet
{
    public bool Force { get; set; }
}

public class HourlyTaskResponse : IMeta
{
    public Dictionary<string, string> Meta { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Restrict(VisibleInternalOnly = true)]
[Route("/cache/clear")]
public class ClearCache : IReturn<string>, IGet {}