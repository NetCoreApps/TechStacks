using System;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceInterface.DataModel;

public class Notification
{
    [AutoIncrement]
    public long Id { get; set; }

    public string Event { get; set; }

    public long RefId { get; set; }
        
    public string RefType { get; set; }
        
    public string RefUrn { get; set; }
        
    [PgSqlTextArray]
    public string[] Operations { get; set; }
        
    [PgSqlIntArray]
    public int[] UserIds { get; set; }
        
    [PgSqlIntArray]
    public int[] EmailedUserIds { get; set; }
        
    public long? EmailTemplateId { get; set; }
        
    public DateTime Created { get; set; }
        
    public DateTime? Started { get; set; }
        
    public DateTime? Completed { get; set; }

    public DateTime? Failed { get; set; }

    public string Error { get; set; }

    public string Notes { get; set; }
}