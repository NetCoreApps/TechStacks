/* Options:
Date: 2018-02-05 03:23:32
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
}

export class TechnologyHistory extends TechnologyBase
{
    technologyId: number;
    operation: string;
}

export class Technology extends TechnologyBase
{
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

export interface IRegisterStats
{
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
    details: string;
    lastStatusUpdate: string;
}

export class TechnologyStack extends TechnologyStackBase
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
    detailsHtml: string;
    technologyChoices: TechnologyInStack[];
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

export class SessionInfoResponse
{
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

export class GetUserInfoResponse
{
    userName: string;
    created: string;
    avatarUrl: string;
    techStacks: TechnologyStack[];
    favoriteTechStacks: TechnologyStack[];
    favoriteTechnologies: Technology[];
}

export class LogoUrlApprovalResponse
{
    result: Technology;
}

export class LockStackResponse
{
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

// @Route("/my-session")
export class SessionInfo implements IReturn<SessionInfoResponse>
{
    createResponse() { return new SessionInfoResponse(); }
    getTypeName() { return "SessionInfo"; }
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

// @Route("/userinfo/{UserName}")
export class GetUserInfo implements IReturn<GetUserInfoResponse>
{
    userName: string;
    createResponse() { return new GetUserInfoResponse(); }
    getTypeName() { return "GetUserInfo"; }
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

// @Route("/admin/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies Admin")
export class FindTechnologiesAdmin extends QueryDb<Technology> implements IReturn<QueryResponse<Technology>>, IMeta
{
    name: string;
    createResponse() { return new QueryResponse<Technology>(); }
    getTypeName() { return "FindTechnologiesAdmin"; }
}
