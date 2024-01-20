using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

[Authenticate]
public class PostServices(IMarkdownProvider markdown, IConfiguration configuration) : PostServicesBase(markdown)
{
    public async Task<CreatePostResponse> Post(CreatePost request)
    {
        var user = GetUser();
        AssertCanPostToOrganization(Db, request.OrganizationId, user, out var org, out var orgMember);
        AssertCanPostTypeToOrganization(request.Type, org, orgMember, user);

        var existingPost = request.Url != null
            ? await Db.SingleAsync<Post>(x => x.Url == request.Url && x.Deleted == null && x.Hidden == null && !x.Archived)
            : null;

        if (existingPost != null)
            throw new ArgumentException($"URL already used in unarchived /posts/{existingPost.Id}/{existingPost.Slug}", nameof(request.Url));
            
        var post = request.ConvertTo<Post>();
        post.Slug = request.Title.GenerateSlug();
        post.Created = post.Modified = DateTime.Now;
        post.CreatedBy = post.ModifiedBy = user.UserName;
        post.UserId = user.UserAuthId.ToInt();
        post.UpVotes = 0;
        post.Points = 1;
        post.ContentHtml = Markdown.Transform(post.Content);
        post.Rank = 0;

        if (!user.IsOrganizationModerator(orgMember))
        {
            post.Labels = null;
        }

        if (string.IsNullOrEmpty(post.ImageUrl) && Request.Files.Length > 0)
        {
            post.ImageUrl = Request.Files[0].UploadToImgur(configuration["oauth.imgur.ClientId"],
                nameof(post.ImageUrl), minWidth: 200, minHeight: 200, maxWidth: 4000, maxHeight: 4000);
        }

        var id = await Db.InsertAsync(post, selectIdentity: true);

        await Db.UpdateAddAsync(() => new UserActivity { PostsCount = 1 },
            where: x => x.Id == post.UserId);

        await SendNotificationAsync(nameof(CreatePost), nameof(Post), id);

        ClearPostCaches();

        return new CreatePostResponse
        {
            Id = id,
            Slug = post.Slug,
        };
    }

    public async Task<UpdatePostResponse> Put(UpdatePost request)
    {
        var user = GetUser();
        var post = await AssertPostAsync(request.Id);
        AssertCanPostToOrganization(Db, request.OrganizationId, user, out var org, out var orgMember);
        AssertCanPostTypeToOrganization(request.Type, org, orgMember, user);
        AssertCanUpdatePost(post, user, orgMember);

        if (post.Content != request.Content)
        {
            post.ContentHtml = Markdown.Transform(request.Content);
        }

        if (!user.IsOrganizationModerator(orgMember))
        {
            request.Labels = post.Labels;
        }

        post.PopulateWith(request);
        post.ModifiedBy = user.UserName;
        post.Modified = DateTime.Now;
        post.Rank = 0;

        if (Request.Files.Length > 0)
        {
            post.ImageUrl = Request.Files[0].UploadToImgur(configuration["oauth.imgur.ClientId"],
                nameof(post.ImageUrl), minWidth: 200, minHeight: 200, maxWidth: 4000, maxHeight: 4000);
        }

        await Db.UpdateAsync(post);

        ClearPostCaches();

        return new UpdatePostResponse();
    }

    public object Delete(DeletePost request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        var user = GetUser();
        var post = AssertPost(request.Id);
        AssertCanPostToOrganization(Db, post.OrganizationId, user, out var org, out var orgMember);
        AssertCanUpdatePost(post, user, orgMember);

        var userId = user.GetUserId();

        var now = DateTime.Now;
        if (!user.IsOrganizationModerator(orgMember))
        {
            Db.UpdateOnly(() => new Post
                {
                    Deleted = now,
                    DeletedBy = user.UserName,
                    Modified = now,
                },
                where: x => x.Id == request.Id && x.UserId == userId);
        }
        else
        {
            Db.UpdateOnly(() => new Post
                {
                    Deleted = now,
                    DeletedBy = user.UserName,
                    Modified = now,
                },
                where: x => x.Id == request.Id);
        }

        ClearPostCaches();

        return new DeletePostResponse
        {
            Id = request.Id,
        };
    }

    public void Put(LockPost request)
    {
        var user = GetUser();
        var post = AssertPost(request.Id);
        AssertCanPostToOrganization(Db, post.OrganizationId, user, out var org, out var orgMember);

        if (!user.IsOrganizationModerator(orgMember))
            throw HttpError.Forbidden("Access Denied");

        var now = DateTime.Now;
        if (request.Lock)
        {
            post.Locked = now;
            post.LockedBy = user.UserName;
            if (!string.IsNullOrEmpty(request.Reason))
            {
                post.Notes = request.Reason;
            }
        }
        else
        {
            post.Locked = null;
            post.LockedBy = null;
        }

        Db.Update(post);

        Db.Insert(new PostChangeHistory {
            ChangedName = nameof(post.Locked),
            ChangedValue = request.Lock.ToString(),
            ChangedReason = request.Reason,
            Created = now,
            CreatedBy = user.UserName,
        });

        ClearPostCaches();
    }

