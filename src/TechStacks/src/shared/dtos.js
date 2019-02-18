/* Options:
Date: 2019-02-16 01:34:57
Version: 5.41
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
export var PostType;
(function (PostType) {
    PostType["Announcement"] = "Announcement";
    PostType["Post"] = "Post";
    PostType["Showcase"] = "Showcase";
    PostType["Question"] = "Question";
    PostType["Request"] = "Request";
})(PostType || (PostType = {}));
var Post = /** @class */ (function () {
    function Post(init) {
        Object.assign(this, init);
    }
    return Post;
}());
export { Post };
var Organization = /** @class */ (function () {
    function Organization(init) {
        Object.assign(this, init);
    }
    return Organization;
}());
export { Organization };
var OrganizationLabel = /** @class */ (function () {
    function OrganizationLabel(init) {
        Object.assign(this, init);
    }
    return OrganizationLabel;
}());
export { OrganizationLabel };
var Category = /** @class */ (function () {
    function Category(init) {
        Object.assign(this, init);
    }
    return Category;
}());
export { Category };
var OrganizationMember = /** @class */ (function () {
    function OrganizationMember(init) {
        Object.assign(this, init);
    }
    return OrganizationMember;
}());
export { OrganizationMember };
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError(init) {
        Object.assign(this, init);
    }
    return ResponseError;
}());
export { ResponseError };
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus(init) {
        Object.assign(this, init);
    }
    return ResponseStatus;
}());
export { ResponseStatus };
var OrganizationMemberInvite = /** @class */ (function () {
    function OrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    return OrganizationMemberInvite;
}());
export { OrganizationMemberInvite };
export var FlagType;
(function (FlagType) {
    FlagType["Violation"] = "Violation";
    FlagType["Spam"] = "Spam";
    FlagType["Abusive"] = "Abusive";
    FlagType["Confidential"] = "Confidential";
    FlagType["OffTopic"] = "OffTopic";
    FlagType["Other"] = "Other";
})(FlagType || (FlagType = {}));
var PostReportInfo = /** @class */ (function () {
    function PostReportInfo(init) {
        Object.assign(this, init);
    }
    return PostReportInfo;
}());
export { PostReportInfo };
var PostCommentReportInfo = /** @class */ (function () {
    function PostCommentReportInfo(init) {
        Object.assign(this, init);
    }
    return PostCommentReportInfo;
}());
export { PostCommentReportInfo };
var QueryBase = /** @class */ (function () {
    function QueryBase(init) {
        Object.assign(this, init);
    }
    return QueryBase;
}());
export { QueryBase };
var QueryDb = /** @class */ (function (_super) {
    __extends(QueryDb, _super);
    function QueryDb(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return QueryDb;
}(QueryBase));
export { QueryDb };
var PostComment = /** @class */ (function () {
    function PostComment(init) {
        Object.assign(this, init);
    }
    return PostComment;
}());
export { PostComment };
export var ReportAction;
(function (ReportAction) {
    ReportAction["Dismiss"] = "Dismiss";
    ReportAction["Delete"] = "Delete";
})(ReportAction || (ReportAction = {}));
var UserRef = /** @class */ (function () {
    function UserRef(init) {
        Object.assign(this, init);
    }
    return UserRef;
}());
export { UserRef };
var OrganizationSubscription = /** @class */ (function () {
    function OrganizationSubscription(init) {
        Object.assign(this, init);
    }
    return OrganizationSubscription;
}());
export { OrganizationSubscription };
var TechnologyStackBase = /** @class */ (function () {
    function TechnologyStackBase(init) {
        Object.assign(this, init);
    }
    return TechnologyStackBase;
}());
export { TechnologyStackBase };
var TechnologyStack = /** @class */ (function (_super) {
    __extends(TechnologyStack, _super);
    function TechnologyStack(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyStack;
}(TechnologyStackBase));
export { TechnologyStack };
export var TechnologyTier;
(function (TechnologyTier) {
    TechnologyTier["ProgrammingLanguage"] = "ProgrammingLanguage";
    TechnologyTier["Client"] = "Client";
    TechnologyTier["Http"] = "Http";
    TechnologyTier["Server"] = "Server";
    TechnologyTier["Data"] = "Data";
    TechnologyTier["SoftwareInfrastructure"] = "SoftwareInfrastructure";
    TechnologyTier["OperatingSystem"] = "OperatingSystem";
    TechnologyTier["HardwareInfrastructure"] = "HardwareInfrastructure";
    TechnologyTier["ThirdPartyServices"] = "ThirdPartyServices";
})(TechnologyTier || (TechnologyTier = {}));
var TechnologyBase = /** @class */ (function () {
    function TechnologyBase(init) {
        Object.assign(this, init);
    }
    return TechnologyBase;
}());
export { TechnologyBase };
var Technology = /** @class */ (function (_super) {
    __extends(Technology, _super);
    function Technology(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return Technology;
}(TechnologyBase));
export { Technology };
var UserActivity = /** @class */ (function () {
    function UserActivity(init) {
        Object.assign(this, init);
    }
    return UserActivity;
}());
export { UserActivity };
export var Frequency;
(function (Frequency) {
    Frequency["Daily"] = "1";
    Frequency["Weekly"] = "7";
    Frequency["Monthly"] = "30";
    Frequency["Quarterly"] = "90";
})(Frequency || (Frequency = {}));
var TechnologyHistory = /** @class */ (function (_super) {
    __extends(TechnologyHistory, _super);
    function TechnologyHistory(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyHistory;
}(TechnologyBase));
export { TechnologyHistory };
var TechnologyStackHistory = /** @class */ (function (_super) {
    __extends(TechnologyStackHistory, _super);
    function TechnologyStackHistory(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyStackHistory;
}(TechnologyStackBase));
export { TechnologyStackHistory };
var UserInfo = /** @class */ (function () {
    function UserInfo(init) {
        Object.assign(this, init);
    }
    return UserInfo;
}());
export { UserInfo };
var TechnologyInfo = /** @class */ (function () {
    function TechnologyInfo(init) {
        Object.assign(this, init);
    }
    return TechnologyInfo;
}());
export { TechnologyInfo };
var TechnologyInStack = /** @class */ (function (_super) {
    __extends(TechnologyInStack, _super);
    function TechnologyInStack(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyInStack;
}(TechnologyBase));
export { TechnologyInStack };
var TechStackDetails = /** @class */ (function (_super) {
    __extends(TechStackDetails, _super);
    function TechStackDetails(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechStackDetails;
}(TechnologyStackBase));
export { TechStackDetails };
var LabelInfo = /** @class */ (function () {
    function LabelInfo(init) {
        Object.assign(this, init);
    }
    return LabelInfo;
}());
export { LabelInfo };
var CategoryInfo = /** @class */ (function () {
    function CategoryInfo(init) {
        Object.assign(this, init);
    }
    return CategoryInfo;
}());
export { CategoryInfo };
var OrganizationInfo = /** @class */ (function () {
    function OrganizationInfo(init) {
        Object.assign(this, init);
    }
    return OrganizationInfo;
}());
export { OrganizationInfo };
// @DataContract
var Option = /** @class */ (function () {
    function Option(init) {
        Object.assign(this, init);
    }
    return Option;
}());
export { Option };
var UserVoiceUser = /** @class */ (function () {
    function UserVoiceUser(init) {
        Object.assign(this, init);
    }
    return UserVoiceUser;
}());
export { UserVoiceUser };
var UserVoiceComment = /** @class */ (function () {
    function UserVoiceComment(init) {
        Object.assign(this, init);
    }
    return UserVoiceComment;
}());
export { UserVoiceComment };
var GetOrganizationResponse = /** @class */ (function () {
    function GetOrganizationResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationResponse;
}());
export { GetOrganizationResponse };
var GetOrganizationMembersResponse = /** @class */ (function () {
    function GetOrganizationMembersResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationMembersResponse;
}());
export { GetOrganizationMembersResponse };
var GetOrganizationAdminResponse = /** @class */ (function () {
    function GetOrganizationAdminResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationAdminResponse;
}());
export { GetOrganizationAdminResponse };
var CreateOrganizationForTechnologyResponse = /** @class */ (function () {
    function CreateOrganizationForTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return CreateOrganizationForTechnologyResponse;
}());
export { CreateOrganizationForTechnologyResponse };
var CreateOrganizationResponse = /** @class */ (function () {
    function CreateOrganizationResponse(init) {
        Object.assign(this, init);
    }
    return CreateOrganizationResponse;
}());
export { CreateOrganizationResponse };
var UpdateOrganizationResponse = /** @class */ (function () {
    function UpdateOrganizationResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationResponse;
}());
export { UpdateOrganizationResponse };
var OrganizationLabelResponse = /** @class */ (function () {
    function OrganizationLabelResponse(init) {
        Object.assign(this, init);
    }
    return OrganizationLabelResponse;
}());
export { OrganizationLabelResponse };
var AddOrganizationCategoryResponse = /** @class */ (function () {
    function AddOrganizationCategoryResponse(init) {
        Object.assign(this, init);
    }
    return AddOrganizationCategoryResponse;
}());
export { AddOrganizationCategoryResponse };
var UpdateOrganizationCategoryResponse = /** @class */ (function () {
    function UpdateOrganizationCategoryResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationCategoryResponse;
}());
export { UpdateOrganizationCategoryResponse };
var AddOrganizationMemberResponse = /** @class */ (function () {
    function AddOrganizationMemberResponse(init) {
        Object.assign(this, init);
    }
    return AddOrganizationMemberResponse;
}());
export { AddOrganizationMemberResponse };
var UpdateOrganizationMemberResponse = /** @class */ (function () {
    function UpdateOrganizationMemberResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationMemberResponse;
}());
export { UpdateOrganizationMemberResponse };
var SetOrganizationMembersResponse = /** @class */ (function () {
    function SetOrganizationMembersResponse(init) {
        Object.assign(this, init);
    }
    return SetOrganizationMembersResponse;
}());
export { SetOrganizationMembersResponse };
var GetOrganizationMemberInvitesResponse = /** @class */ (function () {
    function GetOrganizationMemberInvitesResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationMemberInvitesResponse;
}());
export { GetOrganizationMemberInvitesResponse };
var RequestOrganizationMemberInviteResponse = /** @class */ (function () {
    function RequestOrganizationMemberInviteResponse(init) {
        Object.assign(this, init);
    }
    return RequestOrganizationMemberInviteResponse;
}());
export { RequestOrganizationMemberInviteResponse };
var UpdateOrganizationMemberInviteResponse = /** @class */ (function () {
    function UpdateOrganizationMemberInviteResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationMemberInviteResponse;
}());
export { UpdateOrganizationMemberInviteResponse };
// @DataContract
var QueryResponse = /** @class */ (function () {
    function QueryResponse(init) {
        Object.assign(this, init);
    }
    return QueryResponse;
}());
export { QueryResponse };
var GetPostResponse = /** @class */ (function () {
    function GetPostResponse(init) {
        Object.assign(this, init);
    }
    return GetPostResponse;
}());
export { GetPostResponse };
var CreatePostResponse = /** @class */ (function () {
    function CreatePostResponse(init) {
        Object.assign(this, init);
    }
    return CreatePostResponse;
}());
export { CreatePostResponse };
var UpdatePostResponse = /** @class */ (function () {
    function UpdatePostResponse(init) {
        Object.assign(this, init);
    }
    return UpdatePostResponse;
}());
export { UpdatePostResponse };
var DeletePostResponse = /** @class */ (function () {
    function DeletePostResponse(init) {
        Object.assign(this, init);
    }
    return DeletePostResponse;
}());
export { DeletePostResponse };
var CreatePostCommentResponse = /** @class */ (function () {
    function CreatePostCommentResponse(init) {
        Object.assign(this, init);
    }
    return CreatePostCommentResponse;
}());
export { CreatePostCommentResponse };
var UpdatePostCommentResponse = /** @class */ (function () {
    function UpdatePostCommentResponse(init) {
        Object.assign(this, init);
    }
    return UpdatePostCommentResponse;
}());
export { UpdatePostCommentResponse };
var DeletePostCommentResponse = /** @class */ (function () {
    function DeletePostCommentResponse(init) {
        Object.assign(this, init);
    }
    return DeletePostCommentResponse;
}());
export { DeletePostCommentResponse };
var GetUserPostCommentVotesResponse = /** @class */ (function () {
    function GetUserPostCommentVotesResponse(init) {
        Object.assign(this, init);
    }
    return GetUserPostCommentVotesResponse;
}());
export { GetUserPostCommentVotesResponse };
var PinPostCommentResponse = /** @class */ (function () {
    function PinPostCommentResponse(init) {
        Object.assign(this, init);
    }
    return PinPostCommentResponse;
}());
export { PinPostCommentResponse };
var GetUsersByEmailsResponse = /** @class */ (function () {
    function GetUsersByEmailsResponse(init) {
        Object.assign(this, init);
    }
    return GetUsersByEmailsResponse;
}());
export { GetUsersByEmailsResponse };
var GetUserPostActivityResponse = /** @class */ (function () {
    function GetUserPostActivityResponse(init) {
        Object.assign(this, init);
    }
    return GetUserPostActivityResponse;
}());
export { GetUserPostActivityResponse };
var GetUserOrganizationsResponse = /** @class */ (function () {
    function GetUserOrganizationsResponse(init) {
        Object.assign(this, init);
    }
    return GetUserOrganizationsResponse;
}());
export { GetUserOrganizationsResponse };
var UserPostVoteResponse = /** @class */ (function () {
    function UserPostVoteResponse(init) {
        Object.assign(this, init);
    }
    return UserPostVoteResponse;
}());
export { UserPostVoteResponse };
var UserPostFavoriteResponse = /** @class */ (function () {
    function UserPostFavoriteResponse(init) {
        Object.assign(this, init);
    }
    return UserPostFavoriteResponse;
}());
export { UserPostFavoriteResponse };
var UserPostReportResponse = /** @class */ (function () {
    function UserPostReportResponse(init) {
        Object.assign(this, init);
    }
    return UserPostReportResponse;
}());
export { UserPostReportResponse };
var UserPostCommentVoteResponse = /** @class */ (function () {
    function UserPostCommentVoteResponse(init) {
        Object.assign(this, init);
    }
    return UserPostCommentVoteResponse;
}());
export { UserPostCommentVoteResponse };
var UserPostCommentReportResponse = /** @class */ (function () {
    function UserPostCommentReportResponse(init) {
        Object.assign(this, init);
    }
    return UserPostCommentReportResponse;
}());
export { UserPostCommentReportResponse };
var SessionInfoResponse = /** @class */ (function () {
    function SessionInfoResponse(init) {
        Object.assign(this, init);
    }
    return SessionInfoResponse;
}());
export { SessionInfoResponse };
var GetTechnologyPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyPreviousVersionsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyPreviousVersionsResponse;
}());
export { GetTechnologyPreviousVersionsResponse };
var GetAllTechnologiesResponse = /** @class */ (function () {
    function GetAllTechnologiesResponse(init) {
        Object.assign(this, init);
    }
    return GetAllTechnologiesResponse;
}());
export { GetAllTechnologiesResponse };
var GetTechnologyResponse = /** @class */ (function () {
    function GetTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyResponse;
}());
export { GetTechnologyResponse };
var GetTechnologyFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyFavoriteDetailsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyFavoriteDetailsResponse;
}());
export { GetTechnologyFavoriteDetailsResponse };
var CreateTechnologyResponse = /** @class */ (function () {
    function CreateTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return CreateTechnologyResponse;
}());
export { CreateTechnologyResponse };
var UpdateTechnologyResponse = /** @class */ (function () {
    function UpdateTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return UpdateTechnologyResponse;
}());
export { UpdateTechnologyResponse };
var DeleteTechnologyResponse = /** @class */ (function () {
    function DeleteTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return DeleteTechnologyResponse;
}());
export { DeleteTechnologyResponse };
var GetTechnologyStackPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyStackPreviousVersionsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyStackPreviousVersionsResponse;
}());
export { GetTechnologyStackPreviousVersionsResponse };
var GetPageStatsResponse = /** @class */ (function () {
    function GetPageStatsResponse(init) {
        Object.assign(this, init);
    }
    return GetPageStatsResponse;
}());
export { GetPageStatsResponse };
var HourlyTaskResponse = /** @class */ (function () {
    function HourlyTaskResponse(init) {
        Object.assign(this, init);
    }
    return HourlyTaskResponse;
}());
export { HourlyTaskResponse };
var OverviewResponse = /** @class */ (function () {
    function OverviewResponse(init) {
        Object.assign(this, init);
    }
    return OverviewResponse;
}());
export { OverviewResponse };
var AppOverviewResponse = /** @class */ (function () {
    function AppOverviewResponse(init) {
        Object.assign(this, init);
    }
    return AppOverviewResponse;
}());
export { AppOverviewResponse };
var GetAllTechnologyStacksResponse = /** @class */ (function () {
    function GetAllTechnologyStacksResponse(init) {
        Object.assign(this, init);
    }
    return GetAllTechnologyStacksResponse;
}());
export { GetAllTechnologyStacksResponse };
var GetTechnologyStackResponse = /** @class */ (function () {
    function GetTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyStackResponse;
}());
export { GetTechnologyStackResponse };
var GetTechnologyStackFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetailsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyStackFavoriteDetailsResponse;
}());
export { GetTechnologyStackFavoriteDetailsResponse };
var GetConfigResponse = /** @class */ (function () {
    function GetConfigResponse(init) {
        Object.assign(this, init);
    }
    return GetConfigResponse;
}());
export { GetConfigResponse };
var CreateTechnologyStackResponse = /** @class */ (function () {
    function CreateTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return CreateTechnologyStackResponse;
}());
export { CreateTechnologyStackResponse };
var UpdateTechnologyStackResponse = /** @class */ (function () {
    function UpdateTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return UpdateTechnologyStackResponse;
}());
export { UpdateTechnologyStackResponse };
var DeleteTechnologyStackResponse = /** @class */ (function () {
    function DeleteTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return DeleteTechnologyStackResponse;
}());
export { DeleteTechnologyStackResponse };
var GetFavoriteTechStackResponse = /** @class */ (function () {
    function GetFavoriteTechStackResponse(init) {
        Object.assign(this, init);
    }
    return GetFavoriteTechStackResponse;
}());
export { GetFavoriteTechStackResponse };
var FavoriteTechStackResponse = /** @class */ (function () {
    function FavoriteTechStackResponse(init) {
        Object.assign(this, init);
    }
    return FavoriteTechStackResponse;
}());
export { FavoriteTechStackResponse };
var GetFavoriteTechnologiesResponse = /** @class */ (function () {
    function GetFavoriteTechnologiesResponse(init) {
        Object.assign(this, init);
    }
    return GetFavoriteTechnologiesResponse;
}());
export { GetFavoriteTechnologiesResponse };
var FavoriteTechnologyResponse = /** @class */ (function () {
    function FavoriteTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return FavoriteTechnologyResponse;
}());
export { FavoriteTechnologyResponse };
var GetUserFeedResponse = /** @class */ (function () {
    function GetUserFeedResponse(init) {
        Object.assign(this, init);
    }
    return GetUserFeedResponse;
}());
export { GetUserFeedResponse };
var GetUsersKarmaResponse = /** @class */ (function () {
    function GetUsersKarmaResponse(init) {
        Object.assign(this, init);
    }
    return GetUsersKarmaResponse;
}());
export { GetUsersKarmaResponse };
var GetUserInfoResponse = /** @class */ (function () {
    function GetUserInfoResponse(init) {
        Object.assign(this, init);
    }
    return GetUserInfoResponse;
}());
export { GetUserInfoResponse };
var SyncDiscourseSiteResponse = /** @class */ (function () {
    function SyncDiscourseSiteResponse(init) {
        Object.assign(this, init);
    }
    return SyncDiscourseSiteResponse;
}());
export { SyncDiscourseSiteResponse };
var LogoUrlApprovalResponse = /** @class */ (function () {
    function LogoUrlApprovalResponse(init) {
        Object.assign(this, init);
    }
    return LogoUrlApprovalResponse;
}());
export { LogoUrlApprovalResponse };
var LockStackResponse = /** @class */ (function () {
    function LockStackResponse(init) {
        Object.assign(this, init);
    }
    return LockStackResponse;
}());
export { LockStackResponse };
var EmailTestRespoonse = /** @class */ (function () {
    function EmailTestRespoonse(init) {
        Object.assign(this, init);
    }
    return EmailTestRespoonse;
}());
export { EmailTestRespoonse };
var ImportUserResponse = /** @class */ (function () {
    function ImportUserResponse(init) {
        Object.assign(this, init);
    }
    return ImportUserResponse;
}());
export { ImportUserResponse };
var ImportUserVoiceSuggestionResponse = /** @class */ (function () {
    function ImportUserVoiceSuggestionResponse(init) {
        Object.assign(this, init);
    }
    return ImportUserVoiceSuggestionResponse;
}());
export { ImportUserVoiceSuggestionResponse };
// @DataContract
var AuthenticateResponse = /** @class */ (function () {
    function AuthenticateResponse(init) {
        Object.assign(this, init);
    }
    return AuthenticateResponse;
}());
export { AuthenticateResponse };
// @DataContract
var AssignRolesResponse = /** @class */ (function () {
    function AssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return AssignRolesResponse;
}());
export { AssignRolesResponse };
// @DataContract
var UnAssignRolesResponse = /** @class */ (function () {
    function UnAssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return UnAssignRolesResponse;
}());
export { UnAssignRolesResponse };
// @DataContract
var ConvertSessionToTokenResponse = /** @class */ (function () {
    function ConvertSessionToTokenResponse(init) {
        Object.assign(this, init);
    }
    return ConvertSessionToTokenResponse;
}());
export { ConvertSessionToTokenResponse };
// @DataContract
var GetAccessTokenResponse = /** @class */ (function () {
    function GetAccessTokenResponse(init) {
        Object.assign(this, init);
    }
    return GetAccessTokenResponse;
}());
export { GetAccessTokenResponse };
// @Route("/ping")
var Ping = /** @class */ (function () {
    function Ping(init) {
        Object.assign(this, init);
    }
    return Ping;
}());
export { Ping };
var DummyTypes = /** @class */ (function () {
    function DummyTypes(init) {
        Object.assign(this, init);
    }
    return DummyTypes;
}());
export { DummyTypes };
// @Route("/orgs/{Id}", "GET")
var GetOrganization = /** @class */ (function () {
    function GetOrganization(init) {
        Object.assign(this, init);
    }
    GetOrganization.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganization.prototype.getTypeName = function () { return 'GetOrganization'; };
    return GetOrganization;
}());
export { GetOrganization };
// @Route("/organizations/{Slug}", "GET")
var GetOrganizationBySlug = /** @class */ (function () {
    function GetOrganizationBySlug(init) {
        Object.assign(this, init);
    }
    GetOrganizationBySlug.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganizationBySlug.prototype.getTypeName = function () { return 'GetOrganizationBySlug'; };
    return GetOrganizationBySlug;
}());
export { GetOrganizationBySlug };
// @Route("/orgs/{Id}/members", "GET")
var GetOrganizationMembers = /** @class */ (function () {
    function GetOrganizationMembers(init) {
        Object.assign(this, init);
    }
    GetOrganizationMembers.prototype.createResponse = function () { return new GetOrganizationMembersResponse(); };
    GetOrganizationMembers.prototype.getTypeName = function () { return 'GetOrganizationMembers'; };
    return GetOrganizationMembers;
}());
export { GetOrganizationMembers };
// @Route("/orgs/{Id}/admin", "GET")
var GetOrganizationAdmin = /** @class */ (function () {
    function GetOrganizationAdmin(init) {
        Object.assign(this, init);
    }
    GetOrganizationAdmin.prototype.createResponse = function () { return new GetOrganizationAdminResponse(); };
    GetOrganizationAdmin.prototype.getTypeName = function () { return 'GetOrganizationAdmin'; };
    return GetOrganizationAdmin;
}());
export { GetOrganizationAdmin };
// @Route("/orgs/posts/new", "POST")
var CreateOrganizationForTechnology = /** @class */ (function () {
    function CreateOrganizationForTechnology(init) {
        Object.assign(this, init);
    }
    CreateOrganizationForTechnology.prototype.createResponse = function () { return new CreateOrganizationForTechnologyResponse(); };
    CreateOrganizationForTechnology.prototype.getTypeName = function () { return 'CreateOrganizationForTechnology'; };
    return CreateOrganizationForTechnology;
}());
export { CreateOrganizationForTechnology };
// @Route("/orgs", "POST")
var CreateOrganization = /** @class */ (function () {
    function CreateOrganization(init) {
        Object.assign(this, init);
    }
    CreateOrganization.prototype.createResponse = function () { return new CreateOrganizationResponse(); };
    CreateOrganization.prototype.getTypeName = function () { return 'CreateOrganization'; };
    return CreateOrganization;
}());
export { CreateOrganization };
// @Route("/orgs/{Id}", "PUT")
var UpdateOrganization = /** @class */ (function () {
    function UpdateOrganization(init) {
        Object.assign(this, init);
    }
    UpdateOrganization.prototype.createResponse = function () { return new UpdateOrganizationResponse(); };
    UpdateOrganization.prototype.getTypeName = function () { return 'UpdateOrganization'; };
    return UpdateOrganization;
}());
export { UpdateOrganization };
// @Route("/orgs/{Id}", "DELETE")
var DeleteOrganization = /** @class */ (function () {
    function DeleteOrganization(init) {
        Object.assign(this, init);
    }
    DeleteOrganization.prototype.createResponse = function () { };
    DeleteOrganization.prototype.getTypeName = function () { return 'DeleteOrganization'; };
    return DeleteOrganization;
}());
export { DeleteOrganization };
// @Route("/orgs/{Id}/lock", "PUT")
var LockOrganization = /** @class */ (function () {
    function LockOrganization(init) {
        Object.assign(this, init);
    }
    LockOrganization.prototype.createResponse = function () { };
    LockOrganization.prototype.getTypeName = function () { return 'LockOrganization'; };
    return LockOrganization;
}());
export { LockOrganization };
// @Route("/orgs/{OrganizationId}/labels", "POST")
var AddOrganizationLabel = /** @class */ (function () {
    function AddOrganizationLabel(init) {
        Object.assign(this, init);
    }
    AddOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    AddOrganizationLabel.prototype.getTypeName = function () { return 'AddOrganizationLabel'; };
    return AddOrganizationLabel;
}());
export { AddOrganizationLabel };
// @Route("/orgs/{OrganizationId}/members/{Slug}", "PUT")
var UpdateOrganizationLabel = /** @class */ (function () {
    function UpdateOrganizationLabel(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    UpdateOrganizationLabel.prototype.getTypeName = function () { return 'UpdateOrganizationLabel'; };
    return UpdateOrganizationLabel;
}());
export { UpdateOrganizationLabel };
// @Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE")
var RemoveOrganizationLabel = /** @class */ (function () {
    function RemoveOrganizationLabel(init) {
        Object.assign(this, init);
    }
    RemoveOrganizationLabel.prototype.createResponse = function () { };
    RemoveOrganizationLabel.prototype.getTypeName = function () { return 'RemoveOrganizationLabel'; };
    return RemoveOrganizationLabel;
}());
export { RemoveOrganizationLabel };
// @Route("/orgs/{OrganizationId}/categories", "POST")
var AddOrganizationCategory = /** @class */ (function () {
    function AddOrganizationCategory(init) {
        Object.assign(this, init);
    }
    AddOrganizationCategory.prototype.createResponse = function () { return new AddOrganizationCategoryResponse(); };
    AddOrganizationCategory.prototype.getTypeName = function () { return 'AddOrganizationCategory'; };
    return AddOrganizationCategory;
}());
export { AddOrganizationCategory };
// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
var UpdateOrganizationCategory = /** @class */ (function () {
    function UpdateOrganizationCategory(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationCategory.prototype.createResponse = function () { return new UpdateOrganizationCategoryResponse(); };
    UpdateOrganizationCategory.prototype.getTypeName = function () { return 'UpdateOrganizationCategory'; };
    return UpdateOrganizationCategory;
}());
export { UpdateOrganizationCategory };
// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
var DeleteOrganizationCategory = /** @class */ (function () {
    function DeleteOrganizationCategory(init) {
        Object.assign(this, init);
    }
    DeleteOrganizationCategory.prototype.createResponse = function () { };
    DeleteOrganizationCategory.prototype.getTypeName = function () { return 'DeleteOrganizationCategory'; };
    return DeleteOrganizationCategory;
}());
export { DeleteOrganizationCategory };
// @Route("/orgs/{OrganizationId}/members", "POST")
var AddOrganizationMember = /** @class */ (function () {
    function AddOrganizationMember(init) {
        Object.assign(this, init);
    }
    AddOrganizationMember.prototype.createResponse = function () { return new AddOrganizationMemberResponse(); };
    AddOrganizationMember.prototype.getTypeName = function () { return 'AddOrganizationMember'; };
    return AddOrganizationMember;
}());
export { AddOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
var UpdateOrganizationMember = /** @class */ (function () {
    function UpdateOrganizationMember(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationMember.prototype.createResponse = function () { return new UpdateOrganizationMemberResponse(); };
    UpdateOrganizationMember.prototype.getTypeName = function () { return 'UpdateOrganizationMember'; };
    return UpdateOrganizationMember;
}());
export { UpdateOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
var RemoveOrganizationMember = /** @class */ (function () {
    function RemoveOrganizationMember(init) {
        Object.assign(this, init);
    }
    RemoveOrganizationMember.prototype.createResponse = function () { };
    RemoveOrganizationMember.prototype.getTypeName = function () { return 'RemoveOrganizationMember'; };
    return RemoveOrganizationMember;
}());
export { RemoveOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/set", "POST")
var SetOrganizationMembers = /** @class */ (function () {
    function SetOrganizationMembers(init) {
        Object.assign(this, init);
    }
    SetOrganizationMembers.prototype.createResponse = function () { return new SetOrganizationMembersResponse(); };
    SetOrganizationMembers.prototype.getTypeName = function () { return 'SetOrganizationMembers'; };
    return SetOrganizationMembers;
}());
export { SetOrganizationMembers };
// @Route("/orgs/{OrganizationId}/invites", "GET")
var GetOrganizationMemberInvites = /** @class */ (function () {
    function GetOrganizationMemberInvites(init) {
        Object.assign(this, init);
    }
    GetOrganizationMemberInvites.prototype.createResponse = function () { return new GetOrganizationMemberInvitesResponse(); };
    GetOrganizationMemberInvites.prototype.getTypeName = function () { return 'GetOrganizationMemberInvites'; };
    return GetOrganizationMemberInvites;
}());
export { GetOrganizationMemberInvites };
// @Route("/orgs/{OrganizationId}/invites", "POST")
var RequestOrganizationMemberInvite = /** @class */ (function () {
    function RequestOrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    RequestOrganizationMemberInvite.prototype.createResponse = function () { return new RequestOrganizationMemberInviteResponse(); };
    RequestOrganizationMemberInvite.prototype.getTypeName = function () { return 'RequestOrganizationMemberInvite'; };
    return RequestOrganizationMemberInvite;
}());
export { RequestOrganizationMemberInvite };
// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
var UpdateOrganizationMemberInvite = /** @class */ (function () {
    function UpdateOrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationMemberInvite.prototype.createResponse = function () { return new UpdateOrganizationMemberInviteResponse(); };
    UpdateOrganizationMemberInvite.prototype.getTypeName = function () { return 'UpdateOrganizationMemberInvite'; };
    return UpdateOrganizationMemberInvite;
}());
export { UpdateOrganizationMemberInvite };
// @Route("/posts", "GET")
var QueryPosts = /** @class */ (function (_super) {
    __extends(QueryPosts, _super);
    function QueryPosts(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryPosts.prototype.createResponse = function () { return new QueryResponse(); };
    QueryPosts.prototype.getTypeName = function () { return 'QueryPosts'; };
    return QueryPosts;
}(QueryDb));
export { QueryPosts };
// @Route("/posts/{Id}", "GET")
var GetPost = /** @class */ (function () {
    function GetPost(init) {
        Object.assign(this, init);
    }
    GetPost.prototype.createResponse = function () { return new GetPostResponse(); };
    GetPost.prototype.getTypeName = function () { return 'GetPost'; };
    return GetPost;
}());
export { GetPost };
// @Route("/posts", "POST")
var CreatePost = /** @class */ (function () {
    function CreatePost(init) {
        Object.assign(this, init);
    }
    CreatePost.prototype.createResponse = function () { return new CreatePostResponse(); };
    CreatePost.prototype.getTypeName = function () { return 'CreatePost'; };
    return CreatePost;
}());
export { CreatePost };
// @Route("/posts/{Id}", "PUT")
var UpdatePost = /** @class */ (function () {
    function UpdatePost(init) {
        Object.assign(this, init);
    }
    UpdatePost.prototype.createResponse = function () { return new UpdatePostResponse(); };
    UpdatePost.prototype.getTypeName = function () { return 'UpdatePost'; };
    return UpdatePost;
}());
export { UpdatePost };
// @Route("/posts/{Id}", "DELETE")
var DeletePost = /** @class */ (function () {
    function DeletePost(init) {
        Object.assign(this, init);
    }
    DeletePost.prototype.createResponse = function () { return new DeletePostResponse(); };
    DeletePost.prototype.getTypeName = function () { return 'DeletePost'; };
    return DeletePost;
}());
export { DeletePost };
// @Route("/posts/{Id}/lock", "PUT")
var LockPost = /** @class */ (function () {
    function LockPost(init) {
        Object.assign(this, init);
    }
    LockPost.prototype.createResponse = function () { };
    LockPost.prototype.getTypeName = function () { return 'LockPost'; };
    return LockPost;
}());
export { LockPost };
// @Route("/posts/{Id}/hide", "PUT")
var HidePost = /** @class */ (function () {
    function HidePost(init) {
        Object.assign(this, init);
    }
    HidePost.prototype.createResponse = function () { };
    HidePost.prototype.getTypeName = function () { return 'HidePost'; };
    return HidePost;
}());
export { HidePost };
// @Route("/posts/{Id}/status/{Status}", "PUT")
var ChangeStatusPost = /** @class */ (function () {
    function ChangeStatusPost(init) {
        Object.assign(this, init);
    }
    ChangeStatusPost.prototype.createResponse = function () { };
    ChangeStatusPost.prototype.getTypeName = function () { return 'ChangeStatusPost'; };
    return ChangeStatusPost;
}());
export { ChangeStatusPost };
// @Route("/posts/{PostId}/report/{Id}", "POST")
var ActionPostReport = /** @class */ (function () {
    function ActionPostReport(init) {
        Object.assign(this, init);
    }
    ActionPostReport.prototype.createResponse = function () { };
    ActionPostReport.prototype.getTypeName = function () { return 'ActionPostReport'; };
    return ActionPostReport;
}());
export { ActionPostReport };
// @Route("/posts/{PostId}/comments", "POST")
var CreatePostComment = /** @class */ (function () {
    function CreatePostComment(init) {
        Object.assign(this, init);
    }
    CreatePostComment.prototype.createResponse = function () { return new CreatePostCommentResponse(); };
    CreatePostComment.prototype.getTypeName = function () { return 'CreatePostComment'; };
    return CreatePostComment;
}());
export { CreatePostComment };
// @Route("/posts/{PostId}/comments/{Id}", "PUT")
var UpdatePostComment = /** @class */ (function () {
    function UpdatePostComment(init) {
        Object.assign(this, init);
    }
    UpdatePostComment.prototype.createResponse = function () { return new UpdatePostCommentResponse(); };
    UpdatePostComment.prototype.getTypeName = function () { return 'UpdatePostComment'; };
    return UpdatePostComment;
}());
export { UpdatePostComment };
// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
var DeletePostComment = /** @class */ (function () {
    function DeletePostComment(init) {
        Object.assign(this, init);
    }
    DeletePostComment.prototype.createResponse = function () { return new DeletePostCommentResponse(); };
    DeletePostComment.prototype.getTypeName = function () { return 'DeletePostComment'; };
    return DeletePostComment;
}());
export { DeletePostComment };
// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
var ActionPostCommentReport = /** @class */ (function () {
    function ActionPostCommentReport(init) {
        Object.assign(this, init);
    }
    ActionPostCommentReport.prototype.createResponse = function () { };
    ActionPostCommentReport.prototype.getTypeName = function () { return 'ActionPostCommentReport'; };
    return ActionPostCommentReport;
}());
export { ActionPostCommentReport };
// @Route("/user/comments/votes")
var GetUserPostCommentVotes = /** @class */ (function () {
    function GetUserPostCommentVotes(init) {
        Object.assign(this, init);
    }
    GetUserPostCommentVotes.prototype.createResponse = function () { return new GetUserPostCommentVotesResponse(); };
    GetUserPostCommentVotes.prototype.getTypeName = function () { return 'GetUserPostCommentVotes'; };
    return GetUserPostCommentVotes;
}());
export { GetUserPostCommentVotes };
// @Route("/posts/{PostId}/comments/{Id}/pin", "UPDATE")
var PinPostComment = /** @class */ (function () {
    function PinPostComment(init) {
        Object.assign(this, init);
    }
    PinPostComment.prototype.createResponse = function () { return new PinPostCommentResponse(); };
    PinPostComment.prototype.getTypeName = function () { return 'PinPostComment'; };
    return PinPostComment;
}());
export { PinPostComment };
// @Route("/users/by-email")
var GetUsersByEmails = /** @class */ (function () {
    function GetUsersByEmails(init) {
        Object.assign(this, init);
    }
    GetUsersByEmails.prototype.createResponse = function () { return new GetUsersByEmailsResponse(); };
    GetUsersByEmails.prototype.getTypeName = function () { return 'GetUsersByEmails'; };
    return GetUsersByEmails;
}());
export { GetUsersByEmails };
// @Route("/user/posts/activity")
var GetUserPostActivity = /** @class */ (function () {
    function GetUserPostActivity(init) {
        Object.assign(this, init);
    }
    GetUserPostActivity.prototype.createResponse = function () { return new GetUserPostActivityResponse(); };
    GetUserPostActivity.prototype.getTypeName = function () { return 'GetUserPostActivity'; };
    return GetUserPostActivity;
}());
export { GetUserPostActivity };
// @Route("/user/organizations")
var GetUserOrganizations = /** @class */ (function () {
    function GetUserOrganizations(init) {
        Object.assign(this, init);
    }
    GetUserOrganizations.prototype.createResponse = function () { return new GetUserOrganizationsResponse(); };
    GetUserOrganizations.prototype.getTypeName = function () { return 'GetUserOrganizations'; };
    return GetUserOrganizations;
}());
export { GetUserOrganizations };
// @Route("/posts/{Id}/vote", "PUT")
var UserPostVote = /** @class */ (function () {
    function UserPostVote(init) {
        Object.assign(this, init);
    }
    UserPostVote.prototype.createResponse = function () { return new UserPostVoteResponse(); };
    UserPostVote.prototype.getTypeName = function () { return 'UserPostVote'; };
    return UserPostVote;
}());
export { UserPostVote };
// @Route("/posts/{Id}/favorite", "PUT")
var UserPostFavorite = /** @class */ (function () {
    function UserPostFavorite(init) {
        Object.assign(this, init);
    }
    UserPostFavorite.prototype.createResponse = function () { return new UserPostFavoriteResponse(); };
    UserPostFavorite.prototype.getTypeName = function () { return 'UserPostFavorite'; };
    return UserPostFavorite;
}());
export { UserPostFavorite };
// @Route("/posts/{Id}/report", "PUT")
var UserPostReport = /** @class */ (function () {
    function UserPostReport(init) {
        Object.assign(this, init);
    }
    UserPostReport.prototype.createResponse = function () { return new UserPostReportResponse(); };
    UserPostReport.prototype.getTypeName = function () { return 'UserPostReport'; };
    return UserPostReport;
}());
export { UserPostReport };
// @Route("/posts/{PostId}/comments/{Id}", "GET")
var UserPostCommentVote = /** @class */ (function () {
    function UserPostCommentVote(init) {
        Object.assign(this, init);
    }
    UserPostCommentVote.prototype.createResponse = function () { return new UserPostCommentVoteResponse(); };
    UserPostCommentVote.prototype.getTypeName = function () { return 'UserPostCommentVote'; };
    return UserPostCommentVote;
}());
export { UserPostCommentVote };
// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
var UserPostCommentReport = /** @class */ (function () {
    function UserPostCommentReport(init) {
        Object.assign(this, init);
    }
    UserPostCommentReport.prototype.createResponse = function () { return new UserPostCommentReportResponse(); };
    UserPostCommentReport.prototype.getTypeName = function () { return 'UserPostCommentReport'; };
    return UserPostCommentReport;
}());
export { UserPostCommentReport };
// @Route("/prerender/{Path*}", "PUT")
var StorePreRender = /** @class */ (function () {
    function StorePreRender(init) {
        Object.assign(this, init);
    }
    StorePreRender.prototype.createResponse = function () { };
    StorePreRender.prototype.getTypeName = function () { return 'StorePreRender'; };
    return StorePreRender;
}());
export { StorePreRender };
// @Route("/prerender/{Path*}", "GET")
var GetPreRender = /** @class */ (function () {
    function GetPreRender(init) {
        Object.assign(this, init);
    }
    GetPreRender.prototype.createResponse = function () { return ''; };
    GetPreRender.prototype.getTypeName = function () { return 'GetPreRender'; };
    return GetPreRender;
}());
export { GetPreRender };
// @Route("/my-session")
var SessionInfo = /** @class */ (function () {
    function SessionInfo(init) {
        Object.assign(this, init);
    }
    SessionInfo.prototype.createResponse = function () { return new SessionInfoResponse(); };
    SessionInfo.prototype.getTypeName = function () { return 'SessionInfo'; };
    return SessionInfo;
}());
export { SessionInfo };
// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
var SubscribeToOrganization = /** @class */ (function () {
    function SubscribeToOrganization(init) {
        Object.assign(this, init);
    }
    SubscribeToOrganization.prototype.createResponse = function () { };
    SubscribeToOrganization.prototype.getTypeName = function () { return 'SubscribeToOrganization'; };
    return SubscribeToOrganization;
}());
export { SubscribeToOrganization };
// @Route("/posts/{PostId}/subscribe", "PUT")
var SubscribeToPost = /** @class */ (function () {
    function SubscribeToPost(init) {
        Object.assign(this, init);
    }
    SubscribeToPost.prototype.createResponse = function () { };
    SubscribeToPost.prototype.getTypeName = function () { return 'SubscribeToPost'; };
    return SubscribeToPost;
}());
export { SubscribeToPost };
// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
var DeleteOrganizationSubscription = /** @class */ (function () {
    function DeleteOrganizationSubscription(init) {
        Object.assign(this, init);
    }
    DeleteOrganizationSubscription.prototype.createResponse = function () { };
    DeleteOrganizationSubscription.prototype.getTypeName = function () { return 'DeleteOrganizationSubscription'; };
    return DeleteOrganizationSubscription;
}());
export { DeleteOrganizationSubscription };
// @Route("/posts/{PostId}/subscribe", "DELETE")
var DeletePostSubscription = /** @class */ (function () {
    function DeletePostSubscription(init) {
        Object.assign(this, init);
    }
    DeletePostSubscription.prototype.createResponse = function () { };
    DeletePostSubscription.prototype.getTypeName = function () { return 'DeletePostSubscription'; };
    return DeletePostSubscription;
}());
export { DeletePostSubscription };
// @Route("/technology/{Slug}/previous-versions", "GET")
var GetTechnologyPreviousVersions = /** @class */ (function () {
    function GetTechnologyPreviousVersions(init) {
        Object.assign(this, init);
    }
    GetTechnologyPreviousVersions.prototype.createResponse = function () { return new GetTechnologyPreviousVersionsResponse(); };
    GetTechnologyPreviousVersions.prototype.getTypeName = function () { return 'GetTechnologyPreviousVersions'; };
    return GetTechnologyPreviousVersions;
}());
export { GetTechnologyPreviousVersions };
// @Route("/technology", "GET")
var GetAllTechnologies = /** @class */ (function () {
    function GetAllTechnologies(init) {
        Object.assign(this, init);
    }
    GetAllTechnologies.prototype.createResponse = function () { return new GetAllTechnologiesResponse(); };
    GetAllTechnologies.prototype.getTypeName = function () { return 'GetAllTechnologies'; };
    return GetAllTechnologies;
}());
export { GetAllTechnologies };
// @Route("/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies")
var FindTechnologies = /** @class */ (function (_super) {
    __extends(FindTechnologies, _super);
    function FindTechnologies(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    FindTechnologies.prototype.createResponse = function () { return new QueryResponse(); };
    FindTechnologies.prototype.getTypeName = function () { return 'FindTechnologies'; };
    return FindTechnologies;
}(QueryDb));
export { FindTechnologies };
// @Route("/technology/query")
var QueryTechnology = /** @class */ (function (_super) {
    __extends(QueryTechnology, _super);
    function QueryTechnology(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryTechnology.prototype.createResponse = function () { return new QueryResponse(); };
    QueryTechnology.prototype.getTypeName = function () { return 'QueryTechnology'; };
    return QueryTechnology;
}(QueryDb));
export { QueryTechnology };
// @Route("/technology/{Slug}")
var GetTechnology = /** @class */ (function () {
    function GetTechnology(init) {
        Object.assign(this, init);
    }
    GetTechnology.prototype.createResponse = function () { return new GetTechnologyResponse(); };
    GetTechnology.prototype.getTypeName = function () { return 'GetTechnology'; };
    return GetTechnology;
}());
export { GetTechnology };
// @Route("/technology/{Slug}/favorites")
var GetTechnologyFavoriteDetails = /** @class */ (function () {
    function GetTechnologyFavoriteDetails(init) {
        Object.assign(this, init);
    }
    GetTechnologyFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyFavoriteDetailsResponse(); };
    GetTechnologyFavoriteDetails.prototype.getTypeName = function () { return 'GetTechnologyFavoriteDetails'; };
    return GetTechnologyFavoriteDetails;
}());
export { GetTechnologyFavoriteDetails };
// @Route("/technology", "POST")
var CreateTechnology = /** @class */ (function () {
    function CreateTechnology(init) {
        Object.assign(this, init);
    }
    CreateTechnology.prototype.createResponse = function () { return new CreateTechnologyResponse(); };
    CreateTechnology.prototype.getTypeName = function () { return 'CreateTechnology'; };
    return CreateTechnology;
}());
export { CreateTechnology };
// @Route("/technology/{Id}", "PUT")
var UpdateTechnology = /** @class */ (function () {
    function UpdateTechnology(init) {
        Object.assign(this, init);
    }
    UpdateTechnology.prototype.createResponse = function () { return new UpdateTechnologyResponse(); };
    UpdateTechnology.prototype.getTypeName = function () { return 'UpdateTechnology'; };
    return UpdateTechnology;
}());
export { UpdateTechnology };
// @Route("/technology/{Id}", "DELETE")
var DeleteTechnology = /** @class */ (function () {
    function DeleteTechnology(init) {
        Object.assign(this, init);
    }
    DeleteTechnology.prototype.createResponse = function () { return new DeleteTechnologyResponse(); };
    DeleteTechnology.prototype.getTypeName = function () { return 'DeleteTechnology'; };
    return DeleteTechnology;
}());
export { DeleteTechnology };
// @Route("/techstacks/{Slug}/previous-versions", "GET")
var GetTechnologyStackPreviousVersions = /** @class */ (function () {
    function GetTechnologyStackPreviousVersions(init) {
        Object.assign(this, init);
    }
    GetTechnologyStackPreviousVersions.prototype.createResponse = function () { return new GetTechnologyStackPreviousVersionsResponse(); };
    GetTechnologyStackPreviousVersions.prototype.getTypeName = function () { return 'GetTechnologyStackPreviousVersions'; };
    return GetTechnologyStackPreviousVersions;
}());
export { GetTechnologyStackPreviousVersions };
// @Route("/pagestats/{Type}/{Slug}")
var GetPageStats = /** @class */ (function () {
    function GetPageStats(init) {
        Object.assign(this, init);
    }
    GetPageStats.prototype.createResponse = function () { return new GetPageStatsResponse(); };
    GetPageStats.prototype.getTypeName = function () { return 'GetPageStats'; };
    return GetPageStats;
}());
export { GetPageStats };
// @Route("/cache/clear")
var ClearCache = /** @class */ (function () {
    function ClearCache(init) {
        Object.assign(this, init);
    }
    ClearCache.prototype.createResponse = function () { return ''; };
    ClearCache.prototype.getTypeName = function () { return 'ClearCache'; };
    return ClearCache;
}());
export { ClearCache };
// @Route("/tasks/hourly")
var HourlyTask = /** @class */ (function () {
    function HourlyTask(init) {
        Object.assign(this, init);
    }
    HourlyTask.prototype.createResponse = function () { return new HourlyTaskResponse(); };
    HourlyTask.prototype.getTypeName = function () { return 'HourlyTask'; };
    return HourlyTask;
}());
export { HourlyTask };
// @Route("/techstacks/search")
// @AutoQueryViewer(DefaultSearchField="Description", DefaultSearchText="ServiceStack", DefaultSearchType="Contains", Description="Explore different Technology Stacks", IconUrl="material-icons:cloud", Title="Find Technology Stacks")
var FindTechStacks = /** @class */ (function (_super) {
    __extends(FindTechStacks, _super);
    function FindTechStacks(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    FindTechStacks.prototype.createResponse = function () { return new QueryResponse(); };
    FindTechStacks.prototype.getTypeName = function () { return 'FindTechStacks'; };
    return FindTechStacks;
}(QueryDb));
export { FindTechStacks };
// @Route("/techstacks/query")
var QueryTechStacks = /** @class */ (function (_super) {
    __extends(QueryTechStacks, _super);
    function QueryTechStacks(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryTechStacks.prototype.createResponse = function () { return new QueryResponse(); };
    QueryTechStacks.prototype.getTypeName = function () { return 'QueryTechStacks'; };
    return QueryTechStacks;
}(QueryDb));
export { QueryTechStacks };
// @Route("/overview")
var Overview = /** @class */ (function () {
    function Overview(init) {
        Object.assign(this, init);
    }
    Overview.prototype.createResponse = function () { return new OverviewResponse(); };
    Overview.prototype.getTypeName = function () { return 'Overview'; };
    return Overview;
}());
export { Overview };
// @Route("/app-overview")
var AppOverview = /** @class */ (function () {
    function AppOverview(init) {
        Object.assign(this, init);
    }
    AppOverview.prototype.createResponse = function () { return new AppOverviewResponse(); };
    AppOverview.prototype.getTypeName = function () { return 'AppOverview'; };
    return AppOverview;
}());
export { AppOverview };
// @Route("/techstacks", "GET")
var GetAllTechnologyStacks = /** @class */ (function () {
    function GetAllTechnologyStacks(init) {
        Object.assign(this, init);
    }
    GetAllTechnologyStacks.prototype.createResponse = function () { return new GetAllTechnologyStacksResponse(); };
    GetAllTechnologyStacks.prototype.getTypeName = function () { return 'GetAllTechnologyStacks'; };
    return GetAllTechnologyStacks;
}());
export { GetAllTechnologyStacks };
// @Route("/techstacks/{Slug}", "GET")
var GetTechnologyStack = /** @class */ (function () {
    function GetTechnologyStack(init) {
        Object.assign(this, init);
    }
    GetTechnologyStack.prototype.createResponse = function () { return new GetTechnologyStackResponse(); };
    GetTechnologyStack.prototype.getTypeName = function () { return 'GetTechnologyStack'; };
    return GetTechnologyStack;
}());
export { GetTechnologyStack };
// @Route("/techstacks/{Slug}/favorites")
var GetTechnologyStackFavoriteDetails = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetails(init) {
        Object.assign(this, init);
    }
    GetTechnologyStackFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyStackFavoriteDetailsResponse(); };
    GetTechnologyStackFavoriteDetails.prototype.getTypeName = function () { return 'GetTechnologyStackFavoriteDetails'; };
    return GetTechnologyStackFavoriteDetails;
}());
export { GetTechnologyStackFavoriteDetails };
// @Route("/config")
var GetConfig = /** @class */ (function () {
    function GetConfig(init) {
        Object.assign(this, init);
    }
    GetConfig.prototype.createResponse = function () { return new GetConfigResponse(); };
    GetConfig.prototype.getTypeName = function () { return 'GetConfig'; };
    return GetConfig;
}());
export { GetConfig };
// @Route("/techstacks", "POST")
var CreateTechnologyStack = /** @class */ (function () {
    function CreateTechnologyStack(init) {
        Object.assign(this, init);
    }
    CreateTechnologyStack.prototype.createResponse = function () { return new CreateTechnologyStackResponse(); };
    CreateTechnologyStack.prototype.getTypeName = function () { return 'CreateTechnologyStack'; };
    return CreateTechnologyStack;
}());
export { CreateTechnologyStack };
// @Route("/techstacks/{Id}", "PUT")
var UpdateTechnologyStack = /** @class */ (function () {
    function UpdateTechnologyStack(init) {
        Object.assign(this, init);
    }
    UpdateTechnologyStack.prototype.createResponse = function () { return new UpdateTechnologyStackResponse(); };
    UpdateTechnologyStack.prototype.getTypeName = function () { return 'UpdateTechnologyStack'; };
    return UpdateTechnologyStack;
}());
export { UpdateTechnologyStack };
// @Route("/techstacks/{Id}", "DELETE")
var DeleteTechnologyStack = /** @class */ (function () {
    function DeleteTechnologyStack(init) {
        Object.assign(this, init);
    }
    DeleteTechnologyStack.prototype.createResponse = function () { return new DeleteTechnologyStackResponse(); };
    DeleteTechnologyStack.prototype.getTypeName = function () { return 'DeleteTechnologyStack'; };
    return DeleteTechnologyStack;
}());
export { DeleteTechnologyStack };
// @Route("/favorites/techtacks", "GET")
var GetFavoriteTechStack = /** @class */ (function () {
    function GetFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    GetFavoriteTechStack.prototype.createResponse = function () { return new GetFavoriteTechStackResponse(); };
    GetFavoriteTechStack.prototype.getTypeName = function () { return 'GetFavoriteTechStack'; };
    return GetFavoriteTechStack;
}());
export { GetFavoriteTechStack };
// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
var AddFavoriteTechStack = /** @class */ (function () {
    function AddFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    AddFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    AddFavoriteTechStack.prototype.getTypeName = function () { return 'AddFavoriteTechStack'; };
    return AddFavoriteTechStack;
}());
export { AddFavoriteTechStack };
// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
var RemoveFavoriteTechStack = /** @class */ (function () {
    function RemoveFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    RemoveFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    RemoveFavoriteTechStack.prototype.getTypeName = function () { return 'RemoveFavoriteTechStack'; };
    return RemoveFavoriteTechStack;
}());
export { RemoveFavoriteTechStack };
// @Route("/favorites/technology", "GET")
var GetFavoriteTechnologies = /** @class */ (function () {
    function GetFavoriteTechnologies(init) {
        Object.assign(this, init);
    }
    GetFavoriteTechnologies.prototype.createResponse = function () { return new GetFavoriteTechnologiesResponse(); };
    GetFavoriteTechnologies.prototype.getTypeName = function () { return 'GetFavoriteTechnologies'; };
    return GetFavoriteTechnologies;
}());
export { GetFavoriteTechnologies };
// @Route("/favorites/technology/{TechnologyId}", "PUT")
var AddFavoriteTechnology = /** @class */ (function () {
    function AddFavoriteTechnology(init) {
        Object.assign(this, init);
    }
    AddFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    AddFavoriteTechnology.prototype.getTypeName = function () { return 'AddFavoriteTechnology'; };
    return AddFavoriteTechnology;
}());
export { AddFavoriteTechnology };
// @Route("/favorites/technology/{TechnologyId}", "DELETE")
var RemoveFavoriteTechnology = /** @class */ (function () {
    function RemoveFavoriteTechnology(init) {
        Object.assign(this, init);
    }
    RemoveFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    RemoveFavoriteTechnology.prototype.getTypeName = function () { return 'RemoveFavoriteTechnology'; };
    return RemoveFavoriteTechnology;
}());
export { RemoveFavoriteTechnology };
// @Route("/my-feed")
var GetUserFeed = /** @class */ (function () {
    function GetUserFeed(init) {
        Object.assign(this, init);
    }
    GetUserFeed.prototype.createResponse = function () { return new GetUserFeedResponse(); };
    GetUserFeed.prototype.getTypeName = function () { return 'GetUserFeed'; };
    return GetUserFeed;
}());
export { GetUserFeed };
// @Route("/users/karma", "GET")
var GetUsersKarma = /** @class */ (function () {
    function GetUsersKarma(init) {
        Object.assign(this, init);
    }
    GetUsersKarma.prototype.createResponse = function () { return new GetUsersKarmaResponse(); };
    GetUsersKarma.prototype.getTypeName = function () { return 'GetUsersKarma'; };
    return GetUsersKarma;
}());
export { GetUsersKarma };
// @Route("/userinfo/{UserName}")
var GetUserInfo = /** @class */ (function () {
    function GetUserInfo(init) {
        Object.assign(this, init);
    }
    GetUserInfo.prototype.createResponse = function () { return new GetUserInfoResponse(); };
    GetUserInfo.prototype.getTypeName = function () { return 'GetUserInfo'; };
    return GetUserInfo;
}());
export { GetUserInfo };
// @Route("/users/{UserName}/avatar", "GET")
var UserAvatar = /** @class */ (function () {
    function UserAvatar(init) {
        Object.assign(this, init);
    }
    return UserAvatar;
}());
export { UserAvatar };
// @Route("/mq/start")
var MqStart = /** @class */ (function () {
    function MqStart(init) {
        Object.assign(this, init);
    }
    MqStart.prototype.createResponse = function () { return ''; };
    MqStart.prototype.getTypeName = function () { return 'MqStart'; };
    return MqStart;
}());
export { MqStart };
// @Route("/mq/stop")
var MqStop = /** @class */ (function () {
    function MqStop(init) {
        Object.assign(this, init);
    }
    MqStop.prototype.createResponse = function () { return ''; };
    MqStop.prototype.getTypeName = function () { return 'MqStop'; };
    return MqStop;
}());
export { MqStop };
// @Route("/mq/stats")
var MqStats = /** @class */ (function () {
    function MqStats(init) {
        Object.assign(this, init);
    }
    MqStats.prototype.createResponse = function () { return ''; };
    MqStats.prototype.getTypeName = function () { return 'MqStats'; };
    return MqStats;
}());
export { MqStats };
// @Route("/mq/status")
var MqStatus = /** @class */ (function () {
    function MqStatus(init) {
        Object.assign(this, init);
    }
    MqStatus.prototype.createResponse = function () { return ''; };
    MqStatus.prototype.getTypeName = function () { return 'MqStatus'; };
    return MqStatus;
}());
export { MqStatus };
// @Route("/sync/discourse/{Site}")
var SyncDiscourseSite = /** @class */ (function () {
    function SyncDiscourseSite(init) {
        Object.assign(this, init);
    }
    SyncDiscourseSite.prototype.createResponse = function () { return new SyncDiscourseSiteResponse(); };
    SyncDiscourseSite.prototype.getTypeName = function () { return 'SyncDiscourseSite'; };
    return SyncDiscourseSite;
}());
export { SyncDiscourseSite };
// @Route("/admin/technology/{TechnologyId}/logo")
var LogoUrlApproval = /** @class */ (function () {
    function LogoUrlApproval(init) {
        Object.assign(this, init);
    }
    LogoUrlApproval.prototype.createResponse = function () { return new LogoUrlApprovalResponse(); };
    LogoUrlApproval.prototype.getTypeName = function () { return 'LogoUrlApproval'; };
    return LogoUrlApproval;
}());
export { LogoUrlApproval };
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
var LockTechStack = /** @class */ (function () {
    function LockTechStack(init) {
        Object.assign(this, init);
    }
    LockTechStack.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTechStack.prototype.getTypeName = function () { return 'LockTechStack'; };
    return LockTechStack;
}());
export { LockTechStack };
// @Route("/admin/technology/{TechnologyId}/lock")
var LockTech = /** @class */ (function () {
    function LockTech(init) {
        Object.assign(this, init);
    }
    LockTech.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTech.prototype.getTypeName = function () { return 'LockTech'; };
    return LockTech;
}());
export { LockTech };
// @Route("/email/post/{PostId}")
var EmailTest = /** @class */ (function () {
    function EmailTest(init) {
        Object.assign(this, init);
    }
    EmailTest.prototype.createResponse = function () { return new EmailTestRespoonse(); };
    EmailTest.prototype.getTypeName = function () { return 'EmailTest'; };
    return EmailTest;
}());
export { EmailTest };
var ImportUser = /** @class */ (function () {
    function ImportUser(init) {
        Object.assign(this, init);
    }
    ImportUser.prototype.createResponse = function () { return new ImportUserResponse(); };
    ImportUser.prototype.getTypeName = function () { return 'ImportUser'; };
    return ImportUser;
}());
export { ImportUser };
// @Route("/import/uservoice/suggestion")
var ImportUserVoiceSuggestion = /** @class */ (function () {
    function ImportUserVoiceSuggestion(init) {
        Object.assign(this, init);
    }
    ImportUserVoiceSuggestion.prototype.createResponse = function () { return new ImportUserVoiceSuggestionResponse(); };
    ImportUserVoiceSuggestion.prototype.getTypeName = function () { return 'ImportUserVoiceSuggestion'; };
    return ImportUserVoiceSuggestion;
}());
export { ImportUserVoiceSuggestion };
// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate(init) {
        Object.assign(this, init);
    }
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    Authenticate.prototype.getTypeName = function () { return 'Authenticate'; };
    return Authenticate;
}());
export { Authenticate };
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles(init) {
        Object.assign(this, init);
    }
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    AssignRoles.prototype.getTypeName = function () { return 'AssignRoles'; };
    return AssignRoles;
}());
export { AssignRoles };
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles(init) {
        Object.assign(this, init);
    }
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    UnAssignRoles.prototype.getTypeName = function () { return 'UnAssignRoles'; };
    return UnAssignRoles;
}());
export { UnAssignRoles };
// @Route("/session-to-token")
// @DataContract
var ConvertSessionToToken = /** @class */ (function () {
    function ConvertSessionToToken(init) {
        Object.assign(this, init);
    }
    ConvertSessionToToken.prototype.createResponse = function () { return new ConvertSessionToTokenResponse(); };
    ConvertSessionToToken.prototype.getTypeName = function () { return 'ConvertSessionToToken'; };
    return ConvertSessionToToken;
}());
export { ConvertSessionToToken };
// @Route("/access-token")
// @DataContract
var GetAccessToken = /** @class */ (function () {
    function GetAccessToken(init) {
        Object.assign(this, init);
    }
    GetAccessToken.prototype.createResponse = function () { return new GetAccessTokenResponse(); };
    GetAccessToken.prototype.getTypeName = function () { return 'GetAccessToken'; };
    return GetAccessToken;
}());
export { GetAccessToken };
// @Route("/posts/comment", "GET")
var QueryPostComments = /** @class */ (function (_super) {
    __extends(QueryPostComments, _super);
    function QueryPostComments(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryPostComments.prototype.createResponse = function () { return new QueryResponse(); };
    QueryPostComments.prototype.getTypeName = function () { return 'QueryPostComments'; };
    return QueryPostComments;
}(QueryDb));
export { QueryPostComments };
// @Route("/admin/technology/search")
// @AutoQueryViewer(DefaultSearchField="Tier", DefaultSearchText="Data", DefaultSearchType="=", Description="Explore different Technologies", IconUrl="octicon:database", Title="Find Technologies Admin")
var FindTechnologiesAdmin = /** @class */ (function (_super) {
    __extends(FindTechnologiesAdmin, _super);
    function FindTechnologiesAdmin(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    FindTechnologiesAdmin.prototype.createResponse = function () { return new QueryResponse(); };
    FindTechnologiesAdmin.prototype.getTypeName = function () { return 'FindTechnologiesAdmin'; };
    return FindTechnologiesAdmin;
}(QueryDb));
export { FindTechnologiesAdmin };
