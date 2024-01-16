using System;
using System.Runtime.Serialization;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceModel.Types;

public class Organization
{
    [AutoIncrement]
    public int Id { get; set; }

    public string Name { get; set; }

    [Index(Unique = true)]
    public string Slug { get; set; }

    public string Description { get; set; }

    public string DescriptionHtml { get; set; }

    public string Color { get; set; }

    public string TextColor { get; set; }

    public string LinkColor { get; set; }

    public string BackgroundColor { get; set; }

    public string BackgroundUrl { get; set; }

    public string LogoUrl { get; set; }

    public string HeroUrl { get; set; }

    public string Lang { get; set; }

    public string DefaultPostType { get; set; }

    [PgSqlTextArray]
    public string[] DefaultSubscriptionPostTypes { get; set; }

    [PgSqlTextArray]
    public string[] PostTypes { get; set; }

    [PgSqlTextArray]
    public string[] ModeratorPostTypes { get; set; }

    [Default(5)]
    public int DeletePostsWithReportCount { get; set; }
        
    public bool? DisableInvites { get; set; }

    public long UpVotes { get; set; }

    public long DownVotes { get; set; }

    public long Views { get; set; }

    public long Favorites { get; set; }

    public int Subscribers { get; set; }

    public int CommentsCount { get; set; }

    public int PostsCount { get; set; }

    public int Score { get; set; }

    [Index]
    public int Rank { get; set; }

    [Index]
    public long? RefId { get; set; }

    public string RefSource { get; set; }

    [IgnoreDataMember] public string RefUrn { get; set; }

    [IgnoreDataMember] public long? SubscriptionId { get; set; }

    public DateTime? Hidden { get; set; }
    public string HiddenBy { get; set; }

    public DateTime? Locked { get; set; }
    public string LockedBy { get; set; }

    public DateTime? Deleted { get; set; }
    public string DeletedBy { get; set; }
    [IgnoreDataMember] public string Notes { get; set; }

    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }

    public DateTime Modified { get; set; }
    public string ModifiedBy { get; set; }
}

public class Category
{
    [AutoIncrement]
    public int Id { get; set; }

    [Index]
    public int OrganizationId { get; set; }

    public string Name { get; set; }

    public string Slug { get; set; }

    public string Description { get; set; }

    public string Color { get; set; }

    [PgSqlIntArray]
    public int[] TechnologyIds { get; set; }

    [IgnoreDataMember] public long? RefId { get; set; }
    [IgnoreDataMember] public string RefSource { get; set; }
    [IgnoreDataMember] public string RefUrn { get; set; }

    public int CommentsCount { get; set; }

    public int PostsCount { get; set; }

    public int Score { get; set; }

    public int Rank { get; set; }

    [IgnoreDataMember] public DateTime? Deleted { get; set; }
    [IgnoreDataMember] public string DeletedBy { get; set; }
    [IgnoreDataMember] public string Notes { get; set; }

    [IgnoreDataMember] public DateTime Created { get; set; }
    [IgnoreDataMember] public string CreatedBy { get; set; }

    [IgnoreDataMember] public DateTime Modified { get; set; }
    [IgnoreDataMember] public string ModifiedBy { get; set; }
}

public class OrganizationLabel
{
    [PrimaryKey]
    public string Slug { get; set; }
    [Index]
    public int OrganizationId { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }

    [IgnoreDataMember] public DateTime Created { get; set; }
    [IgnoreDataMember] public string CreatedBy { get; set; }

    [IgnoreDataMember] public DateTime Modified { get; set; }
    [IgnoreDataMember] public string ModifiedBy { get; set; }
}

[UniqueConstraint(nameof(OrganizationId), nameof(UserId))]
public class OrganizationMember
{
    [AutoIncrement]
    public int Id { get; set; }

    public int OrganizationId { get; set; }

    public int UserId { get; set; }

    public string UserName { get; set; }

    public bool IsOwner { get; set; }

    public bool IsModerator { get; set; }

    public bool DenyAll { get; set; }

    public bool DenyPosts { get; set; }

    public bool DenyComments { get; set; }

    public string Notes { get; set; }

    [IgnoreDataMember] public DateTime Created { get; set; }
    [IgnoreDataMember] public string CreatedBy { get; set; }

    [IgnoreDataMember] public DateTime Modified { get; set; }
    [IgnoreDataMember] public string ModifiedBy { get; set; }
}

[UniqueConstraint(nameof(OrganizationId), nameof(UserId))]
public class OrganizationMemberInvite
{
    [AutoIncrement]
    public int Id { get; set; }

    public int OrganizationId { get; set; }

    [Index]
    public int UserId { get; set; }

    public string UserName { get; set; }

    [IgnoreDataMember] public DateTime Created { get; set; }

    [IgnoreDataMember] public int? OrganizationMemberId { get; set; }

    [IgnoreDataMember] public DateTime? Approved { get; set; }
    [IgnoreDataMember] public string ApprovedBy { get; set; }

    public DateTime? Dismissed { get; set; }
    [IgnoreDataMember] public string DismissedBy { get; set; }
}
    
public class OrganizationSubscription
{
    [AutoIncrement]
    public long Id { get; set; }

    [Index]
    public int OrganizationId { get; set; }

    [Index]
    public int UserId { get; set; }

    public string UserName { get; set; }

    /// <summary>
    /// Send notifications
    /// </summary>
    [PgSqlTextArray]
    public string[] PostTypes { get; set; }

    /// <summary>
    /// Digest Frequency
    /// </summary>
    public int? FrequencyDays { get; set; }

    public long? LastSyncedId { get; set; }

    public DateTime? LastSynced { get; set; }

    public DateTime Created { get; set; }
}