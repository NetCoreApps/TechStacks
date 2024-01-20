/* Options:
Date: 2024-01-20 13:42:21
Version: 8.01
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//GlobalNamespace: 
//MakePropertiesOptional: False
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
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId?: string;
}

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IGet
{
}

export interface IPost
{
}

export interface IPut
{
}

export interface IDelete
{
}

// @DataContract
export class QueryBase
{
    // @DataMember(Order=1)
    public skip?: number;

    // @DataMember(Order=2)
    public take?: number;

    // @DataMember(Order=3)
    public orderBy: string;

    // @DataMember(Order=4)
    public orderByDesc: string;

    // @DataMember(Order=5)
    public include: string;

    // @DataMember(Order=6)
    public fields: string;

    // @DataMember(Order=7)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<QueryBase>) { (Object as any).assign(this, init); }
}

export class QueryDb_1<T> extends QueryBase
{

    public constructor(init?: Partial<QueryDb_1<T>>) { super(init); (Object as any).assign(this, init); }
}

export enum PostType
{
    Announcement = 'Announcement',
    Post = 'Post',
    Showcase = 'Showcase',
    Question = 'Question',
    Request = 'Request',
}

export class Post
{
    public id: number;
    public organizationId: number;
    public userId: number;
    public type: PostType;
    public categoryId: number;
    public title: string;
    public slug: string;
    public url: string;
    public imageUrl: string;
    // @StringLength(2147483647)
    public content: string;

    // @StringLength(2147483647)
    public contentHtml: string;

    public pinCommentId?: number;
    public technologyIds: number[];
    public fromDate?: string;
    public toDate?: string;
    public location: string;
    public metaType: string;
    public meta: string;
    public approved: boolean;
    public upVotes: number;
    public downVotes: number;
    public points: number;
    public views: number;
    public favorites: number;
    public subscribers: number;
    public replyCount: number;
    public commentsCount: number;
    public wordCount: number;
    public reportCount: number;
    public linksCount: number;
    public linkedToCount: number;
    public score: number;
    public rank: number;
    public labels: string[];
    public refUserIds: number[];
    public refLinks: string[];
    public muteUserIds: number[];
    public lastCommentDate?: string;
    public lastCommentId?: number;
    public lastCommentUserId?: number;
    public deleted?: string;
    public deletedBy: string;
    public locked?: string;
    public lockedBy: string;
    public hidden?: string;
    public hiddenBy: string;
    public status: string;
    public statusDate?: string;
    public statusBy: string;
    public archived: boolean;
    public bumped?: string;
    public created: string;
    public createdBy: string;
    public modified: string;
    public modifiedBy: string;
    public refId?: number;
    public refSource: string;
    public refUrn: string;

    public constructor(init?: Partial<Post>) { (Object as any).assign(this, init); }
}

export enum ReportAction
{
    Dismiss = 'Dismiss',
    Delete = 'Delete',
}

export enum FlagType
{
    Violation = 'Violation',
    Spam = 'Spam',
    Abusive = 'Abusive',
    Confidential = 'Confidential',
    OffTopic = 'OffTopic',
    Other = 'Other',
}

export enum Frequency
{
    Daily = 1,
    Weekly = 7,
    Monthly = 30,
    Quarterly = 90,
}

export class QueryDb_2<From, Into> extends QueryBase
{

    public constructor(init?: Partial<QueryDb_2<From, Into>>) { super(init); (Object as any).assign(this, init); }
}

export enum TechnologyTier
{
    ProgrammingLanguage = 'ProgrammingLanguage',
    Client = 'Client',
    Http = 'Http',
    Server = 'Server',
    Data = 'Data',
    SoftwareInfrastructure = 'SoftwareInfrastructure',
    OperatingSystem = 'OperatingSystem',
    HardwareInfrastructure = 'HardwareInfrastructure',
    ThirdPartyServices = 'ThirdPartyServices',
}

export class TechnologyBase
{
    public id: number;
    public name: string;
    public vendorName: string;
    public vendorUrl: string;
    public productUrl: string;
    public logoUrl: string;
    public description: string;
    public created: string;
    public createdBy: string;
    public lastModified: string;
    public lastModifiedBy: string;
    public ownerId: string;
    public slug: string;
    public logoApproved: boolean;
    public isLocked: boolean;
    public tier: TechnologyTier;
    public lastStatusUpdate?: string;
    public organizationId?: number;
    public commentsPostId?: number;
    public viewCount: number;
    public favCount: number;

    public constructor(init?: Partial<TechnologyBase>) { (Object as any).assign(this, init); }
}

export class Technology extends TechnologyBase
{

    public constructor(init?: Partial<Technology>) { super(init); (Object as any).assign(this, init); }
}

export class TechnologyView
{
    public id?: number;
    public name: string;
    public vendorName: string;
    public vendorUrl: string;
    public productUrl: string;
    public logoUrl: string;
    public description: string;
    public created?: string;
    public createdBy: string;
    public lastModified?: string;
    public lastModifiedBy: string;
    public ownerId: string;
    public slug: string;
    public logoApproved?: boolean;
    public isLocked?: boolean;
    public tier?: TechnologyTier;
    public lastStatusUpdate?: string;
    public organizationId?: number;
    public commentsPostId?: number;
    public viewCount?: number;
    public favCount?: number;

    public constructor(init?: Partial<TechnologyView>) { (Object as any).assign(this, init); }
}

export interface IRegisterStats
{
}

export class TechnologyStackBase
{
    public id: number;
    public name: string;
    public vendorName: string;
    public description: string;
    public appUrl: string;
    public screenshotUrl: string;
    public created: string;
    public createdBy: string;
    public lastModified: string;
    public lastModifiedBy: string;
    public isLocked: boolean;
    public ownerId: string;
    public slug: string;
    // @StringLength(2147483647)
    public details: string;

    // @StringLength(2147483647)
    public detailsHtml: string;

    public lastStatusUpdate?: string;
    public organizationId?: number;
    public commentsPostId?: number;
    public viewCount: number;
    public favCount: number;

    public constructor(init?: Partial<TechnologyStackBase>) { (Object as any).assign(this, init); }
}

export class TechnologyStack extends TechnologyStackBase
{

    public constructor(init?: Partial<TechnologyStack>) { super(init); (Object as any).assign(this, init); }
}

export class TechnologyStackView
{
    public id?: number;
    public name: string;
    public vendorName: string;
    public description: string;
    public appUrl: string;
    public screenshotUrl: string;
    public created?: string;
    public createdBy: string;
    public lastModified?: string;
    public lastModifiedBy: string;
    public isLocked?: boolean;
    public ownerId: string;
    public slug: string;
    public details: string;
    public detailsHtml: string;
    public lastStatusUpdate?: string;
    public organizationId?: number;
    public commentsPostId?: number;
    public viewCount?: number;
    public favCount?: number;

    public constructor(init?: Partial<TechnologyStackView>) { (Object as any).assign(this, init); }
}

export class PostComment
{
    public id: number;
    public postId: number;
    public userId: number;
    public replyId?: number;
    // @StringLength(2147483647)
    public content: string;

    // @StringLength(2147483647)
    public contentHtml: string;

    public score: number;
    public rank: number;
    public upVotes: number;
    public downVotes: number;
    public favorites: number;
    public wordCount: number;
    public reportCount: number;
    public deleted?: string;
    public hidden?: string;
    public modified: string;
    public created: string;
    public createdBy: string;
    public refId?: number;
    public refSource: string;
    public refUrn: string;

    public constructor(init?: Partial<PostComment>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class Organization
{
    public id: number;
    public name: string;
    public slug: string;
    public description: string;
    public descriptionHtml: string;
    public color: string;
    public textColor: string;
    public linkColor: string;
    public backgroundColor: string;
    public backgroundUrl: string;
    public logoUrl: string;
    public heroUrl: string;
    public lang: string;
    public defaultPostType: string;
    public defaultSubscriptionPostTypes: string[];
    public postTypes: string[];
    public moderatorPostTypes: string[];
    public deletePostsWithReportCount: number;
    public disableInvites?: boolean;
    public upVotes: number;
    public downVotes: number;
    public views: number;
    public favorites: number;
    public subscribers: number;
    public commentsCount: number;
    public postsCount: number;
    public score: number;
    public rank: number;
    public refId?: number;
    public refSource: string;
    public hidden?: string;
    public hiddenBy: string;
    public locked?: string;
    public lockedBy: string;
    public deleted?: string;
    public deletedBy: string;
    public created: string;
    public createdBy: string;
    public modified: string;
    public modifiedBy: string;

    public constructor(init?: Partial<Organization>) { (Object as any).assign(this, init); }
}

export class OrganizationLabel
{
    public slug: string;
    public organizationId: number;
    public description: string;
    public color: string;

    public constructor(init?: Partial<OrganizationLabel>) { (Object as any).assign(this, init); }
}

export class Category
{
    public id: number;
    public organizationId: number;
    public name: string;
    public slug: string;
    public description: string;
    public color: string;
    public technologyIds: number[];
    public commentsCount: number;
    public postsCount: number;
    public score: number;
    public rank: number;

    public constructor(init?: Partial<Category>) { (Object as any).assign(this, init); }
}

export class OrganizationMember
{
    public id: number;
    public organizationId: number;
    public userId: number;
    public userName: string;
    public isOwner: boolean;
    public isModerator: boolean;
    public denyAll: boolean;
    public denyPosts: boolean;
    public denyComments: boolean;
    public notes: string;

    public constructor(init?: Partial<OrganizationMember>) { (Object as any).assign(this, init); }
}

export class OrganizationMemberInvite
{
    public id: number;
    public organizationId: number;
    public userId: number;
    public userName: string;
    public dismissed?: string;

    public constructor(init?: Partial<OrganizationMemberInvite>) { (Object as any).assign(this, init); }
}

export class PostReportInfo
{
    public id: number;
    public organizationId: number;
    public postId: number;
    public userId: number;
    public userName: string;
    public flagType: FlagType;
    public reportNotes: string;
    public created: string;
    public acknowledged?: string;
    public acknowledgedBy: string;
    public dismissed?: string;
    public dismissedBy: string;
    public title: string;
    public reportCount: number;
    public createdBy: string;

    public constructor(init?: Partial<PostReportInfo>) { (Object as any).assign(this, init); }
}

export class PostCommentReportInfo
{
    public id: number;
    public organizationId: number;
    public postId: number;
    public postCommentId: number;
    public userId: number;
    public userName: string;
    public flagType: FlagType;
    public reportNotes: string;
    public created: string;
    public acknowledged?: string;
    public acknowledgedBy: string;
    public dismissed?: string;
    public dismissedBy: string;
    public contentHtml: string;
    public reportCount: number;
    public createdBy: string;

    public constructor(init?: Partial<PostCommentReportInfo>) { (Object as any).assign(this, init); }
}

export class UserRef
{
    public id: number;
    public userName: string;
    public email: string;
    public refId?: number;
    public refSource: string;
    public refUrn: string;

    public constructor(init?: Partial<UserRef>) { (Object as any).assign(this, init); }
}

export class OrganizationSubscription
{
    public id: number;
    public organizationId: number;
    public userId: number;
    public userName: string;
    public postTypes: string[];
    public frequencyDays?: number;
    public lastSyncedId?: number;
    public lastSynced?: string;
    public created: string;

    public constructor(init?: Partial<OrganizationSubscription>) { (Object as any).assign(this, init); }
}

export class UserActivity
{
    public id: number;
    public userName: string;
    public karma: number;
    public technologyCount: number;
    public techStacksCount: number;
    public postsCount: number;
    public postUpVotes: number;
    public postDownVotes: number;
    public commentUpVotes: number;
    public commentDownVotes: number;
    public postCommentsCount: number;
    public pinnedCommentCount: number;
    public postReportCount: number;
    public postCommentReportCount: number;
    public created: string;
    public modified: string;

    public constructor(init?: Partial<UserActivity>) { (Object as any).assign(this, init); }
}

export class TechnologyHistory extends TechnologyBase
{
    public technologyId: number;
    public operation: string;

    public constructor(init?: Partial<TechnologyHistory>) { super(init); (Object as any).assign(this, init); }
}

export class TechnologyStackHistory extends TechnologyStackBase
{
    public technologyStackId: number;
    public operation: string;
    public technologyIds: number[];

    public constructor(init?: Partial<TechnologyStackHistory>) { super(init); (Object as any).assign(this, init); }
}

export class UserInfo
{
    public userName: string;
    public avatarUrl: string;
    public stacksCount: number;

    public constructor(init?: Partial<UserInfo>) { (Object as any).assign(this, init); }
}

export class TechnologyInfo
{
    public tier: TechnologyTier;
    public slug: string;
    public name: string;
    public logoUrl: string;
    public stacksCount: number;

    public constructor(init?: Partial<TechnologyInfo>) { (Object as any).assign(this, init); }
}

export class TechnologyInStack extends TechnologyBase
{
    public technologyId: number;
    public technologyStackId: number;
    public justification: string;

    public constructor(init?: Partial<TechnologyInStack>) { super(init); (Object as any).assign(this, init); }
}

export class TechStackDetails extends TechnologyStackBase
{
    public technologyChoices: TechnologyInStack[];

    public constructor(init?: Partial<TechStackDetails>) { super(init); (Object as any).assign(this, init); }
}

export class LabelInfo
{
    public slug: string;
    public color: string;

    public constructor(init?: Partial<LabelInfo>) { (Object as any).assign(this, init); }
}

export class CategoryInfo
{
    public id: number;
    public name: string;
    public slug: string;

    public constructor(init?: Partial<CategoryInfo>) { (Object as any).assign(this, init); }
}

export class OrganizationInfo
{
    public id: number;
    public name: string;
    public slug: string;
    public refId?: number;
    public refSource: string;
    public upVotes?: number;
    public downVotes?: number;
    public membersCount: number;
    public rank: number;
    public disableInvites?: boolean;
    public lang: string;
    public postTypes: string[];
    public moderatorPostTypes: string[];
    public locked?: string;
    public labels: LabelInfo[];
    public categories: CategoryInfo[];

    public constructor(init?: Partial<OrganizationInfo>) { (Object as any).assign(this, init); }
}

// @DataContract
export class Option
{
    // @DataMember(Name="name")
    public name: string;

    // @DataMember(Name="title")
    public title: string;

    // @DataMember(Name="value")
    public value?: TechnologyTier;

    public constructor(init?: Partial<Option>) { (Object as any).assign(this, init); }
}

export class HelloResponse
{
    public result: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<HelloResponse>) { (Object as any).assign(this, init); }
}

export class GetOrganizationResponse
{
    public cache: number;
    public id: number;
    public slug: string;
    public organization: Organization;
    public labels: OrganizationLabel[];
    public categories: Category[];
    public owners: OrganizationMember[];
    public moderators: OrganizationMember[];
    public membersCount: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetOrganizationResponse>) { (Object as any).assign(this, init); }
}

export class GetOrganizationMembersResponse
{
    public organizationId: number;
    public results: OrganizationMember[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetOrganizationMembersResponse>) { (Object as any).assign(this, init); }
}

export class GetOrganizationAdminResponse
{
    public labels: OrganizationLabel[];
    public members: OrganizationMember[];
    public memberInvites: OrganizationMemberInvite[];
    public reportedPosts: PostReportInfo[];
    public reportedPostComments: PostCommentReportInfo[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetOrganizationAdminResponse>) { (Object as any).assign(this, init); }
}

export class CreateOrganizationForTechnologyResponse
{
    public organizationId: number;
    public organizationSlug: string;
    public commentsPostId: number;
    public commentsPostSlug: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateOrganizationForTechnologyResponse>) { (Object as any).assign(this, init); }
}

export class CreateOrganizationResponse
{
    public id: number;
    public slug: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateOrganizationResponse>) { (Object as any).assign(this, init); }
}

export class UpdateOrganizationResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateOrganizationResponse>) { (Object as any).assign(this, init); }
}

export class OrganizationLabelResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<OrganizationLabelResponse>) { (Object as any).assign(this, init); }
}

export class AddOrganizationCategoryResponse
{
    public id: number;
    public slug: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AddOrganizationCategoryResponse>) { (Object as any).assign(this, init); }
}

export class UpdateOrganizationCategoryResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateOrganizationCategoryResponse>) { (Object as any).assign(this, init); }
}

export class AddOrganizationMemberResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AddOrganizationMemberResponse>) { (Object as any).assign(this, init); }
}

export class UpdateOrganizationMemberResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateOrganizationMemberResponse>) { (Object as any).assign(this, init); }
}

export class SetOrganizationMembersResponse
{
    public userIdsAdded: number[];
    public userIdsRemoved: number[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<SetOrganizationMembersResponse>) { (Object as any).assign(this, init); }
}

export class GetOrganizationMemberInvitesResponse
{
    public results: OrganizationMemberInvite[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetOrganizationMemberInvitesResponse>) { (Object as any).assign(this, init); }
}

export class RequestOrganizationMemberInviteResponse
{
    public organizationId: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<RequestOrganizationMemberInviteResponse>) { (Object as any).assign(this, init); }
}

export class UpdateOrganizationMemberInviteResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateOrganizationMemberInviteResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryResponse<Post>
{
    // @DataMember(Order=1)
    public offset: number;

    // @DataMember(Order=2)
    public total: number;

    // @DataMember(Order=3)
    public results: Post[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    // @DataMember(Order=5)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<QueryResponse<Post>>) { (Object as any).assign(this, init); }
}

export class GetPostResponse
{
    public cache: number;
    public post: Post;
    public comments: PostComment[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetPostResponse>) { (Object as any).assign(this, init); }
}

export class CreatePostResponse
{
    public id: number;
    public slug: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreatePostResponse>) { (Object as any).assign(this, init); }
}

export class UpdatePostResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdatePostResponse>) { (Object as any).assign(this, init); }
}

export class DeletePostResponse
{
    public id: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeletePostResponse>) { (Object as any).assign(this, init); }
}

export class CreatePostCommentResponse
{
    public id: number;
    public postId: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreatePostCommentResponse>) { (Object as any).assign(this, init); }
}

export class UpdatePostCommentResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdatePostCommentResponse>) { (Object as any).assign(this, init); }
}

export class DeletePostCommentResponse
{
    public id: number;
    public postId: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeletePostCommentResponse>) { (Object as any).assign(this, init); }
}

export class GetUserPostCommentVotesResponse
{
    public postId: number;
    public upVotedCommentIds: number[];
    public downVotedCommentIds: number[];

    public constructor(init?: Partial<GetUserPostCommentVotesResponse>) { (Object as any).assign(this, init); }
}

export class PinPostCommentResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<PinPostCommentResponse>) { (Object as any).assign(this, init); }
}

export class GetUsersByEmailsResponse
{
    public results: UserRef[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUsersByEmailsResponse>) { (Object as any).assign(this, init); }
}

export class GetUserPostActivityResponse
{
    public upVotedPostIds: number[];
    public downVotedPostIds: number[];
    public favoritePostIds: number[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUserPostActivityResponse>) { (Object as any).assign(this, init); }
}

export class GetUserOrganizationsResponse
{
    public members: OrganizationMember[];
    public memberInvites: OrganizationMemberInvite[];
    public subscriptions: OrganizationSubscription[];

    public constructor(init?: Partial<GetUserOrganizationsResponse>) { (Object as any).assign(this, init); }
}

export class UserPostVoteResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UserPostVoteResponse>) { (Object as any).assign(this, init); }
}

export class UserPostFavoriteResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UserPostFavoriteResponse>) { (Object as any).assign(this, init); }
}

export class UserPostReportResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UserPostReportResponse>) { (Object as any).assign(this, init); }
}

export class UserPostCommentVoteResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UserPostCommentVoteResponse>) { (Object as any).assign(this, init); }
}

export class UserPostCommentReportResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UserPostCommentReportResponse>) { (Object as any).assign(this, init); }
}

export class SessionInfoResponse
{
    public created: string;
    public id: string;
    public referrerUrl: string;
    public userAuthId: string;
    public userAuthName: string;
    public userName: string;
    public displayName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public createdAt: string;
    public lastModified: string;
    public roles: string[];
    public permissions: string[];
    public isAuthenticated: boolean;
    public authProvider: string;
    public profileUrl: string;
    public githubProfileUrl: string;
    public twitterProfileUrl: string;
    public accessToken: string;
    public avatarUrl: string;
    public techStacks: TechnologyStack[];
    public favoriteTechStacks: TechnologyStack[];
    public favoriteTechnologies: Technology[];
    public userActivity: UserActivity;
    public members: OrganizationMember[];
    public memberInvites: OrganizationMemberInvite[];
    public subscriptions: OrganizationSubscription[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<SessionInfoResponse>) { (Object as any).assign(this, init); }
}

export class GetTechnologyPreviousVersionsResponse
{
    public results: TechnologyHistory[];

    public constructor(init?: Partial<GetTechnologyPreviousVersionsResponse>) { (Object as any).assign(this, init); }
}

export class GetAllTechnologiesResponse
{
    public results: Technology[];
    public total: number;

    public constructor(init?: Partial<GetAllTechnologiesResponse>) { (Object as any).assign(this, init); }
}

export class GetTechnologyResponse
{
    public created: string;
    public technology: Technology;
    public technologyStacks: TechnologyStack[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetTechnologyResponse>) { (Object as any).assign(this, init); }
}

export class GetTechnologyFavoriteDetailsResponse
{
    public users: string[];
    public favoriteCount: number;

    public constructor(init?: Partial<GetTechnologyFavoriteDetailsResponse>) { (Object as any).assign(this, init); }
}

export class CreateTechnologyResponse
{
    public result: Technology;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateTechnologyResponse>) { (Object as any).assign(this, init); }
}

export class UpdateTechnologyResponse
{
    public result: Technology;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateTechnologyResponse>) { (Object as any).assign(this, init); }
}

export class DeleteTechnologyResponse
{
    public result: Technology;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeleteTechnologyResponse>) { (Object as any).assign(this, init); }
}

export class GetTechnologyStackPreviousVersionsResponse
{
    public results: TechnologyStackHistory[];

    public constructor(init?: Partial<GetTechnologyStackPreviousVersionsResponse>) { (Object as any).assign(this, init); }
}

export class GetPageStatsResponse
{
    public type: string;
    public slug: string;
    public viewCount: number;
    public favCount: number;

    public constructor(init?: Partial<GetPageStatsResponse>) { (Object as any).assign(this, init); }
}

export class HourlyTaskResponse
{
    public meta: { [index: string]: string; };
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<HourlyTaskResponse>) { (Object as any).assign(this, init); }
}

export class OverviewResponse
{
    public created: string;
    public topUsers: UserInfo[];
    public topTechnologies: TechnologyInfo[];
    public latestTechStacks: TechStackDetails[];
    public popularTechStacks: TechnologyStack[];
    public allOrganizations: OrganizationInfo[];
    public topTechnologiesByTier: { [index: string]: TechnologyInfo[]; };
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<OverviewResponse>) { (Object as any).assign(this, init); }
}

export class AppOverviewResponse
{
    public created: string;
    public allTiers: Option[];
    public topTechnologies: TechnologyInfo[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AppOverviewResponse>) { (Object as any).assign(this, init); }
}

export class GetAllTechnologyStacksResponse
{
    public results: TechnologyStack[];
    public total: number;

    public constructor(init?: Partial<GetAllTechnologyStacksResponse>) { (Object as any).assign(this, init); }
}

export class GetTechnologyStackResponse
{
    public created: string;
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetTechnologyStackResponse>) { (Object as any).assign(this, init); }
}

export class GetTechnologyStackFavoriteDetailsResponse
{
    public users: string[];
    public favoriteCount: number;

    public constructor(init?: Partial<GetTechnologyStackFavoriteDetailsResponse>) { (Object as any).assign(this, init); }
}

export class GetConfigResponse
{
    public allTiers: Option[];
    public allPostTypes: Option[];
    public allFlagTypes: Option[];

    public constructor(init?: Partial<GetConfigResponse>) { (Object as any).assign(this, init); }
}

export class CreateTechnologyStackResponse
{
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateTechnologyStackResponse>) { (Object as any).assign(this, init); }
}

export class UpdateTechnologyStackResponse
{
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateTechnologyStackResponse>) { (Object as any).assign(this, init); }
}

export class DeleteTechnologyStackResponse
{
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeleteTechnologyStackResponse>) { (Object as any).assign(this, init); }
}

export class GetFavoriteTechStackResponse
{
    public results: TechnologyStack[];

    public constructor(init?: Partial<GetFavoriteTechStackResponse>) { (Object as any).assign(this, init); }
}

export class FavoriteTechStackResponse
{
    public result: TechnologyStack;

    public constructor(init?: Partial<FavoriteTechStackResponse>) { (Object as any).assign(this, init); }
}

export class GetFavoriteTechnologiesResponse
{
    public results: Technology[];

    public constructor(init?: Partial<GetFavoriteTechnologiesResponse>) { (Object as any).assign(this, init); }
}

export class FavoriteTechnologyResponse
{
    public result: Technology;

    public constructor(init?: Partial<FavoriteTechnologyResponse>) { (Object as any).assign(this, init); }
}

export class GetUserFeedResponse
{
    public results: TechStackDetails[];

    public constructor(init?: Partial<GetUserFeedResponse>) { (Object as any).assign(this, init); }
}

export class GetUsersKarmaResponse
{
    public results: { [index: number]: number; };
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUsersKarmaResponse>) { (Object as any).assign(this, init); }
}

export class GetUserInfoResponse
{
    public id: number;
    public userName: string;
    public created: string;
    public avatarUrl: string;
    public techStacks: TechnologyStack[];
    public favoriteTechStacks: TechnologyStack[];
    public favoriteTechnologies: Technology[];
    public userActivity: UserActivity;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUserInfoResponse>) { (Object as any).assign(this, init); }
}

export class LogoUrlApprovalResponse
{
    public result: Technology;

    public constructor(init?: Partial<LogoUrlApprovalResponse>) { (Object as any).assign(this, init); }
}

export class LockStackResponse
{

    public constructor(init?: Partial<LockStackResponse>) { (Object as any).assign(this, init); }
}

export class EmailTestResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<EmailTestResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=9)
    public profileUrl: string;

    // @DataMember(Order=10)
    public roles: string[];

    // @DataMember(Order=11)
    public permissions: string[];

    // @DataMember(Order=12)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=13)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @Route("/ping")
export class Ping
{

    public constructor(init?: Partial<Ping>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Ping'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/hello")
// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>
{
    public name: string;

    public constructor(init?: Partial<Hello>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Hello'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new HelloResponse(); }
}

// @Route("/orgs/{Id}", "GET")
export class GetOrganization implements IReturn<GetOrganizationResponse>, IGet
{
    public id?: number;

    public constructor(init?: Partial<GetOrganization>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetOrganization'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetOrganizationResponse(); }
}

// @Route("/organizations/{Slug}", "GET")
export class GetOrganizationBySlug implements IReturn<GetOrganizationResponse>, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetOrganizationBySlug>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetOrganizationBySlug'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetOrganizationResponse(); }
}

// @Route("/orgs/{Id}/members", "GET")
export class GetOrganizationMembers implements IReturn<GetOrganizationMembersResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetOrganizationMembers>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetOrganizationMembers'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetOrganizationMembersResponse(); }
}

// @Route("/orgs/{Id}/admin", "GET")
export class GetOrganizationAdmin implements IReturn<GetOrganizationAdminResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetOrganizationAdmin>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetOrganizationAdmin'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetOrganizationAdminResponse(); }
}

// @Route("/orgs/posts/new", "POST")
export class CreateOrganizationForTechnology implements IReturn<CreateOrganizationForTechnologyResponse>, IPost
{
    public technologyId?: number;
    public techStackId?: number;

    public constructor(init?: Partial<CreateOrganizationForTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateOrganizationForTechnology'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateOrganizationForTechnologyResponse(); }
}

// @Route("/orgs", "POST")
export class CreateOrganization implements IReturn<CreateOrganizationResponse>, IPost
{
    public name: string;
    public slug: string;
    public description: string;
    public refId?: number;
    public refSource: string;
    public refUrn: string;

    public constructor(init?: Partial<CreateOrganization>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateOrganization'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateOrganizationResponse(); }
}

// @Route("/orgs/{Id}", "PUT")
export class UpdateOrganization implements IReturn<UpdateOrganizationResponse>, IPut
{
    public id: number;
    public slug: string;
    public name: string;
    public description: string;
    public color: string;
    public textColor: string;
    public linkColor: string;
    public backgroundColor: string;
    public backgroundUrl: string;
    public logoUrl: string;
    public heroUrl: string;
    public lang: string;
    public deletePostsWithReportCount: number;
    public disableInvites?: boolean;
    public defaultPostType: string;
    public defaultSubscriptionPostTypes: string[];
    public postTypes: string[];
    public moderatorPostTypes: string[];
    public technologyIds: number[];

    public constructor(init?: Partial<UpdateOrganization>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateOrganization'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateOrganizationResponse(); }
}

// @Route("/orgs/{Id}", "DELETE")
export class DeleteOrganization implements IReturnVoid, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteOrganization>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteOrganization'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/orgs/{Id}/lock", "PUT")
export class LockOrganization implements IReturnVoid, IPut
{
    public id: number;
    public lock: boolean;
    public reason: string;

    public constructor(init?: Partial<LockOrganization>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LockOrganization'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/orgs/{OrganizationId}/labels", "POST")
export class AddOrganizationLabel implements IReturn<OrganizationLabelResponse>, IPost
{
    public organizationId: number;
    public slug: string;
    public description: string;
    public color: string;

    public constructor(init?: Partial<AddOrganizationLabel>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddOrganizationLabel'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new OrganizationLabelResponse(); }
}

// @Route("/orgs/{OrganizationId}/members/{Slug}", "PUT")
export class UpdateOrganizationLabel implements IReturn<OrganizationLabelResponse>, IPut
{
    public organizationId: number;
    public slug: string;
    public description: string;
    public color: string;

    public constructor(init?: Partial<UpdateOrganizationLabel>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateOrganizationLabel'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new OrganizationLabelResponse(); }
}

// @Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE")
export class RemoveOrganizationLabel implements IReturnVoid, IDelete
{
    public organizationId: number;
    public slug: string;

    public constructor(init?: Partial<RemoveOrganizationLabel>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RemoveOrganizationLabel'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/orgs/{OrganizationId}/categories", "POST")
export class AddOrganizationCategory implements IReturn<AddOrganizationCategoryResponse>, IPost
{
    public organizationId: number;
    public slug: string;
    public name: string;
    public description: string;
    public technologyIds: number[];

    public constructor(init?: Partial<AddOrganizationCategory>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddOrganizationCategory'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AddOrganizationCategoryResponse(); }
}

// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
export class UpdateOrganizationCategory implements IReturn<UpdateOrganizationCategoryResponse>, IPut
{
    public organizationId: number;
    public id: number;
    public name: string;
    public slug: string;
    public description: string;
    public technologyIds: number[];

    public constructor(init?: Partial<UpdateOrganizationCategory>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateOrganizationCategory'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateOrganizationCategoryResponse(); }
}

// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
export class DeleteOrganizationCategory implements IReturnVoid, IDelete
{
    public organizationId: number;
    public id: number;

    public constructor(init?: Partial<DeleteOrganizationCategory>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteOrganizationCategory'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/orgs/{OrganizationId}/members", "POST")
export class AddOrganizationMember implements IReturn<AddOrganizationMemberResponse>, IPost
{
    public organizationId: number;
    public userName: string;
    public isOwner: boolean;
    public isModerator: boolean;
    public denyPosts: boolean;
    public denyComments: boolean;
    public denyAll: boolean;
    public notes: string;

    public constructor(init?: Partial<AddOrganizationMember>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddOrganizationMember'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AddOrganizationMemberResponse(); }
}

// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
export class UpdateOrganizationMember implements IReturn<UpdateOrganizationMemberResponse>, IPut
{
    public organizationId: number;
    public userId: number;
    public isOwner: boolean;
    public isModerator: boolean;
    public denyPosts: boolean;
    public denyComments: boolean;
    public denyAll: boolean;
    public notes: string;

    public constructor(init?: Partial<UpdateOrganizationMember>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateOrganizationMember'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateOrganizationMemberResponse(); }
}

// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
export class RemoveOrganizationMember implements IReturnVoid, IDelete
{
    public organizationId: number;
    public userId: number;

    public constructor(init?: Partial<RemoveOrganizationMember>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RemoveOrganizationMember'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/orgs/{OrganizationId}/members/set", "POST")
export class SetOrganizationMembers implements IReturn<SetOrganizationMembersResponse>, IPost
{
    public organizationId: number;
    public githubUserNames: string[];
    public twitterUserNames: string[];
    public emails: string[];
    public removeUnspecifiedMembers: boolean;
    public isOwner: boolean;
    public isModerator: boolean;
    public denyPosts: boolean;
    public denyComments: boolean;
    public denyAll: boolean;

    public constructor(init?: Partial<SetOrganizationMembers>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SetOrganizationMembers'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new SetOrganizationMembersResponse(); }
}

// @Route("/orgs/{OrganizationId}/invites", "GET")
export class GetOrganizationMemberInvites implements IReturn<GetOrganizationMemberInvitesResponse>, IGet
{
    public organizationId: number;

    public constructor(init?: Partial<GetOrganizationMemberInvites>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetOrganizationMemberInvites'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetOrganizationMemberInvitesResponse(); }
}

// @Route("/orgs/{OrganizationId}/invites", "POST")
export class RequestOrganizationMemberInvite implements IReturn<RequestOrganizationMemberInviteResponse>, IPost
{
    public organizationId: number;

    public constructor(init?: Partial<RequestOrganizationMemberInvite>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RequestOrganizationMemberInvite'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new RequestOrganizationMemberInviteResponse(); }
}

// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
export class UpdateOrganizationMemberInvite implements IReturn<UpdateOrganizationMemberInviteResponse>, IPut
{
    public organizationId: number;
    public userName: string;
    public approve: boolean;
    public dismiss: boolean;

    public constructor(init?: Partial<UpdateOrganizationMemberInvite>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateOrganizationMemberInvite'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateOrganizationMemberInviteResponse(); }
}

// @Route("/posts", "GET")
export class QueryPosts extends QueryDb_1<Post> implements IReturn<QueryResponse<Post>>, IGet
{
    public ids: number[];
    public organizationId?: number;
    public organizationIds: number[];
    public types: string[];
    public anyTechnologyIds: number[];
    public is: string[];

    public constructor(init?: Partial<QueryPosts>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryPosts'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Post>(); }
}

// @Route("/posts/{Id}", "GET")
export class GetPost implements IReturn<GetPostResponse>, IGet
{
    public id: number;
    public include: string;

    public constructor(init?: Partial<GetPost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetPost'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetPostResponse(); }
}

// @Route("/posts", "POST")
export class CreatePost implements IReturn<CreatePostResponse>, IPost
{
    public organizationId: number;
    public type: PostType;
    public categoryId: number;
    public title: string;
    public url: string;
    public imageUrl: string;
    public content: string;
    public lock?: boolean;
    public technologyIds: number[];
    public labels: string[];
    public fromDate?: string;
    public toDate?: string;
    public metaType: string;
    public meta: string;
    public refId?: number;
    public refSource: string;
    public refUrn: string;

    public constructor(init?: Partial<CreatePost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreatePost'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreatePostResponse(); }
}

// @Route("/posts/{Id}", "PUT")
export class UpdatePost implements IReturn<UpdatePostResponse>, IPut
{
    public id: number;
    public organizationId: number;
    public type: PostType;
    public categoryId: number;
    public title: string;
    public url: string;
    public imageUrl: string;
    public content: string;
    public lock?: boolean;
    public technologyIds: number[];
    public labels: string[];
    public fromDate?: string;
    public toDate?: string;
    public metaType: string;
    public meta: string;

    public constructor(init?: Partial<UpdatePost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdatePost'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdatePostResponse(); }
}

// @Route("/posts/{Id}", "DELETE")
export class DeletePost implements IReturn<DeletePostResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeletePost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeletePost'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeletePostResponse(); }
}

// @Route("/posts/{Id}/lock", "PUT")
export class LockPost implements IReturnVoid, IPut
{
    public id: number;
    public lock: boolean;
    public reason: string;

    public constructor(init?: Partial<LockPost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LockPost'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/posts/{Id}/hide", "PUT")
export class HidePost implements IReturnVoid, IPut
{
    public id: number;
    public hide: boolean;
    public reason: string;

    public constructor(init?: Partial<HidePost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'HidePost'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/posts/{Id}/status/{Status}", "PUT")
export class ChangeStatusPost implements IReturnVoid, IPut
{
    public id: number;
    public status: string;
    public reason: string;

    public constructor(init?: Partial<ChangeStatusPost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ChangeStatusPost'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/posts/{PostId}/report/{Id}", "POST")
export class ActionPostReport implements IReturnVoid, IPost
{
    public postId: number;
    public id: number;
    public reportAction: ReportAction;

    public constructor(init?: Partial<ActionPostReport>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ActionPostReport'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/posts/{PostId}/comments", "POST")
export class CreatePostComment implements IReturn<CreatePostCommentResponse>, IPost
{
    public postId: number;
    public replyId?: number;
    public content: string;

    public constructor(init?: Partial<CreatePostComment>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreatePostComment'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreatePostCommentResponse(); }
}

// @Route("/posts/{PostId}/comments/{Id}", "PUT")
export class UpdatePostComment implements IReturn<UpdatePostCommentResponse>, IPut
{
    public id: number;
    public postId: number;
    public content: string;

    public constructor(init?: Partial<UpdatePostComment>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdatePostComment'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdatePostCommentResponse(); }
}

// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
export class DeletePostComment implements IReturn<DeletePostCommentResponse>, IDelete
{
    public id: number;
    public postId: number;

    public constructor(init?: Partial<DeletePostComment>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeletePostComment'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeletePostCommentResponse(); }
}

// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
export class ActionPostCommentReport implements IReturnVoid, IPost
{
    public id: number;
    public postCommentId: number;
    public postId: number;
    public reportAction: ReportAction;

    public constructor(init?: Partial<ActionPostCommentReport>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ActionPostCommentReport'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/user/comments/votes")
export class GetUserPostCommentVotes implements IReturn<GetUserPostCommentVotesResponse>, IGet
{
    public postId: number;

    public constructor(init?: Partial<GetUserPostCommentVotes>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserPostCommentVotes'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserPostCommentVotesResponse(); }
}

// @Route("/posts/{PostId}/comments/{Id}/pin", "PUT")
export class PinPostComment implements IReturn<PinPostCommentResponse>, IPut
{
    public id: number;
    public postId: number;
    public pin: boolean;

    public constructor(init?: Partial<PinPostComment>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PinPostComment'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new PinPostCommentResponse(); }
}

// @Route("/users/by-email")
export class GetUsersByEmails implements IReturn<GetUsersByEmailsResponse>, IGet
{
    public emails: string[];

    public constructor(init?: Partial<GetUsersByEmails>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUsersByEmails'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUsersByEmailsResponse(); }
}

// @Route("/user/posts/activity")
export class GetUserPostActivity implements IReturn<GetUserPostActivityResponse>, IGet
{

    public constructor(init?: Partial<GetUserPostActivity>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserPostActivity'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserPostActivityResponse(); }
}

// @Route("/user/organizations")
export class GetUserOrganizations implements IReturn<GetUserOrganizationsResponse>, IGet
{

    public constructor(init?: Partial<GetUserOrganizations>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserOrganizations'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserOrganizationsResponse(); }
}

// @Route("/posts/{Id}/vote", "PUT")
export class UserPostVote implements IReturn<UserPostVoteResponse>, IPut
{
    public id: number;
    public weight: number;

    public constructor(init?: Partial<UserPostVote>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserPostVote'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UserPostVoteResponse(); }
}

// @Route("/posts/{Id}/favorite", "PUT")
export class UserPostFavorite implements IReturn<UserPostFavoriteResponse>, IPut
{
    public id: number;

    public constructor(init?: Partial<UserPostFavorite>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserPostFavorite'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UserPostFavoriteResponse(); }
}

// @Route("/posts/{Id}/report", "PUT")
export class UserPostReport implements IReturn<UserPostReportResponse>, IPut
{
    public id: number;
    public flagType: FlagType;
    public reportNotes: string;

    public constructor(init?: Partial<UserPostReport>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserPostReport'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UserPostReportResponse(); }
}

// @Route("/posts/{PostId}/comments/{Id}", "GET")
export class UserPostCommentVote implements IReturn<UserPostCommentVoteResponse>, IGet
{
    public id: number;
    public postId: number;
    public weight: number;

    public constructor(init?: Partial<UserPostCommentVote>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserPostCommentVote'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new UserPostCommentVoteResponse(); }
}

// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
export class UserPostCommentReport implements IReturn<UserPostCommentReportResponse>, IPut
{
    public id: number;
    public postId: number;
    public flagType: FlagType;
    public reportNotes: string;

    public constructor(init?: Partial<UserPostCommentReport>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserPostCommentReport'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UserPostCommentReportResponse(); }
}

// @Route("/prerender/{Path*}", "PUT")
export class StorePreRender implements IReturnVoid, IPut
{
    public path: string;
    public requestStream: string;

    public constructor(init?: Partial<StorePreRender>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'StorePreRender'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/prerender/{Path*}", "GET")
export class GetPreRender implements IReturn<string>, IGet
{
    public path: string;

    public constructor(init?: Partial<GetPreRender>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetPreRender'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @Route("/my-session")
// @ValidateRequest(Validator="IsAuthenticated")
export class SessionInfo implements IReturn<SessionInfoResponse>, IGet
{

    public constructor(init?: Partial<SessionInfo>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SessionInfo'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new SessionInfoResponse(); }
}

// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
export class SubscribeToOrganization implements IReturnVoid, IPut
{
    public organizationId: number;
    public postTypes: PostType[];
    public frequency?: Frequency;

    public constructor(init?: Partial<SubscribeToOrganization>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubscribeToOrganization'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/posts/{PostId}/subscribe", "PUT")
export class SubscribeToPost implements IReturnVoid, IPut
{
    public postId: number;

    public constructor(init?: Partial<SubscribeToPost>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubscribeToPost'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
export class DeleteOrganizationSubscription implements IReturnVoid, IDelete
{
    public organizationId: number;

    public constructor(init?: Partial<DeleteOrganizationSubscription>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteOrganizationSubscription'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/posts/{PostId}/subscribe", "DELETE")
export class DeletePostSubscription implements IReturnVoid, IDelete
{
    public postId: number;

    public constructor(init?: Partial<DeletePostSubscription>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeletePostSubscription'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/technology/{Slug}/previous-versions", "GET")
export class GetTechnologyPreviousVersions implements IReturn<GetTechnologyPreviousVersionsResponse>, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetTechnologyPreviousVersions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTechnologyPreviousVersions'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTechnologyPreviousVersionsResponse(); }
}

// @Route("/technology", "GET")
export class GetAllTechnologies implements IReturn<GetAllTechnologiesResponse>, IGet
{

    public constructor(init?: Partial<GetAllTechnologies>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllTechnologies'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllTechnologiesResponse(); }
}

// @Route("/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies")
export class FindTechnologies extends QueryDb_2<Technology, TechnologyView> implements IReturn<QueryResponse<TechnologyView>>, IGet
{
    public ids: number[];
    public name: string;
    public vendorName: string;
    public nameContains: string;
    public vendorNameContains: string;
    public descriptionContains: string;

    public constructor(init?: Partial<FindTechnologies>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'FindTechnologies'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<TechnologyView>(); }
}

// @Route("/technology/query")
export class QueryTechnology extends QueryDb_2<Technology, TechnologyView> implements IReturn<QueryResponse<TechnologyView>>, IGet
{
    public ids: number[];
    public name: string;
    public vendorName: string;
    public nameContains: string;
    public vendorNameContains: string;
    public descriptionContains: string;

    public constructor(init?: Partial<QueryTechnology>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryTechnology'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<TechnologyView>(); }
}

// @Route("/technology/{Slug}")
export class GetTechnology implements IReturn<GetTechnologyResponse>, IRegisterStats, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTechnology'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTechnologyResponse(); }
}

// @Route("/technology/{Slug}/favorites")
export class GetTechnologyFavoriteDetails implements IReturn<GetTechnologyFavoriteDetailsResponse>, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetTechnologyFavoriteDetails>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTechnologyFavoriteDetails'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTechnologyFavoriteDetailsResponse(); }
}

// @Route("/technology", "POST")
export class CreateTechnology implements IReturn<CreateTechnologyResponse>, IPost
{
    public name: string;
    public slug: string;
    public vendorName: string;
    public vendorUrl: string;
    public productUrl: string;
    public logoUrl: string;
    public description: string;
    public isLocked: boolean;
    public tier: TechnologyTier;

    public constructor(init?: Partial<CreateTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateTechnology'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateTechnologyResponse(); }
}

// @Route("/technology/{Id}", "PUT")
export class UpdateTechnology implements IReturn<UpdateTechnologyResponse>, IPut
{
    public id: number;
    public name: string;
    public vendorName: string;
    public vendorUrl: string;
    public productUrl: string;
    public logoUrl: string;
    public description: string;
    public isLocked: boolean;
    public tier: TechnologyTier;

    public constructor(init?: Partial<UpdateTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTechnology'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateTechnologyResponse(); }
}

// @Route("/technology/{Id}", "DELETE")
export class DeleteTechnology implements IReturn<DeleteTechnologyResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteTechnology'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteTechnologyResponse(); }
}

// @Route("/techstacks/{Slug}/previous-versions", "GET")
export class GetTechnologyStackPreviousVersions implements IReturn<GetTechnologyStackPreviousVersionsResponse>, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetTechnologyStackPreviousVersions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTechnologyStackPreviousVersions'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTechnologyStackPreviousVersionsResponse(); }
}

// @Route("/pagestats/{Type}/{Slug}")
export class GetPageStats implements IReturn<GetPageStatsResponse>, IGet
{
    public type: string;
    public slug: string;
    public id?: number;

    public constructor(init?: Partial<GetPageStats>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetPageStats'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetPageStatsResponse(); }
}

// @Route("/cache/clear")
export class ClearCache implements IReturn<string>, IGet
{

    public constructor(init?: Partial<ClearCache>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ClearCache'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @Route("/tasks/hourly")
export class HourlyTask implements IReturn<HourlyTaskResponse>, IGet
{
    public force: boolean;

    public constructor(init?: Partial<HourlyTask>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'HourlyTask'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new HourlyTaskResponse(); }
}

// @Route("/techstacks/search")
// @AutoQueryViewer(DefaultSearchField="Description", DefaultSearchText="ServiceStack", DefaultSearchType="Contains", Description="Explore different Technology Stacks", IconUrl="material-icons:cloud", Title="Find Technology Stacks")
export class FindTechStacks extends QueryDb_2<TechnologyStack, TechnologyStackView> implements IReturn<QueryResponse<TechnologyStackView>>, IGet
{
    public ids: number[];
    public name: string;
    public vendorName: string;
    public nameContains: string;
    public vendorNameContains: string;
    public descriptionContains: string;

    public constructor(init?: Partial<FindTechStacks>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'FindTechStacks'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<TechnologyStackView>(); }
}

// @Route("/techstacks/query")
export class QueryTechStacks extends QueryDb_2<TechnologyStack, TechnologyStackView> implements IReturn<QueryResponse<TechnologyStackView>>, IGet
{
    public ids: number[];
    public name: string;
    public vendorName: string;
    public nameContains: string;
    public vendorNameContains: string;
    public descriptionContains: string;

    public constructor(init?: Partial<QueryTechStacks>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryTechStacks'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<TechnologyStackView>(); }
}

// @Route("/overview")
export class Overview implements IReturn<OverviewResponse>, IGet
{
    public reload: boolean;

    public constructor(init?: Partial<Overview>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Overview'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new OverviewResponse(); }
}

// @Route("/app-overview")
export class AppOverview implements IReturn<AppOverviewResponse>, IGet
{
    public reload: boolean;

    public constructor(init?: Partial<AppOverview>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AppOverview'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new AppOverviewResponse(); }
}

// @Route("/techstacks", "GET")
export class GetAllTechnologyStacks implements IReturn<GetAllTechnologyStacksResponse>, IGet
{

    public constructor(init?: Partial<GetAllTechnologyStacks>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllTechnologyStacks'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllTechnologyStacksResponse(); }
}

// @Route("/techstacks/{Slug}", "GET")
export class GetTechnologyStack implements IReturn<GetTechnologyStackResponse>, IRegisterStats, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetTechnologyStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTechnologyStack'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTechnologyStackResponse(); }
}

// @Route("/techstacks/{Slug}/favorites")
export class GetTechnologyStackFavoriteDetails implements IReturn<GetTechnologyStackFavoriteDetailsResponse>, IGet
{
    public slug: string;

    public constructor(init?: Partial<GetTechnologyStackFavoriteDetails>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTechnologyStackFavoriteDetails'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTechnologyStackFavoriteDetailsResponse(); }
}

// @Route("/config")
export class GetConfig implements IReturn<GetConfigResponse>, IGet
{

    public constructor(init?: Partial<GetConfig>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConfig'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConfigResponse(); }
}

// @Route("/techstacks", "POST")
export class CreateTechnologyStack implements IReturn<CreateTechnologyStackResponse>, IPost
{
    public name: string;
    public slug: string;
    public vendorName: string;
    public appUrl: string;
    public screenshotUrl: string;
    public description: string;
    public details: string;
    public isLocked: boolean;
    public technologyIds: number[];

    public constructor(init?: Partial<CreateTechnologyStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateTechnologyStack'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateTechnologyStackResponse(); }
}

// @Route("/techstacks/{Id}", "PUT")
export class UpdateTechnologyStack implements IReturn<UpdateTechnologyStackResponse>, IPut
{
    public id: number;
    public name: string;
    public vendorName: string;
    public appUrl: string;
    public screenshotUrl: string;
    public description: string;
    public details: string;
    public isLocked: boolean;
    public technologyIds: number[];

    public constructor(init?: Partial<UpdateTechnologyStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTechnologyStack'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateTechnologyStackResponse(); }
}

// @Route("/techstacks/{Id}", "DELETE")
export class DeleteTechnologyStack implements IReturn<DeleteTechnologyStackResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteTechnologyStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteTechnologyStack'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteTechnologyStackResponse(); }
}

// @Route("/favorites/techtacks", "GET")
export class GetFavoriteTechStack implements IReturn<GetFavoriteTechStackResponse>, IGet
{
    public technologyStackId: number;

    public constructor(init?: Partial<GetFavoriteTechStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFavoriteTechStack'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetFavoriteTechStackResponse(); }
}

// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
export class AddFavoriteTechStack implements IReturn<FavoriteTechStackResponse>, IPut
{
    public technologyStackId: number;

    public constructor(init?: Partial<AddFavoriteTechStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddFavoriteTechStack'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new FavoriteTechStackResponse(); }
}

// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
export class RemoveFavoriteTechStack implements IReturn<FavoriteTechStackResponse>, IDelete
{
    public technologyStackId: number;

    public constructor(init?: Partial<RemoveFavoriteTechStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RemoveFavoriteTechStack'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new FavoriteTechStackResponse(); }
}

// @Route("/favorites/technology", "GET")
export class GetFavoriteTechnologies implements IReturn<GetFavoriteTechnologiesResponse>, IGet
{
    public technologyId: number;

    public constructor(init?: Partial<GetFavoriteTechnologies>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFavoriteTechnologies'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetFavoriteTechnologiesResponse(); }
}

// @Route("/favorites/technology/{TechnologyId}", "PUT")
export class AddFavoriteTechnology implements IReturn<FavoriteTechnologyResponse>, IPut
{
    public technologyId: number;

    public constructor(init?: Partial<AddFavoriteTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddFavoriteTechnology'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new FavoriteTechnologyResponse(); }
}

// @Route("/favorites/technology/{TechnologyId}", "DELETE")
export class RemoveFavoriteTechnology implements IReturn<FavoriteTechnologyResponse>, IDelete
{
    public technologyId: number;

    public constructor(init?: Partial<RemoveFavoriteTechnology>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RemoveFavoriteTechnology'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new FavoriteTechnologyResponse(); }
}

// @Route("/my-feed")
// @ValidateRequest(Validator="IsAuthenticated")
export class GetUserFeed implements IReturn<GetUserFeedResponse>, IGet
{

    public constructor(init?: Partial<GetUserFeed>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserFeed'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserFeedResponse(); }
}

// @Route("/users/karma", "GET")
export class GetUsersKarma implements IReturn<GetUsersKarmaResponse>, IGet
{
    public userIds: number[];

    public constructor(init?: Partial<GetUsersKarma>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUsersKarma'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUsersKarmaResponse(); }
}

// @Route("/userinfo/{Id}")
export class GetUserInfo implements IReturn<GetUserInfoResponse>, IGet
{
    public id: number;
    public userName: string;

    public constructor(init?: Partial<GetUserInfo>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserInfo'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserInfoResponse(); }
}

// @Route("/users/{UserId}/avatar", "GET")
export class UserAvatar implements IGet
{
    public userId: number;

    public constructor(init?: Partial<UserAvatar>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserAvatar'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/mq/start")
export class MqStart implements IReturn<string>
{

    public constructor(init?: Partial<MqStart>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MqStart'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return ''; }
}

// @Route("/mq/stop")
export class MqStop implements IReturn<string>
{

    public constructor(init?: Partial<MqStop>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MqStop'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return ''; }
}

// @Route("/mq/stats")
export class MqStats implements IReturn<string>
{

    public constructor(init?: Partial<MqStats>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MqStats'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return ''; }
}

// @Route("/mq/status")
export class MqStatus implements IReturn<string>
{

    public constructor(init?: Partial<MqStatus>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MqStatus'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return ''; }
}

// @Route("/admin/technology/{TechnologyId}/logo")
export class LogoUrlApproval implements IReturn<LogoUrlApprovalResponse>, IPut
{
    public technologyId: number;
    public approved: boolean;

    public constructor(init?: Partial<LogoUrlApproval>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LogoUrlApproval'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new LogoUrlApprovalResponse(); }
}

/** @description Limit updates to TechStack to Owner or Admin users */
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
export class LockTechStack implements IReturn<LockStackResponse>, IPut
{
    // @Validate(Validator="GreaterThan(0)")
    public technologyStackId: number;

