using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net.Mime;
using ServiceStack;
using ServiceStack.Configuration;

namespace TechStacks.ServiceInterface.Notifications;

public class MailTo
{
    public string Email { get; set; }
    public string Name { get; set; }
}
    
public class EmailMessage
{
    public MailTo To { get; set; }
    public MailTo Cc { get; set; }
    public MailTo Bcc { get; set; }
    public MailTo From { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public string BodyHtml { get; set; }
}
    
public class EmailProvider 
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Host { get; set; }
    public int Port { get; set; }
    public bool EnableSsl { get; set; }
    public string Bcc { get; set; }
        
    public Action<EmailMessage, MailMessage> BeforeSend { get; set; }

    public Action<EmailMessage, Exception> OnException { get; set; }

    public void Send(EmailMessage email)
    {
        try
        {
            using var client = new SmtpClient(Host, Port);
            client.Credentials = new System.Net.NetworkCredential(UserName, Password);
            client.EnableSsl = EnableSsl;

            var emailTo = email.To.ToMailAddress();
            var emailFrom = email.From.ToMailAddress();

            var msg = new MailMessage(emailFrom, emailTo)
            {
                Subject = email.Subject,
                Body = email.Body ?? email.BodyHtml,
                IsBodyHtml = email.Body == null,
            };

            if (!msg.IsBodyHtml && email.BodyHtml != null)
            {
                var mimeType = new ContentType(MimeTypes.Html);
                var alternate = AlternateView.CreateAlternateViewFromString(email.BodyHtml, mimeType);
                msg.AlternateViews.Add(alternate);
            }

            if (email.Cc != null)
            {
                msg.CC.Add(email.Cc.ToMailAddress());
            }

            if (!string.IsNullOrEmpty(Bcc))
            {
                msg.Bcc.Add(new MailAddress(Bcc));
            }

            BeforeSend?.Invoke(email, msg);

            client.Send(msg);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}

public static class EmailProviderUtils
{
    public static MailAddress ToMailAddress(this MailTo from)
    {
        return string.IsNullOrEmpty(from.Name) 
            ? new MailAddress(from.Email)
            : new MailAddress(from.Email, from.Name);
    }
}