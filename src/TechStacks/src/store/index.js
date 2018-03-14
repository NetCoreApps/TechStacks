import Vue from "vue";
import Vuex from "vuex";
import { 
    getConfig, 
    getOverview, 
    getUserOrganizations,
    convertSessionToToken,
    getTechnology, 
    getTechnologyStack, 
    getPageStats,
    getAllTechnologies,
    getAllTechStacks,
    getUserInfo,
    getSessionInfo,
    getUserFeed,
    addFavoriteTechnology,
    removeFavoriteTechnology,
    addFavoriteTechStack,
    removeFavoriteTechStack,
    getOrganizationBySlug,
    getUserPostActivity,
    getUserPostCommentVotes,
    queryLatestPosts,
    queryLatestOrganizationsPosts,
    votePost,
    votePostComment,
    favoritePost,
    getPost,
    getUsersKarma,
    getTechnologyTiers,
    pinPostComment,
} from "~/shared/gateway";
import { Overview } from "~/shared/dtos";
import { log, prettifyUrl } from "~/shared/utils";
import { POSTS_PER_PAGE, getLangCode } from "~/shared/post";
import { getOrganizationById } from "../shared/gateway";

const statsKey = (type,slug) => `${type}:${slug}`;

const state = {
    loading: false,
    sessionInfo: null,
    sessionFeed: null,
    userActivity: null,
    userOrganizations: null,
    favoriteTechnologies: [],
    favoriteTechStacks: [],
    allTiers: [],
    allPostTypes: [],
    allFlagTypes: [],
    overview: {},
    organization: null,
    organizationCategories: [],
    organizationInfo: null,
    allOrganizations: [],
    orgSlugMap: {},
    organizationIdMap: {},
    organizationMembersMap: {},
    allTechnologies: [],
    allTechnologiesTotal: 0,
    allTechStacks: [],
    allTechStacksTotal: 0,
    technologyMap: {},
    techstacksMap: {},
    pageStatsMap: {},
    userInfoMap: {},
    postsMap: {},
    userKarmaMap: {},
    hidePostIds: JSON.parse(localStorage.getItem('hidePostIds') || '[]'),
    latestOrganizationPosts: {},
    latestOrganizationPostsQuery: {},
    latestNewsPosts: [],
    technologyTiers: [],
    userPostActivity: null,
    userPostCommentVotes: null,
};

const eachPost = (state, postId, cb) => {
    for (let orgId in state.latestOrganizationPosts) {
        for (let post of state.latestOrganizationPosts[orgId]) {
            if (post.id === postId) {
                cb(post);
            }
        }
    }
    for (let post of state.latestNewsPosts) {
        if (post.id === postId) {
            cb(post);
        }
    }
    for (let id in state.postsMap) {
        if (parseInt(id) === postId) {
            cb(state.postsMap[id]);
        }
    }
};

const updateVotes = (userVotes, id, weight) => {
    let upVotes = 0;
    let downVotes = 0;
    const isUp = weight > 0;
    const isDown = weight < 0;
    const unVote = weight === 0;
    if (userVotes != null) {
        if (userVotes.upVoted.indexOf(id) >= 0) {
            if (isDown || unVote) {
                Vue.delete(userVotes.upVoted, userVotes.upVoted.findIndex(x => x === id))
                if (isDown)
                    downVotes++;
                if (unVote)
                    upVotes--;
            }
        } else {
            if (isUp) {
                userVotes.upVoted.push(id);
                upVotes++;
            }
        }
        if (userVotes.downVoted.indexOf(id) >= 0) {
            if (isUp || unVote) {
                Vue.delete(userVotes.downVoted, userVotes.downVoted.findIndex(x => x === id))
                if (isUp)
                    upVotes++;
                if (unVote)
                    downVotes--;
            }
        } else {
            if (isDown) {
                userVotes.downVoted.push(id);
                downVotes++;
            }
        }
    }
    return { upVotes, downVotes };
};

