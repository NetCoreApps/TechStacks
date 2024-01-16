using System;
using System.Data;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin;

[ExcludeMetadata]
[Route("/tasks/daily")]
public class DailyTasks : IReturn<DailyTasksResponse> {}

public class DailyTasksResponse
{
    public int TechStackFavCountRowsUpdated { get; set; }
    public int TechnologyFavCountRowsUpdated { get; set; }
    public int TechStackViewCountRowsUpdated { get; set; }
    public int TechnologyViewCountRowsUpdated { get; set; }

    public int UserTechStackCountRowsUpdated { get; set; }
    public int UserTechnologyCountRowsUpdated { get; set; }
    public int UserCommentCountRowsUpdated { get; set; }
    public int UserUpVotesRowsUpdated { get; set; }
    public int UserDownVotesRowsUpdated { get; set; }
    public int UserReportCountRowsUpdated { get; set; }
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

            UserTechStackCountRowsUpdated = Db.ExecuteSql(@"UPDATE user_activity SET tech_stacks_count=t.total
                    FROM (SELECT owner_id, COUNT(*) as total FROM technology_stack GROUP BY owner_id) AS t
                    WHERE t.owner_id::int = id"),

            UserTechnologyCountRowsUpdated = Db.ExecuteSql(@"UPDATE user_activity SET technology_count=t.total
                    FROM (SELECT owner_id, COUNT(*) as total FROM technology GROUP BY owner_id) AS t
                    WHERE t.owner_id::int = id"),

            UserCommentCountRowsUpdated = Db.ExecuteSql(@"UPDATE user_activity SET comments_count=t.total
                    FROM (SELECT user_id, COUNT(*) as total FROM post_comment GROUP BY user_id) AS t
                    WHERE t.user_id = id"),

            UserUpVotesRowsUpdated = Db.ExecuteSql(@"UPDATE user_activity SET up_votes=t.total
                    FROM (SELECT user_id, SUM(up_votes) as total FROM post GROUP BY user_id) AS t
                    WHERE t.user_id = id"),

            UserDownVotesRowsUpdated = Db.ExecuteSql(@"UPDATE user_activity SET down_votes=t.total
                    FROM (SELECT user_id, SUM(down_votes) as total FROM post GROUP BY user_id) AS t
                    WHERE t.user_id = id"),

            UserReportCountRowsUpdated = Db.ExecuteSql(@"UPDATE user_activity SET report_count=t.report_count
                    FROM (SELECT id as user_id, 
                                 (select count(*) from post_report where user_id = c.id) + 
                                 (select count(*) from post_comment where user_id = c.id and report_user_ids != null) as report_count 
                            FROM custom_user_auth c) t
                     WHERE t.user_id = id")
        };
    }
}