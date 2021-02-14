using System;
using System.Collections.Generic;
using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel
{
    [Route("/my-session")]
    public class SessionInfo : IReturn<SessionInfoResponse>, IGet {}

    public class SessionInfoResponse
    {
        public DateTime Created { get; set; }

        public string Id { get; set; }
        public string ReferrerUrl { get; set; }
        public string UserAuthId { get; set; }
        public string UserAuthName { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModified { get; set; }
        public List<string> Roles { get; set; }
        public List<string> Permissions { get; set; }
        public bool IsAuthenticated { get; set; }
        public string AuthProvider { get; set; }
        public string ProfileUrl { get; set; }

        public string GithubProfileUrl { get; set; }
        public string TwitterProfileUrl { get; set; }

        public string AccessToken { get; set; }
        public string AvatarUrl { get; set; }
        public List<TechnologyStack> TechStacks { get; set; }
        public List<TechnologyStack> FavoriteTechStacks { get; set; }
        public List<Technology> FavoriteTechnologies { get; set; }
        public UserActivity UserActivity { get; set; }

        public List<OrganizationMember> Members { get; set; }
        public List<OrganizationMemberInvite> MemberInvites { get; set; }
        public List<OrganizationSubscription> Subscriptions { get; set; }
        
        public ResponseStatus ResponseStatus { get; set; }
    }
}