    public void Put(HidePost request)
    {
        var user = GetUser();
        var post = AssertPost(request.Id);
        AssertCanPostToOrganization(Db, post.OrganizationId, user, out var org, out var orgMember);

        if (!user.IsOrganizationModerator(orgMember))
            throw HttpError.Forbidden("Access Denied");

        var now = DateTime.Now;
        if (request.Hide)
        {
            post.Hidden = now;
            post.HiddenBy = user.UserName;
            if (!string.IsNullOrEmpty(request.Reason))
            {
                post.Notes = request.Reason;
            }
        }
        else
        {
            post.Hidden = null;
            post.HiddenBy = null;
        }

        Db.Update(post);
            
        Db.Insert(new PostChangeHistory {
            ChangedName = nameof(post.Hidden),
            ChangedValue = request.Hide.ToString(),
            ChangedReason = request.Reason,
            Created = now,
            CreatedBy = user.UserName,
        });

        ClearPostCaches();
    }

    public void Put(ChangeStatusPost request)
    {
        var user = GetUser();
        var post = AssertPost(request.Id);
        AssertCanPostToOrganization(Db, post.OrganizationId, user, out var org, out var orgMember);

        if (!user.IsOrganizationModerator(orgMember))
            throw HttpError.Forbidden("Access Denied");

        if (string.IsNullOrEmpty(request.Status))
            throw new ArgumentNullException(nameof(request.Status));
            
        var now = DateTime.Now;
        post.Status = request.Status;
        post.StatusBy = user.UserName;
        post.StatusDate = now;

        Db.Update(post);
            
        Db.Insert(new PostChangeHistory {
            ChangedName = nameof(post.Status),
            ChangedValue = request.Status,
            ChangedReason = request.Reason,
            Created = now,
            CreatedBy = user.UserName,
        });

        ClearPostCaches();
    }

    public void Post(ActionPostReport request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var user = GetUser();
        var post = AssertPost(request.PostId);

        AssertOrganizationModerator(Db, post.OrganizationId, user, out var org, out var orgMember);

        var now = DateTime.Now;
        if (request.ReportAction == ReportAction.Dismiss)
        {
            Db.UpdateOnly(() => new PostReport { Dismissed = now, DismissedBy = user.UserName },
                where: x => x.OrganizationId == org.Id && x.Id == request.Id && x.PostId == post.Id);
        }
        else if (request.ReportAction == ReportAction.Delete)
        {
            Db.UpdateOnly(() => new Post { Deleted = now, DeletedBy = user.UserName },
                where: x => x.OrganizationId == org.Id && x.Id == post.Id);

            Db.UpdateOnly(() => new PostReport { Acknowledged = now, AcknowledgedBy = user.UserName },
                where: x => x.OrganizationId == org.Id && x.Id == request.Id && x.PostId == post.Id);
        }

        ClearPostCaches();
    }

