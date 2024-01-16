using System;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceInterface.DataModel;

public class SubscribePost
{
    [AutoIncrement]
    public long Id { get; set; }

    [Index]
    public long PostId { get; set; }

    [Index]
    public int UserId { get; set; }

    public string UserName { get; set; }

    [Index]
    public long OrganizationId { get; set; }

    public DateTime? LastSynced { get; set; }

    public DateTime Created { get; set; }
}