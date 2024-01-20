using System.Text.Encodings.Web;
using ServiceStack;
using ServiceStack.Messaging;
using TechStacks.ServiceInterface;

[assembly: HostingStartup(typeof(TechStacks.ConfigureMq))]

namespace TechStacks;

/**
 * Register ServiceStack Services you want to be able to invoke in a managed Background Thread
 * https://docs.servicestack.net/background-mq
*/
public class ConfigureMq : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            var smtpConfig = context.Configuration.GetSection(nameof(SmtpConfig))?.Get<SmtpConfig>() ??
                new SmtpConfig
                {
                    Username = Environment.GetEnvironmentVariable("TECHSTACKS_SMTP_USER") ??
                               context.Configuration["smtp.UserName"]!,
                    Password = Environment.GetEnvironmentVariable("TECHSTACKS_SMTP_PASS") ??
                               context.Configuration["smtp.Password"]!,
                    Host = context.Configuration["smtp.Host"]!,
                    Port = context.Configuration["smtp.Port"].ToInt(),
                    Bcc = context.Configuration["SystemToEmail"]!,
                    FromEmail = context.Configuration["NotificationsFromEmail"]!,
                    FromName = "TechStacks",
#if DEBUG
                    DevToEmail = context.Configuration["SystemToEmail"]!,
#endif
                };
            services.AddSingleton(smtpConfig);
            services.AddSingleton<IMessageService>(c => new BackgroundMqService());
        })
        .ConfigureAppHost(afterAppHostInit: appHost => {
            var mqService = appHost.Resolve<IMessageService>();

            //Register ServiceStack APIs you want to be able to invoke via MQ
            mqService.RegisterHandler<SendEmail>(appHost.ExecuteMessage);
            mqService.RegisterHandler<SendNotification>(appHost.ExecuteMessage);
            mqService.RegisterHandler<SendSystemEmail>(appHost.ExecuteMessage);
            mqService.Start();

            appHost.ExecuteService(new RetryPendingNotifications());
        });
}

// This class is used by the application to send email for account confirmation and password reset.
// For more details see https://go.microsoft.com/fwlink/?LinkID=532713
public interface IEmailSender
{
    Task SendEmailAsync(string email, string subject, string message);
}

public static class EmailSenderExtensions
{
    public static Task SendEmailConfirmationAsync(this IEmailSender emailSender, string email, string link)
    {
        return emailSender.SendEmailAsync(email, "Confirm your email",
            $"Please confirm your account by clicking this link: <a href='{HtmlEncoder.Default.Encode(link)}'>link</a>");
    }
}

/// <summary>
/// Sends emails by publishing a message to the Background MQ Server where it's processed in the background
/// </summary>
public class EmailSender(IMessageService messageService) : IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        using var mqClient = messageService.CreateMessageProducer();
        mqClient.Publish(new SendEmail
        {
            To = email,
            Subject = subject,
            BodyHtml = htmlMessage,
        });

        return Task.CompletedTask;
    }
}

