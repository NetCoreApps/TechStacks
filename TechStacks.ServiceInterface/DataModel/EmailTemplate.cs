using System;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceInterface.DataModel;

public class EmailTemplate
{
    [AutoIncrement]
    public long Id { get; set; }

    public string TemplatePath { get; set; }

    public string ToEmail { get; set; }
    public string ToName { get; set; }
    public int[] ToUserIds { get; set; }

    public string FromEmail { get; set; }
    public string FromName { get; set; }

    public string CcEmail { get; set; }
    public string CcName { get; set; }

    public string Subject { get; set; }

    public string Body { get; set; }

    public string BodyHtml { get; set; }

    public DateTime Created { get; set; }
}