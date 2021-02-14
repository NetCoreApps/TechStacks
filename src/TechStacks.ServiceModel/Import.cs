using System;
using System.Collections.Generic;
using ServiceStack;

namespace TechStacks.ServiceModel
{
    [Route("/sync/discourse/{Site}")]
    public class SyncDiscourseSite : IPost
    {
        public string Site { get; set; }
    }

    public class SyncDiscourseSiteResponse
    {
        public string TimeTaken { get; set; }

        public List<string> UserLogs { get; set; }

        public List<string> PostsLogs { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }
    
    public class ImportUser : IReturn<ImportUserResponse>, IPost
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public string Company { get; set; }

        public string RefSource { get; set; }
        
        public int? RefId { get; set; }

        public string RefIdStr { get; set; }

        public string RefUrn { get; set; }

        public string DefaultProfileUrl { get; set; }

        public Dictionary<string, string> Meta { get; set; }
    }

    public class ImportUserResponse
    {
        public int Id { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/import/uservoice/suggestion")]
    public class ImportUserVoiceSuggestion : IReturn<ImportUserVoiceSuggestionResponse>, IPost
    {
        public int OrganizationId { get; set; }
        public string Url { get; set; }
        public int Id { get; set; }
        public int TopicId { get; set; }
        public string State { get; set; } //= published, closed, approved
        public string Title { get; set; }
        /// <summary>
        /// Optional
        /// </summary>
        public string Slug { get; set; }
        /// <summary>
        /// Optional
        /// </summary>
        public string Category { get; set; }
        public string Text { get; set; }
        public string FormattedText { get; set; }
        public int VoteCount { get; set; }
        public DateTime? ClosedAt { get; set; }
        /// <summary>
        /// Optional
        /// </summary>
        public string StatusKey { get; set; } //= null, completed, declined, started, under review
        public string StatusHexColor { get; set; }
        public UserVoiceUser StatusChangedBy { get; set; }
        public UserVoiceUser Creator { get; set; }
        public UserVoiceComment Response { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class UserVoiceUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class UserVoiceComment
    {
        public string Text { get; set; }
        public string FormattedText { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserVoiceUser Creator { get; set; }
    }

    public class ImportUserVoiceSuggestionResponse
    {
        public long PostId { get; set; }
        public string PostSlug { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
}