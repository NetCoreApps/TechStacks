using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin
{
    [ExcludeMetadata]
    [Route("/tasks/daily")]
    public class DailyTasks : IReturn<DailyTasksResponse> {}

    public class DailyTasksResponse
    {
        public int TechStackFavCountRowsUpdated { get; set; }
        public int TechnologyFavCountRowsUpdated { get; set; }
        public int TechStackViewCountRowsUpdated { get; set; }
        public int TechnologyViewCountRowsUpdated { get; set; }
    }

    [Authenticate]
    [RequiredRole("Admin")]
    public class AdminServices : Service
    {
        public object Put(LogoUrlApproval request)
        {
            var tech = Db.SingleById<Technology>(request.TechnologyId);
            if (tech == null)
            {
                throw HttpError.NotFound("Technology not found");
            }
            tech.LogoApproved = request.Approved;
            Db.Save(tech);
            return new LogoUrlApprovalResponse
            {
                Result = tech
            };
        }

        public object Put(LockTechStack request)
        {
            var techStack = Db.SingleById<TechnologyStack>(request.TechnologyStackId);
            if (techStack == null)
            {
                throw HttpError.NotFound("TechnologyStack not found");
            }

            techStack.IsLocked = request.IsLocked;
            Db.Save(techStack);
            return new LockStackResponse();
        }

        public object Put(LockTech request)
        {
            var tech = Db.SingleById<Technology>(request.TechnologyId);
            if (tech == null)
            {
                throw HttpError.NotFound("Technology not found");
            }

            tech.IsLocked = request.IsLocked;
            Db.Save(tech);
            return new LockTechResponse();
        }

        public object Any(DailyTasks request)
        {
            return new DailyTasksResponse
            {
                TechStackFavCountRowsUpdated = Db.ExecuteSql(@"UPDATE technology_stack SET fav_count=fav.count 
                    FROM (SELECT technology_stack_id, Count(*) AS Count FROM user_favorite_technology_stack GROUP BY technology_stack_id) as fav
                    WHERE id = fav.technology_stack_id"),

                TechnologyFavCountRowsUpdated = Db.ExecuteSql(@"UPDATE technology SET fav_count=fav.count 
                    FROM (SELECT technology_id, Count(*) AS Count FROM user_favorite_technology GROUP BY technology_id) as fav
                    WHERE id = fav.technology_id"),

                TechStackViewCountRowsUpdated = Db.ExecuteSql(@"UPDATE technology_stack SET view_count=v.view_count
                    FROM (SELECT ref_slug, view_count FROM page_stats WHERE ref_type='stack') AS v
                    WHERE v.ref_slug = slug"),

                TechnologyViewCountRowsUpdated = Db.ExecuteSql(@"UPDATE technology SET view_count=v.view_count
                    FROM (SELECT ref_slug, view_count FROM page_stats WHERE ref_type='tech') AS v
                    WHERE v.ref_slug = slug"),
            };
        }
    }
}
