using System;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.DataAnnotations;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel
{
    [Route("/posts", "GET")]
    public class QueryPosts : QueryDb<Post>
    {
        public int[] Ids { get; set; }
        public int? OrganizationId { get; set; }
        public int[] OrganizationIds { get; set; }
        public string[] Types { get; set; }        
        public int[] AnyTechnologyIds { get; set; }
    }

    [Route("/posts/comment", "GET")]
    public class QueryPostComments : QueryDb<PostComment>
    {
        public int? UserId { get; set; }
        public int? PostId { get; set; }
    }

    [Route("/posts", "POST")]
    public class CreatePost : IReturn<CreatePostResponse>
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
    public class UpdatePost : IReturn<UpdatePostResponse>
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
    public class DeletePost : IReturn<DeletePostResponse>
    {
        public long Id { get; set; }
    }

    public class DeletePostResponse
    {
        public long Id { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/lock", "PUT")]
    public class LockPost : IReturnVoid
    {
        public long Id { get; set; }
        public bool Lock { get; set; }
        public string Reason { get; set; }
    }

    [Route("/posts/{Id}/hide", "PUT")]
    public class HidePost : IReturnVoid
    {
        public long Id { get; set; }
        public bool Hide { get; set; }
        public string Reason { get; set; }
    }

    [Route("/user/posts/activity")]
    public class GetUserPostActivity : IReturn<GetUserPostActivityResponse> {}

    public class GetUserPostActivityResponse
    {
        public List<long> UpVotedPostIds { get; set; }
        public List<long> DownVotedPostIds { get; set; }

        public List<long> FavoritePostIds { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/user/organizations")]
    public class GetUserOrganizations : IReturn<GetUserOrganizationsResponse> { }

    public class GetUserOrganizationsResponse
    {
        public List<OrganizationMember> Members { get; set; }
        public List<OrganizationMemberInvite> MemberInvites { get; set; }
    }

    [Route("/posts/{Id}/vote", "PUT")]
    public class UserPostVote : IReturn<UserPostVoteResponse>
    {
        public long Id { get; set; }
        public int Weight { get; set; }
    }

    public class UserPostVoteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/favorite", "PUT")]
    public class UserPostFavorite : IReturn<UserPostFavoriteResponse>
    {
        public long Id { get; set; }
    }

    public class UserPostFavoriteResponse
    {
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/posts/{Id}/report", "PUT")]
    public class UserPostReport : IReturn<UserPostReportResponse>
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
    public class ActionPostReport : IReturnVoid
    {
        public long PostId { get; set; }
        public long Id { get; set; }
        public ReportAction ReportAction { get; set; }
    }

    [Route("/posts/{Id}", "GET")]
    public class GetPost : IReturn<GetPostResponse>
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
    public class CreatePostComment : IReturn<CreatePostCommentResponse>
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
    public class UpdatePostComment : IReturn<UpdatePostCommentResponse>
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
    public class DeletePostComment : IReturn<DeletePostCommentResponse>
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
    public class UserPostCommentVote : IReturn<UserPostCommentVoteResponse>
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
    public class UserPostCommentReport : IReturn<UserPostCommentReportResponse>
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
    public class ActionPostCommentReport : IReturnVoid
    {
        public long Id { get; set; }
        public long PostCommentId { get; set; }
        public long PostId { get; set; }
        public ReportAction ReportAction { get; set; }
    }

    [Route("/user/comments/votes")]
    public class GetUserPostCommentVotes : IReturn<GetUserPostCommentVotesResponse>
    {
        public long PostId { get; set; }
    }

    public class GetUserPostCommentVotesResponse
    {
        public long PostId { get; set; }
        public List<long> UpVotedCommentIds { get; set; }
        public List<long> DownVotedCommentIds { get; set; }
    }

    [Route("/posts/{PostId}/comments/{Id}/pin", "UPDATE")]
    public class PinPostComment : IReturn<PinPostCommentResponse>
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