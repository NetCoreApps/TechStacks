using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel.Types;
using ServiceStack.Text;
using TechStacks.ServiceInterface;

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

                db.DropAndCreateTable<Subscription>();

                db.DropAndCreateTable<Organization>();
                db.DropAndCreateTable<OrganizationMember>();

                //AddPosts(db);
                //AddPostVotes(db);
            }
        }

        [Test]
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
        public void Add_PostTypes()
        {
            using (var db = dbFactory.Open())
            {
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

   }
}