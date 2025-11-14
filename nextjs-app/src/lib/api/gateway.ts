import { client } from './client';
import { toFormData } from '@servicestack/client';
import * as dtos from '@/shared/dtos';

// ============================================
// CONFIG & OVERVIEW
// ============================================

export const getConfig = async () => {
  try {
    return await client.get(new dtos.GetConfig());
  } catch {
    return null;
  }
};

export const getOverview = async () => {
  return await client.get(new dtos.Overview());
};

export const getSessionInfo = async () => {
  try {
    return await client.get(new dtos.SessionInfo());
  } catch {
    return null;
  }
};

// ============================================
// AUTHENTICATION
// ============================================

export const login = async (
  provider: string,
  userName?: string,
  password?: string
) => {
  await logout();

  const request = new dtos.Authenticate();
  request.provider = provider;
  if (userName) request.userName = userName;
  if (password) request.password = password;

  const response = await client.post(request);

  // Set bearer token for subsequent requests if provided
  if (response.bearerToken) {
    client.bearerToken = response.bearerToken;
  }

  await getSessionInfo();
  return `/${provider}`;
};

export const logout = async () => {
  const request = new dtos.Authenticate();
  request.provider = 'logout';
  await client.post(request);
  delete (client as any).bearerToken;
  client.headers.delete('Authorization');
};

// ============================================
// TECHNOLOGIES
// ============================================

export const getTechnology = async (slug: string) => {
  const request = new dtos.GetTechnology();
  request.slug = slug;
  const response = await client.get(request);
  return {
    ...response.technology,
    technologyStacks: response.technologyStacks
  };
};

export const getAllTechnologies = async () => {
  return await client.get(new dtos.GetAllTechnologies(), { include: 'total' });
};

export const queryTechnology = async (query: any) => {
  return await client.get(
    new dtos.QueryTechnology(),
    { include: 'total', ...query }
  );
};

export const getTechnologyTiers = async () => {
  const request = new dtos.QueryTechnology();
  return (await client.get(request, {
    orderBy: 'tier,name',
    fields: 'id,name,tier,slug',
    jsconfig: 'edv'
  })).results;
};

export const getTechnologyPreviousVersions = async (slug: string) => {
  const request = new dtos.GetTechnologyPreviousVersions();
  request.slug = slug;
  return (await client.get(request)).results;
};

export const createTechnology = async (args: any, logo?: File) => {
  const request = new dtos.CreateTechnology();
  const body = toFormData({ ...args, logo });
  return (await client.postBody(request, body)).result;
};

export const updateTechnology = async (args: any, logo?: File) => {
  const request = new dtos.UpdateTechnology();
  const body = toFormData({ ...args, logo });
  return (await client.putBody(request, body)).result;
};

export const deleteTechnology = async (id: number) => {
  return await client.delete(new dtos.DeleteTechnology(), { id });
};

// ============================================
// TECH STACKS
// ============================================

export const getTechnologyStack = async (slug: string) => {
  const request = new dtos.GetTechnologyStack();
  request.slug = slug;
  return await client.get(request);
};

export const getAllTechStacks = async () => {
  return await client.get(new dtos.GetAllTechnologyStacks(), { include: 'total' });
};

export const queryTechStacks = async (query: any) => {
  return await client.get(new dtos.QueryTechStacks(), { include: 'total', ...query });
};

export const getTechStackPreviousVersions = async (slug: string) => {
  const request = new dtos.GetTechnologyStackPreviousVersions();
  request.slug = slug;
  return (await client.get(request)).results;
};

export const createTechStack = async (args: any, logo?: File) => {
  const request = new dtos.CreateTechnologyStack();
  const body = toFormData({ ...args, logo });
  return (await client.postBody(request, body)).result;
};

export const updateTechStack = async (args: any, logo?: File) => {
  const request = new dtos.UpdateTechnologyStack();
  const body = toFormData({ ...args, logo });
  return (await client.putBody(request, body)).result;
};

export const deleteTechStack = async (id: number) => {
  return await client.delete(new dtos.DeleteTechnologyStack(), { id });
};

// ============================================
// POSTS
// ============================================

export const queryPosts = async (query: any) => {
  return await client.get(
    new dtos.QueryPosts(),
    {
      take: 50,
      ...query,
      fields: 'id,organizationId,userId,type,categoryId,slug,title,imageUrl,labels,technologyIds,upVotes,downVotes,points,commentsCount,created,createdBy'
    }
  );
};

export const queryLatestPosts = async (types?: string, technologyIds?: string, skip?: number, take?: number) => {
  const request: any = { orderBy: 'rank' };
  if (types) request.types = types;
  if (technologyIds) request.anyTechnologyIds = technologyIds;
  if (skip && skip > 0) request.skip = skip;
  if (take && take > 0) request.take = take;
  return (await queryPosts(request)).results;
};

