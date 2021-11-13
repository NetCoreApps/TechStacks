using NUnit.Framework;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using TechStacks.ServiceModel.Types;

namespace TechStacks.Tests;

public class UpdateAdminTasks : DbTasksBase
{
    static UpdateAdminTasks() => LogManager.LogFactory = new ConsoleLogFactory(debugEnabled: true);

    [Test]
    public void Update_FavCounts()
    {
        using var db = dbFactory.Open();

        var faveTechStacks = db.Dictionary<int, int>(
            db.From<UserFavoriteTechnologyStack>().GroupBy(x => x.TechnologyStackId)
                .OrderByDescending("COUNT")
                .Select(x => new { x.TechnologyStackId, Count = Sql.Count("*") }));

        faveTechStacks.PrintDump();

        var result = db.ExecuteSql($@"UPDATE technology_stack SET fav_count=fav.count 
                    FROM (SELECT technology_stack_id, Count(*) AS Count FROM user_favorite_technology_stack GROUP BY technology_stack_id) as fav
                    WHERE id = fav.technology_stack_id");

        $"{result} rows updated".Print();

        var faveTechs = db.Dictionary<int, int>(
            db.From<UserFavoriteTechnology>().GroupBy(x => x.TechnologyId)
                .OrderByDescending("COUNT")
                .Select(x => new { x.TechnologyId, Count = Sql.Count("*") }));

        faveTechs.PrintDump();

        result = db.ExecuteSql(@"UPDATE technology SET fav_count=fav.count 
                    FROM (SELECT technology_id, Count(*) AS Count FROM user_favorite_technology GROUP BY technology_id) as fav
                    WHERE id = fav.technology_id");

        $"{result} rows updated".Print();
    }

    [Test]
    public void Update_ViewCounts()
    {
        using var db = dbFactory.Open();

        var result = db.ExecuteSql(@"UPDATE technology_stack SET view_count=v.view_count
                    FROM (SELECT ref_slug, view_count FROM page_stats WHERE ref_type='stack') AS v
                    WHERE v.ref_slug = slug");

        result = db.ExecuteSql(@"UPDATE technology SET view_count=v.view_count
                    FROM (SELECT ref_slug, view_count FROM page_stats WHERE ref_type='tech') AS v
                    WHERE v.ref_slug = slug");
    }

}