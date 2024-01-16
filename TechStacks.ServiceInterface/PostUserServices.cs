using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

public class PostPublicUserServices : Service
{
    public object Any(GetUsersByEmails request)
    {
        if (request.Emails.IsEmpty())
            return new GetUsersByEmailsResponse { Results = [] };
            
        var users = Db.Select<UserRef>(
            @"select distinct c.id, c.user_name, COALESCE(c.email,d.email) as email, c.ref_id, c.ref_source, c.ref_urn
                   from custom_user_auth c
                        left join
                        user_auth_details d on d.user_auth_id = c.id
                  where c.email in (@Emails)
                     or d.email in (@Emails)", new { request.Emails });

        return new GetUsersByEmailsResponse {
            Results = users
        };
    }
}
    
[Authenticate]
public class PostUserServices : PostServicesBase
{
    public async Task<GetUserPostActivityResponse> Get(GetUserPostActivity request)
    {
        var userId = GetUserId();
        var recentVotes = DateTime.Now.AddMonths(-6);

        var q = Db.From<PostVote>()
            .Where(x => x.UserId == userId && x.Created > recentVotes)
            .Select(x => new { x.PostId, x.Weight });

        var postVotes = await Db.SelectAsync<(long postId, int weight)>(q);

        var favoritePostIds = await Db.ColumnAsync<long>(Db.From<PostFavorite>()
            .Where(x => x.UserId == userId)
            .Select(x => x.PostId));

        return new GetUserPostActivityResponse
        {
            UpVotedPostIds = postVotes.Where(x => x.weight > 0).Map(x => x.postId),
            DownVotedPostIds = postVotes.Where(x => x.weight < 0).Map(x => x.postId),
            FavoritePostIds = favoritePostIds,
        };
    }

    public async Task<GetUserOrganizationsResponse> Get(GetUserOrganizations request)
    {
        var userId = GetUserId();
        return new GetUserOrganizationsResponse
        {
            Members = await Db.SelectAsync<OrganizationMember>(x => x.UserId == userId),
            MemberInvites = await Db.SelectAsync<OrganizationMemberInvite>(x => x.UserId == userId && x.Approved == null && x.Dismissed == null),
            Subscriptions = await Db.SelectAsync<OrganizationSubscription>(x => x.UserId == userId),
        };
    }

    public async Task<UserPostVoteResponse> Put(UserPostVote request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        var user = GetUser();
        var post = await AssertPostAsync(request.Id);
        var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user);
        AssertCanAnnotatePost(post, user, groupMember);

        var userId = GetUserId();

        await Db.DeleteAsync<PostVote>(x => x.UserId == userId && x.PostId == request.Id);
        if (request.Weight != 0)
        {
            await Db.InsertAsync(new PostVote
            {
                UserId = userId,
                PostId = request.Id,
                Weight = request.Weight < 0 ? -1 : 1,
                Created = DateTime.Now,
            });
        }

