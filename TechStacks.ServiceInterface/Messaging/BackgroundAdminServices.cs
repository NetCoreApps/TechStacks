using ServiceStack;
using ServiceStack.Messaging;

namespace TechStacks.ServiceInterface.Messaging;

[Route("/mq/stop")]
public class MqStop : IReturn<string> {}
    
[Route("/mq/start")]
public class MqStart : IReturn<string> {}
    
[Route("/mq/stats")]
public class MqStats : IReturn<string> {}
    
[Route("/mq/status")]
public class MqStatus : IReturn<string> {}
    
public class BackgroundAdminServices : Service
{
    public IMessageService MqService { get; set; }
        
    [RequiredRole("Admin")]
    public object Any(MqStart request)
    {
        MqService.Start();
        return "OK";
    }
        
    [RequiredRole("Admin")]
    public object Any(MqStop request)
    {
        MqService.Stop();
        return "OK";
    }

    public object Any(MqStats request) => MqService.GetStats();

    [AddHeader(ContentType = MimeTypes.PlainText)]
    public object Any(MqStatus request) => MqService.GetStatsDescription();
}