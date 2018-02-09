import Vue from "vue";
import Vuex from "vuex";
import { 
    getConfig, 
    getOverview, 
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
} from "~/shared/gateway";
import { Overview } from "~/shared/dtos";
import { log, prettifyUrl } from "~/shared/utils";

const statsKey = (type,slug) => `${type}:${slug}`;

const state = {
    loading: false,
    sessionInfo: null,
    sessionFeed: null,
    favoriteTechnologies: [],
    favoriteTechStacks: [],
    allTiers: [],
    overview: {},
    allTechnologies: [],
    allTechnologiesTotal: 0,
    allTechStacks: [],
    allTechStacksTotal: 0,
    technologyMap: {},
    techstacksMap: {},
    pageStatsMap: {},
    userInfoMap: {},
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
    },
    sessionFeed(state, sessionFeed) {
        state.sessionFeed = sessionFeed;
    },
    config(state, config) {
        state.allTiers = config.allTiers;
    },
    overview(state, overview) {
        state.overview = overview;
    },
    allTechnologies(state, allTechnologies) {
        state.allTechnologies = allTechnologies.results;
        state.allTechnologiesTotal = allTechnologies.total;
    },
    allTechStacks(state, allTechStacks) {
        state.allTechStacks = allTechStacks.results;
        state.allTechStacksTotal = allTechStacks.total;
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
}

const getters = {
    loading: state => state.loading,
    isAuthenticated: state => state.sessionInfo != null,
    isAdmin: state => state.sessionInfo && (state.sessionInfo.roles || []).indexOf("Admin") >= 0,
    user: state => state.sessionInfo,
    sessionFeed: state => state.sessionFeed,
    favoriteTechnologies: state => state.favoriteTechnologies,
    favoriteTechStacks: state => state.favoriteTechStacks,
    isFavoriteTechnology: state => (slug) => state.favoriteTechnologies.some(x => x.slug === slug),
    isFavoriteTechStack: state => (slug) => state.favoriteTechStacks.some(x => x.slug === slug),
    allTiers: state => state.allTiers,
    allTechnologies: state => state.allTechnologies,
    allTechnologiesTotal: state => state.allTechnologiesTotal,
    allTechStacks: state => state.allTechStacks,
    allTechStacksTotal: state => state.allTechStacksTotal,
    overview: state => state.overview,
    topTechnologies: state => state.overview.topTechnologies,
    topUsers: state => state.overview.topUsers,
    topTechnologiesByTier: (state) => (tier) => state.overview.topTechnologiesByTier[tier],
    getTechnology: state => slug => state.technologyMap[slug],
    getTechnologyStack: state => slug => state.techstacksMap[slug],
    getPageStats: state => (type,slug) => state.pageStatsMap[statsKey(type,slug)],
    getUserInfo: state => userName => state.userInfoMap[userName],
    canChangeTechnology: (state,getters) => tech => getters.isAuthenticated && 
        (!tech.isLocked || state.sessionInfo.userAuthId == tech.ownerId || getters.isAdmin),
    canChangeTechStack: (state,getters) => stack => getters.isAuthenticated && 
        (!stack.isLocked || state.sessionInfo.userAuthId == stack.ownerId || getters.isAdmin),
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
        const config = getConfig();
        const overview = getOverview();
        const sessionInfo = await getSessionInfo();
        commit('config', await config);
        commit('overview', await overview);
        commit('sessionInfo', sessionInfo);

        if (sessionInfo != null) {
            commit('sessionUserInfo', await getUserInfo(sessionInfo.userName));
            await convertSessionToToken();
        }
    },

    async getAllTechnologies({ commit }) {
        await doAction(commit, 'allTechnologies', async() => (await getAllTechnologies()));
    },

    async getAllTechStacks({ commit }) {
        await doAction(commit, 'allTechStacks', async() => (await getAllTechStacks()));
    },

    async getTechnology({ commit }, slug) {
        await doAction(commit, 'technology', async() => (await getTechnology(slug)));
    },

    async getTechnologyStack({ commit }, slug) {
        await doAction(commit, 'technologyStack', async() => (await getTechnologyStack(slug)).result);
    },

    async getPageStats({ commit }, { type, slug, id }) {
        commit('pageStats', await getPageStats(type, slug, id));
    },

    async getUserInfo({ commit }, username) {
        await doAction(commit, 'userInfo', async() => await getUserInfo(username));
    },

    async getUserFeed({ commit }) {
        await doAction(commit, 'sessionFeed', async() => await getUserFeed());
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
};

const createStore = () => 
    new Vuex.Store({
        state,
        mutations,
        getters,
        actions
    });

export default createStore;