    public async Task<CreatePostCommentResponse> Post(CreatePostComment request)
    {
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));
        if (string.IsNullOrEmpty(request.Content))
            throw new ArgumentNullException(nameof(request.Content));

        var user = GetUser();
        var post = await AssertPostAsync(request.PostId);
        var groupMember = AssertCanCommentToOrganization(Db, post.OrganizationId, user);
        AssertCanContributeToPost(post, user, groupMember);

        var userId = user.GetUserId();
        var comment = request.ConvertTo<PostComment>();
        comment.UserId = userId;
        comment.CreatedBy = user.UserName;
        comment.Created = comment.Modified = DateTime.Now;
        comment.ContentHtml = Markdown.Transform(comment.Content);
        comment.UpVotes = 0;

        var id = await Db.InsertAsync(comment, selectIdentity: true);

        var now = DateTime.Now;

        await Db.UpdateAddAsync(() => new UserActivity { Modified = now, PostCommentsCount = 1 },
            where: x => x.Id == comment.UserId);

        await Db.UpdateOnlyAsync(() =>
                new Post { LastCommentDate = now, LastCommentId = id, LastCommentUserId = userId },
            where: x => x.Id == request.PostId);

        ClearPostCaches();

        return new CreatePostCommentResponse
        {
            Id = id,
            PostId = comment.PostId,
        };
    }

    public async Task<UpdatePostCommentResponse> Put(UpdatePostComment request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));
        if (string.IsNullOrEmpty(request.Content))
            throw new ArgumentNullException(nameof(request.Content));

        var user = GetUser();
        var post = await AssertPostAsync(request.PostId);
        var groupMember = AssertCanCommentToOrganization(Db, post.OrganizationId, user);
        AssertCanContributeToPost(post, user, groupMember);

        var userId = user.GetUserId();

        var html = Markdown.Transform(request.Content);
        var rowsUpdated = !user.IsAdmin()
            ? await Db.UpdateOnlyAsync(() => new PostComment {
                    Content = request.Content,
                    ContentHtml = html,
                    Modified = DateTime.Now,
                },
                where: x => x.Id == request.Id && x.PostId == request.PostId && x.UserId == userId)
            : await Db.UpdateOnlyAsync(() => new PostComment
                {
                    Content = request.Content,
                    ContentHtml = html,
                    Modified = DateTime.Now,
                },
                where: x => x.Id == request.Id);

        if (rowsUpdated == 0)
            throw HttpError.NotFound("Comment does not exist");

        var now = DateTime.Now;
        await Db.UpdateOnlyAsync(() =>
                new Post { LastCommentDate = now, LastCommentId = request.Id, LastCommentUserId = userId },
            where: x => x.Id == request.PostId);

        ClearPostCaches();

        return new UpdatePostCommentResponse();
    }

    public object Delete(DeletePostComment request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var user = GetUser();
        var post = AssertPost(request.PostId);
        var groupMember = AssertCanCommentToOrganization(Db, post.OrganizationId, user);
        AssertCanContributeToPost(post, user, groupMember);

        var now = DateTime.Now;
        var userId = user.GetUserId();

        if (!user.IsOrganizationModerator(groupMember))
        {
            Db.UpdateOnly(() => new PostComment
                {
                    Deleted = now,
                    DeletedBy = user.UserName,
                    Modified = now,                        
                }, 
                where: x => x.Id == request.Id && x.PostId == request.PostId && x.UserId == userId);
        }
        else
        {
            Db.UpdateOnly(() => new PostComment
                {
                    Deleted = now,
                    DeletedBy = user.UserName,
                    Modified = now,
                },
                where: x => x.Id == request.Id && x.PostId == request.PostId);
        }

        ClearPostCaches();

        return new DeletePostCommentResponse
        {
            Id = request.Id,
            PostId = request.PostId
        };
    }

    public void Post(ActionPostCommentReport request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        if (request.PostCommentId <= 0)
            throw new ArgumentNullException(nameof(request.PostCommentId));

        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var comment = AssertPostComment(request.PostCommentId);

        if (comment.PostId != request.PostId)
            throw new ArgumentException("Invalid PostId", nameof(request.PostId));

        var user = GetUser();
        var post = AssertPost(comment.PostId);
        AssertOrganizationModerator(Db, post.OrganizationId, user, out var org, out var orgMember);

        var now = DateTime.Now;
        if (request.ReportAction == ReportAction.Dismiss)
        {
            Db.UpdateOnly(() => new PostCommentReport { Dismissed = now, DismissedBy = user.UserName },
                where: x => x.OrganizationId == org.Id && x.Id == request.Id && x.PostCommentId == request.PostCommentId);
        }
        else if (request.ReportAction == ReportAction.Delete)
        {
            Db.UpdateOnly(() => new PostComment { Deleted = now, DeletedBy = user.UserName },
                where: x => x.PostId == post.Id && x.Id == request.PostCommentId);

            Db.UpdateOnly(() => new PostCommentReport { Acknowledged = now, AcknowledgedBy = user.UserName },
                where: x => x.OrganizationId == org.Id && x.Id == request.Id && x.PostCommentId == request.PostCommentId);
        }

        ClearPostCaches();
    }

    public object Get(GetUserPostCommentVotes request)
    {
        var userId = GetUserId();

        var q = Db.From<PostCommentVote>()
            .Where(x => x.UserId == userId && x.PostId == request.PostId)
            .Select(x => new { x.PostCommentId, x.Weight });

        var commentVotes = Db.Select<(long commentId, int weight)>(q);

        return new GetUserPostCommentVotesResponse
        {
            PostId = request.PostId,
            UpVotedCommentIds = commentVotes.Where(x => x.weight > 0).Map(x => x.commentId),
            DownVotedCommentIds = commentVotes.Where(x => x.weight < 0).Map(x => x.commentId),
        };
    }

    public object Put(PinPostComment request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));
        if (request.PostId <= 0)
            throw new ArgumentNullException(nameof(request.PostId));

        var user = GetUser();
        var post = AssertPost(request.PostId);
        AssertCanPostToOrganization(Db, post.OrganizationId, user, out var org, out var orgMember);
        AssertCanContributeToPost(post, user, orgMember);

        if (post.UserId != user.GetUserId() && !user.IsOrganizationModerator(orgMember))
            throw HttpError.Forbidden("Only Post author can pin comments");

        Db.UpdateOnly(() => new Post
            {
                PinCommentId = request.Pin ? request.Id : (long?)null,
                Modified = DateTime.Now,
                ModifiedBy = user.UserName
            },
            where: x => x.Id == request.PostId);

        Db.ExecuteSql(
            @"update user_activity set 
                         pinned_comment_count = (select count(*) 
                                                   from post p 
                                                   join post_comment c on (p.pin_comment_id = c.id and p.user_id <> user_activity.id)
                                                  where c.user_id = user_activity.id)
                   where id = (select user_id from post_comment c where c.id = @id)",
            new { id = request.Id });

        ClearPostCaches();

        return new PinPostCommentResponse();
    }
}