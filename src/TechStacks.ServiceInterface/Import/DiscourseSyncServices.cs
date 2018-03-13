using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Import
{
    public class DiscourseSite
    {
        public string RefSource { get; set; }
        public string RefSlug { get; set; }
        public int OwnerId { get; set; }
        public int OrganizationId { get; set; }
        public string UserName { get; set; }
        public Dictionary<string, DiscourseImportRule> CategoryImportRules { get; set; }
        public string ProfileUrlFormat { get; set; }
        public string ConnectionString { get; set; }
    }

    public class DiscourseImportRule
    {
        public int? CategoryId { get; set; }
        public string Category { get; set; }
        public PostType? PostType { get; set; }
        public long? TechnologyId { get; set; }
    }

    [Alias("users")]
    public class DiscourseUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Approved { get; set; }
        public int? UploadedAvatarId { get; set; }
    }

    [Alias("categories")]
    public class DiscourseCategory
    {
        public string ParentName { get; set; }
        public int ParentId { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public string CategorySlug { get; set; }
        public string CategoryColor { get; set; }
    }

    [Alias("topics")]
    public class DiscourseTopic
    {
        public long Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime LastPostedAt { get; set; }
        public long Views { get; set; }
        public int UserId { get; set; }
        public bool Visible { get; set; }
        public int WordCount { get; set; }
    }

    [Alias("posts")]
    public class DiscoursePost
    {
        public long Id { get; set; }
        public int UserId { get; set; }
        public long TopicId { get; set; }
        public int PostNumber { get; set; }
        public int? ReplyToPostNumber { get; set; }
        public string Raw { get; set; }
        public string Cooked { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Hidden { get; set; }
        public DateTime HiddenAt { get; set; }
        public int WordCount { get; set; }
    }

    [RequiredRole(nameof(RoleNames.Admin))]
    public class DiscourseSyncServices : Service
    {
        public DiscourseSite Site { get; set; }

        public object Any(SyncDiscourseSite request)
        {
            if (!SiteConfigs.TryGetValue(request.Site, out var site))
                throw HttpError.NotFound("Site not found");

            Site = site;

            var now = DateTime.UtcNow;
            var response = new SyncDiscourseSiteResponse();

            using (var dbForums = OpenSiteDbConnection())
            {
                response.UserLogs = ImportForumUsers(Db, dbForums);
                response.PostsLogs = ImportForumPosts(Db, dbForums);
            }

            response.TimeTaken = (DateTime.UtcNow - now).ToString();
            return response;
        }

        public IDbConnectionFactory DbFactory { get; set; }

        public IDbConnection OpenSiteDbConnection() => ((OrmLiteConnectionFactory)DbFactory)
            .OpenDbConnectionString(Site.ConnectionString, "PostgreSqlDialect");

        public static Dictionary<string, DiscourseSite> SiteConfigs = new Dictionary<string, DiscourseSite>
        {
            { "ss-forums", new DiscourseSite
            {
                RefSource = "ss-forums",
                RefSlug = "servicestack",
                UserName = "ServiceStack",
                OrganizationId = 1,
                OwnerId = 8,
                CategoryImportRules = new Dictionary<string, DiscourseImportRule>
                {
                    { "News", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Announcement } },
                    { "Announcements", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Announcement } },
                    { "Uncategorized", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Question } },
                    { "Archive", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Question } },
                    { "Meta", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Question } },
                    { "Showcase", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Showcase } },
                    { "Live Demos", new DiscourseImportRule { Category = "ServiceStack", PostType = PostType.Showcase } },

                    { "Android", new DiscourseImportRule { Category = "Clients", TechnologyId = 242} },
                    { "iOS", new DiscourseImportRule { Category = "Clients", TechnologyId = 241} },
                    { "Silverlight", new DiscourseImportRule { Category = "Clients", TechnologyId = 243} },
                    { "PCL", new DiscourseImportRule { Category = "Clients" } },
                    { "C#", new DiscourseImportRule { Category = "Clients", TechnologyId = 243 } },
                    { "Java", new DiscourseImportRule { Category = "Clients", TechnologyId = 19 } },
                    { "JavaScript", new DiscourseImportRule { Category = "Clients", TechnologyId = 37 } },
                    { "Swift", new DiscourseImportRule { Category = "Clients", TechnologyId = 24 } },
                    { "TypeScript", new DiscourseImportRule { Category = "Clients", TechnologyId = 173 } },
                    { "VB.NET", new DiscourseImportRule { Category = "Clients", TechnologyId = 246 } },
                    { "F#", new DiscourseImportRule { Category = "Clients", TechnologyId = 17 } },
                    { "Kotlin", new DiscourseImportRule { Category = "Clients", TechnologyId = 191 } },

                    { "AngularJS", new DiscourseImportRule { Category = "Single Page Apps", TechnologyId = 7 } },
                    { "React.js", new DiscourseImportRule { Category = "Single Page Apps", TechnologyId = 8 } },
                    { "Vue", new DiscourseImportRule { Category = "Single Page Apps", TechnologyId = 201 } },
                    { "Bundler", new DiscourseImportRule { Category = "Single Page Apps" } },

                    { "Azure", new DiscourseImportRule { Category = "ServiceStack.Azure", TechnologyId = 73 } },
                    { "Dynamo DB", new DiscourseImportRule { Category = "ServiceStack.Aws", TechnologyId = 63 } },
                    { "AWS", new DiscourseImportRule { Category = "ServiceStack.Aws", TechnologyId = 244 } },

                    { "Mono", new DiscourseImportRule { Category = "Hosting", TechnologyId = 124 } },
                    { ".NET Core", new DiscourseImportRule { Category = "Hosting", TechnologyId = 239 } },
                    { "Self Hosting", new DiscourseImportRule { Category = "Hosting", TechnologyId = 238 } },
                    { "WebForms", new DiscourseImportRule { Category = "Hosting", TechnologyId = 235 } },

                    { "MySql", new DiscourseImportRule { Category = "ServiceStack.OrmLite", TechnologyId = 38 } },
                    { "PostgreSQL", new DiscourseImportRule { Category = "ServiceStack.OrmLite", TechnologyId = 2 } },
                    { "SQL Server", new DiscourseImportRule { Category = "ServiceStack.OrmLite", TechnologyId = 100 } },
                    { "Sqlite", new DiscourseImportRule { Category = "ServiceStack.OrmLite", TechnologyId = 10 } },
                    { "Oracle", new DiscourseImportRule { Category = "ServiceStack.OrmLite", TechnologyId = 82 } },

                    { "Message Pack", new DiscourseImportRule { Category = "Serialization", TechnologyId = 78 } },
                    { "Protocol Buffers", new DiscourseImportRule { Category = "Serialization", TechnologyId = 77 } },
                    { "SOAP", new DiscourseImportRule { Category = "Serialization", TechnologyId = 245 } },

                    { "Rabbit MQ", new DiscourseImportRule { Category = "Messaging (MQ)", TechnologyId = 108 } },
                    { "Redis MQ", new DiscourseImportRule { Category = "Messaging (MQ)", TechnologyId = 9 } },

                    { "Stripe", new DiscourseImportRule { Category = "ServiceStack.Stripe", TechnologyId = 70 } },

                    { "Messaging", new DiscourseImportRule { Category = "Messaging (MQ)" } },
                    { "ServiceStack.Gap", new DiscourseImportRule { Category = "ServiceStack" } },
                    { "Encryption", new DiscourseImportRule { Category = "Encrypted Messaging" } },
                    { "MyGet pre-releases", new DiscourseImportRule { Category = "MyGet" } },
                    { "Markdown", new DiscourseImportRule { Category = "ServiceStack" } },
                    { "JSON", new DiscourseImportRule { Category = "ServiceStack.Text" } },
                    { "CSV", new DiscourseImportRule { Category = "ServiceStack.Text" } },
                    { "JSV", new DiscourseImportRule { Category = "ServiceStack.Text" } },
                    { "HTTP Utils", new DiscourseImportRule { Category = "ServiceStack.Text" } },
                    { "Templates", new DiscourseImportRule { Category = "ServiceStack Templates" } },
                },
                ConnectionString = Environment.GetEnvironmentVariable("FORUMS_DB"),
                ProfileUrlFormat = "https://forums.servicestack.net/user_avatar/forums.servicestack.net/{0}/100/{1}.png",
            }}
        };

        public Category ToCategory(DiscourseCategory c) => new Category
        {
            Name = c.CategoryName,
            Slug = c.CategorySlug.GenerateSlug(),
            OrganizationId = Site.OrganizationId,
            Color = "#" + c.CategoryColor,
            RefId = c.CategoryId,
            RefSource = Site.RefSource,  //overridden with Technology.Id/Technology when exists
            RefUrn = $"urn:category:{c.CategoryId}",
            Created = DateTime.Now,
            CreatedBy = Site.UserName,
            Modified = DateTime.Now,
            ModifiedBy = Site.UserName,
        };

        public Post ApplyRules(Post post, string categoryName)
        {
            if (Site.CategoryImportRules.TryGetValue(categoryName, out var importRule))
            {
                if (importRule.CategoryId != null)
                    post.CategoryId = importRule.CategoryId.Value;

                if (importRule.PostType != null)
                    post.Type = importRule.PostType.Value;

                if (importRule.TechnologyId != null)
                    post.TechnologyIds = new [] { (int)importRule.TechnologyId.Value };
            }

            return post;
        }

        public Post ToPost(DiscourseTopic topic, int categoryId, int userId, string userName) => new Post
        {
            Type = PostType.Question,
            Title = topic.Title,
            Slug = topic.Title.GenerateSlug(),
            OrganizationId = Site.OrganizationId,
            CategoryId = categoryId,
            UserId = userId,
            Created = topic.CreatedAt,
            CreatedBy = userName,
            Modified = topic.UpdatedAt,
            ModifiedBy = userName,
            LastCommentDate = topic.LastPostedAt,
            Views = topic.Views,
            RefId = topic.Id,
            RefSource = Site.RefSource,
            RefUrn = $"urn:topic:{topic.Id}",
            Hidden = !topic.Visible ? topic.UpdatedAt : (DateTime?)null,
            HiddenBy = !topic.Visible ? userName : null,
            WordCount = topic.WordCount,
        };

        public PostComment ToPostComment(DiscoursePost post, long postId, int userId, string userName, long? replyId = null) => new PostComment
        {
            PostId = postId,
            UserId = userId,
            Created = post.CreatedAt,
            CreatedBy = userName,
            Modified = post.UpdatedAt,
            ReplyId = replyId,
            RefId = post.Id,
            Content = post.Raw.StripHtml(),
            ContentHtml = post.Cooked,
            RefSource = Site.RefSource,
            RefUrn = $"urn:post:{post.Id}",
            Hidden = post.Hidden ? post.UpdatedAt : (DateTime?)null,
            HiddenBy = post.Hidden ? userName : null,
            WordCount = post.WordCount,
        };

        public List<string> ImportForumUsers(IDbConnection db, IDbConnection dbForums)
        {
            var logs = new List<string>();

            var maxUserId = db.Scalar<int>(db.From<CustomUserAuth>()
                .Where(x => x.RefSource == Site.RefSource)
                .Select(x => Sql.Max(x.RefId)));

            var forumUsers = dbForums.Select<DiscourseUser>(x => x.Approved && x.Id > maxUserId);

            foreach (var forumUser in forumUsers)
            {
                var lowerEmail = forumUser.Email.ToLower();
                var existingUser = db.Single<CustomUserAuth>(x => x.Email.ToLower() == lowerEmail);

                if (existingUser != null)
                {
                    logs.Add($"Match found: {existingUser.UserName} <=> {forumUser.Username}");
                    db.UpdateOnly(() => new CustomUserAuth
                    {
                        RefSource = Site.RefSource,
                        RefId = forumUser.Id,
                        RefUrn = $"urn:user:{forumUser.Id}",
                    }, where: x => x.Id == existingUser.Id);
                }
                else
                {
                    logs.Add($"No match found for {forumUser.Username}");
                    var profileUrl = forumUser.UploadedAvatarId != null
                        ? Site.ProfileUrlFormat.Fmt(forumUser.Username, forumUser.UploadedAvatarId.Value)
                        : null;

                    var userId = (int)db.Insert(new CustomUserAuth
                    {
                        UserName = forumUser.Username,
                        Email = forumUser.Email,
                        CreatedDate = forumUser.CreatedAt,
                        ModifiedDate = forumUser.UpdatedAt,
                        DefaultProfileUrl = profileUrl,
                        RefSource = Site.RefSource,
                        RefId = forumUser.Id,
                        RefUrn = $"urn:user:{forumUser.Id}",
                    }, selectIdentity:true);

                    db.Insert(new UserActivity
                    {
                        Id = userId,
                        UserName = forumUser.Username,
                        Created = DateTime.UtcNow,
                        Modified = DateTime.UtcNow,
                    });

                }
            }

            return logs;
        }

        public List<string> ImportForumPosts(IDbConnection db, IDbConnection dbForums)
        {
            var logs = new List<string>();

            var categoryNameMap = db.Dictionary<string, int>(db.From<Category>()
                .Where(x => x.OrganizationId == Site.OrganizationId)
                .Select(x => new { x.Name, x.Id }));

            var maxCategoryId = db.Scalar<int>(db.From<Category>()
                .Where(x => x.RefSource == Site.RefSource)
                .Select(x => Sql.Max(x.RefId)));

            var maxTopicId = db.Scalar<int>(db.From<Post>()
                .Where(x => x.RefSource == Site.RefSource)
                .Select(x => Sql.Max(x.RefId)));

            var maxPostId = db.Scalar<int>(db.From<PostComment>()
                .Where(x => x.RefSource == Site.RefSource)
                .Select(x => Sql.Max(x.RefId)));

            var forumCategories = dbForums.SqlList<DiscourseCategory>(@"
                  select distinct 
                         p.name as parent_name, p.id as parent_id, 
                         c.name as category_name, c.id as category_id, c.slug as category_slug, c.color as category_color  
                    from topics t
                    join categories c on c.id = t.category_id
                    left join categories p on p.id = c.parent_category_id
                   where c.id > @maxCategoryId and p.id > @maxCategoryId and t.id > @maxTopicId
                     and t.user_id != -1 and t.category_id is not null and t.deleted_at is null  
                     and t.posts_count > 1
                   order by p.name desc, c.name", new { maxCategoryId, maxTopicId });

            foreach (var entry in Site.CategoryImportRules)
            {
                var fromCategory = entry.Key;
                var toCategory = entry.Value.Category;
                if (toCategory != null && categoryNameMap.TryGetValue(toCategory, out var toCategoryId))
                {
                    categoryNameMap[fromCategory] = toCategoryId;
                }
            }

            foreach (var forumCategory in forumCategories)
            {
                if (!categoryNameMap.TryGetValue(forumCategory.CategoryName, out var categoryId))
                {
                    if (maxCategoryId > 0) $"Inserting Category: {forumCategory.CategoryName}".Print();

                    categoryId = (int)db.Insert(ToCategory(forumCategory), selectIdentity: true);
                    categoryNameMap[forumCategory.CategoryName] = categoryId;
                }
            }

            foreach (var entry in Site.CategoryImportRules)
            {
                entry.Value.CategoryId = categoryNameMap[entry.Value.Category];
            }

            var forumUserIdsMap = db.Dictionary<long, int>(db.From<CustomUserAuth>()
                .Where(x => x.RefSource == Site.RefSource)
                .Select(x => new { x.RefId, x.Id }));

            var forumUserNamesMap = db.Dictionary<long, string>(db.From<CustomUserAuth>()
                .Where(x => x.RefSource == Site.RefSource)
                .Select(x => new { x.RefId, x.UserName }));

            var forumPosts = dbForums.SqlList<DiscoursePost>(@"
                  select p.* 
                    from posts p
                   where p.id > @maxPostId
                     and p.user_id != -1 and p.deleted_at is null 
                     and raw not like 'Thanks for joining %'
                     and raw not like 'This topic is now %'
                   order by topic_id", new { maxPostId });

            var topicIds = maxTopicId > 0
                ? new HashSet<long>(forumPosts.Map(x => x.TopicId)).ToArray()
                : TypeConstants<long>.EmptyArray;
            if (topicIds.Length == 0)
                topicIds = new long[] {0}; //IN (0)

            var forumTopics = dbForums.SqlList<DiscourseTopic>(@"
                  select c.name as category_name, c.id as category_id, t.*   
                    from topics t
                    join categories c on c.id = t.category_id
                    left join categories p on p.id = c.parent_category_id
                   where ((t.id > @maxTopicId and p.id > @maxPostId) or t.id in (@topicIds))
                     and t.user_id != -1 and t.category_id is not null and t.deleted_at is null  
                     and t.posts_count > 1
                   order by id", new { maxTopicId, maxPostId, topicIds });

            var forumPostsLookup = forumPosts.ToLookup(x => x.TopicId);

            foreach (var forumTopic in forumTopics)
            {
                var categoryId = categoryNameMap[forumTopic.CategoryName];
                var userId = forumUserIdsMap[forumTopic.UserId];
                var userName = forumUserNamesMap[forumTopic.UserId];

                var forumTopicPosts = forumPostsLookup[forumTopic.Id].OrderBy(x => x.PostNumber).ToArray();
                if (forumTopicPosts.Length == 0)
                    break;

                var firstPost = forumTopicPosts.FirstOrDefault();
                var firstPostBySameUser = firstPost?.UserId == forumTopic.UserId;

                var post = db.Single<Post>(x => x.RefSource == Site.RefSource && x.RefId == forumTopic.Id);
                var postId = post?.Id ?? 0;

                if (postId == 0)
                {
                    post = ApplyRules(ToPost(forumTopic, categoryId, userId, userName), forumTopic.CategoryName);
                    if (firstPostBySameUser)
                    {
                        post.Content = firstPost.Raw.StripHtml();
                        post.ContentHtml = firstPost.Cooked;
                    }

                    if (maxTopicId > 0) $"Inserting Topic: {forumTopic.Title}".Print();

                    postId = db.Insert(post, selectIdentity: true);
                }

                var forumPostNumberCommentIdMap = new Dictionary<int, long>();
                var firstIndex = firstPostBySameUser ? 1 : 0;

                for (var i = firstIndex; i < forumTopicPosts.Length; i++)
                {
                    var forumPost = forumTopicPosts[i];
                    userId = forumUserIdsMap[forumPost.UserId];
                    userName = forumUserNamesMap[forumPost.UserId];

                    if (forumPost.ReplyToPostNumber == null)
                    {
                        if (maxPostId > 0) $"Inserting Comment: {forumPost.Raw.SafeSubstring(0, 50)}".Print();

                        var commentId = db.Insert(ToPostComment(forumPost, postId, userId, userName), selectIdentity: true);
                        forumPostNumberCommentIdMap[forumPost.PostNumber] = commentId;
                    }
                    else
                    {
                        if (maxPostId > 0) $"Inserting Reply Comment: {forumPost.Raw.SafeSubstring(0, 50)} replyTo: {forumPost.ReplyToPostNumber}".Print();

                        forumPostNumberCommentIdMap.TryGetValue(forumPost.ReplyToPostNumber.Value, out var replyId);
                        if (replyId == 0)
                        {
                            var replyFormPostId = forumTopicPosts.FirstOrDefault(x => x.PostNumber == forumPost.ReplyToPostNumber.Value)?.Id
                                ?? dbForums.Scalar<long>("select id from posts where topic_id = @topicId and post_number = @replyPostNumber",
                                                         new { topicId = forumTopic.Id, replyPostNumber = forumPost.ReplyToPostNumber.Value });

                            if (replyFormPostId > 0)
                            {
                                //replyId == 0 could be top-level post, so there's no parent
                                replyId = db.Scalar<long>(db.From<PostComment>()
                                    .Where(x => x.RefSource == Site.RefSource 
                                        && x.RefId == replyFormPostId));
                            }
                        }
                        var useReplyId = replyId > 0 ? replyId : (long?) null;

                        var commentId = db.Insert(ToPostComment(forumPost, postId, userId, userName, useReplyId), selectIdentity: true);
                        forumPostNumberCommentIdMap[forumPost.PostNumber] = commentId;
                    }
                }
            }

            return logs;
        }
    }
}