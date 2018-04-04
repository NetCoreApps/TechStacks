using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using NUnit.Framework.Constraints;
using ServiceStack;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel.Types;
using ServiceStack.Text;
using ServiceStack.Text.Json;
using TechStacks.ServiceInterface;
using TechStacks.ServiceInterface.DataModel;
using TechStacks.ServiceModel;

namespace TechStacks.Tests
{
    //[Ignore("One-off Migration Tasks")]
    public class MigrationTasks : DbTasksBase
    {
        static MigrationTasks() => LogManager.LogFactory = new ConsoleLogFactory(debugEnabled: true);

        //[Test]
        public void Create_Schema()
        {
            using (var db = dbFactory.Open())
            {
                db.DropAndCreateTable<Post>();
                db.DropAndCreateTable<PostVote>();
                db.DropAndCreateTable<PostReport>();
                db.DropAndCreateTable<PostComment>();
                db.DropAndCreateTable<PostCommentVote>();
                db.DropAndCreateTable<PostCommentReport>();

                db.DropAndCreateTable<Organization>();
                db.DropAndCreateTable<OrganizationMember>();

                //AddPosts(db);
                //AddPostVotes(db);
            }
        }

//        [Test]
        public void Create_GroupMember_schema()
        {
            using (var db = dbFactory.Open())
            {
                db.DropAndCreateTable<OrganizationMember>();
                db.DropAndCreateTable<OrganizationMemberInvite>();

                var orgs = db.Select<Organization>(x => x.Slug == "servicestack");

                foreach (var org in orgs)
                {
                    if (org.Slug == "servicestack")
                    {
                        db.Insert(new OrganizationMember
                        {
                            OrganizationId = org.Id,
                            UserId = 8,
                            UserName = "ServiceStack",
                            IsOwner = org.Name == "ServiceStack",
                            IsModerator = org.Name != "ServiceStack",
                            DenyPosts = org.Name != "ServiceStack",
                            Created = DateTime.Now,
                            CreatedBy = "ServiceStack"
                        });
                        db.Insert(new OrganizationMember
                        {
                            OrganizationId = org.Id,
                            UserId = 379,
                            UserName = "webstacks",
                            DenyComments = org.Name == "ServiceStack",
                            Created = DateTime.Now,
                            CreatedBy = "webstacks"
                        });
                    }

                    db.Insert(new OrganizationMember
                    {
                        OrganizationId = org.Id,
                        UserId = 17,
                        UserName = "mythz",
                        Created = DateTime.Now,
                        CreatedBy = "mythz",
                        IsOwner = true,
                    });
                }
            }
        }

        //[Test]
        public void Add_ViewCounts()
        {
            using (var db = dbFactory.Open())
            {
                db.AddColumn<Technology>(x => x.ViewCount);
                db.AddColumn<Technology>(x => x.FavCount);

                db.AddColumn<TechnologyStack>(x => x.ViewCount);
                db.AddColumn<TechnologyStack>(x => x.FavCount);

                db.AddColumn<TechnologyStackHistory>(x => x.ViewCount);
                db.AddColumn<TechnologyStackHistory>(x => x.FavCount);

                db.AddColumn<TechnologyHistory>(x => x.ViewCount);
                db.AddColumn<TechnologyHistory>(x => x.FavCount);
            }
        }

        //[Test]
        public void Add_PostFavorite()
        {
            using (var db = dbFactory.Open())
            {
                db.DropAndCreateTable<OrganizationMemberInvite>();
            }
        }

        //[Test]
        public void Add_OrganizationId()
        {
            using (var db = dbFactory.Open())
            {
                if (!db.ColumnExists<Technology>(x => x.OrganizationId))
                    db.AddColumn<Technology>(x => x.OrganizationId);

                if (!db.ColumnExists<TechnologyHistory>(x => x.OrganizationId))
                    db.AddColumn<TechnologyHistory>(x => x.OrganizationId);

                if (!db.ColumnExists<TechnologyStack>(x => x.OrganizationId))
                    db.AddColumn<TechnologyStack>(x => x.OrganizationId);

                if (!db.ColumnExists<TechnologyStackHistory>(x => x.OrganizationId))
                    db.AddColumn<TechnologyStackHistory>(x => x.OrganizationId);
            }
        }

