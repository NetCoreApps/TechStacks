using ServiceStack.OrmLite;
using TechStacks.ServiceModel.Types;
using ServiceStack.Logging;

namespace TechStacks.Tests
{
    [NUnit.Framework.Ignore("One-off Migration Tasks")]
    public class MigrationTasks : DbTasksBase
    {
        static MigrationTasks() => LogManager.LogFactory = new ConsoleLogFactory(debugEnabled: true);

        //[Test]
        public void Add_ViewCounts()
        {
            using (var db = dbFactory.Open())
            {
                //db.Select(db.From<TechnologyChoice>().Take(3)).PrintDump();

                db.AddColumn<Technology>(x => x.ViewCount);
                db.AddColumn<Technology>(x => x.FavCount);
                db.AddColumn<TechnologyStack>(x => x.ViewCount);
                db.AddColumn<TechnologyStack>(x => x.FavCount);
            }
        }
    }
}