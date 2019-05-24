/* Options:
Date: 2019-05-14 17:24:06
Version: 5.51
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://www.techstacks.io

//GlobalNamespace: 
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
    sessionId: string;
}

export interface IHasBearerToken
{
    bearerToken: string;
}

export interface IPost
{
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
    public constructor(init?:Partial<Post>) { (<any>Object).assign(this, init); }
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

    public pinCommentId: number;
    public technologyIds: number[];
    public fromDate: string;
    public toDate: string;
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
    public lastCommentDate: string;
    public lastCommentId: number;
    public lastCommentUserId: number;
    public deleted: string;
    public deletedBy: string;
    public locked: string;
    public lockedBy: string;
    public hidden: string;
    public hiddenBy: string;
    public status: string;
    public statusDate: string;
    public statusBy: string;
    public archived: boolean;
    public bumped: string;
    public created: string;
    public createdBy: string;
    public modified: string;
    public modifiedBy: string;
    public refId: number;
    public refSource: string;
    public refUrn: string;
}

export class Organization
{
    public constructor(init?:Partial<Organization>) { (<any>Object).assign(this, init); }
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
    public disableInvites: boolean;
    public upVotes: number;
    public downVotes: number;
    public views: number;
    public favorites: number;
    public subscribers: number;
    public commentsCount: number;
    public postsCount: number;
    public score: number;
    public rank: number;
    public refId: number;
    public refSource: string;
    public hidden: string;
    public hiddenBy: string;
    public locked: string;
    public lockedBy: string;
    public deleted: string;
    public deletedBy: string;
    public created: string;
    public createdBy: string;
    public modified: string;
    public modifiedBy: string;
}

export class OrganizationLabel
{
    public constructor(init?:Partial<OrganizationLabel>) { (<any>Object).assign(this, init); }
    public slug: string;
    public organizationId: number;
    public description: string;
    public color: string;
}

export class Category
{
    public constructor(init?:Partial<Category>) { (<any>Object).assign(this, init); }
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
}

export class OrganizationMember
{
    public constructor(init?:Partial<OrganizationMember>) { (<any>Object).assign(this, init); }
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
}

// @DataContract
export class ResponseError
{
    public constructor(init?:Partial<ResponseError>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1, EmitDefaultValue=false)
    public errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    public fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    public message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    public meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    public constructor(init?:Partial<ResponseStatus>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index:string]: string; };
}

export class OrganizationMemberInvite
{
    public constructor(init?:Partial<OrganizationMemberInvite>) { (<any>Object).assign(this, init); }
    public id: number;
    public organizationId: number;
    public userId: number;
    public userName: string;
    public dismissed: string;
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

export class PostReportInfo
{
    public constructor(init?:Partial<PostReportInfo>) { (<any>Object).assign(this, init); }
    public id: number;
    public organizationId: number;
    public postId: number;
    public userId: number;
    public userName: string;
    public flagType: FlagType;
    public reportNotes: string;
    public created: string;
    public acknowledged: string;
    public acknowledgedBy: string;
    public dismissed: string;
    public dismissedBy: string;
    public title: string;
    public reportCount: number;
    public createdBy: string;
}

export class PostCommentReportInfo
{
    public constructor(init?:Partial<PostCommentReportInfo>) { (<any>Object).assign(this, init); }
    public id: number;
    public organizationId: number;
    public postId: number;
    public postCommentId: number;
    public userId: number;
    public userName: string;
    public flagType: FlagType;
    public reportNotes: string;
    public created: string;
    public acknowledged: string;
    public acknowledgedBy: string;
    public dismissed: string;
    public dismissedBy: string;
    public contentHtml: string;
    public reportCount: number;
    public createdBy: string;
}

export class QueryBase
{
    public constructor(init?:Partial<QueryBase>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public skip: number;

    // @DataMember(Order=2)
    public take: number;

    // @DataMember(Order=3)
    public orderBy: string;

    // @DataMember(Order=4)
    public orderByDesc: string;

    // @DataMember(Order=5)
    public include: string;

    // @DataMember(Order=6)
    public fields: string;

    // @DataMember(Order=7)
    public meta: { [index:string]: string; };
}

export class QueryDb<T> extends QueryBase
{
    public constructor(init?:Partial<QueryDb<T>>) { super(init); (<any>Object).assign(this, init); }
}

export class PostComment
{
    public constructor(init?:Partial<PostComment>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public userId: number;
    public replyId: number;
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
    public deleted: string;
    public hidden: string;
    public modified: string;
    public created: string;
    public createdBy: string;
    public refId: number;
    public refSource: string;
    public refUrn: string;
}

export enum ReportAction
{
    Dismiss = 'Dismiss',
    Delete = 'Delete',
}

export class UserRef
{
    public constructor(init?:Partial<UserRef>) { (<any>Object).assign(this, init); }
    public id: number;
    public userName: string;
    public email: string;
    public refId: number;
    public refSource: string;
    public refUrn: string;
}

export class OrganizationSubscription
{
    public constructor(init?:Partial<OrganizationSubscription>) { (<any>Object).assign(this, init); }
    public id: number;
    public organizationId: number;
    public userId: number;
    public userName: string;
    public postTypes: string[];
    public frequencyDays: number;
    public lastSyncedId: number;
    public lastSynced: string;
    public created: string;
}

export class TechnologyStackBase
{
    public constructor(init?:Partial<TechnologyStackBase>) { (<any>Object).assign(this, init); }
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

    public lastStatusUpdate: string;
    public organizationId: number;
    public commentsPostId: number;
    public viewCount: number;
    public favCount: number;
}

export class TechnologyStack extends TechnologyStackBase
{
    public constructor(init?:Partial<TechnologyStack>) { super(init); (<any>Object).assign(this, init); }
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
    public constructor(init?:Partial<TechnologyBase>) { (<any>Object).assign(this, init); }
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
    public lastStatusUpdate: string;
    public organizationId: number;
    public commentsPostId: number;
    public viewCount: number;
    public favCount: number;
}

export class Technology extends TechnologyBase
{
    public constructor(init?:Partial<Technology>) { super(init); (<any>Object).assign(this, init); }
}

export class UserActivity
{
    public constructor(init?:Partial<UserActivity>) { (<any>Object).assign(this, init); }
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
}

export enum Frequency
{
    Daily = '1',
    Weekly = '7',
    Monthly = '30',
    Quarterly = '90',
}

export class TechnologyHistory extends TechnologyBase
{
    public constructor(init?:Partial<TechnologyHistory>) { super(init); (<any>Object).assign(this, init); }
    public technologyId: number;
    public operation: string;
}

export interface IRegisterStats
{
}

export class TechnologyStackHistory extends TechnologyStackBase
{
    public constructor(init?:Partial<TechnologyStackHistory>) { super(init); (<any>Object).assign(this, init); }
    public technologyStackId: number;
    public operation: string;
    public technologyIds: number[];
}

export class UserInfo
{
    public constructor(init?:Partial<UserInfo>) { (<any>Object).assign(this, init); }
    public userName: string;
    public avatarUrl: string;
    public stacksCount: number;
}

export class TechnologyInfo
{
    public constructor(init?:Partial<TechnologyInfo>) { (<any>Object).assign(this, init); }
    public tier: TechnologyTier;
    public slug: string;
    public name: string;
    public logoUrl: string;
    public stacksCount: number;
}

export class TechnologyInStack extends TechnologyBase
{
    public constructor(init?:Partial<TechnologyInStack>) { super(init); (<any>Object).assign(this, init); }
    public technologyId: number;
    public technologyStackId: number;
    public justification: string;
}

export class TechStackDetails extends TechnologyStackBase
{
    public constructor(init?:Partial<TechStackDetails>) { super(init); (<any>Object).assign(this, init); }
    public technologyChoices: TechnologyInStack[];
}

export class LabelInfo
{
    public constructor(init?:Partial<LabelInfo>) { (<any>Object).assign(this, init); }
    public slug: string;
    public color: string;
}

export class CategoryInfo
{
    public constructor(init?:Partial<CategoryInfo>) { (<any>Object).assign(this, init); }
    public id: number;
    public name: string;
    public slug: string;
}

export class OrganizationInfo
{
    public constructor(init?:Partial<OrganizationInfo>) { (<any>Object).assign(this, init); }
    public id: number;
    public name: string;
    public slug: string;
    public refId: number;
    public refSource: string;
    public upVotes: number;
    public downVotes: number;
    public membersCount: number;
    public rank: number;
    public disableInvites: boolean;
    public lang: string;
    public postTypes: string[];
    public moderatorPostTypes: string[];
    public locked: string;
    public labels: LabelInfo[];
    public categories: CategoryInfo[];
}

// @DataContract
export class Option
{
    public constructor(init?:Partial<Option>) { (<any>Object).assign(this, init); }
    // @DataMember(Name="name")
    public name: string;

    // @DataMember(Name="title")
    public title: string;

    // @DataMember(Name="value")
    public value: TechnologyTier;
}

export class UserVoiceUser
{
    public constructor(init?:Partial<UserVoiceUser>) { (<any>Object).assign(this, init); }
    public id: number;
    public name: string;
    public email: string;
    public avatarUrl: string;
    public createdAt: string;
    public updatedAt: string;
}

export class UserVoiceComment
{
    public constructor(init?:Partial<UserVoiceComment>) { (<any>Object).assign(this, init); }
    public text: string;
    public formattedText: string;
    public createdAt: string;
    public creator: UserVoiceUser;
}

export class GetOrganizationResponse
{
    public constructor(init?:Partial<GetOrganizationResponse>) { (<any>Object).assign(this, init); }
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
}

export class GetOrganizationMembersResponse
{
    public constructor(init?:Partial<GetOrganizationMembersResponse>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public results: OrganizationMember[];
    public responseStatus: ResponseStatus;
}

export class GetOrganizationAdminResponse
{
    public constructor(init?:Partial<GetOrganizationAdminResponse>) { (<any>Object).assign(this, init); }
    public labels: OrganizationLabel[];
    public members: OrganizationMember[];
    public memberInvites: OrganizationMemberInvite[];
    public reportedPosts: PostReportInfo[];
    public reportedPostComments: PostCommentReportInfo[];
    public responseStatus: ResponseStatus;
}

export class CreateOrganizationForTechnologyResponse
{
    public constructor(init?:Partial<CreateOrganizationForTechnologyResponse>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public organizationSlug: string;
    public commentsPostId: number;
    public commentsPostSlug: string;
    public responseStatus: ResponseStatus;
}

export class CreateOrganizationResponse
{
    public constructor(init?:Partial<CreateOrganizationResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public slug: string;
    public responseStatus: ResponseStatus;
}

export class UpdateOrganizationResponse
{
    public constructor(init?:Partial<UpdateOrganizationResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class OrganizationLabelResponse
{
    public constructor(init?:Partial<OrganizationLabelResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class AddOrganizationCategoryResponse
{
    public constructor(init?:Partial<AddOrganizationCategoryResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public slug: string;
    public responseStatus: ResponseStatus;
}

export class UpdateOrganizationCategoryResponse
{
    public constructor(init?:Partial<UpdateOrganizationCategoryResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class AddOrganizationMemberResponse
{
    public constructor(init?:Partial<AddOrganizationMemberResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class UpdateOrganizationMemberResponse
{
    public constructor(init?:Partial<UpdateOrganizationMemberResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class SetOrganizationMembersResponse
{
    public constructor(init?:Partial<SetOrganizationMembersResponse>) { (<any>Object).assign(this, init); }
    public userIdsAdded: number[];
    public userIdsRemoved: number[];
    public responseStatus: ResponseStatus;
}

export class GetOrganizationMemberInvitesResponse
{
    public constructor(init?:Partial<GetOrganizationMemberInvitesResponse>) { (<any>Object).assign(this, init); }
    public results: OrganizationMemberInvite[];
    public responseStatus: ResponseStatus;
}

export class RequestOrganizationMemberInviteResponse
{
    public constructor(init?:Partial<RequestOrganizationMemberInviteResponse>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public responseStatus: ResponseStatus;
}

export class UpdateOrganizationMemberInviteResponse
{
    public constructor(init?:Partial<UpdateOrganizationMemberInviteResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

// @DataContract
export class QueryResponse<T>
{
    public constructor(init?:Partial<QueryResponse<T>>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public offset: number;

    // @DataMember(Order=2)
    public total: number;

    // @DataMember(Order=3)
    public results: T[];

    // @DataMember(Order=4)
    public meta: { [index:string]: string; };

    // @DataMember(Order=5)
    public responseStatus: ResponseStatus;
}

export class GetPostResponse
{
    public constructor(init?:Partial<GetPostResponse>) { (<any>Object).assign(this, init); }
    public cache: number;
    public post: Post;
    public comments: PostComment[];
    public responseStatus: ResponseStatus;
}

export class CreatePostResponse
{
    public constructor(init?:Partial<CreatePostResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public slug: string;
    public responseStatus: ResponseStatus;
}

export class UpdatePostResponse
{
    public constructor(init?:Partial<UpdatePostResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class DeletePostResponse
{
    public constructor(init?:Partial<DeletePostResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public responseStatus: ResponseStatus;
}

export class CreatePostCommentResponse
{
    public constructor(init?:Partial<CreatePostCommentResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public responseStatus: ResponseStatus;
}

export class UpdatePostCommentResponse
{
    public constructor(init?:Partial<UpdatePostCommentResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class DeletePostCommentResponse
{
    public constructor(init?:Partial<DeletePostCommentResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public responseStatus: ResponseStatus;
}

export class GetUserPostCommentVotesResponse
{
    public constructor(init?:Partial<GetUserPostCommentVotesResponse>) { (<any>Object).assign(this, init); }
    public postId: number;
    public upVotedCommentIds: number[];
    public downVotedCommentIds: number[];
}

export class PinPostCommentResponse
{
    public constructor(init?:Partial<PinPostCommentResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class GetUsersByEmailsResponse
{
    public constructor(init?:Partial<GetUsersByEmailsResponse>) { (<any>Object).assign(this, init); }
    public results: UserRef[];
    public responseStatus: ResponseStatus;
}

export class GetUserPostActivityResponse
{
    public constructor(init?:Partial<GetUserPostActivityResponse>) { (<any>Object).assign(this, init); }
    public upVotedPostIds: number[];
    public downVotedPostIds: number[];
    public favoritePostIds: number[];
    public responseStatus: ResponseStatus;
}

export class GetUserOrganizationsResponse
{
    public constructor(init?:Partial<GetUserOrganizationsResponse>) { (<any>Object).assign(this, init); }
    public members: OrganizationMember[];
    public memberInvites: OrganizationMemberInvite[];
    public subscriptions: OrganizationSubscription[];
}

export class UserPostVoteResponse
{
    public constructor(init?:Partial<UserPostVoteResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class UserPostFavoriteResponse
{
    public constructor(init?:Partial<UserPostFavoriteResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class UserPostReportResponse
{
    public constructor(init?:Partial<UserPostReportResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class UserPostCommentVoteResponse
{
    public constructor(init?:Partial<UserPostCommentVoteResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class UserPostCommentReportResponse
{
    public constructor(init?:Partial<UserPostCommentReportResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class SessionInfoResponse
{
    public constructor(init?:Partial<SessionInfoResponse>) { (<any>Object).assign(this, init); }
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
}

export class GetTechnologyPreviousVersionsResponse
{
    public constructor(init?:Partial<GetTechnologyPreviousVersionsResponse>) { (<any>Object).assign(this, init); }
    public results: TechnologyHistory[];
}

export class GetAllTechnologiesResponse
{
    public constructor(init?:Partial<GetAllTechnologiesResponse>) { (<any>Object).assign(this, init); }
    public results: Technology[];
    public total: number;
}

export class GetTechnologyResponse
{
    public constructor(init?:Partial<GetTechnologyResponse>) { (<any>Object).assign(this, init); }
    public created: string;
    public technology: Technology;
    public technologyStacks: TechnologyStack[];
    public responseStatus: ResponseStatus;
}

export class GetTechnologyFavoriteDetailsResponse
{
    public constructor(init?:Partial<GetTechnologyFavoriteDetailsResponse>) { (<any>Object).assign(this, init); }
    public users: string[];
    public favoriteCount: number;
}

export class CreateTechnologyResponse
{
    public constructor(init?:Partial<CreateTechnologyResponse>) { (<any>Object).assign(this, init); }
    public result: Technology;
    public responseStatus: ResponseStatus;
}

export class UpdateTechnologyResponse
{
    public constructor(init?:Partial<UpdateTechnologyResponse>) { (<any>Object).assign(this, init); }
    public result: Technology;
    public responseStatus: ResponseStatus;
}

export class DeleteTechnologyResponse
{
    public constructor(init?:Partial<DeleteTechnologyResponse>) { (<any>Object).assign(this, init); }
    public result: Technology;
    public responseStatus: ResponseStatus;
}

export class GetTechnologyStackPreviousVersionsResponse
{
    public constructor(init?:Partial<GetTechnologyStackPreviousVersionsResponse>) { (<any>Object).assign(this, init); }
    public results: TechnologyStackHistory[];
}

export class GetPageStatsResponse
{
    public constructor(init?:Partial<GetPageStatsResponse>) { (<any>Object).assign(this, init); }
    public type: string;
    public slug: string;
    public viewCount: number;
    public favCount: number;
}

export class HourlyTaskResponse
{
    public constructor(init?:Partial<HourlyTaskResponse>) { (<any>Object).assign(this, init); }
    public meta: { [index:string]: string; };
    public responseStatus: ResponseStatus;
}

export class OverviewResponse
{
    public constructor(init?:Partial<OverviewResponse>) { (<any>Object).assign(this, init); }
    public created: string;
    public topUsers: UserInfo[];
    public topTechnologies: TechnologyInfo[];
    public latestTechStacks: TechStackDetails[];
    public popularTechStacks: TechnologyStack[];
    public allOrganizations: OrganizationInfo[];
    public topTechnologiesByTier: { [index:string]: TechnologyInfo[]; };
    public responseStatus: ResponseStatus;
}

export class AppOverviewResponse
{
    public constructor(init?:Partial<AppOverviewResponse>) { (<any>Object).assign(this, init); }
    public created: string;
    public allTiers: Option[];
    public topTechnologies: TechnologyInfo[];
    public responseStatus: ResponseStatus;
}

export class GetAllTechnologyStacksResponse
{
    public constructor(init?:Partial<GetAllTechnologyStacksResponse>) { (<any>Object).assign(this, init); }
    public results: TechnologyStack[];
    public total: number;
}

export class GetTechnologyStackResponse
{
    public constructor(init?:Partial<GetTechnologyStackResponse>) { (<any>Object).assign(this, init); }
    public created: string;
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;
}

export class GetTechnologyStackFavoriteDetailsResponse
{
    public constructor(init?:Partial<GetTechnologyStackFavoriteDetailsResponse>) { (<any>Object).assign(this, init); }
    public users: string[];
    public favoriteCount: number;
}

export class GetConfigResponse
{
    public constructor(init?:Partial<GetConfigResponse>) { (<any>Object).assign(this, init); }
    public allTiers: Option[];
    public allPostTypes: Option[];
    public allFlagTypes: Option[];
}

export class CreateTechnologyStackResponse
{
    public constructor(init?:Partial<CreateTechnologyStackResponse>) { (<any>Object).assign(this, init); }
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;
}

export class UpdateTechnologyStackResponse
{
    public constructor(init?:Partial<UpdateTechnologyStackResponse>) { (<any>Object).assign(this, init); }
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;
}

export class DeleteTechnologyStackResponse
{
    public constructor(init?:Partial<DeleteTechnologyStackResponse>) { (<any>Object).assign(this, init); }
    public result: TechStackDetails;
    public responseStatus: ResponseStatus;
}

export class GetFavoriteTechStackResponse
{
    public constructor(init?:Partial<GetFavoriteTechStackResponse>) { (<any>Object).assign(this, init); }
    public results: TechnologyStack[];
}

export class FavoriteTechStackResponse
{
    public constructor(init?:Partial<FavoriteTechStackResponse>) { (<any>Object).assign(this, init); }
    public result: TechnologyStack;
}

export class GetFavoriteTechnologiesResponse
{
    public constructor(init?:Partial<GetFavoriteTechnologiesResponse>) { (<any>Object).assign(this, init); }
    public results: Technology[];
}

export class FavoriteTechnologyResponse
{
    public constructor(init?:Partial<FavoriteTechnologyResponse>) { (<any>Object).assign(this, init); }
    public result: Technology;
}

export class GetUserFeedResponse
{
    public constructor(init?:Partial<GetUserFeedResponse>) { (<any>Object).assign(this, init); }
    public results: TechStackDetails[];
}

export class GetUsersKarmaResponse
{
    public constructor(init?:Partial<GetUsersKarmaResponse>) { (<any>Object).assign(this, init); }
    public results: { [index:number]: number; };
    public responseStatus: ResponseStatus;
}

export class GetUserInfoResponse
{
    public constructor(init?:Partial<GetUserInfoResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public userName: string;
    public created: string;
    public avatarUrl: string;
    public techStacks: TechnologyStack[];
    public favoriteTechStacks: TechnologyStack[];
    public favoriteTechnologies: Technology[];
    public userActivity: UserActivity;
    public responseStatus: ResponseStatus;
}

export class SyncDiscourseSiteResponse
{
    public constructor(init?:Partial<SyncDiscourseSiteResponse>) { (<any>Object).assign(this, init); }
    public timeTaken: string;
    public userLogs: string[];
    public postsLogs: string[];
    public responseStatus: ResponseStatus;
}

export class LogoUrlApprovalResponse
{
    public constructor(init?:Partial<LogoUrlApprovalResponse>) { (<any>Object).assign(this, init); }
    public result: Technology;
}

export class LockStackResponse
{
    public constructor(init?:Partial<LockStackResponse>) { (<any>Object).assign(this, init); }
}

export class EmailTestRespoonse
{
    public constructor(init?:Partial<EmailTestRespoonse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

export class ImportUserResponse
{
    public constructor(init?:Partial<ImportUserResponse>) { (<any>Object).assign(this, init); }
    public id: number;
    public responseStatus: ResponseStatus;
}

export class ImportUserVoiceSuggestionResponse
{
    public constructor(init?:Partial<ImportUserVoiceSuggestionResponse>) { (<any>Object).assign(this, init); }
    public postId: number;
    public postSlug: string;
    public responseStatus: ResponseStatus;
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    public constructor(init?:Partial<AuthenticateResponse>) { (<any>Object).assign(this, init); }
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
    public responseStatus: ResponseStatus;

    // @DataMember(Order=9)
    public meta: { [index:string]: string; };
}

// @DataContract
export class AssignRolesResponse
{
    public constructor(init?:Partial<AssignRolesResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    public constructor(init?:Partial<UnAssignRolesResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class ConvertSessionToTokenResponse
{
    public constructor(init?:Partial<ConvertSessionToTokenResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public meta: { [index:string]: string; };

    // @DataMember(Order=2)
    public accessToken: string;

    // @DataMember(Order=3)
    public refreshToken: string;

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class GetAccessTokenResponse
{
    public constructor(init?:Partial<GetAccessTokenResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public accessToken: string;

    // @DataMember(Order=2)
    public responseStatus: ResponseStatus;
}

// @Route("/ping")
export class Ping
{
    public constructor(init?:Partial<Ping>) { (<any>Object).assign(this, init); }
}

export class DummyTypes
{
    public constructor(init?:Partial<DummyTypes>) { (<any>Object).assign(this, init); }
    public post: Post[];
}

// @Route("/orgs/{Id}", "GET")
export class GetOrganization implements IReturn<GetOrganizationResponse>
{
    public constructor(init?:Partial<GetOrganization>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new GetOrganizationResponse(); }
    public getTypeName() { return 'GetOrganization'; }
}

// @Route("/organizations/{Slug}", "GET")
export class GetOrganizationBySlug implements IReturn<GetOrganizationResponse>
{
    public constructor(init?:Partial<GetOrganizationBySlug>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetOrganizationResponse(); }
    public getTypeName() { return 'GetOrganizationBySlug'; }
}

// @Route("/orgs/{Id}/members", "GET")
export class GetOrganizationMembers implements IReturn<GetOrganizationMembersResponse>
{
    public constructor(init?:Partial<GetOrganizationMembers>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new GetOrganizationMembersResponse(); }
    public getTypeName() { return 'GetOrganizationMembers'; }
}

// @Route("/orgs/{Id}/admin", "GET")
export class GetOrganizationAdmin implements IReturn<GetOrganizationAdminResponse>
{
    public constructor(init?:Partial<GetOrganizationAdmin>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new GetOrganizationAdminResponse(); }
    public getTypeName() { return 'GetOrganizationAdmin'; }
}

// @Route("/orgs/posts/new", "POST")
export class CreateOrganizationForTechnology implements IReturn<CreateOrganizationForTechnologyResponse>
{
    public constructor(init?:Partial<CreateOrganizationForTechnology>) { (<any>Object).assign(this, init); }
    public technologyId: number;
    public techStackId: number;
    public createResponse() { return new CreateOrganizationForTechnologyResponse(); }
    public getTypeName() { return 'CreateOrganizationForTechnology'; }
}

// @Route("/orgs", "POST")
export class CreateOrganization implements IReturn<CreateOrganizationResponse>
{
    public constructor(init?:Partial<CreateOrganization>) { (<any>Object).assign(this, init); }
    public name: string;
    public slug: string;
    public description: string;
    public refId: number;
    public refSource: string;
    public refUrn: string;
    public createResponse() { return new CreateOrganizationResponse(); }
    public getTypeName() { return 'CreateOrganization'; }
}

// @Route("/orgs/{Id}", "PUT")
export class UpdateOrganization implements IReturn<UpdateOrganizationResponse>
{
    public constructor(init?:Partial<UpdateOrganization>) { (<any>Object).assign(this, init); }
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
    public disableInvites: boolean;
    public defaultPostType: string;
    public defaultSubscriptionPostTypes: string[];
    public postTypes: string[];
    public moderatorPostTypes: string[];
    public technologyIds: number[];
    public createResponse() { return new UpdateOrganizationResponse(); }
    public getTypeName() { return 'UpdateOrganization'; }
}

// @Route("/orgs/{Id}", "DELETE")
export class DeleteOrganization implements IReturnVoid
{
    public constructor(init?:Partial<DeleteOrganization>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() {}
    public getTypeName() { return 'DeleteOrganization'; }
}

// @Route("/orgs/{Id}/lock", "PUT")
export class LockOrganization implements IReturnVoid
{
    public constructor(init?:Partial<LockOrganization>) { (<any>Object).assign(this, init); }
    public id: number;
    public lock: boolean;
    public reason: string;
    public createResponse() {}
    public getTypeName() { return 'LockOrganization'; }
}

// @Route("/orgs/{OrganizationId}/labels", "POST")
export class AddOrganizationLabel implements IReturn<OrganizationLabelResponse>
{
    public constructor(init?:Partial<AddOrganizationLabel>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public slug: string;
    public description: string;
    public color: string;
    public createResponse() { return new OrganizationLabelResponse(); }
    public getTypeName() { return 'AddOrganizationLabel'; }
}

// @Route("/orgs/{OrganizationId}/members/{Slug}", "PUT")
export class UpdateOrganizationLabel implements IReturn<OrganizationLabelResponse>
{
    public constructor(init?:Partial<UpdateOrganizationLabel>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public slug: string;
    public description: string;
    public color: string;
    public createResponse() { return new OrganizationLabelResponse(); }
    public getTypeName() { return 'UpdateOrganizationLabel'; }
}

// @Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE")
export class RemoveOrganizationLabel implements IReturnVoid
{
    public constructor(init?:Partial<RemoveOrganizationLabel>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public slug: string;
    public createResponse() {}
    public getTypeName() { return 'RemoveOrganizationLabel'; }
}

// @Route("/orgs/{OrganizationId}/categories", "POST")
export class AddOrganizationCategory implements IReturn<AddOrganizationCategoryResponse>
{
    public constructor(init?:Partial<AddOrganizationCategory>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public slug: string;
    public name: string;
    public description: string;
    public technologyIds: number[];
    public createResponse() { return new AddOrganizationCategoryResponse(); }
    public getTypeName() { return 'AddOrganizationCategory'; }
}

// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
export class UpdateOrganizationCategory implements IReturn<UpdateOrganizationCategoryResponse>
{
    public constructor(init?:Partial<UpdateOrganizationCategory>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public id: number;
    public name: string;
    public slug: string;
    public description: string;
    public technologyIds: number[];
    public createResponse() { return new UpdateOrganizationCategoryResponse(); }
    public getTypeName() { return 'UpdateOrganizationCategory'; }
}

// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
export class DeleteOrganizationCategory implements IReturnVoid
{
    public constructor(init?:Partial<DeleteOrganizationCategory>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public id: number;
    public createResponse() {}
    public getTypeName() { return 'DeleteOrganizationCategory'; }
}

// @Route("/orgs/{OrganizationId}/members", "POST")
export class AddOrganizationMember implements IReturn<AddOrganizationMemberResponse>
{
    public constructor(init?:Partial<AddOrganizationMember>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public userName: string;
    public isOwner: boolean;
    public isModerator: boolean;
    public denyPosts: boolean;
    public denyComments: boolean;
    public denyAll: boolean;
    public notes: string;
    public createResponse() { return new AddOrganizationMemberResponse(); }
    public getTypeName() { return 'AddOrganizationMember'; }
}

// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
export class UpdateOrganizationMember implements IReturn<UpdateOrganizationMemberResponse>
{
    public constructor(init?:Partial<UpdateOrganizationMember>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public userId: number;
    public isOwner: boolean;
    public isModerator: boolean;
    public denyPosts: boolean;
    public denyComments: boolean;
    public denyAll: boolean;
    public notes: string;
    public createResponse() { return new UpdateOrganizationMemberResponse(); }
    public getTypeName() { return 'UpdateOrganizationMember'; }
}

// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
export class RemoveOrganizationMember implements IReturnVoid
{
    public constructor(init?:Partial<RemoveOrganizationMember>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public userId: number;
    public createResponse() {}
    public getTypeName() { return 'RemoveOrganizationMember'; }
}

// @Route("/orgs/{OrganizationId}/members/set", "POST")
export class SetOrganizationMembers implements IReturn<SetOrganizationMembersResponse>
{
    public constructor(init?:Partial<SetOrganizationMembers>) { (<any>Object).assign(this, init); }
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
    public createResponse() { return new SetOrganizationMembersResponse(); }
    public getTypeName() { return 'SetOrganizationMembers'; }
}

// @Route("/orgs/{OrganizationId}/invites", "GET")
export class GetOrganizationMemberInvites implements IReturn<GetOrganizationMemberInvitesResponse>
{
    public constructor(init?:Partial<GetOrganizationMemberInvites>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public createResponse() { return new GetOrganizationMemberInvitesResponse(); }
    public getTypeName() { return 'GetOrganizationMemberInvites'; }
}

// @Route("/orgs/{OrganizationId}/invites", "POST")
export class RequestOrganizationMemberInvite implements IReturn<RequestOrganizationMemberInviteResponse>
{
    public constructor(init?:Partial<RequestOrganizationMemberInvite>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public createResponse() { return new RequestOrganizationMemberInviteResponse(); }
    public getTypeName() { return 'RequestOrganizationMemberInvite'; }
}

// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
export class UpdateOrganizationMemberInvite implements IReturn<UpdateOrganizationMemberInviteResponse>
{
    public constructor(init?:Partial<UpdateOrganizationMemberInvite>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public userName: string;
    public approve: boolean;
    public dismiss: boolean;
    public createResponse() { return new UpdateOrganizationMemberInviteResponse(); }
    public getTypeName() { return 'UpdateOrganizationMemberInvite'; }
}

// @Route("/posts", "GET")
export class QueryPosts extends QueryDb<Post> implements IReturn<QueryResponse<Post>>
{
    public constructor(init?:Partial<QueryPosts>) { super(init); (<any>Object).assign(this, init); }
    public ids: number[];
    public organizationId: number;
    public organizationIds: number[];
    public types: string[];
    public anyTechnologyIds: number[];
    public is: string[];
    public createResponse() { return new QueryResponse<Post>(); }
    public getTypeName() { return 'QueryPosts'; }
}

// @Route("/posts/{Id}", "GET")
export class GetPost implements IReturn<GetPostResponse>
{
    public constructor(init?:Partial<GetPost>) { (<any>Object).assign(this, init); }
    public id: number;
    public include: string;
    public createResponse() { return new GetPostResponse(); }
    public getTypeName() { return 'GetPost'; }
}

// @Route("/posts", "POST")
export class CreatePost implements IReturn<CreatePostResponse>
{
    public constructor(init?:Partial<CreatePost>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public type: PostType;
    public categoryId: number;
    public title: string;
    public url: string;
    public imageUrl: string;
    public content: string;
    public lock: boolean;
    public technologyIds: number[];
    public labels: string[];
    public fromDate: string;
    public toDate: string;
    public metaType: string;
    public meta: string;
    public refId: number;
    public refSource: string;
    public refUrn: string;
    public createResponse() { return new CreatePostResponse(); }
    public getTypeName() { return 'CreatePost'; }
}

// @Route("/posts/{Id}", "PUT")
export class UpdatePost implements IReturn<UpdatePostResponse>
{
    public constructor(init?:Partial<UpdatePost>) { (<any>Object).assign(this, init); }
    public id: number;
    public organizationId: number;
    public type: PostType;
    public categoryId: number;
    public title: string;
    public url: string;
    public imageUrl: string;
    public content: string;
    public lock: boolean;
    public technologyIds: number[];
    public labels: string[];
    public fromDate: string;
    public toDate: string;
    public metaType: string;
    public meta: string;
    public createResponse() { return new UpdatePostResponse(); }
    public getTypeName() { return 'UpdatePost'; }
}

// @Route("/posts/{Id}", "DELETE")
export class DeletePost implements IReturn<DeletePostResponse>
{
    public constructor(init?:Partial<DeletePost>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new DeletePostResponse(); }
    public getTypeName() { return 'DeletePost'; }
}

// @Route("/posts/{Id}/lock", "PUT")
export class LockPost implements IReturnVoid
{
    public constructor(init?:Partial<LockPost>) { (<any>Object).assign(this, init); }
    public id: number;
    public lock: boolean;
    public reason: string;
    public createResponse() {}
    public getTypeName() { return 'LockPost'; }
}

// @Route("/posts/{Id}/hide", "PUT")
export class HidePost implements IReturnVoid
{
    public constructor(init?:Partial<HidePost>) { (<any>Object).assign(this, init); }
    public id: number;
    public hide: boolean;
    public reason: string;
    public createResponse() {}
    public getTypeName() { return 'HidePost'; }
}

// @Route("/posts/{Id}/status/{Status}", "PUT")
export class ChangeStatusPost implements IReturnVoid
{
    public constructor(init?:Partial<ChangeStatusPost>) { (<any>Object).assign(this, init); }
    public id: number;
    public status: string;
    public reason: string;
    public createResponse() {}
    public getTypeName() { return 'ChangeStatusPost'; }
}

// @Route("/posts/{PostId}/report/{Id}", "POST")
export class ActionPostReport implements IReturnVoid
{
    public constructor(init?:Partial<ActionPostReport>) { (<any>Object).assign(this, init); }
    public postId: number;
    public id: number;
    public reportAction: ReportAction;
    public createResponse() {}
    public getTypeName() { return 'ActionPostReport'; }
}

// @Route("/posts/{PostId}/comments", "POST")
export class CreatePostComment implements IReturn<CreatePostCommentResponse>
{
    public constructor(init?:Partial<CreatePostComment>) { (<any>Object).assign(this, init); }
    public postId: number;
    public replyId: number;
    public content: string;
    public createResponse() { return new CreatePostCommentResponse(); }
    public getTypeName() { return 'CreatePostComment'; }
}

// @Route("/posts/{PostId}/comments/{Id}", "PUT")
export class UpdatePostComment implements IReturn<UpdatePostCommentResponse>
{
    public constructor(init?:Partial<UpdatePostComment>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public content: string;
    public createResponse() { return new UpdatePostCommentResponse(); }
    public getTypeName() { return 'UpdatePostComment'; }
}

// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
export class DeletePostComment implements IReturn<DeletePostCommentResponse>
{
    public constructor(init?:Partial<DeletePostComment>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public createResponse() { return new DeletePostCommentResponse(); }
    public getTypeName() { return 'DeletePostComment'; }
}

// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
export class ActionPostCommentReport implements IReturnVoid
{
    public constructor(init?:Partial<ActionPostCommentReport>) { (<any>Object).assign(this, init); }
    public id: number;
    public postCommentId: number;
    public postId: number;
    public reportAction: ReportAction;
    public createResponse() {}
    public getTypeName() { return 'ActionPostCommentReport'; }
}

// @Route("/user/comments/votes")
export class GetUserPostCommentVotes implements IReturn<GetUserPostCommentVotesResponse>
{
    public constructor(init?:Partial<GetUserPostCommentVotes>) { (<any>Object).assign(this, init); }
    public postId: number;
    public createResponse() { return new GetUserPostCommentVotesResponse(); }
    public getTypeName() { return 'GetUserPostCommentVotes'; }
}

// @Route("/posts/{PostId}/comments/{Id}/pin", "UPDATE")
export class PinPostComment implements IReturn<PinPostCommentResponse>
{
    public constructor(init?:Partial<PinPostComment>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public pin: boolean;
    public createResponse() { return new PinPostCommentResponse(); }
    public getTypeName() { return 'PinPostComment'; }
}

// @Route("/users/by-email")
export class GetUsersByEmails implements IReturn<GetUsersByEmailsResponse>
{
    public constructor(init?:Partial<GetUsersByEmails>) { (<any>Object).assign(this, init); }
    public emails: string[];
    public createResponse() { return new GetUsersByEmailsResponse(); }
    public getTypeName() { return 'GetUsersByEmails'; }
}

// @Route("/user/posts/activity")
export class GetUserPostActivity implements IReturn<GetUserPostActivityResponse>
{
    public constructor(init?:Partial<GetUserPostActivity>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetUserPostActivityResponse(); }
    public getTypeName() { return 'GetUserPostActivity'; }
}

// @Route("/user/organizations")
export class GetUserOrganizations implements IReturn<GetUserOrganizationsResponse>
{
    public constructor(init?:Partial<GetUserOrganizations>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetUserOrganizationsResponse(); }
    public getTypeName() { return 'GetUserOrganizations'; }
}

// @Route("/posts/{Id}/vote", "PUT")
export class UserPostVote implements IReturn<UserPostVoteResponse>
{
    public constructor(init?:Partial<UserPostVote>) { (<any>Object).assign(this, init); }
    public id: number;
    public weight: number;
    public createResponse() { return new UserPostVoteResponse(); }
    public getTypeName() { return 'UserPostVote'; }
}

// @Route("/posts/{Id}/favorite", "PUT")
export class UserPostFavorite implements IReturn<UserPostFavoriteResponse>
{
    public constructor(init?:Partial<UserPostFavorite>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new UserPostFavoriteResponse(); }
    public getTypeName() { return 'UserPostFavorite'; }
}

// @Route("/posts/{Id}/report", "PUT")
export class UserPostReport implements IReturn<UserPostReportResponse>
{
    public constructor(init?:Partial<UserPostReport>) { (<any>Object).assign(this, init); }
    public id: number;
    public flagType: FlagType;
    public reportNotes: string;
    public createResponse() { return new UserPostReportResponse(); }
    public getTypeName() { return 'UserPostReport'; }
}

// @Route("/posts/{PostId}/comments/{Id}", "GET")
export class UserPostCommentVote implements IReturn<UserPostCommentVoteResponse>
{
    public constructor(init?:Partial<UserPostCommentVote>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public weight: number;
    public createResponse() { return new UserPostCommentVoteResponse(); }
    public getTypeName() { return 'UserPostCommentVote'; }
}

// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
export class UserPostCommentReport implements IReturn<UserPostCommentReportResponse>
{
    public constructor(init?:Partial<UserPostCommentReport>) { (<any>Object).assign(this, init); }
    public id: number;
    public postId: number;
    public flagType: FlagType;
    public reportNotes: string;
    public createResponse() { return new UserPostCommentReportResponse(); }
    public getTypeName() { return 'UserPostCommentReport'; }
}

// @Route("/prerender/{Path*}", "PUT")
export class StorePreRender implements IReturnVoid
{
    public constructor(init?:Partial<StorePreRender>) { (<any>Object).assign(this, init); }
    public path: string;
    public createResponse() {}
    public getTypeName() { return 'StorePreRender'; }
}

// @Route("/prerender/{Path*}", "GET")
export class GetPreRender implements IReturn<string>
{
    public constructor(init?:Partial<GetPreRender>) { (<any>Object).assign(this, init); }
    public path: string;
    public createResponse() { return ''; }
    public getTypeName() { return 'GetPreRender'; }
}

// @Route("/my-session")
export class SessionInfo implements IReturn<SessionInfoResponse>
{
    public constructor(init?:Partial<SessionInfo>) { (<any>Object).assign(this, init); }
    public createResponse() { return new SessionInfoResponse(); }
    public getTypeName() { return 'SessionInfo'; }
}

// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
export class SubscribeToOrganization implements IReturnVoid
{
    public constructor(init?:Partial<SubscribeToOrganization>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public postTypes: PostType[];
    public frequency: Frequency;
    public createResponse() {}
    public getTypeName() { return 'SubscribeToOrganization'; }
}

// @Route("/posts/{PostId}/subscribe", "PUT")
export class SubscribeToPost implements IReturnVoid
{
    public constructor(init?:Partial<SubscribeToPost>) { (<any>Object).assign(this, init); }
    public postId: number;
    public createResponse() {}
    public getTypeName() { return 'SubscribeToPost'; }
}

// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
export class DeleteOrganizationSubscription implements IReturnVoid
{
    public constructor(init?:Partial<DeleteOrganizationSubscription>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public createResponse() {}
    public getTypeName() { return 'DeleteOrganizationSubscription'; }
}

// @Route("/posts/{PostId}/subscribe", "DELETE")
export class DeletePostSubscription implements IReturnVoid
{
    public constructor(init?:Partial<DeletePostSubscription>) { (<any>Object).assign(this, init); }
    public postId: number;
    public createResponse() {}
    public getTypeName() { return 'DeletePostSubscription'; }
}

// @Route("/technology/{Slug}/previous-versions", "GET")
export class GetTechnologyPreviousVersions implements IReturn<GetTechnologyPreviousVersionsResponse>
{
    public constructor(init?:Partial<GetTechnologyPreviousVersions>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetTechnologyPreviousVersionsResponse(); }
    public getTypeName() { return 'GetTechnologyPreviousVersions'; }
}

// @Route("/technology", "GET")
export class GetAllTechnologies implements IReturn<GetAllTechnologiesResponse>
{
    public constructor(init?:Partial<GetAllTechnologies>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetAllTechnologiesResponse(); }
    public getTypeName() { return 'GetAllTechnologies'; }
}

// @Route("/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies")
export class FindTechnologies extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>
{
    public constructor(init?:Partial<FindTechnologies>) { super(init); (<any>Object).assign(this, init); }
    public name: string;
    public nameContains: string;
    public createResponse() { return new QueryResponse<Technology>(); }
    public getTypeName() { return 'FindTechnologies'; }
}

// @Route("/technology/query")
export class QueryTechnology extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>
{
    public constructor(init?:Partial<QueryTechnology>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<Technology>(); }
    public getTypeName() { return 'QueryTechnology'; }
}

// @Route("/technology/{Slug}")
export class GetTechnology implements IReturn<GetTechnologyResponse>, IRegisterStats
{
    public constructor(init?:Partial<GetTechnology>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetTechnologyResponse(); }
    public getTypeName() { return 'GetTechnology'; }
}

// @Route("/technology/{Slug}/favorites")
export class GetTechnologyFavoriteDetails implements IReturn<GetTechnologyFavoriteDetailsResponse>
{
    public constructor(init?:Partial<GetTechnologyFavoriteDetails>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetTechnologyFavoriteDetailsResponse(); }
    public getTypeName() { return 'GetTechnologyFavoriteDetails'; }
}

// @Route("/technology", "POST")
export class CreateTechnology implements IReturn<CreateTechnologyResponse>
{
    public constructor(init?:Partial<CreateTechnology>) { (<any>Object).assign(this, init); }
    public name: string;
    public slug: string;
    public vendorName: string;
    public vendorUrl: string;
    public productUrl: string;
    public logoUrl: string;
    public description: string;
    public isLocked: boolean;
    public tier: TechnologyTier;
    public createResponse() { return new CreateTechnologyResponse(); }
    public getTypeName() { return 'CreateTechnology'; }
}

// @Route("/technology/{Id}", "PUT")
export class UpdateTechnology implements IReturn<UpdateTechnologyResponse>
{
    public constructor(init?:Partial<UpdateTechnology>) { (<any>Object).assign(this, init); }
    public id: number;
    public name: string;
    public vendorName: string;
    public vendorUrl: string;
    public productUrl: string;
    public logoUrl: string;
    public description: string;
    public isLocked: boolean;
    public tier: TechnologyTier;
    public createResponse() { return new UpdateTechnologyResponse(); }
    public getTypeName() { return 'UpdateTechnology'; }
}

// @Route("/technology/{Id}", "DELETE")
export class DeleteTechnology implements IReturn<DeleteTechnologyResponse>
{
    public constructor(init?:Partial<DeleteTechnology>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new DeleteTechnologyResponse(); }
    public getTypeName() { return 'DeleteTechnology'; }
}

// @Route("/techstacks/{Slug}/previous-versions", "GET")
export class GetTechnologyStackPreviousVersions implements IReturn<GetTechnologyStackPreviousVersionsResponse>
{
    public constructor(init?:Partial<GetTechnologyStackPreviousVersions>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetTechnologyStackPreviousVersionsResponse(); }
    public getTypeName() { return 'GetTechnologyStackPreviousVersions'; }
}

// @Route("/pagestats/{Type}/{Slug}")
export class GetPageStats implements IReturn<GetPageStatsResponse>
{
    public constructor(init?:Partial<GetPageStats>) { (<any>Object).assign(this, init); }
    public type: string;
    public slug: string;
    public id: number;
    public createResponse() { return new GetPageStatsResponse(); }
    public getTypeName() { return 'GetPageStats'; }
}

// @Route("/cache/clear")
export class ClearCache implements IReturn<string>
{
    public constructor(init?:Partial<ClearCache>) { (<any>Object).assign(this, init); }
    public createResponse() { return ''; }
    public getTypeName() { return 'ClearCache'; }
}

// @Route("/tasks/hourly")
export class HourlyTask implements IReturn<HourlyTaskResponse>
{
    public constructor(init?:Partial<HourlyTask>) { (<any>Object).assign(this, init); }
    public force: boolean;
    public createResponse() { return new HourlyTaskResponse(); }
    public getTypeName() { return 'HourlyTask'; }
}

// @Route("/techstacks/search")
// @AutoQueryViewer(DefaultSearchField="Description", DefaultSearchText="ServiceStack", DefaultSearchType="Contains", Description="Explore different Technology Stacks", IconUrl="material-icons:cloud", Title="Find Technology Stacks")
export class FindTechStacks extends QueryDb<TechnologyStack> implements IReturn<QueryResponse<TechnologyStack>>
{
    public constructor(init?:Partial<FindTechStacks>) { super(init); (<any>Object).assign(this, init); }
    public nameContains: string;
    public createResponse() { return new QueryResponse<TechnologyStack>(); }
    public getTypeName() { return 'FindTechStacks'; }
}

// @Route("/techstacks/query")
export class QueryTechStacks extends QueryDb<TechnologyStack> implements IReturn<QueryResponse<TechnologyStack>>
{
    public constructor(init?:Partial<QueryTechStacks>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<TechnologyStack>(); }
    public getTypeName() { return 'QueryTechStacks'; }
}

// @Route("/overview")
export class Overview implements IReturn<OverviewResponse>
{
    public constructor(init?:Partial<Overview>) { (<any>Object).assign(this, init); }
    public reload: boolean;
    public createResponse() { return new OverviewResponse(); }
    public getTypeName() { return 'Overview'; }
}

// @Route("/app-overview")
export class AppOverview implements IReturn<AppOverviewResponse>
{
    public constructor(init?:Partial<AppOverview>) { (<any>Object).assign(this, init); }
    public reload: boolean;
    public createResponse() { return new AppOverviewResponse(); }
    public getTypeName() { return 'AppOverview'; }
}

// @Route("/techstacks", "GET")
export class GetAllTechnologyStacks implements IReturn<GetAllTechnologyStacksResponse>
{
    public constructor(init?:Partial<GetAllTechnologyStacks>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetAllTechnologyStacksResponse(); }
    public getTypeName() { return 'GetAllTechnologyStacks'; }
}

// @Route("/techstacks/{Slug}", "GET")
export class GetTechnologyStack implements IReturn<GetTechnologyStackResponse>, IRegisterStats
{
    public constructor(init?:Partial<GetTechnologyStack>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetTechnologyStackResponse(); }
    public getTypeName() { return 'GetTechnologyStack'; }
}

// @Route("/techstacks/{Slug}/favorites")
export class GetTechnologyStackFavoriteDetails implements IReturn<GetTechnologyStackFavoriteDetailsResponse>
{
    public constructor(init?:Partial<GetTechnologyStackFavoriteDetails>) { (<any>Object).assign(this, init); }
    public slug: string;
    public createResponse() { return new GetTechnologyStackFavoriteDetailsResponse(); }
    public getTypeName() { return 'GetTechnologyStackFavoriteDetails'; }
}

// @Route("/config")
export class GetConfig implements IReturn<GetConfigResponse>
{
    public constructor(init?:Partial<GetConfig>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetConfigResponse(); }
    public getTypeName() { return 'GetConfig'; }
}

// @Route("/techstacks", "POST")
export class CreateTechnologyStack implements IReturn<CreateTechnologyStackResponse>
{
    public constructor(init?:Partial<CreateTechnologyStack>) { (<any>Object).assign(this, init); }
    public name: string;
    public slug: string;
    public vendorName: string;
    public appUrl: string;
    public screenshotUrl: string;
    public description: string;
    public details: string;
    public isLocked: boolean;
    public technologyIds: number[];
    public createResponse() { return new CreateTechnologyStackResponse(); }
    public getTypeName() { return 'CreateTechnologyStack'; }
}

// @Route("/techstacks/{Id}", "PUT")
export class UpdateTechnologyStack implements IReturn<UpdateTechnologyStackResponse>
{
    public constructor(init?:Partial<UpdateTechnologyStack>) { (<any>Object).assign(this, init); }
    public id: number;
    public name: string;
    public vendorName: string;
    public appUrl: string;
    public screenshotUrl: string;
    public description: string;
    public details: string;
    public isLocked: boolean;
    public technologyIds: number[];
    public createResponse() { return new UpdateTechnologyStackResponse(); }
    public getTypeName() { return 'UpdateTechnologyStack'; }
}

// @Route("/techstacks/{Id}", "DELETE")
export class DeleteTechnologyStack implements IReturn<DeleteTechnologyStackResponse>
{
    public constructor(init?:Partial<DeleteTechnologyStack>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new DeleteTechnologyStackResponse(); }
    public getTypeName() { return 'DeleteTechnologyStack'; }
}

// @Route("/favorites/techtacks", "GET")
export class GetFavoriteTechStack implements IReturn<GetFavoriteTechStackResponse>
{
    public constructor(init?:Partial<GetFavoriteTechStack>) { (<any>Object).assign(this, init); }
    public technologyStackId: number;
    public createResponse() { return new GetFavoriteTechStackResponse(); }
    public getTypeName() { return 'GetFavoriteTechStack'; }
}

// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
export class AddFavoriteTechStack implements IReturn<FavoriteTechStackResponse>
{
    public constructor(init?:Partial<AddFavoriteTechStack>) { (<any>Object).assign(this, init); }
    public technologyStackId: number;
    public createResponse() { return new FavoriteTechStackResponse(); }
    public getTypeName() { return 'AddFavoriteTechStack'; }
}

// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
export class RemoveFavoriteTechStack implements IReturn<FavoriteTechStackResponse>
{
    public constructor(init?:Partial<RemoveFavoriteTechStack>) { (<any>Object).assign(this, init); }
    public technologyStackId: number;
    public createResponse() { return new FavoriteTechStackResponse(); }
    public getTypeName() { return 'RemoveFavoriteTechStack'; }
}

// @Route("/favorites/technology", "GET")
export class GetFavoriteTechnologies implements IReturn<GetFavoriteTechnologiesResponse>
{
    public constructor(init?:Partial<GetFavoriteTechnologies>) { (<any>Object).assign(this, init); }
    public technologyId: number;
    public createResponse() { return new GetFavoriteTechnologiesResponse(); }
    public getTypeName() { return 'GetFavoriteTechnologies'; }
}

// @Route("/favorites/technology/{TechnologyId}", "PUT")
export class AddFavoriteTechnology implements IReturn<FavoriteTechnologyResponse>
{
    public constructor(init?:Partial<AddFavoriteTechnology>) { (<any>Object).assign(this, init); }
    public technologyId: number;
    public createResponse() { return new FavoriteTechnologyResponse(); }
    public getTypeName() { return 'AddFavoriteTechnology'; }
}

// @Route("/favorites/technology/{TechnologyId}", "DELETE")
export class RemoveFavoriteTechnology implements IReturn<FavoriteTechnologyResponse>
{
    public constructor(init?:Partial<RemoveFavoriteTechnology>) { (<any>Object).assign(this, init); }
    public technologyId: number;
    public createResponse() { return new FavoriteTechnologyResponse(); }
    public getTypeName() { return 'RemoveFavoriteTechnology'; }
}

// @Route("/my-feed")
export class GetUserFeed implements IReturn<GetUserFeedResponse>
{
    public constructor(init?:Partial<GetUserFeed>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetUserFeedResponse(); }
    public getTypeName() { return 'GetUserFeed'; }
}

// @Route("/users/karma", "GET")
export class GetUsersKarma implements IReturn<GetUsersKarmaResponse>
{
    public constructor(init?:Partial<GetUsersKarma>) { (<any>Object).assign(this, init); }
    public userIds: number[];
    public createResponse() { return new GetUsersKarmaResponse(); }
    public getTypeName() { return 'GetUsersKarma'; }
}

// @Route("/userinfo/{UserName}")
export class GetUserInfo implements IReturn<GetUserInfoResponse>
{
    public constructor(init?:Partial<GetUserInfo>) { (<any>Object).assign(this, init); }
    public userName: string;
    public createResponse() { return new GetUserInfoResponse(); }
    public getTypeName() { return 'GetUserInfo'; }
}

// @Route("/users/{UserName}/avatar", "GET")
export class UserAvatar
{
    public constructor(init?:Partial<UserAvatar>) { (<any>Object).assign(this, init); }
    public userName: string;
}

// @Route("/mq/start")
export class MqStart implements IReturn<string>
{
    public constructor(init?:Partial<MqStart>) { (<any>Object).assign(this, init); }
    public createResponse() { return ''; }
    public getTypeName() { return 'MqStart'; }
}

// @Route("/mq/stop")
export class MqStop implements IReturn<string>
{
    public constructor(init?:Partial<MqStop>) { (<any>Object).assign(this, init); }
    public createResponse() { return ''; }
    public getTypeName() { return 'MqStop'; }
}

// @Route("/mq/stats")
export class MqStats implements IReturn<string>
{
    public constructor(init?:Partial<MqStats>) { (<any>Object).assign(this, init); }
    public createResponse() { return ''; }
    public getTypeName() { return 'MqStats'; }
}

// @Route("/mq/status")
export class MqStatus implements IReturn<string>
{
    public constructor(init?:Partial<MqStatus>) { (<any>Object).assign(this, init); }
    public createResponse() { return ''; }
    public getTypeName() { return 'MqStatus'; }
}

// @Route("/sync/discourse/{Site}")
export class SyncDiscourseSite implements IReturn<SyncDiscourseSiteResponse>
{
    public constructor(init?:Partial<SyncDiscourseSite>) { (<any>Object).assign(this, init); }
    public site: string;
    public createResponse() { return new SyncDiscourseSiteResponse(); }
    public getTypeName() { return 'SyncDiscourseSite'; }
}

// @Route("/admin/technology/{TechnologyId}/logo")
export class LogoUrlApproval implements IReturn<LogoUrlApprovalResponse>
{
    public constructor(init?:Partial<LogoUrlApproval>) { (<any>Object).assign(this, init); }
    public technologyId: number;
    public approved: boolean;
    public createResponse() { return new LogoUrlApprovalResponse(); }
    public getTypeName() { return 'LogoUrlApproval'; }
}

// @Route("/admin/techstacks/{TechnologyStackId}/lock")
export class LockTechStack implements IReturn<LockStackResponse>
{
    public constructor(init?:Partial<LockTechStack>) { (<any>Object).assign(this, init); }
    public technologyStackId: number;
    public isLocked: boolean;
    public createResponse() { return new LockStackResponse(); }
    public getTypeName() { return 'LockTechStack'; }
}

// @Route("/admin/technology/{TechnologyId}/lock")
export class LockTech implements IReturn<LockStackResponse>
{
    public constructor(init?:Partial<LockTech>) { (<any>Object).assign(this, init); }
    public technologyId: number;
    public isLocked: boolean;
    public createResponse() { return new LockStackResponse(); }
    public getTypeName() { return 'LockTech'; }
}

// @Route("/email/post/{PostId}")
export class EmailTest implements IReturn<EmailTestRespoonse>
{
    public constructor(init?:Partial<EmailTest>) { (<any>Object).assign(this, init); }
    public postId: number;
    public createResponse() { return new EmailTestRespoonse(); }
    public getTypeName() { return 'EmailTest'; }
}

export class ImportUser implements IReturn<ImportUserResponse>
{
    public constructor(init?:Partial<ImportUser>) { (<any>Object).assign(this, init); }
    public userName: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public displayName: string;
    public company: string;
    public refSource: string;
    public refId: number;
    public refIdStr: string;
    public refUrn: string;
    public defaultProfileUrl: string;
    public meta: { [index:string]: string; };
    public createResponse() { return new ImportUserResponse(); }
    public getTypeName() { return 'ImportUser'; }
}

// @Route("/import/uservoice/suggestion")
export class ImportUserVoiceSuggestion implements IReturn<ImportUserVoiceSuggestionResponse>
{
    public constructor(init?:Partial<ImportUserVoiceSuggestion>) { (<any>Object).assign(this, init); }
    public organizationId: number;
    public url: string;
    public id: number;
    public topicId: number;
    public state: string;
    public title: string;
    public slug: string;
    public category: string;
    public text: string;
    public formattedText: string;
    public voteCount: number;
    public closedAt: string;
    public statusKey: string;
    public statusHexColor: string;
    public statusChangedBy: UserVoiceUser;
    public creator: UserVoiceUser;
    public response: UserVoiceComment;
    public createdAt: string;
    public updatedAt: string;
    public createResponse() { return new ImportUserVoiceSuggestionResponse(); }
    public getTypeName() { return 'ImportUserVoiceSuggestion'; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    public constructor(init?:Partial<Authenticate>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe: boolean;

    // @DataMember(Order=8)
    public continue: string;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=16)
    public useTokenCookie: boolean;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public meta: { [index:string]: string; };
    public createResponse() { return new AuthenticateResponse(); }
    public getTypeName() { return 'Authenticate'; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    public constructor(init?:Partial<AssignRoles>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];
    public createResponse() { return new AssignRolesResponse(); }
    public getTypeName() { return 'AssignRoles'; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    public constructor(init?:Partial<UnAssignRoles>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];
    public createResponse() { return new UnAssignRolesResponse(); }
    public getTypeName() { return 'UnAssignRoles'; }
}

// @Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>, IPost
{
    public constructor(init?:Partial<ConvertSessionToToken>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public preserveSession: boolean;
    public createResponse() { return new ConvertSessionToTokenResponse(); }
    public getTypeName() { return 'ConvertSessionToToken'; }
}

// @Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>, IPost
{
    public constructor(init?:Partial<GetAccessToken>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public refreshToken: string;
    public createResponse() { return new GetAccessTokenResponse(); }
    public getTypeName() { return 'GetAccessToken'; }
}

// @Route("/posts/comment", "GET")
export class QueryPostComments extends QueryDb<PostComment> implements IReturn<QueryResponse<PostComment>>
{
    public constructor(init?:Partial<QueryPostComments>) { super(init); (<any>Object).assign(this, init); }
    public userId: number;
    public postId: number;
    public createResponse() { return new QueryResponse<PostComment>(); }
    public getTypeName() { return 'QueryPostComments'; }
}

// @Route("/admin/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies Admin")
export class FindTechnologiesAdmin extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>
{
    public constructor(init?:Partial<FindTechnologiesAdmin>) { super(init); (<any>Object).assign(this, init); }
    public name: string;
    public createResponse() { return new QueryResponse<Technology>(); }
    public getTypeName() { return 'FindTechnologiesAdmin'; }
}

