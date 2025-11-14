import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as gateway from '@/lib/api/gateway';

interface AppState {
  // Loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Session & Auth
  sessionInfo: any | null;
  setSessionInfo: (session: any | null) => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;

  // Config & Overview
  config: any;
  overview: any;
  setConfig: (config: any) => void;
  setOverview: (overview: any) => void;

  // Cached data
  technologies: any[];
  techStacks: any[];
  posts: Record<number, any>;
  organizations: any[];

  // User data
  favoriteTechnologyIds: number[];
  favoriteTechStackIds: number[];
  userVotes: Record<number, number>; // postId -> weight
  userCommentVotes: Record<number, number>; // commentId -> weight

  // Actions
  initialize: () => Promise<void>;
  loadTechnology: (slug: string) => Promise<any>;
  loadTechnologyStack: (slug: string) => Promise<any>;
  addFavoriteTechnology: (id: number) => Promise<void>;
  removeFavoriteTechnology: (id: number) => Promise<void>;
  addFavoriteTechStack: (id: number) => Promise<void>;
  removeFavoriteTechStack: (id: number) => Promise<void>;
  votePost: (id: number, weight: number) => Promise<void>;
  votePostComment: (postId: number, commentId: number, weight: number) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      loading: false,
      sessionInfo: null,
      config: null,
      overview: null,
      technologies: [],
      techStacks: [],
      posts: {},
      organizations: [],
      favoriteTechnologyIds: [],
      favoriteTechStackIds: [],
      userVotes: {},
      userCommentVotes: {},

      // Setters
      setLoading: (loading) => set({ loading }),
      setSessionInfo: (sessionInfo) => {
        set({
          sessionInfo,
          favoriteTechnologyIds: sessionInfo?.favoriteTechnologyIds || [],
          favoriteTechStackIds: sessionInfo?.favoriteTechStackIds || []
        });
      },
      setConfig: (config) => set({ config }),
      setOverview: (overview) => set({ overview }),

      // Computed
      isAuthenticated: () => get().sessionInfo !== null,
      isAdmin: () => {
        const roles = get().sessionInfo?.roles || [];
        return roles.includes('Admin');
      },

      // Initialize app
      initialize: async () => {
        set({ loading: true });
        try {
          const [config, overview, sessionInfo] = await Promise.all([
            gateway.getConfig(),
            gateway.getOverview(),
            gateway.getSessionInfo()
          ]);

          set({
            config,
            overview,
            sessionInfo,
            favoriteTechnologyIds: sessionInfo?.favoriteTechnologies?.map((t: any) => t.id) || [],
            favoriteTechStackIds: sessionInfo?.favoriteTechStacks?.map((s: any) => s.id) || [],
            loading: false
          });
        } catch (error) {
          console.error('Failed to initialize app:', error);
          set({ loading: false });
        }
      },

      // Load technology
      loadTechnology: async (slug: string) => {
        const tech = await gateway.getTechnology(slug);
        set((state) => ({
          technologies: [
            ...state.technologies.filter((t: any) => t.slug !== slug),
            tech
          ]
        }));
        return tech;
      },

      // Load tech stack
      loadTechnologyStack: async (slug: string) => {
        const stack = await gateway.getTechnologyStack(slug);
        set((state) => ({
          techStacks: [
            ...state.techStacks.filter((s: any) => s.slug !== slug),
            stack.result
          ]
        }));
        return stack.result;
      },

      // Add favorite technology
      addFavoriteTechnology: async (id: number) => {
        await gateway.addFavoriteTechnology(id);
        set((state) => ({
          favoriteTechnologyIds: [...state.favoriteTechnologyIds, id]
        }));
      },

      // Remove favorite technology
      removeFavoriteTechnology: async (id: number) => {
        await gateway.removeFavoriteTechnology(id);
        set((state) => ({
          favoriteTechnologyIds: state.favoriteTechnologyIds.filter(tid => tid !== id)
        }));
      },

      // Add favorite tech stack
      addFavoriteTechStack: async (id: number) => {
        await gateway.addFavoriteTechStack(id);
        set((state) => ({
          favoriteTechStackIds: [...state.favoriteTechStackIds, id]
        }));
      },

      // Remove favorite tech stack
      removeFavoriteTechStack: async (id: number) => {
        await gateway.removeFavoriteTechStack(id);
        set((state) => ({
          favoriteTechStackIds: state.favoriteTechStackIds.filter(tid => tid !== id)
        }));
      },

      // Vote on post
      votePost: async (id: number, weight: number) => {
        await gateway.votePost(id, weight);
        set((state) => ({
          userVotes: { ...state.userVotes, [id]: weight }
        }));
      },

      // Vote on post comment
      votePostComment: async (postId: number, commentId: number, weight: number) => {
        await gateway.votePostComment(postId, commentId, weight);
        set((state) => ({
          userCommentVotes: { ...state.userCommentVotes, [commentId]: weight }
        }));
      }
    }),
    {
      name: 'techstacks-storage',
      // Only persist specific keys
      partialize: (state) => ({
        sessionInfo: state.sessionInfo,
        favoriteTechnologyIds: state.favoriteTechnologyIds,
        favoriteTechStackIds: state.favoriteTechStackIds
      })
    }
  )
);
