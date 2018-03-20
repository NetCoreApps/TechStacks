"use strict";
/* Options:
Date: 2018-03-19 21:31:29
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
exports.__esModule = true;
var Organization = /** @class */ (function () {
    function Organization() {
    }
    return Organization;
}());
exports.Organization = Organization;
var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());
exports.Category = Category;
var OrganizationMember = /** @class */ (function () {
    function OrganizationMember() {
    }
    return OrganizationMember;
}());
exports.OrganizationMember = OrganizationMember;
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError() {
    }
    return ResponseError;
}());
exports.ResponseError = ResponseError;
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus() {
    }
    return ResponseStatus;
}());
exports.ResponseStatus = ResponseStatus;
var OrganizationMemberInvite = /** @class */ (function () {
    function OrganizationMemberInvite() {
    }
    return OrganizationMemberInvite;
}());
exports.OrganizationMemberInvite = OrganizationMemberInvite;
var PostReport = /** @class */ (function () {
    function PostReport() {
    }
    return PostReport;
}());
exports.PostReport = PostReport;
var PostReportInfo = /** @class */ (function (_super) {
    __extends(PostReportInfo, _super);
    function PostReportInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostReportInfo;
}(PostReport));
exports.PostReportInfo = PostReportInfo;
var PostCommentReport = /** @class */ (function () {
    function PostCommentReport() {
    }
    return PostCommentReport;
}());
exports.PostCommentReport = PostCommentReport;
var PostCommentReportInfo = /** @class */ (function (_super) {
    __extends(PostCommentReportInfo, _super);
    function PostCommentReportInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostCommentReportInfo;
}(PostCommentReport));
exports.PostCommentReportInfo = PostCommentReportInfo;
var QueryBase = /** @class */ (function () {
    function QueryBase() {
    }
    return QueryBase;
}());
exports.QueryBase = QueryBase;
var QueryDb = /** @class */ (function (_super) {
    __extends(QueryDb, _super);
    function QueryDb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueryDb;
}(QueryBase));
exports.QueryDb = QueryDb;
var Post = /** @class */ (function () {
    function Post() {
    }
    return Post;
}());
exports.Post = Post;
var PostComment = /** @class */ (function () {
    function PostComment() {
    }
    return PostComment;
}());
exports.PostComment = PostComment;
var UserRef = /** @class */ (function () {
    function UserRef() {
    }
    return UserRef;
}());
exports.UserRef = UserRef;
var TechnologyStackBase = /** @class */ (function () {
    function TechnologyStackBase() {
    }
    return TechnologyStackBase;
}());
exports.TechnologyStackBase = TechnologyStackBase;
var TechnologyStack = /** @class */ (function (_super) {
    __extends(TechnologyStack, _super);
    function TechnologyStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyStack;
}(TechnologyStackBase));
exports.TechnologyStack = TechnologyStack;
var TechnologyBase = /** @class */ (function () {
    function TechnologyBase() {
    }
    return TechnologyBase;
}());
exports.TechnologyBase = TechnologyBase;
var Technology = /** @class */ (function (_super) {
    __extends(Technology, _super);
    function Technology() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Technology;
}(TechnologyBase));
exports.Technology = Technology;
var UserActivity = /** @class */ (function () {
    function UserActivity() {
    }
    return UserActivity;
}());
exports.UserActivity = UserActivity;
var TechnologyHistory = /** @class */ (function (_super) {
    __extends(TechnologyHistory, _super);
    function TechnologyHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyHistory;
}(TechnologyBase));
exports.TechnologyHistory = TechnologyHistory;
var TechnologyStackHistory = /** @class */ (function (_super) {
    __extends(TechnologyStackHistory, _super);
    function TechnologyStackHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyStackHistory;
}(TechnologyStackBase));
exports.TechnologyStackHistory = TechnologyStackHistory;
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
var TechnologyInfo = /** @class */ (function () {
    function TechnologyInfo() {
    }
    return TechnologyInfo;
}());
exports.TechnologyInfo = TechnologyInfo;
var TechnologyInStack = /** @class */ (function (_super) {
    __extends(TechnologyInStack, _super);
    function TechnologyInStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyInStack;
}(TechnologyBase));
exports.TechnologyInStack = TechnologyInStack;
var TechStackDetails = /** @class */ (function (_super) {
    __extends(TechStackDetails, _super);
    function TechStackDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechStackDetails;
}(TechnologyStackBase));
exports.TechStackDetails = TechStackDetails;
var CategoryInfo = /** @class */ (function () {
    function CategoryInfo() {
    }
    return CategoryInfo;
}());
exports.CategoryInfo = CategoryInfo;
var OrganizationInfo = /** @class */ (function () {
    function OrganizationInfo() {
    }
    return OrganizationInfo;
}());
exports.OrganizationInfo = OrganizationInfo;
// @DataContract
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
exports.Option = Option;
var GetOrganizationResponse = /** @class */ (function () {
    function GetOrganizationResponse() {
    }
    return GetOrganizationResponse;
}());
exports.GetOrganizationResponse = GetOrganizationResponse;
var GetOrganizationMembersResponse = /** @class */ (function () {
    function GetOrganizationMembersResponse() {
    }
    return GetOrganizationMembersResponse;
}());
exports.GetOrganizationMembersResponse = GetOrganizationMembersResponse;
var GetOrganizationAdminResponse = /** @class */ (function () {
    function GetOrganizationAdminResponse() {
    }
    return GetOrganizationAdminResponse;
}());
exports.GetOrganizationAdminResponse = GetOrganizationAdminResponse;
var CreateOrganizationForTechnologyResponse = /** @class */ (function () {
    function CreateOrganizationForTechnologyResponse() {
    }
    return CreateOrganizationForTechnologyResponse;
}());
exports.CreateOrganizationForTechnologyResponse = CreateOrganizationForTechnologyResponse;
var CreateOrganizationResponse = /** @class */ (function () {
    function CreateOrganizationResponse() {
    }
    return CreateOrganizationResponse;
}());
exports.CreateOrganizationResponse = CreateOrganizationResponse;
var UpdateOrganizationResponse = /** @class */ (function () {
    function UpdateOrganizationResponse() {
    }
    return UpdateOrganizationResponse;
}());
exports.UpdateOrganizationResponse = UpdateOrganizationResponse;
var AddCategoryResponse = /** @class */ (function () {
    function AddCategoryResponse() {
    }
    return AddCategoryResponse;
}());
exports.AddCategoryResponse = AddCategoryResponse;
var UpdateCategoryResponse = /** @class */ (function () {
    function UpdateCategoryResponse() {
    }
    return UpdateCategoryResponse;
}());
exports.UpdateCategoryResponse = UpdateCategoryResponse;
var AddOrganizationMemberResponse = /** @class */ (function () {
    function AddOrganizationMemberResponse() {
    }
    return AddOrganizationMemberResponse;
}());
exports.AddOrganizationMemberResponse = AddOrganizationMemberResponse;
var UpdateOrganizationMemberResponse = /** @class */ (function () {
    function UpdateOrganizationMemberResponse() {
    }
    return UpdateOrganizationMemberResponse;
}());
exports.UpdateOrganizationMemberResponse = UpdateOrganizationMemberResponse;
var SetOrganizationMembersResponse = /** @class */ (function () {
    function SetOrganizationMembersResponse() {
    }
    return SetOrganizationMembersResponse;
}());
exports.SetOrganizationMembersResponse = SetOrganizationMembersResponse;
var GetOrganizationMemberInvitesResponse = /** @class */ (function () {
    function GetOrganizationMemberInvitesResponse() {
    }
    return GetOrganizationMemberInvitesResponse;
}());
exports.GetOrganizationMemberInvitesResponse = GetOrganizationMemberInvitesResponse;
var RequestOrganizationMemberInviteResponse = /** @class */ (function () {
    function RequestOrganizationMemberInviteResponse() {
    }
    return RequestOrganizationMemberInviteResponse;
}());
exports.RequestOrganizationMemberInviteResponse = RequestOrganizationMemberInviteResponse;
var UpdateOrganizationMemberInviteResponse = /** @class */ (function () {
    function UpdateOrganizationMemberInviteResponse() {
    }
    return UpdateOrganizationMemberInviteResponse;
}());
exports.UpdateOrganizationMemberInviteResponse = UpdateOrganizationMemberInviteResponse;
// @DataContract
var QueryResponse = /** @class */ (function () {
    function QueryResponse() {
    }
    return QueryResponse;
}());
exports.QueryResponse = QueryResponse;
var GetPostResponse = /** @class */ (function () {
    function GetPostResponse() {
    }
    return GetPostResponse;
}());
exports.GetPostResponse = GetPostResponse;
var CreatePostResponse = /** @class */ (function () {
    function CreatePostResponse() {
    }
    return CreatePostResponse;
}());
exports.CreatePostResponse = CreatePostResponse;
var UpdatePostResponse = /** @class */ (function () {
    function UpdatePostResponse() {
    }
    return UpdatePostResponse;
}());
exports.UpdatePostResponse = UpdatePostResponse;
var DeletePostResponse = /** @class */ (function () {
    function DeletePostResponse() {
    }
    return DeletePostResponse;
}());
exports.DeletePostResponse = DeletePostResponse;
var CreatePostCommentResponse = /** @class */ (function () {
    function CreatePostCommentResponse() {
    }
    return CreatePostCommentResponse;
}());
exports.CreatePostCommentResponse = CreatePostCommentResponse;
var UpdatePostCommentResponse = /** @class */ (function () {
    function UpdatePostCommentResponse() {
    }
    return UpdatePostCommentResponse;
}());
exports.UpdatePostCommentResponse = UpdatePostCommentResponse;
var DeletePostCommentResponse = /** @class */ (function () {
    function DeletePostCommentResponse() {
    }
    return DeletePostCommentResponse;
}());
exports.DeletePostCommentResponse = DeletePostCommentResponse;
var GetUserPostCommentVotesResponse = /** @class */ (function () {
    function GetUserPostCommentVotesResponse() {
    }
    return GetUserPostCommentVotesResponse;
}());
exports.GetUserPostCommentVotesResponse = GetUserPostCommentVotesResponse;
var PinPostCommentResponse = /** @class */ (function () {
    function PinPostCommentResponse() {
    }
    return PinPostCommentResponse;
}());
exports.PinPostCommentResponse = PinPostCommentResponse;
var GetUsersByEmailsResponse = /** @class */ (function () {
    function GetUsersByEmailsResponse() {
    }
    return GetUsersByEmailsResponse;
}());
exports.GetUsersByEmailsResponse = GetUsersByEmailsResponse;
var GetUserPostActivityResponse = /** @class */ (function () {
    function GetUserPostActivityResponse() {
    }
    return GetUserPostActivityResponse;
}());
exports.GetUserPostActivityResponse = GetUserPostActivityResponse;
var GetUserOrganizationsResponse = /** @class */ (function () {
    function GetUserOrganizationsResponse() {
    }
    return GetUserOrganizationsResponse;
}());
exports.GetUserOrganizationsResponse = GetUserOrganizationsResponse;
var UserPostVoteResponse = /** @class */ (function () {
    function UserPostVoteResponse() {
    }
    return UserPostVoteResponse;
}());
exports.UserPostVoteResponse = UserPostVoteResponse;
var UserPostFavoriteResponse = /** @class */ (function () {
    function UserPostFavoriteResponse() {
    }
    return UserPostFavoriteResponse;
}());
exports.UserPostFavoriteResponse = UserPostFavoriteResponse;
var UserPostReportResponse = /** @class */ (function () {
    function UserPostReportResponse() {
    }
    return UserPostReportResponse;
}());
exports.UserPostReportResponse = UserPostReportResponse;
var UserPostCommentVoteResponse = /** @class */ (function () {
    function UserPostCommentVoteResponse() {
    }
    return UserPostCommentVoteResponse;
}());
exports.UserPostCommentVoteResponse = UserPostCommentVoteResponse;
var UserPostCommentReportResponse = /** @class */ (function () {
    function UserPostCommentReportResponse() {
    }
    return UserPostCommentReportResponse;
}());
exports.UserPostCommentReportResponse = UserPostCommentReportResponse;
var SessionInfoResponse = /** @class */ (function () {
    function SessionInfoResponse() {
    }
    return SessionInfoResponse;
}());
exports.SessionInfoResponse = SessionInfoResponse;
var GetTechnologyPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyPreviousVersionsResponse() {
    }
    return GetTechnologyPreviousVersionsResponse;
}());
exports.GetTechnologyPreviousVersionsResponse = GetTechnologyPreviousVersionsResponse;
var GetAllTechnologiesResponse = /** @class */ (function () {
    function GetAllTechnologiesResponse() {
    }
    return GetAllTechnologiesResponse;
}());
exports.GetAllTechnologiesResponse = GetAllTechnologiesResponse;
var GetTechnologyResponse = /** @class */ (function () {
    function GetTechnologyResponse() {
    }
    return GetTechnologyResponse;
}());
exports.GetTechnologyResponse = GetTechnologyResponse;
var GetTechnologyFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyFavoriteDetailsResponse() {
    }
    return GetTechnologyFavoriteDetailsResponse;
}());
exports.GetTechnologyFavoriteDetailsResponse = GetTechnologyFavoriteDetailsResponse;
var CreateTechnologyResponse = /** @class */ (function () {
    function CreateTechnologyResponse() {
    }
    return CreateTechnologyResponse;
}());
exports.CreateTechnologyResponse = CreateTechnologyResponse;
var UpdateTechnologyResponse = /** @class */ (function () {
    function UpdateTechnologyResponse() {
    }
    return UpdateTechnologyResponse;
}());
exports.UpdateTechnologyResponse = UpdateTechnologyResponse;
var DeleteTechnologyResponse = /** @class */ (function () {
    function DeleteTechnologyResponse() {
    }
    return DeleteTechnologyResponse;
}());
exports.DeleteTechnologyResponse = DeleteTechnologyResponse;
var GetTechnologyStackPreviousVersionsResponse = /** @class */ (function () {
    function GetTechnologyStackPreviousVersionsResponse() {
    }
    return GetTechnologyStackPreviousVersionsResponse;
}());
exports.GetTechnologyStackPreviousVersionsResponse = GetTechnologyStackPreviousVersionsResponse;
var GetPageStatsResponse = /** @class */ (function () {
    function GetPageStatsResponse() {
    }
    return GetPageStatsResponse;
}());
exports.GetPageStatsResponse = GetPageStatsResponse;
var HourlyTaskResponse = /** @class */ (function () {
    function HourlyTaskResponse() {
    }
    return HourlyTaskResponse;
}());
exports.HourlyTaskResponse = HourlyTaskResponse;
var OverviewResponse = /** @class */ (function () {
    function OverviewResponse() {
    }
    return OverviewResponse;
}());
exports.OverviewResponse = OverviewResponse;
var AppOverviewResponse = /** @class */ (function () {
    function AppOverviewResponse() {
    }
    return AppOverviewResponse;
}());
exports.AppOverviewResponse = AppOverviewResponse;
var GetAllTechnologyStacksResponse = /** @class */ (function () {
    function GetAllTechnologyStacksResponse() {
    }
    return GetAllTechnologyStacksResponse;
}());
exports.GetAllTechnologyStacksResponse = GetAllTechnologyStacksResponse;
var GetTechnologyStackResponse = /** @class */ (function () {
    function GetTechnologyStackResponse() {
    }
    return GetTechnologyStackResponse;
}());
exports.GetTechnologyStackResponse = GetTechnologyStackResponse;
var GetTechnologyStackFavoriteDetailsResponse = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetailsResponse() {
    }
    return GetTechnologyStackFavoriteDetailsResponse;
}());
exports.GetTechnologyStackFavoriteDetailsResponse = GetTechnologyStackFavoriteDetailsResponse;
var GetConfigResponse = /** @class */ (function () {
    function GetConfigResponse() {
    }
    return GetConfigResponse;
}());
exports.GetConfigResponse = GetConfigResponse;
var CreateTechnologyStackResponse = /** @class */ (function () {
    function CreateTechnologyStackResponse() {
    }
    return CreateTechnologyStackResponse;
}());
exports.CreateTechnologyStackResponse = CreateTechnologyStackResponse;
var UpdateTechnologyStackResponse = /** @class */ (function () {
    function UpdateTechnologyStackResponse() {
    }
    return UpdateTechnologyStackResponse;
}());
exports.UpdateTechnologyStackResponse = UpdateTechnologyStackResponse;
var DeleteTechnologyStackResponse = /** @class */ (function () {
    function DeleteTechnologyStackResponse() {
    }
    return DeleteTechnologyStackResponse;
}());
exports.DeleteTechnologyStackResponse = DeleteTechnologyStackResponse;
var GetFavoriteTechStackResponse = /** @class */ (function () {
    function GetFavoriteTechStackResponse() {
    }
    return GetFavoriteTechStackResponse;
}());
exports.GetFavoriteTechStackResponse = GetFavoriteTechStackResponse;
var FavoriteTechStackResponse = /** @class */ (function () {
    function FavoriteTechStackResponse() {
    }
    return FavoriteTechStackResponse;
}());
exports.FavoriteTechStackResponse = FavoriteTechStackResponse;
var GetFavoriteTechnologiesResponse = /** @class */ (function () {
    function GetFavoriteTechnologiesResponse() {
    }
    return GetFavoriteTechnologiesResponse;
}());
exports.GetFavoriteTechnologiesResponse = GetFavoriteTechnologiesResponse;
var FavoriteTechnologyResponse = /** @class */ (function () {
    function FavoriteTechnologyResponse() {
    }
    return FavoriteTechnologyResponse;
}());
exports.FavoriteTechnologyResponse = FavoriteTechnologyResponse;
var GetUserFeedResponse = /** @class */ (function () {
    function GetUserFeedResponse() {
    }
    return GetUserFeedResponse;
}());
exports.GetUserFeedResponse = GetUserFeedResponse;
var GetUsersKarmaResponse = /** @class */ (function () {
    function GetUsersKarmaResponse() {
    }
    return GetUsersKarmaResponse;
}());
exports.GetUsersKarmaResponse = GetUsersKarmaResponse;
var GetUserInfoResponse = /** @class */ (function () {
    function GetUserInfoResponse() {
    }
    return GetUserInfoResponse;
}());
exports.GetUserInfoResponse = GetUserInfoResponse;
var SyncDiscourseSiteResponse = /** @class */ (function () {
    function SyncDiscourseSiteResponse() {
    }
    return SyncDiscourseSiteResponse;
}());
exports.SyncDiscourseSiteResponse = SyncDiscourseSiteResponse;
var LogoUrlApprovalResponse = /** @class */ (function () {
    function LogoUrlApprovalResponse() {
    }
    return LogoUrlApprovalResponse;
}());
exports.LogoUrlApprovalResponse = LogoUrlApprovalResponse;
var LockStackResponse = /** @class */ (function () {
    function LockStackResponse() {
    }
    return LockStackResponse;
}());
exports.LockStackResponse = LockStackResponse;
// @DataContract
var AuthenticateResponse = /** @class */ (function () {
    function AuthenticateResponse() {
    }
    return AuthenticateResponse;
}());
exports.AuthenticateResponse = AuthenticateResponse;
// @DataContract
var AssignRolesResponse = /** @class */ (function () {
    function AssignRolesResponse() {
    }
    return AssignRolesResponse;
}());
exports.AssignRolesResponse = AssignRolesResponse;
// @DataContract
var UnAssignRolesResponse = /** @class */ (function () {
    function UnAssignRolesResponse() {
    }
    return UnAssignRolesResponse;
}());
exports.UnAssignRolesResponse = UnAssignRolesResponse;
// @DataContract
var ConvertSessionToTokenResponse = /** @class */ (function () {
    function ConvertSessionToTokenResponse() {
    }
    return ConvertSessionToTokenResponse;
}());
exports.ConvertSessionToTokenResponse = ConvertSessionToTokenResponse;
// @DataContract
var GetAccessTokenResponse = /** @class */ (function () {
    function GetAccessTokenResponse() {
    }
    return GetAccessTokenResponse;
}());
exports.GetAccessTokenResponse = GetAccessTokenResponse;
// @Route("/ping")
var Ping = /** @class */ (function () {
    function Ping() {
    }
    return Ping;
}());
exports.Ping = Ping;
// @Route("/orgs/{Id}", "GET")
var GetOrganization = /** @class */ (function () {
    function GetOrganization() {
    }
    GetOrganization.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganization.prototype.getTypeName = function () { return "GetOrganization"; };
    return GetOrganization;
}());
exports.GetOrganization = GetOrganization;
// @Route("/organizations/{Slug}", "GET")
var GetOrganizationBySlug = /** @class */ (function () {
    function GetOrganizationBySlug() {
    }
    GetOrganizationBySlug.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganizationBySlug.prototype.getTypeName = function () { return "GetOrganizationBySlug"; };
    return GetOrganizationBySlug;
}());
exports.GetOrganizationBySlug = GetOrganizationBySlug;
// @Route("/orgs/{Id}/members", "GET")
var GetOrganizationMembers = /** @class */ (function () {
    function GetOrganizationMembers() {
    }
    GetOrganizationMembers.prototype.createResponse = function () { return new GetOrganizationMembersResponse(); };
    GetOrganizationMembers.prototype.getTypeName = function () { return "GetOrganizationMembers"; };
    return GetOrganizationMembers;
}());
exports.GetOrganizationMembers = GetOrganizationMembers;
// @Route("/orgs/{Id}/admin", "GET")
var GetOrganizationAdmin = /** @class */ (function () {
    function GetOrganizationAdmin() {
    }
    GetOrganizationAdmin.prototype.createResponse = function () { return new GetOrganizationAdminResponse(); };
    GetOrganizationAdmin.prototype.getTypeName = function () { return "GetOrganizationAdmin"; };
    return GetOrganizationAdmin;
}());
exports.GetOrganizationAdmin = GetOrganizationAdmin;
// @Route("/orgs/posts/new", "POST")
var CreateOrganizationForTechnology = /** @class */ (function () {
    function CreateOrganizationForTechnology() {
    }
    CreateOrganizationForTechnology.prototype.createResponse = function () { return new CreateOrganizationForTechnologyResponse(); };
    CreateOrganizationForTechnology.prototype.getTypeName = function () { return "CreateOrganizationForTechnology"; };
    return CreateOrganizationForTechnology;
}());
exports.CreateOrganizationForTechnology = CreateOrganizationForTechnology;
// @Route("/orgs", "POST")
var CreateOrganization = /** @class */ (function () {
    function CreateOrganization() {
    }
    CreateOrganization.prototype.createResponse = function () { return new CreateOrganizationResponse(); };
    CreateOrganization.prototype.getTypeName = function () { return "CreateOrganization"; };
    return CreateOrganization;
}());
exports.CreateOrganization = CreateOrganization;
// @Route("/orgs/{Id}", "PUT")
var UpdateOrganization = /** @class */ (function () {
    function UpdateOrganization() {
    }
    UpdateOrganization.prototype.createResponse = function () { return new UpdateOrganizationResponse(); };
    UpdateOrganization.prototype.getTypeName = function () { return "UpdateOrganization"; };
    return UpdateOrganization;
}());
exports.UpdateOrganization = UpdateOrganization;
// @Route("/orgs/{Id}", "DELETE")
var DeleteOrganization = /** @class */ (function () {
    function DeleteOrganization() {
    }
    DeleteOrganization.prototype.createResponse = function () { };
    DeleteOrganization.prototype.getTypeName = function () { return "DeleteOrganization"; };
    return DeleteOrganization;
}());
exports.DeleteOrganization = DeleteOrganization;
// @Route("/orgs/{Id}/lock", "PUT")
var LockOrganization = /** @class */ (function () {
    function LockOrganization() {
    }
    LockOrganization.prototype.createResponse = function () { };
    LockOrganization.prototype.getTypeName = function () { return "LockOrganization"; };
    return LockOrganization;
}());
exports.LockOrganization = LockOrganization;
// @Route("/orgs/{OrganizationId}/categories", "POST")
var AddOrganizationCategory = /** @class */ (function () {
    function AddOrganizationCategory() {
    }
    AddOrganizationCategory.prototype.createResponse = function () { return new AddCategoryResponse(); };
    AddOrganizationCategory.prototype.getTypeName = function () { return "AddOrganizationCategory"; };
    return AddOrganizationCategory;
}());
exports.AddOrganizationCategory = AddOrganizationCategory;
// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
var UpdateOrganizationCategory = /** @class */ (function () {
    function UpdateOrganizationCategory() {
    }
    UpdateOrganizationCategory.prototype.createResponse = function () { return new UpdateCategoryResponse(); };
    UpdateOrganizationCategory.prototype.getTypeName = function () { return "UpdateOrganizationCategory"; };
    return UpdateOrganizationCategory;
}());
exports.UpdateOrganizationCategory = UpdateOrganizationCategory;
// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
var DeleteOrganizationCategory = /** @class */ (function () {
    function DeleteOrganizationCategory() {
    }
    DeleteOrganizationCategory.prototype.createResponse = function () { };
    DeleteOrganizationCategory.prototype.getTypeName = function () { return "DeleteOrganizationCategory"; };
    return DeleteOrganizationCategory;
}());
exports.DeleteOrganizationCategory = DeleteOrganizationCategory;
// @Route("/orgs/{OrganizationId}/members", "POST")
var AddOrganizationMember = /** @class */ (function () {
    function AddOrganizationMember() {
    }
    AddOrganizationMember.prototype.createResponse = function () { return new AddOrganizationMemberResponse(); };
    AddOrganizationMember.prototype.getTypeName = function () { return "AddOrganizationMember"; };
    return AddOrganizationMember;
}());
exports.AddOrganizationMember = AddOrganizationMember;
// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
var UpdateOrganizationMember = /** @class */ (function () {
    function UpdateOrganizationMember() {
    }
    UpdateOrganizationMember.prototype.createResponse = function () { return new UpdateOrganizationMemberResponse(); };
    UpdateOrganizationMember.prototype.getTypeName = function () { return "UpdateOrganizationMember"; };
    return UpdateOrganizationMember;
}());
exports.UpdateOrganizationMember = UpdateOrganizationMember;
// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
var RemoveOrganizationMember = /** @class */ (function () {
    function RemoveOrganizationMember() {
    }
    RemoveOrganizationMember.prototype.createResponse = function () { };
    RemoveOrganizationMember.prototype.getTypeName = function () { return "RemoveOrganizationMember"; };
    return RemoveOrganizationMember;
}());
exports.RemoveOrganizationMember = RemoveOrganizationMember;
// @Route("/orgs/{OrganizationId}/members/set", "POST")
var SetOrganizationMembers = /** @class */ (function () {
    function SetOrganizationMembers() {
    }
    SetOrganizationMembers.prototype.createResponse = function () { return new SetOrganizationMembersResponse(); };
    SetOrganizationMembers.prototype.getTypeName = function () { return "SetOrganizationMembers"; };
    return SetOrganizationMembers;
}());
exports.SetOrganizationMembers = SetOrganizationMembers;
// @Route("/orgs/{OrganizationId}/invites", "GET")
var GetOrganizationMemberInvites = /** @class */ (function () {
    function GetOrganizationMemberInvites() {
    }
    GetOrganizationMemberInvites.prototype.createResponse = function () { return new GetOrganizationMemberInvitesResponse(); };
    GetOrganizationMemberInvites.prototype.getTypeName = function () { return "GetOrganizationMemberInvites"; };
    return GetOrganizationMemberInvites;
}());
exports.GetOrganizationMemberInvites = GetOrganizationMemberInvites;
// @Route("/orgs/{OrganizationId}/invites", "POST")
var RequestOrganizationMemberInvite = /** @class */ (function () {
    function RequestOrganizationMemberInvite() {
    }
    RequestOrganizationMemberInvite.prototype.createResponse = function () { return new RequestOrganizationMemberInviteResponse(); };
    RequestOrganizationMemberInvite.prototype.getTypeName = function () { return "RequestOrganizationMemberInvite"; };
    return RequestOrganizationMemberInvite;
}());
exports.RequestOrganizationMemberInvite = RequestOrganizationMemberInvite;
// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
var UpdateOrganizationMemberInvite = /** @class */ (function () {
    function UpdateOrganizationMemberInvite() {
    }
    UpdateOrganizationMemberInvite.prototype.createResponse = function () { return new UpdateOrganizationMemberInviteResponse(); };
    UpdateOrganizationMemberInvite.prototype.getTypeName = function () { return "UpdateOrganizationMemberInvite"; };
    return UpdateOrganizationMemberInvite;
}());
exports.UpdateOrganizationMemberInvite = UpdateOrganizationMemberInvite;
// @Route("/posts", "GET")
var QueryPosts = /** @class */ (function (_super) {
    __extends(QueryPosts, _super);
    function QueryPosts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryPosts.prototype.createResponse = function () { return new QueryResponse(); };
    QueryPosts.prototype.getTypeName = function () { return "QueryPosts"; };
    return QueryPosts;
}(QueryDb));
exports.QueryPosts = QueryPosts;
// @Route("/posts/{Id}", "GET")
var GetPost = /** @class */ (function () {
    function GetPost() {
    }
    GetPost.prototype.createResponse = function () { return new GetPostResponse(); };
    GetPost.prototype.getTypeName = function () { return "GetPost"; };
    return GetPost;
}());
exports.GetPost = GetPost;
// @Route("/posts", "POST")
var CreatePost = /** @class */ (function () {
    function CreatePost() {
    }
    CreatePost.prototype.createResponse = function () { return new CreatePostResponse(); };
    CreatePost.prototype.getTypeName = function () { return "CreatePost"; };
    return CreatePost;
}());
exports.CreatePost = CreatePost;
// @Route("/posts/{Id}", "PUT")
var UpdatePost = /** @class */ (function () {
    function UpdatePost() {
    }
    UpdatePost.prototype.createResponse = function () { return new UpdatePostResponse(); };
    UpdatePost.prototype.getTypeName = function () { return "UpdatePost"; };
    return UpdatePost;
}());
exports.UpdatePost = UpdatePost;
// @Route("/posts/{Id}", "DELETE")
var DeletePost = /** @class */ (function () {
    function DeletePost() {
    }
    DeletePost.prototype.createResponse = function () { return new DeletePostResponse(); };
    DeletePost.prototype.getTypeName = function () { return "DeletePost"; };
    return DeletePost;
}());
exports.DeletePost = DeletePost;
// @Route("/posts/{Id}/lock", "PUT")
var LockPost = /** @class */ (function () {
    function LockPost() {
    }
    LockPost.prototype.createResponse = function () { };
    LockPost.prototype.getTypeName = function () { return "LockPost"; };
    return LockPost;
}());
exports.LockPost = LockPost;
// @Route("/posts/{Id}/hide", "PUT")
var HidePost = /** @class */ (function () {
    function HidePost() {
    }
    HidePost.prototype.createResponse = function () { };
    HidePost.prototype.getTypeName = function () { return "HidePost"; };
    return HidePost;
}());
exports.HidePost = HidePost;
// @Route("/posts/{PostId}/report/{Id}", "POST")
var ActionPostReport = /** @class */ (function () {
    function ActionPostReport() {
    }
    ActionPostReport.prototype.createResponse = function () { };
    ActionPostReport.prototype.getTypeName = function () { return "ActionPostReport"; };
    return ActionPostReport;
}());
exports.ActionPostReport = ActionPostReport;
// @Route("/posts/{PostId}/comments", "POST")
var CreatePostComment = /** @class */ (function () {
    function CreatePostComment() {
    }
    CreatePostComment.prototype.createResponse = function () { return new CreatePostCommentResponse(); };
    CreatePostComment.prototype.getTypeName = function () { return "CreatePostComment"; };
    return CreatePostComment;
}());
exports.CreatePostComment = CreatePostComment;
// @Route("/posts/{PostId}/comments/{Id}", "PUT")
var UpdatePostComment = /** @class */ (function () {
    function UpdatePostComment() {
    }
    UpdatePostComment.prototype.createResponse = function () { return new UpdatePostCommentResponse(); };
    UpdatePostComment.prototype.getTypeName = function () { return "UpdatePostComment"; };
    return UpdatePostComment;
}());
exports.UpdatePostComment = UpdatePostComment;
// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
var DeletePostComment = /** @class */ (function () {
    function DeletePostComment() {
    }
    DeletePostComment.prototype.createResponse = function () { return new DeletePostCommentResponse(); };
    DeletePostComment.prototype.getTypeName = function () { return "DeletePostComment"; };
    return DeletePostComment;
}());
exports.DeletePostComment = DeletePostComment;
// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
var ActionPostCommentReport = /** @class */ (function () {
    function ActionPostCommentReport() {
    }
    ActionPostCommentReport.prototype.createResponse = function () { };
    ActionPostCommentReport.prototype.getTypeName = function () { return "ActionPostCommentReport"; };
    return ActionPostCommentReport;
}());
exports.ActionPostCommentReport = ActionPostCommentReport;
// @Route("/user/comments/votes")
var GetUserPostCommentVotes = /** @class */ (function () {
    function GetUserPostCommentVotes() {
    }
    GetUserPostCommentVotes.prototype.createResponse = function () { return new GetUserPostCommentVotesResponse(); };
    GetUserPostCommentVotes.prototype.getTypeName = function () { return "GetUserPostCommentVotes"; };
    return GetUserPostCommentVotes;
}());
exports.GetUserPostCommentVotes = GetUserPostCommentVotes;
// @Route("/posts/{PostId}/comments/{Id}/pin", "UPDATE")
var PinPostComment = /** @class */ (function () {
    function PinPostComment() {
    }
    PinPostComment.prototype.createResponse = function () { return new PinPostCommentResponse(); };
    PinPostComment.prototype.getTypeName = function () { return "PinPostComment"; };
    return PinPostComment;
}());
exports.PinPostComment = PinPostComment;
// @Route("/users/by-email")
var GetUsersByEmails = /** @class */ (function () {
    function GetUsersByEmails() {
    }
    GetUsersByEmails.prototype.createResponse = function () { return new GetUsersByEmailsResponse(); };
    GetUsersByEmails.prototype.getTypeName = function () { return "GetUsersByEmails"; };
    return GetUsersByEmails;
}());
exports.GetUsersByEmails = GetUsersByEmails;
// @Route("/user/posts/activity")
var GetUserPostActivity = /** @class */ (function () {
    function GetUserPostActivity() {
    }
    GetUserPostActivity.prototype.createResponse = function () { return new GetUserPostActivityResponse(); };
    GetUserPostActivity.prototype.getTypeName = function () { return "GetUserPostActivity"; };
    return GetUserPostActivity;
}());
exports.GetUserPostActivity = GetUserPostActivity;
// @Route("/user/organizations")
var GetUserOrganizations = /** @class */ (function () {
    function GetUserOrganizations() {
    }
    GetUserOrganizations.prototype.createResponse = function () { return new GetUserOrganizationsResponse(); };
    GetUserOrganizations.prototype.getTypeName = function () { return "GetUserOrganizations"; };
    return GetUserOrganizations;
}());
exports.GetUserOrganizations = GetUserOrganizations;
// @Route("/posts/{Id}/vote", "PUT")
var UserPostVote = /** @class */ (function () {
    function UserPostVote() {
    }
    UserPostVote.prototype.createResponse = function () { return new UserPostVoteResponse(); };
    UserPostVote.prototype.getTypeName = function () { return "UserPostVote"; };
    return UserPostVote;
}());
exports.UserPostVote = UserPostVote;
// @Route("/posts/{Id}/favorite", "PUT")
var UserPostFavorite = /** @class */ (function () {
    function UserPostFavorite() {
    }
    UserPostFavorite.prototype.createResponse = function () { return new UserPostFavoriteResponse(); };
    UserPostFavorite.prototype.getTypeName = function () { return "UserPostFavorite"; };
    return UserPostFavorite;
}());
exports.UserPostFavorite = UserPostFavorite;
// @Route("/posts/{Id}/report", "PUT")
var UserPostReport = /** @class */ (function () {
    function UserPostReport() {
    }
    UserPostReport.prototype.createResponse = function () { return new UserPostReportResponse(); };
    UserPostReport.prototype.getTypeName = function () { return "UserPostReport"; };
    return UserPostReport;
}());
exports.UserPostReport = UserPostReport;
// @Route("/posts/{PostId}/comments/{Id}", "GET")
var UserPostCommentVote = /** @class */ (function () {
    function UserPostCommentVote() {
    }
    UserPostCommentVote.prototype.createResponse = function () { return new UserPostCommentVoteResponse(); };
    UserPostCommentVote.prototype.getTypeName = function () { return "UserPostCommentVote"; };
    return UserPostCommentVote;
}());
exports.UserPostCommentVote = UserPostCommentVote;
// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
var UserPostCommentReport = /** @class */ (function () {
    function UserPostCommentReport() {
    }
    UserPostCommentReport.prototype.createResponse = function () { return new UserPostCommentReportResponse(); };
    UserPostCommentReport.prototype.getTypeName = function () { return "UserPostCommentReport"; };
    return UserPostCommentReport;
}());
exports.UserPostCommentReport = UserPostCommentReport;
// @Route("/prerender/{Path*}", "PUT")
var StorePreRender = /** @class */ (function () {
    function StorePreRender() {
    }
    StorePreRender.prototype.createResponse = function () { };
    StorePreRender.prototype.getTypeName = function () { return "StorePreRender"; };
    return StorePreRender;
}());
exports.StorePreRender = StorePreRender;
// @Route("/prerender/{Path*}", "GET")
var GetPreRender = /** @class */ (function () {
    function GetPreRender() {
    }
    GetPreRender.prototype.createResponse = function () { return ""; };
    GetPreRender.prototype.getTypeName = function () { return "GetPreRender"; };
    return GetPreRender;
}());
exports.GetPreRender = GetPreRender;
// @Route("/my-session")
var SessionInfo = /** @class */ (function () {
    function SessionInfo() {
    }
    SessionInfo.prototype.createResponse = function () { return new SessionInfoResponse(); };
    SessionInfo.prototype.getTypeName = function () { return "SessionInfo"; };
    return SessionInfo;
}());
exports.SessionInfo = SessionInfo;
// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
var SubscribeToOrganization = /** @class */ (function () {
    function SubscribeToOrganization() {
    }
    SubscribeToOrganization.prototype.createResponse = function () { };
    SubscribeToOrganization.prototype.getTypeName = function () { return "SubscribeToOrganization"; };
    return SubscribeToOrganization;
}());
exports.SubscribeToOrganization = SubscribeToOrganization;
// @Route("/posts/{PostId}/subscribe", "PUT")
var SubscribeToPost = /** @class */ (function () {
    function SubscribeToPost() {
    }
    SubscribeToPost.prototype.createResponse = function () { };
    SubscribeToPost.prototype.getTypeName = function () { return "SubscribeToPost"; };
    return SubscribeToPost;
}());
exports.SubscribeToPost = SubscribeToPost;
// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
var DeleteOrganizationSubscription = /** @class */ (function () {
    function DeleteOrganizationSubscription() {
    }
    DeleteOrganizationSubscription.prototype.createResponse = function () { };
    DeleteOrganizationSubscription.prototype.getTypeName = function () { return "DeleteOrganizationSubscription"; };
    return DeleteOrganizationSubscription;
}());
exports.DeleteOrganizationSubscription = DeleteOrganizationSubscription;
// @Route("/posts/{PostId}/subscribe", "DELETE")
var DeletePostSubscription = /** @class */ (function () {
    function DeletePostSubscription() {
    }
    DeletePostSubscription.prototype.createResponse = function () { };
    DeletePostSubscription.prototype.getTypeName = function () { return "DeletePostSubscription"; };
    return DeletePostSubscription;
}());
exports.DeletePostSubscription = DeletePostSubscription;
// @Route("/technology/{Slug}/previous-versions", "GET")
var GetTechnologyPreviousVersions = /** @class */ (function () {
    function GetTechnologyPreviousVersions() {
    }
    GetTechnologyPreviousVersions.prototype.createResponse = function () { return new GetTechnologyPreviousVersionsResponse(); };
    GetTechnologyPreviousVersions.prototype.getTypeName = function () { return "GetTechnologyPreviousVersions"; };
    return GetTechnologyPreviousVersions;
}());
exports.GetTechnologyPreviousVersions = GetTechnologyPreviousVersions;
// @Route("/technology", "GET")
var GetAllTechnologies = /** @class */ (function () {
    function GetAllTechnologies() {
    }
    GetAllTechnologies.prototype.createResponse = function () { return new GetAllTechnologiesResponse(); };
    GetAllTechnologies.prototype.getTypeName = function () { return "GetAllTechnologies"; };
    return GetAllTechnologies;
}());
exports.GetAllTechnologies = GetAllTechnologies;
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
exports.FindTechnologies = FindTechnologies;
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
exports.QueryTechnology = QueryTechnology;
// @Route("/technology/{Slug}")
var GetTechnology = /** @class */ (function () {
    function GetTechnology() {
    }
    GetTechnology.prototype.createResponse = function () { return new GetTechnologyResponse(); };
    GetTechnology.prototype.getTypeName = function () { return "GetTechnology"; };
    return GetTechnology;
}());
exports.GetTechnology = GetTechnology;
// @Route("/technology/{Slug}/favorites")
var GetTechnologyFavoriteDetails = /** @class */ (function () {
    function GetTechnologyFavoriteDetails() {
    }
    GetTechnologyFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyFavoriteDetailsResponse(); };
    GetTechnologyFavoriteDetails.prototype.getTypeName = function () { return "GetTechnologyFavoriteDetails"; };
    return GetTechnologyFavoriteDetails;
}());
exports.GetTechnologyFavoriteDetails = GetTechnologyFavoriteDetails;
// @Route("/technology", "POST")
var CreateTechnology = /** @class */ (function () {
    function CreateTechnology() {
    }
    CreateTechnology.prototype.createResponse = function () { return new CreateTechnologyResponse(); };
    CreateTechnology.prototype.getTypeName = function () { return "CreateTechnology"; };
    return CreateTechnology;
}());
exports.CreateTechnology = CreateTechnology;
// @Route("/technology/{Id}", "PUT")
var UpdateTechnology = /** @class */ (function () {
    function UpdateTechnology() {
    }
    UpdateTechnology.prototype.createResponse = function () { return new UpdateTechnologyResponse(); };
    UpdateTechnology.prototype.getTypeName = function () { return "UpdateTechnology"; };
    return UpdateTechnology;
}());
exports.UpdateTechnology = UpdateTechnology;
// @Route("/technology/{Id}", "DELETE")
var DeleteTechnology = /** @class */ (function () {
    function DeleteTechnology() {
    }
    DeleteTechnology.prototype.createResponse = function () { return new DeleteTechnologyResponse(); };
    DeleteTechnology.prototype.getTypeName = function () { return "DeleteTechnology"; };
    return DeleteTechnology;
}());
exports.DeleteTechnology = DeleteTechnology;
// @Route("/techstacks/{Slug}/previous-versions", "GET")
var GetTechnologyStackPreviousVersions = /** @class */ (function () {
    function GetTechnologyStackPreviousVersions() {
    }
    GetTechnologyStackPreviousVersions.prototype.createResponse = function () { return new GetTechnologyStackPreviousVersionsResponse(); };
    GetTechnologyStackPreviousVersions.prototype.getTypeName = function () { return "GetTechnologyStackPreviousVersions"; };
    return GetTechnologyStackPreviousVersions;
}());
exports.GetTechnologyStackPreviousVersions = GetTechnologyStackPreviousVersions;
// @Route("/pagestats/{Type}/{Slug}")
var GetPageStats = /** @class */ (function () {
    function GetPageStats() {
    }
    GetPageStats.prototype.createResponse = function () { return new GetPageStatsResponse(); };
    GetPageStats.prototype.getTypeName = function () { return "GetPageStats"; };
    return GetPageStats;
}());
exports.GetPageStats = GetPageStats;
// @Route("/cache/clear")
var ClearCache = /** @class */ (function () {
    function ClearCache() {
    }
    ClearCache.prototype.createResponse = function () { return ""; };
    ClearCache.prototype.getTypeName = function () { return "ClearCache"; };
    return ClearCache;
}());
exports.ClearCache = ClearCache;
// @Route("/tasks/hourly")
var HourlyTask = /** @class */ (function () {
    function HourlyTask() {
    }
    HourlyTask.prototype.createResponse = function () { return new HourlyTaskResponse(); };
    HourlyTask.prototype.getTypeName = function () { return "HourlyTask"; };
    return HourlyTask;
}());
exports.HourlyTask = HourlyTask;
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
exports.FindTechStacks = FindTechStacks;
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
exports.QueryTechStacks = QueryTechStacks;
// @Route("/overview")
var Overview = /** @class */ (function () {
    function Overview() {
    }
    Overview.prototype.createResponse = function () { return new OverviewResponse(); };
    Overview.prototype.getTypeName = function () { return "Overview"; };
    return Overview;
}());
exports.Overview = Overview;
// @Route("/app-overview")
var AppOverview = /** @class */ (function () {
    function AppOverview() {
    }
    AppOverview.prototype.createResponse = function () { return new AppOverviewResponse(); };
    AppOverview.prototype.getTypeName = function () { return "AppOverview"; };
    return AppOverview;
}());
exports.AppOverview = AppOverview;
// @Route("/techstacks", "GET")
var GetAllTechnologyStacks = /** @class */ (function () {
    function GetAllTechnologyStacks() {
    }
    GetAllTechnologyStacks.prototype.createResponse = function () { return new GetAllTechnologyStacksResponse(); };
    GetAllTechnologyStacks.prototype.getTypeName = function () { return "GetAllTechnologyStacks"; };
    return GetAllTechnologyStacks;
}());
exports.GetAllTechnologyStacks = GetAllTechnologyStacks;
// @Route("/techstacks/{Slug}", "GET")
var GetTechnologyStack = /** @class */ (function () {
    function GetTechnologyStack() {
    }
    GetTechnologyStack.prototype.createResponse = function () { return new GetTechnologyStackResponse(); };
    GetTechnologyStack.prototype.getTypeName = function () { return "GetTechnologyStack"; };
    return GetTechnologyStack;
}());
exports.GetTechnologyStack = GetTechnologyStack;
// @Route("/techstacks/{Slug}/favorites")
var GetTechnologyStackFavoriteDetails = /** @class */ (function () {
    function GetTechnologyStackFavoriteDetails() {
    }
    GetTechnologyStackFavoriteDetails.prototype.createResponse = function () { return new GetTechnologyStackFavoriteDetailsResponse(); };
    GetTechnologyStackFavoriteDetails.prototype.getTypeName = function () { return "GetTechnologyStackFavoriteDetails"; };
    return GetTechnologyStackFavoriteDetails;
}());
exports.GetTechnologyStackFavoriteDetails = GetTechnologyStackFavoriteDetails;
// @Route("/config")
var GetConfig = /** @class */ (function () {
    function GetConfig() {
    }
    GetConfig.prototype.createResponse = function () { return new GetConfigResponse(); };
    GetConfig.prototype.getTypeName = function () { return "GetConfig"; };
    return GetConfig;
}());
exports.GetConfig = GetConfig;
// @Route("/techstacks", "POST")
var CreateTechnologyStack = /** @class */ (function () {
    function CreateTechnologyStack() {
    }
    CreateTechnologyStack.prototype.createResponse = function () { return new CreateTechnologyStackResponse(); };
    CreateTechnologyStack.prototype.getTypeName = function () { return "CreateTechnologyStack"; };
    return CreateTechnologyStack;
}());
exports.CreateTechnologyStack = CreateTechnologyStack;
// @Route("/techstacks/{Id}", "PUT")
var UpdateTechnologyStack = /** @class */ (function () {
    function UpdateTechnologyStack() {
    }
    UpdateTechnologyStack.prototype.createResponse = function () { return new UpdateTechnologyStackResponse(); };
    UpdateTechnologyStack.prototype.getTypeName = function () { return "UpdateTechnologyStack"; };
    return UpdateTechnologyStack;
}());
exports.UpdateTechnologyStack = UpdateTechnologyStack;
// @Route("/techstacks/{Id}", "DELETE")
var DeleteTechnologyStack = /** @class */ (function () {
    function DeleteTechnologyStack() {
    }
    DeleteTechnologyStack.prototype.createResponse = function () { return new DeleteTechnologyStackResponse(); };
    DeleteTechnologyStack.prototype.getTypeName = function () { return "DeleteTechnologyStack"; };
    return DeleteTechnologyStack;
}());
exports.DeleteTechnologyStack = DeleteTechnologyStack;
// @Route("/favorites/techtacks", "GET")
var GetFavoriteTechStack = /** @class */ (function () {
    function GetFavoriteTechStack() {
    }
    GetFavoriteTechStack.prototype.createResponse = function () { return new GetFavoriteTechStackResponse(); };
    GetFavoriteTechStack.prototype.getTypeName = function () { return "GetFavoriteTechStack"; };
    return GetFavoriteTechStack;
}());
exports.GetFavoriteTechStack = GetFavoriteTechStack;
// @Route("/favorites/techtacks/{TechnologyStackId}", "PUT")
var AddFavoriteTechStack = /** @class */ (function () {
    function AddFavoriteTechStack() {
    }
    AddFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    AddFavoriteTechStack.prototype.getTypeName = function () { return "AddFavoriteTechStack"; };
    return AddFavoriteTechStack;
}());
exports.AddFavoriteTechStack = AddFavoriteTechStack;
// @Route("/favorites/techtacks/{TechnologyStackId}", "DELETE")
var RemoveFavoriteTechStack = /** @class */ (function () {
    function RemoveFavoriteTechStack() {
    }
    RemoveFavoriteTechStack.prototype.createResponse = function () { return new FavoriteTechStackResponse(); };
    RemoveFavoriteTechStack.prototype.getTypeName = function () { return "RemoveFavoriteTechStack"; };
    return RemoveFavoriteTechStack;
}());
exports.RemoveFavoriteTechStack = RemoveFavoriteTechStack;
// @Route("/favorites/technology", "GET")
var GetFavoriteTechnologies = /** @class */ (function () {
    function GetFavoriteTechnologies() {
    }
    GetFavoriteTechnologies.prototype.createResponse = function () { return new GetFavoriteTechnologiesResponse(); };
    GetFavoriteTechnologies.prototype.getTypeName = function () { return "GetFavoriteTechnologies"; };
    return GetFavoriteTechnologies;
}());
exports.GetFavoriteTechnologies = GetFavoriteTechnologies;
// @Route("/favorites/technology/{TechnologyId}", "PUT")
var AddFavoriteTechnology = /** @class */ (function () {
    function AddFavoriteTechnology() {
    }
    AddFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    AddFavoriteTechnology.prototype.getTypeName = function () { return "AddFavoriteTechnology"; };
    return AddFavoriteTechnology;
}());
exports.AddFavoriteTechnology = AddFavoriteTechnology;
// @Route("/favorites/technology/{TechnologyId}", "DELETE")
var RemoveFavoriteTechnology = /** @class */ (function () {
    function RemoveFavoriteTechnology() {
    }
    RemoveFavoriteTechnology.prototype.createResponse = function () { return new FavoriteTechnologyResponse(); };
    RemoveFavoriteTechnology.prototype.getTypeName = function () { return "RemoveFavoriteTechnology"; };
    return RemoveFavoriteTechnology;
}());
exports.RemoveFavoriteTechnology = RemoveFavoriteTechnology;
// @Route("/my-feed")
var GetUserFeed = /** @class */ (function () {
    function GetUserFeed() {
    }
    GetUserFeed.prototype.createResponse = function () { return new GetUserFeedResponse(); };
    GetUserFeed.prototype.getTypeName = function () { return "GetUserFeed"; };
    return GetUserFeed;
}());
exports.GetUserFeed = GetUserFeed;
// @Route("/users/karma", "GET")
var GetUsersKarma = /** @class */ (function () {
    function GetUsersKarma() {
    }
    GetUsersKarma.prototype.createResponse = function () { return new GetUsersKarmaResponse(); };
    GetUsersKarma.prototype.getTypeName = function () { return "GetUsersKarma"; };
    return GetUsersKarma;
}());
exports.GetUsersKarma = GetUsersKarma;
// @Route("/userinfo/{UserName}")
var GetUserInfo = /** @class */ (function () {
    function GetUserInfo() {
    }
    GetUserInfo.prototype.createResponse = function () { return new GetUserInfoResponse(); };
    GetUserInfo.prototype.getTypeName = function () { return "GetUserInfo"; };
    return GetUserInfo;
}());
exports.GetUserInfo = GetUserInfo;
// @Route("/users/{UserName}/avatar", "GET")
var UserAvatar = /** @class */ (function () {
    function UserAvatar() {
    }
    return UserAvatar;
}());
exports.UserAvatar = UserAvatar;
// @Route("/sync/discourse/{Site}")
var SyncDiscourseSite = /** @class */ (function () {
    function SyncDiscourseSite() {
    }
    SyncDiscourseSite.prototype.createResponse = function () { return new SyncDiscourseSiteResponse(); };
    SyncDiscourseSite.prototype.getTypeName = function () { return "SyncDiscourseSite"; };
    return SyncDiscourseSite;
}());
exports.SyncDiscourseSite = SyncDiscourseSite;
// @Route("/admin/technology/{TechnologyId}/logo")
var LogoUrlApproval = /** @class */ (function () {
    function LogoUrlApproval() {
    }
    LogoUrlApproval.prototype.createResponse = function () { return new LogoUrlApprovalResponse(); };
    LogoUrlApproval.prototype.getTypeName = function () { return "LogoUrlApproval"; };
    return LogoUrlApproval;
}());
exports.LogoUrlApproval = LogoUrlApproval;
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
var LockTechStack = /** @class */ (function () {
    function LockTechStack() {
    }
    LockTechStack.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTechStack.prototype.getTypeName = function () { return "LockTechStack"; };
    return LockTechStack;
}());
exports.LockTechStack = LockTechStack;
// @Route("/admin/technology/{TechnologyId}/lock")
var LockTech = /** @class */ (function () {
    function LockTech() {
    }
    LockTech.prototype.createResponse = function () { return new LockStackResponse(); };
    LockTech.prototype.getTypeName = function () { return "LockTech"; };
    return LockTech;
}());
exports.LockTech = LockTech;
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
exports.Authenticate = Authenticate;
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles() {
    }
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    AssignRoles.prototype.getTypeName = function () { return "AssignRoles"; };
    return AssignRoles;
}());
exports.AssignRoles = AssignRoles;
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles() {
    }
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    UnAssignRoles.prototype.getTypeName = function () { return "UnAssignRoles"; };
    return UnAssignRoles;
}());
exports.UnAssignRoles = UnAssignRoles;
// @Route("/session-to-token")
// @DataContract
var ConvertSessionToToken = /** @class */ (function () {
    function ConvertSessionToToken() {
    }
    ConvertSessionToToken.prototype.createResponse = function () { return new ConvertSessionToTokenResponse(); };
    ConvertSessionToToken.prototype.getTypeName = function () { return "ConvertSessionToToken"; };
    return ConvertSessionToToken;
}());
exports.ConvertSessionToToken = ConvertSessionToToken;
// @Route("/access-token")
// @DataContract
var GetAccessToken = /** @class */ (function () {
    function GetAccessToken() {
    }
    GetAccessToken.prototype.createResponse = function () { return new GetAccessTokenResponse(); };
    GetAccessToken.prototype.getTypeName = function () { return "GetAccessToken"; };
    return GetAccessToken;
}());
exports.GetAccessToken = GetAccessToken;
// @Route("/posts/comment", "GET")
var QueryPostComments = /** @class */ (function (_super) {
    __extends(QueryPostComments, _super);
    function QueryPostComments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryPostComments.prototype.createResponse = function () { return new QueryResponse(); };
    QueryPostComments.prototype.getTypeName = function () { return "QueryPostComments"; };
    return QueryPostComments;
}(QueryDb));
exports.QueryPostComments = QueryPostComments;
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
exports.FindTechnologiesAdmin = FindTechnologiesAdmin;
