import { appendQueryString, queryString } from "@servicestack/client";

const hasQuery = (qs) => qs && Object.keys(qs).length > 0;

const appendQuery = (route,qs) => hasQuery(qs) 
    ? appendQueryString(route,qs)
    : route;

export const routes = {
    formattingHelp: 'https://guides.github.com/features/mastering-markdown/',
    welcome: '/posts/5944/welcome',
    authGitHub: '/auth/github',
    authTwitter: '/auth/twitter',
    homeNews: '/',
    homeTop: '/top/',
    homeFavorites: '/favorites/',
    newStack: '/stacks/new',
    newTech: '/tech/new',
    homeTech: '/tech/',
    homeStacks: '/stacks/',
    newsTech: (slug) => `/?t=${slug}`,
    techTier: (tier) => `/tech?tier=${tier}`,
    organization: (slug) => `/organizations/${slug}`,
    organizationNews: (slug,qs=null) => appendQuery(`/${slug}`,qs),
    stack: (slug) => `/stacks/${slug}`,
    editStack: (slug) => `/stacks/${slug}/edit`,
    tech: (slug) => `/tech/${slug}`,
    editTech: (slug) => `/tech/${slug}/edit`,
    user: (userName) => `/users/${userName}`,
    userAvatar: (userName) => `/users/${userName}/avatar`,
    post: (postId, postSlug) => `/posts/${postId}/${postSlug}`,
    comment: (postId,commmentId) => `/comments/${postId}/${commmentId}`,
    techTag: (slug,organization) => organization ? `/?t=${slug}` : `/tech/${slug}`,
    sortOrderByField(url) {
        return url.indexOf('sort=new') >= 0
            ? '-id'
            : url.indexOf('sort=top') >= 0
                ? '-points'
                : null;
    },
    sort:(sort) => {
        const qs = queryString(location.href);
        if (qs['sort'] == sort) {
            delete qs['sort']; //toggle off
        } else {
            qs['sort'] = sort;
        }
        return appendQueryString(location.pathname, qs);
    },
    sortClass:(sort) => {
        const qs = queryString(location.href);
        return qs['sort'] === sort
            ? 'active'
            : null;
    },
};