    public isLocked: boolean;

    public constructor(init?: Partial<LockTechStack>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LockTechStack'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new LockStackResponse(); }
}

/** @description Limit updates to Technology to Owner or Admin users */
// @Route("/admin/technology/{TechnologyId}/lock")
// @Api(Description="Limit updates to Technology to Owner or Admin users")
export class LockTech implements IReturn<LockStackResponse>, IPut
{
    // @Validate(Validator="GreaterThan(0)")
    public technologyId: number;

    public isLocked: boolean;

    public constructor(init?: Partial<LockTech>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LockTech'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new LockStackResponse(); }
}

export class DummyTypes
{
    public post: Post[];

    public constructor(init?: Partial<DummyTypes>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DummyTypes'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/email/post/{PostId}")
// @ValidateRequest(Validator="IsAdmin")
export class EmailTest implements IReturn<EmailTestResponse>
{
    public postId?: number;

    public constructor(init?: Partial<EmailTest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'EmailTest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmailTestResponse(); }
}

/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "POST")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public userName: string;

    // @DataMember(Order=3)
    public password: string;

    // @DataMember(Order=4)
    public rememberMe?: boolean;

    // @DataMember(Order=5)
    public accessToken: string;

    // @DataMember(Order=6)
    public accessTokenSecret: string;

    // @DataMember(Order=7)
    public returnUrl: string;

    // @DataMember(Order=8)
    public errorView: string;

    // @DataMember(Order=9)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

// @Route("/posts/comment", "GET")
export class QueryPostComments extends QueryDb_1<PostComment> implements IReturn<QueryResponse<PostComment>>, IGet
{
    public id?: number;
    public userId?: number;
    public postId?: number;
    public contentContains: string;
    public upVotesAbove?: number;
    public upVotesBelow?: number;
    public downVotesAbove?: number;
    public downVotes?: number;
    public favoritesAbove?: number;
    public favoritesBelow?: number;
    public wordCountAbove?: number;
    public wordCountBelow?: number;
    public reportCountAbove?: number;
    public reportCountBelow?: number;

    public constructor(init?: Partial<QueryPostComments>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryPostComments'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<PostComment>(); }
}

