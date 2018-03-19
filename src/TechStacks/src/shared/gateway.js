import { log, JsonServiceClient, toFormData } from "@servicestack/client";
import { 
    GetConfig, 
    Overview, 
    OverviewResponse, 
    ConvertSessionToToken,
    GetTechnology, 
    GetTechnologyStack, 
    GetPageStats,
    GetAllTechnologies,
    GetAllTechnologyStacks,
    QueryTechnology,
    QueryTechStacks,
    GetUserInfo,
    SessionInfo,
    GetUserFeed,
    AddFavoriteTechnology,
    RemoveFavoriteTechnology,
    AddFavoriteTechStack,
    RemoveFavoriteTechStack,
    CreateTechnology,
    UpdateTechnology,
    DeleteTechnology,
    CreateTechnologyStack,
    UpdateTechnologyStack,
    DeleteTechnologyStack,
    GetTechnologyPreviousVersions,
    GetTechnologyStackPreviousVersions,
    CreatePost,
    QueryPosts,
    UserPostVote,
    UserPostReport,
    GetPost,
    GetUsersKarma,
    CreatePostComment,
    UserPostCommentReport,
    UserPostCommentVote,
    UpdatePostComment,
    UpdatePost,
    DeletePost,
    DeletePostComment,
    GetUserPostCommentVotes,
    PinPostComment,
    QueryOrganizations,
    GetOrganizationMembers,
    QueryPostComments,
    LockPost,
    CreateOrganization,
    DeleteOrganization,
    UpdateOrganization,
    CreateCategory,
    GetOrganizationBySlug,
    DeleteOrganizationCategory,
    UpdateOrganizationCategory,
    LockOrganization,
    AddOrganizationMember,
    UpdateOrganizationMember,
    RemoveOrganizationMember,
    AddOrganizationCategory,
    CreateOrganizationFromPost,
    CreateOrganizationForTechnology,
    GetOrganization,
    GetUserPostActivity,
    UserPostFavorite,
    RequestOrganizationMemberInvite,
    UpdateOrganizationMemberInvite,
    GetOrganizationAdmin,
    ActionPostReport,
    ActionPostCommentReport,
    GetUserOrganizations,
    HidePost,
} from "./dtos";

const usingProxy = location.host == "techstacks.io";

const BaseUrl = usingProxy
    ? "https://www.techstacks.io/"
    : "/";

const AuthBaseUrl = usingProxy
    ? "https://techstacks.io/"
    : "/";

export const client = new JsonServiceClient(BaseUrl);
export const authClient = new JsonServiceClient(AuthBaseUrl);

export const getConfig = async () => await client.get(new GetConfig());

export const getOverview = async () => await client.get(new Overview());

export const getSessionInfo = async() => {
    try {
        return await authClient.get(new SessionInfo());
    } catch (e) {
        return null;
    }
}

export const convertSessionToToken = async () => {
    const response = await authClient.get(new ConvertSessionToToken());
    client.setBearerToken(response.accessToken);
    console.log('convertSessionToToken', AuthBaseUrl, response);
};

export const getAllTechnologies = async () => await client.get(new GetAllTechnologies(), { include: 'total' });

export const getAllTechStacks = async () => await client.get(new GetAllTechnologyStacks(), { include: 'total' });

export const queryTechnology = async (query) => await client.get(new QueryTechnology(), { include: 'total', ...query });

export const queryTechStacks = async (query) => await client.get(new QueryTechStacks(), { include: 'total', ...query });

export const queryPosts = async (query) => await client.get(new QueryPosts(), 
    { take:50, ...query, fields: "id,organizationId,userId,type,categoryId,slug,title,imageUrl,technologyIds,upVotes,downVotes,commentsCount,created,createdBy" });

export const queryPostComments = async(query) => await client.get(new QueryPostComments(), { take:50, ...query });

export const getUserPostActivity = async() => await client.get(new GetUserPostActivity());

export const getPost = async(id, include="comments") => await client.get(new GetPost(), { id, include });

export const getUserOrganizations = async() => await client.get(new GetUserOrganizations());

export const getUsersKarma = async(userIds) => (await client.get(new GetUsersKarma(), { userIds })).results;

export const getUserPostCommentVotes = async(postId) => await client.get(new GetUserPostCommentVotes(), { postId });

