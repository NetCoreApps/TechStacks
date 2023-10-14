using ServiceStack;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface;

public class HelloService : Service
{
    public object Any(Hello request) =>
        new HelloResponse { Result = $"Hello, {request.Name}!" };
}