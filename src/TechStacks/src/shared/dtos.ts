/* Options:
Date: 2018-03-24 00:10:39
Version: 5.03
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:16325

//GlobalNamespace: 
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse() : T;
}

export interface IReturnVoid
{
    createResponse() : void;
}

export interface IMeta
{
    meta?: { [index:string]: string; };
}

export interface IPost
{
}

export class Organization
{
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
    textColor: string;
    linkColor: string;
    backgroundColor: string;
    backgroundUrl: string;
    logoUrl: string;
    heroUrl: string;
    lang: string;
    postTypes: string[];
    moderatorPostTypes: string[];
    deletePostsWithReportCount: number;
    upVotes: number;
    downVotes: number;
    views: number;
    favorites: number;
    subscribers: number;
    commentsCount: number;
    postsCount: number;
    score: number;
    rank: number;
    refId: number;
    refSource: string;
    hidden: string;
    hiddenBy: string;
    locked: string;
    lockedBy: string;
    deleted: string;
    deletedBy: string;
    created: string;
    createdBy: string;
    modified: string;
    modifiedBy: string;
}

export class Category
{
    id: number;
    organizationId: number;
    name: string;
    slug: string;
    description: string;
    color: string;
    technologyIds: number[];
    commentsCount: number;
    postsCount: number;
    score: number;
    rank: number;
}

export class OrganizationMember
{
    id: number;
    organizationId: number;
    userId: number;
    userName: string;
    isOwner: boolean;
    isModerator: boolean;
    denyAll: boolean;
    denyPosts: boolean;
    denyComments: boolean;
    notes: string;
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    errorCode: string;

    // @DataMember(Order=2)
    message: string;

    // @DataMember(Order=3)
    stackTrace: string;

    // @DataMember(Order=4)
    errors: ResponseError[];

    // @DataMember(Order=5)
    meta: { [index:string]: string; };
}

export class OrganizationMemberInvite
{
    id: number;
    organizationId: number;
    userId: number;
    userName: string;
    dismissed: string;
}

export type FlagType = "Violation" | "Spam" | "Abusive" | "Confidential" | "OffTopic" | "Other";

export class PostReport
{
    id: number;
    organizationId: number;
    postId: number;
    userId: number;
    userName: string;
    flagType: FlagType;
    reportNotes: string;
    created: string;
    acknowledged: string;
    acknowledgedBy: string;
    dismissed: string;
    dismissedBy: string;
}

export class PostReportInfo extends PostReport
{
    title: string;
    reportCount: number;
    createdBy: string;
}

export class PostCommentReport
{
    id: number;
    organizationId: number;
    postId: number;
    postCommentId: number;
    userId: number;
    userName: string;
    flagType: FlagType;
    reportNotes: string;
    created: string;
    acknowledged: string;
    acknowledgedBy: string;
    dismissed: string;
    dismissedBy: string;
}

export class PostCommentReportInfo extends PostCommentReport
{
    contentHtml: string;
    reportCount: number;
    createdBy: string;
}

export class QueryBase
{
    // @DataMember(Order=1)
    skip: number;

    // @DataMember(Order=2)
    take: number;

    // @DataMember(Order=3)
    orderBy: string;

    // @DataMember(Order=4)
    orderByDesc: string;

    // @DataMember(Order=5)
    include: string;

    // @DataMember(Order=6)
    fields: string;

    // @DataMember(Order=7)
    meta: { [index:string]: string; };
}

export class QueryDb<T> extends QueryBase
{
}

export type PostType = "Announcement" | "Post" | "Showcase" | "Question" | "Request";

export class Post
{
    id: number;
    organizationId: number;
    userId: number;
    type: PostType;
    categoryId: number;
    title: string;
    slug: string;
    url: string;
    imageUrl: string;
    // @StringLength(2147483647)
    content: string;

    // @StringLength(2147483647)
    contentHtml: string;

    pinCommentId: number;
    technologyIds: number[];
    fromDate: string;
    toDate: string;
    location: string;
    metaType: string;
    meta: string;
    approved: boolean;
    upVotes: number;
    downVotes: number;
    points: number;
    views: number;
    favorites: number;
    subscribers: number;
    replyCount: number;
    commentsCount: number;
    wordCount: number;
    reportCount: number;
    linksCount: number;
    linkedToCount: number;
    score: number;
    rank: number;
    labels: string[];
    refUserIds: number[];
    refLinks: string[];
    muteUserIds: number[];
    lastCommentDate: string;
    lastCommentId: number;
    lastCommentUserId: number;
    deleted: string;
    deletedBy: string;
    locked: string;
    lockedBy: string;
    hidden: string;
    hiddenBy: string;
    archived: boolean;
    bumped: string;
    created: string;
    createdBy: string;
    modified: string;
    modifiedBy: string;
    refId: number;
    refSource: string;
    refUrn: string;
}

export class PostComment
{
    id: number;
    postId: number;
    userId: number;
    replyId: number;
    // @StringLength(2147483647)
    content: string;

    // @StringLength(2147483647)
    contentHtml: string;

    score: number;
    rank: number;
    upVotes: number;
    downVotes: number;
    favorites: number;
    wordCount: number;
    reportCount: number;
    deleted: string;
    hidden: string;
    modified: string;
    created: string;
    createdBy: string;
    refId: number;
    refSource: string;
    refUrn: string;
}

export type ReportAction = "Dismiss" | "Delete";

export class UserRef
{
    id: number;
    userName: string;
    email: string;
    refId: number;
    refSource: string;
    refUrn: string;
}

export class TechnologyStackBase
{
    id: number;
    name: string;
    vendorName: string;
    description: string;
    appUrl: string;
    screenshotUrl: string;
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    isLocked: boolean;
    ownerId: string;
    slug: string;
    // @StringLength(2147483647)
    details: string;

    // @StringLength(2147483647)
    detailsHtml: string;

    lastStatusUpdate: string;
    organizationId: number;
    commentsPostId: number;
    viewCount: number;
    favCount: number;
}

export class TechnologyStack extends TechnologyStackBase
{
}

export type TechnologyTier = "ProgrammingLanguage" | "Client" | "Http" | "Server" | "Data" | "SoftwareInfrastructure" | "OperatingSystem" | "HardwareInfrastructure" | "ThirdPartyServices";

export class TechnologyBase
{
    id: number;
    name: string;
    vendorName: string;
    vendorUrl: string;
    productUrl: string;
    logoUrl: string;
    description: string;
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    ownerId: string;
    slug: string;
    logoApproved: boolean;
    isLocked: boolean;
    tier: TechnologyTier;
    lastStatusUpdate: string;
    organizationId: number;
    commentsPostId: number;
    viewCount: number;
    favCount: number;
}

export class Technology extends TechnologyBase
{
}

export class UserActivity
{
    id: number;
    userName: string;
    karma: number;
    technologyCount: number;
    techStacksCount: number;
    postsCount: number;
    postUpVotes: number;
    postDownVotes: number;
    commentUpVotes: number;
    commentDownVotes: number;
    postCommentsCount: number;
    pinnedCommentCount: number;
    postReportCount: number;
    postCommentReportCount: number;
    created: string;
    modified: string;
}

export type Frequency = "Daily" | "Weekly" | "Monthly" | "Quarterly";

export class TechnologyHistory extends TechnologyBase
{
    technologyId: number;
    operation: string;
}

export interface IRegisterStats
{
}

export class TechnologyStackHistory extends TechnologyStackBase
{
    technologyStackId: number;
    operation: string;
    technologyIds: number[];
}

export class UserInfo
{
    userName: string;
    avatarUrl: string;
    stacksCount: number;
}

export class TechnologyInfo
{
    tier: TechnologyTier;
    slug: string;
    name: string;
    logoUrl: string;
    stacksCount: number;
}

export class TechnologyInStack extends TechnologyBase
{
    technologyId: number;
    technologyStackId: number;
    justification: string;
}

export class TechStackDetails extends TechnologyStackBase
{
    technologyChoices: TechnologyInStack[];
}

export class CategoryInfo
{
    id: number;
    name: string;
    slug: string;
}

export class OrganizationInfo
{
    id: number;
    name: string;
    slug: string;
    refId: number;
    refSource: string;
    upVotes: number;
    downVotes: number;
    rank: number;
    lang: string;
    postTypes: string[];
    moderatorPostTypes: string[];
    locked: string;
    categories: CategoryInfo[];
}

// @DataContract
export class Option
{
    // @DataMember(Name="name")
    name: string;

    // @DataMember(Name="title")
    title: string;

    // @DataMember(Name="value")
    value: TechnologyTier;
}

export class UserVoiceUser
{
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
}

export class UserVoiceComment
{
    text: string;
    formattedText: string;
    createdAt: string;
    creator: UserVoiceUser;
}

export class GetOrganizationResponse
{
    cache: number;
    id: number;
    slug: string;
    organization: Organization;
    categories: Category[];
    owners: OrganizationMember[];
    moderators: OrganizationMember[];
    membersTotal: number;
    responseStatus: ResponseStatus;
}

export class GetOrganizationMembersResponse
{
    organizationId: number;
    results: OrganizationMember[];
    responseStatus: ResponseStatus;
}

export class GetOrganizationAdminResponse
{
    members: OrganizationMember[];
    memberInvites: OrganizationMemberInvite[];
    reportedPosts: PostReportInfo[];
    reportedPostComments: PostCommentReportInfo[];
    responseStatus: ResponseStatus;
}

export class CreateOrganizationForTechnologyResponse
{
    organizationId: number;
    organizationSlug: string;
    commentsPostId: number;
    commentsPostSlug: string;
    responseStatus: ResponseStatus;
}

export class CreateOrganizationResponse
{
    id: number;
    slug: string;
    responseStatus: ResponseStatus;
}

export class UpdateOrganizationResponse
{
    responseStatus: ResponseStatus;
}

export class AddCategoryResponse
{
    id: number;
    slug: string;
    responseStatus: ResponseStatus;
}

export class UpdateCategoryResponse
{
    responseStatus: ResponseStatus;
}

export class AddOrganizationMemberResponse
{
    responseStatus: ResponseStatus;
}

export class UpdateOrganizationMemberResponse
{
    responseStatus: ResponseStatus;
}

export class SetOrganizationMembersResponse
{
    userIdsAdded: number[];
    userIdsRemoved: number[];
    responseStatus: ResponseStatus;
}

export class GetOrganizationMemberInvitesResponse
{
    results: OrganizationMemberInvite[];
    responseStatus: ResponseStatus;
}

export class RequestOrganizationMemberInviteResponse
{
    organizationId: number;
    responseStatus: ResponseStatus;
}

export class UpdateOrganizationMemberInviteResponse
{
    responseStatus: ResponseStatus;
}

// @DataContract
export class QueryResponse<T>
{
    // @DataMember(Order=1)
    offset: number;

    // @DataMember(Order=2)
    total: number;

    // @DataMember(Order=3)
    results: T[];

    // @DataMember(Order=4)
    meta: { [index:string]: string; };

    // @DataMember(Order=5)
    responseStatus: ResponseStatus;
}

export class GetPostResponse
{
    cache: number;
    post: Post;
    comments: PostComment[];
    responseStatus: ResponseStatus;
}

export class CreatePostResponse
{
    id: number;
    slug: string;
    responseStatus: ResponseStatus;
}

export class UpdatePostResponse
{
    responseStatus: ResponseStatus;
}

export class DeletePostResponse
{
    id: number;
    responseStatus: ResponseStatus;
}

export class CreatePostCommentResponse
{
    id: number;
    postId: number;
    responseStatus: ResponseStatus;
}

export class UpdatePostCommentResponse
{
    responseStatus: ResponseStatus;
}

export class DeletePostCommentResponse
{
    id: number;
    postId: number;
    responseStatus: ResponseStatus;
}

export class GetUserPostCommentVotesResponse
{
    postId: number;
    upVotedCommentIds: number[];
    downVotedCommentIds: number[];
}

export class PinPostCommentResponse
{
    responseStatus: ResponseStatus;
}

export class GetUsersByEmailsResponse
{
    results: UserRef[];
    responseStatus: ResponseStatus;
}

export class GetUserPostActivityResponse
{
    upVotedPostIds: number[];
    downVotedPostIds: number[];
    favoritePostIds: number[];
    responseStatus: ResponseStatus;
}

export class GetUserOrganizationsResponse
{
    members: OrganizationMember[];
    memberInvites: OrganizationMemberInvite[];
}

export class UserPostVoteResponse
{
    responseStatus: ResponseStatus;
}

export class UserPostFavoriteResponse
{
    responseStatus: ResponseStatus;
}

export class UserPostReportResponse
{
    responseStatus: ResponseStatus;
}

export class UserPostCommentVoteResponse
{
    responseStatus: ResponseStatus;
}

export class UserPostCommentReportResponse
{
    responseStatus: ResponseStatus;
}

export class SessionInfoResponse
{
    created: string;
    id: string;
    referrerUrl: string;
    userAuthId: string;
    userAuthName: string;
    userName: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    lastModified: string;
    roles: string[];
    permissions: string[];
    isAuthenticated: boolean;
    authProvider: string;
    profileUrl: string;
    githubProfileUrl: string;
    twitterProfileUrl: string;
    accessToken: string;
    avatarUrl: string;
    techStacks: TechnologyStack[];
    favoriteTechStacks: TechnologyStack[];
    favoriteTechnologies: Technology[];
    userActivity: UserActivity;
    members: OrganizationMember[];
    memberInvites: OrganizationMemberInvite[];
    responseStatus: ResponseStatus;
}

export class GetTechnologyPreviousVersionsResponse
{
    results: TechnologyHistory[];
}

export class GetAllTechnologiesResponse
{
    results: Technology[];
    total: number;
}

export class GetTechnologyResponse
{
    created: string;
    technology: Technology;
    technologyStacks: TechnologyStack[];
    responseStatus: ResponseStatus;
}

export class GetTechnologyFavoriteDetailsResponse
{
    users: string[];
    favoriteCount: number;
}

export class CreateTechnologyResponse
{
    result: Technology;
    responseStatus: ResponseStatus;
}

export class UpdateTechnologyResponse
{
    result: Technology;
    responseStatus: ResponseStatus;
}

export class DeleteTechnologyResponse
{
    result: Technology;
    responseStatus: ResponseStatus;
}

export class GetTechnologyStackPreviousVersionsResponse
{
    results: TechnologyStackHistory[];
}

export class GetPageStatsResponse
{
    type: string;
    slug: string;
    viewCount: number;
    favCount: number;
}

export class HourlyTaskResponse
{
    meta: { [index:string]: string; };
    responseStatus: ResponseStatus;
}

export class OverviewResponse
{
    created: string;
    topUsers: UserInfo[];
    topTechnologies: TechnologyInfo[];
    latestTechStacks: TechStackDetails[];
    popularTechStacks: TechnologyStack[];
    allOrganizations: OrganizationInfo[];
    topTechnologiesByTier: { [index:string]: TechnologyInfo[]; };
    responseStatus: ResponseStatus;
}

export class AppOverviewResponse
{
    created: string;
    allTiers: Option[];
    topTechnologies: TechnologyInfo[];
    responseStatus: ResponseStatus;
}

export class GetAllTechnologyStacksResponse
{
    results: TechnologyStack[];
    total: number;
}

export class GetTechnologyStackResponse
{
    created: string;
    result: TechStackDetails;
    responseStatus: ResponseStatus;
}

export class GetTechnologyStackFavoriteDetailsResponse
{
    users: string[];
    favoriteCount: number;
}

export class GetConfigResponse
{
    allTiers: Option[];
    allPostTypes: Option[];
    allFlagTypes: Option[];
}

export class CreateTechnologyStackResponse
{
    result: TechStackDetails;
    responseStatus: ResponseStatus;
}

export class UpdateTechnologyStackResponse
{
    result: TechStackDetails;
    responseStatus: ResponseStatus;
}

export class DeleteTechnologyStackResponse
{
    result: TechStackDetails;
    responseStatus: ResponseStatus;
}

export class GetFavoriteTechStackResponse
{
    results: TechnologyStack[];
}

export class FavoriteTechStackResponse
{
    result: TechnologyStack;
}

export class GetFavoriteTechnologiesResponse
{
    results: Technology[];
}

export class FavoriteTechnologyResponse
{
    result: Technology;
}

export class GetUserFeedResponse
{
    results: TechStackDetails[];
}

export class GetUsersKarmaResponse
{
    results: { [index:number]: number; };
    responseStatus: ResponseStatus;
}

export class GetUserInfoResponse
{
    id: number;
    userName: string;
    created: string;
    avatarUrl: string;
    techStacks: TechnologyStack[];
    favoriteTechStacks: TechnologyStack[];
    favoriteTechnologies: Technology[];
    userActivity: UserActivity;
    responseStatus: ResponseStatus;
}

export class SyncDiscourseSiteResponse
{
    timeTaken: string;
    userLogs: string[];
    postsLogs: string[];
    responseStatus: ResponseStatus;
}

export class LogoUrlApprovalResponse
{
    result: Technology;
}

export class LockStackResponse
{
}

export class ImportUserResponse
{
    id: number;
    responseStatus: ResponseStatus;
}

export class ImportUserVoiceSuggestionResponse
{
    postId: number;
    postSlug: string;
    responseStatus: ResponseStatus;
}

// @DataContract
export class AuthenticateResponse
{
    // @DataMember(Order=1)
    userId: string;

    // @DataMember(Order=2)
    sessionId: string;

    // @DataMember(Order=3)
    userName: string;

    // @DataMember(Order=4)
    displayName: string;

    // @DataMember(Order=5)
    referrerUrl: string;

    // @DataMember(Order=6)
    bearerToken: string;

    // @DataMember(Order=7)
    refreshToken: string;

    // @DataMember(Order=8)
    responseStatus: ResponseStatus;

    // @DataMember(Order=9)
    meta: { [index:string]: string; };
}

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class ConvertSessionToTokenResponse
{
    // @DataMember(Order=1)
    meta: { [index:string]: string; };

    // @DataMember(Order=2)
    accessToken: string;

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class GetAccessTokenResponse
{
    // @DataMember(Order=1)
    accessToken: string;

    // @DataMember(Order=2)
    responseStatus: ResponseStatus;
}

// @Route("/ping")
export class Ping
{
}

// @Route("/orgs/{Id}", "GET")
export class GetOrganization implements IReturn<GetOrganizationResponse>
{
    id: number;
    createResponse() { return new GetOrganizationResponse(); }
    getTypeName() { return "GetOrganization"; }
}

// @Route("/organizations/{Slug}", "GET")
export class GetOrganizationBySlug implements IReturn<GetOrganizationResponse>
{
    slug: string;
    createResponse() { return new GetOrganizationResponse(); }
    getTypeName() { return "GetOrganizationBySlug"; }
}

// @Route("/orgs/{Id}/members", "GET")
export class GetOrganizationMembers implements IReturn<GetOrganizationMembersResponse>
{
    id: number;
    createResponse() { return new GetOrganizationMembersResponse(); }
    getTypeName() { return "GetOrganizationMembers"; }
}

// @Route("/orgs/{Id}/admin", "GET")
export class GetOrganizationAdmin implements IReturn<GetOrganizationAdminResponse>
{
    id: number;
    createResponse() { return new GetOrganizationAdminResponse(); }
    getTypeName() { return "GetOrganizationAdmin"; }
}

// @Route("/orgs/posts/new", "POST")
export class CreateOrganizationForTechnology implements IReturn<CreateOrganizationForTechnologyResponse>
{
    technologyId: number;
    techStackId: number;
    createResponse() { return new CreateOrganizationForTechnologyResponse(); }
    getTypeName() { return "CreateOrganizationForTechnology"; }
}

// @Route("/orgs", "POST")
export class CreateOrganization implements IReturn<CreateOrganizationResponse>
{
    name: string;
    slug: string;
    description: string;
    refId: number;
    refSource: string;
    refUrn: string;
    createResponse() { return new CreateOrganizationResponse(); }
    getTypeName() { return "CreateOrganization"; }
}

// @Route("/orgs/{Id}", "PUT")
export class UpdateOrganization implements IReturn<UpdateOrganizationResponse>
{
    id: number;
    slug: string;
    name: string;
    description: string;
    color: string;
    textColor: string;
    linkColor: string;
    backgroundColor: string;
    backgroundUrl: string;
    logoUrl: string;
    heroUrl: string;
    lang: string;
    deletePostsWithReportCount: number;
    postTypes: string[];
    moderatorPostTypes: string[];
    technologyIds: number[];
    createResponse() { return new UpdateOrganizationResponse(); }
    getTypeName() { return "UpdateOrganization"; }
}

// @Route("/orgs/{Id}", "DELETE")
export class DeleteOrganization implements IReturnVoid
{
    id: number;
    createResponse() {}
    getTypeName() { return "DeleteOrganization"; }
}

// @Route("/orgs/{Id}/lock", "PUT")
export class LockOrganization implements IReturnVoid
{
    id: number;
    lock: boolean;
    reason: string;
    createResponse() {}
    getTypeName() { return "LockOrganization"; }
}

// @Route("/orgs/{OrganizationId}/categories", "POST")
export class AddOrganizationCategory implements IReturn<AddCategoryResponse>
{
    organizationId: number;
    slug: string;
    name: string;
    description: string;
    technologyIds: number[];
    createResponse() { return new AddCategoryResponse(); }
    getTypeName() { return "AddOrganizationCategory"; }
}

// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
export class UpdateOrganizationCategory implements IReturn<UpdateCategoryResponse>
{
    organizationId: number;
    id: number;
    name: string;
    slug: string;
    description: string;
    technologyIds: number[];
    createResponse() { return new UpdateCategoryResponse(); }
    getTypeName() { return "UpdateOrganizationCategory"; }
}

// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
export class DeleteOrganizationCategory implements IReturnVoid
{
    organizationId: number;
    id: number;
    createResponse() {}
    getTypeName() { return "DeleteOrganizationCategory"; }
}

// @Route("/orgs/{OrganizationId}/members", "POST")
export class AddOrganizationMember implements IReturn<AddOrganizationMemberResponse>
{
    organizationId: number;
    userName: string;
    isOwner: boolean;
    isModerator: boolean;
    denyPosts: boolean;
    denyComments: boolean;
    denyAll: boolean;
    notes: string;
    createResponse() { return new AddOrganizationMemberResponse(); }
    getTypeName() { return "AddOrganizationMember"; }
}

// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
export class UpdateOrganizationMember implements IReturn<UpdateOrganizationMemberResponse>
{
    organizationId: number;
    userId: number;
    isOwner: boolean;
    isModerator: boolean;
    denyPosts: boolean;
    denyComments: boolean;
    denyAll: boolean;
    notes: string;
    createResponse() { return new UpdateOrganizationMemberResponse(); }
    getTypeName() { return "UpdateOrganizationMember"; }
}

// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
export class RemoveOrganizationMember implements IReturnVoid
{
    organizationId: number;
    userId: number;
    createResponse() {}
    getTypeName() { return "RemoveOrganizationMember"; }
}

// @Route("/orgs/{OrganizationId}/members/set", "POST")
export class SetOrganizationMembers implements IReturn<SetOrganizationMembersResponse>
{
    organizationId: number;
    githubUserNames: string[];
    twitterUserNames: string[];
    emails: string[];
    removeUnspecifiedMembers: boolean;
    isOwner: boolean;
    isModerator: boolean;
    denyPosts: boolean;
    denyComments: boolean;
    denyAll: boolean;
    createResponse() { return new SetOrganizationMembersResponse(); }
    getTypeName() { return "SetOrganizationMembers"; }
}

// @Route("/orgs/{OrganizationId}/invites", "GET")
export class GetOrganizationMemberInvites implements IReturn<GetOrganizationMemberInvitesResponse>
{
    organizationId: number;
    createResponse() { return new GetOrganizationMemberInvitesResponse(); }
    getTypeName() { return "GetOrganizationMemberInvites"; }
}

// @Route("/orgs/{OrganizationId}/invites", "POST")
export class RequestOrganizationMemberInvite implements IReturn<RequestOrganizationMemberInviteResponse>
{
    organizationId: number;
    createResponse() { return new RequestOrganizationMemberInviteResponse(); }
    getTypeName() { return "RequestOrganizationMemberInvite"; }
}

// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
export class UpdateOrganizationMemberInvite implements IReturn<UpdateOrganizationMemberInviteResponse>
{
    organizationId: number;
    userName: string;
    approve: boolean;
    dismiss: boolean;
    createResponse() { return new UpdateOrganizationMemberInviteResponse(); }
    getTypeName() { return "UpdateOrganizationMemberInvite"; }
}

// @Route("/posts", "GET")
export class QueryPosts extends QueryDb<Post> implements IReturn<QueryResponse<Post>>, IMeta
{
    ids: number[];
    organizationId: number;
    organizationIds: number[];
    types: string[];
    anyTechnologyIds: number[];
    createResponse() { return new QueryResponse<Post>(); }
    getTypeName() { return "QueryPosts"; }
}

// @Route("/posts/{Id}", "GET")
export class GetPost implements IReturn<GetPostResponse>
{
    id: number;
    include: string;
    createResponse() { return new GetPostResponse(); }
    getTypeName() { return "GetPost"; }
}

// @Route("/posts", "POST")
export class CreatePost implements IReturn<CreatePostResponse>
{
    organizationId: number;
    type: PostType;
    categoryId: number;
    title: string;
    url: string;
    imageUrl: string;
    content: string;
    lock: boolean;
    technologyIds: number[];
    fromDate: string;
    toDate: string;
    metaType: string;
    meta: string;
    refId: number;
    refSource: string;
    refUrn: string;
    createResponse() { return new CreatePostResponse(); }
    getTypeName() { return "CreatePost"; }
}

// @Route("/posts/{Id}", "PUT")
export class UpdatePost implements IReturn<UpdatePostResponse>
{
    id: number;
    organizationId: number;
    type: PostType;
    categoryId: number;
    title: string;
    url: string;
    imageUrl: string;
    content: string;
    lock: boolean;
    technologyIds: number[];
    fromDate: string;
    toDate: string;
    metaType: string;
    meta: string;
    createResponse() { return new UpdatePostResponse(); }
    getTypeName() { return "UpdatePost"; }
}

// @Route("/posts/{Id}", "DELETE")
export class DeletePost implements IReturn<DeletePostResponse>
{
    id: number;
    createResponse() { return new DeletePostResponse(); }
    getTypeName() { return "DeletePost"; }
}

// @Route("/posts/{Id}/lock", "PUT")
export class LockPost implements IReturnVoid
{
    id: number;
    lock: boolean;
    reason: string;
    createResponse() {}
    getTypeName() { return "LockPost"; }
}

// @Route("/posts/{Id}/hide", "PUT")
export class HidePost implements IReturnVoid
{
    id: number;
    hide: boolean;
    reason: string;
    createResponse() {}
    getTypeName() { return "HidePost"; }
}

// @Route("/posts/{PostId}/report/{Id}", "POST")
export class ActionPostReport implements IReturnVoid
{
    postId: number;
    id: number;
    reportAction: ReportAction;
    createResponse() {}
    getTypeName() { return "ActionPostReport"; }
}

// @Route("/posts/{PostId}/comments", "POST")
export class CreatePostComment implements IReturn<CreatePostCommentResponse>
{
    postId: number;
    replyId: number;
    content: string;
    createResponse() { return new CreatePostCommentResponse(); }
    getTypeName() { return "CreatePostComment"; }
}

// @Route("/posts/{PostId}/comments/{Id}", "PUT")
export class UpdatePostComment implements IReturn<UpdatePostCommentResponse>
{
    id: number;
    postId: number;
    content: string;
    createResponse() { return new UpdatePostCommentResponse(); }
    getTypeName() { return "UpdatePostComment"; }
}

// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
export class DeletePostComment implements IReturn<DeletePostCommentResponse>
{
    id: number;
    postId: number;
    createResponse() { return new DeletePostCommentResponse(); }
    getTypeName() { return "DeletePostComment"; }
}

// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
export class ActionPostCommentReport implements IReturnVoid
{
    id: number;
    postCommentId: number;
    postId: number;
    reportAction: ReportAction;
    createResponse() {}
    getTypeName() { return "ActionPostCommentReport"; }
}

// @Route("/user/comments/votes")
export class GetUserPostCommentVotes implements IReturn<GetUserPostCommentVotesResponse>
{
    postId: number;
    createResponse() { return new GetUserPostCommentVotesResponse(); }
    getTypeName() { return "GetUserPostCommentVotes"; }
}

// @Route("/posts/{PostId}/comments/{Id}/pin", "UPDATE")
export class PinPostComment implements IReturn<PinPostCommentResponse>
{
    id: number;
    postId: number;
    pin: boolean;
    createResponse() { return new PinPostCommentResponse(); }
    getTypeName() { return "PinPostComment"; }
}

// @Route("/users/by-email")
export class GetUsersByEmails implements IReturn<GetUsersByEmailsResponse>
{
    emails: string[];
    createResponse() { return new GetUsersByEmailsResponse(); }
    getTypeName() { return "GetUsersByEmails"; }
}

// @Route("/user/posts/activity")
export class GetUserPostActivity implements IReturn<GetUserPostActivityResponse>
{
    createResponse() { return new GetUserPostActivityResponse(); }
    getTypeName() { return "GetUserPostActivity"; }
}

// @Route("/user/organizations")
export class GetUserOrganizations implements IReturn<GetUserOrganizationsResponse>
{
    createResponse() { return new GetUserOrganizationsResponse(); }
    getTypeName() { return "GetUserOrganizations"; }
}

// @Route("/posts/{Id}/vote", "PUT")
export class UserPostVote implements IReturn<UserPostVoteResponse>
{
    id: number;
    weight: number;
    createResponse() { return new UserPostVoteResponse(); }
    getTypeName() { return "UserPostVote"; }
}

// @Route("/posts/{Id}/favorite", "PUT")
export class UserPostFavorite implements IReturn<UserPostFavoriteResponse>
{
    id: number;
    createResponse() { return new UserPostFavoriteResponse(); }
    getTypeName() { return "UserPostFavorite"; }
}

// @Route("/posts/{Id}/report", "PUT")
export class UserPostReport implements IReturn<UserPostReportResponse>
{
    id: number;
    flagType: FlagType;
    reportNotes: string;
    createResponse() { return new UserPostReportResponse(); }
    getTypeName() { return "UserPostReport"; }
}

// @Route("/posts/{PostId}/comments/{Id}", "GET")
export class UserPostCommentVote implements IReturn<UserPostCommentVoteResponse>
{
    id: number;
    postId: number;
    weight: number;
    createResponse() { return new UserPostCommentVoteResponse(); }
    getTypeName() { return "UserPostCommentVote"; }
}

// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
export class UserPostCommentReport implements IReturn<UserPostCommentReportResponse>
{
    id: number;
    postId: number;
    flagType: FlagType;
    reportNotes: string;
    createResponse() { return new UserPostCommentReportResponse(); }
    getTypeName() { return "UserPostCommentReport"; }
}

// @Route("/prerender/{Path*}", "PUT")
export class StorePreRender implements IReturnVoid
{
    path: string;
    createResponse() {}
    getTypeName() { return "StorePreRender"; }
}

// @Route("/prerender/{Path*}", "GET")
export class GetPreRender implements IReturn<string>
{
    path: string;
    createResponse() { return ""; }
    getTypeName() { return "GetPreRender"; }
}

// @Route("/my-session")
export class SessionInfo implements IReturn<SessionInfoResponse>
{
    createResponse() { return new SessionInfoResponse(); }
    getTypeName() { return "SessionInfo"; }
}

// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
export class SubscribeToOrganization implements IReturnVoid
{
    organizationId: number;
    postTypes: PostType[];
    frequency: Frequency;
    createResponse() {}
    getTypeName() { return "SubscribeToOrganization"; }
}

// @Route("/posts/{PostId}/subscribe", "PUT")
export class SubscribeToPost implements IReturnVoid
{
    postId: number;
    createResponse() {}
    getTypeName() { return "SubscribeToPost"; }
}

// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
export class DeleteOrganizationSubscription implements IReturnVoid
{
    organizationId: number;
    createResponse() {}
    getTypeName() { return "DeleteOrganizationSubscription"; }
}

// @Route("/posts/{PostId}/subscribe", "DELETE")
export class DeletePostSubscription implements IReturnVoid
{
    postId: number;
    createResponse() {}
    getTypeName() { return "DeletePostSubscription"; }
}

// @Route("/technology/{Slug}/previous-versions", "GET")
export class GetTechnologyPreviousVersions implements IReturn<GetTechnologyPreviousVersionsResponse>
{
    slug: string;
    createResponse() { return new GetTechnologyPreviousVersionsResponse(); }
    getTypeName() { return "GetTechnologyPreviousVersions"; }
}

// @Route("/technology", "GET")
export class GetAllTechnologies implements IReturn<GetAllTechnologiesResponse>
{
    createResponse() { return new GetAllTechnologiesResponse(); }
    getTypeName() { return "GetAllTechnologies"; }
}

// @Route("/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies")
export class FindTechnologies extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>, IMeta
{
    name: string;
    nameContains: string;
    createResponse() { return new QueryResponse<Technology>(); }
    getTypeName() { return "FindTechnologies"; }
}

// @Route("/technology/query")
export class QueryTechnology extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>, IMeta
{
    createResponse() { return new QueryResponse<Technology>(); }
    getTypeName() { return "QueryTechnology"; }
}

// @Route("/technology/{Slug}")
export class GetTechnology implements IReturn<GetTechnologyResponse>, IRegisterStats
{
    slug: string;
    createResponse() { return new GetTechnologyResponse(); }
    getTypeName() { return "GetTechnology"; }
}

// @Route("/technology/{Slug}/favorites")
export class GetTechnologyFavoriteDetails implements IReturn<GetTechnologyFavoriteDetailsResponse>
{
    slug: string;
    createResponse() { return new GetTechnologyFavoriteDetailsResponse(); }
    getTypeName() { return "GetTechnologyFavoriteDetails"; }
}

// @Route("/technology", "POST")
export class CreateTechnology implements IReturn<CreateTechnologyResponse>
{
    name: string;
    slug: string;
    vendorName: string;
    vendorUrl: string;
    productUrl: string;
    logoUrl: string;
    description: string;
    isLocked: boolean;
    tier: TechnologyTier;
    createResponse() { return new CreateTechnologyResponse(); }
    getTypeName() { return "CreateTechnology"; }
}

// @Route("/technology/{Id}", "PUT")
export class UpdateTechnology implements IReturn<UpdateTechnologyResponse>
{
    id: number;
    name: string;
    vendorName: string;
    vendorUrl: string;
    productUrl: string;
    logoUrl: string;
    description: string;
    isLocked: boolean;
    tier: TechnologyTier;
    createResponse() { return new UpdateTechnologyResponse(); }
    getTypeName() { return "UpdateTechnology"; }
}

// @Route("/technology/{Id}", "DELETE")
export class DeleteTechnology implements IReturn<DeleteTechnologyResponse>
{
    id: number;
    createResponse() { return new DeleteTechnologyResponse(); }
    getTypeName() { return "DeleteTechnology"; }
}

// @Route("/techstacks/{Slug}/previous-versions", "GET")
export class GetTechnologyStackPreviousVersions implements IReturn<GetTechnologyStackPreviousVersionsResponse>
{
    slug: string;
    createResponse() { return new GetTechnologyStackPreviousVersionsResponse(); }
    getTypeName() { return "GetTechnologyStackPreviousVersions"; }
}

// @Route("/pagestats/{Type}/{Slug}")
export class GetPageStats implements IReturn<GetPageStatsResponse>
{
    type: string;
    slug: string;
    id: number;
    createResponse() { return new GetPageStatsResponse(); }
    getTypeName() { return "GetPageStats"; }
}

// @Route("/cache/clear")
export class ClearCache implements IReturn<string>
{
    createResponse() { return ""; }
    getTypeName() { return "ClearCache"; }
}

// @Route("/tasks/hourly")
export class HourlyTask implements IReturn<HourlyTaskResponse>
{
    force: boolean;
    createResponse() { return new HourlyTaskResponse(); }
    getTypeName() { return "HourlyTask"; }
}

// @Route("/techstacks/search")
// @AutoQueryViewer(DefaultSearchField="Description", DefaultSearchText="ServiceStack", DefaultSearchType="Contains", Description="Explore different Technology Stacks", IconUrl="material-icons:cloud", Title="Find Technology Stacks")
export class FindTechStacks extends QueryDb<TechnologyStack> implements IReturn<QueryResponse<TechnologyStack>>, IMeta
{
    nameContains: string;
    createResponse() { return new QueryResponse<TechnologyStack>(); }
    getTypeName() { return "FindTechStacks"; }
}

// @Route("/techstacks/query")
export class QueryTechStacks extends QueryDb<TechnologyStack> implements IReturn<QueryResponse<TechnologyStack>>, IMeta
{
    createResponse() { return new QueryResponse<TechnologyStack>(); }
    getTypeName() { return "QueryTechStacks"; }
}

// @Route("/overview")
export class Overview implements IReturn<OverviewResponse>
{
    reload: boolean;
    createResponse() { return new OverviewResponse(); }
    getTypeName() { return "Overview"; }
}

// @Route("/app-overview")
export class AppOverview implements IReturn<AppOverviewResponse>
{
    reload: boolean;
    createResponse() { return new AppOverviewResponse(); }
    getTypeName() { return "AppOverview"; }
}

// @Route("/techstacks", "GET")
export class GetAllTechnologyStacks implements IReturn<GetAllTechnologyStacksResponse>
{
    createResponse() { return new GetAllTechnologyStacksResponse(); }
    getTypeName() { return "GetAllTechnologyStacks"; }
}

// @Route("/techstacks/{Slug}", "GET")
export class GetTechnologyStack implements IReturn<GetTechnologyStackResponse>, IRegisterStats
{
    slug: string;
    createResponse() { return new GetTechnologyStackResponse(); }
    getTypeName() { return "GetTechnologyStack"; }
}

// @Route("/techstacks/{Slug}/favorites")
export class GetTechnologyStackFavoriteDetails implements IReturn<GetTechnologyStackFavoriteDetailsResponse>
{
    slug: string;
    createResponse() { return new GetTechnologyStackFavoriteDetailsResponse(); }
    getTypeName() { return "GetTechnologyStackFavoriteDetails"; }
}

// @Route("/config")
export class GetConfig implements IReturn<GetConfigResponse>
{
    createResponse() { return new GetConfigResponse(); }
    getTypeName() { return "GetConfig"; }
}

// @Route("/techstacks", "POST")
export class CreateTechnologyStack implements IReturn<CreateTechnologyStackResponse>
{
    name: string;
    slug: string;
    vendorName: string;
    appUrl: string;
    screenshotUrl: string;
    description: string;
    details: string;
    isLocked: boolean;
    technologyIds: number[];
    createResponse() { return new CreateTechnologyStackResponse(); }
    getTypeName() { return "CreateTechnologyStack"; }
}

// @Route("/techstacks/{Id}", "PUT")
export class UpdateTechnologyStack implements IReturn<UpdateTechnologyStackResponse>
{
    id: number;
    name: string;
    vendorName: string;
    appUrl: string;
    screenshotUrl: string;
    description: string;
    details: string;
    isLocked: boolean;
    technologyIds: number[];
    createResponse() { return new UpdateTechnologyStackResponse(); }
    getTypeName() { return "UpdateTechnologyStack"; }
}

// @Route("/techstacks/{Id}", "DELETE")
export class DeleteTechnologyStack implements IReturn<DeleteTechnologyStackResponse>
{
    id: number;
    createResponse() { return new DeleteTechnologyStackResponse(); }
    getTypeName() { return "DeleteTechnologyStack"; }
}

// @Route("/favorites/techtacks", "GET")
export class GetFavoriteTechStack implements IReturn<GetFavoriteTechStackResponse>
{
    technologyStackId: number;
    createResponse() { return new GetFavoriteTechStackResponse(); }
    getTypeName() { return "GetFavoriteTechStack"; }
}

// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
export class AddFavoriteTechStack implements IReturn<FavoriteTechStackResponse>
{
    technologyStackId: number;
    createResponse() { return new FavoriteTechStackResponse(); }
    getTypeName() { return "AddFavoriteTechStack"; }
}

// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
export class RemoveFavoriteTechStack implements IReturn<FavoriteTechStackResponse>
{
    technologyStackId: number;
    createResponse() { return new FavoriteTechStackResponse(); }
    getTypeName() { return "RemoveFavoriteTechStack"; }
}

// @Route("/favorites/technology", "GET")
export class GetFavoriteTechnologies implements IReturn<GetFavoriteTechnologiesResponse>
{
    technologyId: number;
    createResponse() { return new GetFavoriteTechnologiesResponse(); }
    getTypeName() { return "GetFavoriteTechnologies"; }
}

// @Route("/favorites/technology/{TechnologyId}", "PUT")
export class AddFavoriteTechnology implements IReturn<FavoriteTechnologyResponse>
{
    technologyId: number;
    createResponse() { return new FavoriteTechnologyResponse(); }
    getTypeName() { return "AddFavoriteTechnology"; }
}

// @Route("/favorites/technology/{TechnologyId}", "DELETE")
export class RemoveFavoriteTechnology implements IReturn<FavoriteTechnologyResponse>
{
    technologyId: number;
    createResponse() { return new FavoriteTechnologyResponse(); }
    getTypeName() { return "RemoveFavoriteTechnology"; }
}

// @Route("/my-feed")
export class GetUserFeed implements IReturn<GetUserFeedResponse>
{
    createResponse() { return new GetUserFeedResponse(); }
    getTypeName() { return "GetUserFeed"; }
}

// @Route("/users/karma", "GET")
export class GetUsersKarma implements IReturn<GetUsersKarmaResponse>
{
    userIds: number[];
    createResponse() { return new GetUsersKarmaResponse(); }
    getTypeName() { return "GetUsersKarma"; }
}

// @Route("/userinfo/{UserName}")
export class GetUserInfo implements IReturn<GetUserInfoResponse>
{
    userName: string;
    createResponse() { return new GetUserInfoResponse(); }
    getTypeName() { return "GetUserInfo"; }
}

// @Route("/users/{UserName}/avatar", "GET")
export class UserAvatar
{
    userName: string;
}

// @Route("/sync/discourse/{Site}")
export class SyncDiscourseSite implements IReturn<SyncDiscourseSiteResponse>
{
    site: string;
    createResponse() { return new SyncDiscourseSiteResponse(); }
    getTypeName() { return "SyncDiscourseSite"; }
}

// @Route("/admin/technology/{TechnologyId}/logo")
export class LogoUrlApproval implements IReturn<LogoUrlApprovalResponse>
{
    technologyId: number;
    approved: boolean;
    createResponse() { return new LogoUrlApprovalResponse(); }
    getTypeName() { return "LogoUrlApproval"; }
}

// @Route("/admin/techstacks/{TechnologyStackId}/lock")
export class LockTechStack implements IReturn<LockStackResponse>
{
    technologyStackId: number;
    isLocked: boolean;
    createResponse() { return new LockStackResponse(); }
    getTypeName() { return "LockTechStack"; }
}

// @Route("/admin/technology/{TechnologyId}/lock")
export class LockTech implements IReturn<LockStackResponse>
{
    technologyId: number;
    isLocked: boolean;
    createResponse() { return new LockStackResponse(); }
    getTypeName() { return "LockTech"; }
}

export class ImportUser implements IReturn<ImportUserResponse>
{
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    company: string;
    refSource: string;
    refId: number;
    refIdStr: string;
    refUrn: string;
    defaultProfileUrl: string;
    meta: { [index:string]: string; };
    createResponse() { return new ImportUserResponse(); }
    getTypeName() { return "ImportUser"; }
}

// @Route("/import/uservoice/suggestion")
export class ImportUserVoiceSuggestion implements IReturn<ImportUserVoiceSuggestionResponse>
{
    organizationId: number;
    url: string;
    id: number;
    topicId: number;
    state: string;
    title: string;
    slug: string;
    category: string;
    text: string;
    formattedText: string;
    voteCount: number;
    closedAt: string;
    statusName: string;
    statusChangedBy: UserVoiceUser;
    creator: UserVoiceUser;
    response: UserVoiceComment;
    createdAt: string;
    updatedAt: string;
    createResponse() { return new ImportUserVoiceSuggestionResponse(); }
    getTypeName() { return "ImportUserVoiceSuggestion"; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost, IMeta
{
    // @DataMember(Order=1)
    provider: string;

    // @DataMember(Order=2)
    state: string;

    // @DataMember(Order=3)
    oauth_token: string;

    // @DataMember(Order=4)
    oauth_verifier: string;

    // @DataMember(Order=5)
    userName: string;

    // @DataMember(Order=6)
    password: string;

    // @DataMember(Order=7)
    rememberMe: boolean;

    // @DataMember(Order=8)
    continue: string;

    // @DataMember(Order=9)
    nonce: string;

    // @DataMember(Order=10)
    uri: string;

    // @DataMember(Order=11)
    response: string;

    // @DataMember(Order=12)
    qop: string;

    // @DataMember(Order=13)
    nc: string;

    // @DataMember(Order=14)
    cnonce: string;

    // @DataMember(Order=15)
    useTokenCookie: boolean;

    // @DataMember(Order=16)
    accessToken: string;

    // @DataMember(Order=17)
    accessTokenSecret: string;

    // @DataMember(Order=18)
    meta: { [index:string]: string; };
    createResponse() { return new AuthenticateResponse(); }
    getTypeName() { return "Authenticate"; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new AssignRolesResponse(); }
    getTypeName() { return "AssignRoles"; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new UnAssignRolesResponse(); }
    getTypeName() { return "UnAssignRoles"; }
}

// @Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>, IPost
{
    // @DataMember(Order=1)
    preserveSession: boolean;
    createResponse() { return new ConvertSessionToTokenResponse(); }
    getTypeName() { return "ConvertSessionToToken"; }
}

// @Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>, IPost
{
    // @DataMember(Order=1)
    refreshToken: string;
    createResponse() { return new GetAccessTokenResponse(); }
    getTypeName() { return "GetAccessToken"; }
}

// @Route("/posts/comment", "GET")
export class QueryPostComments extends QueryDb<PostComment> implements IReturn<QueryResponse<PostComment>>, IMeta
{
    userId: number;
    postId: number;
    createResponse() { return new QueryResponse<PostComment>(); }
    getTypeName() { return "QueryPostComments"; }
}

// @Route("/admin/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies Admin")
export class FindTechnologiesAdmin extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>, IMeta
{
    name: string;
    createResponse() { return new QueryResponse<Technology>(); }
    getTypeName() { return "FindTechnologiesAdmin"; }
}