        await Db.ExecuteSqlAsync(
            @"update post set 
                         up_votes   = (select count(*) from post_vote where post_id = @id and weight > 0), 
                         down_votes = (select count(*) from post_vote where post_id = @id and weight < 0)
                   where id = @id", new { id = request.Id });

        await Db.ExecuteSqlAsync(@"update post 
                set points = GREATEST(1 + (up_votes - down_votes) + points_modifier, 0)
                   where id = @id", new { id = request.Id });

        await Db.ExecuteSqlAsync(
            @"update user_activity set 
                         post_up_votes   = (select count(*) from post_vote v 
                                              join post p on p.id = v.post_id 
                                             where p.user_id = user_activity.id and weight > 0),
                         post_down_votes = (select count(*) from post_vote v 
                                              join post p on p.id = v.post_id 
                                             where p.user_id = user_activity.id and weight < 0)
                   where id = (select user_id from post where id = @id)",
            new { id = request.Id });

        ClearPostCaches();

        return new UserPostVoteResponse();
    }

    public async Task<UserPostFavoriteResponse> Put(UserPostFavorite request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        var user = GetUser();
        var post = await AssertPostAsync(request.Id);
        var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user);
        AssertCanAnnotatePost(post, user, groupMember);

        var userId = GetUserId();

        var exists = await Db.DeleteAsync<PostFavorite>(x => x.UserId == userId && x.PostId == request.Id);

        if (exists == 0)
        {
            await Db.InsertAsync(new PostFavorite
            {
                UserId = userId,
                PostId = request.Id,
                Created = DateTime.Now,
            });
        }

        await Db.ExecuteSqlAsync(
            @"update post set 
                         favorites = (select count(*) from post_favorite where post_id = @id)
                   where id = @id", new { id = request.Id });

        return new UserPostFavoriteResponse();
    }

    public object Put(UserPostReport request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        var user = GetUser();
        var post = AssertPost(request.Id);
        var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user, out var org);
        AssertCanAnnotatePost(post, user, groupMember);

        var userId = GetUserId();

        Db.Delete<PostReport>(x => x.UserId == userId && x.PostId == request.Id);
        var reportId = Db.Insert(new PostReport
        {
            UserId = userId,
            UserName = user.UserName,
            OrganizationId = org.Id,
            PostId = request.Id,
            FlagType = request.FlagType,
            ReportNotes = request.ReportNotes,
            Created = DateTime.Now,
        }, selectIdentity:true);

        var reportsCount = Db.Count<PostReport>(x => x.OrganizationId == org.Id && x.PostId == request.Id);
        if (reportsCount >= org.DeletePostsWithReportCount)
        {
            Db.UpdateOnly(() => new Post { Deleted = DateTime.Now, DeletedBy = nameof(Organization.DeletePostsWithReportCount) },
                @where: x => x.Id == request.Id);
        }

        SendNotification(nameof(UserPostReport), nameof(PostReport), reportId);

        Db.ExecuteSql(
            @"update post set 
                         report_count = (select count(*) from post_report where organization_id = @orgId and post_id = @id)
                   where id = @id", new { orgId = org.Id, id = request.Id });

        return new UserPostReportResponse();
    }

    public async Task<object> Put(UserPostCommentVote request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var user = GetUser();
        var post = await AssertPostAsync(request.PostId);
        var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user);
        AssertCanAnnotatePost(post, user, groupMember);

        var userId = GetUserId();

        await Db.DeleteAsync<PostCommentVote>(x => x.UserId == userId && x.PostCommentId == request.Id);
        if (request.Weight != 0)
        {
            await Db.InsertAsync(new PostCommentVote
            {
                UserId = userId,
                PostId = request.PostId,
                PostCommentId = request.Id,
                Weight = request.Weight < 0 ? -1 : 1,
                Created = DateTime.Now,
            });
        }

        await Db.ExecuteSqlAsync(
            @"update post_comment set 
                         up_votes   = (select count(*) from post_comment_vote where post_comment_id = @id and weight > 0), 
                         down_votes = (select count(*) from post_comment_vote where post_comment_id = @id and weight < 0)
                   where id = @id",
            new { id = request.Id });

        await Db.ExecuteSqlAsync(
            @"update user_activity set 
                         comment_up_votes   = (select count(*) from post_comment_vote v 
                                                 join post_comment c on c.id = v.post_comment_id 
                                                where c.user_id = user_activity.id and weight > 0),
                         comment_down_votes = (select count(*) from post_comment_vote v 
                                                 join post_comment c on c.id = v.post_comment_id 
                                                where c.user_id = user_activity.id and weight < 0)
                   where id = (select user_id from post_comment where id = @id)",
            new { id = request.Id });

        ClearPostCaches();

        return new UserPostCommentVoteResponse();
    }

    public object Put(UserPostCommentReport request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var user = GetUser();
        var post = AssertPost(request.PostId);
        var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user, out var org);
        AssertCanAnnotatePost(post, user, groupMember);

        var userId = user.GetUserId();
        Db.Delete<PostCommentReport>(x => x.UserId == userId && x.PostCommentId == request.Id);
        var reportId = Db.Insert(new PostCommentReport
        {
            UserId = userId,
            UserName = user.UserName,
            OrganizationId = org.Id,
            PostId = post.Id,
            PostCommentId = request.Id,
            FlagType = request.FlagType,
            ReportNotes = request.ReportNotes,
            Created = DateTime.Now,
        }, selectIdentity:true);

        var reportsCount = Db.Count<PostCommentReport>(x => x.OrganizationId == org.Id && x.PostCommentId == request.Id);
        if (reportsCount >= org.DeletePostsWithReportCount)
        {
            Db.UpdateOnly(() => new PostComment { Deleted = DateTime.Now, DeletedBy = nameof(Organization.DeletePostsWithReportCount) },
                where: x => x.Id == request.Id);
        }

        SendNotification(nameof(UserPostCommentReport), nameof(PostCommentReport), reportId);

        Db.ExecuteSql(
            @"update post_comment set 
                         report_count = (select count(*) from post_comment_report where organization_id = @orgId and post_comment_id = @Id)
                   where id = @id", new { orgId = org.Id, request.Id });

        return new UserPostCommentReportResponse();
    }

}