export const routes = {
  home: () => '/',
  top: () => '/top',

  // Technology routes
  tech: (slug?: string) => slug ? `/tech/${slug}` : '/tech',
  techNew: () => '/tech/new',
  techEdit: (slug: string) => `/tech/${slug}/edit`,

  // Stack routes
  stack: (slug?: string) => slug ? `/stacks/${slug}` : '/stacks',
  stackNew: () => '/stacks/new',
  stackEdit: (slug: string) => `/stacks/${slug}/edit`,

  // Organization routes
  organizations: () => '/organizations',
  organization: (slug: string) => `/organizations/${slug}`,
  organizationCategory: (slug: string, category: string) => `/${slug}/${category}`,

  // Post routes
  post: (id: number, slug: string) => `/posts/${id}/${slug}`,
  postComment: (postId: number, commentId: number) => `/comments/${postId}/${commentId}`,

  // User routes
  user: (id: number) => `/users/${id}`,

  // Auth
  login: (provider: string = 'github') => `/login/${provider}`,

  // Other
  favorites: () => '/favorites',
  news: () => '/news'
};

export default routes;
