using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    [CacheResponse(Duration = 600)]
    public class PostPublicServices : PostServicesBase
    {
        public IAutoQueryDb AutoQuery { get; set; }

        public object Any(QueryPosts request)
        {
            var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
            q.Where(x => x.Deleted == null && x.Hidden == null);

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

            return AutoQuery.Execute(request, q);
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
}