using System;
using System.Linq;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks.ServiceInterface.DataModel;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

[Authenticate]
public class SubscriptionServices(IMarkdownProvider markdown) : PostServicesBase(markdown)
{
    public void Put(SubscribeToOrganization request)
    {
        if (request.OrganizationId <= 0)
            throw new ArgumentNullException(nameof(request.OrganizationId));

        var user = GetUser();
        var userId = user.GetUserId();

        AssertCanViewOrganization(Db, request.OrganizationId, user);

        var rowsDeleted = Db.Delete<OrganizationSubscription>(x =>
            x.OrganizationId == request.OrganizationId && x.UserId == userId);

        var now = DateTime.Now;
        var sub = new OrganizationSubscription
        {
            OrganizationId = request.OrganizationId,
            UserId = userId,
            UserName = user.UserName,
            PostTypes = request.PostTypes.Select(x => x.ToString()).ToArray(),
            FrequencyDays = request.Frequency != null ? (int)request.Frequency.Value : (int?)null,
            Created = now,                 
        };

        Db.Insert(sub);

        ClearOrganizationCaches();
    }

    public void Put(SubscribeToPost request)
    {
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var user = GetUser();
        var userId = user.GetUserId();

        var post = AssertPost(request.PostId);

        AssertCanPostToOrganization(Db, post.OrganizationId, user, out var org, out var orgMember);
        AssertCanAnnotatePost(post, user, orgMember);

        var rowsDeleted = Db.Delete<SubscribePost>(x =>
            x.PostId == request.PostId && x.UserId == userId);

        var now = DateTime.Now;
        var sub = new SubscribePost
        {
            PostId = request.PostId,
            OrganizationId = post.OrganizationId,
            UserId = userId,
            UserName = user.UserName,
            Created = now,
        };

        Db.Insert(sub);

        ClearPostCaches();
    }

    public void Delete(DeleteOrganizationSubscription request)
    {
        if (request.OrganizationId <= 0)
            throw new ArgumentNullException(nameof(request.OrganizationId));

        var userId = GetUserId();

        var rowsDeleted = Db.Delete<OrganizationSubscription>(x =>
            x.OrganizationId == request.OrganizationId && x.UserId == userId);

        ClearOrganizationCaches();
    }

    public void Delete(DeletePostSubscription request)
    {
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var userId = GetUserId();

        var rowsDeleted = Db.Delete<SubscribePost>(x =>
            x.PostId == request.PostId && x.UserId == userId);

        ClearPostCaches();
    }
}