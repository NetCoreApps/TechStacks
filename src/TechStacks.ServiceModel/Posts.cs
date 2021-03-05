using System;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.DataAnnotations;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel
{
    [Route("/posts", "GET"), Tag(Tags.AutoQuery), Tag(Tags.Posts)]
    public partial class QueryPosts
        : QueryDb<Post>, IGet
    {
        public virtual int[] Ids { get; set; }
        public virtual int? OrganizationId { get; set; }
        public virtual List<int> OrganizationIds { get; set; }
        public virtual HashSet<string> Types { get; set; }
        public virtual HashSet<int> AnyTechnologyIds { get; set; }
        public virtual string[] Is { get; set; }
    }

    [Route("/posts/comment", "GET"), Tag(Tags.AutoQuery), Tag(Tags.Posts)]
    public class QueryPostComments : QueryDb<PostComment>, IGet
    {
        public long? Id { get; set; }
        public long? UserId { get; set; }
        public long? PostId { get; set; }
        public string ContentContains { get; set; }
        public long? UpVotesAbove { get; set; }
        public long? UpVotesBelow { get; set; }
        public long? DownVotesAbove { get; set; }
        public long? DownVotes { get; set; }
        public long? FavoritesAbove { get; set; }
        public long? FavoritesBelow { get; set; }
        public int? WordCountAbove { get; set; }
        public int? WordCountBelow { get; set; }
        public int? ReportCountAbove { get; set; }
        public int? ReportCountBelow { get; set; }
    }

    [Route("/posts", "POST"), Tag(Tags.Posts)]
    public class CreatePost : IReturn<CreatePostResponse>, IPost
    {
        public int OrganizationId { get; set; }

        public PostType Type { get; set; }

        public int CategoryId { get; set; }

        public string Title { get; set; }

        [Index]
        public string Url { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public bool? Lock { get; set; }

        public int[] TechnologyIds { get; set; }

        public string[] Labels { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string MetaType { get; set; }

        public string Meta { get; set; }

        public long? RefId { get; set; }
        public string RefSource { get; set; }
        public string RefUrn { get; set; }
    }

    public class CreatePostResponse
    {
        public long Id { get; set; }
        public string Slug { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}", "PUT"), Tag(Tags.Posts)]
    public class UpdatePost : IReturn<UpdatePostResponse>, IPut
    {
        public long Id { get; set; }

        public int OrganizationId { get; set; }

        public PostType Type { get; set; }

        public int CategoryId { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public bool? Lock { get; set; }

        public int[] TechnologyIds { get; set; }

        public string[] Labels { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string MetaType { get; set; }

        public string Meta { get; set; }
    }

    public class UpdatePostResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}", "DELETE"), Tag(Tags.Posts)]
    public class DeletePost : IReturn<DeletePostResponse>, IDelete
    {
        public long Id { get; set; }
    }

    public class DeletePostResponse
    {
        public long Id { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/lock", "PUT"), Tag(Tags.Posts)]
    public class LockPost : IReturnVoid, IPut
    {
        public long Id { get; set; }
        public bool Lock { get; set; }
        public string Reason { get; set; }
    }

    [Route("/posts/{Id}/hide", "PUT"), Tag(Tags.Posts)]
    public class HidePost : IReturnVoid, IPut
    {
        public long Id { get; set; }
        public bool Hide { get; set; }
        public string Reason { get; set; }
    }

    [Route("/posts/{Id}/status/{Status}", "PUT"), Tag(Tags.Posts)]
    public class ChangeStatusPost : IReturnVoid, IPut
    {
        public long Id { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
    }

    [Route("/user/posts/activity"), Tag(Tags.Posts)]
    public class GetUserPostActivity : IReturn<GetUserPostActivityResponse>, IGet {}

    public class GetUserPostActivityResponse
    {
        public List<long> UpVotedPostIds { get; set; }
        public List<long> DownVotedPostIds { get; set; }

        public List<long> FavoritePostIds { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/user/organizations"), Tag(Tags.Posts)]
    public class GetUserOrganizations : IReturn<GetUserOrganizationsResponse>, IGet { }

    public class GetUserOrganizationsResponse
    {
        public List<OrganizationMember> Members { get; set; }
        public List<OrganizationMemberInvite> MemberInvites { get; set; }
        public List<OrganizationSubscription> Subscriptions { get; set; } 
    }

    [Route("/posts/{Id}/vote", "PUT"), Tag(Tags.Posts)]
    public class UserPostVote : IReturn<UserPostVoteResponse>, IPut
    {
        public long Id { get; set; }
        public int Weight { get; set; }
    }

    public class UserPostVoteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/favorite", "PUT"), Tag(Tags.Posts)]
    public class UserPostFavorite : IReturn<UserPostFavoriteResponse>, IPut
    {
        public long Id { get; set; }
    }

    public class UserPostFavoriteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/report", "PUT"), Tag(Tags.Posts)]
    public class UserPostReport : IReturn<UserPostReportResponse>, IPut
    {
        public long Id { get; set; }
        public FlagType FlagType { get; set; }
        public string ReportNotes { get; set; }
    }

    public class UserPostReportResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    public enum ReportAction
    {
        Dismiss,
        Delete,
    }

    [Route("/posts/{PostId}/report/{Id}", "POST"), Tag(Tags.Posts)]
    public class ActionPostReport : IReturnVoid, IPost
    {
        public long PostId { get; set; }
        public long Id { get; set; }
        public ReportAction ReportAction { get; set; }
    }

    [Route("/posts/{Id}", "GET"), Tag(Tags.Posts)]
    public class GetPost : IReturn<GetPostResponse>, IGet
    {
        public long Id { get; set; }
        public string Include { get; set; }
    }

    public class GetPostResponse
    {
        public long Cache { get; set; }

        public Post Post { get; set; }

        public List<PostComment> Comments { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{PostId}/comments", "POST"), Tag(Tags.Posts)]
    public class CreatePostComment : IReturn<CreatePostCommentResponse>, IPost
    {
        public long PostId { get; set; }

        public long? ReplyId { get; set; }

        public string Content { get; set; }
    }

    public class CreatePostCommentResponse
    {
        public long Id { get; set; }
        public long PostId { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{PostId}/comments/{Id}", "PUT"), Tag(Tags.Posts)]
    public class UpdatePostComment : IReturn<UpdatePostCommentResponse>, IPut
    {
        public long Id { get; set; }
        public long PostId { get; set; }
        public string Content { get; set; }
    }

    public class UpdatePostCommentResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{PostId}/comments/{Id}", "DELETE"), Tag(Tags.Posts)]
    public class DeletePostComment : IReturn<DeletePostCommentResponse>, IDelete
    {
        public long Id { get; set; }
        public long PostId { get; set; }
    }

    public class DeletePostCommentResponse
    {
        public long Id { get; set; }
        public long PostId { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{PostId}/comments/{Id}", "GET"), Tag(Tags.Posts)]
    public class UserPostCommentVote : IReturn<UserPostCommentVoteResponse>, IGet
    {
        public long Id { get; set; }
        public long PostId { get; set; }
        public int Weight { get; set; }
    }

    public class UserPostCommentVoteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{PostId}/comments/{Id}/report", "PUT"), Tag(Tags.Posts)]
    public class UserPostCommentReport : IReturn<UserPostCommentReportResponse>, IPut
    {
        public long Id { get; set; }
        public long PostId { get; set; }
        public FlagType FlagType { get; set; }
        public string ReportNotes { get; set; }
    }

    public class UserPostCommentReportResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST"), Tag(Tags.Posts)]
    public class ActionPostCommentReport : IReturnVoid, IPost
    {
        public long Id { get; set; }
        public long PostCommentId { get; set; }
        public long PostId { get; set; }
        public ReportAction ReportAction { get; set; }
    }

    [Route("/user/comments/votes"), Tag(Tags.Posts)]
    public class GetUserPostCommentVotes : IReturn<GetUserPostCommentVotesResponse>, IGet
    {
        public long PostId { get; set; }
    }

    public class GetUserPostCommentVotesResponse
    {
        public long PostId { get; set; }
        public List<long> UpVotedCommentIds { get; set; }
        public List<long> DownVotedCommentIds { get; set; }
    }

    [Route("/posts/{PostId}/comments/{Id}/pin", "PUT"), Tag(Tags.Posts)]
    public class PinPostComment : IReturn<PinPostCommentResponse>, IPut
    {
        public long Id { get; set; }
        public long PostId { get; set; }
        public bool Pin { get; set; }
    }

    public class PinPostCommentResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }
}