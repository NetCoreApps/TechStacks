using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Script;

namespace TechStacks.ServiceInterface;

[Exclude(Feature.Metadata)]
// [FallbackRoute("/{*PathInfo}", Matches = "AcceptsHtml")]
public class FallbackForClientRoutes
{
    public string PathInfo { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/ping")]
public class Ping : IGet {}
    
public class ClientRoutesService : Service
{
    //Return index.html for unmatched requests so routing is handled on client
    public object Any(FallbackForClientRoutes request)
    {
        return Request.PathInfo == "/"
            ? Request.GetPageResult("/static")
            : Request.PathInfo.StartsWith("/p/")
                ? Request.GetPageResult("/static-post")
                : new HttpResult(VirtualFileSources.GetFile("index.html"));
    }

    public object Any(Ping request) => "OK";
}

//Client Routes to generate urls in sitemap.xml
[Route("/tech")]
public class ClientAllTechnologies {}

[Route("/tech/{Slug}")]
public class ClientTechnology
{
    public string Slug { get; set; }
}

[Route("/stacks")]
public class ClientAllTechnologyStacks { }

[Route("/stacks/{Slug}")]
public class ClientTechnologyStack
{
    public string Slug { get; set; }
}

[Route("/users/{UserName}")]
public class ClientUser
{
    public string UserName { get; set; }
}