export const queryLatestOrganizationsPosts = async (organizationId, types, categoryId, skip, take) => {
    const request = { organizationId, orderBy:'rank' };
    if (types) 
        request.types = types;
    if (categoryId)
        request.categoryId = categoryId;
    if (skip > 0)
        request.skip = skip;
    if (take > 0)
        request.take = take;
    return (await queryPosts(request)).results
};

export const queryLatestPosts = async(types, technologyIds, skip, take) => {
    const request = { orderBy:'rank' };
    if (types) 
        request.types = types;
    if (technologyIds)
        request.anyTechnologyIds = technologyIds;
    if (skip > 0)
        request.skip = skip;
    if (take > 0)
        request.take = take;
    return (await queryPosts(request)).results
}

export const getTechnology = async(slug) => {
    const request = new GetTechnology();
    request.slug = slug;
    const response = await client.get(request);
    return { 
        ...response.technology,
        technologyStacks: response.technologyStacks
    }
}

export const getTechnologyStack = async(slug) => {
    const request = new GetTechnologyStack();
    request.slug = slug;
    return await client.get(request);
}

export const getPageStats = async(type, slug, id) => {
    const request = new GetPageStats();
    request.type = type;
    request.slug = slug;
    if (id != null)
        request.id = id;
    return await client.get(request);
}

export const getUserInfo = async(username) => {
    const request = new GetUserInfo();
    request.userName = username;
    return await client.get(request);
}

export const getUserFeed = async() => {
    try {
        return (await client.get(new GetUserFeed())).results;
    } catch (e) {
        return null;
    }
}

export const addFavoriteTechnology = async (id) => {
    const request = new AddFavoriteTechnology();
    request.technologyId = id;
    return (await client.put(request)).result;
}

export const removeFavoriteTechnology = async (id) => {
    const request = new RemoveFavoriteTechnology();
    request.technologyId = id;
    return (await client.delete(request)).result;
}

export const addFavoriteTechStack = async (id) => {
    const request = new AddFavoriteTechStack();
    request.technologyStackId = id;
    return (await client.put(request)).result;
}

export const removeFavoriteTechStack = async (id) => {
    const request = new RemoveFavoriteTechStack();
    request.technologyStackId = id;
    return (await client.delete(request)).result;
}

export const createTechnology = async(args, logo) => {
    const request = new CreateTechnology();
    const body = toFormData({...args, logo });
    return (await client.postBody(request, body)).result;
}

export const updateTechnology = async(args, logo) => {
    const request = new UpdateTechnology();
    const body = toFormData({...args, logo });
    return (await client.putBody(request, body)).result;
}

export const deleteTechnology = async(id) => {
    return await client.delete(new DeleteTechnology(), { id });
}

export const createTechStack = async(args, logo) => {
    const request = new CreateTechnologyStack();
    const body = toFormData({...args, logo });
    return (await client.postBody(request, body)).result;
}

export const updateTechStack = async(args, logo) => {
    const request = new UpdateTechnologyStack();
    const body = toFormData({...args, logo });
    return (await client.putBody(request, body)).result;
}

export const deleteTechStack = async(id) => {
    return await client.delete(new DeleteTechnologyStack(), { id });
}

export const getTechnologyTiers = async() => {
    const request = new QueryTechnology();
    return (await client.get(request, { orderBy:"tier,name", fields:"id,name,tier,slug", jsconfig:"edv" })).results;
}

export const getTechnologyPreviousVersions = async(slug) => {
    const request = new GetTechnologyPreviousVersions();
    request.slug = slug;
    return (await client.get(request)).results;
}

export const getTechStackPreviousVersions = async(slug) => {
    const request = new GetTechnologyStackPreviousVersions();
    request.slug = slug;
    return (await client.get(request)).results;
}

export const getOrganizationBySlug = async(slug) => await client.get(new GetOrganizationBySlug(), { slug });

export const getOrganizationById = async(id) => await client.get(new GetOrganization(), { id });

export const createOrganization = async(name, slug, description) => {
    const request = new CreateOrganization();
    request.name = name;
    request.slug = slug;
    request.description = description;
    return await client.post(request);
}

export const getOrganizationAdmin = async(id) => await client.get(new GetOrganizationAdmin(), { id });

export const createOrganizationForTechnology = async(technologyId) => 
    await client.post(Object.assign(new CreateOrganizationForTechnology(), { technologyId }));

export const createOrganizationForTechStack = async(techStackId) => 
    await client.post(Object.assign(new CreateOrganizationForTechnology(), { techStackId }));