const mutations = {
    loading(state, loading) {
        state.loading = loading;
    },
    sessionInfo(state, sessionInfo) {
        state.sessionInfo = sessionInfo;
    },
    sessionUserInfo(state, userInfo) {
        state.favoriteTechnologies = userInfo.favoriteTechnologies || [];
        state.favoriteTechStacks = userInfo.favoriteTechStacks || [];
        state.userActivity = userInfo.userActivity;
    },
    sessionFeed(state, sessionFeed) {
        state.sessionFeed = sessionFeed;
    },
    userOrganizations(state, userOrganizations) {
        state.userOrganizations = userOrganizations;
    },
    userPostActivity(state, userPostActivity) {
        state.userPostActivity = {
            upVoted: userPostActivity.upVotedPostIds,
            downVoted: userPostActivity.downVotedPostIds,
            favorited: userPostActivity.favoritePostIds,
        };
    },
    userPostCommentVotes(state, userPostCommentVotes) {
        state.userPostCommentVotes = {
            upVoted: userPostCommentVotes.upVotedCommentIds,
            downVoted: userPostCommentVotes.downVotedCommentIds
        };
    },
    orgById(state, orgId) {
        state.organization = state.organizationIdMap[orgId] || state.allOrganizations.find(x => x.id === orgId);
    },
    orgBySlug(state, slug) {
        const orgInfo = state.allOrganizations.find(x => x.slug === slug);
        if (orgInfo) {
            state.organization = state.organizationIdMap[orgInfo.id];
        }
    },
    organization(state, organizationResponse) {
        const organization = organizationResponse.organization;
        organization.owners = organizationResponse.owners;
        organization.moderators = organizationResponse.moderators;
        organization.categories = organizationResponse.categories;
        organization.full = true;

        state.organization = organization;
        Vue.set(state.organizationIdMap, organization.id, organization); 
    },
    hidePost(state, postId) {
        state.hidePostIds.push(postId);
        localStorage.setItem('hidePostIds', JSON.stringify(state.hidePostIds));
    },
    votePost(state, { postId, weight }) {
        const { upVotes, downVotes } = updateVotes(state.userPostActivity, postId, weight);
        eachPost(state, postId, post => {
            post.upVotes += upVotes;
            post.downVotes += downVotes;
        });
    },
    votePostComment(state, { postId, commentId, weight }) {
        const { upVotes, downVotes } = updateVotes(state.userPostCommentVotes, commentId, weight);
        eachPost(state, postId, post => {
            var comment = (post.comments || []).find(x => x.id === commentId);
            if (comment) {
                comment.upVotes += upVotes;
                comment.downVotes += downVotes;
            }
        });
    },
    favoritePost(state, { postId }) {
        if (state.userPostActivity && state.userPostActivity.favorited) {
            const hadFavPos = state.userPostActivity.favorited.indexOf(postId);
            if (hadFavPos >= 0) {
                state.userPostActivity.favorited.splice(hadFavPos, 1);
            } else {
                state.userPostActivity.favorited.push(postId);
            }
        }
    },

    config(state, config) {
        state.allTiers = config.allTiers;
        state.allPostTypes = config.allPostTypes;
        state.allFlagTypes = config.allFlagTypes;
    },
    overview(state, overview) {
        state.overview = overview;
        state.allOrganizations = overview.allOrganizations;
        state.orgSlugMap = {};
        for (var org of overview.allOrganizations) {
            state.orgSlugMap[org.slug] = org.id;
        }
    },
    allTechnologies(state, allTechnologies) {
        state.allTechnologies = allTechnologies.results;
        state.allTechnologiesTotal = allTechnologies.total;
    },
    allTechStacks(state, allTechStacks) {
        state.allTechStacks = allTechStacks.results;
        state.allTechStacksTotal = allTechStacks.total;
    },
    latestNewsPosts(state, latestNewsPosts) {
        state.latestNewsPosts = latestNewsPosts;
    },
    latestOrganizationPosts(state, { organizationId, posts }) {
        Vue.set(state.latestOrganizationPosts, organizationId, posts);
    },
    latestOrganizationPostsQuery(state, query) {
        state.latestOrganizationPostsQuery = query;
    },
    technologyTiers(state, technologyTiers) {
        state.technologyTiers = technologyTiers;
    },

    // Use Vue .set() to update objects/arrays so mutations can be observed
    technology(state, technology) {
        Vue.set(state.technologyMap, technology.slug, technology); 
    },
    technologyStack(state, techstack) {
        Vue.set(state.techstacksMap, techstack.slug, techstack); 
    },
    pageStats(state, pageStats) {
        Vue.set(state.pageStatsMap, statsKey(pageStats.type,pageStats.slug), pageStats); 
    },
    userInfo(state, userInfo) {
        Vue.set(state.userInfoMap, userInfo.userName, userInfo); 
    },
    addFavoriteTechnology(state, tech) {
        state.favoriteTechnologies.push(tech);
    },
    removeFavoriteTechnology(state, id) {
        Vue.delete(state.favoriteTechnologies, state.favoriteTechnologies.findIndex(x => x.id == id));
    },
    addFavoriteTechStack(state, stack) {
        state.favoriteTechStacks.push(stack);
    },
    removeFavoriteTechStack(state, id) {
        Vue.delete(state.favoriteTechStacks, state.favoriteTechStacks.findIndex(x => x.id == id));
    },
    removeTechnology(state, { id, slug }) {
        Vue.delete(state.favoriteTechnologies, state.favoriteTechnologies.findIndex(x => x.id == id));
        Vue.delete(state.technologyMap, slug);
    },
    post(state, post) {
        Vue.set(state.postsMap, post.id, post); 
    },
    usersKarma(state, usersKarma) {
        for (var userId in usersKarma) {
            Vue.set(state.userKarmaMap, userId, usersKarma[userId]);
        }
    },
}

