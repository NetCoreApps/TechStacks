using System.Runtime.Serialization;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace TechStacks.Migrations;

public class Migration1000 : MigrationBase
{
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

    public class PageStats
    {
        public string Id { get; set; }

        public long ViewCount { get; set; }

        public long FavCount { get; set; }

        public long RefId { get; set; }

        public string RefType { get; set; }

        public string RefSlug { get; set; }

        public DateTime LastModified { get; set; }
    }

    public enum PostType
    {
        [Description("Announcements")]
        Announcement,

        [Description("Posts")]
        Post,

        [Description("Showcase")]
        Showcase,

        [Description("Questions")]
        Question,

        [Description("Feature Requests")]
        Request,

        //TODO:
        //[Description("Events")]
        //Event,
    }

    public class Post
    {
        [AutoIncrement]
        public long Id { get; set; }

        public int OrganizationId { get; set; }

        public int UserId { get; set; }

        [Index]
        public PostType Type { get; set; }

        [Index]
        public int CategoryId { get; set; }

        public string Title { get; set; }

        public string Slug { get; set; }

        public string Url { get; set; }

        public string ImageUrl { get; set; }

        [StringLength(StringLengthAttribute.MaxText)]
        public string Content { get; set; }

        [StringLength(StringLengthAttribute.MaxText)]
        public string ContentHtml { get; set; }

        public long? PinCommentId { get; set; }

        [PgSqlIntArray]
        public int[] TechnologyIds { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string Location { get; set; }

        public string MetaType { get; set; }

        [PgSqlJsonB]
        public string Meta { get; set; }

        public bool Approved { get; set; }

        public long UpVotes { get; set; }

        public long DownVotes { get; set; }

        [IgnoreDataMember]
        public long PointsModifier { get; set; }

        [Index]
        public long Points { get; set; }

        public long Views { get; set; }

        public long Favorites { get; set; }

        public int Subscribers { get; set; }

        public int ReplyCount { get; set; }

        public int CommentsCount { get; set; }

        public int WordCount { get; set; }

        public int ReportCount { get; set; }

        public int LinksCount { get; set; }

        public int LinkedToCount { get; set; }

        public int Score { get; set; }

        [Index]
        public int Rank { get; set; }

        [PgSqlTextArray]
        public string[] Labels { get; set; }

        [PgSqlIntArray]
        public int[] RefUserIds { get; set; }

        [PgSqlTextArray]
        public string[] RefLinks { get; set; }

        [PgSqlIntArray]
        public int[] MuteUserIds { get; set; }

        public DateTime? LastCommentDate { get; set; }

        public long? LastCommentId { get; set; }

        public int? LastCommentUserId { get; set; }

        public DateTime? Deleted { get; set; }
        public string DeletedBy { get; set; }

        public DateTime? Locked { get; set; }
        public string LockedBy { get; set; }

        public DateTime? Hidden { get; set; }
        public string HiddenBy { get; set; }

        public string Status { get; set; }
        public DateTime? StatusDate { get; set; }
        public string StatusBy { get; set; }

        public bool Archived { get; set; }

        [IgnoreDataMember] public string Notes { get; set; }

        public DateTime? Bumped { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }

        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public long? RefId { get; set; }
        public string RefSource { get; set; }
        public string RefUrn { get; set; }
    }

    public class PostChangeHistory
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public long PostId { get; set; }

        public string ChangedName { get; set; }

        public string ChangedValue { get; set; }

        public string ChangedReason { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    }

    [UniqueConstraint(nameof(PostId), nameof(UserId))]
    public class PostVote
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public long PostId { get; set; }

        [Index]
        public int UserId { get; set; }

        public int Weight { get; set; }

        [Index]
        public DateTime Created { get; set; }
    }

    [UniqueConstraint(nameof(PostId), nameof(UserId), Name = "UC_post_favorite_post_id_user_id")]
    public class PostFavorite
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public long PostId { get; set; }

        [Index]
        public int UserId { get; set; }

