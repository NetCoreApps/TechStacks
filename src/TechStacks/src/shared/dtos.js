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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError() {
    }
    return ResponseError;
}());
export { ResponseError };
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus() {
    }
    return ResponseStatus;
}());
export { ResponseStatus };
var TechnologyBase = /** @class */ (function () {
    function TechnologyBase() {
    }
    return TechnologyBase;
}());
export { TechnologyBase };
var TechnologyHistory = /** @class */ (function (_super) {
    __extends(TechnologyHistory, _super);
    function TechnologyHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyHistory;
}(TechnologyBase));
export { TechnologyHistory };
var Technology = /** @class */ (function (_super) {
    __extends(Technology, _super);
    function Technology() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Technology;
}(TechnologyBase));
export { Technology };
var QueryBase = /** @class */ (function () {
    function QueryBase() {
    }
    return QueryBase;
}());
export { QueryBase };
var QueryDb = /** @class */ (function (_super) {
    __extends(QueryDb, _super);
    function QueryDb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueryDb;
}(QueryBase));
export { QueryDb };
var TechnologyStackBase = /** @class */ (function () {
    function TechnologyStackBase() {
    }
    return TechnologyStackBase;
}());
export { TechnologyStackBase };
var TechnologyStack = /** @class */ (function (_super) {
    __extends(TechnologyStack, _super);
    function TechnologyStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyStack;
}(TechnologyStackBase));
export { TechnologyStack };
var TechnologyStackHistory = /** @class */ (function (_super) {
    __extends(TechnologyStackHistory, _super);
    function TechnologyStackHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyStackHistory;
}(TechnologyStackBase));
export { TechnologyStackHistory };
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
export { UserInfo };
var TechnologyInfo = /** @class */ (function () {
    function TechnologyInfo() {
    }
    return TechnologyInfo;
}());
export { TechnologyInfo };
var TechnologyInStack = /** @class */ (function (_super) {
    __extends(TechnologyInStack, _super);
    function TechnologyInStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyInStack;
}(TechnologyBase));
export { TechnologyInStack };
var TechStackDetails = /** @class */ (function (_super) {
    __extends(TechStackDetails, _super);
    function TechStackDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechStackDetails;
}(TechnologyStackBase));
export { TechStackDetails };
// @DataContract
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
export { Option };
var SessionInfoResponse = /** @class */ (function () {
    function SessionInfoResponse() {
    }
    return SessionInfoResponse;
}());
export { SessionInfoResponse };
var GetTechnologyPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyPreviousVersionsResponse() {
    }
    return GetTechnologyPreviousVersionsResponse;
}());
export { GetTechnologyPreviousVersionsResponse };
var GetAllTechnologiesResponse = /** @class */ (function () {
    function GetAllTechnologiesResponse() {
    }
    return GetAllTechnologiesResponse;
}());
export { GetAllTechnologiesResponse };
// @DataContract
var QueryResponse = /** @class */ (function () {
    function QueryResponse() {
    }
    return QueryResponse;
}());
export { QueryResponse };
var GetTechnologyResponse = /** @class */ (function () {
    function GetTechnologyResponse() {
    }
    return GetTechnologyResponse;
}());
export { GetTechnologyResponse };
var GetTechnologyFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyFavoriteDetailsResponse() {
    }
    return GetTechnologyFavoriteDetailsResponse;
}());
export { GetTechnologyFavoriteDetailsResponse };
var CreateTechnologyResponse = /** @class */ (function () {
    function CreateTechnologyResponse() {
    }
    return CreateTechnologyResponse;
}());
export { CreateTechnologyResponse };
var UpdateTechnologyResponse = /** @class */ (function () {
    function UpdateTechnologyResponse() {
    }
    return UpdateTechnologyResponse;
}());
export { UpdateTechnologyResponse };
var DeleteTechnologyResponse = /** @class */ (function () {
    function DeleteTechnologyResponse() {
    }
    return DeleteTechnologyResponse;
}());
export { DeleteTechnologyResponse };
var GetTechnologyStackPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyStackPreviousVersionsResponse() {
    }
    return GetTechnologyStackPreviousVersionsResponse;
}());
export { GetTechnologyStackPreviousVersionsResponse };
var GetPageStatsResponse = /** @class */ (function () {
    function GetPageStatsResponse() {
    }
    return GetPageStatsResponse;
}());
export { GetPageStatsResponse };
var HourlyTaskResponse = /** @class */ (function () {
    function HourlyTaskResponse() {
    }
    return HourlyTaskResponse;
}());
export { HourlyTaskResponse };
var OverviewResponse = /** @class */ (function () {
    function OverviewResponse() {
    }
    return OverviewResponse;
}());
export { OverviewResponse };
var AppOverviewResponse = /** @class */ (function () {
    function AppOverviewResponse() {
    }
    return AppOverviewResponse;
}());
export { AppOverviewResponse };
var GetAllTechnologyStacksResponse = /** @class */ (function () {
    function GetAllTechnologyStacksResponse() {
    }
    return GetAllTechnologyStacksResponse;
}());
export { GetAllTechnologyStacksResponse };
var GetTechnologyStackResponse = /** @class */ (function () {
    function GetTechnologyStackResponse() {
    }
    return GetTechnologyStackResponse;
}());
export { GetTechnologyStackResponse };
var GetTechnologyStackFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetailsResponse() {
    }
    return GetTechnologyStackFavoriteDetailsResponse;
}());
export { GetTechnologyStackFavoriteDetailsResponse };
var GetConfigResponse = /** @class */ (function () {
    function GetConfigResponse() {
    }
    return GetConfigResponse;
}());
export { GetConfigResponse };
var CreateTechnologyStackResponse = /** @class */ (function () {
    function CreateTechnologyStackResponse() {
    }
    return CreateTechnologyStackResponse;
}());
export { CreateTechnologyStackResponse };
var UpdateTechnologyStackResponse = /** @class */ (function () {
    function UpdateTechnologyStackResponse() {
    }
    return UpdateTechnologyStackResponse;
}());
export { UpdateTechnologyStackResponse };
var DeleteTechnologyStackResponse = /** @class */ (function () {
    function DeleteTechnologyStackResponse() {
    }
    return DeleteTechnologyStackResponse;
}());
export { DeleteTechnologyStackResponse };
var GetFavoriteTechStackResponse = /** @class */ (function () {
    function GetFavoriteTechStackResponse() {
    }
    return GetFavoriteTechStackResponse;
}());
export { GetFavoriteTechStackResponse };
var FavoriteTechStackResponse = /** @class */ (function () {
    function FavoriteTechStackResponse() {
    }
    return FavoriteTechStackResponse;
}());
export { FavoriteTechStackResponse };
var GetFavoriteTechnologiesResponse = /** @class */ (function () {
    function GetFavoriteTechnologiesResponse() {
    }
    return GetFavoriteTechnologiesResponse;
}());
export { GetFavoriteTechnologiesResponse };
var FavoriteTechnologyResponse = /** @class */ (function () {
    function FavoriteTechnologyResponse() {
    }
    return FavoriteTechnologyResponse;
}());
export { FavoriteTechnologyResponse };
var GetUserFeedResponse = /** @class */ (function () {
    function GetUserFeedResponse() {
    }
    return GetUserFeedResponse;
}());
export { GetUserFeedResponse };
var GetUserInfoResponse = /** @class */ (function () {
    function GetUserInfoResponse() {
    }
    return GetUserInfoResponse;
}());
export { GetUserInfoResponse };
var LogoUrlApprovalResponse = /** @class */ (function () {
    function LogoUrlApprovalResponse() {
    }
    return LogoUrlApprovalResponse;
}());
export { LogoUrlApprovalResponse };
var LockStackResponse = /** @class */ (function () {
    function LockStackResponse() {
    }
    return LockStackResponse;
}());
export { LockStackResponse };
// @DataContract
var AuthenticateResponse = /** @class */ (function () {
    function AuthenticateResponse() {
    }
    return AuthenticateResponse;
}());
export { AuthenticateResponse };
// @DataContract
var AssignRolesResponse = /** @class */ (function () {
    function AssignRolesResponse() {
    }
    return AssignRolesResponse;
}());
export { AssignRolesResponse };
// @DataContract
var UnAssignRolesResponse = /** @class */ (function () {
    function UnAssignRolesResponse() {
    }
    return UnAssignRolesResponse;
}());
export { UnAssignRolesResponse };
// @DataContract
var ConvertSessionToTokenResponse = /** @class */ (function () {
    function ConvertSessionToTokenResponse() {
    }
    return ConvertSessionToTokenResponse;
}());
export { ConvertSessionToTokenResponse };
// @DataContract
var GetAccessTokenResponse = /** @class */ (function () {
    function GetAccessTokenResponse() {
    }
    return GetAccessTokenResponse;
}());
export { GetAccessTokenResponse };
// @Route("/ping")
var Ping = /** @class */ (function () {
    function Ping() {
    }
    return Ping;
}());
export { Ping };
// @Route("/my-session")
var SessionInfo = /** @class */ (function () {
    function SessionInfo() {
    }
    SessionInfo.prototype.createResponse = function () { return new SessionInfoResponse(); };
    SessionInfo.prototype.getTypeName = function () { return "SessionInfo"; };
    return SessionInfo;
}());
export { SessionInfo };
// @Route("/technology/{Slug}/previous-versions", "GET")
var GetTechnologyPreviousVersions = /** @class */ (function () {
    function GetTechnologyPreviousVersions() {
    }
    GetTechnologyPreviousVersions.prototype.createResponse = function () { return new GetTechnologyPreviousVersionsResponse(); };
    GetTechnologyPreviousVersions.prototype.getTypeName = function () { return "GetTechnologyPreviousVersions"; };
    return GetTechnologyPreviousVersions;
}());
export { GetTechnologyPreviousVersions };
// @Route("/technology", "GET")
var GetAllTechnologies = /** @class */ (function () {
    function GetAllTechnologies() {
    }
    GetAllTechnologies.prototype.createResponse = function () { return new GetAllTechnologiesResponse(); };
    GetAllTechnologies.prototype.getTypeName = function () { return "GetAllTechnologies"; };
    return GetAllTechnologies;
}());
export { GetAllTechnologies };
// @Route("/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies")
var FindTechnologies = /** @class */ (function (_super) {
    __extends(FindTechnologies, _super);
    function FindTechnologies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindTechnologies.prototype.createResponse = function () { return new QueryResponse(); };
    FindTechnologies.prototype.getTypeName = function () { return "FindTechnologies"; };
    return FindTechnologies;
}(QueryDb));
export { FindTechnologies };
// @Route("/technology/query")
var QueryTechnology = /** @class */ (function (_super) {
    __extends(QueryTechnology, _super);
    function QueryTechnology() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTechnology.prototype.createResponse = function () { return new QueryResponse(); };
    QueryTechnology.prototype.getTypeName = function () { return "QueryTechnology"; };
    return QueryTechnology;
}(QueryDb));
export { QueryTechnology };
// @Route("/technology/{Slug}")
var GetTechnology = /** @class */ (function () {
    function GetTechnology() {
    }
    GetTechnology.prototype.createResponse = function () { return new GetTechnologyResponse(); };
    GetTechnology.prototype.getTypeName = function () { return "GetTechnology"; };
    return GetTechnology;
}());
export { GetTechnology };
// @Route("/technology/{Slug}/favorites")
var GetTechnologyFavoriteDetails = /** @class */ (function () {
    function GetTechnologyFavoriteDetails() {
    }
    GetTechnologyFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyFavoriteDetailsResponse(); };
    GetTechnologyFavoriteDetails.prototype.getTypeName = function () { return "GetTechnologyFavoriteDetails"; };
    return GetTechnologyFavoriteDetails;
}());
export { GetTechnologyFavoriteDetails };
// @Route("/technology", "POST")
var CreateTechnology = /** @class */ (function () {
    function CreateTechnology() {
    }
    CreateTechnology.prototype.createResponse = function () { return new CreateTechnologyResponse(); };
    CreateTechnology.prototype.getTypeName = function () { return "CreateTechnology"; };
    return CreateTechnology;
}());
export { CreateTechnology };
// @Route("/technology/{Id}", "PUT")
var UpdateTechnology = /** @class */ (function () {
    function UpdateTechnology() {
    }
    UpdateTechnology.prototype.createResponse = function () { return new UpdateTechnologyResponse(); };
    UpdateTechnology.prototype.getTypeName = function () { return "UpdateTechnology"; };
    return UpdateTechnology;
}());
export { UpdateTechnology };
// @Route("/technology/{Id}", "DELETE")
var DeleteTechnology = /** @class */ (function () {
    function DeleteTechnology() {
    }
    DeleteTechnology.prototype.createResponse = function () { return new DeleteTechnologyResponse(); };
    DeleteTechnology.prototype.getTypeName = function () { return "DeleteTechnology"; };
    return DeleteTechnology;
}());
export { DeleteTechnology };
// @Route("/techstacks/{Slug}/previous-versions", "GET")
var GetTechnologyStackPreviousVersions = /** @class */ (function () {
    function GetTechnologyStackPreviousVersions() {
    }
    GetTechnologyStackPreviousVersions.prototype.createResponse = function () { return new GetTechnologyStackPreviousVersionsResponse(); };
    GetTechnologyStackPreviousVersions.prototype.getTypeName = function () { return "GetTechnologyStackPreviousVersions"; };
    return GetTechnologyStackPreviousVersions;
}());
export { GetTechnologyStackPreviousVersions };
// @Route("/pagestats/{Type}/{Slug}")
var GetPageStats = /** @class */ (function () {
    function GetPageStats() {
    }
    GetPageStats.prototype.createResponse = function () { return new GetPageStatsResponse(); };
    GetPageStats.prototype.getTypeName = function () { return "GetPageStats"; };
    return GetPageStats;
}());
export { GetPageStats };
// @Route("/tasks/hourly")
var HourlyTask = /** @class */ (function () {
    function HourlyTask() {
    }
    HourlyTask.prototype.createResponse = function () { return new HourlyTaskResponse(); };
    HourlyTask.prototype.getTypeName = function () { return "HourlyTask"; };
    return HourlyTask;
}());
export { HourlyTask };
// @Route("/techstacks/search")
// @AutoQueryViewer(DefaultSearchField="Description", DefaultSearchText="ServiceStack", DefaultSearchType="Contains", Description="Explore different Technology Stacks", IconUrl="material-icons:cloud", Title="Find Technology Stacks")
var FindTechStacks = /** @class */ (function (_super) {
    __extends(FindTechStacks, _super);
    function FindTechStacks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindTechStacks.prototype.createResponse = function () { return new QueryResponse(); };
    FindTechStacks.prototype.getTypeName = function () { return "FindTechStacks"; };
    return FindTechStacks;
}(QueryDb));
export { FindTechStacks };
// @Route("/techstacks/query")
var QueryTechStacks = /** @class */ (function (_super) {
    __extends(QueryTechStacks, _super);
    function QueryTechStacks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTechStacks.prototype.createResponse = function () { return new QueryResponse(); };
    QueryTechStacks.prototype.getTypeName = function () { return "QueryTechStacks"; };
    return QueryTechStacks;
}(QueryDb));
export { QueryTechStacks };
// @Route("/overview")
var Overview = /** @class */ (function () {
    function Overview() {
    }
    Overview.prototype.createResponse = function () { return new OverviewResponse(); };
    Overview.prototype.getTypeName = function () { return "Overview"; };
    return Overview;
}());
export { Overview };
// @Route("/app-overview")
var AppOverview = /** @class */ (function () {
    function AppOverview() {
    }
    AppOverview.prototype.createResponse = function () { return new AppOverviewResponse(); };
    AppOverview.prototype.getTypeName = function () { return "AppOverview"; };
    return AppOverview;
}());
export { AppOverview };
// @Route("/techstacks", "GET")
var GetAllTechnologyStacks = /** @class */ (function () {
    function GetAllTechnologyStacks() {
    }
    GetAllTechnologyStacks.prototype.createResponse = function () { return new GetAllTechnologyStacksResponse(); };
    GetAllTechnologyStacks.prototype.getTypeName = function () { return "GetAllTechnologyStacks"; };
    return GetAllTechnologyStacks;
}());
export { GetAllTechnologyStacks };
// @Route("/techstacks/{Slug}", "GET")
var GetTechnologyStack = /** @class */ (function () {
    function GetTechnologyStack() {
    }
    GetTechnologyStack.prototype.createResponse = function () { return new GetTechnologyStackResponse(); };
    GetTechnologyStack.prototype.getTypeName = function () { return "GetTechnologyStack"; };
    return GetTechnologyStack;
}());
export { GetTechnologyStack };
// @Route("/techstacks/{Slug}/favorites")
var GetTechnologyStackFavoriteDetails = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetails() {
    }
    GetTechnologyStackFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyStackFavoriteDetailsResponse(); };
    GetTechnologyStackFavoriteDetails.prototype.getTypeName = function () { return "GetTechnologyStackFavoriteDetails"; };
    return GetTechnologyStackFavoriteDetails;
}());
export { GetTechnologyStackFavoriteDetails };
// @Route("/config")
var GetConfig = /** @class */ (function () {
    function GetConfig() {
    }
    GetConfig.prototype.createResponse = function () { return new GetConfigResponse(); };
    GetConfig.prototype.getTypeName = function () { return "GetConfig"; };
    return GetConfig;
}());
export { GetConfig };
// @Route("/techstacks", "POST")
var CreateTechnologyStack = /** @class */ (function () {
    function CreateTechnologyStack() {
    }
    CreateTechnologyStack.prototype.createResponse = function () { return new CreateTechnologyStackResponse(); };
    CreateTechnologyStack.prototype.getTypeName = function () { return "CreateTechnologyStack"; };
    return CreateTechnologyStack;
}());
export { CreateTechnologyStack };
// @Route("/techstacks/{Id}", "PUT")
var UpdateTechnologyStack = /** @class */ (function () {
    function UpdateTechnologyStack() {
    }
    UpdateTechnologyStack.prototype.createResponse = function () { return new UpdateTechnologyStackResponse(); };
    UpdateTechnologyStack.prototype.getTypeName = function () { return "UpdateTechnologyStack"; };
    return UpdateTechnologyStack;
}());
export { UpdateTechnologyStack };
// @Route("/techstacks/{Id}", "DELETE")
var DeleteTechnologyStack = /** @class */ (function () {
    function DeleteTechnologyStack() {
    }
    DeleteTechnologyStack.prototype.createResponse = function () { return new DeleteTechnologyStackResponse(); };
    DeleteTechnologyStack.prototype.getTypeName = function () { return "DeleteTechnologyStack"; };
    return DeleteTechnologyStack;
}());
export { DeleteTechnologyStack };
// @Route("/favorites/techtacks", "GET")
var GetFavoriteTechStack = /** @class */ (function () {
    function GetFavoriteTechStack() {
    }
    GetFavoriteTechStack.prototype.createResponse = function () { return new GetFavoriteTechStackResponse(); };
    GetFavoriteTechStack.prototype.getTypeName = function () { return "GetFavoriteTechStack"; };
    return GetFavoriteTechStack;
}());
export { GetFavoriteTechStack };
// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
var AddFavoriteTechStack = /** @class */ (function () {
    function AddFavoriteTechStack() {
    }
    AddFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    AddFavoriteTechStack.prototype.getTypeName = function () { return "AddFavoriteTechStack"; };
    return AddFavoriteTechStack;
}());
export { AddFavoriteTechStack };
// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
var RemoveFavoriteTechStack = /** @class */ (function () {
    function RemoveFavoriteTechStack() {
    }
    RemoveFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    RemoveFavoriteTechStack.prototype.getTypeName = function () { return "RemoveFavoriteTechStack"; };
    return RemoveFavoriteTechStack;
}());
export { RemoveFavoriteTechStack };
// @Route("/favorites/technology", "GET")
var GetFavoriteTechnologies = /** @class */ (function () {
    function GetFavoriteTechnologies() {
    }
    GetFavoriteTechnologies.prototype.createResponse = function () { return new GetFavoriteTechnologiesResponse(); };
    GetFavoriteTechnologies.prototype.getTypeName = function () { return "GetFavoriteTechnologies"; };
    return GetFavoriteTechnologies;
}());
export { GetFavoriteTechnologies };
// @Route("/favorites/technology/{TechnologyId}", "PUT")
var AddFavoriteTechnology = /** @class */ (function () {
    function AddFavoriteTechnology() {
    }
    AddFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    AddFavoriteTechnology.prototype.getTypeName = function () { return "AddFavoriteTechnology"; };
    return AddFavoriteTechnology;
}());
export { AddFavoriteTechnology };
// @Route("/favorites/technology/{TechnologyId}", "DELETE")
var RemoveFavoriteTechnology = /** @class */ (function () {
    function RemoveFavoriteTechnology() {
    }
    RemoveFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    RemoveFavoriteTechnology.prototype.getTypeName = function () { return "RemoveFavoriteTechnology"; };
    return RemoveFavoriteTechnology;
}());
export { RemoveFavoriteTechnology };
// @Route("/my-feed")
var GetUserFeed = /** @class */ (function () {
    function GetUserFeed() {
    }
    GetUserFeed.prototype.createResponse = function () { return new GetUserFeedResponse(); };
    GetUserFeed.prototype.getTypeName = function () { return "GetUserFeed"; };
    return GetUserFeed;
}());
export { GetUserFeed };
// @Route("/userinfo/{UserName}")
var GetUserInfo = /** @class */ (function () {
    function GetUserInfo() {
    }
    GetUserInfo.prototype.createResponse = function () { return new GetUserInfoResponse(); };
    GetUserInfo.prototype.getTypeName = function () { return "GetUserInfo"; };
    return GetUserInfo;
}());
export { GetUserInfo };
// @Route("/admin/technology/{TechnologyId}/logo")
var LogoUrlApproval = /** @class */ (function () {
    function LogoUrlApproval() {
    }
    LogoUrlApproval.prototype.createResponse = function () { return new LogoUrlApprovalResponse(); };
    LogoUrlApproval.prototype.getTypeName = function () { return "LogoUrlApproval"; };
    return LogoUrlApproval;
}());
export { LogoUrlApproval };
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
var LockTechStack = /** @class */ (function () {
    function LockTechStack() {
    }
    LockTechStack.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTechStack.prototype.getTypeName = function () { return "LockTechStack"; };
    return LockTechStack;
}());
export { LockTechStack };
// @Route("/admin/technology/{TechnologyId}/lock")
var LockTech = /** @class */ (function () {
    function LockTech() {
    }
    LockTech.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTech.prototype.getTypeName = function () { return "LockTech"; };
    return LockTech;
}());
export { LockTech };
// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate() {
    }
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    Authenticate.prototype.getTypeName = function () { return "Authenticate"; };
    return Authenticate;
}());
export { Authenticate };
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles() {
    }
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    AssignRoles.prototype.getTypeName = function () { return "AssignRoles"; };
    return AssignRoles;
}());
export { AssignRoles };
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles() {
    }
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    UnAssignRoles.prototype.getTypeName = function () { return "UnAssignRoles"; };
    return UnAssignRoles;
}());
export { UnAssignRoles };
// @Route("/session-to-token")
// @DataContract
var ConvertSessionToToken = /** @class */ (function () {
    function ConvertSessionToToken() {
    }
    ConvertSessionToToken.prototype.createResponse = function () { return new ConvertSessionToTokenResponse(); };
    ConvertSessionToToken.prototype.getTypeName = function () { return "ConvertSessionToToken"; };
    return ConvertSessionToToken;
}());
export { ConvertSessionToToken };
// @Route("/access-token")
// @DataContract
var GetAccessToken = /** @class */ (function () {
    function GetAccessToken() {
    }
    GetAccessToken.prototype.createResponse = function () { return new GetAccessTokenResponse(); };
    GetAccessToken.prototype.getTypeName = function () { return "GetAccessToken"; };
    return GetAccessToken;
}());
export { GetAccessToken };
// @Route("/admin/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies Admin")
var FindTechnologiesAdmin = /** @class */ (function (_super) {
    __extends(FindTechnologiesAdmin, _super);
    function FindTechnologiesAdmin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindTechnologiesAdmin.prototype.createResponse = function () { return new QueryResponse(); };
    FindTechnologiesAdmin.prototype.getTypeName = function () { return "FindTechnologiesAdmin"; };
    return FindTechnologiesAdmin;
}(QueryDb));
export { FindTechnologiesAdmin };
