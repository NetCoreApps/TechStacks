using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    [CacheResponse(Duration = 600)]
    public class PublicPostServices : PostServicesBase
    {
        public IAutoQueryDb AutoQuery { get; set; }

        public object Any(QueryPosts request)
        {
            var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
            if (!request.AnyTechnologyIds.IsEmpty())
            {
                var techIds = request.AnyTechnologyIds.Join(",");
                var orgIds = request.AnyTechnologyIds.Map(id => GetOrganizationByTechnologyId(Db, id))
                    .Where(x => x != null)
                    .Select(x => x.Id)
                    .Join(",");
                if (string.IsNullOrEmpty(orgIds))
                    orgIds = "NULL";

                q.Where($"(ARRAY[{techIds}] && technology_ids OR organization_id in ({orgIds}))");
            }
            return AutoQuery.Execute(request, q);
        }

        public async Task<GetPostResponse> Get(GetPost request)
        {
            if (request.Id <= 0)
                throw new ArgumentNullException(nameof(request.Id));

            var user = SessionAs<AuthUserSession>();
            var post = await Db.SingleByIdAsync<Post>(request.Id);
            AssertCanViewOrganization(Db, post.OrganizationId, user, out _, out var groupMember);

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

    [Authenticate]
    public class PostServices : PostServicesBase
    {
        static readonly ILog Log = LogManager.GetLogger(typeof(PostServices));

        public IAppSettings AppSettings { get; set; }

        public async Task<CreatePostResponse> Post(CreatePost request)
        {
            var user = GetUser();
            AssertCanPostToOrganization(Db, request.OrganizationId, user, out var org, out var orgMember);
            AssertCanPostTypeToOrganization(request.Type, org, orgMember, user);

            var post = request.ConvertTo<Post>();
            post.Slug = request.Title.GenerateSlug();
            post.Created = post.Modified = DateTime.Now;
            post.CreatedBy = post.ModifiedBy = user.UserName;
            post.UserId = user.UserAuthId.ToInt();
            post.UpVotes = 0;
            post.ContentHtml = await Markdown.TransformAsync(post.Content, UserCache.GetGitHubToken(post.UserId));
            post.Rank = 0;

            if (string.IsNullOrEmpty(post.ImageUrl) && Request.Files.Length > 0)
            {
                post.ImageUrl = Request.Files[0].UploadToImgur(AppSettings.GetString("oauth.imgur.ClientId"),
                    nameof(post.ImageUrl), minWidth: 500, minHeight: 500, maxWidth: 2560, maxHeight: 2560);
            }

            var id = await Db.InsertAsync(post, selectIdentity: true);

            await Db.UpdateAddAsync(() => new UserActivity { PostsCount = 1 },
                where: x => x.Id == post.UserId);

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
                post.ContentHtml = await Markdown.TransformAsync(request.Content, UserCache.GetGitHubToken(user.GetUserId()));
            }

            post.PopulateWith(request);
            post.ModifiedBy = user.UserName;
            post.Modified = DateTime.Now;
            post.Rank = 0;

            if (Request.Files.Length > 0)
            {
                post.ImageUrl = Request.Files[0].UploadToImgur(AppSettings.GetString("oauth.imgur.ClientId"),
                    nameof(post.ImageUrl), minWidth: 500, minHeight: 500, maxWidth: 2560, maxHeight: 2560);
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

            if (request.Lock)
            {
                post.Locked = DateTime.Now;
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

            ClearPostCaches();
        }

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
            var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user);
            AssertCanAnnotatePost(post, user, groupMember);

            var userId = GetUserId();

            Db.Delete<PostReport>(x => x.UserId == userId && x.PostId == request.Id);
            Db.Insert(new PostReport
            {
                UserId = userId,
                PostId = request.Id,
                Type = request.Type,
                Notes = request.Notes,
                Created = DateTime.Now,
            });

            var reportsCount = Db.Count<PostReport>(x => x.PostId == request.Id);
            if (reportsCount >= 5)
            {
                Db.UpdateOnly(() => new Post { Deleted = DateTime.Now, DeletedBy = nameof(PostReport) },
                    where: x => x.Id == request.Id);
            }

            return new UserPostReportResponse();
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
            comment.ContentHtml = await Markdown.TransformAsync(comment.Content, UserCache.GetGitHubToken(userId));
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

            var html = await Markdown.TransformAsync(request.Content, UserCache.GetGitHubToken(userId));
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
            var groupMember = AssertCanAnnotateOnOrganization(Db, post.OrganizationId, user);
            AssertCanAnnotatePost(post, user, groupMember);

            var userId = user.GetUserId();
            Db.Delete<PostCommentReport>(x => x.UserId == userId && x.PostCommentId == request.Id);
            Db.Insert(new PostCommentReport
            {
                UserId = userId,
                PostCommentId = request.Id,
                Type = request.Type,
                Notes = request.Notes,
                Created = DateTime.Now,
            });

            var reportsCount = Db.Count<PostCommentReport>(x => x.PostCommentId == request.Id);
            if (reportsCount >= 5)
            {
                Db.UpdateOnly(() => new PostComment { Deleted = DateTime.Now, DeletedBy = nameof(PostCommentReport) },
                    where: x => x.Id == request.Id);
            }

            return new UserPostCommentReportResponse();
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

}
