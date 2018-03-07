using System;
using System.Collections.Generic;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.Testing;
using ServiceStack.Text;
using TechStacks.ServiceInterface;
using TechStacks.ServiceInterface.Import;
using TechStacks.ServiceModel.Types;

namespace TechStacks.Tests
{
    public class ImportFromDiscourseTasks : DbTasksBase
    {
        public Dictionary<int, PostType> GroupPostTypeMap = new Dictionary<int, PostType>
        {
            { 246, PostType.Announcement },
            { 165, PostType.Announcement },
        };

        public DiscourseSyncServices DiscourseSite(string sourceRef) =>
            new DiscourseSyncServices
            {
                DbFactory = dbFactory,
                Site = DiscourseSyncServices.SiteConfigs[sourceRef]
            };

        //[Test]
        public void Add_Categories()
        {
            using (new BasicAppHost().Init())
            using (var db = dbFactory.Open())
            using (var import = DiscourseSite("ss-forums"))
            using (var dbForums = import.OpenSiteDbConnection())
            {
                var refSource = import.Site.RefSource;
                db.DropAndCreateTable<Category>();

                var orgs = db.Select<Organization>();
                var organizationId = import.Site.OrganizationId;

                foreach (var org in orgs)
                {
                    db.Insert(new Category
                    {
                        OrganizationId = org.Id,
                        Name = "Uncategorized",
                        Slug = "uncategorized",
                        Color = "#ffffff",
                        Created = DateTime.Now,
                        CreatedBy = "webstacks",
                        Modified = DateTime.Now,
                        ModifiedBy = "webstacks",
                    });
                }

                var categories = new Dictionary<string, string>
                {
                    { "servicestack", "ServiceStack" },
                    { "clients", "Clients" },
                    { "spa", "Single Page Apps" },
                    { "aws", "ServiceStack.Aws" },
                    { "azure", "ServiceStack.Azure" },
                    { "hosting", "Hosting" },
                    { "ormlite", "ServiceStack.OrmLite" },
                    { "redis", "ServiceStack.Redis" },
                    { "text", "ServiceStack.Text" },
                    { "templates", "ServiceStack Templates" },
                    { "serialization", "Serialization" },
                    { "mq", "Messaging (MQ)" },
                    { "stripe", "ServiceStack.Stripe" },
                    { "encrypted-messaging", "Encrypted Messaging" },
                    { "myget", "MyGet" },
                };

                foreach (var entry in categories)
                {
                    db.Insert(new Category
                    {
                        OrganizationId = organizationId,
                        Name = entry.Value,
                        Slug = entry.Key,
                        Color = "#000000",
                        Created = DateTime.Now,
                        CreatedBy = import.Site.UserName,
                        Modified = DateTime.Now,
                        ModifiedBy = import.Site.UserName,
                    });
                }

                var categoryNameMap = db.Dictionary<string, int>(db.From<Category>()
                    .Where(x => x.OrganizationId == organizationId)
                    .Select(x => new { x.Name, x.Id }));

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
                   order by p.name desc, c.name", new { maxCategoryId = 0, maxTopicId = 0 });

                foreach (var forumCategory in forumCategories)
                {
                    if (import.Site.CategoryImportRules.TryGetValue(forumCategory.CategoryName, out var rule))
                        continue;

                    if (categoryNameMap.TryGetValue(forumCategory.CategoryName, out var id))
                    {
                        db.UpdateOnly(() => new Category
                        {
                            Color = forumCategory.CategoryColor,
                            RefSource = refSource,
                            Id = forumCategory.CategoryId,
                            RefUrn = $"urn:category:{forumCategory.CategoryId}",                            
                        }, 
                        where:x => x.Id == id);
                    }
                    else
                    {
                        db.Insert(new Category
                        {
                            OrganizationId = organizationId,
                            Name = forumCategory.CategoryName,
                            Slug = forumCategory.CategoryName.GenerateSlug(),
                            Color = forumCategory.CategoryColor,
                            RefSource = refSource,
                            Id = forumCategory.CategoryId,
                            RefUrn = $"urn:category:{forumCategory.CategoryId}",
                            Created = DateTime.Now,
                            CreatedBy = import.Site.UserName,
                            Modified = DateTime.Now,
                            ModifiedBy = import.Site.UserName,
                        });
                    }
                }
            }
        }
        
        [Test]
        public void Import_latest_content_from_Forums()
        {
            using (new BasicAppHost().Init())
            using (var db = dbFactory.Open())
            using (var import = DiscourseSite("ss-forums"))
            using (var dbForums = import.OpenSiteDbConnection())
            {
                import.ImportForumUsers(db, dbForums).Each(x => x.Print());
                import.ImportForumPosts(db, dbForums).Each(x => x.Print());
            }
        }

        //[Test]
        public void Import_Forum_Users()
        {
            using (new BasicAppHost().Init())
            using (var db = dbFactory.Open())
            using (var import = DiscourseSite("ss-forums"))
            using (var dbForums = import.OpenSiteDbConnection())
            {
                //db.Delete<CustomUserAuth>(x => x.RefSource == import.Site.RefSource);
                import.ImportForumUsers(db, dbForums).Each(x => x.Print());
            }
        }

        //[Test]
        public void ReImport_all_Forum_Posts()
        {
            using (new BasicAppHost().Init())
            using (var db = dbFactory.Open())
            using (var import = DiscourseSite("ss-forums"))
            using (var dbForums = import.OpenSiteDbConnection())
            {
                db.Delete<Organization>(x => x.RefSource == import.Site.RefSource);
                db.Delete<Post>(x => x.RefSource == import.Site.RefSource);
                db.Delete<PostComment>(x => x.RefSource == import.Site.RefSource);

                import.ImportForumPosts(db, dbForums).Each(x => x.Print());
            }
        }
    }
}