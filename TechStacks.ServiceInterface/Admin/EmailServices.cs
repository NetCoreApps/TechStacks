using System;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.OrmLite;
using ServiceStack.Script;
using TechStacks.ServiceInterface.Notifications;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin;

[Route("/email/post/{PostId}")]
public class EmailTest : IReturn<EmailTestRespoonse>
{
    public int? PostId { get; set; }
}

public class EmailTestRespoonse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Authenticate]
[RequiredRole("Admin")]
public class EmailServices : Service
{
    public EmailProvider Email { get; set; } 
        
    public IAppSettings AppSettings { get; set; }

    public async Task<EmailTestRespoonse> Any(EmailTest request)
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
                ["baseUrl"] = AppSettings.GetString("PublicBaseUrl"),
                ["post"] = post,
                ["organization"] = org,
            }
        };
        var html = await result.RenderToStringAsync();

        var user = Db.SingleById<CustomUserAuth>(post.UserId);
            
        Email.Send(new EmailMessage {
            To = new MailTo {
                Email = AppSettings.GetString("NotificationsFromEmail"),
                Name = "Demis"
            },
            From = new MailTo {
                Email = AppSettings.GetString("NotificationsFromEmail"),
                Name = user.DisplayName ?? user.UserName
            },
            Cc = new MailTo {
                Email = AppSettings.GetString("NotificationsCcEmail"),
                Name = org.Name + " Subscribed"
            },
            Subject = $"[{post.Type}] {post.Title}",
            BodyHtml = html,
        });
            
        return new EmailTestRespoonse();
    }
        
}