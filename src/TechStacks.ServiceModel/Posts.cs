using System;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.DataAnnotations;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel
{
    [Route("/posts", "GET")]
    public class QueryPosts : QueryDb<Post>, IGet
    {
        public int[] Ids { get; set; }
        public int? OrganizationId { get; set; }
        public int[] OrganizationIds { get; set; }
        public string[] Types { get; set; }        
        public int[] AnyTechnologyIds { get; set; }
        public string[] Is { get; set; } //Labels or Status        
    }

    [Route("/posts/comment", "GET")]
    public class QueryPostComments : QueryDb<PostComment>, IGet
    {
        public int? UserId { get; set; }
        public int? PostId { get; set; }
    }

    [Route("/posts", "POST")]
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

    [Route("/posts/{Id}", "PUT")]
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

    [Route("/posts/{Id}", "DELETE")]
    public class DeletePost : IReturn<DeletePostResponse>, IDelete
    {
        public long Id { get; set; }
    }

    public class DeletePostResponse
    {
        public long Id { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/lock", "PUT")]
    public class LockPost : IReturnVoid, IPut
    {
        public long Id { get; set; }
        public bool Lock { get; set; }
        public string Reason { get; set; }
    }

    [Route("/posts/{Id}/hide", "PUT")]
    public class HidePost : IReturnVoid, IPut
    {
        public long Id { get; set; }
        public bool Hide { get; set; }
        public string Reason { get; set; }
    }

    [Route("/posts/{Id}/status/{Status}", "PUT")]
    public class ChangeStatusPost : IReturnVoid, IPut
    {
        public long Id { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
    }

    [Route("/user/posts/activity")]
    public class GetUserPostActivity : IReturn<GetUserPostActivityResponse>, IGet {}

    public class GetUserPostActivityResponse
    {
        public List<long> UpVotedPostIds { get; set; }
        public List<long> DownVotedPostIds { get; set; }

        public List<long> FavoritePostIds { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/user/organizations")]
    public class GetUserOrganizations : IReturn<GetUserOrganizationsResponse>, IGet { }

    public class GetUserOrganizationsResponse
    {
        public List<OrganizationMember> Members { get; set; }
        public List<OrganizationMemberInvite> MemberInvites { get; set; }
        public List<OrganizationSubscription> Subscriptions { get; set; } 
    }

    [Route("/posts/{Id}/vote", "PUT")]
    public class UserPostVote : IReturn<UserPostVoteResponse>, IPut
    {
        public long Id { get; set; }
        public int Weight { get; set; }
    }

    public class UserPostVoteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/favorite", "PUT")]
    public class UserPostFavorite : IReturn<UserPostFavoriteResponse>, IPut
    {
        public long Id { get; set; }
    }

    public class UserPostFavoriteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/report", "PUT")]
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

    [Route("/posts/{PostId}/report/{Id}", "POST")]
    public class ActionPostReport : IReturnVoid, IPost
    {
        public long PostId { get; set; }
        public long Id { get; set; }
        public ReportAction ReportAction { get; set; }
    }

    [Route("/posts/{Id}", "GET")]
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

    [Route("/posts/{PostId}/comments", "POST")]
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

    [Route("/posts/{PostId}/comments/{Id}", "PUT")]
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

    [Route("/posts/{PostId}/comments/{Id}", "DELETE")]
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

    [Route("/posts/{PostId}/comments/{Id}", "GET")]
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

    [Route("/posts/{PostId}/comments/{Id}/report", "PUT")]
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

    [Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")]
    public class ActionPostCommentReport : IReturnVoid, IPost
    {
        public long Id { get; set; }
        public long PostCommentId { get; set; }
        public long PostId { get; set; }
        public ReportAction ReportAction { get; set; }
    }

    [Route("/user/comments/votes")]
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

    [Route("/posts/{PostId}/comments/{Id}/pin", "PUT")]
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