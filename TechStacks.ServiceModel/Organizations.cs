using System;
using System.Collections.Generic;
using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel;

[Route("/organizations/{Slug}", "GET"), Tag(Tags.Organization)]
public class GetOrganizationBySlug : IReturn<GetOrganizationResponse>, IGet
{
    public string Slug { get; set; }
}

[Route("/orgs/{Id}", "GET"), Tag(Tags.Organization)]
public class GetOrganization : IReturn<GetOrganizationResponse>, IGet
{
    public int? Id { get; set; }
}

public class GetOrganizationResponse
{
    public long Cache { get; set; }

    public int Id { get; set; }

    public string Slug { get; set; }

    public Organization Organization { get; set; }

    public List<OrganizationLabel> Labels { get; set; }

    public List<Category> Categories { get; set; }

    public List<OrganizationMember> Owners { get; set; }

    public List<OrganizationMember> Moderators { get; set; }

    public long MembersCount { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{Id}/admin", "GET"), Tag(Tags.Organization)]
public class GetOrganizationAdmin : IReturn<GetOrganizationAdminResponse>, IGet
{
    public int Id { get; set; }
}

public class GetOrganizationAdminResponse
{
    public List<OrganizationLabel> Labels { get; set; }

    public List<OrganizationMember> Members { get; set; }

    public List<OrganizationMemberInvite> MemberInvites { get; set; }

    public List<PostReportInfo> ReportedPosts { get; set; }

    public List<PostCommentReportInfo> ReportedPostComments { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

public class PostReportInfo // inheriting non abstract PostReport causes Swift build error 
{
    public long Id { get; set; }

    public int OrganizationId { get; set; }

    public long PostId { get; set; }

    public int UserId { get; set; }

    public string UserName { get; set; }

    public FlagType FlagType { get; set; }

    public string ReportNotes { get; set; }

    public DateTime Created { get; set; }

    public DateTime? Acknowledged { get; set; }
    public string AcknowledgedBy { get; set; }

    public DateTime? Dismissed { get; set; }
    public string DismissedBy { get; set; }

    public string Title { get; set; }

    public int ReportCount { get; set; }

    public string CreatedBy { get; set; } //Post
}

public class PostCommentReportInfo // inheriting non abstract PostCommentReport causes Swift build error 
{
    public long Id { get; set; }

    public int OrganizationId { get; set; }

    public long PostId { get; set; }

    public long PostCommentId { get; set; }

    public int UserId { get; set; }

    public string UserName { get; set; }

    public FlagType FlagType { get; set; }

    public string ReportNotes { get; set; }

    public DateTime Created { get; set; }

    public DateTime? Acknowledged { get; set; }
    public string AcknowledgedBy { get; set; }

    public DateTime? Dismissed { get; set; }
    public string DismissedBy { get; set; }

    public string ContentHtml { get; set; }

    public int ReportCount { get; set; }

    public string CreatedBy { get; set; } //Post
}


[Route("/orgs", "POST"), Tag(Tags.Organization)]
public class CreateOrganization : IReturn<CreateOrganizationResponse>, IPost
{
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }

    public long? RefId { get; set; }
    public string RefSource { get; set; }
    public string RefUrn { get; set; }
}

public class CreateOrganizationResponse
{
    public int Id { get; set; }
    public string Slug { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/posts/new", "POST"), Tag(Tags.Organization)]
public class CreateOrganizationForTechnology : IReturn<CreateOrganizationForTechnologyResponse>, IPost
{
    public long? TechnologyId { get; set; }
    public long? TechStackId { get; set; }
}

public class CreateOrganizationForTechnologyResponse
{
    public int OrganizationId { get; set; }
    public string OrganizationSlug { get; set; }
    public long CommentsPostId { get; set; }
    public string CommentsPostSlug { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{Id}", "PUT"), Tag(Tags.Organization)]
public class UpdateOrganization : IReturn<UpdateOrganizationResponse>, IPut
{
    public int Id { get; set; }
    public string Slug { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }
    public string TextColor { get; set; }
    public string LinkColor { get; set; }
    public string BackgroundColor { get; set; }
    public string BackgroundUrl { get; set; }
    public string LogoUrl { get; set; }
    public string HeroUrl { get; set; }
    public string Lang { get; set; }
    public int DeletePostsWithReportCount { get; set; }
    public bool? DisableInvites { get; set; }
    public string DefaultPostType { get; set; }
    public string[] DefaultSubscriptionPostTypes { get; set; }
    public string[] PostTypes { get; set; }
    public string[] ModeratorPostTypes { get; set; }
    public int[] TechnologyIds { get; set; }
}

public class UpdateOrganizationResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{Id}", "DELETE"), Tag(Tags.Organization)]
public class DeleteOrganization : IReturnVoid, IDelete
{
    public int Id { get; set; }
}

[Route("/orgs/{Id}/lock", "PUT"), Tag(Tags.Organization)]
public class LockOrganization : IReturnVoid, IPut
{
    public int Id { get; set; }
    public bool Lock { get; set; }
    public string Reason { get; set; }
}

[Route("/orgs/{OrganizationId}/categories", "GET"), Tag(Tags.Organization)]
public class GetCategories : IReturn<GetCategoriesResponse>, IGet
{
    public int OrganizationId { get; set; }
}

public class GetCategoriesResponse
{
    public List<Category> Results { get; set; }
}

[Route("/orgs/{OrganizationId}/categories", "POST"), Tag(Tags.Organization)]
public class AddOrganizationCategory : IReturn<AddOrganizationCategoryResponse>, IPost
{
    public int OrganizationId { get; set; }
    public string Slug { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int[] TechnologyIds { get; set; }
}

public class AddOrganizationCategoryResponse
{
    public int Id { get; set; }
    public string Slug { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/categories/{Id}", "PUT"), Tag(Tags.Organization)]
public class UpdateOrganizationCategory : IReturn<UpdateOrganizationCategoryResponse>, IPut
{
    public int OrganizationId { get; set; }
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public int[] TechnologyIds { get; set; }
}

public class UpdateOrganizationCategoryResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE"), Tag(Tags.Organization)]
public class DeleteOrganizationCategory : IReturnVoid, IDelete
{
    public int OrganizationId { get; set; }
    public int Id { get; set; }
}

[Route("/orgs/{Id}/members", "GET"), Tag(Tags.Organization)]
public class GetOrganizationMembers : IReturn<GetOrganizationMembersResponse>, IGet
{
    public int Id { get; set; }
}

public class GetOrganizationMembersResponse
{
    public int OrganizationId { get; set; }

    public List<OrganizationMember> Results { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}


[Route("/orgs/{OrganizationId}/labels", "POST"), Tag(Tags.Organization)]
public class AddOrganizationLabel : IReturn<OrganizationLabelResponse>, IPost
{
    public int OrganizationId { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }
}

[Route("/orgs/{OrganizationId}/members/{Slug}", "PUT"), Tag(Tags.Organization)]
public class UpdateOrganizationLabel : IReturn<OrganizationLabelResponse>, IPut
{
    public int OrganizationId { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }
}

[Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE"), Tag(Tags.Organization)]
public class RemoveOrganizationLabel : IReturnVoid, IDelete
{
    public int OrganizationId { get; set; }
    public string Slug { get; set; }
}

public class OrganizationLabelResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/members", "POST"), Tag(Tags.Organization)]
public class AddOrganizationMember : IReturn<AddOrganizationMemberResponse>, IPost
{
    public int OrganizationId { get; set; }
    public string UserName { get; set; }
    public bool IsOwner { get; set; }
    public bool IsModerator { get; set; }
    public bool DenyPosts { get; set; }
    public bool DenyComments { get; set; }
    public bool DenyAll { get; set; }
    public string Notes { get; set; }
}

public class AddOrganizationMemberResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/members/{Id}", "PUT"), Tag(Tags.Organization)]
public class UpdateOrganizationMember : IReturn<UpdateOrganizationMemberResponse>, IPut
{
    public int OrganizationId { get; set; }
    public int UserId { get; set; }
    public bool IsOwner { get; set; }
    public bool IsModerator { get; set; }
    public bool DenyPosts { get; set; }
    public bool DenyComments { get; set; }
    public bool DenyAll { get; set; }
    public string Notes { get; set; }
}

public class UpdateOrganizationMemberResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE"), Tag(Tags.Organization)]
public class RemoveOrganizationMember : IReturnVoid, IDelete
{
    public int OrganizationId { get; set; }
    public int UserId { get; set; }
}

[Route("/orgs/{OrganizationId}/invites", "GET"), Tag(Tags.Organization)]
public class GetOrganizationMemberInvites : IReturn<GetOrganizationMemberInvitesResponse>, IGet
{
    public int OrganizationId { get; set; }
}

public class GetOrganizationMemberInvitesResponse
{
    public List<OrganizationMemberInvite> Results { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/invites", "POST"), Tag(Tags.Organization)]
public class RequestOrganizationMemberInvite : IReturn<RequestOrganizationMemberInviteResponse>, IPost
{
    public int OrganizationId { get; set; }
}

public class RequestOrganizationMemberInviteResponse
{
    public int OrganizationId { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT"), Tag(Tags.Organization)]
public class UpdateOrganizationMemberInvite : IReturn<UpdateOrganizationMemberInviteResponse>, IPut
{
    public int OrganizationId { get; set; }
    public string UserName { get; set; }
    public bool Approve { get; set; }
    public bool Dismiss { get; set; }
}

public class UpdateOrganizationMemberInviteResponse
{
    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/orgs/{OrganizationId}/members/set", "POST"), Tag(Tags.Organization)]
public class SetOrganizationMembers : IReturn<SetOrganizationMembersResponse>, IPost
{
    public int OrganizationId { get; set; }
    public string[] GithubUserNames { get; set; }
    public string[] TwitterUserNames { get; set; }
    public string[] Emails { get; set; }
        
    public bool RemoveUnspecifiedMembers { get; set; }
        
    public bool IsOwner { get; set; }
    public bool IsModerator { get; set; }
    public bool DenyPosts { get; set; }
    public bool DenyComments { get; set; }
    public bool DenyAll { get; set; }
}

public class SetOrganizationMembersResponse
{
    public int[] UserIdsAdded { get; set; }
    public int[] UserIdsRemoved { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}