const getters = {
    loading: state => state.loading,
    isAuthenticated: state => state.sessionInfo != null,
    isAdmin: state => state.sessionInfo && (state.sessionInfo.roles || []).indexOf("Admin") >= 0,
    user: state => state.sessionInfo,
    userId: state => state.sessionInfo && state.sessionInfo.userAuthId && parseInt(state.sessionInfo.userAuthId),
    sessionFeed: state => state.sessionFeed,
    userOrganizations: state => state.userOrganizations,
    userPostActivity: state => state.userPostActivity,
    userPostCommentVotes: state => state.userPostCommentVotes,
    favoriteTechnologies: state => state.favoriteTechnologies,
    favoriteTechStacks: state => state.favoriteTechStacks,
    isFavoriteTechnology: state => (slug) => state.favoriteTechnologies.some(x => x.slug === slug),
    isFavoriteTechStack: state => (slug) => state.favoriteTechStacks.some(x => x.slug === slug),
    allTiers: state => state.allTiers,
    allPostTypes: state => state.allPostTypes,
    postTypeLabelsMap: state => {
        const map = {};
        state.allPostTypes.forEach(x => map[x.name] = x.title);
        return map;
    },
    allowablePostTypes: (state,getters) => {
        const org = getters.organization;
        if (org && org.postTypes && org.postTypes.length > 0) {
            if (getters.isOrganizationModerator && org.moderatorPostTypes && org.moderatorPostTypes.length > 0)
                return org.moderatorPostTypes;
            return org.postTypes;
        }
        return state.allPostTypes.map(x => x.name);
    },
    browsablePostTypes: (state,getters) => {
        const org = getters.organization;
        if (org)
        {
            if (org.moderatorPostTypes && org.moderatorPostTypes.length > 0)
                return org.moderatorPostTypes;
            if (org.postTypes && org.postTypes.length > 0)
                return org.postTypes;
        }
        return state.allPostTypes.map(x => x.name);
    },
    allOrganizations: state => state.allOrganizations,
    categorySelectItems: (state,getters) => (getters.organization && getters.organization.categories || [])
        .sort((a,b) => a.slug.localeCompare(b.slug)).map(x => ({ text:x.name, value:x.id })),
    allowablePostTypeSelectItems: (state,getters) => getters.allowablePostTypes.map(x => ({ text:x, value:x })),
    browsablePostTypeSelectItems: (state,getters) => getters.browsablePostTypes.map(x => ({ text:x, value:x })),
    allPostTypeSelectItems: state => state.allPostTypes.map(x => ({ text:x.name, value:x.name })),
    flagTypeSelectItems: state => state.allFlagTypes.map(x => ({ text:x.title, value:x.name })),
    technologySelectItems: state => state.technologyTiers.map(x => ({ text:`${x.tier} - ${x.name}`, value:x.id })),
    getTechnologySlug: state => techId => (state.technologyTiers.find(x => x.id === techId) || {}).slug,
    getTechStackSlug: state => techstackId => (state.allTechStacks.find(x => x.id === techstackId) || {}).slug,
    technologyTiers: state => state.technologyTiers,
    allTechnologies: state => state.allTechnologies,
    allTechnologiesTotal: state => state.allTechnologiesTotal,
    allTechStacks: state => state.allTechStacks,
    allTechStacksTotal: state => state.allTechStacksTotal,
    overview: state => state.overview,
    topTechnologies: state => state.overview.topTechnologies,
    topUsers: state => state.overview.topUsers,
    topTechnologiesByTier: (state) => (tier) => state.overview.topTechnologiesByTier[tier],
    organizationInfo: state => state.organizationInfo,
    organization: state => state.organization,
    organizationMembers: state => state.organization && state.organization.members,
    organizationMember:  (state,getters) => (getters.organizationMembers || []).find(x => x.userId === getters.userId),
    isOrganizationModerator:  (state,getters) => getters.isAdmin || getters.organizationMember && getters.organizationMember.isModerator,
    isOrganizationOwner:  (state,getters) => getters.isAdmin || getters.organizationMember && getters.organizationMember.isOwner,
    getOrganizationId: state => slug => state.orgSlugMap[slug],
    getOrganizationSlug: state => orgId => (state.allOrganizations.find(x => x.id === orgId) || {}).slug,
    getOrganization: state => orgId => state.organizationIdMap[orgId] || state.allOrganizations.find(x => x.id === orgId),
    getOrganizationBySlug: (state,getters) => slug => getters.getOrganization(getters.getOrganizationId(slug)),    
    getLangByOrganizationId: (state,getters) => orgId => getLangCode((getters.getOrganization(orgId) || {}).lang),
    getTechnologyOrganization: (state) => techId => state.allOrganizations.find(x => x.refId == techId && x.refSource == "Technology"),
    getTechnology: state => slug => state.technologyMap[slug],
    getTechnologyId: state => slug => state.technologyMap[slug] && state.technologyMap[slug].id,
    getTechnologyStack: state => slug => state.techstacksMap[slug],
    getTechnologyStackId: state => slug => state.techstacksMap[slug] && state.techstacksMap[slug].id,
    getPageStats: state => (type,slug) => state.pageStatsMap[statsKey(type,slug)],
    getUserInfo: state => userName => state.userInfoMap[userName],
    canChangeTechnology: (state,getters) => tech => getters.isAuthenticated && 
        (!tech.isLocked || state.sessionInfo.userAuthId == tech.ownerId || getters.isAdmin),
    canChangeTechStack: (state,getters) => stack => getters.isAuthenticated && 
        (!stack.isLocked || state.sessionInfo.userAuthId == stack.ownerId || getters.isAdmin),
    latestOrganizationPosts: (state,getters) => (getters.organization && state.latestOrganizationPosts[getters.organization.id] || [])
        .filter(x => state.hidePostIds.indexOf(x.id) == -1).slice(0,POSTS_PER_PAGE),
    latestNewsPosts: (state,getters) => state.latestNewsPosts
        .filter(x => state.hidePostIds.indexOf(x.id) == -1).slice(0,POSTS_PER_PAGE),
    getPost: state => postId => state.postsMap[postId],
    getUsersKarma: state => userId => state.userKarmaMap[userId],
};

