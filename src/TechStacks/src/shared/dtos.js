"use strict";
/* Options:
Date: 2022-01-01 04:59:08
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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AddOrganizationMemberResponse = exports.UpdateOrganizationCategoryResponse = exports.AddOrganizationCategoryResponse = exports.OrganizationLabelResponse = exports.UpdateOrganizationResponse = exports.CreateOrganizationResponse = exports.CreateOrganizationForTechnologyResponse = exports.GetOrganizationAdminResponse = exports.GetOrganizationMembersResponse = exports.GetOrganizationResponse = exports.Option = exports.OrganizationInfo = exports.CategoryInfo = exports.LabelInfo = exports.TechStackDetails = exports.TechnologyInStack = exports.TechnologyInfo = exports.UserInfo = exports.TechnologyStackHistory = exports.TechnologyHistory = exports.UserActivity = exports.OrganizationSubscription = exports.UserRef = exports.PostCommentReportInfo = exports.PostReportInfo = exports.OrganizationMemberInvite = exports.ResponseStatus = exports.ResponseError = exports.OrganizationMember = exports.Category = exports.OrganizationLabel = exports.Organization = exports.PostComment = exports.UserVoiceComment = exports.UserVoiceUser = exports.TechnologyStackView = exports.TechnologyStack = exports.TechnologyStackBase = exports.TechnologyView = exports.Technology = exports.TechnologyBase = exports.TechnologyTier = exports.QueryDb_2 = exports.Frequency = exports.FlagType = exports.ReportAction = exports.Post = exports.PostType = exports.QueryDb_1 = exports.QueryBase = void 0;
exports.GetUserInfoResponse = exports.GetUsersKarmaResponse = exports.GetUserFeedResponse = exports.FavoriteTechnologyResponse = exports.GetFavoriteTechnologiesResponse = exports.FavoriteTechStackResponse = exports.GetFavoriteTechStackResponse = exports.DeleteTechnologyStackResponse = exports.UpdateTechnologyStackResponse = exports.CreateTechnologyStackResponse = exports.GetConfigResponse = exports.GetTechnologyStackFavoriteDetailsResponse = exports.GetTechnologyStackResponse = exports.GetAllTechnologyStacksResponse = exports.AppOverviewResponse = exports.OverviewResponse = exports.HourlyTaskResponse = exports.GetPageStatsResponse = exports.GetTechnologyStackPreviousVersionsResponse = exports.DeleteTechnologyResponse = exports.UpdateTechnologyResponse = exports.CreateTechnologyResponse = exports.GetTechnologyFavoriteDetailsResponse = exports.GetTechnologyResponse = exports.GetAllTechnologiesResponse = exports.GetTechnologyPreviousVersionsResponse = exports.SessionInfoResponse = exports.UserPostCommentReportResponse = exports.UserPostCommentVoteResponse = exports.UserPostReportResponse = exports.UserPostFavoriteResponse = exports.UserPostVoteResponse = exports.GetUserOrganizationsResponse = exports.GetUserPostActivityResponse = exports.GetUsersByEmailsResponse = exports.PinPostCommentResponse = exports.GetUserPostCommentVotesResponse = exports.DeletePostCommentResponse = exports.UpdatePostCommentResponse = exports.CreatePostCommentResponse = exports.DeletePostResponse = exports.UpdatePostResponse = exports.CreatePostResponse = exports.GetPostResponse = exports.QueryResponse = exports.UpdateOrganizationMemberInviteResponse = exports.RequestOrganizationMemberInviteResponse = exports.GetOrganizationMemberInvitesResponse = exports.SetOrganizationMembersResponse = exports.UpdateOrganizationMemberResponse = void 0;
exports.GetUsersByEmails = exports.PinPostComment = exports.GetUserPostCommentVotes = exports.ActionPostCommentReport = exports.DeletePostComment = exports.UpdatePostComment = exports.CreatePostComment = exports.ActionPostReport = exports.ChangeStatusPost = exports.HidePost = exports.LockPost = exports.DeletePost = exports.UpdatePost = exports.CreatePost = exports.GetPost = exports.QueryPosts = exports.UpdateOrganizationMemberInvite = exports.RequestOrganizationMemberInvite = exports.GetOrganizationMemberInvites = exports.SetOrganizationMembers = exports.RemoveOrganizationMember = exports.UpdateOrganizationMember = exports.AddOrganizationMember = exports.DeleteOrganizationCategory = exports.UpdateOrganizationCategory = exports.AddOrganizationCategory = exports.RemoveOrganizationLabel = exports.UpdateOrganizationLabel = exports.AddOrganizationLabel = exports.LockOrganization = exports.DeleteOrganization = exports.UpdateOrganization = exports.CreateOrganization = exports.CreateOrganizationForTechnology = exports.GetOrganizationAdmin = exports.GetOrganizationMembers = exports.GetOrganizationBySlug = exports.GetOrganization = exports.Ping = exports.GetAccessTokenResponse = exports.ConvertSessionToTokenResponse = exports.UnAssignRolesResponse = exports.AssignRolesResponse = exports.AuthenticateResponse = exports.ImportUserVoiceSuggestionResponse = exports.ImportUserResponse = exports.EmailTestRespoonse = exports.LockStackResponse = exports.LogoUrlApprovalResponse = exports.SyncDiscourseSiteResponse = void 0;
exports.MqStop = exports.MqStart = exports.UserAvatar = exports.GetUserInfo = exports.GetUsersKarma = exports.GetUserFeed = exports.RemoveFavoriteTechnology = exports.AddFavoriteTechnology = exports.GetFavoriteTechnologies = exports.RemoveFavoriteTechStack = exports.AddFavoriteTechStack = exports.GetFavoriteTechStack = exports.DeleteTechnologyStack = exports.UpdateTechnologyStack = exports.CreateTechnologyStack = exports.GetConfig = exports.GetTechnologyStackFavoriteDetails = exports.GetTechnologyStack = exports.GetAllTechnologyStacks = exports.AppOverview = exports.Overview = exports.QueryTechStacks = exports.FindTechStacks = exports.HourlyTask = exports.ClearCache = exports.GetPageStats = exports.GetTechnologyStackPreviousVersions = exports.DeleteTechnology = exports.UpdateTechnology = exports.CreateTechnology = exports.GetTechnologyFavoriteDetails = exports.GetTechnology = exports.QueryTechnology = exports.FindTechnologies = exports.GetAllTechnologies = exports.GetTechnologyPreviousVersions = exports.DeletePostSubscription = exports.DeleteOrganizationSubscription = exports.SubscribeToPost = exports.SubscribeToOrganization = exports.SessionInfo = exports.GetPreRender = exports.StorePreRender = exports.UserPostCommentReport = exports.UserPostCommentVote = exports.UserPostReport = exports.UserPostFavorite = exports.UserPostVote = exports.GetUserOrganizations = exports.GetUserPostActivity = void 0;
exports.QueryPostComments = exports.GetAccessToken = exports.ConvertSessionToToken = exports.UnAssignRoles = exports.AssignRoles = exports.Authenticate = exports.ImportUserVoiceSuggestion = exports.ImportUser = exports.EmailTest = exports.DummyTypes = exports.LockTech = exports.LockTechStack = exports.LogoUrlApproval = exports.SyncDiscourseSite = exports.MqStatus = exports.MqStats = void 0;
// @DataContract
var QueryBase = /** @class */ (function () {
    function QueryBase(init) {
        Object.assign(this, init);
    }
    return QueryBase;
}());
exports.QueryBase = QueryBase;
var QueryDb_1 = /** @class */ (function (_super) {
    __extends(QueryDb_1, _super);
    function QueryDb_1(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return QueryDb_1;
}(QueryBase));
exports.QueryDb_1 = QueryDb_1;
var PostType;
(function (PostType) {
    PostType["Announcement"] = "Announcement";
    PostType["Post"] = "Post";
    PostType["Showcase"] = "Showcase";
    PostType["Question"] = "Question";
    PostType["Request"] = "Request";
})(PostType = exports.PostType || (exports.PostType = {}));
var Post = /** @class */ (function () {
    function Post(init) {
        Object.assign(this, init);
    }
    return Post;
}());
exports.Post = Post;
var ReportAction;
(function (ReportAction) {
    ReportAction["Dismiss"] = "Dismiss";
    ReportAction["Delete"] = "Delete";
})(ReportAction = exports.ReportAction || (exports.ReportAction = {}));
var FlagType;
(function (FlagType) {
    FlagType["Violation"] = "Violation";
    FlagType["Spam"] = "Spam";
    FlagType["Abusive"] = "Abusive";
    FlagType["Confidential"] = "Confidential";
    FlagType["OffTopic"] = "OffTopic";
    FlagType["Other"] = "Other";
})(FlagType = exports.FlagType || (exports.FlagType = {}));
var Frequency;
(function (Frequency) {
    Frequency[Frequency["Daily"] = 1] = "Daily";
    Frequency[Frequency["Weekly"] = 7] = "Weekly";
    Frequency[Frequency["Monthly"] = 30] = "Monthly";
    Frequency[Frequency["Quarterly"] = 90] = "Quarterly";
})(Frequency = exports.Frequency || (exports.Frequency = {}));
var QueryDb_2 = /** @class */ (function (_super) {
    __extends(QueryDb_2, _super);
    function QueryDb_2(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return QueryDb_2;
}(QueryBase));
exports.QueryDb_2 = QueryDb_2;
var TechnologyTier;
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
})(TechnologyTier = exports.TechnologyTier || (exports.TechnologyTier = {}));
var TechnologyBase = /** @class */ (function () {
    function TechnologyBase(init) {
        Object.assign(this, init);
    }
    return TechnologyBase;
}());
exports.TechnologyBase = TechnologyBase;
var Technology = /** @class */ (function (_super) {
    __extends(Technology, _super);
    function Technology(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return Technology;
}(TechnologyBase));
exports.Technology = Technology;
var TechnologyView = /** @class */ (function () {
    function TechnologyView(init) {
        Object.assign(this, init);
    }
    return TechnologyView;
}());
exports.TechnologyView = TechnologyView;
var TechnologyStackBase = /** @class */ (function () {
    function TechnologyStackBase(init) {
        Object.assign(this, init);
    }
    return TechnologyStackBase;
}());
exports.TechnologyStackBase = TechnologyStackBase;
var TechnologyStack = /** @class */ (function (_super) {
    __extends(TechnologyStack, _super);
    function TechnologyStack(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyStack;
}(TechnologyStackBase));
exports.TechnologyStack = TechnologyStack;
var TechnologyStackView = /** @class */ (function () {
    function TechnologyStackView(init) {
        Object.assign(this, init);
    }
    return TechnologyStackView;
}());
exports.TechnologyStackView = TechnologyStackView;
var UserVoiceUser = /** @class */ (function () {
    function UserVoiceUser(init) {
        Object.assign(this, init);
    }
    return UserVoiceUser;
}());
exports.UserVoiceUser = UserVoiceUser;
var UserVoiceComment = /** @class */ (function () {
    function UserVoiceComment(init) {
        Object.assign(this, init);
    }
    return UserVoiceComment;
}());
exports.UserVoiceComment = UserVoiceComment;
var PostComment = /** @class */ (function () {
    function PostComment(init) {
        Object.assign(this, init);
    }
    return PostComment;
}());
exports.PostComment = PostComment;
var Organization = /** @class */ (function () {
    function Organization(init) {
        Object.assign(this, init);
    }
    return Organization;
}());
exports.Organization = Organization;
var OrganizationLabel = /** @class */ (function () {
    function OrganizationLabel(init) {
        Object.assign(this, init);
    }
    return OrganizationLabel;
}());
exports.OrganizationLabel = OrganizationLabel;
var Category = /** @class */ (function () {
    function Category(init) {
        Object.assign(this, init);
    }
    return Category;
}());
exports.Category = Category;
var OrganizationMember = /** @class */ (function () {
    function OrganizationMember(init) {
        Object.assign(this, init);
    }
    return OrganizationMember;
}());
exports.OrganizationMember = OrganizationMember;
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError(init) {
        Object.assign(this, init);
    }
    return ResponseError;
}());
exports.ResponseError = ResponseError;
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus(init) {
        Object.assign(this, init);
    }
    return ResponseStatus;
}());
exports.ResponseStatus = ResponseStatus;
var OrganizationMemberInvite = /** @class */ (function () {
    function OrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    return OrganizationMemberInvite;
}());
exports.OrganizationMemberInvite = OrganizationMemberInvite;
var PostReportInfo = /** @class */ (function () {
    function PostReportInfo(init) {
        Object.assign(this, init);
    }
    return PostReportInfo;
}());
exports.PostReportInfo = PostReportInfo;
var PostCommentReportInfo = /** @class */ (function () {
    function PostCommentReportInfo(init) {
        Object.assign(this, init);
    }
    return PostCommentReportInfo;
}());
exports.PostCommentReportInfo = PostCommentReportInfo;
var UserRef = /** @class */ (function () {
    function UserRef(init) {
        Object.assign(this, init);
    }
    return UserRef;
}());
exports.UserRef = UserRef;
var OrganizationSubscription = /** @class */ (function () {
    function OrganizationSubscription(init) {
        Object.assign(this, init);
    }
    return OrganizationSubscription;
}());
exports.OrganizationSubscription = OrganizationSubscription;
var UserActivity = /** @class */ (function () {
    function UserActivity(init) {
        Object.assign(this, init);
    }
    return UserActivity;
}());
exports.UserActivity = UserActivity;
var TechnologyHistory = /** @class */ (function (_super) {
    __extends(TechnologyHistory, _super);
    function TechnologyHistory(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyHistory;
}(TechnologyBase));
exports.TechnologyHistory = TechnologyHistory;
var TechnologyStackHistory = /** @class */ (function (_super) {
    __extends(TechnologyStackHistory, _super);
    function TechnologyStackHistory(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyStackHistory;
}(TechnologyStackBase));
exports.TechnologyStackHistory = TechnologyStackHistory;
var UserInfo = /** @class */ (function () {
    function UserInfo(init) {
        Object.assign(this, init);
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
var TechnologyInfo = /** @class */ (function () {
    function TechnologyInfo(init) {
        Object.assign(this, init);
    }
    return TechnologyInfo;
}());
exports.TechnologyInfo = TechnologyInfo;
var TechnologyInStack = /** @class */ (function (_super) {
    __extends(TechnologyInStack, _super);
    function TechnologyInStack(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechnologyInStack;
}(TechnologyBase));
exports.TechnologyInStack = TechnologyInStack;
var TechStackDetails = /** @class */ (function (_super) {
    __extends(TechStackDetails, _super);
    function TechStackDetails(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return TechStackDetails;
}(TechnologyStackBase));
exports.TechStackDetails = TechStackDetails;
var LabelInfo = /** @class */ (function () {
    function LabelInfo(init) {
        Object.assign(this, init);
    }
    return LabelInfo;
}());
exports.LabelInfo = LabelInfo;
var CategoryInfo = /** @class */ (function () {
    function CategoryInfo(init) {
        Object.assign(this, init);
    }
    return CategoryInfo;
}());
exports.CategoryInfo = CategoryInfo;
var OrganizationInfo = /** @class */ (function () {
    function OrganizationInfo(init) {
        Object.assign(this, init);
    }
    return OrganizationInfo;
}());
exports.OrganizationInfo = OrganizationInfo;
// @DataContract
var Option = /** @class */ (function () {
    function Option(init) {
        Object.assign(this, init);
    }
    return Option;
}());
exports.Option = Option;
var GetOrganizationResponse = /** @class */ (function () {
    function GetOrganizationResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationResponse;
}());
exports.GetOrganizationResponse = GetOrganizationResponse;
var GetOrganizationMembersResponse = /** @class */ (function () {
    function GetOrganizationMembersResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationMembersResponse;
}());
exports.GetOrganizationMembersResponse = GetOrganizationMembersResponse;
var GetOrganizationAdminResponse = /** @class */ (function () {
    function GetOrganizationAdminResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationAdminResponse;
}());
exports.GetOrganizationAdminResponse = GetOrganizationAdminResponse;
var CreateOrganizationForTechnologyResponse = /** @class */ (function () {
    function CreateOrganizationForTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return CreateOrganizationForTechnologyResponse;
}());
exports.CreateOrganizationForTechnologyResponse = CreateOrganizationForTechnologyResponse;
var CreateOrganizationResponse = /** @class */ (function () {
    function CreateOrganizationResponse(init) {
        Object.assign(this, init);
    }
    return CreateOrganizationResponse;
}());
exports.CreateOrganizationResponse = CreateOrganizationResponse;
var UpdateOrganizationResponse = /** @class */ (function () {
    function UpdateOrganizationResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationResponse;
}());
exports.UpdateOrganizationResponse = UpdateOrganizationResponse;
var OrganizationLabelResponse = /** @class */ (function () {
    function OrganizationLabelResponse(init) {
        Object.assign(this, init);
    }
    return OrganizationLabelResponse;
}());
exports.OrganizationLabelResponse = OrganizationLabelResponse;
var AddOrganizationCategoryResponse = /** @class */ (function () {
    function AddOrganizationCategoryResponse(init) {
        Object.assign(this, init);
    }
    return AddOrganizationCategoryResponse;
}());
exports.AddOrganizationCategoryResponse = AddOrganizationCategoryResponse;
var UpdateOrganizationCategoryResponse = /** @class */ (function () {
    function UpdateOrganizationCategoryResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationCategoryResponse;
}());
exports.UpdateOrganizationCategoryResponse = UpdateOrganizationCategoryResponse;
var AddOrganizationMemberResponse = /** @class */ (function () {
    function AddOrganizationMemberResponse(init) {
        Object.assign(this, init);
    }
    return AddOrganizationMemberResponse;
}());
exports.AddOrganizationMemberResponse = AddOrganizationMemberResponse;
var UpdateOrganizationMemberResponse = /** @class */ (function () {
    function UpdateOrganizationMemberResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationMemberResponse;
}());
exports.UpdateOrganizationMemberResponse = UpdateOrganizationMemberResponse;
var SetOrganizationMembersResponse = /** @class */ (function () {
    function SetOrganizationMembersResponse(init) {
        Object.assign(this, init);
    }
    return SetOrganizationMembersResponse;
}());
exports.SetOrganizationMembersResponse = SetOrganizationMembersResponse;
var GetOrganizationMemberInvitesResponse = /** @class */ (function () {
    function GetOrganizationMemberInvitesResponse(init) {
        Object.assign(this, init);
    }
    return GetOrganizationMemberInvitesResponse;
}());
exports.GetOrganizationMemberInvitesResponse = GetOrganizationMemberInvitesResponse;
var RequestOrganizationMemberInviteResponse = /** @class */ (function () {
    function RequestOrganizationMemberInviteResponse(init) {
        Object.assign(this, init);
    }
    return RequestOrganizationMemberInviteResponse;
}());
exports.RequestOrganizationMemberInviteResponse = RequestOrganizationMemberInviteResponse;
var UpdateOrganizationMemberInviteResponse = /** @class */ (function () {
    function UpdateOrganizationMemberInviteResponse(init) {
        Object.assign(this, init);
    }
    return UpdateOrganizationMemberInviteResponse;
}());
exports.UpdateOrganizationMemberInviteResponse = UpdateOrganizationMemberInviteResponse;
// @DataContract
var QueryResponse = /** @class */ (function () {
    function QueryResponse(init) {
        Object.assign(this, init);
    }
    return QueryResponse;
}());
exports.QueryResponse = QueryResponse;
var GetPostResponse = /** @class */ (function () {
    function GetPostResponse(init) {
        Object.assign(this, init);
    }
    return GetPostResponse;
}());
exports.GetPostResponse = GetPostResponse;
var CreatePostResponse = /** @class */ (function () {
    function CreatePostResponse(init) {
        Object.assign(this, init);
    }
    return CreatePostResponse;
}());
exports.CreatePostResponse = CreatePostResponse;
var UpdatePostResponse = /** @class */ (function () {
    function UpdatePostResponse(init) {
        Object.assign(this, init);
    }
    return UpdatePostResponse;
}());
exports.UpdatePostResponse = UpdatePostResponse;
var DeletePostResponse = /** @class */ (function () {
    function DeletePostResponse(init) {
        Object.assign(this, init);
    }
    return DeletePostResponse;
}());
exports.DeletePostResponse = DeletePostResponse;
var CreatePostCommentResponse = /** @class */ (function () {
    function CreatePostCommentResponse(init) {
        Object.assign(this, init);
    }
    return CreatePostCommentResponse;
}());
exports.CreatePostCommentResponse = CreatePostCommentResponse;
var UpdatePostCommentResponse = /** @class */ (function () {
    function UpdatePostCommentResponse(init) {
        Object.assign(this, init);
    }
    return UpdatePostCommentResponse;
}());
exports.UpdatePostCommentResponse = UpdatePostCommentResponse;
var DeletePostCommentResponse = /** @class */ (function () {
    function DeletePostCommentResponse(init) {
        Object.assign(this, init);
    }
    return DeletePostCommentResponse;
}());
exports.DeletePostCommentResponse = DeletePostCommentResponse;
var GetUserPostCommentVotesResponse = /** @class */ (function () {
    function GetUserPostCommentVotesResponse(init) {
        Object.assign(this, init);
    }
    return GetUserPostCommentVotesResponse;
}());
exports.GetUserPostCommentVotesResponse = GetUserPostCommentVotesResponse;
var PinPostCommentResponse = /** @class */ (function () {
    function PinPostCommentResponse(init) {
        Object.assign(this, init);
    }
    return PinPostCommentResponse;
}());
exports.PinPostCommentResponse = PinPostCommentResponse;
var GetUsersByEmailsResponse = /** @class */ (function () {
    function GetUsersByEmailsResponse(init) {
        Object.assign(this, init);
    }
    return GetUsersByEmailsResponse;
}());
exports.GetUsersByEmailsResponse = GetUsersByEmailsResponse;
var GetUserPostActivityResponse = /** @class */ (function () {
    function GetUserPostActivityResponse(init) {
        Object.assign(this, init);
    }
    return GetUserPostActivityResponse;
}());
exports.GetUserPostActivityResponse = GetUserPostActivityResponse;
var GetUserOrganizationsResponse = /** @class */ (function () {
    function GetUserOrganizationsResponse(init) {
        Object.assign(this, init);
    }
    return GetUserOrganizationsResponse;
}());
exports.GetUserOrganizationsResponse = GetUserOrganizationsResponse;
var UserPostVoteResponse = /** @class */ (function () {
    function UserPostVoteResponse(init) {
        Object.assign(this, init);
    }
    return UserPostVoteResponse;
}());
exports.UserPostVoteResponse = UserPostVoteResponse;
var UserPostFavoriteResponse = /** @class */ (function () {
    function UserPostFavoriteResponse(init) {
        Object.assign(this, init);
    }
    return UserPostFavoriteResponse;
}());
exports.UserPostFavoriteResponse = UserPostFavoriteResponse;
var UserPostReportResponse = /** @class */ (function () {
    function UserPostReportResponse(init) {
        Object.assign(this, init);
    }
    return UserPostReportResponse;
}());
exports.UserPostReportResponse = UserPostReportResponse;
var UserPostCommentVoteResponse = /** @class */ (function () {
    function UserPostCommentVoteResponse(init) {
        Object.assign(this, init);
    }
    return UserPostCommentVoteResponse;
}());
exports.UserPostCommentVoteResponse = UserPostCommentVoteResponse;
var UserPostCommentReportResponse = /** @class */ (function () {
    function UserPostCommentReportResponse(init) {
        Object.assign(this, init);
    }
    return UserPostCommentReportResponse;
}());
exports.UserPostCommentReportResponse = UserPostCommentReportResponse;
var SessionInfoResponse = /** @class */ (function () {
    function SessionInfoResponse(init) {
        Object.assign(this, init);
    }
    return SessionInfoResponse;
}());
exports.SessionInfoResponse = SessionInfoResponse;
var GetTechnologyPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyPreviousVersionsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyPreviousVersionsResponse;
}());
exports.GetTechnologyPreviousVersionsResponse = GetTechnologyPreviousVersionsResponse;
var GetAllTechnologiesResponse = /** @class */ (function () {
    function GetAllTechnologiesResponse(init) {
        Object.assign(this, init);
    }
    return GetAllTechnologiesResponse;
}());
exports.GetAllTechnologiesResponse = GetAllTechnologiesResponse;
var GetTechnologyResponse = /** @class */ (function () {
    function GetTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyResponse;
}());
exports.GetTechnologyResponse = GetTechnologyResponse;
var GetTechnologyFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyFavoriteDetailsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyFavoriteDetailsResponse;
}());
exports.GetTechnologyFavoriteDetailsResponse = GetTechnologyFavoriteDetailsResponse;
var CreateTechnologyResponse = /** @class */ (function () {
    function CreateTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return CreateTechnologyResponse;
}());
exports.CreateTechnologyResponse = CreateTechnologyResponse;
var UpdateTechnologyResponse = /** @class */ (function () {
    function UpdateTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return UpdateTechnologyResponse;
}());
exports.UpdateTechnologyResponse = UpdateTechnologyResponse;
var DeleteTechnologyResponse = /** @class */ (function () {
    function DeleteTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return DeleteTechnologyResponse;
}());
exports.DeleteTechnologyResponse = DeleteTechnologyResponse;
var GetTechnologyStackPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyStackPreviousVersionsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyStackPreviousVersionsResponse;
}());
exports.GetTechnologyStackPreviousVersionsResponse = GetTechnologyStackPreviousVersionsResponse;
var GetPageStatsResponse = /** @class */ (function () {
    function GetPageStatsResponse(init) {
        Object.assign(this, init);
    }
    return GetPageStatsResponse;
}());
exports.GetPageStatsResponse = GetPageStatsResponse;
var HourlyTaskResponse = /** @class */ (function () {
    function HourlyTaskResponse(init) {
        Object.assign(this, init);
    }
    return HourlyTaskResponse;
}());
exports.HourlyTaskResponse = HourlyTaskResponse;
var OverviewResponse = /** @class */ (function () {
    function OverviewResponse(init) {
        Object.assign(this, init);
    }
    return OverviewResponse;
}());
exports.OverviewResponse = OverviewResponse;
var AppOverviewResponse = /** @class */ (function () {
    function AppOverviewResponse(init) {
        Object.assign(this, init);
    }
    return AppOverviewResponse;
}());
exports.AppOverviewResponse = AppOverviewResponse;
var GetAllTechnologyStacksResponse = /** @class */ (function () {
    function GetAllTechnologyStacksResponse(init) {
        Object.assign(this, init);
    }
    return GetAllTechnologyStacksResponse;
}());
exports.GetAllTechnologyStacksResponse = GetAllTechnologyStacksResponse;
var GetTechnologyStackResponse = /** @class */ (function () {
    function GetTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyStackResponse;
}());
exports.GetTechnologyStackResponse = GetTechnologyStackResponse;
var GetTechnologyStackFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetailsResponse(init) {
        Object.assign(this, init);
    }
    return GetTechnologyStackFavoriteDetailsResponse;
}());
exports.GetTechnologyStackFavoriteDetailsResponse = GetTechnologyStackFavoriteDetailsResponse;
var GetConfigResponse = /** @class */ (function () {
    function GetConfigResponse(init) {
        Object.assign(this, init);
    }
    return GetConfigResponse;
}());
exports.GetConfigResponse = GetConfigResponse;
var CreateTechnologyStackResponse = /** @class */ (function () {
    function CreateTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return CreateTechnologyStackResponse;
}());
exports.CreateTechnologyStackResponse = CreateTechnologyStackResponse;
var UpdateTechnologyStackResponse = /** @class */ (function () {
    function UpdateTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return UpdateTechnologyStackResponse;
}());
exports.UpdateTechnologyStackResponse = UpdateTechnologyStackResponse;
var DeleteTechnologyStackResponse = /** @class */ (function () {
    function DeleteTechnologyStackResponse(init) {
        Object.assign(this, init);
    }
    return DeleteTechnologyStackResponse;
}());
exports.DeleteTechnologyStackResponse = DeleteTechnologyStackResponse;
var GetFavoriteTechStackResponse = /** @class */ (function () {
    function GetFavoriteTechStackResponse(init) {
        Object.assign(this, init);
    }
    return GetFavoriteTechStackResponse;
}());
exports.GetFavoriteTechStackResponse = GetFavoriteTechStackResponse;
var FavoriteTechStackResponse = /** @class */ (function () {
    function FavoriteTechStackResponse(init) {
        Object.assign(this, init);
    }
    return FavoriteTechStackResponse;
}());
exports.FavoriteTechStackResponse = FavoriteTechStackResponse;
var GetFavoriteTechnologiesResponse = /** @class */ (function () {
    function GetFavoriteTechnologiesResponse(init) {
        Object.assign(this, init);
    }
    return GetFavoriteTechnologiesResponse;
}());
exports.GetFavoriteTechnologiesResponse = GetFavoriteTechnologiesResponse;
var FavoriteTechnologyResponse = /** @class */ (function () {
    function FavoriteTechnologyResponse(init) {
        Object.assign(this, init);
    }
    return FavoriteTechnologyResponse;
}());
exports.FavoriteTechnologyResponse = FavoriteTechnologyResponse;
var GetUserFeedResponse = /** @class */ (function () {
    function GetUserFeedResponse(init) {
        Object.assign(this, init);
    }
    return GetUserFeedResponse;
}());
exports.GetUserFeedResponse = GetUserFeedResponse;
var GetUsersKarmaResponse = /** @class */ (function () {
    function GetUsersKarmaResponse(init) {
        Object.assign(this, init);
    }
    return GetUsersKarmaResponse;
}());
exports.GetUsersKarmaResponse = GetUsersKarmaResponse;
var GetUserInfoResponse = /** @class */ (function () {
    function GetUserInfoResponse(init) {
        Object.assign(this, init);
    }
    return GetUserInfoResponse;
}());
exports.GetUserInfoResponse = GetUserInfoResponse;
var SyncDiscourseSiteResponse = /** @class */ (function () {
    function SyncDiscourseSiteResponse(init) {
        Object.assign(this, init);
    }
    return SyncDiscourseSiteResponse;
}());
exports.SyncDiscourseSiteResponse = SyncDiscourseSiteResponse;
var LogoUrlApprovalResponse = /** @class */ (function () {
    function LogoUrlApprovalResponse(init) {
        Object.assign(this, init);
    }
    return LogoUrlApprovalResponse;
}());
exports.LogoUrlApprovalResponse = LogoUrlApprovalResponse;
var LockStackResponse = /** @class */ (function () {
    function LockStackResponse(init) {
        Object.assign(this, init);
    }
    return LockStackResponse;
}());
exports.LockStackResponse = LockStackResponse;
var EmailTestRespoonse = /** @class */ (function () {
    function EmailTestRespoonse(init) {
        Object.assign(this, init);
    }
    return EmailTestRespoonse;
}());
exports.EmailTestRespoonse = EmailTestRespoonse;
var ImportUserResponse = /** @class */ (function () {
    function ImportUserResponse(init) {
        Object.assign(this, init);
    }
    return ImportUserResponse;
}());
exports.ImportUserResponse = ImportUserResponse;
var ImportUserVoiceSuggestionResponse = /** @class */ (function () {
    function ImportUserVoiceSuggestionResponse(init) {
        Object.assign(this, init);
    }
    return ImportUserVoiceSuggestionResponse;
}());
exports.ImportUserVoiceSuggestionResponse = ImportUserVoiceSuggestionResponse;
// @DataContract
var AuthenticateResponse = /** @class */ (function () {
    function AuthenticateResponse(init) {
        Object.assign(this, init);
    }
    return AuthenticateResponse;
}());
exports.AuthenticateResponse = AuthenticateResponse;
// @DataContract
var AssignRolesResponse = /** @class */ (function () {
    function AssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return AssignRolesResponse;
}());
exports.AssignRolesResponse = AssignRolesResponse;
// @DataContract
var UnAssignRolesResponse = /** @class */ (function () {
    function UnAssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return UnAssignRolesResponse;
}());
exports.UnAssignRolesResponse = UnAssignRolesResponse;
// @DataContract
var ConvertSessionToTokenResponse = /** @class */ (function () {
    function ConvertSessionToTokenResponse(init) {
        Object.assign(this, init);
    }
    return ConvertSessionToTokenResponse;
}());
exports.ConvertSessionToTokenResponse = ConvertSessionToTokenResponse;
// @DataContract
var GetAccessTokenResponse = /** @class */ (function () {
    function GetAccessTokenResponse(init) {
        Object.assign(this, init);
    }
    return GetAccessTokenResponse;
}());
exports.GetAccessTokenResponse = GetAccessTokenResponse;
// @Route("/ping")
var Ping = /** @class */ (function () {
    function Ping(init) {
        Object.assign(this, init);
    }
    Ping.prototype.getMethod = function () { return 'POST'; };
    return Ping;
}());
exports.Ping = Ping;
// @Route("/orgs/{Id}", "GET")
var GetOrganization = /** @class */ (function () {
    function GetOrganization(init) {
        Object.assign(this, init);
    }
    GetOrganization.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganization.prototype.getTypeName = function () { return 'GetOrganization'; };
    GetOrganization.prototype.getMethod = function () { return 'GET'; };
    return GetOrganization;
}());
exports.GetOrganization = GetOrganization;
// @Route("/organizations/{Slug}", "GET")
var GetOrganizationBySlug = /** @class */ (function () {
    function GetOrganizationBySlug(init) {
        Object.assign(this, init);
    }
    GetOrganizationBySlug.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganizationBySlug.prototype.getTypeName = function () { return 'GetOrganizationBySlug'; };
    GetOrganizationBySlug.prototype.getMethod = function () { return 'GET'; };
    return GetOrganizationBySlug;
}());
exports.GetOrganizationBySlug = GetOrganizationBySlug;
// @Route("/orgs/{Id}/members", "GET")
var GetOrganizationMembers = /** @class */ (function () {
    function GetOrganizationMembers(init) {
        Object.assign(this, init);
    }
    GetOrganizationMembers.prototype.createResponse = function () { return new GetOrganizationMembersResponse(); };
    GetOrganizationMembers.prototype.getTypeName = function () { return 'GetOrganizationMembers'; };
    GetOrganizationMembers.prototype.getMethod = function () { return 'GET'; };
    return GetOrganizationMembers;
}());
exports.GetOrganizationMembers = GetOrganizationMembers;
// @Route("/orgs/{Id}/admin", "GET")
var GetOrganizationAdmin = /** @class */ (function () {
    function GetOrganizationAdmin(init) {
        Object.assign(this, init);
    }
    GetOrganizationAdmin.prototype.createResponse = function () { return new GetOrganizationAdminResponse(); };
    GetOrganizationAdmin.prototype.getTypeName = function () { return 'GetOrganizationAdmin'; };
    GetOrganizationAdmin.prototype.getMethod = function () { return 'GET'; };
    return GetOrganizationAdmin;
}());
exports.GetOrganizationAdmin = GetOrganizationAdmin;
// @Route("/orgs/posts/new", "POST")
var CreateOrganizationForTechnology = /** @class */ (function () {
    function CreateOrganizationForTechnology(init) {
        Object.assign(this, init);
    }
    CreateOrganizationForTechnology.prototype.createResponse = function () { return new CreateOrganizationForTechnologyResponse(); };
    CreateOrganizationForTechnology.prototype.getTypeName = function () { return 'CreateOrganizationForTechnology'; };
    CreateOrganizationForTechnology.prototype.getMethod = function () { return 'POST'; };
    return CreateOrganizationForTechnology;
}());
exports.CreateOrganizationForTechnology = CreateOrganizationForTechnology;
// @Route("/orgs", "POST")
var CreateOrganization = /** @class */ (function () {
    function CreateOrganization(init) {
        Object.assign(this, init);
    }
    CreateOrganization.prototype.createResponse = function () { return new CreateOrganizationResponse(); };
    CreateOrganization.prototype.getTypeName = function () { return 'CreateOrganization'; };
    CreateOrganization.prototype.getMethod = function () { return 'POST'; };
    return CreateOrganization;
}());
exports.CreateOrganization = CreateOrganization;
// @Route("/orgs/{Id}", "PUT")
var UpdateOrganization = /** @class */ (function () {
    function UpdateOrganization(init) {
        Object.assign(this, init);
    }
    UpdateOrganization.prototype.createResponse = function () { return new UpdateOrganizationResponse(); };
    UpdateOrganization.prototype.getTypeName = function () { return 'UpdateOrganization'; };
    UpdateOrganization.prototype.getMethod = function () { return 'PUT'; };
    return UpdateOrganization;
}());
exports.UpdateOrganization = UpdateOrganization;
// @Route("/orgs/{Id}", "DELETE")
var DeleteOrganization = /** @class */ (function () {
    function DeleteOrganization(init) {
        Object.assign(this, init);
    }
    DeleteOrganization.prototype.createResponse = function () { };
    DeleteOrganization.prototype.getTypeName = function () { return 'DeleteOrganization'; };
    DeleteOrganization.prototype.getMethod = function () { return 'DELETE'; };
    return DeleteOrganization;
}());
exports.DeleteOrganization = DeleteOrganization;
// @Route("/orgs/{Id}/lock", "PUT")
var LockOrganization = /** @class */ (function () {
    function LockOrganization(init) {
        Object.assign(this, init);
    }
    LockOrganization.prototype.createResponse = function () { };
    LockOrganization.prototype.getTypeName = function () { return 'LockOrganization'; };
    LockOrganization.prototype.getMethod = function () { return 'PUT'; };
    return LockOrganization;
}());
exports.LockOrganization = LockOrganization;
// @Route("/orgs/{OrganizationId}/labels", "POST")
var AddOrganizationLabel = /** @class */ (function () {
    function AddOrganizationLabel(init) {
        Object.assign(this, init);
    }
    AddOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    AddOrganizationLabel.prototype.getTypeName = function () { return 'AddOrganizationLabel'; };
    AddOrganizationLabel.prototype.getMethod = function () { return 'POST'; };
    return AddOrganizationLabel;
}());
exports.AddOrganizationLabel = AddOrganizationLabel;
// @Route("/orgs/{OrganizationId}/members/{Slug}", "PUT")
var UpdateOrganizationLabel = /** @class */ (function () {
    function UpdateOrganizationLabel(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    UpdateOrganizationLabel.prototype.getTypeName = function () { return 'UpdateOrganizationLabel'; };
    UpdateOrganizationLabel.prototype.getMethod = function () { return 'PUT'; };
    return UpdateOrganizationLabel;
}());
exports.UpdateOrganizationLabel = UpdateOrganizationLabel;
// @Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE")
var RemoveOrganizationLabel = /** @class */ (function () {
    function RemoveOrganizationLabel(init) {
        Object.assign(this, init);
    }
    RemoveOrganizationLabel.prototype.createResponse = function () { };
    RemoveOrganizationLabel.prototype.getTypeName = function () { return 'RemoveOrganizationLabel'; };
    RemoveOrganizationLabel.prototype.getMethod = function () { return 'DELETE'; };
    return RemoveOrganizationLabel;
}());
exports.RemoveOrganizationLabel = RemoveOrganizationLabel;
// @Route("/orgs/{OrganizationId}/categories", "POST")
var AddOrganizationCategory = /** @class */ (function () {
    function AddOrganizationCategory(init) {
        Object.assign(this, init);
    }
    AddOrganizationCategory.prototype.createResponse = function () { return new AddOrganizationCategoryResponse(); };
    AddOrganizationCategory.prototype.getTypeName = function () { return 'AddOrganizationCategory'; };
    AddOrganizationCategory.prototype.getMethod = function () { return 'POST'; };
    return AddOrganizationCategory;
}());
exports.AddOrganizationCategory = AddOrganizationCategory;
// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
var UpdateOrganizationCategory = /** @class */ (function () {
    function UpdateOrganizationCategory(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationCategory.prototype.createResponse = function () { return new UpdateOrganizationCategoryResponse(); };
    UpdateOrganizationCategory.prototype.getTypeName = function () { return 'UpdateOrganizationCategory'; };
    UpdateOrganizationCategory.prototype.getMethod = function () { return 'PUT'; };
    return UpdateOrganizationCategory;
}());
exports.UpdateOrganizationCategory = UpdateOrganizationCategory;
// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
var DeleteOrganizationCategory = /** @class */ (function () {
    function DeleteOrganizationCategory(init) {
        Object.assign(this, init);
    }
    DeleteOrganizationCategory.prototype.createResponse = function () { };
    DeleteOrganizationCategory.prototype.getTypeName = function () { return 'DeleteOrganizationCategory'; };
    DeleteOrganizationCategory.prototype.getMethod = function () { return 'DELETE'; };
    return DeleteOrganizationCategory;
}());
exports.DeleteOrganizationCategory = DeleteOrganizationCategory;
// @Route("/orgs/{OrganizationId}/members", "POST")
var AddOrganizationMember = /** @class */ (function () {
    function AddOrganizationMember(init) {
        Object.assign(this, init);
    }
    AddOrganizationMember.prototype.createResponse = function () { return new AddOrganizationMemberResponse(); };
    AddOrganizationMember.prototype.getTypeName = function () { return 'AddOrganizationMember'; };
    AddOrganizationMember.prototype.getMethod = function () { return 'POST'; };
    return AddOrganizationMember;
}());
exports.AddOrganizationMember = AddOrganizationMember;
// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
var UpdateOrganizationMember = /** @class */ (function () {
    function UpdateOrganizationMember(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationMember.prototype.createResponse = function () { return new UpdateOrganizationMemberResponse(); };
    UpdateOrganizationMember.prototype.getTypeName = function () { return 'UpdateOrganizationMember'; };
    UpdateOrganizationMember.prototype.getMethod = function () { return 'PUT'; };
    return UpdateOrganizationMember;
}());
exports.UpdateOrganizationMember = UpdateOrganizationMember;
// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
var RemoveOrganizationMember = /** @class */ (function () {
    function RemoveOrganizationMember(init) {
        Object.assign(this, init);
    }
    RemoveOrganizationMember.prototype.createResponse = function () { };
    RemoveOrganizationMember.prototype.getTypeName = function () { return 'RemoveOrganizationMember'; };
    RemoveOrganizationMember.prototype.getMethod = function () { return 'DELETE'; };
    return RemoveOrganizationMember;
}());
exports.RemoveOrganizationMember = RemoveOrganizationMember;
// @Route("/orgs/{OrganizationId}/members/set", "POST")
var SetOrganizationMembers = /** @class */ (function () {
    function SetOrganizationMembers(init) {
        Object.assign(this, init);
    }
    SetOrganizationMembers.prototype.createResponse = function () { return new SetOrganizationMembersResponse(); };
    SetOrganizationMembers.prototype.getTypeName = function () { return 'SetOrganizationMembers'; };
    SetOrganizationMembers.prototype.getMethod = function () { return 'POST'; };
    return SetOrganizationMembers;
}());
exports.SetOrganizationMembers = SetOrganizationMembers;
// @Route("/orgs/{OrganizationId}/invites", "GET")
var GetOrganizationMemberInvites = /** @class */ (function () {
    function GetOrganizationMemberInvites(init) {
        Object.assign(this, init);
    }
    GetOrganizationMemberInvites.prototype.createResponse = function () { return new GetOrganizationMemberInvitesResponse(); };
    GetOrganizationMemberInvites.prototype.getTypeName = function () { return 'GetOrganizationMemberInvites'; };
    GetOrganizationMemberInvites.prototype.getMethod = function () { return 'GET'; };
    return GetOrganizationMemberInvites;
}());
exports.GetOrganizationMemberInvites = GetOrganizationMemberInvites;
// @Route("/orgs/{OrganizationId}/invites", "POST")
var RequestOrganizationMemberInvite = /** @class */ (function () {
    function RequestOrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    RequestOrganizationMemberInvite.prototype.createResponse = function () { return new RequestOrganizationMemberInviteResponse(); };
    RequestOrganizationMemberInvite.prototype.getTypeName = function () { return 'RequestOrganizationMemberInvite'; };
    RequestOrganizationMemberInvite.prototype.getMethod = function () { return 'POST'; };
    return RequestOrganizationMemberInvite;
}());
exports.RequestOrganizationMemberInvite = RequestOrganizationMemberInvite;
// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
var UpdateOrganizationMemberInvite = /** @class */ (function () {
    function UpdateOrganizationMemberInvite(init) {
        Object.assign(this, init);
    }
    UpdateOrganizationMemberInvite.prototype.createResponse = function () { return new UpdateOrganizationMemberInviteResponse(); };
    UpdateOrganizationMemberInvite.prototype.getTypeName = function () { return 'UpdateOrganizationMemberInvite'; };
    UpdateOrganizationMemberInvite.prototype.getMethod = function () { return 'PUT'; };
    return UpdateOrganizationMemberInvite;
}());
exports.UpdateOrganizationMemberInvite = UpdateOrganizationMemberInvite;
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
    QueryPosts.prototype.getMethod = function () { return 'GET'; };
    return QueryPosts;
}(QueryDb_1));
exports.QueryPosts = QueryPosts;
// @Route("/posts/{Id}", "GET")
var GetPost = /** @class */ (function () {
    function GetPost(init) {
        Object.assign(this, init);
    }
    GetPost.prototype.createResponse = function () { return new GetPostResponse(); };
    GetPost.prototype.getTypeName = function () { return 'GetPost'; };
    GetPost.prototype.getMethod = function () { return 'GET'; };
    return GetPost;
}());
exports.GetPost = GetPost;
// @Route("/posts", "POST")
var CreatePost = /** @class */ (function () {
    function CreatePost(init) {
        Object.assign(this, init);
    }
    CreatePost.prototype.createResponse = function () { return new CreatePostResponse(); };
    CreatePost.prototype.getTypeName = function () { return 'CreatePost'; };
    CreatePost.prototype.getMethod = function () { return 'POST'; };
    return CreatePost;
}());
exports.CreatePost = CreatePost;
// @Route("/posts/{Id}", "PUT")
var UpdatePost = /** @class */ (function () {
    function UpdatePost(init) {
        Object.assign(this, init);
    }
    UpdatePost.prototype.createResponse = function () { return new UpdatePostResponse(); };
    UpdatePost.prototype.getTypeName = function () { return 'UpdatePost'; };
    UpdatePost.prototype.getMethod = function () { return 'PUT'; };
    return UpdatePost;
}());
exports.UpdatePost = UpdatePost;
// @Route("/posts/{Id}", "DELETE")
var DeletePost = /** @class */ (function () {
    function DeletePost(init) {
        Object.assign(this, init);
    }
    DeletePost.prototype.createResponse = function () { return new DeletePostResponse(); };
    DeletePost.prototype.getTypeName = function () { return 'DeletePost'; };
    DeletePost.prototype.getMethod = function () { return 'DELETE'; };
    return DeletePost;
}());
exports.DeletePost = DeletePost;
// @Route("/posts/{Id}/lock", "PUT")
var LockPost = /** @class */ (function () {
    function LockPost(init) {
        Object.assign(this, init);
    }
    LockPost.prototype.createResponse = function () { };
    LockPost.prototype.getTypeName = function () { return 'LockPost'; };
    LockPost.prototype.getMethod = function () { return 'PUT'; };
    return LockPost;
}());
exports.LockPost = LockPost;
// @Route("/posts/{Id}/hide", "PUT")
var HidePost = /** @class */ (function () {
    function HidePost(init) {
        Object.assign(this, init);
    }
    HidePost.prototype.createResponse = function () { };
    HidePost.prototype.getTypeName = function () { return 'HidePost'; };
    HidePost.prototype.getMethod = function () { return 'PUT'; };
    return HidePost;
}());
exports.HidePost = HidePost;
// @Route("/posts/{Id}/status/{Status}", "PUT")
var ChangeStatusPost = /** @class */ (function () {
    function ChangeStatusPost(init) {
        Object.assign(this, init);
    }
    ChangeStatusPost.prototype.createResponse = function () { };
    ChangeStatusPost.prototype.getTypeName = function () { return 'ChangeStatusPost'; };
    ChangeStatusPost.prototype.getMethod = function () { return 'PUT'; };
    return ChangeStatusPost;
}());
exports.ChangeStatusPost = ChangeStatusPost;
// @Route("/posts/{PostId}/report/{Id}", "POST")
var ActionPostReport = /** @class */ (function () {
    function ActionPostReport(init) {
        Object.assign(this, init);
    }
    ActionPostReport.prototype.createResponse = function () { };
    ActionPostReport.prototype.getTypeName = function () { return 'ActionPostReport'; };
    ActionPostReport.prototype.getMethod = function () { return 'POST'; };
    return ActionPostReport;
}());
exports.ActionPostReport = ActionPostReport;
// @Route("/posts/{PostId}/comments", "POST")
var CreatePostComment = /** @class */ (function () {
    function CreatePostComment(init) {
        Object.assign(this, init);
    }
    CreatePostComment.prototype.createResponse = function () { return new CreatePostCommentResponse(); };
    CreatePostComment.prototype.getTypeName = function () { return 'CreatePostComment'; };
    CreatePostComment.prototype.getMethod = function () { return 'POST'; };
    return CreatePostComment;
}());
exports.CreatePostComment = CreatePostComment;
// @Route("/posts/{PostId}/comments/{Id}", "PUT")
var UpdatePostComment = /** @class */ (function () {
    function UpdatePostComment(init) {
        Object.assign(this, init);
    }
    UpdatePostComment.prototype.createResponse = function () { return new UpdatePostCommentResponse(); };
    UpdatePostComment.prototype.getTypeName = function () { return 'UpdatePostComment'; };
    UpdatePostComment.prototype.getMethod = function () { return 'PUT'; };
    return UpdatePostComment;
}());
exports.UpdatePostComment = UpdatePostComment;
// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
var DeletePostComment = /** @class */ (function () {
    function DeletePostComment(init) {
        Object.assign(this, init);
    }
    DeletePostComment.prototype.createResponse = function () { return new DeletePostCommentResponse(); };
    DeletePostComment.prototype.getTypeName = function () { return 'DeletePostComment'; };
    DeletePostComment.prototype.getMethod = function () { return 'DELETE'; };
    return DeletePostComment;
}());
exports.DeletePostComment = DeletePostComment;
// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
var ActionPostCommentReport = /** @class */ (function () {
    function ActionPostCommentReport(init) {
        Object.assign(this, init);
    }
    ActionPostCommentReport.prototype.createResponse = function () { };
    ActionPostCommentReport.prototype.getTypeName = function () { return 'ActionPostCommentReport'; };
    ActionPostCommentReport.prototype.getMethod = function () { return 'POST'; };
    return ActionPostCommentReport;
}());
exports.ActionPostCommentReport = ActionPostCommentReport;
// @Route("/user/comments/votes")
var GetUserPostCommentVotes = /** @class */ (function () {
    function GetUserPostCommentVotes(init) {
        Object.assign(this, init);
    }
    GetUserPostCommentVotes.prototype.createResponse = function () { return new GetUserPostCommentVotesResponse(); };
    GetUserPostCommentVotes.prototype.getTypeName = function () { return 'GetUserPostCommentVotes'; };
    GetUserPostCommentVotes.prototype.getMethod = function () { return 'GET'; };
    return GetUserPostCommentVotes;
}());
exports.GetUserPostCommentVotes = GetUserPostCommentVotes;
// @Route("/posts/{PostId}/comments/{Id}/pin", "PUT")
var PinPostComment = /** @class */ (function () {
    function PinPostComment(init) {
        Object.assign(this, init);
    }
    PinPostComment.prototype.createResponse = function () { return new PinPostCommentResponse(); };
    PinPostComment.prototype.getTypeName = function () { return 'PinPostComment'; };
    PinPostComment.prototype.getMethod = function () { return 'PUT'; };
    return PinPostComment;
}());
exports.PinPostComment = PinPostComment;
// @Route("/users/by-email")
var GetUsersByEmails = /** @class */ (function () {
    function GetUsersByEmails(init) {
        Object.assign(this, init);
    }
    GetUsersByEmails.prototype.createResponse = function () { return new GetUsersByEmailsResponse(); };
    GetUsersByEmails.prototype.getTypeName = function () { return 'GetUsersByEmails'; };
    GetUsersByEmails.prototype.getMethod = function () { return 'GET'; };
    return GetUsersByEmails;
}());
exports.GetUsersByEmails = GetUsersByEmails;
// @Route("/user/posts/activity")
var GetUserPostActivity = /** @class */ (function () {
    function GetUserPostActivity(init) {
        Object.assign(this, init);
    }
    GetUserPostActivity.prototype.createResponse = function () { return new GetUserPostActivityResponse(); };
    GetUserPostActivity.prototype.getTypeName = function () { return 'GetUserPostActivity'; };
    GetUserPostActivity.prototype.getMethod = function () { return 'GET'; };
    return GetUserPostActivity;
}());
exports.GetUserPostActivity = GetUserPostActivity;
// @Route("/user/organizations")
var GetUserOrganizations = /** @class */ (function () {
    function GetUserOrganizations(init) {
        Object.assign(this, init);
    }
    GetUserOrganizations.prototype.createResponse = function () { return new GetUserOrganizationsResponse(); };
    GetUserOrganizations.prototype.getTypeName = function () { return 'GetUserOrganizations'; };
    GetUserOrganizations.prototype.getMethod = function () { return 'GET'; };
    return GetUserOrganizations;
}());
exports.GetUserOrganizations = GetUserOrganizations;
// @Route("/posts/{Id}/vote", "PUT")
var UserPostVote = /** @class */ (function () {
    function UserPostVote(init) {
        Object.assign(this, init);
    }
    UserPostVote.prototype.createResponse = function () { return new UserPostVoteResponse(); };
    UserPostVote.prototype.getTypeName = function () { return 'UserPostVote'; };
    UserPostVote.prototype.getMethod = function () { return 'PUT'; };
    return UserPostVote;
}());
exports.UserPostVote = UserPostVote;
// @Route("/posts/{Id}/favorite", "PUT")
var UserPostFavorite = /** @class */ (function () {
    function UserPostFavorite(init) {
        Object.assign(this, init);
    }
    UserPostFavorite.prototype.createResponse = function () { return new UserPostFavoriteResponse(); };
    UserPostFavorite.prototype.getTypeName = function () { return 'UserPostFavorite'; };
    UserPostFavorite.prototype.getMethod = function () { return 'PUT'; };
    return UserPostFavorite;
}());
exports.UserPostFavorite = UserPostFavorite;
// @Route("/posts/{Id}/report", "PUT")
var UserPostReport = /** @class */ (function () {
    function UserPostReport(init) {
        Object.assign(this, init);
    }
    UserPostReport.prototype.createResponse = function () { return new UserPostReportResponse(); };
    UserPostReport.prototype.getTypeName = function () { return 'UserPostReport'; };
    UserPostReport.prototype.getMethod = function () { return 'PUT'; };
    return UserPostReport;
}());
exports.UserPostReport = UserPostReport;
// @Route("/posts/{PostId}/comments/{Id}", "GET")
var UserPostCommentVote = /** @class */ (function () {
    function UserPostCommentVote(init) {
        Object.assign(this, init);
    }
    UserPostCommentVote.prototype.createResponse = function () { return new UserPostCommentVoteResponse(); };
    UserPostCommentVote.prototype.getTypeName = function () { return 'UserPostCommentVote'; };
    UserPostCommentVote.prototype.getMethod = function () { return 'GET'; };
    return UserPostCommentVote;
}());
exports.UserPostCommentVote = UserPostCommentVote;
// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
var UserPostCommentReport = /** @class */ (function () {
    function UserPostCommentReport(init) {
        Object.assign(this, init);
    }
    UserPostCommentReport.prototype.createResponse = function () { return new UserPostCommentReportResponse(); };
    UserPostCommentReport.prototype.getTypeName = function () { return 'UserPostCommentReport'; };
    UserPostCommentReport.prototype.getMethod = function () { return 'PUT'; };
    return UserPostCommentReport;
}());
exports.UserPostCommentReport = UserPostCommentReport;
// @Route("/prerender/{Path*}", "PUT")
var StorePreRender = /** @class */ (function () {
    function StorePreRender(init) {
        Object.assign(this, init);
    }
    StorePreRender.prototype.createResponse = function () { };
    StorePreRender.prototype.getTypeName = function () { return 'StorePreRender'; };
    StorePreRender.prototype.getMethod = function () { return 'PUT'; };
    return StorePreRender;
}());
exports.StorePreRender = StorePreRender;
// @Route("/prerender/{Path*}", "GET")
var GetPreRender = /** @class */ (function () {
    function GetPreRender(init) {
        Object.assign(this, init);
    }
    GetPreRender.prototype.createResponse = function () { return ''; };
    GetPreRender.prototype.getTypeName = function () { return 'GetPreRender'; };
    GetPreRender.prototype.getMethod = function () { return 'GET'; };
    return GetPreRender;
}());
exports.GetPreRender = GetPreRender;
// @Route("/my-session")
var SessionInfo = /** @class */ (function () {
    function SessionInfo(init) {
        Object.assign(this, init);
    }
    SessionInfo.prototype.createResponse = function () { return new SessionInfoResponse(); };
    SessionInfo.prototype.getTypeName = function () { return 'SessionInfo'; };
    SessionInfo.prototype.getMethod = function () { return 'GET'; };
    return SessionInfo;
}());
exports.SessionInfo = SessionInfo;
// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
var SubscribeToOrganization = /** @class */ (function () {
    function SubscribeToOrganization(init) {
        Object.assign(this, init);
    }
    SubscribeToOrganization.prototype.createResponse = function () { };
    SubscribeToOrganization.prototype.getTypeName = function () { return 'SubscribeToOrganization'; };
    SubscribeToOrganization.prototype.getMethod = function () { return 'PUT'; };
    return SubscribeToOrganization;
}());
exports.SubscribeToOrganization = SubscribeToOrganization;
// @Route("/posts/{PostId}/subscribe", "PUT")
var SubscribeToPost = /** @class */ (function () {
    function SubscribeToPost(init) {
        Object.assign(this, init);
    }
    SubscribeToPost.prototype.createResponse = function () { };
    SubscribeToPost.prototype.getTypeName = function () { return 'SubscribeToPost'; };
    SubscribeToPost.prototype.getMethod = function () { return 'PUT'; };
    return SubscribeToPost;
}());
exports.SubscribeToPost = SubscribeToPost;
// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
var DeleteOrganizationSubscription = /** @class */ (function () {
    function DeleteOrganizationSubscription(init) {
        Object.assign(this, init);
    }
    DeleteOrganizationSubscription.prototype.createResponse = function () { };
    DeleteOrganizationSubscription.prototype.getTypeName = function () { return 'DeleteOrganizationSubscription'; };
    DeleteOrganizationSubscription.prototype.getMethod = function () { return 'DELETE'; };
    return DeleteOrganizationSubscription;
}());
exports.DeleteOrganizationSubscription = DeleteOrganizationSubscription;
// @Route("/posts/{PostId}/subscribe", "DELETE")
var DeletePostSubscription = /** @class */ (function () {
    function DeletePostSubscription(init) {
        Object.assign(this, init);
    }
    DeletePostSubscription.prototype.createResponse = function () { };
    DeletePostSubscription.prototype.getTypeName = function () { return 'DeletePostSubscription'; };
    DeletePostSubscription.prototype.getMethod = function () { return 'DELETE'; };
    return DeletePostSubscription;
}());
exports.DeletePostSubscription = DeletePostSubscription;
// @Route("/technology/{Slug}/previous-versions", "GET")
var GetTechnologyPreviousVersions = /** @class */ (function () {
    function GetTechnologyPreviousVersions(init) {
        Object.assign(this, init);
    }
    GetTechnologyPreviousVersions.prototype.createResponse = function () { return new GetTechnologyPreviousVersionsResponse(); };
    GetTechnologyPreviousVersions.prototype.getTypeName = function () { return 'GetTechnologyPreviousVersions'; };
    GetTechnologyPreviousVersions.prototype.getMethod = function () { return 'GET'; };
    return GetTechnologyPreviousVersions;
}());
exports.GetTechnologyPreviousVersions = GetTechnologyPreviousVersions;
// @Route("/technology", "GET")
var GetAllTechnologies = /** @class */ (function () {
    function GetAllTechnologies(init) {
        Object.assign(this, init);
    }
    GetAllTechnologies.prototype.createResponse = function () { return new GetAllTechnologiesResponse(); };
    GetAllTechnologies.prototype.getTypeName = function () { return 'GetAllTechnologies'; };
    GetAllTechnologies.prototype.getMethod = function () { return 'GET'; };
    return GetAllTechnologies;
}());
exports.GetAllTechnologies = GetAllTechnologies;
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
    FindTechnologies.prototype.getMethod = function () { return 'GET'; };
    return FindTechnologies;
}(QueryDb_2));
exports.FindTechnologies = FindTechnologies;
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
    QueryTechnology.prototype.getMethod = function () { return 'GET'; };
    return QueryTechnology;
}(QueryDb_2));
exports.QueryTechnology = QueryTechnology;
// @Route("/technology/{Slug}")
var GetTechnology = /** @class */ (function () {
    function GetTechnology(init) {
        Object.assign(this, init);
    }
    GetTechnology.prototype.createResponse = function () { return new GetTechnologyResponse(); };
    GetTechnology.prototype.getTypeName = function () { return 'GetTechnology'; };
    GetTechnology.prototype.getMethod = function () { return 'GET'; };
    return GetTechnology;
}());
exports.GetTechnology = GetTechnology;
// @Route("/technology/{Slug}/favorites")
var GetTechnologyFavoriteDetails = /** @class */ (function () {
    function GetTechnologyFavoriteDetails(init) {
        Object.assign(this, init);
    }
    GetTechnologyFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyFavoriteDetailsResponse(); };
    GetTechnologyFavoriteDetails.prototype.getTypeName = function () { return 'GetTechnologyFavoriteDetails'; };
    GetTechnologyFavoriteDetails.prototype.getMethod = function () { return 'GET'; };
    return GetTechnologyFavoriteDetails;
}());
exports.GetTechnologyFavoriteDetails = GetTechnologyFavoriteDetails;
// @Route("/technology", "POST")
var CreateTechnology = /** @class */ (function () {
    function CreateTechnology(init) {
        Object.assign(this, init);
    }
    CreateTechnology.prototype.createResponse = function () { return new CreateTechnologyResponse(); };
    CreateTechnology.prototype.getTypeName = function () { return 'CreateTechnology'; };
    CreateTechnology.prototype.getMethod = function () { return 'POST'; };
    return CreateTechnology;
}());
exports.CreateTechnology = CreateTechnology;
// @Route("/technology/{Id}", "PUT")
var UpdateTechnology = /** @class */ (function () {
    function UpdateTechnology(init) {
        Object.assign(this, init);
    }
    UpdateTechnology.prototype.createResponse = function () { return new UpdateTechnologyResponse(); };
    UpdateTechnology.prototype.getTypeName = function () { return 'UpdateTechnology'; };
    UpdateTechnology.prototype.getMethod = function () { return 'PUT'; };
    return UpdateTechnology;
}());
exports.UpdateTechnology = UpdateTechnology;
// @Route("/technology/{Id}", "DELETE")
var DeleteTechnology = /** @class */ (function () {
    function DeleteTechnology(init) {
        Object.assign(this, init);
    }
    DeleteTechnology.prototype.createResponse = function () { return new DeleteTechnologyResponse(); };
    DeleteTechnology.prototype.getTypeName = function () { return 'DeleteTechnology'; };
    DeleteTechnology.prototype.getMethod = function () { return 'DELETE'; };
    return DeleteTechnology;
}());
exports.DeleteTechnology = DeleteTechnology;
// @Route("/techstacks/{Slug}/previous-versions", "GET")
var GetTechnologyStackPreviousVersions = /** @class */ (function () {
    function GetTechnologyStackPreviousVersions(init) {
        Object.assign(this, init);
    }
    GetTechnologyStackPreviousVersions.prototype.createResponse = function () { return new GetTechnologyStackPreviousVersionsResponse(); };
    GetTechnologyStackPreviousVersions.prototype.getTypeName = function () { return 'GetTechnologyStackPreviousVersions'; };
    GetTechnologyStackPreviousVersions.prototype.getMethod = function () { return 'GET'; };
    return GetTechnologyStackPreviousVersions;
}());
exports.GetTechnologyStackPreviousVersions = GetTechnologyStackPreviousVersions;
// @Route("/pagestats/{Type}/{Slug}")
var GetPageStats = /** @class */ (function () {
    function GetPageStats(init) {
        Object.assign(this, init);
    }
    GetPageStats.prototype.createResponse = function () { return new GetPageStatsResponse(); };
    GetPageStats.prototype.getTypeName = function () { return 'GetPageStats'; };
    GetPageStats.prototype.getMethod = function () { return 'GET'; };
    return GetPageStats;
}());
exports.GetPageStats = GetPageStats;
// @Route("/cache/clear")
var ClearCache = /** @class */ (function () {
    function ClearCache(init) {
        Object.assign(this, init);
    }
    ClearCache.prototype.createResponse = function () { return ''; };
    ClearCache.prototype.getTypeName = function () { return 'ClearCache'; };
    ClearCache.prototype.getMethod = function () { return 'GET'; };
    return ClearCache;
}());
exports.ClearCache = ClearCache;
// @Route("/tasks/hourly")
var HourlyTask = /** @class */ (function () {
    function HourlyTask(init) {
        Object.assign(this, init);
    }
    HourlyTask.prototype.createResponse = function () { return new HourlyTaskResponse(); };
    HourlyTask.prototype.getTypeName = function () { return 'HourlyTask'; };
    HourlyTask.prototype.getMethod = function () { return 'GET'; };
    return HourlyTask;
}());
exports.HourlyTask = HourlyTask;
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
    FindTechStacks.prototype.getMethod = function () { return 'GET'; };
    return FindTechStacks;
}(QueryDb_2));
exports.FindTechStacks = FindTechStacks;
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
    QueryTechStacks.prototype.getMethod = function () { return 'GET'; };
    return QueryTechStacks;
}(QueryDb_2));
exports.QueryTechStacks = QueryTechStacks;
// @Route("/overview")
var Overview = /** @class */ (function () {
    function Overview(init) {
        Object.assign(this, init);
    }
    Overview.prototype.createResponse = function () { return new OverviewResponse(); };
    Overview.prototype.getTypeName = function () { return 'Overview'; };
    Overview.prototype.getMethod = function () { return 'GET'; };
    return Overview;
}());
exports.Overview = Overview;
// @Route("/app-overview")
var AppOverview = /** @class */ (function () {
    function AppOverview(init) {
        Object.assign(this, init);
    }
    AppOverview.prototype.createResponse = function () { return new AppOverviewResponse(); };
    AppOverview.prototype.getTypeName = function () { return 'AppOverview'; };
    AppOverview.prototype.getMethod = function () { return 'GET'; };
    return AppOverview;
}());
exports.AppOverview = AppOverview;
// @Route("/techstacks", "GET")
var GetAllTechnologyStacks = /** @class */ (function () {
    function GetAllTechnologyStacks(init) {
        Object.assign(this, init);
    }
    GetAllTechnologyStacks.prototype.createResponse = function () { return new GetAllTechnologyStacksResponse(); };
    GetAllTechnologyStacks.prototype.getTypeName = function () { return 'GetAllTechnologyStacks'; };
    GetAllTechnologyStacks.prototype.getMethod = function () { return 'GET'; };
    return GetAllTechnologyStacks;
}());
exports.GetAllTechnologyStacks = GetAllTechnologyStacks;
// @Route("/techstacks/{Slug}", "GET")
var GetTechnologyStack = /** @class */ (function () {
    function GetTechnologyStack(init) {
        Object.assign(this, init);
    }
    GetTechnologyStack.prototype.createResponse = function () { return new GetTechnologyStackResponse(); };
    GetTechnologyStack.prototype.getTypeName = function () { return 'GetTechnologyStack'; };
    GetTechnologyStack.prototype.getMethod = function () { return 'GET'; };
    return GetTechnologyStack;
}());
exports.GetTechnologyStack = GetTechnologyStack;
// @Route("/techstacks/{Slug}/favorites")
var GetTechnologyStackFavoriteDetails = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetails(init) {
        Object.assign(this, init);
    }
    GetTechnologyStackFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyStackFavoriteDetailsResponse(); };
    GetTechnologyStackFavoriteDetails.prototype.getTypeName = function () { return 'GetTechnologyStackFavoriteDetails'; };
    GetTechnologyStackFavoriteDetails.prototype.getMethod = function () { return 'GET'; };
    return GetTechnologyStackFavoriteDetails;
}());
exports.GetTechnologyStackFavoriteDetails = GetTechnologyStackFavoriteDetails;
// @Route("/config")
var GetConfig = /** @class */ (function () {
    function GetConfig(init) {
        Object.assign(this, init);
    }
    GetConfig.prototype.createResponse = function () { return new GetConfigResponse(); };
    GetConfig.prototype.getTypeName = function () { return 'GetConfig'; };
    GetConfig.prototype.getMethod = function () { return 'GET'; };
    return GetConfig;
}());
exports.GetConfig = GetConfig;
// @Route("/techstacks", "POST")
var CreateTechnologyStack = /** @class */ (function () {
    function CreateTechnologyStack(init) {
        Object.assign(this, init);
    }
    CreateTechnologyStack.prototype.createResponse = function () { return new CreateTechnologyStackResponse(); };
    CreateTechnologyStack.prototype.getTypeName = function () { return 'CreateTechnologyStack'; };
    CreateTechnologyStack.prototype.getMethod = function () { return 'POST'; };
    return CreateTechnologyStack;
}());
exports.CreateTechnologyStack = CreateTechnologyStack;
// @Route("/techstacks/{Id}", "PUT")
var UpdateTechnologyStack = /** @class */ (function () {
    function UpdateTechnologyStack(init) {
        Object.assign(this, init);
    }
    UpdateTechnologyStack.prototype.createResponse = function () { return new UpdateTechnologyStackResponse(); };
    UpdateTechnologyStack.prototype.getTypeName = function () { return 'UpdateTechnologyStack'; };
    UpdateTechnologyStack.prototype.getMethod = function () { return 'PUT'; };
    return UpdateTechnologyStack;
}());
exports.UpdateTechnologyStack = UpdateTechnologyStack;
// @Route("/techstacks/{Id}", "DELETE")
var DeleteTechnologyStack = /** @class */ (function () {
    function DeleteTechnologyStack(init) {
        Object.assign(this, init);
    }
    DeleteTechnologyStack.prototype.createResponse = function () { return new DeleteTechnologyStackResponse(); };
    DeleteTechnologyStack.prototype.getTypeName = function () { return 'DeleteTechnologyStack'; };
    DeleteTechnologyStack.prototype.getMethod = function () { return 'DELETE'; };
    return DeleteTechnologyStack;
}());
exports.DeleteTechnologyStack = DeleteTechnologyStack;
// @Route("/favorites/techtacks", "GET")
var GetFavoriteTechStack = /** @class */ (function () {
    function GetFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    GetFavoriteTechStack.prototype.createResponse = function () { return new GetFavoriteTechStackResponse(); };
    GetFavoriteTechStack.prototype.getTypeName = function () { return 'GetFavoriteTechStack'; };
    GetFavoriteTechStack.prototype.getMethod = function () { return 'GET'; };
    return GetFavoriteTechStack;
}());
exports.GetFavoriteTechStack = GetFavoriteTechStack;
// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
var AddFavoriteTechStack = /** @class */ (function () {
    function AddFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    AddFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    AddFavoriteTechStack.prototype.getTypeName = function () { return 'AddFavoriteTechStack'; };
    AddFavoriteTechStack.prototype.getMethod = function () { return 'PUT'; };
    return AddFavoriteTechStack;
}());
exports.AddFavoriteTechStack = AddFavoriteTechStack;
// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
var RemoveFavoriteTechStack = /** @class */ (function () {
    function RemoveFavoriteTechStack(init) {
        Object.assign(this, init);
    }
    RemoveFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    RemoveFavoriteTechStack.prototype.getTypeName = function () { return 'RemoveFavoriteTechStack'; };
    RemoveFavoriteTechStack.prototype.getMethod = function () { return 'DELETE'; };
    return RemoveFavoriteTechStack;
}());
exports.RemoveFavoriteTechStack = RemoveFavoriteTechStack;
// @Route("/favorites/technology", "GET")
var GetFavoriteTechnologies = /** @class */ (function () {
    function GetFavoriteTechnologies(init) {
        Object.assign(this, init);
    }
    GetFavoriteTechnologies.prototype.createResponse = function () { return new GetFavoriteTechnologiesResponse(); };
    GetFavoriteTechnologies.prototype.getTypeName = function () { return 'GetFavoriteTechnologies'; };
    GetFavoriteTechnologies.prototype.getMethod = function () { return 'GET'; };
    return GetFavoriteTechnologies;
}());
exports.GetFavoriteTechnologies = GetFavoriteTechnologies;
// @Route("/favorites/technology/{TechnologyId}", "PUT")
var AddFavoriteTechnology = /** @class */ (function () {
    function AddFavoriteTechnology(init) {
        Object.assign(this, init);
    }
    AddFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    AddFavoriteTechnology.prototype.getTypeName = function () { return 'AddFavoriteTechnology'; };
    AddFavoriteTechnology.prototype.getMethod = function () { return 'PUT'; };
    return AddFavoriteTechnology;
}());
exports.AddFavoriteTechnology = AddFavoriteTechnology;
// @Route("/favorites/technology/{TechnologyId}", "DELETE")
var RemoveFavoriteTechnology = /** @class */ (function () {
    function RemoveFavoriteTechnology(init) {
        Object.assign(this, init);
    }
    RemoveFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    RemoveFavoriteTechnology.prototype.getTypeName = function () { return 'RemoveFavoriteTechnology'; };
    RemoveFavoriteTechnology.prototype.getMethod = function () { return 'DELETE'; };
    return RemoveFavoriteTechnology;
}());
exports.RemoveFavoriteTechnology = RemoveFavoriteTechnology;
// @Route("/my-feed")
var GetUserFeed = /** @class */ (function () {
    function GetUserFeed(init) {
        Object.assign(this, init);
    }
    GetUserFeed.prototype.createResponse = function () { return new GetUserFeedResponse(); };
    GetUserFeed.prototype.getTypeName = function () { return 'GetUserFeed'; };
    GetUserFeed.prototype.getMethod = function () { return 'GET'; };
    return GetUserFeed;
}());
exports.GetUserFeed = GetUserFeed;
// @Route("/users/karma", "GET")
var GetUsersKarma = /** @class */ (function () {
    function GetUsersKarma(init) {
        Object.assign(this, init);
    }
    GetUsersKarma.prototype.createResponse = function () { return new GetUsersKarmaResponse(); };
    GetUsersKarma.prototype.getTypeName = function () { return 'GetUsersKarma'; };
    GetUsersKarma.prototype.getMethod = function () { return 'GET'; };
    return GetUsersKarma;
}());
exports.GetUsersKarma = GetUsersKarma;
// @Route("/userinfo/{UserName}")
var GetUserInfo = /** @class */ (function () {
    function GetUserInfo(init) {
        Object.assign(this, init);
    }
    GetUserInfo.prototype.createResponse = function () { return new GetUserInfoResponse(); };
    GetUserInfo.prototype.getTypeName = function () { return 'GetUserInfo'; };
    GetUserInfo.prototype.getMethod = function () { return 'GET'; };
    return GetUserInfo;
}());
exports.GetUserInfo = GetUserInfo;
// @Route("/users/{UserName}/avatar", "GET")
var UserAvatar = /** @class */ (function () {
    function UserAvatar(init) {
        Object.assign(this, init);
    }
    UserAvatar.prototype.getMethod = function () { return 'GET'; };
    return UserAvatar;
}());
exports.UserAvatar = UserAvatar;
// @Route("/mq/start")
var MqStart = /** @class */ (function () {
    function MqStart(init) {
        Object.assign(this, init);
    }
    MqStart.prototype.createResponse = function () { return ''; };
    MqStart.prototype.getTypeName = function () { return 'MqStart'; };
    MqStart.prototype.getMethod = function () { return 'POST'; };
    return MqStart;
}());
exports.MqStart = MqStart;
// @Route("/mq/stop")
var MqStop = /** @class */ (function () {
    function MqStop(init) {
        Object.assign(this, init);
    }
    MqStop.prototype.createResponse = function () { return ''; };
    MqStop.prototype.getTypeName = function () { return 'MqStop'; };
    MqStop.prototype.getMethod = function () { return 'POST'; };
    return MqStop;
}());
exports.MqStop = MqStop;
// @Route("/mq/stats")
var MqStats = /** @class */ (function () {
    function MqStats(init) {
        Object.assign(this, init);
    }
    MqStats.prototype.createResponse = function () { return ''; };
    MqStats.prototype.getTypeName = function () { return 'MqStats'; };
    MqStats.prototype.getMethod = function () { return 'POST'; };
    return MqStats;
}());
exports.MqStats = MqStats;
// @Route("/mq/status")
var MqStatus = /** @class */ (function () {
    function MqStatus(init) {
        Object.assign(this, init);
    }
    MqStatus.prototype.createResponse = function () { return ''; };
    MqStatus.prototype.getTypeName = function () { return 'MqStatus'; };
    MqStatus.prototype.getMethod = function () { return 'POST'; };
    return MqStatus;
}());
exports.MqStatus = MqStatus;
// @Route("/sync/discourse/{Site}")
var SyncDiscourseSite = /** @class */ (function () {
    function SyncDiscourseSite(init) {
        Object.assign(this, init);
    }
    SyncDiscourseSite.prototype.createResponse = function () { return new SyncDiscourseSiteResponse(); };
    SyncDiscourseSite.prototype.getTypeName = function () { return 'SyncDiscourseSite'; };
    SyncDiscourseSite.prototype.getMethod = function () { return 'POST'; };
    return SyncDiscourseSite;
}());
exports.SyncDiscourseSite = SyncDiscourseSite;
// @Route("/admin/technology/{TechnologyId}/logo")
var LogoUrlApproval = /** @class */ (function () {
    function LogoUrlApproval(init) {
        Object.assign(this, init);
    }
    LogoUrlApproval.prototype.createResponse = function () { return new LogoUrlApprovalResponse(); };
    LogoUrlApproval.prototype.getTypeName = function () { return 'LogoUrlApproval'; };
    LogoUrlApproval.prototype.getMethod = function () { return 'PUT'; };
    return LogoUrlApproval;
}());
exports.LogoUrlApproval = LogoUrlApproval;
/**
* Limit updates to TechStack to Owner or Admin users
*/
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
var LockTechStack = /** @class */ (function () {
    function LockTechStack(init) {
        Object.assign(this, init);
    }
    LockTechStack.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTechStack.prototype.getTypeName = function () { return 'LockTechStack'; };
    LockTechStack.prototype.getMethod = function () { return 'PUT'; };
    return LockTechStack;
}());
exports.LockTechStack = LockTechStack;
/**
* Limit updates to Technology to Owner or Admin users
*/
// @Route("/admin/technology/{TechnologyId}/lock")
// @Api(Description="Limit updates to Technology to Owner or Admin users")
var LockTech = /** @class */ (function () {
    function LockTech(init) {
        Object.assign(this, init);
    }
    LockTech.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTech.prototype.getTypeName = function () { return 'LockTech'; };
    LockTech.prototype.getMethod = function () { return 'PUT'; };
    return LockTech;
}());
exports.LockTech = LockTech;
var DummyTypes = /** @class */ (function () {
    function DummyTypes(init) {
        Object.assign(this, init);
    }
    DummyTypes.prototype.getMethod = function () { return 'POST'; };
    return DummyTypes;
}());
exports.DummyTypes = DummyTypes;
// @Route("/email/post/{PostId}")
var EmailTest = /** @class */ (function () {
    function EmailTest(init) {
        Object.assign(this, init);
    }
    EmailTest.prototype.createResponse = function () { return new EmailTestRespoonse(); };
    EmailTest.prototype.getTypeName = function () { return 'EmailTest'; };
    EmailTest.prototype.getMethod = function () { return 'POST'; };
    return EmailTest;
}());
exports.EmailTest = EmailTest;
var ImportUser = /** @class */ (function () {
    function ImportUser(init) {
        Object.assign(this, init);
    }
    ImportUser.prototype.createResponse = function () { return new ImportUserResponse(); };
    ImportUser.prototype.getTypeName = function () { return 'ImportUser'; };
    ImportUser.prototype.getMethod = function () { return 'POST'; };
    return ImportUser;
}());
exports.ImportUser = ImportUser;
// @Route("/import/uservoice/suggestion")
var ImportUserVoiceSuggestion = /** @class */ (function () {
    function ImportUserVoiceSuggestion(init) {
        Object.assign(this, init);
    }
    ImportUserVoiceSuggestion.prototype.createResponse = function () { return new ImportUserVoiceSuggestionResponse(); };
    ImportUserVoiceSuggestion.prototype.getTypeName = function () { return 'ImportUserVoiceSuggestion'; };
    ImportUserVoiceSuggestion.prototype.getMethod = function () { return 'POST'; };
    return ImportUserVoiceSuggestion;
}());
exports.ImportUserVoiceSuggestion = ImportUserVoiceSuggestion;
// @Route("/auth")
// @Route("/auth/{provider}")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate(init) {
        Object.assign(this, init);
    }
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    Authenticate.prototype.getTypeName = function () { return 'Authenticate'; };
    Authenticate.prototype.getMethod = function () { return 'POST'; };
    return Authenticate;
}());
exports.Authenticate = Authenticate;
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles(init) {
        Object.assign(this, init);
    }
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    AssignRoles.prototype.getTypeName = function () { return 'AssignRoles'; };
    AssignRoles.prototype.getMethod = function () { return 'POST'; };
    return AssignRoles;
}());
exports.AssignRoles = AssignRoles;
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles(init) {
        Object.assign(this, init);
    }
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    UnAssignRoles.prototype.getTypeName = function () { return 'UnAssignRoles'; };
    UnAssignRoles.prototype.getMethod = function () { return 'POST'; };
    return UnAssignRoles;
}());
exports.UnAssignRoles = UnAssignRoles;
// @Route("/session-to-token")
// @DataContract
var ConvertSessionToToken = /** @class */ (function () {
    function ConvertSessionToToken(init) {
        Object.assign(this, init);
    }
    ConvertSessionToToken.prototype.createResponse = function () { return new ConvertSessionToTokenResponse(); };
    ConvertSessionToToken.prototype.getTypeName = function () { return 'ConvertSessionToToken'; };
    ConvertSessionToToken.prototype.getMethod = function () { return 'POST'; };
    return ConvertSessionToToken;
}());
exports.ConvertSessionToToken = ConvertSessionToToken;
// @Route("/access-token")
// @DataContract
var GetAccessToken = /** @class */ (function () {
    function GetAccessToken(init) {
        Object.assign(this, init);
    }
    GetAccessToken.prototype.createResponse = function () { return new GetAccessTokenResponse(); };
    GetAccessToken.prototype.getTypeName = function () { return 'GetAccessToken'; };
    GetAccessToken.prototype.getMethod = function () { return 'POST'; };
    return GetAccessToken;
}());
exports.GetAccessToken = GetAccessToken;
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
    QueryPostComments.prototype.getMethod = function () { return 'GET'; };
    return QueryPostComments;
}(QueryDb_1));
exports.QueryPostComments = QueryPostComments;
