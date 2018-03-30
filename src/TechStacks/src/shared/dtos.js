/* Options:
Date: 2018-03-30 01:51:40
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
var Organization = /** @class */ (function () {
    function Organization() {
    }
    return Organization;
}());
export { Organization };
var OrganizationLabel = /** @class */ (function () {
    function OrganizationLabel() {
    }
    return OrganizationLabel;
}());
export { OrganizationLabel };
var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());
export { Category };
var OrganizationMember = /** @class */ (function () {
    function OrganizationMember() {
    }
    return OrganizationMember;
}());
export { OrganizationMember };
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
var OrganizationMemberInvite = /** @class */ (function () {
    function OrganizationMemberInvite() {
    }
    return OrganizationMemberInvite;
}());
export { OrganizationMemberInvite };
var PostReport = /** @class */ (function () {
    function PostReport() {
    }
    return PostReport;
}());
export { PostReport };
var PostReportInfo = /** @class */ (function (_super) {
    __extends(PostReportInfo, _super);
    function PostReportInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostReportInfo;
}(PostReport));
export { PostReportInfo };
var PostCommentReport = /** @class */ (function () {
    function PostCommentReport() {
    }
    return PostCommentReport;
}());
export { PostCommentReport };
var PostCommentReportInfo = /** @class */ (function (_super) {
    __extends(PostCommentReportInfo, _super);
    function PostCommentReportInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostCommentReportInfo;
}(PostCommentReport));
export { PostCommentReportInfo };
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
var Post = /** @class */ (function () {
    function Post() {
    }
    return Post;
}());
export { Post };
var PostComment = /** @class */ (function () {
    function PostComment() {
    }
    return PostComment;
}());
export { PostComment };
var UserRef = /** @class */ (function () {
    function UserRef() {
    }
    return UserRef;
}());
export { UserRef };
var OrganizationSubscription = /** @class */ (function () {
    function OrganizationSubscription() {
    }
    return OrganizationSubscription;
}());
export { OrganizationSubscription };
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
var TechnologyBase = /** @class */ (function () {
    function TechnologyBase() {
    }
    return TechnologyBase;
}());
export { TechnologyBase };
var Technology = /** @class */ (function (_super) {
    __extends(Technology, _super);
    function Technology() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Technology;
}(TechnologyBase));
export { Technology };
var UserActivity = /** @class */ (function () {
    function UserActivity() {
    }
    return UserActivity;
}());
export { UserActivity };
var TechnologyHistory = /** @class */ (function (_super) {
    __extends(TechnologyHistory, _super);
    function TechnologyHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TechnologyHistory;
}(TechnologyBase));
export { TechnologyHistory };
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
var LabelInfo = /** @class */ (function () {
    function LabelInfo() {
    }
    return LabelInfo;
}());
export { LabelInfo };
var CategoryInfo = /** @class */ (function () {
    function CategoryInfo() {
    }
    return CategoryInfo;
}());
export { CategoryInfo };
var OrganizationInfo = /** @class */ (function () {
    function OrganizationInfo() {
    }
    return OrganizationInfo;
}());
export { OrganizationInfo };
// @DataContract
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
export { Option };
var UserVoiceUser = /** @class */ (function () {
    function UserVoiceUser() {
    }
    return UserVoiceUser;
}());
export { UserVoiceUser };
var UserVoiceComment = /** @class */ (function () {
    function UserVoiceComment() {
    }
    return UserVoiceComment;
}());
export { UserVoiceComment };
var GetOrganizationResponse = /** @class */ (function () {
    function GetOrganizationResponse() {
    }
    return GetOrganizationResponse;
}());
export { GetOrganizationResponse };
var GetOrganizationMembersResponse = /** @class */ (function () {
    function GetOrganizationMembersResponse() {
    }
    return GetOrganizationMembersResponse;
}());
export { GetOrganizationMembersResponse };
var GetOrganizationAdminResponse = /** @class */ (function () {
    function GetOrganizationAdminResponse() {
    }
    return GetOrganizationAdminResponse;
}());
export { GetOrganizationAdminResponse };
var CreateOrganizationForTechnologyResponse = /** @class */ (function () {
    function CreateOrganizationForTechnologyResponse() {
    }
    return CreateOrganizationForTechnologyResponse;
}());
export { CreateOrganizationForTechnologyResponse };
var CreateOrganizationResponse = /** @class */ (function () {
    function CreateOrganizationResponse() {
    }
    return CreateOrganizationResponse;
}());
export { CreateOrganizationResponse };
var UpdateOrganizationResponse = /** @class */ (function () {
    function UpdateOrganizationResponse() {
    }
    return UpdateOrganizationResponse;
}());
export { UpdateOrganizationResponse };
var OrganizationLabelResponse = /** @class */ (function () {
    function OrganizationLabelResponse() {
    }
    return OrganizationLabelResponse;
}());
export { OrganizationLabelResponse };
var AddCategoryResponse = /** @class */ (function () {
    function AddCategoryResponse() {
    }
    return AddCategoryResponse;
}());
export { AddCategoryResponse };
var UpdateCategoryResponse = /** @class */ (function () {
    function UpdateCategoryResponse() {
    }
    return UpdateCategoryResponse;
}());
export { UpdateCategoryResponse };
var AddOrganizationMemberResponse = /** @class */ (function () {
    function AddOrganizationMemberResponse() {
    }
    return AddOrganizationMemberResponse;
}());
export { AddOrganizationMemberResponse };
var UpdateOrganizationMemberResponse = /** @class */ (function () {
    function UpdateOrganizationMemberResponse() {
    }
    return UpdateOrganizationMemberResponse;
}());
export { UpdateOrganizationMemberResponse };
var SetOrganizationMembersResponse = /** @class */ (function () {
    function SetOrganizationMembersResponse() {
    }
    return SetOrganizationMembersResponse;
}());
export { SetOrganizationMembersResponse };
var GetOrganizationMemberInvitesResponse = /** @class */ (function () {
    function GetOrganizationMemberInvitesResponse() {
    }
    return GetOrganizationMemberInvitesResponse;
}());
export { GetOrganizationMemberInvitesResponse };
var RequestOrganizationMemberInviteResponse = /** @class */ (function () {
    function RequestOrganizationMemberInviteResponse() {
    }
    return RequestOrganizationMemberInviteResponse;
}());
export { RequestOrganizationMemberInviteResponse };
var UpdateOrganizationMemberInviteResponse = /** @class */ (function () {
    function UpdateOrganizationMemberInviteResponse() {
    }
    return UpdateOrganizationMemberInviteResponse;
}());
export { UpdateOrganizationMemberInviteResponse };
// @DataContract
var QueryResponse = /** @class */ (function () {
    function QueryResponse() {
    }
    return QueryResponse;
}());
export { QueryResponse };
var GetPostResponse = /** @class */ (function () {
    function GetPostResponse() {
    }
    return GetPostResponse;
}());
export { GetPostResponse };
var CreatePostResponse = /** @class */ (function () {
    function CreatePostResponse() {
    }
    return CreatePostResponse;
}());
export { CreatePostResponse };
var UpdatePostResponse = /** @class */ (function () {
    function UpdatePostResponse() {
    }
    return UpdatePostResponse;
}());
export { UpdatePostResponse };
var DeletePostResponse = /** @class */ (function () {
    function DeletePostResponse() {
    }
    return DeletePostResponse;
}());
export { DeletePostResponse };
var CreatePostCommentResponse = /** @class */ (function () {
    function CreatePostCommentResponse() {
    }
    return CreatePostCommentResponse;
}());
export { CreatePostCommentResponse };
var UpdatePostCommentResponse = /** @class */ (function () {
    function UpdatePostCommentResponse() {
    }
    return UpdatePostCommentResponse;
}());
export { UpdatePostCommentResponse };
var DeletePostCommentResponse = /** @class */ (function () {
    function DeletePostCommentResponse() {
    }
    return DeletePostCommentResponse;
}());
export { DeletePostCommentResponse };
var GetUserPostCommentVotesResponse = /** @class */ (function () {
    function GetUserPostCommentVotesResponse() {
    }
    return GetUserPostCommentVotesResponse;
}());
export { GetUserPostCommentVotesResponse };
var PinPostCommentResponse = /** @class */ (function () {
    function PinPostCommentResponse() {
    }
    return PinPostCommentResponse;
}());
export { PinPostCommentResponse };
var GetUsersByEmailsResponse = /** @class */ (function () {
    function GetUsersByEmailsResponse() {
    }
    return GetUsersByEmailsResponse;
}());
export { GetUsersByEmailsResponse };
var GetUserPostActivityResponse = /** @class */ (function () {
    function GetUserPostActivityResponse() {
    }
    return GetUserPostActivityResponse;
}());
export { GetUserPostActivityResponse };
var GetUserOrganizationsResponse = /** @class */ (function () {
    function GetUserOrganizationsResponse() {
    }
    return GetUserOrganizationsResponse;
}());
export { GetUserOrganizationsResponse };
var UserPostVoteResponse = /** @class */ (function () {
    function UserPostVoteResponse() {
    }
    return UserPostVoteResponse;
}());
export { UserPostVoteResponse };
var UserPostFavoriteResponse = /** @class */ (function () {
    function UserPostFavoriteResponse() {
    }
    return UserPostFavoriteResponse;
}());
export { UserPostFavoriteResponse };
var UserPostReportResponse = /** @class */ (function () {
    function UserPostReportResponse() {
    }
    return UserPostReportResponse;
}());
export { UserPostReportResponse };
var UserPostCommentVoteResponse = /** @class */ (function () {
    function UserPostCommentVoteResponse() {
    }
    return UserPostCommentVoteResponse;
}());
export { UserPostCommentVoteResponse };
var UserPostCommentReportResponse = /** @class */ (function () {
    function UserPostCommentReportResponse() {
    }
    return UserPostCommentReportResponse;
}());
export { UserPostCommentReportResponse };
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
var GetUsersKarmaResponse = /** @class */ (function () {
    function GetUsersKarmaResponse() {
    }
    return GetUsersKarmaResponse;
}());
export { GetUsersKarmaResponse };
var GetUserInfoResponse = /** @class */ (function () {
    function GetUserInfoResponse() {
    }
    return GetUserInfoResponse;
}());
export { GetUserInfoResponse };
var SyncDiscourseSiteResponse = /** @class */ (function () {
    function SyncDiscourseSiteResponse() {
    }
    return SyncDiscourseSiteResponse;
}());
export { SyncDiscourseSiteResponse };
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
var ImportUserResponse = /** @class */ (function () {
    function ImportUserResponse() {
    }
    return ImportUserResponse;
}());
export { ImportUserResponse };
var ImportUserVoiceSuggestionResponse = /** @class */ (function () {
    function ImportUserVoiceSuggestionResponse() {
    }
    return ImportUserVoiceSuggestionResponse;
}());
export { ImportUserVoiceSuggestionResponse };
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
// @Route("/orgs/{Id}", "GET")
var GetOrganization = /** @class */ (function () {
    function GetOrganization() {
    }
    GetOrganization.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganization.prototype.getTypeName = function () { return "GetOrganization"; };
    return GetOrganization;
}());
export { GetOrganization };
// @Route("/organizations/{Slug}", "GET")
var GetOrganizationBySlug = /** @class */ (function () {
    function GetOrganizationBySlug() {
    }
    GetOrganizationBySlug.prototype.createResponse = function () { return new GetOrganizationResponse(); };
    GetOrganizationBySlug.prototype.getTypeName = function () { return "GetOrganizationBySlug"; };
    return GetOrganizationBySlug;
}());
export { GetOrganizationBySlug };
// @Route("/orgs/{Id}/members", "GET")
var GetOrganizationMembers = /** @class */ (function () {
    function GetOrganizationMembers() {
    }
    GetOrganizationMembers.prototype.createResponse = function () { return new GetOrganizationMembersResponse(); };
    GetOrganizationMembers.prototype.getTypeName = function () { return "GetOrganizationMembers"; };
    return GetOrganizationMembers;
}());
export { GetOrganizationMembers };
// @Route("/orgs/{Id}/admin", "GET")
var GetOrganizationAdmin = /** @class */ (function () {
    function GetOrganizationAdmin() {
    }
    GetOrganizationAdmin.prototype.createResponse = function () { return new GetOrganizationAdminResponse(); };
    GetOrganizationAdmin.prototype.getTypeName = function () { return "GetOrganizationAdmin"; };
    return GetOrganizationAdmin;
}());
export { GetOrganizationAdmin };
// @Route("/orgs/posts/new", "POST")
var CreateOrganizationForTechnology = /** @class */ (function () {
    function CreateOrganizationForTechnology() {
    }
    CreateOrganizationForTechnology.prototype.createResponse = function () { return new CreateOrganizationForTechnologyResponse(); };
    CreateOrganizationForTechnology.prototype.getTypeName = function () { return "CreateOrganizationForTechnology"; };
    return CreateOrganizationForTechnology;
}());
export { CreateOrganizationForTechnology };
// @Route("/orgs", "POST")
var CreateOrganization = /** @class */ (function () {
    function CreateOrganization() {
    }
    CreateOrganization.prototype.createResponse = function () { return new CreateOrganizationResponse(); };
    CreateOrganization.prototype.getTypeName = function () { return "CreateOrganization"; };
    return CreateOrganization;
}());
export { CreateOrganization };
// @Route("/orgs/{Id}", "PUT")
var UpdateOrganization = /** @class */ (function () {
    function UpdateOrganization() {
    }
    UpdateOrganization.prototype.createResponse = function () { return new UpdateOrganizationResponse(); };
    UpdateOrganization.prototype.getTypeName = function () { return "UpdateOrganization"; };
    return UpdateOrganization;
}());
export { UpdateOrganization };
// @Route("/orgs/{Id}", "DELETE")
var DeleteOrganization = /** @class */ (function () {
    function DeleteOrganization() {
    }
    DeleteOrganization.prototype.createResponse = function () { };
    DeleteOrganization.prototype.getTypeName = function () { return "DeleteOrganization"; };
    return DeleteOrganization;
}());
export { DeleteOrganization };
// @Route("/orgs/{Id}/lock", "PUT")
var LockOrganization = /** @class */ (function () {
    function LockOrganization() {
    }
    LockOrganization.prototype.createResponse = function () { };
    LockOrganization.prototype.getTypeName = function () { return "LockOrganization"; };
    return LockOrganization;
}());
export { LockOrganization };
// @Route("/orgs/{OrganizationId}/labels", "POST")
var AddOrganizationLabel = /** @class */ (function () {
    function AddOrganizationLabel() {
    }
    AddOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    AddOrganizationLabel.prototype.getTypeName = function () { return "AddOrganizationLabel"; };
    return AddOrganizationLabel;
}());
export { AddOrganizationLabel };
// @Route("/orgs/{OrganizationId}/members/{Slug}", "PUT")
var UpdateOrganizationLabel = /** @class */ (function () {
    function UpdateOrganizationLabel() {
    }
    UpdateOrganizationLabel.prototype.createResponse = function () { return new OrganizationLabelResponse(); };
    UpdateOrganizationLabel.prototype.getTypeName = function () { return "UpdateOrganizationLabel"; };
    return UpdateOrganizationLabel;
}());
export { UpdateOrganizationLabel };
// @Route("/orgs/{OrganizationId}/labels/{Slug}", "DELETE")
var RemoveOrganizationLabel = /** @class */ (function () {
    function RemoveOrganizationLabel() {
    }
    RemoveOrganizationLabel.prototype.createResponse = function () { };
    RemoveOrganizationLabel.prototype.getTypeName = function () { return "RemoveOrganizationLabel"; };
    return RemoveOrganizationLabel;
}());
export { RemoveOrganizationLabel };
// @Route("/orgs/{OrganizationId}/categories", "POST")
var AddOrganizationCategory = /** @class */ (function () {
    function AddOrganizationCategory() {
    }
    AddOrganizationCategory.prototype.createResponse = function () { return new AddCategoryResponse(); };
    AddOrganizationCategory.prototype.getTypeName = function () { return "AddOrganizationCategory"; };
    return AddOrganizationCategory;
}());
export { AddOrganizationCategory };
// @Route("/orgs/{OrganizationId}/categories/{Id}", "PUT")
var UpdateOrganizationCategory = /** @class */ (function () {
    function UpdateOrganizationCategory() {
    }
    UpdateOrganizationCategory.prototype.createResponse = function () { return new UpdateCategoryResponse(); };
    UpdateOrganizationCategory.prototype.getTypeName = function () { return "UpdateOrganizationCategory"; };
    return UpdateOrganizationCategory;
}());
export { UpdateOrganizationCategory };
// @Route("/orgs/{OrganizationId}/categories/{Id}", "DELETE")
var DeleteOrganizationCategory = /** @class */ (function () {
    function DeleteOrganizationCategory() {
    }
    DeleteOrganizationCategory.prototype.createResponse = function () { };
    DeleteOrganizationCategory.prototype.getTypeName = function () { return "DeleteOrganizationCategory"; };
    return DeleteOrganizationCategory;
}());
export { DeleteOrganizationCategory };
// @Route("/orgs/{OrganizationId}/members", "POST")
var AddOrganizationMember = /** @class */ (function () {
    function AddOrganizationMember() {
    }
    AddOrganizationMember.prototype.createResponse = function () { return new AddOrganizationMemberResponse(); };
    AddOrganizationMember.prototype.getTypeName = function () { return "AddOrganizationMember"; };
    return AddOrganizationMember;
}());
export { AddOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/{Id}", "PUT")
var UpdateOrganizationMember = /** @class */ (function () {
    function UpdateOrganizationMember() {
    }
    UpdateOrganizationMember.prototype.createResponse = function () { return new UpdateOrganizationMemberResponse(); };
    UpdateOrganizationMember.prototype.getTypeName = function () { return "UpdateOrganizationMember"; };
    return UpdateOrganizationMember;
}());
export { UpdateOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/{UserId}", "DELETE")
var RemoveOrganizationMember = /** @class */ (function () {
    function RemoveOrganizationMember() {
    }
    RemoveOrganizationMember.prototype.createResponse = function () { };
    RemoveOrganizationMember.prototype.getTypeName = function () { return "RemoveOrganizationMember"; };
    return RemoveOrganizationMember;
}());
export { RemoveOrganizationMember };
// @Route("/orgs/{OrganizationId}/members/set", "POST")
var SetOrganizationMembers = /** @class */ (function () {
    function SetOrganizationMembers() {
    }
    SetOrganizationMembers.prototype.createResponse = function () { return new SetOrganizationMembersResponse(); };
    SetOrganizationMembers.prototype.getTypeName = function () { return "SetOrganizationMembers"; };
    return SetOrganizationMembers;
}());
export { SetOrganizationMembers };
// @Route("/orgs/{OrganizationId}/invites", "GET")
var GetOrganizationMemberInvites = /** @class */ (function () {
    function GetOrganizationMemberInvites() {
    }
    GetOrganizationMemberInvites.prototype.createResponse = function () { return new GetOrganizationMemberInvitesResponse(); };
    GetOrganizationMemberInvites.prototype.getTypeName = function () { return "GetOrganizationMemberInvites"; };
    return GetOrganizationMemberInvites;
}());
export { GetOrganizationMemberInvites };
// @Route("/orgs/{OrganizationId}/invites", "POST")
var RequestOrganizationMemberInvite = /** @class */ (function () {
    function RequestOrganizationMemberInvite() {
    }
    RequestOrganizationMemberInvite.prototype.createResponse = function () { return new RequestOrganizationMemberInviteResponse(); };
    RequestOrganizationMemberInvite.prototype.getTypeName = function () { return "RequestOrganizationMemberInvite"; };
    return RequestOrganizationMemberInvite;
}());
export { RequestOrganizationMemberInvite };
// @Route("/orgs/{OrganizationId}/invites/{UserId}", "PUT")
var UpdateOrganizationMemberInvite = /** @class */ (function () {
    function UpdateOrganizationMemberInvite() {
    }
    UpdateOrganizationMemberInvite.prototype.createResponse = function () { return new UpdateOrganizationMemberInviteResponse(); };
    UpdateOrganizationMemberInvite.prototype.getTypeName = function () { return "UpdateOrganizationMemberInvite"; };
    return UpdateOrganizationMemberInvite;
}());
export { UpdateOrganizationMemberInvite };
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
export { QueryPosts };
// @Route("/posts/{Id}", "GET")
var GetPost = /** @class */ (function () {
    function GetPost() {
    }
    GetPost.prototype.createResponse = function () { return new GetPostResponse(); };
    GetPost.prototype.getTypeName = function () { return "GetPost"; };
    return GetPost;
}());
export { GetPost };
// @Route("/posts", "POST")
var CreatePost = /** @class */ (function () {
    function CreatePost() {
    }
    CreatePost.prototype.createResponse = function () { return new CreatePostResponse(); };
    CreatePost.prototype.getTypeName = function () { return "CreatePost"; };
    return CreatePost;
}());
export { CreatePost };
// @Route("/posts/{Id}", "PUT")
var UpdatePost = /** @class */ (function () {
    function UpdatePost() {
    }
    UpdatePost.prototype.createResponse = function () { return new UpdatePostResponse(); };
    UpdatePost.prototype.getTypeName = function () { return "UpdatePost"; };
    return UpdatePost;
}());
export { UpdatePost };
// @Route("/posts/{Id}", "DELETE")
var DeletePost = /** @class */ (function () {
    function DeletePost() {
    }
    DeletePost.prototype.createResponse = function () { return new DeletePostResponse(); };
    DeletePost.prototype.getTypeName = function () { return "DeletePost"; };
    return DeletePost;
}());
export { DeletePost };
// @Route("/posts/{Id}/lock", "PUT")
var LockPost = /** @class */ (function () {
    function LockPost() {
    }
    LockPost.prototype.createResponse = function () { };
    LockPost.prototype.getTypeName = function () { return "LockPost"; };
    return LockPost;
}());
export { LockPost };
// @Route("/posts/{Id}/hide", "PUT")
var HidePost = /** @class */ (function () {
    function HidePost() {
    }
    HidePost.prototype.createResponse = function () { };
    HidePost.prototype.getTypeName = function () { return "HidePost"; };
    return HidePost;
}());
export { HidePost };
// @Route("/posts/{Id}/status/{Status}", "PUT")
var ChangeStatusPost = /** @class */ (function () {
    function ChangeStatusPost() {
    }
    ChangeStatusPost.prototype.createResponse = function () { };
    ChangeStatusPost.prototype.getTypeName = function () { return "ChangeStatusPost"; };
    return ChangeStatusPost;
}());
export { ChangeStatusPost };
// @Route("/posts/{PostId}/report/{Id}", "POST")
var ActionPostReport = /** @class */ (function () {
    function ActionPostReport() {
    }
    ActionPostReport.prototype.createResponse = function () { };
    ActionPostReport.prototype.getTypeName = function () { return "ActionPostReport"; };
    return ActionPostReport;
}());
export { ActionPostReport };
// @Route("/posts/{PostId}/comments", "POST")
var CreatePostComment = /** @class */ (function () {
    function CreatePostComment() {
    }
    CreatePostComment.prototype.createResponse = function () { return new CreatePostCommentResponse(); };
    CreatePostComment.prototype.getTypeName = function () { return "CreatePostComment"; };
    return CreatePostComment;
}());
export { CreatePostComment };
// @Route("/posts/{PostId}/comments/{Id}", "PUT")
var UpdatePostComment = /** @class */ (function () {
    function UpdatePostComment() {
    }
    UpdatePostComment.prototype.createResponse = function () { return new UpdatePostCommentResponse(); };
    UpdatePostComment.prototype.getTypeName = function () { return "UpdatePostComment"; };
    return UpdatePostComment;
}());
export { UpdatePostComment };
// @Route("/posts/{PostId}/comments/{Id}", "DELETE")
var DeletePostComment = /** @class */ (function () {
    function DeletePostComment() {
    }
    DeletePostComment.prototype.createResponse = function () { return new DeletePostCommentResponse(); };
    DeletePostComment.prototype.getTypeName = function () { return "DeletePostComment"; };
    return DeletePostComment;
}());
export { DeletePostComment };
// @Route("/posts/{PostId}/comments/{PostCommentId}/report/{Id}", "POST")
var ActionPostCommentReport = /** @class */ (function () {
    function ActionPostCommentReport() {
    }
    ActionPostCommentReport.prototype.createResponse = function () { };
    ActionPostCommentReport.prototype.getTypeName = function () { return "ActionPostCommentReport"; };
    return ActionPostCommentReport;
}());
export { ActionPostCommentReport };
// @Route("/user/comments/votes")
var GetUserPostCommentVotes = /** @class */ (function () {
    function GetUserPostCommentVotes() {
    }
    GetUserPostCommentVotes.prototype.createResponse = function () { return new GetUserPostCommentVotesResponse(); };
    GetUserPostCommentVotes.prototype.getTypeName = function () { return "GetUserPostCommentVotes"; };
    return GetUserPostCommentVotes;
}());
export { GetUserPostCommentVotes };
// @Route("/posts/{PostId}/comments/{Id}/pin", "UPDATE")
var PinPostComment = /** @class */ (function () {
    function PinPostComment() {
    }
    PinPostComment.prototype.createResponse = function () { return new PinPostCommentResponse(); };
    PinPostComment.prototype.getTypeName = function () { return "PinPostComment"; };
    return PinPostComment;
}());
export { PinPostComment };
// @Route("/users/by-email")
var GetUsersByEmails = /** @class */ (function () {
    function GetUsersByEmails() {
    }
    GetUsersByEmails.prototype.createResponse = function () { return new GetUsersByEmailsResponse(); };
    GetUsersByEmails.prototype.getTypeName = function () { return "GetUsersByEmails"; };
    return GetUsersByEmails;
}());
export { GetUsersByEmails };
// @Route("/user/posts/activity")
var GetUserPostActivity = /** @class */ (function () {
    function GetUserPostActivity() {
    }
    GetUserPostActivity.prototype.createResponse = function () { return new GetUserPostActivityResponse(); };
    GetUserPostActivity.prototype.getTypeName = function () { return "GetUserPostActivity"; };
    return GetUserPostActivity;
}());
export { GetUserPostActivity };
// @Route("/user/organizations")
var GetUserOrganizations = /** @class */ (function () {
    function GetUserOrganizations() {
    }
    GetUserOrganizations.prototype.createResponse = function () { return new GetUserOrganizationsResponse(); };
    GetUserOrganizations.prototype.getTypeName = function () { return "GetUserOrganizations"; };
    return GetUserOrganizations;
}());
export { GetUserOrganizations };
// @Route("/posts/{Id}/vote", "PUT")
var UserPostVote = /** @class */ (function () {
    function UserPostVote() {
    }
    UserPostVote.prototype.createResponse = function () { return new UserPostVoteResponse(); };
    UserPostVote.prototype.getTypeName = function () { return "UserPostVote"; };
    return UserPostVote;
}());
export { UserPostVote };
// @Route("/posts/{Id}/favorite", "PUT")
var UserPostFavorite = /** @class */ (function () {
    function UserPostFavorite() {
    }
    UserPostFavorite.prototype.createResponse = function () { return new UserPostFavoriteResponse(); };
    UserPostFavorite.prototype.getTypeName = function () { return "UserPostFavorite"; };
    return UserPostFavorite;
}());
export { UserPostFavorite };
// @Route("/posts/{Id}/report", "PUT")
var UserPostReport = /** @class */ (function () {
    function UserPostReport() {
    }
    UserPostReport.prototype.createResponse = function () { return new UserPostReportResponse(); };
    UserPostReport.prototype.getTypeName = function () { return "UserPostReport"; };
    return UserPostReport;
}());
export { UserPostReport };
// @Route("/posts/{PostId}/comments/{Id}", "GET")
var UserPostCommentVote = /** @class */ (function () {
    function UserPostCommentVote() {
    }
    UserPostCommentVote.prototype.createResponse = function () { return new UserPostCommentVoteResponse(); };
    UserPostCommentVote.prototype.getTypeName = function () { return "UserPostCommentVote"; };
    return UserPostCommentVote;
}());
export { UserPostCommentVote };
// @Route("/posts/{PostId}/comments/{Id}/report", "PUT")
var UserPostCommentReport = /** @class */ (function () {
    function UserPostCommentReport() {
    }
    UserPostCommentReport.prototype.createResponse = function () { return new UserPostCommentReportResponse(); };
    UserPostCommentReport.prototype.getTypeName = function () { return "UserPostCommentReport"; };
    return UserPostCommentReport;
}());
export { UserPostCommentReport };
// @Route("/prerender/{Path*}", "PUT")
var StorePreRender = /** @class */ (function () {
    function StorePreRender() {
    }
    StorePreRender.prototype.createResponse = function () { };
    StorePreRender.prototype.getTypeName = function () { return "StorePreRender"; };
    return StorePreRender;
}());
export { StorePreRender };
// @Route("/prerender/{Path*}", "GET")
var GetPreRender = /** @class */ (function () {
    function GetPreRender() {
    }
    GetPreRender.prototype.createResponse = function () { return ""; };
    GetPreRender.prototype.getTypeName = function () { return "GetPreRender"; };
    return GetPreRender;
}());
export { GetPreRender };
// @Route("/my-session")
var SessionInfo = /** @class */ (function () {
    function SessionInfo() {
    }
    SessionInfo.prototype.createResponse = function () { return new SessionInfoResponse(); };
    SessionInfo.prototype.getTypeName = function () { return "SessionInfo"; };
    return SessionInfo;
}());
export { SessionInfo };
// @Route("/orgs/{OrganizationId}/subscribe", "PUT")
var SubscribeToOrganization = /** @class */ (function () {
    function SubscribeToOrganization() {
    }
    SubscribeToOrganization.prototype.createResponse = function () { };
    SubscribeToOrganization.prototype.getTypeName = function () { return "SubscribeToOrganization"; };
    return SubscribeToOrganization;
}());
export { SubscribeToOrganization };
// @Route("/posts/{PostId}/subscribe", "PUT")
var SubscribeToPost = /** @class */ (function () {
    function SubscribeToPost() {
    }
    SubscribeToPost.prototype.createResponse = function () { };
    SubscribeToPost.prototype.getTypeName = function () { return "SubscribeToPost"; };
    return SubscribeToPost;
}());
export { SubscribeToPost };
// @Route("/orgs/{OrganizationId}/subscribe", "DELETE")
var DeleteOrganizationSubscription = /** @class */ (function () {
    function DeleteOrganizationSubscription() {
    }
    DeleteOrganizationSubscription.prototype.createResponse = function () { };
    DeleteOrganizationSubscription.prototype.getTypeName = function () { return "DeleteOrganizationSubscription"; };
    return DeleteOrganizationSubscription;
}());
export { DeleteOrganizationSubscription };
// @Route("/posts/{PostId}/subscribe", "DELETE")
var DeletePostSubscription = /** @class */ (function () {
    function DeletePostSubscription() {
    }
    DeletePostSubscription.prototype.createResponse = function () { };
    DeletePostSubscription.prototype.getTypeName = function () { return "DeletePostSubscription"; };
    return DeletePostSubscription;
}());
export { DeletePostSubscription };
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
// @Route("/cache/clear")
var ClearCache = /** @class */ (function () {
    function ClearCache() {
    }
    ClearCache.prototype.createResponse = function () { return ""; };
    ClearCache.prototype.getTypeName = function () { return "ClearCache"; };
    return ClearCache;
}());
export { ClearCache };
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
// @Route("/users/karma", "GET")
var GetUsersKarma = /** @class */ (function () {
    function GetUsersKarma() {
    }
    GetUsersKarma.prototype.createResponse = function () { return new GetUsersKarmaResponse(); };
    GetUsersKarma.prototype.getTypeName = function () { return "GetUsersKarma"; };
    return GetUsersKarma;
}());
export { GetUsersKarma };
// @Route("/userinfo/{UserName}")
var GetUserInfo = /** @class */ (function () {
    function GetUserInfo() {
    }
    GetUserInfo.prototype.createResponse = function () { return new GetUserInfoResponse(); };
    GetUserInfo.prototype.getTypeName = function () { return "GetUserInfo"; };
    return GetUserInfo;
}());
export { GetUserInfo };
// @Route("/users/{UserName}/avatar", "GET")
var UserAvatar = /** @class */ (function () {
    function UserAvatar() {
    }
    return UserAvatar;
}());
export { UserAvatar };
// @Route("/sync/discourse/{Site}")
var SyncDiscourseSite = /** @class */ (function () {
    function SyncDiscourseSite() {
    }
    SyncDiscourseSite.prototype.createResponse = function () { return new SyncDiscourseSiteResponse(); };
    SyncDiscourseSite.prototype.getTypeName = function () { return "SyncDiscourseSite"; };
    return SyncDiscourseSite;
}());
export { SyncDiscourseSite };
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
var ImportUser = /** @class */ (function () {
    function ImportUser() {
    }
    ImportUser.prototype.createResponse = function () { return new ImportUserResponse(); };
    ImportUser.prototype.getTypeName = function () { return "ImportUser"; };
    return ImportUser;
}());
export { ImportUser };
// @Route("/import/uservoice/suggestion")
var ImportUserVoiceSuggestion = /** @class */ (function () {
    function ImportUserVoiceSuggestion() {
    }
    ImportUserVoiceSuggestion.prototype.createResponse = function () { return new ImportUserVoiceSuggestionResponse(); };
    ImportUserVoiceSuggestion.prototype.getTypeName = function () { return "ImportUserVoiceSuggestion"; };
    return ImportUserVoiceSuggestion;
}());
export { ImportUserVoiceSuggestion };
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
export { QueryPostComments };
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
