using System;
using System.Collections.Generic;
using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel;

[ValidateIsAuthenticated]
[Route("/my-session"), Tag(Tags.User)]
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
    
[ValidateIsAuthenticated]
[Route("/my-feed"), Tag(Tags.User)]
public class GetUserFeed : IGet {}

public class GetUserFeedResponse
{
    public List<TechStackDetails> Results { get; set; } 
}

[Route("/userinfo/{Id}"), Tag(Tags.User)]
public class GetUserInfo : IReturn<GetUserInfoResponse>, IGet
{
    public int Id { get; set; }
    public string UserName { get; set; }
}

public class GetUserInfoResponse
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public DateTime Created { get; set; }
    public string AvatarUrl { get; set; }
    public List<TechnologyStack> TechStacks { get; set; }
    public List<TechnologyStack> FavoriteTechStacks { get; set; }
    public List<Technology> FavoriteTechnologies { get; set; }
    public UserActivity UserActivity { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/favorites/techtacks", Verbs = "GET"), Tag(Tags.User)]
public class GetFavoriteTechStack : IReturn<GetFavoriteTechStackResponse>, IGet
{
    public int TechnologyStackId { get; set; }
}
public class GetFavoriteTechStackResponse
{
    public List<TechnologyStack> Results { get; set; }
}

[Route("/favorites/techtacks/{TechnologyStackId}", Verbs = "PUT"), Tag(Tags.User)]
public class AddFavoriteTechStack : IReturn<FavoriteTechStackResponse>, IPut
{
    public int TechnologyStackId { get; set; }
}

[Route("/favorites/techtacks/{TechnologyStackId}", Verbs = "DELETE"), Tag(Tags.User)]
public class RemoveFavoriteTechStack : IReturn<FavoriteTechStackResponse>, IDelete
{
    public int TechnologyStackId { get; set; }
}

public class FavoriteTechStackResponse
{
    public TechnologyStack Result { get; set; }
}
    
[Route("/favorites/technology", Verbs = "GET"), Tag(Tags.User)]
public class GetFavoriteTechnologies : IReturn<GetFavoriteTechnologiesResponse>, IGet
{
    public int TechnologyId { get; set; }
}
public class GetFavoriteTechnologiesResponse
{
    public List<Technology> Results { get; set; }
}

[Route("/favorites/technology/{TechnologyId}", Verbs = "PUT"), Tag(Tags.User)]
public class AddFavoriteTechnology : IReturn<FavoriteTechnologyResponse>, IPut
{
    public int TechnologyId { get; set; }
}
[Route("/favorites/technology/{TechnologyId}", Verbs = "DELETE"), Tag(Tags.User)]
public class RemoveFavoriteTechnology : IReturn<FavoriteTechnologyResponse>, IDelete
{
    public int TechnologyId { get; set; }
}

public class FavoriteTechnologyResponse
{
    public Technology Result { get; set; }
}

[Route("/pagestats/{Type}/{Slug}"), Tag(Tags.User)]
public class GetPageStats : IReturn<GetPageStatsResponse>, IGet
{
    public string Type { get; set; }
    public string Slug { get; set; }
    public int? Id { get; set; }
}

public class GetPageStatsResponse
{
    public string Type { get; set; }
    public string Slug { get; set; }
    public long ViewCount { get; set; }
    public long FavCount { get; set; }
}

[Route("/users/{UserId}/avatar", "GET"), Tag(Tags.User)]
public class UserAvatar : IGet
{
    public int UserId { get; set; }
}

[Route("/users/karma", "GET"), Tag(Tags.User)]
public class GetUsersKarma : IReturn<GetUsersKarmaResponse>, IGet
{
    public int[] UserIds { get; set; }
}

public class GetUsersKarmaResponse
{
    public Dictionary<int, int> Results { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

public class UserRef
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }

    public int? RefId { get; set; }
    public string RefSource { get; set; }
    public string RefUrn { get; set; }
}

[Route("/users/by-email"), Tag(Tags.User)]
public class GetUsersByEmails : IReturn<GetUsersByEmailsResponse>, IGet
{
    public string[] Emails { get; set; }
}

public class GetUsersByEmailsResponse
{
    public List<UserRef> Results { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}

public enum Frequency
{
    Daily = 1,
    Weekly = 7,
    Monthly = 30,
    Quarterly = 90,
}

[Route("/orgs/{OrganizationId}/subscribe", "PUT"), Tag(Tags.User)]
public class SubscribeToOrganization : IReturnVoid, IPut
{
    public int OrganizationId { get; set; }

    public PostType[] PostTypes { get; set; }

    public Frequency? Frequency { get; set; }
}

[Route("/posts/{PostId}/subscribe", "PUT"), Tag(Tags.User)]
public class SubscribeToPost : IReturnVoid, IPut
{
    public long PostId { get; set; }
}

[Route("/orgs/{OrganizationId}/subscribe", "DELETE"), Tag(Tags.User)]
public class DeleteOrganizationSubscription : IReturnVoid, IDelete
{
    public long OrganizationId { get; set; }
}

[Route("/posts/{PostId}/subscribe", "DELETE"), Tag(Tags.User)]
public class DeletePostSubscription : IReturnVoid, IDelete
{
    public long PostId { get; set; }
}