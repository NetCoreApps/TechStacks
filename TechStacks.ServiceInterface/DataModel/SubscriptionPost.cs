using System;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceInterface.DataModel;

/// <summary>
/// Task to send notifications to all subscribers
/// </summary>
public class SubscriptionPost
{
    [AutoIncrement]
    public long Id { get; set; } //= PostId

    [Index]
    public int OrganizationId { get; set; }

    public DateTime Created { get; set; }

    public DateTime? Completed { get; set; }

    [PgSqlIntArray]
    public int[] NotifiedUserIds { get; set; }

    public int NotifyCount { get; set; }

    public long EmailTemplateId { get; set; }

    public DateTime? Failed { get; set; }

    public string Error { get; set; }

    public string Notes { get; set; }
}