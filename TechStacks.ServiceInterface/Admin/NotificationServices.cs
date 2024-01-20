using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.OrmLite;
using ServiceStack.Script;
using TechStacks.ServiceInterface.DataModel;
using TechStacks.ServiceInterface.Notifications;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin;

[RequiredRole("Admin")]
public partial class NotificationServices : Service
{
    public object Any(RetryPendingNotifications request)
    {
        var pendingNotificationIds = Db.Column<long>(Db.From<Notification>()
                .Where(x => x.Completed == null && x.Failed == null)
                .Select(x => x.Id))
            .ToArray();

        if (pendingNotificationIds.Length > 0)
        {
            log.LogInformation("Resending {Length} pending notifications: {PendingNotificationIds}",
                pendingNotificationIds.Length, pendingNotificationIds);

            foreach (var notificationId in pendingNotificationIds)
            {
                PublishMessage(new SendNotification { Id = notificationId });
            }
        }
            
        return new RetryPendingNotificationsResponse {
            ResentIds = pendingNotificationIds
        };
    }

    Func<Notification, Task> GetEventHandler(string eventName)
    {
        switch (eventName)
        {
            case nameof(CreatePost):
                return SendNewPostEmail;
            case nameof(UserPostReport):
                return SendReportPostEmail;
            case nameof(UserPostCommentReport):
                return SendReportCommentEmail;
        }
        return null;
    }

    public void Any(SendSystemEmail request)
    {
        email.Send(new EmailMessage {
            To = new MailTo {
                Email = configuration["SystemToEmail"],
            },
            From = new MailTo {
                Email = configuration["NotificationsFromEmail"],
            },
            Subject = $"[SYSTEM] {request.Subject}",
            Body = request.Body,
        });
    }

    public async Task Any(SendNotification request)
    {
        var notification = AssertNotification(request.Id);

        var eventHandler = GetEventHandler(notification.Event);
        if (eventHandler != null)
        {
            try
            {
                await eventHandler(notification);

                await Db.UpdateOnlyAsync(() => new Notification {
                        Completed = DateTime.Now
                    },
                    where: x => x.Id == notification.Id);
            }
            catch (Exception ex)
            {
                await Db.UpdateOnlyAsync(() => new Notification {
                        Failed = DateTime.Now,
                        Error = ex.Message + Environment.NewLine + ex
                    },
                    where:x => x.Id == notification.Id);
                throw;
            }
        }
        else
        {
            log.LogWarning("Received notification of unknown Event Type: {Notification}", notification.Event);
        }
    }

    private async Task SendNewPostEmail(Notification notification)
    {
        EmailTemplate template = null;

        if (notification.EmailTemplateId == null)
        {
            var post = await AssertPost(notification.RefId);
            var org = await Db.SingleByIdAsync<Organization>(post.OrganizationId);
            var user = await userManager.FindByIdAsync($"{post.UserId}")
                ?? throw HttpError.NotFound($"User {post.UserId} not found");

            var q = Db.From<OrganizationSubscription>()
                .Where(x => x.OrganizationId == post.OrganizationId)
                .And("ARRAY[{0}] && post_types", post.Type)
                .Select(x => x.UserId);
            var postTypeSubscriberUserIds = await Db.ColumnAsync<int>(q);

            var context = CreateEmailContext();
            var templatePath = "emails/post-new";
            var page = context.GetPage(templatePath);
            var result = new PageResult(page) {
                Args = {
                    ["baseUrl"] = configuration["PublicBaseUrl"],
                    ["post"] = post,
                    ["organization"] = org,
                }
            };

            template = await CreateAndSaveEmailTemplate(notification, nameof(SendNewPostEmail), templatePath, 
                toUserIds: postTypeSubscriberUserIds, 
                fromName:  user.DisplayName ?? user.UserName, 
                ccName:    org.Name + " Subscribed", 
                subject:   $"[{post.Type}] {post.Title}", 
                html:      await result.RenderToStringAsync());
        }
        else
        {
            template = await Db.SingleByIdAsync<EmailTemplate>(notification.EmailTemplateId);
        }

        await SendEmailsToRemainingUsers(notification, template);
    }

    async Task SendReportPostEmail(Notification notification)
    {
        EmailTemplate template = null;

        if (notification.EmailTemplateId == null)
        {
            var report = await Db.SingleByIdAsync<PostReport>(notification.RefId);
            var post = await AssertPost(report.PostId);
            var org = await Db.SingleByIdAsync<Organization>(post.OrganizationId);
            var moderatorUserIds = await GetOrganizationModeratorIds(org.Id);
                
            var context = CreateEmailContext();
            var templatePath = "emails/post-report";
            var page = context.GetPage(templatePath);
            var result = new PageResult(page) {
                Args = {
                    ["baseUrl"] = configuration["PublicBaseUrl"],
                    ["report"] = report,
                    ["post"] = post,
                    ["organization"] = org,
                }
            };

            var reportType = report.FlagType == FlagType.Other ? "Report" : report.FlagType.ToString();

            template = await CreateAndSaveEmailTemplate(notification, nameof(SendReportPostEmail), templatePath, 
                toUserIds: moderatorUserIds, 
                fromName:  report.UserName, 
                ccName:    org.Name + " Moderators", 
                subject:   $"[{reportType}] {post.Title}", 
                html:      await result.RenderToStringAsync());
        }            
        else
        {
            template = await Db.SingleByIdAsync<EmailTemplate>(notification.EmailTemplateId);
        }

        await SendEmailsToRemainingUsers(notification, template);
    }

    async Task SendReportCommentEmail(Notification notification)
    {
        EmailTemplate template = null;

        if (notification.EmailTemplateId == null)
        {
            var report = await Db.SingleByIdAsync<PostCommentReport>(notification.RefId);
            var comment = await Db.SingleByIdAsync<PostComment>(report.PostCommentId);                
            var org = await Db.SingleByIdAsync<Organization>(report.OrganizationId);
            var moderatorUserIds = await GetOrganizationModeratorIds(org.Id);
                
            var context = CreateEmailContext();
            var templatePath = "emails/comment-report";
            var page = context.GetPage(templatePath);
            var result = new PageResult(page) {
                Args = {
                    ["baseUrl"] = configuration["PublicBaseUrl"],
                    ["report"] = report,
                    ["comment"] = comment,
                    ["organization"] = org,
                }
            };

            var reportType = report.FlagType == FlagType.Other ? "Report" : report.FlagType.ToString();

            template = await CreateAndSaveEmailTemplate(notification, nameof(SendReportPostEmail), templatePath, 
                toUserIds: moderatorUserIds, 
                fromName:  report.UserName, 
                ccName:    org.Name + " Moderators", 
                subject:   $"[{reportType}] Comment", 
                html:      await result.RenderToStringAsync());
        }            
        else
        {
            template = await Db.SingleByIdAsync<EmailTemplate>(notification.EmailTemplateId);
        }

        await SendEmailsToRemainingUsers(notification, template);
    }
}