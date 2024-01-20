using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

public class PostPublicServices(IMarkdownProvider markdown, IAutoQueryDb autoQuery) : PostServicesBase(markdown)
{
    public object Any(QueryPosts request)
    {
        var q = autoQuery.CreateQuery(request, Request.GetRequestParams());
        q.Where(x => x.Deleted == null);
            
        var states = request.Is ?? TypeConstants.EmptyStringArray;
        if (states.Contains("closed") || states.Contains("completed") || states.Contains("declined"))
            q.And(x => x.Status == "closed");
        else
            q.And(x => x.Hidden == null && (x.Status == null || x.Status != "closed"));

        if (states.Length > 0)
        {
            var labelSlugs = states.Where(x => x != "closed" && x != "open")
                .Map(x => x.GenerateSlug());
            if (labelSlugs.Count > 0)
                q.And($"ARRAY[{new SqlInValues(labelSlugs).ToSqlInString()}] && labels");
        }

        if (!request.AnyTechnologyIds.IsEmpty())
        {
            var techIds = request.AnyTechnologyIds.Join(",");
            var orgIds = request.AnyTechnologyIds.Map(id => GetOrganizationByTechnologyId(Db, id))
                .Where(x => x != null)
                .Select(x => x.Id)
                .Join(",");
            if (string.IsNullOrEmpty(orgIds))
                orgIds = "NULL";

            q.And($"(ARRAY[{techIds}] && technology_ids OR organization_id in ({orgIds}))");
        }

        return autoQuery.Execute(request, q);
    }

    public async Task<GetPostResponse> Get(GetPost request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        var user = SessionAs<AuthUserSession>();
        var post = await Db.SingleByIdAsync<Post>(request.Id);
        OrganizationMember groupMember = null;
        if (post != null)
            AssertCanViewOrganization(Db, post.OrganizationId, user, out _, out groupMember);

        if (post == null || post.Deleted != null && !user.IsOrganizationModerator(groupMember))
            throw HttpError.NotFound("Post does not exist");

        var postComments = request.Include == "comments"
            ? await Db.SelectAsync<PostComment>(x => x.PostId == request.Id && x.Deleted == null)
            : TypeConstants<PostComment>.EmptyList;

        return new GetPostResponse
        {
            Cache = Stopwatch.GetTimestamp(),
            Post = post,
            Comments = postComments,
        };
    }
}