import { appendQueryString } from "@servicestack/client";

const hasQuery = (qs) => qs && Object.keys(qs).length > 0;

const appendQuery = (route,qs) => hasQuery(qs) 
    ? appendQueryString(route,qs)
    : route;

export const routes = {
    formattingHelp: 'https://guides.github.com/features/mastering-markdown/',
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
};
