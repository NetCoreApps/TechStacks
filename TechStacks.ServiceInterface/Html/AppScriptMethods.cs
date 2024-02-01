using System;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Script;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Html;

public class PostView : Post
{
    public List<string> TechnologySlugs { get; set; }
    public string OrganizationSlug { get; set; }
    public string OrganizationName { get; set; }
    public string TimeAgo { get; set; }
}

public class AppScriptMethods(ICacheClient cache, IDbConnectionFactory dbFactory) : ScriptMethods
{
    /*remove copy from SS v5.12.1+*/
    public IAuthSession sessionIfAuthenticated(ScriptScopeContext scope)
    {
        var session = scope.GetRequest().GetSession();
        return session.IsAuthenticated
            ? session
            : null;
    }

    public Dictionary<long, string> techSlugs()
    {
        var to = cache.GetOrCreate("tech:id:slugs", () => {
            using var db = dbFactory.OpenDbConnection();
            var q = db.From<Technology>()
                .Select(x => new {x.Id, x.Slug});
            var map = db.Dictionary<long, string>(q);
            return map;
        });
        return to;
    }

    public List<string> techSlugs(IEnumerable<int> techIds) => this.techSlugs().AsTechSlugs(techIds);

    public List<PostView> queryPosts(int page)
    {
        var cacheKey = CreateCacheKey(page);
        var posts = cache.GetOrCreate(cacheKey, TimeSpan.FromMinutes(1), () => {
            var techSlugs = this.techSlugs();
            using var db = dbFactory.OpenDbConnection();
            var q = db.From<Post>()
                .Join<Organization>()
                .Where(x => x.Deleted == null && x.Hidden == null && (x.Status == null || x.Status != "closed"))
                .OrderBy(x => x.Rank)
                .Select<Post, Organization>((p, o) => new {
                    p.Id,
                    p.OrganizationId,
                    OrganizationSlug = o.Slug,
                    OrganizationName = o.Name,
                    p.UserId,
                    p.CategoryId,
                    p.Slug,
                    p.Title,
                    p.ImageUrl,
                    p.Labels,
                    p.TechnologyIds,
                    p.Points,
                    p.UpVotes,
                    p.DownVotes,
                    p.CommentsCount,
                    p.Created,
                    p.CreatedBy
                });
            if (page > 0)
                q.Skip(page * 30);
            q.Take(30);
            var results = db.Select<PostView>(q);
            results.ForEach(x => x.DecoratePost(techSlugs));

            return results;
        });
        return posts;
    }

    public PostView queryPost(int postId)
    {
        var cacheKey = UrnId.Create<PostView>($"{postId}");
        var post = cache.GetOrCreate(cacheKey, () => {
            var techSlugs = this.techSlugs();
            using var db = dbFactory.OpenDbConnection();
            var q = db.From<Post>()
                .Join<Organization>()
                .Where(x => x.Id == postId)
                .And(x => x.Deleted == null && x.Hidden == null && (x.Status == null || x.Status != "closed"))
                .Select<Post, Organization>((p, o) => new {
                    p.Id,
                    p.OrganizationId,
                    OrganizationSlug = o.Slug,
                    OrganizationName = o.Name,
                    p.UserId,
                    p.CategoryId,
                    p.Slug,
                    p.Title,
                    p.ImageUrl,
                    p.Labels,
                    p.TechnologyIds,
                    p.Points,
                    p.UpVotes,
                    p.DownVotes,
                    p.CommentsCount,
                    p.Created,
                    p.CreatedBy,
                    p.Url,
                    p.Content,
                    p.ContentHtml,
                });
            var result = db.Single<PostView>(q);
            result.DecoratePost(techSlugs);
            return result;
        });
        return post;
    }

    // Currently Cache.FlushAll() is called on post updates
    public static string CreateCacheKey(int page = 0) => UrnId.Create<PostView>("news", $"{page}");
}

public static class AppUtils
{
    public static void DecoratePost(this PostView post, Dictionary<long, string> techSlugs)
    {
        post.TechnologySlugs = post.TechnologyIds?.Length > 0
            ? techSlugs.AsTechSlugs(post.TechnologyIds)
            : TypeConstants<string>.EmptyList;
        post.TimeAgo = DateTime.UtcNow.Subtract(post.Created).TimeAgo();
    }

    public static List<string> AsTechSlugs(this Dictionary<long, string> techSlugs, IEnumerable<int> techIds)
    {
        var to = new List<string>();
        foreach (var techId in techIds)
        {
            if (techSlugs.TryGetValue(techId, out var slug))
                to.Add(slug);
        }

        return to;
    }

    public static string TimeAgo(this TimeSpan timeSpan)
    {
        if (timeSpan <= TimeSpan.Zero)
            return "just now";
        if (timeSpan <= TimeSpan.FromSeconds(60))
            return $"{timeSpan.Seconds} seconds ago";
        if (timeSpan <= TimeSpan.FromMinutes(60))
            return timeSpan.Minutes > 1
                ? $"about {timeSpan.Minutes} minutes ago"
                : "about a minute ago";
        if (timeSpan <= TimeSpan.FromHours(24))
            return timeSpan.Hours > 1
                ? $"about {timeSpan.Hours} hours ago"
                : "about an hour ago";
        if (timeSpan <= TimeSpan.FromDays(30))
            return timeSpan.Days > 1
                ? $"about {timeSpan.Days} days ago"
                : "yesterday";
        if (timeSpan <= TimeSpan.FromDays(365))
            return timeSpan.Days / 30 > 1
                ? $"about {timeSpan.Days / 30} months ago"
                : "about a month ago";
        return timeSpan.Days / 365 > 1
            ? $"about {timeSpan.Days / 365} years ago"
            : "about a year ago";
    }
}