async function doAction(commit, mutation, action) {
    commit('loading', true);
    try {
        commit(mutation, await action());
    } 
    finally {
        commit('loading', false);
    }
}

const actions = {
    async nuxtClientInit({ commit }, { req }) {
        commit('loading', true);

        const [config, overview, sessionInfo, userOrganizations] = await Promise.all([
            getConfig(),
            getOverview(),
            getSessionInfo(),
            getUserOrganizations(),
        ])
        commit('config', config);
        commit('overview', overview);
        commit('sessionInfo', sessionInfo);
        commit('userOrganizations', userOrganizations);

        commit('loading', false);

        if (sessionInfo != null) {
            commit('sessionUserInfo', await getUserInfo(sessionInfo.userName));
            await convertSessionToToken();
        }
    },

    async loadOverview({ commit }) {
        commit('overview', await getOverview());
    },

    async loadOrganizations({ dispatch }) {
        dispatch('loadOverview');
    },

    async getAllTechnologies({ commit }) {
        await doAction(commit, 'allTechnologies', async() => (await getAllTechnologies()));
    },

    async getAllTechStacks({ commit }) {
        await doAction(commit, 'allTechStacks', async() => (await getAllTechStacks()));
    },

    async loadTechnology({ commit }, slug) {
        await doAction(commit, 'technology', async() => (await getTechnology(slug)));
    },

    async loadTechnologyStack({ commit }, slug) {
        await doAction(commit, 'technologyStack', async() => (await getTechnologyStack(slug)).result);
    },

    async getPageStats({ commit }, { type, slug, id }) {
        commit('pageStats', await getPageStats(type, slug, id));
    },

    async getUserInfo({ commit }, username) {
        await doAction(commit, 'userInfo', async() => await getUserInfo(username));
    },

    async loadUserFeed({ commit }) {
        await doAction(commit, 'sessionFeed', async() => await getUserFeed());
    },

    async loadUserOrganizations({ commit }) {
        await doAction(commit, 'userOrganizations', async() => await getUserOrganizations());
    },

    async addFavorite({ commit, state }, { type, id }) {
        if (state.sessionInfo == null)
            return;
        if (type == 'tech') {
            commit('addFavoriteTechnology', await addFavoriteTechnology(id));
        } else {
            commit('addFavoriteTechStack', await addFavoriteTechStack(id));
        }
        commit('sessionUserInfo', await getUserInfo(state.sessionInfo.userName));
    },

    async removeFavorite({ commit, state }, { type, id }) {
        if (state.sessionInfo == null)
            return;
        if (type == 'tech') {
            commit('removeFavoriteTechnology', id);
            await removeFavoriteTechnology(id);
        } else {
            commit('removeFavoriteTechStack', id);            
            await removeFavoriteTechStack(id);
        }
        commit('sessionUserInfo', await getUserInfo(state.sessionInfo.userName));
    },

    async loadOrganizationByIdIfNotExists({ commit, getters, dispatch }, orgId) {
        commit('orgById', orgId);
        if (getters.organization && getters.organization.id === orgId && getters.organization.full) return;
        await dispatch('loadOrganizationById', orgId);
    },
    
    async loadOrganizationById({ commit, dispatch }, orgId) {
        await doAction(commit, 'organization', async() => await getOrganizationById(orgId));
    },

    async loadOrganizationBySlugIfNotExists({ commit, getters, dispatch }, slug) {
        commit('orgBySlug', slug);
        if (getters.organization && getters.organization.slug === slug && getters.organization.full) return;
        await dispatch('loadOrganizationBySlug', slug);
    },
    
    async loadOrganizationBySlug({ commit, getters, state, dispatch }, slug) {
        await doAction(commit, 'organization', async() => await getOrganizationBySlug(slug));
    },

    async latestNewsPosts({ commit, getters, state }, query) {
        let { types, page, technologyIds } = query;

        const skip = page > 0 ? page * POSTS_PER_PAGE : 0;
    
        await doAction(commit, 'latestNewsPosts', async() => await queryLatestPosts(types, technologyIds, skip));
    },

    async latestOrganizationPosts({ commit, getters, state }, query) {
        if (!getters.organization) 
            return;

        let { types, page, categoryId } = query;

        const q = state.latestOrganizationPostsQuery;
        const repeatedQuery = q && q.organizationId === organizationId && q.types === types && q.page === page && q.categoryId === categoryId;
        if (repeatedQuery) return;
        commit('latestOrganizationPostsQuery', { organizationId, ...query });

        //clear existing search results
        await doAction(commit, 'latestOrganizationPosts', async() => ({ organizationId, posts: [] }));

        const organizationId = getters.organization.id;
        const skip = page > 0 ? page * POSTS_PER_PAGE : 0;
    
        await doAction(commit, 'latestOrganizationPosts', async() => ({ 
            organizationId, 
            posts: await queryLatestOrganizationsPosts(organizationId, types, categoryId, skip) 
        }));
    },

    async loadUserPostActivity({ commit, state }) {
        if (state.sessionInfo == null || state.userPostActivity != null)
            return;

        commit('userPostActivity', await getUserPostActivity());
    },

    async loadUserPostCommentVotes({ commit, state }, postId) {
        if (state.sessionInfo == null)
            return;

        commit('userPostCommentVotes', await getUserPostCommentVotes(postId));
    },

    async votePost({ commit, dispatch }, { postId, weight }) {
        commit('votePost', { postId, weight });
        await votePost(postId, weight);
    },

    async votePostComment({ commit, dispatch }, { postId, commentId, weight }) {
        commit('votePostComment', { postId, commentId, weight });
        await votePostComment(postId, commentId, weight);
    },

    async favoritePost({ commit, dispatch }, { postId }) {
        commit('favoritePost', { postId });
        await favoritePost(postId);
        commit('userPostActivity', await getUserPostActivity());
    },

    async loadPost({ commit }, postId) {
        const response = await getPost(postId);
        await commit('post', { ...response.post, comments:response.comments });
        var userIds = response.comments.map(x => x.userId);
        userIds.push(response.post.userId);
        var uniqueUserIds = Array.from(new Set(userIds));
        commit('usersKarma', await getUsersKarma(uniqueUserIds));
    },

    async loadUserKarma({ commit }, userIds) {
        commit('usersKarma', await getUsersKarma(userIds));
    },

    async loadTechnologyTiers({ state, commit }) {
        await doAction(commit, 'technologyTiers', async() => await getTechnologyTiers());
    },

    async loadTechnologyTiersIfNotExists({ state, dispatch }) {
        if ((!state.technologyTiers || state.technologyTiers.length == 0) && !state.loading) {
            dispatch('loadTechnologyTiers');
        }
    },

    async pinPostComment({ commit, dispatch }, { postId, commentId, pin }) {
        await pinPostComment(postId, commentId, pin);
        dispatch('loadPost', postId);
    },
};

const createStore = () => 
    new Vuex.Store({
        state,
        mutations,
        getters,
        actions
    });

export default createStore;
