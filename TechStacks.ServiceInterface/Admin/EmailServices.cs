using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.OrmLite;
using ServiceStack.Script;
using TechStacks.Data;
using TechStacks.ServiceInterface.Notifications;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin;

[ValidateIsAdmin]
[Route("/email/post/{PostId}")]
public class EmailTest : IReturn<EmailTestResponse>
{
    public int? PostId { get; set; }
}

public class EmailTestResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

public class EmailServices(EmailProvider email, IConfiguration configuration, UserManager<ApplicationUser> userManager) : Service
{
    public async Task<EmailTestResponse> Any(EmailTest request)
    {
        if (request.PostId == null)
            throw new ArgumentNullException(nameof(request.PostId));
            
        var post = Db.SingleById<Post>(request.PostId);
        var org = Db.SingleById<Organization>(post.OrganizationId);
            
        var context = new ScriptContext {
            VirtualFiles = base.VirtualFiles,                
        }.Init();

        var page = context.GetPage("emails/post-new");
        var result = new PageResult(page) {
            Args = {
                ["baseUrl"] = configuration["PublicBaseUrl"],
                ["post"] = post,
                ["organization"] = org,
            }
        };
        var html = await result.RenderToStringAsync();

        var user = await userManager.FindByIdAsync($"{post.UserId}")
            ?? throw HttpError.NotFound($"User {post.UserId} not found");
            
        email.Send(new EmailMessage {
            To = new MailTo {
                Email = configuration["NotificationsFromEmail"],
                Name = "Demis"
            },
            From = new MailTo {
                Email = configuration["NotificationsFromEmail"],
                Name = user.DisplayName ?? user.UserName
            },
            Cc = new MailTo {
                Email = configuration["NotificationsCcEmail"],
                Name = org.Name + " Subscribed"
            },
            Subject = $"[{post.Type}] {post.Title}",
            BodyHtml = html,
        });
            
        return new EmailTestResponse();
    }
        
}