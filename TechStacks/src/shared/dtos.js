/* Options:
Date: 2022-01-15 14:09:10
Version: 5.133
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://techstacks.io

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @DataContract
var QueryBase = /** @class */ (function () {
    function QueryBase(init) {
        Object.assign(this, init);
    }
    return QueryBase;
}());
export { QueryBase };
var QueryDb_1 = /** @class */ (function (_super) {
    __extends(QueryDb_1, _super);
    function QueryDb_1(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return QueryDb_1;
}(QueryBase));
export { QueryDb_1 };
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
export var ReportAction;
(function (ReportAction) {
    ReportAction["Dismiss"] = "Dismiss";
    ReportAction["Delete"] = "Delete";
})(ReportAction || (ReportAction = {}));
export var FlagType;
(function (FlagType) {
    FlagType["Violation"] = "Violation";
    FlagType["Spam"] = "Spam";
    FlagType["Abusive"] = "Abusive";
    FlagType["Confidential"] = "Confidential";
    FlagType["OffTopic"] = "OffTopic";
    FlagType["Other"] = "Other";
})(FlagType || (FlagType = {}));
export var Frequency;
(function (Frequency) {
    Frequency[Frequency["Daily"] = 1] = "Daily";
    Frequency[Frequency["Weekly"] = 7] = "Weekly";
    Frequency[Frequency["Monthly"] = 30] = "Monthly";
    Frequency[Frequency["Quarterly"] = 90] = "Quarterly";
})(Frequency || (Frequency = {}));
var QueryDb_2 = /** @class */ (function (_super) {
    __extends(QueryDb_2, _super);
    function QueryDb_2(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return QueryDb_2;
}(QueryBase));
export { QueryDb_2 };
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
var TechnologyView = /** @class */ (function () {
    function TechnologyView(init) {
        Object.assign(this, init);
    }
    return TechnologyView;
}());
export { TechnologyView };
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
var TechnologyStackView = /** @class */ (function () {
    function TechnologyStackView(init) {
        Object.assign(this, init);
    }
    return TechnologyStackView;
}());
export { TechnologyStackView };
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
var PostComment = /** @class */ (function () {
    function PostComment(init) {
        Object.assign(this, init);
    }
    return PostComment;
}());
export { PostComment };
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
var UserActivity = /** @class */ (function () {
    function UserActivity(init) {
        Object.assign(this, init);
    }
    return UserActivity;
}());
export { UserActivity };
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
// @Route("/ping")
var Ping = /** @class */ (function () {
    function Ping(init) {
        Object.assign(this, init);
    }
    Ping.prototype.getTypeName = function () { return 'Ping'; };
    Ping.prototype.getMethod = function () { return 'POST'; };
    Ping.prototype.createResponse = function () { };
    return Ping;
}());
export { Ping };
// @Route("/orgs/{Id}", "GET")
var GetOrganization = /** @class */ (function () {
    function GetOrganization(init) {
        Object.assign(this, init);
    }
    GetOrganization.prototype.getTypeName = function () { return 'GetOrganization'; };
    GetOrganization.prototype.getMethod = function () { return 'GET'; };
    GetOrganization.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    return GetOrganization;
}());
export { GetOrganization };
// @Route("/organizations/{Slug}", "GET")
var GetOrganizationBySlug = /** @class */ (function () {
    function GetOrganizationBySlug(init) {
        Object.assign(this, init);
    }
    GetOrganizationBySlug.prototype.getTypeName = function () { return 'GetOrganizationBySlug'; };
    GetOrganizationBySlug.prototype.getMethod = function () { return 'GET'; };
    GetOrganizationBySlug.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    return GetOrganizationBySlug;
}());
export { GetOrganizationBySlug };
// @Route("/orgs/{Id}/members", "GET")
var GetOrganizationMembers = /** @class */ (function () {
    function GetOrganizationMembers(init) {
        Object.assign(this, init);
    }
    GetOrganizationMembers.prototype.getTypeName = function () { return 'GetOrganizationMembers'; };
    GetOrganizationMembers.prototype.getMethod = function () { return 'GET'; };
    GetOrganizationMembers.prototype.createResponse = function () { return new GetOrganizationMembersResponse(); };
    return GetOrganizationMembers;
}());
export { GetOrganizationMembers };
// @Route("/orgs/{Id}/admin", "GET")
var GetOrganizationAdmin = /** @class */ (function () {
    function GetOrganizationAdmin(init) {
        Object.assign(this, init);
    }
    GetOrganizationAdmin.prototype.getTypeName = function () { return 'GetOrganizationAdmin'; };
    GetOrganizationAdmin.prototype.getMethod = function () { return 'GET'; };
    GetOrganizationAdmin.prototype.createResponse = function () { return new GetOrganizationAdminResponse(); };
    return GetOrganizationAdmin;
}());
export { GetOrganizationAdmin };
// @Route("/orgs/posts/new", "POST")
var CreateOrganizationForTechnology = /** @class */ (function () {
    function CreateOrganizationForTechnology(init) {
        Object.assign(this, init);
    }
    CreateOrganizationForTechnology.prototype.getTypeName = function () { return 'CreateOrganizationForTechnology'; };
    CreateOrganizationForTechnology.prototype.getMethod = function () { return 'POST'; };
    CreateOrganizationForTechnology.prototype.createResponse = function () { return new CreateOrganizationForTechnologyResponse(); };
    return CreateOrganizationForTechnology;
}());
export { CreateOrganizationForTechnology };
// @Route("/orgs", "POST")
var CreateOrganization = /** @class */ (function () {
    function CreateOrganization(init) {
        Object.assign(this, init);
    }
    CreateOrganization.prototype.getTypeName = function () { return 'CreateOrganization'; };
    CreateOrganization.prototype.getMethod = function () { return 'POST'; };
    CreateOrganization.prototype.createResponse = function () { return new CreateOrganizationResponse(); };
    return CreateOrganization;
}());
export { CreateOrganization };
// @Route("/orgs/{Id}", "PUT")
var UpdateOrganization = /** @class */ (function () {
    function UpdateOrganization(init) {
        Object.assign(this, init);
    }
    UpdateOrganization.prototype.getTypeName = function () { return 'UpdateOrganization'; };
    UpdateOrganization.prototype.getMethod = function () { return 'PUT'; };
    UpdateOrganization.prototype.createResponse = function () { return new UpdateOrganizationResponse(); };
    return UpdateOrganization;
}());
export { UpdateOrganization };
// @Route("/orgs/{Id}", "DELETE")
var DeleteOrganization = /** @class */ (function () {
    function DeleteOrganization(init) {
        Object.assign(this, init);
    }
    DeleteOrganization.prototype.getTypeName = function () { return 'DeleteOrganization'; };
    DeleteOrganization.prototype.getMethod = function () { return 'DELETE'; };
    DeleteOrganization.prototype.createResponse = function () { };
    return DeleteOrganization;
}());
export { DeleteOrganization };
// @Route("/orgs/{Id}/lock", "PUT")
var LockOrganization = /** @class */ (function () {
    function LockOrganization(init) {
        Object.assign(this, init);
    }
    LockOrganization.prototype.getTypeName = function () { return 'LockOrganization'; };
    LockOrganization.prototype.getMethod = function () { return 'PUT'; };
    LockOrganization.prototype.createResponse = function () { };
    return LockOrganization;
}());
export { LockOrganization };
// @Route("/orgs/{OrganizationId}/labels", "POST")
var AddOrganizationLabel = /** @class */ (function () {
    function AddOrganizationLabel(init) {
        Object.assign(this, init);
    }
    AddOrganizationLabel.prototype.getTypeName = function () { return 'AddOrganizationLabel'; };
    AddOrganizationLabel.prototype.getMethod = function () { return 'POST'; };
    AddOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    return AddOrganizationLabel;
}());
export { AddOrganizationLabel };
// @Route("/orgs/{OrganizationId}/members/{Slug}", "PUT")
var UpdateOrganizationLabel = /** @class */ (function () {
    function UpdateOrganizationLabel(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationLabel.prototype.getTypeName = function () { return 'UpdateOrganizationLabel'; };
    UpdateOrganizationLabel.prototype.getMethod = function () { return 'PUT'; };
    UpdateOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    return UpdateOrganizationLabel;
}());
export { UpdateOrganizationLabel };
// @Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE")
var RemoveOrganizationLabel = /** @class */ (function () {
    function RemoveOrganizationLabel(init) {
        Object.assign(this, init);
    }
    RemoveOrganizationLabel.prototype.getTypeName = function () { return 'RemoveOrganizationLabel'; };
    RemoveOrganizationLabel.prototype.getMethod = function () { return 'DELETE'; };
    RemoveOrganizationLabel.prototype.createResponse = function () { };
    return RemoveOrganizationLabel;
}());
export { RemoveOrganizationLabel };
// @Route("/orgs/{OrganizationId}/categories", "POST")
var AddOrganizationCategory = /** @class */ (function () {
    function AddOrganizationCategory(init) {
        Object.assign(this, init);
    }
    AddOrganizationCategory.prototype.getTypeName = function () { return 'AddOrganizationCategory'; };
    AddOrganizationCategory.prototype.getMethod = function () { return 'POST'; };
    AddOrganizationCategory.prototype.createResponse = function () { return new AddOrganizationCategoryResponse(); };
    return AddOrganizationCategory;
}());
export { AddOrganizationCategory };
// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
var UpdateOrganizationCategory = /** @class */ (function () {
    function UpdateOrganizationCategory(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationCategory.prototype.getTypeName = function () { return 'UpdateOrganizationCategory'; };
    UpdateOrganizationCategory.prototype.getMethod = function () { return 'PUT'; };
    UpdateOrganizationCategory.prototype.createResponse = function () { return new UpdateOrganizationCategoryResponse(); };
    return UpdateOrganizationCategory;
}());
export { UpdateOrganizationCategory };
// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
var DeleteOrganizationCategory = /** @class */ (function () {
    function DeleteOrganizationCategory(init) {
        Object.assign(this, init);
    }
    DeleteOrganizationCategory.prototype.getTypeName = function () { return 'DeleteOrganizationCategory'; };
    DeleteOrganizationCategory.prototype.getMethod = function () { return 'DELETE'; };
    DeleteOrganizationCategory.prototype.createResponse = function () { };
    return DeleteOrganizationCategory;
}());
export { DeleteOrganizationCategory };
// @Route("/orgs/{OrganizationId}/members", "POST")
var AddOrganizationMember = /** @class */ (function () {
    function AddOrganizationMember(init) {
        Object.assign(this, init);
    }
    AddOrganizationMember.prototype.getTypeName = function () { return 'AddOrganizationMember'; };
    AddOrganizationMember.prototype.getMethod = function () { return 'POST'; };
    AddOrganizationMember.prototype.createResponse = function () { return new AddOrganizationMemberResponse(); };
    return AddOrganizationMember;
}());
export { AddOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
var UpdateOrganizationMember = /** @class */ (function () {
    function UpdateOrganizationMember(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationMember.prototype.getTypeName = function () { return 'UpdateOrganizationMember'; };
    UpdateOrganizationMember.prototype.getMethod = function () { return 'PUT'; };
    UpdateOrganizationMember.prototype.createResponse = function () { return new UpdateOrganizationMemberResponse(); };
    return UpdateOrganizationMember;
}());
export { UpdateOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
var RemoveOrganizationMember = /** @class */ (function () {
    function RemoveOrganizationMember(init) {
        Object.assign(this, init);
    }
    RemoveOrganizationMember.prototype.getTypeName = function () { return 'RemoveOrganizationMember'; };
    RemoveOrganizationMember.prototype.getMethod = function () { return 'DELETE'; };
    RemoveOrganizationMember.prototype.createResponse = function () { };
    return RemoveOrganizationMember;
}());
export { RemoveOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/set", "POST")
var SetOrganizationMembers = /** @class */ (function () {
    function SetOrganizationMembers(init) {
        Object.assign(this, init);
    }
    SetOrganizationMembers.prototype.getTypeName = function () { return 'SetOrganizationMembers'; };
    SetOrganizationMembers.prototype.getMethod = function () { return 'POST'; };
    SetOrganizationMembers.prototype.createResponse = function () { return new SetOrganizationMembersResponse(); };
    return SetOrganizationMembers;
}());
export { SetOrganizationMembers };
// @Route("/orgs/{OrganizationId}/invites", "GET")
var GetOrganizationMemberInvites = /** @class */ (function () {
    function GetOrganizationMemberInvites(init) {
        Object.assign(this, init);
    }
    GetOrganizationMemberInvites.prototype.getTypeName = function () { return 'GetOrganizationMemberInvites'; };
    GetOrganizationMemberInvites.prototype.getMethod = function () { return 'GET'; };
    GetOrganizationMemberInvites.prototype.createResponse = function () { return new GetOrganizationMemberInvitesResponse(); };
    return GetOrganizationMemberInvites;
}());
export { GetOrganizationMemberInvites };
// @Route("/orgs/{OrganizationId}/invites", "POST")
var RequestOrganizationMemberInvite = /** @class */ (function () {
    function RequestOrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    RequestOrganizationMemberInvite.prototype.getTypeName = function () { return 'RequestOrganizationMemberInvite'; };
    RequestOrganizationMemberInvite.prototype.getMethod = function () { return 'POST'; };
    RequestOrganizationMemberInvite.prototype.createResponse = function () { return new RequestOrganizationMemberInviteResponse(); };
    return RequestOrganizationMemberInvite;
}());
export { RequestOrganizationMemberInvite };
// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
var UpdateOrganizationMemberInvite = /** @class */ (function () {
    function UpdateOrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationMemberInvite.prototype.getTypeName = function () { return 'UpdateOrganizationMemberInvite'; };
    UpdateOrganizationMemberInvite.prototype.getMethod = function () { return 'PUT'; };
    UpdateOrganizationMemberInvite.prototype.createResponse = function () { return new UpdateOrganizationMemberInviteResponse(); };
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
    QueryPosts.prototype.getTypeName = function () { return 'QueryPosts'; };
    QueryPosts.prototype.getMethod = function () { return 'GET'; };
    QueryPosts.prototype.createResponse = function () { return new QueryResponse(); };
    return QueryPosts;
}(QueryDb_1));
export { QueryPosts };
// @Route("/posts/{Id}", "GET")
var GetPost = /** @class */ (function () {
    function GetPost(init) {
        Object.assign(this, init);
    }
    GetPost.prototype.getTypeName = function () { return 'GetPost'; };
    GetPost.prototype.getMethod = function () { return 'GET'; };
    GetPost.prototype.createResponse = function () { return new GetPostResponse(); };
    return GetPost;
}());
export { GetPost };
// @Route("/posts", "POST")
var CreatePost = /** @class */ (function () {
    function CreatePost(init) {
        Object.assign(this, init);
    }
    CreatePost.prototype.getTypeName = function () { return 'CreatePost'; };
    CreatePost.prototype.getMethod = function () { return 'POST'; };
    CreatePost.prototype.createResponse = function () { return new CreatePostResponse(); };
    return CreatePost;
}());
export { CreatePost };
// @Route("/posts/{Id}", "PUT")
var UpdatePost = /** @class */ (function () {
    function UpdatePost(init) {
        Object.assign(this, init);
    }
    UpdatePost.prototype.getTypeName = function () { return 'UpdatePost'; };
    UpdatePost.prototype.getMethod = function () { return 'PUT'; };
    UpdatePost.prototype.createResponse = function () { return new UpdatePostResponse(); };
    return UpdatePost;
}());
export { UpdatePost };
// @Route("/posts/{Id}", "DELETE")
var DeletePost = /** @class */ (function () {
    function DeletePost(init) {
        Object.assign(this, init);
    }
    DeletePost.prototype.getTypeName = function () { return 'DeletePost'; };
    DeletePost.prototype.getMethod = function () { return 'DELETE'; };
    DeletePost.prototype.createResponse = function () { return new DeletePostResponse(); };
    return DeletePost;
}());
export { DeletePost };
// @Route("/posts/{Id}/lock", "PUT")
var LockPost = /** @class */ (function () {
    function LockPost(init) {
        Object.assign(this, init);
    }
    LockPost.prototype.getTypeName = function () { return 'LockPost'; };
    LockPost.prototype.getMethod = function () { return 'PUT'; };
    LockPost.prototype.createResponse = function () { };
    return LockPost;
}());
export { LockPost };
// @Route("/posts/{Id}/hide", "PUT")
var HidePost = /** @class */ (function () {
    function HidePost(init) {
        Object.assign(this, init);
    }
    HidePost.prototype.getTypeName = function () { return 'HidePost'; };
    HidePost.prototype.getMethod = function () { return 'PUT'; };
    HidePost.prototype.createResponse = function () { };
    return HidePost;
}());
export { HidePost };
// @Route("/posts/{Id}/status/{Status}", "PUT")
var ChangeStatusPost = /** @class */ (function () {
    function ChangeStatusPost(init) {
        Object.assign(this, init);
    }
    ChangeStatusPost.prototype.getTypeName = function () { return 'ChangeStatusPost'; };
    ChangeStatusPost.prototype.getMethod = function () { return 'PUT'; };
    ChangeStatusPost.prototype.createResponse = function () { };
    return ChangeStatusPost;
}());
export { ChangeStatusPost };
// @Route("/posts/{PostId}/report/{Id}", "POST")
var ActionPostReport = /** @class */ (function () {
    function ActionPostReport(init) {
        Object.assign(this, init);
    }
    ActionPostReport.prototype.getTypeName = function () { return 'ActionPostReport'; };
    ActionPostReport.prototype.getMethod = function () { return 'POST'; };
    ActionPostReport.prototype.createResponse = function () { };
    return ActionPostReport;
}());
export { ActionPostReport };
// @Route("/posts/{PostId}/comments", "POST")
var CreatePostComment = /** @class */ (function () {
    function CreatePostComment(init) {
        Object.assign(this, init);
    }
    CreatePostComment.prototype.getTypeName = function () { return 'CreatePostComment'; };
    CreatePostComment.prototype.getMethod = function () { return 'POST'; };
    CreatePostComment.prototype.createResponse = function () { return new CreatePostCommentResponse(); };
    return CreatePostComment;
}());
export { CreatePostComment };
// @Route("/posts/{PostId}/comments/{Id}", "PUT")
var UpdatePostComment = /** @class */ (function () {
    function UpdatePostComment(init) {
        Object.assign(this, init);
    }
    UpdatePostComment.prototype.getTypeName = function () { return 'UpdatePostComment'; };
    UpdatePostComment.prototype.getMethod = function () { return 'PUT'; };
    UpdatePostComment.prototype.createResponse = function () { return new UpdatePostCommentResponse(); };
    return UpdatePostComment;
}());
export { UpdatePostComment };
// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
var DeletePostComment = /** @class */ (function () {
    function DeletePostComment(init) {
        Object.assign(this, init);
    }
    DeletePostComment.prototype.getTypeName = function () { return 'DeletePostComment'; };
    DeletePostComment.prototype.getMethod = function () { return 'DELETE'; };
    DeletePostComment.prototype.createResponse = function () { return new DeletePostCommentResponse(); };
    return DeletePostComment;
}());
export { DeletePostComment };
// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
var ActionPostCommentReport = /** @class */ (function () {
    function ActionPostCommentReport(init) {
        Object.assign(this, init);
    }
    ActionPostCommentReport.prototype.getTypeName = function () { return 'ActionPostCommentReport'; };
    ActionPostCommentReport.prototype.getMethod = function () { return 'POST'; };
    ActionPostCommentReport.prototype.createResponse = function () { };
    return ActionPostCommentReport;
}());
export { ActionPostCommentReport };
// @Route("/user/comments/votes")
var GetUserPostCommentVotes = /** @class */ (function () {
    function GetUserPostCommentVotes(init) {
        Object.assign(this, init);
    }
    GetUserPostCommentVotes.prototype.getTypeName = function () { return 'GetUserPostCommentVotes'; };
    GetUserPostCommentVotes.prototype.getMethod = function () { return 'GET'; };
    GetUserPostCommentVotes.prototype.createResponse = function () { return new GetUserPostCommentVotesResponse(); };
    return GetUserPostCommentVotes;
}());
export { GetUserPostCommentVotes };
// @Route("/posts/{PostId}/comments/{Id}/pin", "PUT")
var PinPostComment = /** @class */ (function () {
    function PinPostComment(init) {
        Object.assign(this, init);
    }
    PinPostComment.prototype.getTypeName = function () { return 'PinPostComment'; };
    PinPostComment.prototype.getMethod = function () { return 'PUT'; };
    PinPostComment.prototype.createResponse = function () { return new PinPostCommentResponse(); };
    return PinPostComment;
}());
export { PinPostComment };
// @Route("/users/by-email")
var GetUsersByEmails = /** @class */ (function () {
    function GetUsersByEmails(init) {
        Object.assign(this, init);
    }
    GetUsersByEmails.prototype.getTypeName = function () { return 'GetUsersByEmails'; };
    GetUsersByEmails.prototype.getMethod = function () { return 'GET'; };
    GetUsersByEmails.prototype.createResponse = function () { return new GetUsersByEmailsResponse(); };
    return GetUsersByEmails;
}());
export { GetUsersByEmails };
// @Route("/user/posts/activity")
var GetUserPostActivity = /** @class */ (function () {
    function GetUserPostActivity(init) {
        Object.assign(this, init);
    }
    GetUserPostActivity.prototype.getTypeName = function () { return 'GetUserPostActivity'; };
    GetUserPostActivity.prototype.getMethod = function () { return 'GET'; };
    GetUserPostActivity.prototype.createResponse = function () { return new GetUserPostActivityResponse(); };
    return GetUserPostActivity;
}());
export { GetUserPostActivity };
// @Route("/user/organizations")
var GetUserOrganizations = /** @class */ (function () {
    function GetUserOrganizations(init) {
        Object.assign(this, init);
    }
    GetUserOrganizations.prototype.getTypeName = function () { return 'GetUserOrganizations'; };
    GetUserOrganizations.prototype.getMethod = function () { return 'GET'; };
    GetUserOrganizations.prototype.createResponse = function () { return new GetUserOrganizationsResponse(); };
    return GetUserOrganizations;
}());
export { GetUserOrganizations };
// @Route("/posts/{Id}/vote", "PUT")
var UserPostVote = /** @class */ (function () {
    function UserPostVote(init) {
        Object.assign(this, init);
    }
    UserPostVote.prototype.getTypeName = function () { return 'UserPostVote'; };
    UserPostVote.prototype.getMethod = function () { return 'PUT'; };
    UserPostVote.prototype.createResponse = function () { return new UserPostVoteResponse(); };
    return UserPostVote;
}());
export { UserPostVote };
// @Route("/posts/{Id}/favorite", "PUT")
var UserPostFavorite = /** @class */ (function () {
    function UserPostFavorite(init) {
        Object.assign(this, init);
    }
    UserPostFavorite.prototype.getTypeName = function () { return 'UserPostFavorite'; };
    UserPostFavorite.prototype.getMethod = function () { return 'PUT'; };
    UserPostFavorite.prototype.createResponse = function () { return new UserPostFavoriteResponse(); };
    return UserPostFavorite;
}());
export { UserPostFavorite };
// @Route("/posts/{Id}/report", "PUT")
var UserPostReport = /** @class */ (function () {
    function UserPostReport(init) {
        Object.assign(this, init);
    }
    UserPostReport.prototype.getTypeName = function () { return 'UserPostReport'; };
    UserPostReport.prototype.getMethod = function () { return 'PUT'; };
    UserPostReport.prototype.createResponse = function () { return new UserPostReportResponse(); };
    return UserPostReport;
}());
export { UserPostReport };
// @Route("/posts/{PostId}/comments/{Id}", "GET")
var UserPostCommentVote = /** @class */ (function () {
    function UserPostCommentVote(init) {
        Object.assign(this, init);
    }
    UserPostCommentVote.prototype.getTypeName = function () { return 'UserPostCommentVote'; };
    UserPostCommentVote.prototype.getMethod = function () { return 'GET'; };
    UserPostCommentVote.prototype.createResponse = function () { return new UserPostCommentVoteResponse(); };
    return UserPostCommentVote;
}());
export { UserPostCommentVote };
// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
var UserPostCommentReport = /** @class */ (function () {
    function UserPostCommentReport(init) {
        Object.assign(this, init);
    }
    UserPostCommentReport.prototype.getTypeName = function () { return 'UserPostCommentReport'; };
    UserPostCommentReport.prototype.getMethod = function () { return 'PUT'; };
    UserPostCommentReport.prototype.createResponse = function () { return new UserPostCommentReportResponse(); };
    return UserPostCommentReport;
}());
export { UserPostCommentReport };
// @Route("/prerender/{Path*}", "PUT")
var StorePreRender = /** @class */ (function () {
    function StorePreRender(init) {
        Object.assign(this, init);
    }
    StorePreRender.prototype.getTypeName = function () { return 'StorePreRender'; };
    StorePreRender.prototype.getMethod = function () { return 'PUT'; };
    StorePreRender.prototype.createResponse = function () { };
    return StorePreRender;
}());
export { StorePreRender };
// @Route("/prerender/{Path*}", "GET")
var GetPreRender = /** @class */ (function () {
    function GetPreRender(init) {
        Object.assign(this, init);
    }
    GetPreRender.prototype.getTypeName = function () { return 'GetPreRender'; };
    GetPreRender.prototype.getMethod = function () { return 'GET'; };
    GetPreRender.prototype.createResponse = function () { return ''; };
    return GetPreRender;
}());
export { GetPreRender };
// @Route("/my-session")
var SessionInfo = /** @class */ (function () {
    function SessionInfo(init) {
        Object.assign(this, init);
    }
    SessionInfo.prototype.getTypeName = function () { return 'SessionInfo'; };
    SessionInfo.prototype.getMethod = function () { return 'GET'; };
    SessionInfo.prototype.createResponse = function () { return new SessionInfoResponse(); };
    return SessionInfo;
}());
export { SessionInfo };
// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
var SubscribeToOrganization = /** @class */ (function () {
    function SubscribeToOrganization(init) {
        Object.assign(this, init);
    }
    SubscribeToOrganization.prototype.getTypeName = function () { return 'SubscribeToOrganization'; };
    SubscribeToOrganization.prototype.getMethod = function () { return 'PUT'; };
    SubscribeToOrganization.prototype.createResponse = function () { };
    return SubscribeToOrganization;
}());
export { SubscribeToOrganization };
// @Route("/posts/{PostId}/subscribe", "PUT")
var SubscribeToPost = /** @class */ (function () {
    function SubscribeToPost(init) {
        Object.assign(this, init);
    }
    SubscribeToPost.prototype.getTypeName = function () { return 'SubscribeToPost'; };
    SubscribeToPost.prototype.getMethod = function () { return 'PUT'; };
    SubscribeToPost.prototype.createResponse = function () { };
    return SubscribeToPost;
}());
export { SubscribeToPost };
// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
var DeleteOrganizationSubscription = /** @class */ (function () {
    function DeleteOrganizationSubscription(init) {
        Object.assign(this, init);
    }
    DeleteOrganizationSubscription.prototype.getTypeName = function () { return 'DeleteOrganizationSubscription'; };
    DeleteOrganizationSubscription.prototype.getMethod = function () { return 'DELETE'; };
    DeleteOrganizationSubscription.prototype.createResponse = function () { };
    return DeleteOrganizationSubscription;
}());
export { DeleteOrganizationSubscription };
// @Route("/posts/{PostId}/subscribe", "DELETE")
var DeletePostSubscription = /** @class */ (function () {
    function DeletePostSubscription(init) {
        Object.assign(this, init);
    }
    DeletePostSubscription.prototype.getTypeName = function () { return 'DeletePostSubscription'; };
    DeletePostSubscription.prototype.getMethod = function () { return 'DELETE'; };
    DeletePostSubscription.prototype.createResponse = function () { };
    return DeletePostSubscription;
}());
export { DeletePostSubscription };
// @Route("/technology/{Slug}/previous-versions", "GET")
var GetTechnologyPreviousVersions = /** @class */ (function () {
    function GetTechnologyPreviousVersions(init) {
        Object.assign(this, init);
    }
    GetTechnologyPreviousVersions.prototype.getTypeName = function () { return 'GetTechnologyPreviousVersions'; };
    GetTechnologyPreviousVersions.prototype.getMethod = function () { return 'GET'; };
    GetTechnologyPreviousVersions.prototype.createResponse = function () { return new GetTechnologyPreviousVersionsResponse(); };
    return GetTechnologyPreviousVersions;
}());
export { GetTechnologyPreviousVersions };
// @Route("/technology", "GET")
var GetAllTechnologies = /** @class */ (function () {
    function GetAllTechnologies(init) {
        Object.assign(this, init);
    }
    GetAllTechnologies.prototype.getTypeName = function () { return 'GetAllTechnologies'; };
    GetAllTechnologies.prototype.getMethod = function () { return 'GET'; };
    GetAllTechnologies.prototype.createResponse = function () { return new GetAllTechnologiesResponse(); };
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
    FindTechnologies.prototype.getTypeName = function () { return 'FindTechnologies'; };
    FindTechnologies.prototype.getMethod = function () { return 'GET'; };
    FindTechnologies.prototype.createResponse = function () { return new QueryResponse(); };
    return FindTechnologies;
}(QueryDb_2));
export { FindTechnologies };
// @Route("/technology/query")
var QueryTechnology = /** @class */ (function (_super) {
    __extends(QueryTechnology, _super);
    function QueryTechnology(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryTechnology.prototype.getTypeName = function () { return 'QueryTechnology'; };
    QueryTechnology.prototype.getMethod = function () { return 'GET'; };
    QueryTechnology.prototype.createResponse = function () { return new QueryResponse(); };
    return QueryTechnology;
}(QueryDb_2));
export { QueryTechnology };
// @Route("/technology/{Slug}")
var GetTechnology = /** @class */ (function () {
    function GetTechnology(init) {
        Object.assign(this, init);
    }
    GetTechnology.prototype.getTypeName = function () { return 'GetTechnology'; };
    GetTechnology.prototype.getMethod = function () { return 'GET'; };
    GetTechnology.prototype.createResponse = function () { return new GetTechnologyResponse(); };
    return GetTechnology;
}());
export { GetTechnology };
// @Route("/technology/{Slug}/favorites")
var GetTechnologyFavoriteDetails = /** @class */ (function () {
    function GetTechnologyFavoriteDetails(init) {
        Object.assign(this, init);
    }
    GetTechnologyFavoriteDetails.prototype.getTypeName = function () { return 'GetTechnologyFavoriteDetails'; };
    GetTechnologyFavoriteDetails.prototype.getMethod = function () { return 'GET'; };
    GetTechnologyFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyFavoriteDetailsResponse(); };
    return GetTechnologyFavoriteDetails;
}());
export { GetTechnologyFavoriteDetails };
// @Route("/technology", "POST")
var CreateTechnology = /** @class */ (function () {
    function CreateTechnology(init) {
        Object.assign(this, init);
    }
    CreateTechnology.prototype.getTypeName = function () { return 'CreateTechnology'; };
    CreateTechnology.prototype.getMethod = function () { return 'POST'; };
    CreateTechnology.prototype.createResponse = function () { return new CreateTechnologyResponse(); };
    return CreateTechnology;
}());
export { CreateTechnology };
// @Route("/technology/{Id}", "PUT")
var UpdateTechnology = /** @class */ (function () {
    function UpdateTechnology(init) {
        Object.assign(this, init);
    }
    UpdateTechnology.prototype.getTypeName = function () { return 'UpdateTechnology'; };
    UpdateTechnology.prototype.getMethod = function () { return 'PUT'; };
    UpdateTechnology.prototype.createResponse = function () { return new UpdateTechnologyResponse(); };
    return UpdateTechnology;
}());
export { UpdateTechnology };
// @Route("/technology/{Id}", "DELETE")
var DeleteTechnology = /** @class */ (function () {
    function DeleteTechnology(init) {
        Object.assign(this, init);
    }
    DeleteTechnology.prototype.getTypeName = function () { return 'DeleteTechnology'; };
    DeleteTechnology.prototype.getMethod = function () { return 'DELETE'; };
    DeleteTechnology.prototype.createResponse = function () { return new DeleteTechnologyResponse(); };
    return DeleteTechnology;
}());
export { DeleteTechnology };
// @Route("/techstacks/{Slug}/previous-versions", "GET")
var GetTechnologyStackPreviousVersions = /** @class */ (function () {
    function GetTechnologyStackPreviousVersions(init) {
        Object.assign(this, init);
    }
    GetTechnologyStackPreviousVersions.prototype.getTypeName = function () { return 'GetTechnologyStackPreviousVersions'; };
    GetTechnologyStackPreviousVersions.prototype.getMethod = function () { return 'GET'; };
    GetTechnologyStackPreviousVersions.prototype.createResponse = function () { return new GetTechnologyStackPreviousVersionsResponse(); };
    return GetTechnologyStackPreviousVersions;
}());
export { GetTechnologyStackPreviousVersions };
// @Route("/pagestats/{Type}/{Slug}")
var GetPageStats = /** @class */ (function () {
    function GetPageStats(init) {
        Object.assign(this, init);
    }
    GetPageStats.prototype.getTypeName = function () { return 'GetPageStats'; };
    GetPageStats.prototype.getMethod = function () { return 'GET'; };
    GetPageStats.prototype.createResponse = function () { return new GetPageStatsResponse(); };
    return GetPageStats;
}());
export { GetPageStats };
// @Route("/cache/clear")
var ClearCache = /** @class */ (function () {
    function ClearCache(init) {
        Object.assign(this, init);
    }
    ClearCache.prototype.getTypeName = function () { return 'ClearCache'; };
    ClearCache.prototype.getMethod = function () { return 'GET'; };
    ClearCache.prototype.createResponse = function () { return ''; };
    return ClearCache;
}());
export { ClearCache };
// @Route("/tasks/hourly")
var HourlyTask = /** @class */ (function () {
    function HourlyTask(init) {
        Object.assign(this, init);
    }
    HourlyTask.prototype.getTypeName = function () { return 'HourlyTask'; };
    HourlyTask.prototype.getMethod = function () { return 'GET'; };
    HourlyTask.prototype.createResponse = function () { return new HourlyTaskResponse(); };
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
    FindTechStacks.prototype.getTypeName = function () { return 'FindTechStacks'; };
    FindTechStacks.prototype.getMethod = function () { return 'GET'; };
    FindTechStacks.prototype.createResponse = function () { return new QueryResponse(); };
    return FindTechStacks;
}(QueryDb_2));
export { FindTechStacks };
// @Route("/techstacks/query")
var QueryTechStacks = /** @class */ (function (_super) {
    __extends(QueryTechStacks, _super);
    function QueryTechStacks(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryTechStacks.prototype.getTypeName = function () { return 'QueryTechStacks'; };
    QueryTechStacks.prototype.getMethod = function () { return 'GET'; };
    QueryTechStacks.prototype.createResponse = function () { return new QueryResponse(); };
    return QueryTechStacks;
}(QueryDb_2));
export { QueryTechStacks };
// @Route("/overview")
var Overview = /** @class */ (function () {
    function Overview(init) {
        Object.assign(this, init);
    }
    Overview.prototype.getTypeName = function () { return 'Overview'; };
    Overview.prototype.getMethod = function () { return 'GET'; };
    Overview.prototype.createResponse = function () { return new OverviewResponse(); };
    return Overview;
}());
export { Overview };
// @Route("/app-overview")
var AppOverview = /** @class */ (function () {
    function AppOverview(init) {
        Object.assign(this, init);
    }
    AppOverview.prototype.getTypeName = function () { return 'AppOverview'; };
    AppOverview.prototype.getMethod = function () { return 'GET'; };
    AppOverview.prototype.createResponse = function () { return new AppOverviewResponse(); };
    return AppOverview;
}());
export { AppOverview };
// @Route("/techstacks", "GET")
var GetAllTechnologyStacks = /** @class */ (function () {
    function GetAllTechnologyStacks(init) {
        Object.assign(this, init);
    }
    GetAllTechnologyStacks.prototype.getTypeName = function () { return 'GetAllTechnologyStacks'; };
    GetAllTechnologyStacks.prototype.getMethod = function () { return 'GET'; };
    GetAllTechnologyStacks.prototype.createResponse = function () { return new GetAllTechnologyStacksResponse(); };
    return GetAllTechnologyStacks;
}());
export { GetAllTechnologyStacks };
// @Route("/techstacks/{Slug}", "GET")
var GetTechnologyStack = /** @class */ (function () {
    function GetTechnologyStack(init) {
        Object.assign(this, init);
    }
    GetTechnologyStack.prototype.getTypeName = function () { return 'GetTechnologyStack'; };
    GetTechnologyStack.prototype.getMethod = function () { return 'GET'; };
    GetTechnologyStack.prototype.createResponse = function () { return new GetTechnologyStackResponse(); };
    return GetTechnologyStack;
}());
export { GetTechnologyStack };
// @Route("/techstacks/{Slug}/favorites")
var GetTechnologyStackFavoriteDetails = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetails(init) {
        Object.assign(this, init);
    }
    GetTechnologyStackFavoriteDetails.prototype.getTypeName = function () { return 'GetTechnologyStackFavoriteDetails'; };
    GetTechnologyStackFavoriteDetails.prototype.getMethod = function () { return 'GET'; };
    GetTechnologyStackFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyStackFavoriteDetailsResponse(); };
    return GetTechnologyStackFavoriteDetails;
}());
export { GetTechnologyStackFavoriteDetails };
// @Route("/config")
var GetConfig = /** @class */ (function () {
    function GetConfig(init) {
        Object.assign(this, init);
    }
    GetConfig.prototype.getTypeName = function () { return 'GetConfig'; };
    GetConfig.prototype.getMethod = function () { return 'GET'; };
    GetConfig.prototype.createResponse = function () { return new GetConfigResponse(); };
    return GetConfig;
}());
export { GetConfig };
// @Route("/techstacks", "POST")
var CreateTechnologyStack = /** @class */ (function () {
    function CreateTechnologyStack(init) {
        Object.assign(this, init);
    }
    CreateTechnologyStack.prototype.getTypeName = function () { return 'CreateTechnologyStack'; };
    CreateTechnologyStack.prototype.getMethod = function () { return 'POST'; };
    CreateTechnologyStack.prototype.createResponse = function () { return new CreateTechnologyStackResponse(); };
    return CreateTechnologyStack;
}());
export { CreateTechnologyStack };
// @Route("/techstacks/{Id}", "PUT")
var UpdateTechnologyStack = /** @class */ (function () {
    function UpdateTechnologyStack(init) {
        Object.assign(this, init);
    }
    UpdateTechnologyStack.prototype.getTypeName = function () { return 'UpdateTechnologyStack'; };
    UpdateTechnologyStack.prototype.getMethod = function () { return 'PUT'; };
    UpdateTechnologyStack.prototype.createResponse = function () { return new UpdateTechnologyStackResponse(); };
    return UpdateTechnologyStack;
}());
export { UpdateTechnologyStack };
// @Route("/techstacks/{Id}", "DELETE")
var DeleteTechnologyStack = /** @class */ (function () {
    function DeleteTechnologyStack(init) {
        Object.assign(this, init);
    }
    DeleteTechnologyStack.prototype.getTypeName = function () { return 'DeleteTechnologyStack'; };
    DeleteTechnologyStack.prototype.getMethod = function () { return 'DELETE'; };
    DeleteTechnologyStack.prototype.createResponse = function () { return new DeleteTechnologyStackResponse(); };
    return DeleteTechnologyStack;
}());
export { DeleteTechnologyStack };
// @Route("/favorites/techtacks", "GET")
var GetFavoriteTechStack = /** @class */ (function () {
    function GetFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    GetFavoriteTechStack.prototype.getTypeName = function () { return 'GetFavoriteTechStack'; };
    GetFavoriteTechStack.prototype.getMethod = function () { return 'GET'; };
    GetFavoriteTechStack.prototype.createResponse = function () { return new GetFavoriteTechStackResponse(); };
    return GetFavoriteTechStack;
}());
export { GetFavoriteTechStack };
// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
var AddFavoriteTechStack = /** @class */ (function () {
    function AddFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    AddFavoriteTechStack.prototype.getTypeName = function () { return 'AddFavoriteTechStack'; };
    AddFavoriteTechStack.prototype.getMethod = function () { return 'PUT'; };
    AddFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    return AddFavoriteTechStack;
}());
export { AddFavoriteTechStack };
// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
var RemoveFavoriteTechStack = /** @class */ (function () {
    function RemoveFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    RemoveFavoriteTechStack.prototype.getTypeName = function () { return 'RemoveFavoriteTechStack'; };
    RemoveFavoriteTechStack.prototype.getMethod = function () { return 'DELETE'; };
    RemoveFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    return RemoveFavoriteTechStack;
}());
export { RemoveFavoriteTechStack };
// @Route("/favorites/technology", "GET")
var GetFavoriteTechnologies = /** @class */ (function () {
    function GetFavoriteTechnologies(init) {
        Object.assign(this, init);
    }
    GetFavoriteTechnologies.prototype.getTypeName = function () { return 'GetFavoriteTechnologies'; };
    GetFavoriteTechnologies.prototype.getMethod = function () { return 'GET'; };
    GetFavoriteTechnologies.prototype.createResponse = function () { return new GetFavoriteTechnologiesResponse(); };
    return GetFavoriteTechnologies;
}());
export { GetFavoriteTechnologies };
// @Route("/favorites/technology/{TechnologyId}", "PUT")
var AddFavoriteTechnology = /** @class */ (function () {
    function AddFavoriteTechnology(init) {
        Object.assign(this, init);
    }
    AddFavoriteTechnology.prototype.getTypeName = function () { return 'AddFavoriteTechnology'; };
    AddFavoriteTechnology.prototype.getMethod = function () { return 'PUT'; };
    AddFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    return AddFavoriteTechnology;
}());
export { AddFavoriteTechnology };
// @Route("/favorites/technology/{TechnologyId}", "DELETE")
var RemoveFavoriteTechnology = /** @class */ (function () {
    function RemoveFavoriteTechnology(init) {
        Object.assign(this, init);
    }
    RemoveFavoriteTechnology.prototype.getTypeName = function () { return 'RemoveFavoriteTechnology'; };
    RemoveFavoriteTechnology.prototype.getMethod = function () { return 'DELETE'; };
    RemoveFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    return RemoveFavoriteTechnology;
}());
export { RemoveFavoriteTechnology };
// @Route("/my-feed")
var GetUserFeed = /** @class */ (function () {
    function GetUserFeed(init) {
        Object.assign(this, init);
    }
    GetUserFeed.prototype.getTypeName = function () { return 'GetUserFeed'; };
    GetUserFeed.prototype.getMethod = function () { return 'GET'; };
    GetUserFeed.prototype.createResponse = function () { return new GetUserFeedResponse(); };
    return GetUserFeed;
}());
export { GetUserFeed };
// @Route("/users/karma", "GET")
var GetUsersKarma = /** @class */ (function () {
    function GetUsersKarma(init) {
        Object.assign(this, init);
    }
    GetUsersKarma.prototype.getTypeName = function () { return 'GetUsersKarma'; };
    GetUsersKarma.prototype.getMethod = function () { return 'GET'; };
    GetUsersKarma.prototype.createResponse = function () { return new GetUsersKarmaResponse(); };
    return GetUsersKarma;
}());
export { GetUsersKarma };
// @Route("/userinfo/{UserName}")
var GetUserInfo = /** @class */ (function () {
    function GetUserInfo(init) {
        Object.assign(this, init);
    }
    GetUserInfo.prototype.getTypeName = function () { return 'GetUserInfo'; };
    GetUserInfo.prototype.getMethod = function () { return 'GET'; };
    GetUserInfo.prototype.createResponse = function () { return new GetUserInfoResponse(); };
    return GetUserInfo;
}());
export { GetUserInfo };
// @Route("/users/{UserName}/avatar", "GET")
var UserAvatar = /** @class */ (function () {
    function UserAvatar(init) {
        Object.assign(this, init);
    }
    UserAvatar.prototype.getTypeName = function () { return 'UserAvatar'; };
    UserAvatar.prototype.getMethod = function () { return 'GET'; };
    UserAvatar.prototype.createResponse = function () { };
    return UserAvatar;
}());
export { UserAvatar };
// @Route("/mq/start")
var MqStart = /** @class */ (function () {
    function MqStart(init) {
        Object.assign(this, init);
    }
    MqStart.prototype.getTypeName = function () { return 'MqStart'; };
    MqStart.prototype.getMethod = function () { return 'POST'; };
    MqStart.prototype.createResponse = function () { return ''; };
    return MqStart;
}());
export { MqStart };
// @Route("/mq/stop")
var MqStop = /** @class */ (function () {
    function MqStop(init) {
        Object.assign(this, init);
    }
    MqStop.prototype.getTypeName = function () { return 'MqStop'; };
    MqStop.prototype.getMethod = function () { return 'POST'; };
    MqStop.prototype.createResponse = function () { return ''; };
    return MqStop;
}());
export { MqStop };
// @Route("/mq/stats")
var MqStats = /** @class */ (function () {
    function MqStats(init) {
        Object.assign(this, init);
    }
    MqStats.prototype.getTypeName = function () { return 'MqStats'; };
    MqStats.prototype.getMethod = function () { return 'POST'; };
    MqStats.prototype.createResponse = function () { return ''; };
    return MqStats;
}());
export { MqStats };
// @Route("/mq/status")
var MqStatus = /** @class */ (function () {
    function MqStatus(init) {
        Object.assign(this, init);
    }
    MqStatus.prototype.getTypeName = function () { return 'MqStatus'; };
    MqStatus.prototype.getMethod = function () { return 'POST'; };
    MqStatus.prototype.createResponse = function () { return ''; };
    return MqStatus;
}());
export { MqStatus };
// @Route("/sync/discourse/{Site}")
var SyncDiscourseSite = /** @class */ (function () {
    function SyncDiscourseSite(init) {
        Object.assign(this, init);
    }
    SyncDiscourseSite.prototype.getTypeName = function () { return 'SyncDiscourseSite'; };
    SyncDiscourseSite.prototype.getMethod = function () { return 'POST'; };
    SyncDiscourseSite.prototype.createResponse = function () { return new SyncDiscourseSiteResponse(); };
    return SyncDiscourseSite;
}());
export { SyncDiscourseSite };
// @Route("/admin/technology/{TechnologyId}/logo")
var LogoUrlApproval = /** @class */ (function () {
    function LogoUrlApproval(init) {
        Object.assign(this, init);
    }
    LogoUrlApproval.prototype.getTypeName = function () { return 'LogoUrlApproval'; };
    LogoUrlApproval.prototype.getMethod = function () { return 'PUT'; };
    LogoUrlApproval.prototype.createResponse = function () { return new LogoUrlApprovalResponse(); };
    return LogoUrlApproval;
}());
export { LogoUrlApproval };
/**
* Limit updates to TechStack to Owner or Admin users
*/
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
var LockTechStack = /** @class */ (function () {
    function LockTechStack(init) {
        Object.assign(this, init);
    }
    LockTechStack.prototype.getTypeName = function () { return 'LockTechStack'; };
    LockTechStack.prototype.getMethod = function () { return 'PUT'; };
    LockTechStack.prototype.createResponse = function () { return new LockStackResponse(); };
    return LockTechStack;
}());
export { LockTechStack };
/**
* Limit updates to Technology to Owner or Admin users
*/
// @Route("/admin/technology/{TechnologyId}/lock")
// @Api(Description="Limit updates to Technology to Owner or Admin users")
var LockTech = /** @class */ (function () {
    function LockTech(init) {
        Object.assign(this, init);
    }
    LockTech.prototype.getTypeName = function () { return 'LockTech'; };
    LockTech.prototype.getMethod = function () { return 'PUT'; };
    LockTech.prototype.createResponse = function () { return new LockStackResponse(); };
    return LockTech;
}());
export { LockTech };
var DummyTypes = /** @class */ (function () {
    function DummyTypes(init) {
        Object.assign(this, init);
    }
    DummyTypes.prototype.getTypeName = function () { return 'DummyTypes'; };
    DummyTypes.prototype.getMethod = function () { return 'POST'; };
    DummyTypes.prototype.createResponse = function () { };
    return DummyTypes;
}());
export { DummyTypes };
// @Route("/email/post/{PostId}")
var EmailTest = /** @class */ (function () {
    function EmailTest(init) {
        Object.assign(this, init);
    }
    EmailTest.prototype.getTypeName = function () { return 'EmailTest'; };
    EmailTest.prototype.getMethod = function () { return 'POST'; };
    EmailTest.prototype.createResponse = function () { return new EmailTestRespoonse(); };
    return EmailTest;
}());
export { EmailTest };
var ImportUser = /** @class */ (function () {
    function ImportUser(init) {
        Object.assign(this, init);
    }
    ImportUser.prototype.getTypeName = function () { return 'ImportUser'; };
    ImportUser.prototype.getMethod = function () { return 'POST'; };
    ImportUser.prototype.createResponse = function () { return new ImportUserResponse(); };
    return ImportUser;
}());
export { ImportUser };
// @Route("/import/uservoice/suggestion")
var ImportUserVoiceSuggestion = /** @class */ (function () {
    function ImportUserVoiceSuggestion(init) {
        Object.assign(this, init);
    }
    ImportUserVoiceSuggestion.prototype.getTypeName = function () { return 'ImportUserVoiceSuggestion'; };
    ImportUserVoiceSuggestion.prototype.getMethod = function () { return 'POST'; };
    ImportUserVoiceSuggestion.prototype.createResponse = function () { return new ImportUserVoiceSuggestionResponse(); };
    return ImportUserVoiceSuggestion;
}());
export { ImportUserVoiceSuggestion };
/**
* Sign In
*/
// @Route("/auth")
// @Route("/auth/{provider}")
// @Api(Description="Sign In")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate(init) {
        Object.assign(this, init);
    }
    Authenticate.prototype.getTypeName = function () { return 'Authenticate'; };
    Authenticate.prototype.getMethod = function () { return 'POST'; };
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    return Authenticate;
}());
export { Authenticate };
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles(init) {
        Object.assign(this, init);
    }
    AssignRoles.prototype.getTypeName = function () { return 'AssignRoles'; };
    AssignRoles.prototype.getMethod = function () { return 'POST'; };
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    return AssignRoles;
}());
export { AssignRoles };
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles(init) {
        Object.assign(this, init);
    }
    UnAssignRoles.prototype.getTypeName = function () { return 'UnAssignRoles'; };
    UnAssignRoles.prototype.getMethod = function () { return 'POST'; };
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    return UnAssignRoles;
}());
export { UnAssignRoles };
// @Route("/posts/comment", "GET")
var QueryPostComments = /** @class */ (function (_super) {
    __extends(QueryPostComments, _super);
    function QueryPostComments(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    QueryPostComments.prototype.getTypeName = function () { return 'QueryPostComments'; };
    QueryPostComments.prototype.getMethod = function () { return 'GET'; };
    QueryPostComments.prototype.createResponse = function () { return new QueryResponse(); };
    return QueryPostComments;
}(QueryDb_1));
export { QueryPostComments };