export const queryLatestOrganizationsPosts = async ({
  organizationId,
  types,
  categoryId,
  is,
  orderBy,
  skip,
  take
}: any) => {
  if (!orderBy) orderBy = 'rank';
  const request: any = { organizationId, orderBy };
  if (types) request.types = types;
  if (categoryId) request.categoryId = categoryId;
  if (is) request.is = is;
  if (skip && skip > 0) request.skip = skip;
  if (take && take > 0) request.take = take;
  return (await queryPosts(request)).results;
};

export const getPost = async (id: number, include = 'comments') => {
  return await client.get(new dtos.GetPost(), { id, include });
};

export const createPost = async (args: any, icon?: File) => {
  const request = new dtos.CreatePost();
  const body = toFormData({ ...args, icon });
  return await client.postBody(request, body);
};

export const updatePost = async (args: any, icon?: File) => {
  const request = new dtos.UpdatePost();
  const body = toFormData({ ...args, icon });
  return await client.putBody(request, body);
};

export const deletePost = async (id: number) => {
  const request = new dtos.DeletePost();
  request.id = id;
  return await client.delete(request);
};

export const votePost = async (id: number, weight: number) => {
  const request = new dtos.UserPostVote();
  request.id = id;
  request.weight = weight;
  await client.put(request);
};

export const favoritePost = async (id: number) => {
  const request = new dtos.UserPostFavorite();
  request.id = id;
  await client.put(request);
};

export const reportPost = async (id: number, flagType: dtos.FlagType, reportNotes: string) => {
  const request = new dtos.UserPostReport();
  request.id = id;
  request.flagType = flagType;
  request.reportNotes = reportNotes;
  await client.put(request);
};

export const actionPostReport = async (id: number, postId: number, reportAction: dtos.ReportAction) => {
  const request = new dtos.ActionPostReport();
  request.id = id;
  request.postId = postId;
  request.reportAction = reportAction;
  await client.post(request);
};

export const lockPost = async (postId: number, lock: boolean, reason: string) => {
  const request = new dtos.LockPost();
  request.id = postId;
  request.lock = lock;
  request.reason = reason;
  await client.put(request);
};

export const hidePost = async (postId: number, hide: boolean, reason: string) => {
  const request = new dtos.HidePost();
  request.id = postId;
  request.hide = hide;
  request.reason = reason;
  await client.put(request);
};

// ============================================
// COMMENTS
// ============================================

export const queryPostComments = async (query: any) => {
  return await client.get(new dtos.QueryPostComments(), { take: 50, ...query });
};

export const createPostComment = async (postId: number, content: string, replyId?: number) => {
  const request = new dtos.CreatePostComment();
  request.postId = postId;
  request.replyId = replyId;
  request.content = content;
  await client.post(request);
};

export const updatePostComment = async (id: number, postId: number, content: string) => {
  const request = new dtos.UpdatePostComment();
  request.id = id;
  request.postId = postId;
  request.content = content;
  await client.put(request);
};

export const deletePostComment = async (id: number) => {
  const request = new dtos.DeletePostComment();
  request.id = id;
  return await client.delete(request);
};

export const votePostComment = async (postId: number, commentId: number, weight: number) => {
  const request = new dtos.UserPostCommentVote();
  request.postId = postId;
  request.id = commentId;
  request.weight = weight;
  await client.put(request);
};

export const reportPostComment = async (
  postId: number,
  commentId: number,
  flagType: dtos.FlagType,
  reportNotes: string
) => {
  const request = new dtos.UserPostCommentReport();
  request.postId = postId;
  request.id = commentId;
  request.flagType = flagType;
  request.reportNotes = reportNotes;
  await client.put(request);
};

export const actionPostCommentReport = async (
  id: number,
  postCommentId: number,
  postId: number,
  reportAction: dtos.ReportAction
) => {
  const request = new dtos.ActionPostCommentReport();
  request.id = id;
  request.postCommentId = postCommentId;
  request.postId = postId;
  request.reportAction = reportAction;
  await client.post(request);
};

export const pinPostComment = async (postId: number, commentId: number, pin: boolean) => {
  const request = new dtos.PinPostComment();
  request.postId = postId;
  request.id = commentId;
  request.pin = pin;
  await client.put(request);
};

// ============================================
// ORGANIZATIONS
// ============================================

export const getOrganizationBySlug = async (slug: string) => {
  return await client.get(new dtos.GetOrganizationBySlug(), { slug });
};

export const getOrganizationById = async (id: number) => {
  return await client.get(new dtos.GetOrganization(), { id });
};

export const getOrganizationAdmin = async (id: number) => {
  return await client.get(new dtos.GetOrganizationAdmin(), { id });
};

export const createOrganization = async (name: string, slug: string, description: string) => {
  const request = new dtos.CreateOrganization();
  request.name = name;
  request.slug = slug;
  request.description = description;
  return await client.post(request);
};

export const createOrganizationForTechnology = async (technologyId: number) => {
  return await client.post(
    Object.assign(new dtos.CreateOrganizationForTechnology(), { technologyId })
  );
};