        [Index]
        public DateTime Created { get; set; }
    }

    public enum FlagType
    {
        [Description("Violates Rules or Conduct")]
        Violation,

        [Description("This is Spam")]
        Spam,

        [Description("This is abusive or harmful")]
        Abusive,

        [Description("This contains something private that shouldn't be posted in public")]
        Confidential,

        [Description("This is off topic")]
        OffTopic,

        [Description("Other Issues")]
        Other,
    }

    public class PostReport
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public int OrganizationId { get; set; }

        public long PostId { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public FlagType FlagType { get; set; }

        public string ReportNotes { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Acknowledged { get; set; }
        public string AcknowledgedBy { get; set; }

        public DateTime? Dismissed { get; set; }
        public string DismissedBy { get; set; }
    }

    public class PostComment
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public long PostId { get; set; }

        public int UserId { get; set; }

        public long? ReplyId { get; set; }

        [StringLength(StringLengthAttribute.MaxText)]
        public string Content { get; set; }

        [StringLength(StringLengthAttribute.MaxText)]
        public string ContentHtml { get; set; }

        public int Score { get; set; }

        public int Rank { get; set; }

        public long UpVotes { get; set; }

        public long DownVotes { get; set; }

        public long Favorites { get; set; }

        public int WordCount { get; set; }

        public int ReportCount { get; set; }

        public DateTime? Deleted { get; set; }
        [IgnoreDataMember] public string DeletedBy { get; set; }
        [IgnoreDataMember] public string Notes { get; set; }

        public DateTime? Hidden { get; set; }
        [IgnoreDataMember] public string HiddenBy { get; set; }

        public DateTime Modified { get; set; }

        [Index]
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }

        public long? RefId { get; set; }

        public string RefSource { get; set; }

        public string RefUrn { get; set; }
    }

    [UniqueConstraint(nameof(UserId), nameof(PostCommentId))]
    public class PostCommentVote
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public long PostId { get; set; }

        [Index]
        public int UserId { get; set; }

        public long PostCommentId { get; set; }

        public int Weight { get; set; }

        [Index]
        public DateTime Created { get; set; }
    }

    public class PostCommentReport
    {
        [AutoIncrement]
        public long Id { get; set; }

        [Index]
        public int OrganizationId { get; set; }

        public long PostId { get; set; }

        public long PostCommentId { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public FlagType FlagType { get; set; }

        public string ReportNotes { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Acknowledged { get; set; }
        public string AcknowledgedBy { get; set; }

        public DateTime? Dismissed { get; set; }
        public string DismissedBy { get; set; }
    }

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

    public class UserActivity
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        [Default(0)]
        public int Karma { get; set; }

        [Default(0)]
        public int TechnologyCount { get; set; }

        [Default(0)]
        public int TechStacksCount { get; set; }

        [Default(0)]
        public int PostsCount { get; set; }

        [Default(0)]
        public int PostUpVotes { get; set; }

        [Default(0)]
        public int PostDownVotes { get; set; }

        [Default(0)]
        public int CommentUpVotes { get; set; }

        [Default(0)]
        public int CommentDownVotes { get; set; }

        [Default(0)]
        public int PostCommentsCount { get; set; }

        [Default(0)]
        public int PinnedCommentCount { get; set; }

        [Default(0)]
        public int PostReportCount { get; set; }

        [Default(0)]
        public int PostCommentReportCount { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }

    public class UserFavoriteTechnologyStack
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string UserId { get; set; }

        [References(typeof(TechnologyStack))]
        public int TechnologyStackId { get; set; }
    }

    public class UserFavoriteTechnology
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string UserId { get; set; }

        [References(typeof(Technology))]
        public int TechnologyId { get; set; }
    }

    public abstract class TechnologyStackBase
    {
        [AutoIncrement]
        public long Id { get; set; }

        public string Name { get; set; }
        public string VendorName { get; set; }
        public string Description { get; set; }
        public string AppUrl { get; set; }
        public string ScreenshotUrl { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime LastModified { get; set; }
        public string LastModifiedBy { get; set; }

        public bool IsLocked { get; set; }

        public string OwnerId { get; set; }

        [Index]
        public string Slug { get; set; }

        [StringLength(StringLengthAttribute.MaxText)]
        public string Details { get; set; }

        [StringLength(StringLengthAttribute.MaxText)]
        public string DetailsHtml { get; set; }

        public DateTime? LastStatusUpdate { get; set; }

        public int? OrganizationId { get; set; }

        public long? CommentsPostId { get; set; }

        [Default(0)]
        public int ViewCount { get; set; }

        [Default(0)]
        public int FavCount { get; set; }
    }

    public class TechnologyStack : TechnologyStackBase {}

    public class TechnologyStackHistory : TechnologyStackBase
    {
        public long TechnologyStackId { get; set; }
        public string Operation { get; set; }
        public List<long> TechnologyIds { get; set; }
    }

    public class TechnologyChoice
    {
        [AutoIncrement]
        public long Id { get; set; }

        [References(typeof(Technology))]
        public long TechnologyId { get; set; }

        [Reference]
        public Technology Technology { get; set; }

        [References(typeof(TechnologyStack))]
        public long TechnologyStackId { get; set; }

        [Reference]
        public TechnologyStack TechnologyStack { get; set; }

        public string CreatedBy { get; set; }
        public string LastModifiedBy { get; set; }
        public string OwnerId { get; set; }
    }

    public abstract class TechnologyBase
    {
        [AutoIncrement]
        public long Id { get; set; }

        public string Name { get; set; }
        public string VendorName { get; set; }
        public string VendorUrl { get; set; }
        public string ProductUrl { get; set; }
        public string LogoUrl { get; set; }
        public string Description { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime LastModified { get; set; }
        public string LastModifiedBy { get; set; }
        public string OwnerId { get; set; }

        [Index]
        public string Slug { get; set; }

        public bool LogoApproved { get; set; }
        public bool IsLocked { get; set; }

        public TechnologyTier Tier { get; set; }

        public DateTime? LastStatusUpdate { get; set; }

        public int? OrganizationId { get; set; }

        public long? CommentsPostId { get; set; }

        [Default(0)]
        public int ViewCount { get; set; }

        [Default(0)]
        public int FavCount { get; set; }
    }

    public class Technology : TechnologyBase {}

    public class TechnologyHistory : TechnologyBase
    {
        public long TechnologyId { get; set; }
        public string Operation { get; set; }
    }

    public enum TechnologyTier
    {
        [Description("Programming Languages")]
        ProgrammingLanguage,

        [Description("Client Libraries")]
        Client,

        [Description("HTTP Server Technologies")]
        Http,

        [Description("Server Libraries")]
        Server,

        [Description("Databases and NoSQL Datastores")]
        Data,

        [Description("Server Software")]
        SoftwareInfrastructure,

        [Description("Operating Systems")]
        OperatingSystem,

        [Description("Cloud/Hardware Infrastructure")]
        HardwareInfrastructure,

        [Description("3rd Party APIs/Services")]
        ThirdPartyServices,
    }

    public override void Up()
    {
        Db.CreateTableIfNotExists<Organization>();
        Db.CreateTableIfNotExists<OrganizationMember>();
        Db.CreateTableIfNotExists<OrganizationLabel>();
        Db.CreateTableIfNotExists<OrganizationMemberInvite>();
        Db.CreateTableIfNotExists<OrganizationSubscription>();
        Db.CreateTableIfNotExists<Category>();
        Db.CreateTableIfNotExists<PageStats>();
        Db.CreateTableIfNotExists<Post>();
        Db.CreateTableIfNotExists<PostVote>();
        Db.CreateTableIfNotExists<PostFavorite>();
        Db.CreateTableIfNotExists<Notification>();
        Db.CreateTableIfNotExists<UserActivity>();
        Db.CreateTableIfNotExists<TechnologyStack>();
        Db.CreateTableIfNotExists<Technology>();
        Db.CreateTableIfNotExists<TechnologyHistory>();
        Db.CreateTableIfNotExists<TechnologyChoice>();
        Db.CreateTableIfNotExists<TechnologyStackHistory>();
        Db.CreateTableIfNotExists<UserFavoriteTechnologyStack>();
        Db.CreateTableIfNotExists<UserFavoriteTechnology>();
    }

    public override void Down()
    {
    }
}
