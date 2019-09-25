using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.Script;
using ServiceStack.Templates;
using TechStacks.ServiceInterface.DataModel;
using TechStacks.ServiceInterface.Notifications;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin
{
    public class UserEmailInfo
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
    }
    
    public partial class NotificationServices : Service
    {
        private Notification AssertNotification(long Id)
        {
            if (Id <= 0)
                throw new ArgumentNullException(nameof(Id));

            var notification = Db.SingleById<Notification>(Id);
            if (notification == null)
                throw HttpError.NotFound($"Notification not found {Id}");

            return notification;
        }

        private async Task<Post> AssertPost(long postId)
        {
            var post = await Db.SingleByIdAsync<Post>(postId);
            if (post == null)
                throw HttpError.NotFound("Post not found: " + postId);

            return post;
        }

        private ScriptContext CreateEmailContext() => new ScriptContext {
                VirtualFiles = base.VirtualFiles,
            }.Init();

        private Task<List<int>> GetOrganizationModeratorIds(int organizationId)
        {
            return Db.ColumnAsync<int>(Db.From<OrganizationMember>()
                .Where(x => x.OrganizationId == organizationId && (x.IsOwner || x.IsModerator))
                .Select(x => x.UserId));
        }

        private async Task<EmailTemplate> CreateAndSaveEmailTemplate(
            Notification notification, string operation, string templatePath, 
            List<int> toUserIds, string fromName, string ccName, string subject, string html)
        {
            var template = new EmailTemplate {
                TemplatePath = templatePath,
                ToUserIds = toUserIds.ToArray(),
                FromEmail = AppSettings.GetString("NotificationsFromEmail"),
                FromName = fromName,
                CcEmail = AppSettings.GetString("NotificationsCcEmail"),
                CcName = ccName,
                Subject = subject,
                BodyHtml = html,
                Created = DateTime.Now,
            };

            using (var trans = Db.OpenTransaction())
            {
                template.Id = await Db.InsertAsync(template, selectIdentity: true);

                var operations = new List<string>(notification.Operations ?? TypeConstants.EmptyStringArray);
                operations.AddIfNotExists(operation);
                notification.Started = DateTime.Now;
                notification.Operations = operations.ToArray();
                notification.EmailTemplateId = template.Id;
                notification.UserIds = toUserIds.ToArray();
                notification.EmailedUserIds = new int[0];

                await Db.UpdateAsync(notification);

                trans.Commit();
            }

            return template;
        }

        private async Task RecordEmailSentToUser(long notificationId, int userId)
        {
            await Db.ExecuteSqlAsync(@"UPDATE notification SET emailed_user_ids = emailed_user_ids || @userId WHERE id = @id", 
                new { userId, id = notificationId });
        }

        private async Task SendEmailsToRemainingUsers(Notification notification, EmailTemplate template)
        {
            var remainingUserIds = notification.UserIds.Where(x => !notification.EmailedUserIds.Contains(x)).ToList();
            if (remainingUserIds.Count > 0)
            {
                var users = await Db.SelectAsync<UserEmailInfo>(Db.From<CustomUserAuth>()
                    .Where(x => remainingUserIds.Contains(x.Id)));

                var userMap = users.ToDictionary(x => x.Id);

                foreach (var userId in remainingUserIds)
                {
                    var user = userMap[userId];
                    if (!string.IsNullOrEmpty(user.Email))
                    {
                        Email.Send(template.ToEmailMessage(user.Email, user.DisplayName ?? user.UserName));
                    }

                    await RecordEmailSentToUser(notification.Id, userId);
                }
            }
            else
            {
                SendNotificationEmail(template, $"{notification.UserIds.Length} subscribers");
            }
        }

        private void SendNotificationEmail(EmailTemplate template, string toName)
        {
            var notificationsEmail = AppSettings.GetString("NotificationsFromEmail");
            var email = template.ToEmailMessage(notificationsEmail, toName);
            Email.Send(email);
        }
    }

    public static class NotificationUtils
    {
        public static EmailMessage ToEmailMessage(this EmailTemplate from, string toEmail, string toName)
        {
            return new EmailMessage {
                To = new MailTo {
                    Email = toEmail,
                    Name = toName,
                },
                From = new MailTo {
                    Email = from.FromEmail,
                    Name = from.FromName,
                },
                Cc = from.CcEmail == null ? null : new MailTo {
                    Email = from.CcEmail,
                    Name = from.CcName,
                },
                Subject = from.Subject,
                Body = from.Body,
                BodyHtml = from.BodyHtml
            };
        }
    }
}