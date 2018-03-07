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
                db.DropAndCreateTable<SubscriptionUser>();

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

                var orgs = db.Select<Organization>();

                foreach (var org in orgs)
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
                        //IsOwner = org.Name != "ServiceStack",
                        DenyComments = org.Name == "ServiceStack",
                        Created = DateTime.Now,
                        CreatedBy = "webstacks"
                    });
                    db.Insert(new OrganizationMember
                    {
                        OrganizationId = org.Id,
                        UserId = 17,
                        UserName = "mythz",
                        Created = DateTime.Now,
                        CreatedBy = "mythz",
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

        [Test]
        public void Add_PostFavorite()
        {
            using (var db = dbFactory.Open())
            {
                db.DropAndCreateTable<PostFavorite>();
            }
        }

        [Test]
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
        public void Add_org_owners()
        {
            using (var db = dbFactory.Open())
            {
                //db.AddColumn<CustomUserAuth>(x => x.IpAddress);
                //db.AddColumn<CustomUserAuth>(x => x.IpAddress);
                //db.AddColumn<CustomUserAuth>(x => x.Banned);
                //db.AddColumn<CustomUserAuth>(x => x.BannedBy);
                //db.AddColumn<CustomUserAuth>(x => x.Notes);

                //db.AddColumn<Organization>(x => x.ModeratorPostTypes);

                //db.DropAndCreateTable<Category>();

                //var orgs = db.Select<Organization>();

                //foreach (var org in orgs)
                //{
                //    db.Insert(new Category
                //    {
                //        OrganizationId = org.Id,
                //        Name = OrganizationServices.Uncategorized,
                //        Created = DateTime.Now,
                //        CreatedBy = "webstacks",
                //        Modified = DateTime.Now,
                //        ModifiedBy = "webstacks"
                //    });
                //}
            }
        }

        //[Test]
        public void Add_PostTypes()
        {
            using (var db = dbFactory.Open())
            {
                if (!db.ColumnExists<Organization>(x => x.PostTypes))
                    db.AddColumn<Organization>(x => x.PostTypes);

                if (!db.ColumnExists<Organization>(x => x.ModeratorPostTypes))
                    db.AddColumn<Organization>(x => x.ModeratorPostTypes);

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

        [Test]
        public void Add_groups()
        {
            using (var db = dbFactory.Open())
            {
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
   }
}