        [Test]
        public void Create_Subscription_Tables()
        {
            using (var db = dbFactory.Open())
            {
//                db.DropAndCreateTable<OrganizationSubscription>();
                db.DropAndCreateTable<Notification>();
                db.DropAndCreateTable<EmailTemplate>();
//                db.DropAndCreateTable<SubscribePost>();
//
//                db.DropAndCreateTable<SubscriptionPost>();
            }
        }

        [Test]
        public void Add_PostTypes()
        {
            using (var db = dbFactory.Open())
            {
                db.AddColumn<Organization>(x => x.DefaultSubscriptionPostTypes);
                
//                db.AddColumn<Organization>(x => x.DefaultPostType);
//                db.DropAndCreateTable<OrganizationLabel>();
//                db.AddColumn<Post>(x => x.Status);
//                db.AddColumn<Post>(x => x.StatusDate);
//                db.AddColumn<Post>(x => x.StatusBy);
//                db.AddColumn<CustomUserAuth>(x => x.CreatedBy);
//                db.DropAndCreateTable<PreRender>();
//                db.AddColumn<Post>(x => x.Labels);

                //db.AddColumn<Organization>(x => x.Lang);
                //db.DropAndCreateTable<Subscription>();

                //db.DropAndCreateTable<PostReport>();
                //db.DropAndCreateTable<PostCommentReport>();

                //db.AddColumn<Organization>(x => x.DeletePostsWithReportCount);

                //var postTypes = new[]
                //{
                //    nameof(PostType.Announcement),
                //    nameof(PostType.Post),
                //    nameof(PostType.Question),
                //    nameof(PostType.Showcase),
                //    nameof(PostType.Request),
                //};

                //var parentGroupIds = db.Column<int>(db.From<Group>()
                //    .Where(x => x.ParentId == null)
                //    .Select(x => new {x.Id}));

                //db.UpdateOnly(() => new Group { PostTypes = postTypes },
                //    where: x => parentGroupIds.Contains(x.Id));
            }
        }

        //[Test]
        public void Update_CustomUserAuth()
        {
            using (var db = dbFactory.Open())
            {
                if (!db.ColumnExists<CustomUserAuth>(x => x.RefSource))
                    db.AddColumn<CustomUserAuth>(x => x.RefSource);

                if (!db.ColumnExists<CustomUserAuth>(x => x.RefUrn))
                    db.AddColumn<CustomUserAuth>(x => x.RefUrn);

                if (!db.ColumnExists<CustomUserAuth>(x => x.DisableEmails))
                    db.AddColumn<CustomUserAuth>(x => x.DisableEmails);
            }
        }

