using NUnit.Framework;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel.Types;
using ServiceStack.Logging;

namespace TechStacks.Tests
{
    [Ignore("One-off Migration Tasks")]
    public class MigrationTasks : DbTasksBase
    {
        static MigrationTasks() => LogManager.LogFactory = new ConsoleLogFactory(debugEnabled: true);

        [Test]
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
    }
}