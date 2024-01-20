#nullable enable
using Markdig;
using Markdig.Syntax;
using Microsoft.AspNetCore.Mvc.Rendering;
using ServiceStack;
using ServiceStack.IO;
using TechStacks.ServiceInterface;

[assembly: HostingStartup(typeof(TechStacks.ConfigureSsg))]

namespace TechStacks;

public class ConfigureSsg : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            services.AddSingleton<IMarkdownProvider, MarkdownProvider>();
        });
}