export const updateOrganization = async(args) => await client.put(Object.assign(new UpdateOrganization(), args));

export const deleteOrganization = async(id) => await client.delete(new DeleteOrganization(), { id });

export const lockOrganization = async(id, lock, reason) => {
    const request = new LockOrganization();
    request.id = id;
    request.lock = lock;
    request.reason = reason;
    await client.put(request);
}

export const addCategory = async(args) => await client.post(Object.assign(new AddOrganizationCategory(), args));

export const updateCategory = async(args) => await client.put(Object.assign(new UpdateOrganizationCategory(), args));

export const deleteCategory = async(organizationId, id) => await client.delete(new DeleteOrganizationCategory(), { organizationId, id });

export const addMember = async(args) => await client.post(Object.assign(new AddOrganizationMember(), args));

export const updateMember = async(args) => await client.put(Object.assign(new UpdateOrganizationMember(), args));

export const removeMember = async(organizationId, userId) => await client.delete(new RemoveOrganizationMember(), { organizationId, userId });

export const createPost = async(args, icon) => {
    const request = new CreatePost();
    const body = toFormData({...args, icon });
    return (await client.postBody(request, body));
}

export const updatePost = async(args, icon) => {
    const request = new UpdatePost();
    const body = toFormData({...args, icon });
    return (await client.putBody(request, body));
}

export const deletePost = async(id) => {
    const request = new DeletePost();
    request.id = id;
    return await client.delete(request);
}

export const votePost = async(id, weight) => {
    const request = new UserPostVote();
    request.id = id;
    request.weight = weight;
    await client.put(request);
}

export const favoritePost = async(id) => {
    const request = new UserPostFavorite();
    request.id = id;
    await client.put(request);
}

export const reportPost = async (id, flagType, reportNotes) => {
    const request = new UserPostReport();
    request.id = id;
    request.flagType = flagType;
    request.reportNotes = reportNotes;
    await client.put(request);
}

export const actionPostReport = async (id, postId, reportAction) => {
    const request = new ActionPostReport();
    request.id = id;
    request.postId = postId;
    request.reportAction = reportAction;
    await client.post(request);
}

export const createPostComment = async (postId, content, replyId) => {
    const request = new CreatePostComment();
    request.postId = postId;
    request.replyId = replyId;
    request.content = content;
    await client.post(request);
}

export const updatePostComment = async (id, postId, content) => {
    const request = new UpdatePostComment();
    request.id = id;
    request.postId = postId;
    request.content = content;
    await client.put(request);
}

export const deletePostComment = async(id) => {
    const request = new DeletePostComment();
    request.id = id;
    return await client.delete(request);
}

export const reportPostComment = async (postId, commentId, flagType, reportNotes) => {
    const request = new UserPostCommentReport();
    request.postId = postId;
    request.id = commentId;
    request.flagType = flagType;
    request.reportNotes = reportNotes;
    await client.put(request);
}

export const actionPostCommentReport = async (id, postCommentId, postId, reportAction) => {
    const request = new ActionPostCommentReport();
    request.id = id;
    request.postCommentId = postCommentId;
    request.postId = postId;
    request.reportAction = reportAction;
    await client.post(request);
}

export const votePostComment = async(postId, commentId, weight) => {
    const request = new UserPostCommentVote();
    request.postId = postId;
    request.id = commentId;
    request.weight = weight;
    await client.put(request);
}

export const pinPostComment = async(postId, commentId, pin) => {
    const request = new PinPostComment();
    request.postId = postId;
    request.id = commentId;
    request.pin = pin;
    await client.put(request);
}

export const lockPost = async(postId, lock, reason) => {
    const request = new LockPost();
    request.id = postId;
    request.lock = lock;
    request.reason = reason;
    await client.put(request);
}

export const hidePost = async(postId, hide, reason) => {
    const request = new HidePost();
    request.id = postId;
    request.hide = hide;
    request.reason = reason;
    await client.put(request);
}

export const requestMemberInvite = async(organizationId) => {
    const request = new RequestOrganizationMemberInvite();
    request.organizationId = organizationId;
    return await client.post(request);
}

export const updateMemberInvite = async(organizationId, userName, approve) => {
    const request = new UpdateOrganizationMemberInvite();
    request.organizationId = organizationId;
    request.userName = userName;
    request.approve = approve;
    request.dismiss = !approve;
    return client.put(request);
}