export const createOrganizationForTechStack = async (techStackId: number) => {
  return await client.post(
    Object.assign(new dtos.CreateOrganizationForTechnology(), { techStackId })
  );
};

export const updateOrganization = async (args: any) => {
  return await client.put(Object.assign(new dtos.UpdateOrganization(), args));
};

export const deleteOrganization = async (id: number) => {
  return await client.delete(new dtos.DeleteOrganization(), { id });
};

export const lockOrganization = async (id: number, lock: boolean, reason: string) => {
  const request = new dtos.LockOrganization();
  request.id = id;
  request.lock = lock;
  request.reason = reason;
  await client.put(request);
};

export const subscribeToOrganization = async (organizationId: number, postTypes?: dtos.PostType[]) => {
  const request = new dtos.SubscribeToOrganization();
  request.organizationId = organizationId;
  if (postTypes) request.postTypes = postTypes;
  await client.put(request);
};

// ============================================
// ORGANIZATION LABELS
// ============================================

export const addLabel = async (args: any) => {
  return await client.post(Object.assign(new dtos.AddOrganizationLabel(), args));
};

export const updateLabel = async (args: any) => {
  return await client.put(Object.assign(new dtos.UpdateOrganizationLabel(), args));
};

export const removeLabel = async (organizationId: number, slug: string) => {
  return await client.delete(new dtos.RemoveOrganizationLabel(), { organizationId, slug });
};

// ============================================
// ORGANIZATION CATEGORIES
// ============================================

export const addCategory = async (args: any) => {
  return await client.post(Object.assign(new dtos.AddOrganizationCategory(), args));
};

export const updateCategory = async (args: any) => {
  return await client.put(Object.assign(new dtos.UpdateOrganizationCategory(), args));
};

export const deleteCategory = async (organizationId: number, id: number) => {
  return await client.delete(new dtos.DeleteOrganizationCategory(), { organizationId, id });
};

// ============================================
// ORGANIZATION MEMBERS
// ============================================

export const addMember = async (args: any) => {
  return await client.post(Object.assign(new dtos.AddOrganizationMember(), args));
};

export const updateMember = async (args: any) => {
  return await client.put(Object.assign(new dtos.UpdateOrganizationMember(), args));
};

export const removeMember = async (organizationId: number, userId: number) => {
  return await client.delete(new dtos.RemoveOrganizationMember(), { organizationId, userId });
};

export const requestMemberInvite = async (organizationId: number) => {
  const request = new dtos.RequestOrganizationMemberInvite();
  request.organizationId = organizationId;
  return await client.post(request);
};

export const updateMemberInvite = async (
  organizationId: number,
  userName: string,
  approve: boolean
) => {
  const request = new dtos.UpdateOrganizationMemberInvite();
  request.organizationId = organizationId;
  request.userName = userName;
  request.approve = approve;
  request.dismiss = !approve;
  return await client.put(request);
};

// ============================================
// FAVORITES
// ============================================

export const addFavoriteTechnology = async (id: number) => {
  const request = new dtos.AddFavoriteTechnology();
  request.technologyId = id;
  return (await client.put(request)).result;
};

export const removeFavoriteTechnology = async (id: number) => {
  const request = new dtos.RemoveFavoriteTechnology();
  request.technologyId = id;
  return (await client.delete(request)).result;
};

export const addFavoriteTechStack = async (id: number) => {
  const request = new dtos.AddFavoriteTechStack();
  request.technologyStackId = id;
  return (await client.put(request)).result;
};

export const removeFavoriteTechStack = async (id: number) => {
  const request = new dtos.RemoveFavoriteTechStack();
  request.technologyStackId = id;
  return (await client.delete(request)).result;
};

// ============================================
// USER INFO
// ============================================

export const getUserInfo = async (id: number) => {
  const request = new dtos.GetUserInfo();
  request.id = id;
  return await client.get(request);
};

export const getUserFeed = async () => {
  try {
    return (await client.get(new dtos.GetUserFeed())).results;
  } catch {
    return null;
  }
};

export const getUserOrganizations = async () => {
  return await client.get(new dtos.GetUserOrganizations());
};

export const getUserPostActivity = async () => {
  return await client.get(new dtos.GetUserPostActivity());
};

export const getUserPostCommentVotes = async (postId: number) => {
  return await client.get(new dtos.GetUserPostCommentVotes(), { postId });
};

export const getUsersKarma = async (userIds: number[]) => {
  return (await client.get(new dtos.GetUsersKarma(), { userIds })).results;
};

// ============================================
// STATS
// ============================================

export const getPageStats = async (type: string, slug: string, id?: number) => {
  const request = new dtos.GetPageStats();
  request.type = type;
  request.slug = slug;
  if (id != null) request.id = id;
  return await client.get(request);
};

// ============================================
// ERROR HANDLING
// ============================================

export function handleApiError(error: any) {
  if (error.responseStatus) {
    return {
      message: error.responseStatus.message,
      errors: error.responseStatus.errors || []
    };
  }
  return { message: error.message || 'An error occurred', errors: [] };
}