        //[Test]
        public void Add_UserActivity()
        {
            using (var db = dbFactory.Open())
            {
                db.DropAndCreateTable<UserActivity>();

                var result = db.ExecuteSql(@"
                    insert into user_activity (id, user_name, created, modified) 
                    select id, user_name, created_date, modified_date from custom_user_auth c
                    where not exists (select * from user_activity where c.id = id)");

                $"Rows added: {result}".Print();
            }
        }

        //[Test]
        public void test_sql()
        {
            using (var db = dbFactory.Open())
            {
                db.ExecuteSql(
                    @"update post set 
                         up_votes   = (select count(*) from post_vote where post_id = @id and weight > 0), 
                         down_votes = (select count(*) from post_vote where post_id = @id and weight < 0)
                   where id = @id", new { id = 2 });
            }
        }

        public class PostInfo
        {
            public int OrganizationId { get; set; }
            public long CommentsPostId { get; set; }
            public int Id { get; set; }
            public string Slug { get; set; }
            public string Name { get; set; }
        }

        //[Test]
        public void Create_missing_userActivities()
        {
            using (var db = dbFactory.Open())
            {
                var usersWithoutActivities = db.SqlList<CustomUserAuth>(
                    @"select u.* from custom_user_auth u left join user_activity a on u.id = a.id where a.id is null");

                foreach (var user in usersWithoutActivities)
                {
                    $"Inserting User {user.Id} @{user.UserName}".Print();
                    db.Insert(new UserActivity
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Created = DateTime.UtcNow,
                        Modified = DateTime.UtcNow,
                    });
                }
            }
        }

        [Test]
        public void Update_mythz_posts_to_webstacks_and_ServiceStack()
        {
            using (var db = dbFactory.Open())
            {
                db.UpdateOnly(() => new Post { UserId = 379, CreatedBy = "webstacks" },
                    where: x => x.OrganizationId != 1 && x.UserId == 17 && x.CreatedBy == "mythz");

                db.UpdateOnly(() => new Post { UserId = 8, CreatedBy = "ServiceStack" },
                    where: x => x.OrganizationId == 1 && x.UserId == 379 && x.CreatedBy == "webstacks");
            }
        }

        //[Test]
        public void Create_missing_posts()
        {
            var now = DateTime.Now;
            var userName = "mythz";
            var userId = 17;

            using (var db = dbFactory.Open())
            {
                var techsWithMissingPosts = db.SqlList<PostInfo>(
                    "select t.organization_id, t.comments_post_id, t.id, t.slug, t.name from technology t left join post p on t.comments_post_id = p.id where p.id is null and t.comments_post_id is not null");

                foreach (var info in techsWithMissingPosts)
                {
                    var postTitle = $"{info.Name} Page Comments";
                    var postContent = $"### Comments for [{info.Name} {nameof(Technology)}](/tech/{info.Slug}) page";

                    var post = new Post
                    {
                        OrganizationId = info.OrganizationId,
                        Type = PostType.Post,
                        Title = postTitle,
                        Slug = postTitle.GenerateSlug(),
                        Content = postContent,
                        ContentHtml = $"<div class='gfm ssfm'>{MarkdownConfig.Transform(postContent)}</div>",
                        RefId = info.Id,
                        RefSource = nameof(Technology),
                        RefUrn = $"urn:{nameof(Technology)}:{info.Id}",
                        Created = now,
                        CreatedBy = userName,
                        Modified = now,
                        ModifiedBy = userName,
                        UserId = userId,
                        UpVotes = 0,
                        Rank = 0,
                        TechnologyIds = new[] { info.Id },
                    };

                    var postId = db.Insert(post, selectIdentity:true);
                    db.UpdateOnly(() => new Technology {CommentsPostId = postId},
                        where: x => x.Id == info.Id);
                }

            }
        }

        [Test]
        public void Update_descriptions_for_organizations()
        {
            using (var db = dbFactory.Open())
            {
                var techMap = db.Select<Technology>().ToDictionary(x => x.Id);
                var techOrgs = db.Select<Organization>(x => 
                    x.RefSource == nameof(Technology) && x.RefId != null 
                    && x.DescriptionHtml == null);
                
                foreach (var org in techOrgs)
                {
                    if (techMap.TryGetValue(org.RefId.Value, out var tech))
                    {
                        db.UpdateOnly(() => new Organization {
                            Description = tech.Description,
                            DescriptionHtml = MarkdownConfig.Transform(tech.Description),
                        },
                        where:x => x.Id == org.Id);
                    }
                }
                
                var stackMap = db.Select<TechnologyStack>().ToDictionary(x => x.Id);
                var stackOrgs = db.Select<Organization>(x => 
                    x.RefSource == nameof(TechnologyStack) && x.RefId != null 
                    && x.DescriptionHtml == null);
                
                foreach (var org in stackOrgs)
                {
                    if (stackMap.TryGetValue(org.RefId.Value, out var tech))
                    {
                        db.UpdateOnly(() => new Organization {
                                Description = tech.Description,
                                DescriptionHtml = MarkdownConfig.Transform(tech.Description),
                            },
                            where:x => x.Id == org.Id);
                    }
                }
            }
        }
        
        [Test]
        public void Import_from_UserVoice()
        {
            string oauthKey = Environment.GetEnvironmentVariable("USERVOICE_KEY"); //required to get emails
            const int resultsPerPage = 20;
            var i = 0;
            List<object> suggestions = null;

            var client = new JsonServiceClient("http://localhost:16325") {
                BearerToken = Environment.GetEnvironmentVariable("TECHSTACKS_DEVELOPMENT_TOKEN")
            };

            do
            {
                var url = $"https://servicestack.uservoice.com/api/v1/forums/176786/suggestions.json?per_page={resultsPerPage}&page={++i}&oauth_consumer_key={oauthKey}";
                var json = url.GetJsonFromUrl(req => req.AddBearerToken(oauthKey));
                var response = (Dictionary<string, object>) JSON.parse(json);
                suggestions = (List<object>) response["suggestions"];

                var userVoiceUsers = new Dictionary<string, UserVoiceUser>(StringComparer.OrdinalIgnoreCase);
                var techstacksUsers = new Dictionary<string, UserRef>(StringComparer.OrdinalIgnoreCase);

                UserVoiceUser toUser(object oUser)
                {
                    if (!(oUser is Dictionary<string, object> user))
                        return null;

                    if (!user.TryGetValue("email", out var oEmail))
                    {
                        "EMAIL NOT FOUND:".Print();
                        user.PrintDump();
                        return null;
                    }

                    var email = (string) oEmail;
                    if (!userVoiceUsers.ContainsKey("user"))
                    {
                        return new UserVoiceUser {
                            Id = (int) user["id"],
                            Name = (string) user["name"],
                            Email = email,
                            AvatarUrl = (string) user["avatar_url"],         
                            CreatedAt = user["created_at"].ToString().ConvertTo<DateTime>(),
                            UpdatedAt = user["updated_at"].ToString().ConvertTo<DateTime>(),
                        };
                    }

                    return null;
                }
                
                foreach (var oSuggestion in suggestions)
                {
                    var request = new ImportUserVoiceSuggestion {
                        OrganizationId = 1,                            
                    };
    
                    try
                    {
                        if (oSuggestion is Dictionary<string, object> suggestion)
                        {
                            request.Url = (string)suggestion["url"];
                            request.Id = (int)suggestion["id"];
                            request.State = (string)suggestion["state"];
                            request.Title = (string)suggestion["title"];
                            
                            //Can be null and just have title
                            request.Text = suggestion["text"] as string;
                            if (request.Text != null)
                                request.Text = JsonTypeSerializer.Unescape(request.Text);
                        
                            request.FormattedText = suggestion["formatted_text"] as string;
                            if (request.FormattedText!= null)
                                request.FormattedText = JsonTypeSerializer.Unescape(request.FormattedText);
                            
                            request.VoteCount = (int) suggestion["vote_count"];
                            request.CreatedAt = suggestion["created_at"].ToString().ConvertTo<DateTime>();
                            request.UpdatedAt = suggestion["updated_at"].ToString().ConvertTo<DateTime>();
 
                            if (suggestion.TryGetValue("category", out var category))
                            {
                                request.Category = category as string;
                            }

                            if (suggestion.TryGetValue("topic", out var oTopic) 
                                && oTopic is Dictionary<string,object> topic)
                            {
                                request.TopicId = (int) topic["id"];
                            }
                            
                            if (suggestion.TryGetValue("creator", out var creator))
                            {
                                request.Creator = toUser(creator);
                            }
    
                            if (suggestion.TryGetValue("closed_at", out var oClosedAt) 
                                && oClosedAt is string closeAt)
                            {
                                request.ClosedAt = oClosedAt.ConvertTo<DateTime>();
                            }

                            if (suggestion.TryGetValue("status_changed_by", out var statusUser))
                            {
                                request.StatusChangedBy = toUser(statusUser);
                            }
                            
                            if (suggestion.TryGetValue("status", out var oStatus) && oStatus is Dictionary<string, object> status)
                            {
                                var statusKey = (string)status["key"];
                                if (statusKey != "published")
                                {
                                    request.StatusKey = statusKey;
                                    request.StatusHexColor = (string)status["hex_color"];
                                }
                            }
                            
                            if (suggestion.TryGetValue("response", out var statusResponse) 
                                && statusResponse is Dictionary<string, object> oStatusResponse)
                            {
                                request.Response = new UserVoiceComment {
                                    Text = (string)oStatusResponse["text"],
                                    FormattedText = (string)oStatusResponse["formatted_text"],
                                    CreatedAt = oStatusResponse["created_at"].ToString().ConvertTo<DateTime>(),
                                };
                                if (request.Response.Text != null)
                                    request.Response.Text = JsonTypeSerializer.Unescape(request.Response.Text);
                                
                                if (request.Response.FormattedText!= null)
                                    request.Response.FormattedText = JsonTypeSerializer.Unescape(request.Response.FormattedText);

                                if (oStatusResponse.TryGetValue("creator", out var responseCreator))
                                {
                                    request.Response.Creator = toUser(responseCreator);
                                }
                            }

                            $"Importing Suggestion {request.Id}: {request.Title}".Print();

                            var newPost = client.Post(request);
                        
                            $"Imported Post {newPost.PostId}: {newPost.PostSlug}".Print();
                        }
                    }
                    catch (Exception ex)
                    {
                        $"Could not import suggestion: {ex.Message}\n{ex.StackTrace}".Print();
                        oSuggestion.PrintDump();
                    }
                }

            } while (suggestions.Count >= resultsPerPage);


        }

   }
}