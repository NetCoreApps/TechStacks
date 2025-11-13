# TechStacks: Nuxt.js to Next.js 16 Migration Plan

## Executive Summary

This document outlines a comprehensive plan to migrate the TechStacks web application from **Nuxt.js 1.4.5 + Vue 2 + Vuetify 1.0** to **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**, while maintaining full compatibility with the existing C# ServiceStack backend.

**Current Stack:**
- Frontend: Nuxt.js 1.4.5, Vue 2, Vuetify 1.0, Tailwind CSS v3
- Backend: ASP.NET Core 8.0, ServiceStack v8, PostgreSQL
- API Client: @servicestack/client 2.0.17

**Target Stack:**
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- Backend: **Unchanged** - ASP.NET Core 8.0, ServiceStack v8
- API Client: @servicestack/client (same, with TypeScript)

---

## 🎯 CRITICAL: ALL DATA FLOWS THROUGH EXISTING C# APIS

**This Next.js application is a pure UI layer with ZERO independent data sources.**

### Data Source Architecture

✅ **What the Next.js app DOES:**
- Renders beautiful, modern React UI
- Handles client-side routing and navigation
- Manages UI state (loading, modals, forms)
- Caches API responses for performance
- Handles authentication session display

❌ **What the Next.js app DOES NOT do:**
- ❌ Direct database access
- ❌ Independent REST APIs
- ❌ GraphQL layer
- ❌ Custom data processing/transformation
- ❌ Bypassing ServiceStack in any way

### Every Single Piece of Data Comes From C# ServiceStack APIs

| Data Type | Source API Endpoint | Section Reference |
|-----------|-------------------|-------------------|
| **Technologies** | `GetTechnology`, `GetAllTechnologies`, `QueryTechnology` | Section 4.2 |
| **Tech Stacks** | `GetTechnologyStack`, `GetAllTechnologyStacks` | Section 4.2 |
| **Posts** | `QueryPosts`, `GetPost`, `CreatePost`, `UpdatePost` | Section 4.2 |
| **Comments** | `GetPostComments`, `CreatePostComment`, `UpdatePostComment` | Section 4.2 |
| **Organizations** | `GetOrganizationBySlug`, `GetOrganizationById` | Section 4.2 |
| **Users** | `GetUserInfo`, `GetUserFeed`, `GetUserOrganizations` | Section 4.2 |
| **Authentication** | `Authenticate`, `SessionInfo` | Section 6 |
| **Favorites** | `AddFavoriteTechnology`, `RemoveFavoriteTechnology` | Section 4.2 |
| **Votes** | `UserPostVote`, `UserPostCommentVote` | Section 4.2 |
| **Search** | `QueryTechnology`, `QueryTechStacks`, `QueryPosts` | Section 4.2 |
| **Configuration** | `GetConfig`, `Overview` | Section 4.2 |

### Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  Next.js React Components (UI Only)             │
│  ├─ Display data from props/state               │
│  ├─ Handle user interactions                    │
│  └─ Trigger API calls via gateway               │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  Zustand Store (Client-side Cache Only)         │
│  ├─ Caches API responses temporarily            │
│  ├─ Stores user session from C# API             │
│  └─ NO independent data processing              │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  Gateway Layer (lib/api/gateway.ts)             │
│  ├─ Thin wrapper around JsonServiceClient       │
│  ├─ Maps function calls to DTO requests         │
│  └─ NO business logic                           │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  @servicestack/client (JsonServiceClient)       │
│  ├─ HTTP calls to /api/* endpoints              │
│  ├─ Serializes DTOs to JSON                     │
│  └─ Handles authentication cookies              │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  C# ServiceStack Backend ← ALL DATA HERE        │
│  ├─ ServiceStack Services (business logic)      │
│  ├─ AutoQuery (dynamic queries)                 │
│  ├─ Validation & Authorization                  │
│  ├─ OrmLite + Entity Framework                  │
│  └─ PostgreSQL Database                         │
└─────────────────────────────────────────────────┘
```

### API Integration Guarantee

**Every API call in the Next.js app follows this pattern:**

```typescript
// 1. Import typed DTO from C# project
import { GetTechnology } from '@/shared/dtos';

// 2. Import gateway method (wrapper around JsonServiceClient)
import * as gateway from '@/lib/api/gateway';

// 3. Call C# API - no alternative data sources
export async function loadTechnology(slug: string) {
  // This calls: https://techstacks.io/api/GetTechnology?slug=typescript
  const response = await gateway.getTechnology(slug);
  return response.result; // Data comes directly from C# API
}
```

**The DTOs (`shared/dtos.ts`) are auto-generated from the C# project** - ensuring the Next.js app cannot deviate from the ServiceStack API contract.

---

## Table of Contents

1. [Project Structure & Setup](#1-project-structure--setup)
2. [Technology Stack & Dependencies](#2-technology-stack--dependencies)
3. [Architecture & Design Patterns](#3-architecture--design-patterns)
4. [API Integration Strategy](#4-api-integration-strategy)
5. [State Management](#5-state-management)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Routing & Navigation](#7-routing--navigation)
8. [Page Migration Matrix](#8-page-migration-matrix)
9. [Component Migration Strategy](#9-component-migration-strategy)
10. [Styling & UI Framework](#10-styling--ui-framework)
11. [Build & Deployment](#11-build--deployment)
12. [Testing Strategy](#12-testing-strategy)
13. [Migration Phases](#13-migration-phases)
14. [Risk Assessment & Mitigation](#14-risk-assessment--mitigation)

---

## 1. Project Structure & Setup

### 1.1 New Next.js Directory Structure

```
TechStacks/
├── TechStacks/                      # Existing C# project (unchanged)
│   ├── wwwroot/                     # Build output destination
│   ├── TechStacks.csproj
│   ├── Program.cs
│   └── ...
│
├── TechStacks.ServiceModel/         # Existing (unchanged)
├── TechStacks.ServiceInterface/     # Existing (unchanged)
├── TechStacks.Tests/                # Existing (unchanged)
│
└── nextjs-app/                      # NEW: Next.js 16 application
    ├── src/
    │   ├── app/                     # Next.js App Router (pages)
    │   │   ├── layout.tsx          # Root layout
    │   │   ├── page.tsx            # Home page (/)
    │   │   ├── top/                # /top route
    │   │   ├── tech/               # /tech routes
    │   │   ├── stacks/             # /stacks routes
    │   │   ├── organizations/      # /organizations routes
    │   │   ├── users/              # /users routes
    │   │   ├── posts/              # /posts routes
    │   │   ├── comments/           # /comments routes
    │   │   ├── favorites/          # /favorites routes
    │   │   ├── news/               # /news routes
    │   │   ├── login/              # /login routes
    │   │   └── [slug]/             # Dynamic org routes
    │   │
    │   ├── components/              # React components
    │   │   ├── ui/                 # Base UI components
    │   │   ├── forms/              # Form components
    │   │   ├── posts/              # Post-related components
    │   │   ├── tech/               # Technology components
    │   │   ├── stacks/             # Stack components
    │   │   ├── organizations/      # Organization components
    │   │   └── layout/             # Layout components
    │   │
    │   ├── lib/                    # Utilities & configuration
    │   │   ├── api/                # API client & gateway
    │   │   │   ├── client.ts       # JsonServiceClient setup
    │   │   │   └── gateway.ts      # API service methods
    │   │   ├── hooks/              # Custom React hooks
    │   │   ├── stores/             # State management (Zustand)
    │   │   ├── utils/              # Utility functions
    │   │   └── types/              # TypeScript types
    │   │
    │   ├── shared/                 # Shared with backend
    │   │   └── dtos.ts             # ServiceStack DTOs (copied from C#)
    │   │
    │   └── styles/                 # Global styles
    │       ├── globals.css         # Tailwind imports + global styles
    │       ├── typography.css      # Typography styles
    │       └── markdown.css        # GitHub Flavored Markdown
    │
    ├── public/                     # Static assets
    │   ├── favicon.ico
    │   └── images/
    │
    ├── next.config.ts              # Next.js configuration
    ├── tailwind.config.ts          # Tailwind CSS v4 config
    ├── tsconfig.json               # TypeScript configuration
    ├── package.json                # Dependencies
    └── .env.local                  # Environment variables
```

### 1.2 Initial Setup Commands

```bash
# Create Next.js 16 app with TypeScript and Tailwind
cd TechStacks
npx create-next-app@16 nextjs-app --typescript --tailwind --app --src-dir

# Navigate to new app
cd nextjs-app

# Install dependencies
npm install @servicestack/client
npm install zustand
npm install date-fns
npm install clsx tailwind-merge
npm install react-markdown remark-gfm rehype-raw
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-checkbox
npm install lucide-react

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D eslint-config-next
npm install -D prettier eslint-config-prettier
```

---

## 2. Technology Stack & Dependencies

### 2.1 Core Framework

| Category | Current (Nuxt) | New (Next.js) | Reason |
|----------|---------------|---------------|---------|
| **Framework** | Nuxt.js 1.4.5 | Next.js 16 | Modern, actively maintained, React Server Components |
| **UI Library** | Vue 2 | React 19 | Latest React with concurrent rendering |
| **Language** | JavaScript + TypeScript | TypeScript (strict) | Full type safety |
| **CSS Framework** | Tailwind CSS v3 + Vuetify 1.0 | Tailwind CSS v4 | Modern utility-first styling |
| **Node Version** | 16.x | 20.x LTS | Current LTS version |

### 2.2 Key Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@servicestack/client": "^2.0.17",
    "zustand": "^5.0.0",
    "date-fns": "^4.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.6.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-raw": "^7.0.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "@radix-ui/react-select": "^2.1.0",
    "@radix-ui/react-checkbox": "^1.1.0",
    "lucide-react": "^0.460.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5.7",
    "tailwindcss": "^4.0.0",
    "postcss": "^8",
    "eslint": "^9",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.4.0"
  }
}
```

### 2.3 Removed Dependencies

These Nuxt/Vue-specific packages will no longer be needed:
- `nuxt` (replaced by Next.js)
- `vuetify` (replaced by Tailwind + Radix UI)
- `@nuxtjs/proxy` (replaced by Next.js rewrites)
- `babel-eslint` (replaced by TypeScript ESLint)
- `eslint-plugin-vue` (replaced by eslint-config-next)

---

## 3. Architecture & Design Patterns

### 3.1 Architectural Approach

**Next.js 16 App Router Architecture:**

```
┌─────────────────────────────────────────────────┐
│           Browser / Client                      │
├─────────────────────────────────────────────────┤
│  React 19 Components (Client Components)        │
│  ├─ Page Components (app/*/page.tsx)           │
│  ├─ Interactive UI Components                   │
│  └─ Client-side State (Zustand)                │
├─────────────────────────────────────────────────┤
│  Next.js Server Components (RSC)                │
│  ├─ Layout Components (app/*/layout.tsx)       │
│  ├─ Data Fetching (Server Side)                │
│  └─ SEO Metadata Generation                     │
├─────────────────────────────────────────────────┤
│  Next.js API Routes (Optional)                  │
│  └─ /api/* for proxying if needed              │
├─────────────────────────────────────────────────┤
│  ServiceStack JsonServiceClient                 │
│  └─ HTTP calls to C# backend                   │
├─────────────────────────────────────────────────┤
│  ASP.NET Core 8.0 + ServiceStack                │
│  ├─ ServiceStack Services                       │
│  ├─ Business Logic                              │
│  └─ PostgreSQL Database                         │
└─────────────────────────────────────────────────┘
```

### 3.2 Design Patterns

#### **3.2.1 Server Components vs Client Components**

**Use Server Components (RSC) for:**
- Initial data fetching (SEO-friendly)
- Static layouts and navigation
- Non-interactive content display
- Metadata generation

**Use Client Components for:**
- Interactive forms and inputs
- User authentication state
- Real-time updates (voting, favorites)
- Modal dialogs and dropdowns
- Client-side filtering/sorting

**Example Pattern:**
```tsx
// app/tech/[slug]/page.tsx - Server Component (default)
export default async function TechnologyPage({ params }) {
  // Fetch initial data on server for SEO
  const tech = await fetchTechnology(params.slug);

  return (
    <div>
      <TechnologyHeader tech={tech} /> {/* Server component */}
      <TechnologyComments techId={tech.id} /> {/* Client component */}
    </div>
  );
}

// components/tech/TechnologyComments.tsx - Client Component
'use client'
export function TechnologyComments({ techId }: { techId: number }) {
  const [comments, setComments] = useState([]);
  // Interactive comment functionality
}
```

#### **3.2.2 State Management Strategy**

**Three-tier state approach:**

1. **Server State** (React Query alternative with Zustand)
   - API response caching
   - Background refetching
   - Optimistic updates

2. **Global Client State** (Zustand)
   - User session/authentication
   - User favorites and votes
   - Global UI state (modals, shortcuts)

3. **Local Component State** (useState/useReducer)
   - Form inputs
   - UI toggles
   - Component-specific state

#### **3.2.3 API Integration Pattern**

**Gateway Service Layer:**
```typescript
// lib/api/gateway.ts
import { JsonServiceClient } from '@servicestack/client';
import { GetTechnology, CreatePost } from '@/shared/dtos';

const client = new JsonServiceClient('/');

export const gateway = {
  // Technology APIs
  getTechnology: (slug: string) =>
    client.get(new GetTechnology({ slug })),

  getAllTechnologies: () =>
    client.get(new GetAllTechnologies()),

  // Post APIs with error handling
  createPost: async (args, image?) => {
    try {
      const request = new CreatePost();
      Object.assign(request, args);
      const body = image ? toFormData({ ...args, image }) : args;
      return await client.postBody(request, body);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
```

**Custom Hooks for Data Fetching:**
```typescript
// lib/hooks/useTechnology.ts
export function useTechnology(slug: string) {
  const [tech, setTech] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gateway.getTechnology(slug)
      .then(setTech)
      .finally(() => setLoading(false));
  }, [slug]);

  return { tech, loading };
}
```

---

## 4. API Integration Strategy

### 4.1 JsonServiceClient Setup

**Configuration: `lib/api/client.ts`**

```typescript
import { JsonServiceClient } from '@servicestack/client';

// Base URL configuration
const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side: use internal URL
    return process.env.INTERNAL_API_URL || 'https://localhost:5001';
  }
  // Client-side: use relative path (served by same origin)
  return '/';
};

export const client = new JsonServiceClient(getBaseUrl());

// Configure global settings
client.bearerToken = null; // Set dynamically after auth
client.onAuthenticationRequired = () => {
  // Redirect to login
  if (typeof window !== 'undefined') {
    window.location.href = '/login/github';
  }
};
```

### 4.2 Gateway Service Layer

**Structure: `lib/api/gateway.ts`**

This file replicates the functionality of `TechStacks/src/shared/gateway.js` but in TypeScript.

```typescript
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
  request.userName = userName;
  request.password = password;

  const response = await client.post(request);

  // Set bearer token for subsequent requests
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
  client.bearerToken = null;
};

// ============================================
// TECHNOLOGIES
// ============================================

export const getTechnology = async (slug: string) => {
  const request = new dtos.GetTechnology();
  request.slug = slug;
  return await client.get(request);
};

export const getAllTechnologies = async () => {
  return await client.get(new dtos.GetAllTechnologies());
};

export const queryTechnology = async (query: any) => {
  return await client.get(
    new dtos.QueryTechnology(),
    { include: 'total', ...query }
  );
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
  const request = new dtos.DeleteTechnology();
  request.id = id;
  return await client.delete(request);
};

// ============================================
// TECH STACKS
// ============================================

export const getTechnologyStack = async (slug: string) => {
  const request = new dtos.GetTechnologyStack();
  request.slug = slug;
  return await client.get(request);
};

export const getAllTechnologyStacks = async () => {
  return await client.get(new dtos.GetAllTechnologyStacks());
};

export const createTechnologyStack = async (args: any, screenshot?: File) => {
  const request = new dtos.CreateTechnologyStack();
  const body = toFormData({ ...args, screenshot });
  return (await client.postBody(request, body)).result;
};

export const updateTechnologyStack = async (args: any, screenshot?: File) => {
  const request = new dtos.UpdateTechnologyStack();
  const body = toFormData({ ...args, screenshot });
  return (await client.putBody(request, body)).result;
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

export const getPost = async (id: number) => {
  const request = new dtos.GetPost();
  request.id = id;
  return await client.get(request);
};

export const createPost = async (args: any, image?: File) => {
  const request = new dtos.CreatePost();
  const body = toFormData({ ...args, image });
  return (await client.postBody(request, body)).result;
};

export const updatePost = async (args: any, image?: File) => {
  const request = new dtos.UpdatePost();
  const body = toFormData({ ...args, image });
  return (await client.putBody(request, body)).result;
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
  return await client.put(request);
};

export const favoritePost = async (id: number) => {
  const request = new dtos.UserPostFavorite();
  request.id = id;
  return await client.put(request);
};

// ============================================
// COMMENTS
// ============================================

export const createPostComment = async (args: any) => {
  const request = new dtos.CreatePostComment();
  Object.assign(request, args);
  return (await client.post(request)).result;
};

export const votePostComment = async (id: number, weight: number) => {
  const request = new dtos.UserPostCommentVote();
  request.id = id;
  request.weight = weight;
  return await client.put(request);
};

// ============================================
// ORGANIZATIONS
// ============================================

export const getOrganizationBySlug = async (slug: string) => {
  const request = new dtos.GetOrganizationBySlug();
  request.slug = slug;
  return await client.get(request);
};

export const createOrganization = async (args: any) => {
  const request = new dtos.CreateOrganization();
  Object.assign(request, args);
  return (await client.post(request)).result;
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

export const getUserInfo = async (userName: string) => {
  const request = new dtos.GetUserInfo();
  request.userName = userName;
  return await client.get(request);
};

// Error handling helper
export function handleApiError(error: any) {
  if (error.responseStatus) {
    return {
      message: error.responseStatus.message,
      errors: error.responseStatus.errors || []
    };
  }
  return { message: error.message || 'An error occurred' };
}
```

### 4.3 DTO Integration

**Copy DTOs: `shared/dtos.ts`**

```bash
# Copy the generated DTOs from the Nuxt project
cp TechStacks/src/shared/dtos.ts nextjs-app/src/shared/dtos.ts
```

**Update DTO Generation Script in C# project:**

```json
// TechStacks/package.json - Update dtos script
{
  "scripts": {
    "dtos": "cd src/shared && x ts && tsc -m ES6 dtos.ts && cp dtos.ts ../../nextjs-app/src/shared/dtos.ts"
  }
}
```

This ensures DTOs are automatically synced between projects.

### 4.4 Next.js API Proxy Configuration

**Configuration: `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Rewrite API requests to C# backend during development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:5001/api/:path*'
      },
      {
        source: '/auth/:path*',
        destination: 'https://localhost:5001/auth/:path*'
      },
      {
        source: '/users/:id/avatar',
        destination: 'https://localhost:5001/users/:id/avatar'
      }
    ];
  },

  // Production build output to C# wwwroot
  output: 'export', // Static export
  distDir: '../TechStacks/wwwroot',

  // Image optimization configuration
  images: {
    unoptimized: true // Required for static export
  },

  // Trailing slashes for compatibility
  trailingSlash: true
};

export default nextConfig;
```

---

## 5. State Management

### 5.1 Zustand Store Architecture

**Why Zustand:**
- Lightweight (1kb vs Redux's 11kb)
- No boilerplate (no actions/reducers)
- TypeScript-first
- Works seamlessly with React 19
- Easy to test

### 5.2 Store Structure

**Main Store: `lib/stores/useAppStore.ts`**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as gateway from '@/lib/api/gateway';
import type { SessionInfo, Technology, TechnologyStack, Post } from '@/shared/dtos';

interface AppState {
  // Loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Session & Auth
  sessionInfo: SessionInfo | null;
  setSessionInfo: (session: SessionInfo | null) => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;

  // Config & Overview
  config: any;
  overview: any;
  setConfig: (config: any) => void;
  setOverview: (overview: any) => void;

  // Cached data
  technologies: Technology[];
  techStacks: TechnologyStack[];
  posts: Record<number, Post>;
  organizations: any[];

  // User data
  favoriteTechnologyIds: number[];
  favoriteTechStackIds: number[];
  userVotes: Record<number, number>; // postId -> weight
  userCommentVotes: Record<number, number>; // commentId -> weight

  // Actions
  initialize: () => Promise<void>;
  loadTechnology: (slug: string) => Promise<Technology>;
  loadTechnologyStack: (slug: string) => Promise<TechnologyStack>;
  addFavoriteTechnology: (id: number) => Promise<void>;
  removeFavoriteTechnology: (id: number) => Promise<void>;
  votePost: (id: number, weight: number) => Promise<void>;
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
            favoriteTechnologyIds: sessionInfo?.favoriteTechnologyIds || [],
            favoriteTechStackIds: sessionInfo?.favoriteTechStackIds || [],
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
            ...state.technologies.filter(t => t.slug !== slug),
            tech.result
          ]
        }));
        return tech.result;
      },

      // Load tech stack
      loadTechnologyStack: async (slug: string) => {
        const stack = await gateway.getTechnologyStack(slug);
        set((state) => ({
          techStacks: [
            ...state.techStacks.filter(s => s.slug !== slug),
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

      // Vote on post
      votePost: async (id: number, weight: number) => {
        await gateway.votePost(id, weight);
        set((state) => ({
          userVotes: { ...state.userVotes, [id]: weight }
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
```

### 5.3 Using the Store in Components

**Example: Favorite Technology Button**

```tsx
'use client'

import { useAppStore } from '@/lib/stores/useAppStore';

export function FavoriteButton({ techId }: { techId: number }) {
  const {
    favoriteTechnologyIds,
    addFavoriteTechnology,
    removeFavoriteTechnology,
    isAuthenticated
  } = useAppStore();

  const isFavorite = favoriteTechnologyIds.includes(techId);

  const toggleFavorite = async () => {
    if (!isAuthenticated()) {
      // Redirect to login
      window.location.href = '/login/github';
      return;
    }

    if (isFavorite) {
      await removeFavoriteTechnology(techId);
    } else {
      await addFavoriteTechnology(techId);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? '★' : '☆'} Favorite
    </button>
  );
}
```

---

## 6. Authentication & Authorization

### 6.1 Authentication Flow

**OAuth Flow (GitHub):**

1. User clicks "Sign in with GitHub"
2. Redirect to `/login/github`
3. C# backend handles OAuth redirect
4. Backend sets authentication cookie
5. Client fetches session info
6. Store session in Zustand

### 6.2 Auth Provider Component

**Component: `components/providers/AuthProvider.tsx`**

```tsx
'use client'

import { useEffect } from 'react';
import { useAppStore } from '@/lib/stores/useAppStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAppStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
```

**Root Layout: `app/layout.tsx`**

```tsx
import { AuthProvider } from '@/components/providers/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 6.3 Protected Routes

**Hook: `lib/hooks/useRequireAuth.ts`**

```typescript
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/stores/useAppStore';

export function useRequireAuth() {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login/github');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
}
```

**Usage in page:**

```tsx
'use client'

import { useRequireAuth } from '@/lib/hooks/useRequireAuth';

export default function FavoritesPage() {
  const isAuthenticated = useRequireAuth();

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return <div>Your Favorites</div>;
}
```

### 6.4 Role-Based Access Control

**Hook: `lib/hooks/useAuthorization.ts`**

```typescript
import { useAppStore } from '@/lib/stores/useAppStore';

export function useAuthorization() {
  const { sessionInfo, isAdmin } = useAppStore();

  const canEditTechnology = (tech: Technology) => {
    if (!sessionInfo) return false;
    if (isAdmin()) return true;
    if (tech.isLocked) return false;
    return sessionInfo.userAuthId === tech.ownerId;
  };

  const canEditTechStack = (stack: TechnologyStack) => {
    if (!sessionInfo) return false;
    if (isAdmin()) return true;
    if (stack.isLocked) return false;
    return sessionInfo.userAuthId === stack.ownerId;
  };

  const isOrganizationModerator = (org: Organization) => {
    if (isAdmin()) return true;
    const member = org.members?.find(m => m.userId === sessionInfo?.userId);
    return member?.isModerator || false;
  };

  return {
    canEditTechnology,
    canEditTechStack,
    isOrganizationModerator,
    isAdmin
  };
}
```

---

## 7. Routing & Navigation

### 7.1 Route Mapping (Nuxt → Next.js)

| Nuxt.js Route | Next.js App Router Route | File Path |
|---------------|-------------------------|-----------|
| `/` | `/` | `app/page.tsx` |
| `/top` | `/top` | `app/top/page.tsx` |
| `/tech` | `/tech` | `app/tech/page.tsx` |
| `/tech/new` | `/tech/new` | `app/tech/new/page.tsx` |
| `/tech/:slug` | `/tech/[slug]` | `app/tech/[slug]/page.tsx` |
| `/tech/:slug/edit` | `/tech/[slug]/edit` | `app/tech/[slug]/edit/page.tsx` |
| `/stacks` | `/stacks` | `app/stacks/page.tsx` |
| `/stacks/new` | `/stacks/new` | `app/stacks/new/page.tsx` |
| `/stacks/:slug` | `/stacks/[slug]` | `app/stacks/[slug]/page.tsx` |
| `/stacks/:slug/edit` | `/stacks/[slug]/edit` | `app/stacks/[slug]/edit/page.tsx` |
| `/organizations` | `/organizations` | `app/organizations/page.tsx` |
| `/organizations/:slug` | `/organizations/[slug]` | `app/organizations/[slug]/page.tsx` |
| `/favorites` | `/favorites` | `app/favorites/page.tsx` |
| `/news` | `/news` | `app/news/page.tsx` |
| `/users/:id` | `/users/[id]` | `app/users/[id]/page.tsx` |
| `/posts/:id/:slug` | `/posts/[id]/[slug]` | `app/posts/[id]/[slug]/page.tsx` |
| `/comments/:postid/:id` | `/comments/[postid]/[id]` | `app/comments/[postid]/[id]/page.tsx` |
| `/login/:provider` | `/login/[provider]` | `app/login/[provider]/page.tsx` |
| `/:slug` | `/[slug]` | `app/[slug]/page.tsx` |
| `/:slug/:category` | `/[slug]/[category]` | `app/[slug]/[category]/page.tsx` |

### 7.2 Navigation Helpers

**Utilities: `lib/utils/routes.ts`**

```typescript
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
  organization: (slug?: string) => slug ? `/organizations/${slug}` : '/organizations',
  organizationCategory: (slug: string, category: string) => `/${slug}/${category}`,

  // Post routes
  post: (id: number, slug: string) => `/posts/${id}/${slug}`,

  // User routes
  user: (id: number) => `/users/${id}`,

  // Auth
  login: (provider: string = 'github') => `/login/${provider}`,

  // Other
  favorites: () => '/favorites',
  news: () => '/news'
};
```

**Usage in components:**

```tsx
import Link from 'next/link';
import { routes } from '@/lib/utils/routes';

export function TechnologyCard({ tech }) {
  return (
    <Link href={routes.tech(tech.slug)}>
      {tech.name}
    </Link>
  );
}
```

### 7.3 Metadata Generation

**Example: Dynamic Metadata for Technology Page**

```typescript
// app/tech/[slug]/page.tsx
import { Metadata } from 'next';
import { gateway } from '@/lib/api/gateway';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tech = await gateway.getTechnology(slug);

  return {
    title: `${tech.result.name} - TechStacks`,
    description: tech.result.description,
    openGraph: {
      title: tech.result.name,
      description: tech.result.description,
      images: tech.result.logoUrl ? [tech.result.logoUrl] : []
    }
  };
}

export default async function TechnologyPage({ params }: Props) {
  const { slug } = await params;
  const tech = await gateway.getTechnology(slug);

  return (
    <div>
      <h1>{tech.result.name}</h1>
      {/* ... */}
    </div>
  );
}
```

---

## 8. Page Migration Matrix

### 8.1 Complete Page Inventory

| # | Nuxt Page | Next.js Route | Priority | Complexity | Estimated Hours |
|---|-----------|--------------|----------|------------|----------------|
| 1 | `pages/index.vue` | `app/page.tsx` | Critical | High | 8h |
| 2 | `pages/top/index.vue` | `app/top/page.tsx` | High | Medium | 4h |
| 3 | `pages/tech/index.vue` | `app/tech/page.tsx` | Critical | Medium | 6h |
| 4 | `pages/tech/new.vue` | `app/tech/new/page.tsx` | High | Medium | 4h |
| 5 | `pages/tech/_slug/index.vue` | `app/tech/[slug]/page.tsx` | Critical | High | 8h |
| 6 | `pages/tech/_slug/edit.vue` | `app/tech/[slug]/edit/page.tsx` | High | High | 6h |
| 7 | `pages/stacks/index.vue` | `app/stacks/page.tsx` | Critical | Medium | 6h |
| 8 | `pages/stacks/new.vue` | `app/stacks/new/page.tsx` | High | High | 6h |
| 9 | `pages/stacks/_slug/index.vue` | `app/stacks/[slug]/page.tsx` | Critical | High | 8h |
| 10 | `pages/stacks/_slug/edit.vue` | `app/stacks/[slug]/edit/page.tsx` | High | High | 6h |
| 11 | `pages/organizations/index.vue` | `app/organizations/page.tsx` | Medium | Medium | 4h |
| 12 | `pages/organizations/_slug/index.vue` | `app/organizations/[slug]/page.tsx` | High | High | 10h |
| 13 | `pages/favorites/index.vue` | `app/favorites/page.tsx` | Medium | Medium | 4h |
| 14 | `pages/news/index.vue` | `app/news/page.tsx` | Medium | Low | 3h |
| 15 | `pages/users/_id.vue` | `app/users/[id]/page.tsx` | Medium | Medium | 5h |
| 16 | `pages/posts/_id/_postslug.vue` | `app/posts/[id]/[slug]/page.tsx` | High | High | 8h |
| 17 | `pages/comments/_postid/_id.vue` | `app/comments/[postid]/[id]/page.tsx` | Low | Medium | 4h |
| 18 | `pages/login/_provider.vue` | `app/login/[provider]/page.tsx` | Critical | Low | 2h |
| 19 | `pages/_slug/index.vue` | `app/[slug]/page.tsx` | Medium | High | 6h |
| 20 | `pages/_slug/_category.vue` | `app/[slug]/[category]/page.tsx` | Low | Medium | 4h |

**Total Estimated Hours: 112 hours (~14-16 days for 1 developer)**

### 8.2 Page Migration Details

#### **8.2.1 Home Page (`pages/index.vue` → `app/page.tsx`)**

**Current Functionality:**
- News feed with latest posts
- Technology filtering
- Post type filtering (Announcement, Post, Showcase, etc.)
- Sorting options
- Infinite scroll/pagination
- Keyboard shortcuts (j/k navigation)

**Migration Strategy:**
```tsx
// app/page.tsx - Server Component
import { NewsFeed } from '@/components/posts/NewsFeed';
import { gateway } from '@/lib/api/gateway';

export default async function HomePage() {
  // Initial data fetch (SSR for SEO)
  const initialPosts = await gateway.queryPosts({ take: 50 });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <NewsFeed initialPosts={initialPosts} />
    </div>
  );
}

// components/posts/NewsFeed.tsx - Client Component
'use client'
export function NewsFeed({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [filters, setFilters] = useState({});
  // ... rest of interactive logic
}
```

#### **8.2.2 Technology Detail (`tech/_slug/index.vue` → `tech/[slug]/page.tsx`)**

**Current Functionality:**
- Technology information display
- Comments section
- Related posts
- Edit/delete buttons (for authorized users)
- Favorite button
- Technology stacks using this tech

**Migration Strategy:**
```tsx
// app/tech/[slug]/page.tsx
import { Metadata } from 'next';
import { gateway } from '@/lib/api/gateway';
import { TechnologyHeader } from '@/components/tech/TechnologyHeader';
import { TechnologyComments } from '@/components/tech/TechnologyComments';
import { TechnologyStacks } from '@/components/tech/TechnologyStacks';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await gateway.getTechnology(slug);
  const tech = response.result;

  return {
    title: `${tech.name} - TechStacks`,
    description: tech.description
  };
}

export default async function TechnologyPage({ params }: Props) {
  const { slug } = await params;
  const response = await gateway.getTechnology(slug);
  const tech = response.result;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Server-rendered header for SEO */}
      <TechnologyHeader tech={tech} />

      {/* Client components for interactivity */}
      <TechnologyComments techId={tech.id} />
      <TechnologyStacks techId={tech.id} />
    </div>
  );
}
```

#### **8.2.3 Organization Detail (`organizations/_slug/index.vue` → `organizations/[slug]/page.tsx`)**

**Current Functionality (most complex page - 10+ sections):**
- Organization info card
- Member list with roles
- Post feed with moderation
- Category management
- Label management
- Post creation form
- Subscribe/unsubscribe
- Moderator-only sections
- Admin-only sections

**Migration Strategy:**
Break into multiple components:
```tsx
// app/organizations/[slug]/page.tsx
export default async function OrganizationPage({ params }: Props) {
  const { slug } = await params;
  const org = await gateway.getOrganizationBySlug(slug);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <OrganizationInfo org={org.result} />
        <MembersList members={org.result.members} />
      </aside>

      {/* Main content */}
      <main className="lg:col-span-2">
        <OrganizationPosts orgId={org.result.id} />

        {/* Moderator sections - conditionally rendered */}
        <ModeratorPanel orgId={org.result.id} />
      </main>
    </div>
  );
}
```

---

## 9. Component Migration Strategy

### 9.1 Component Inventory

**23 Vue Components → React Components**

| Vue Component | React Component | Type | Priority | Hours |
|---------------|----------------|------|----------|-------|
| `TechStackEdit.vue` | `TechStackForm.tsx` | Form | High | 6h |
| `TechnologyEdit.vue` | `TechnologyForm.tsx` | Form | High | 5h |
| `OrganizationEdit.vue` | `OrganizationForm.tsx` | Form | High | 8h |
| `PostEdit.vue` | `PostForm.tsx` | Form | High | 5h |
| `CommentEdit.vue` | `CommentForm.tsx` | Form | Medium | 3h |
| `CategoryEdit.vue` | `CategoryForm.tsx` | Form | Low | 2h |
| `LabelEdit.vue` | `LabelForm.tsx` | Form | Low | 2h |
| `MemberEdit.vue` | `MemberForm.tsx` | Form | Low | 2h |
| `NewsPosts.vue` | `NewsPosts.tsx` | Display | High | 6h |
| `PostsList.vue` | `PostsList.tsx` | Display | High | 4h |
| `PostComments.vue` | `PostComments.tsx` | Display | High | 5h |
| `PostComment.vue` | `PostComment.tsx` | Display | Medium | 3h |
| `TechnologyPost.vue` | `TechnologyPost.tsx` | Display | Medium | 3h |
| `TechnologyComments.vue` | `TechnologyComments.tsx` | Display | Medium | 4h |
| `OrganizationInfo.vue` | `OrganizationInfo.tsx` | Display | Medium | 3h |
| `MembersInfo.vue` | `MembersInfo.tsx` | Display | Low | 2h |
| `PostInfo.vue` | `PostInfo.tsx` | Display | Low | 2h |
| `PostAlerts.vue` | `PostAlerts.tsx` | Display | Low | 2h |
| `Shortcuts.vue` | `Shortcuts.tsx` | Dialog | Low | 2h |
| `ReportDialog.vue` | `ReportDialog.tsx` | Dialog | Low | 2h |
| `FileInput.vue` | `FileInput.tsx` | Input | Medium | 2h |
| `DebugInfo.vue` | `DebugInfo.tsx` | Utility | Low | 1h |

**Total: ~74 hours**

### 9.2 Vue to React Conversion Patterns

#### **9.2.1 Template → JSX**

**Vue:**
```vue
<template>
  <div class="tech-card" v-if="technology">
    <h2>{{ technology.name }}</h2>
    <p v-if="technology.description">{{ technology.description }}</p>
    <button @click="onEdit" v-show="canEdit">Edit</button>
  </div>
</template>
```

**React:**
```tsx
export function TechnologyCard({ technology }) {
  if (!technology) return null;

  return (
    <div className="tech-card">
      <h2>{technology.name}</h2>
      {technology.description && <p>{technology.description}</p>}
      {canEdit && <button onClick={onEdit}>Edit</button>}
    </div>
  );
}
```

#### **9.2.2 Props & Emits → Props & Callbacks**

**Vue:**
```vue
<script>
export default {
  props: {
    post: { type: Object, required: true },
    editable: { type: Boolean, default: false }
  },
  emits: ['update', 'delete'],
  methods: {
    handleUpdate() {
      this.$emit('update', this.post.id);
    }
  }
}
</script>
```

**React:**
```tsx
interface PostCardProps {
  post: Post;
  editable?: boolean;
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function PostCard({
  post,
  editable = false,
  onUpdate,
  onDelete
}: PostCardProps) {
  const handleUpdate = () => {
    onUpdate?.(post.id);
  };

  return (/* ... */);
}
```

#### **9.2.3 Data & Computed → useState & useMemo**

**Vue:**
```vue
<script>
export default {
  data() {
    return {
      count: 0,
      items: []
    };
  },
  computed: {
    total() {
      return this.items.length;
    },
    isEmpty() {
      return this.total === 0;
    }
  }
}
</script>
```

**React:**
```tsx
export function MyComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const total = useMemo(() => items.length, [items]);
  const isEmpty = useMemo(() => total === 0, [total]);

  return (/* ... */);
}
```

#### **9.2.4 Watch → useEffect**

**Vue:**
```vue
<script>
export default {
  watch: {
    slug(newSlug) {
      this.loadData(newSlug);
    }
  }
}
</script>
```

**React:**
```tsx
useEffect(() => {
  loadData(slug);
}, [slug]);
```

#### **9.2.5 Lifecycle Hooks**

**Vue:**
```vue
<script>
export default {
  mounted() {
    this.initialize();
  },
  beforeUnmount() {
    this.cleanup();
  }
}
</script>
```

**React:**
```tsx
useEffect(() => {
  initialize();

  return () => {
    cleanup();
  };
}, []); // Empty array = mount/unmount only
```

### 9.3 Form Component Example

**Vue: `TechnologyEdit.vue`**
```vue
<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-text-field
      v-model="name"
      label="Name"
      :rules="[v => !!v || 'Required']"
      required
    />

    <v-select
      v-model="tier"
      :items="tiers"
      label="Tier"
    />

    <v-btn type="submit" color="primary">
      {{ edit ? 'Update' : 'Create' }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: ['technology'],
  data() {
    return {
      name: this.technology?.name || '',
      tier: this.technology?.tier || ''
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const fields = { name: this.name, tier: this.tier };
        if (this.technology) {
          await updateTechnology(fields);
        } else {
          await createTechnology(fields);
        }
      }
    }
  }
}
</script>
```

**React: `TechnologyForm.tsx`**
```tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as gateway from '@/lib/api/gateway';
import { TechnologyTier } from '@/shared/dtos';

interface TechnologyFormProps {
  technology?: Technology;
}

export function TechnologyForm({ technology }: TechnologyFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: technology?.name || '',
    tier: technology?.tier || TechnologyTier.ProgrammingLanguage,
    description: technology?.description || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (technology) {
        await gateway.updateTechnology({ id: technology.id, ...formData });
      } else {
        await gateway.createTechnology(formData);
      }
      router.push('/tech');
    } catch (error) {
      const apiErrors = gateway.handleApiError(error);
      setErrors({ submit: apiErrors.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="tier" className="block text-sm font-medium">
          Tier
        </label>
        <select
          id="tier"
          value={formData.tier}
          onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          {Object.values(TechnologyTier).map((tier) => (
            <key={tier} value={tier}>
              {tier}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? 'Saving...' : (technology ? 'Update' : 'Create')}
      </button>

      {errors.submit && (
        <p className="text-sm text-red-600">{errors.submit}</p>
      )}
    </form>
  );
}
```

### 9.4 Reusable UI Component Library

**Build with Radix UI + Tailwind (shadcn/ui pattern):**

Create base components:
- `Button.tsx`
- `Input.tsx`
- `Select.tsx`
- `Checkbox.tsx`
- `Dialog.tsx`
- `DropdownMenu.tsx`
- `Card.tsx`
- `Badge.tsx`
- `Avatar.tsx`

**Example: `components/ui/Button.tsx`**
```tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-gray-300 hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
        link: 'underline-offset-4 hover:underline text-blue-600'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

---

## 10. Styling & UI Framework

### 10.1 Tailwind CSS v4 Configuration

**Configuration: `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TechStacks brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        accent: {
          1: '#00D8FF',
          2: '#00B4D8'
        },
        danger: '#DC3545',
        success: '#28A745'
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.700')
              }
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
};

export default config;
```

### 10.2 Global Styles

**File: `src/styles/globals.css`**

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 10.3 Markdown Styling

**Copy existing styles:**
```bash
# Copy GFM styles from Nuxt project
cp TechStacks/src/assets/css/gfm.css nextjs-app/src/styles/markdown.css

# Import in globals.css
@import './markdown.css';
```

### 10.4 Replacing Vuetify Components

| Vuetify Component | Replacement |
|-------------------|-------------|
| `v-app` | Custom layout component |
| `v-toolbar` | Custom header with Tailwind |
| `v-btn` | `Button` component (Radix UI styled) |
| `v-text-field` | `Input` component |
| `v-select` | `Select` component (Radix UI) |
| `v-checkbox` | `Checkbox` component (Radix UI) |
| `v-dialog` | `Dialog` component (Radix UI) |
| `v-card` | `Card` component (custom) |
| `v-menu` | `DropdownMenu` (Radix UI) |
| `v-layout`, `v-flex` | Tailwind Flexbox/Grid utilities |
| `v-parallax` | Custom parallax component |
| `v-alert` | `Alert` component (custom) |

---

## 11. Build & Deployment

### 11.1 Development Workflow

**Development servers:**

```bash
# Terminal 1: C# Backend
cd TechStacks/TechStacks
dotnet run

# Terminal 2: Next.js Frontend
cd TechStacks/nextjs-app
npm run dev
```

**Next.js will proxy API requests to C# backend via `next.config.ts` rewrites.**

### 11.2 Production Build Process

**Build configuration: `next.config.ts`**

```typescript
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // Static export for C# hosting
  distDir: isProd ? '../TechStacks/wwwroot' : '.next',
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  },

  // Development rewrites (not used in production)
  async rewrites() {
    if (isProd) return [];

    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:5001/api/:path*'
      },
      {
        source: '/auth/:path*',
        destination: 'https://localhost:5001/auth/:path*'
      }
    ];
  }
};
```

### 11.3 Build Scripts

**Update: `nextjs-app/package.json`**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:prod": "next build && cp -r out/* ../TechStacks/wwwroot/",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

**Update: Root `package.json` or create new build script**

```json
{
  "scripts": {
    "ui:dev": "cd nextjs-app && npm run dev",
    "ui:build": "cd nextjs-app && npm run build:prod",
    "dtos": "cd TechStacks/src/shared && x ts && cp dtos.ts ../../nextjs-app/src/shared/dtos.ts",
    "publish": "npm run ui:build && cd TechStacks && dotnet publish -c Release",
    "deploy": "npm run publish && bash deploy.sh"
  }
}
```

### 11.4 Static Export Structure

**Next.js static export will generate:**

```
TechStacks/wwwroot/
├── _next/
│   ├── static/
│   │   ├── chunks/
│   │   │   ├── app/
│   │   │   ├── pages/
│   │   │   └── webpack-*.js
│   │   └── css/
│   │       └── app/*.css
├── index.html
├── tech.html
├── tech/
│   ├── index.html
│   └── [slug folders]
├── stacks/
│   ├── index.html
│   └── [slug folders]
├── organizations/
│   ├── index.html
│   └── [slug folders]
└── favicon.ico
```

### 11.5 ASP.NET Integration

**No changes needed in `Program.cs`** - the existing configuration already handles:
- `app.UseStaticFiles()` - serves wwwroot
- `app.MapFallbackToFile("index.html")` - SPA routing

### 11.6 Environment Variables

**Create: `nextjs-app/.env.local`**

```env
# Development
NEXT_PUBLIC_API_URL=https://localhost:5001
INTERNAL_API_URL=https://localhost:5001

# Production (set in deployment environment)
# NEXT_PUBLIC_API_URL=https://techstacks.io
```

**Usage in code:**
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/';
```

---

## 12. Testing Strategy

### 12.1 Testing Framework Setup

```bash
cd nextjs-app

# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D vitest @vitejs/plugin-react
npm install -D jsdom
```

### 12.2 Vitest Configuration

**Create: `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### 12.3 Testing Priorities

1. **Critical Path Tests:**
   - Authentication flow
   - Post creation/editing
   - Technology CRUD operations
   - Voting functionality
   - Favorites management

2. **Component Tests:**
   - Form validation
   - Error handling
   - Loading states
   - Conditional rendering

3. **Integration Tests:**
   - API gateway methods
   - Zustand store actions
   - Multi-step workflows

### 12.4 Example Test

**Test: `components/tech/TechnologyCard.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { TechnologyCard } from './TechnologyCard';
import { describe, it, expect } from 'vitest';

describe('TechnologyCard', () => {
  const mockTech = {
    id: 1,
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Typed JavaScript',
    tier: 'ProgrammingLanguage'
  };

  it('renders technology name', () => {
    render(<TechnologyCard technology={mockTech} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<TechnologyCard technology={mockTech} />);
    expect(screen.getByText('Typed JavaScript')).toBeInTheDocument();
  });

  it('links to technology page', () => {
    render(<TechnologyCard technology={mockTech} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tech/typescript');
  });
});
```

---

## 13. Migration Phases

### Phase 1: Foundation (Week 1-2)

**Goals:**
- Set up Next.js 16 project structure
- Configure TypeScript, Tailwind CSS v4, ESLint
- Implement API client and gateway layer
- Copy and configure DTOs
- Set up Zustand store
- Create base UI component library (Button, Input, etc.)
- Implement authentication provider

**Deliverables:**
- ✅ Working Next.js development environment
- ✅ API integration with C# backend
- ✅ Authentication flow working
- ✅ Base component library

**Hours: 40-50**

---

### Phase 2: Core Pages (Week 3-4)

**Goals:**
- Implement critical pages (priority: Critical)
  - Home page (news feed)
  - Technology listing
  - Technology detail page
  - Tech stacks listing
  - Tech stacks detail page
- Implement navigation and routing
- Implement basic post components

**Deliverables:**
- ✅ Users can browse technologies and stacks
- ✅ Users can view technology details
- ✅ News feed displays correctly
- ✅ Navigation between pages works

**Hours: 50-60**

---

### Phase 3: Interactive Features (Week 5-6)

**Goals:**
- Implement CRUD operations (Create, Edit, Delete)
- Technology form (create/edit)
- Tech stack form (create/edit)
- Post creation and editing
- Comment system
- Voting functionality
- Favorites functionality

**Deliverables:**
- ✅ Users can create/edit technologies
- ✅ Users can create/edit tech stacks
- ✅ Users can create posts
- ✅ Users can comment and vote
- ✅ Users can favorite items

**Hours: 60-70**

---

### Phase 4: Organization Features (Week 7-8)

**Goals:**
- Organization listing page
- Organization detail page (complex)
- Organization management (moderation)
- Member management
- Category and label management
- Organization-specific news feeds

**Deliverables:**
- ✅ Organization pages fully functional
- ✅ Moderators can manage content
- ✅ Members system working

**Hours: 50-60**

---

### Phase 5: Polish & Optimization (Week 9-10)

**Goals:**
- User profile pages
- Favorites page
- Search and filtering optimization
- Performance optimization
- SEO metadata
- Accessibility improvements
- Mobile responsiveness
- Error handling and loading states
- Keyboard shortcuts

**Deliverables:**
- ✅ All remaining pages complete
- ✅ App is performant
- ✅ SEO is optimized
- ✅ Mobile-friendly
- ✅ Accessible (WCAG 2.1 AA)

**Hours: 40-50**

---

### Phase 6: Testing & Deployment (Week 11-12)

**Goals:**
- Write component tests
- Write integration tests
- End-to-end testing
- Fix bugs
- Production build testing
- Deploy to staging
- Deploy to production

**Deliverables:**
- ✅ Test coverage >70%
- ✅ All critical bugs fixed
- ✅ Production deployment successful
- ✅ Monitoring in place

**Hours: 30-40**

---

### Total Timeline: 10-12 weeks (single developer)
### Total Effort: 270-330 hours

**Parallel Development:**
With 2 developers, timeline can be reduced to 6-8 weeks.

---

## 14. Risk Assessment & Mitigation

### 14.1 Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **ServiceStack API incompatibility** | High | Low | DTOs are already typed; test API calls early |
| **Authentication session issues** | High | Medium | Thoroughly test OAuth flow; maintain cookie compatibility |
| **Performance regression** | Medium | Medium | Use React Server Components; implement proper caching |
| **Build output compatibility** | High | Low | Test static export early; verify C# serves correctly |
| **Complex state management** | Medium | Medium | Use Zustand (simpler than Redux); test thoroughly |
| **Missing Vuetify features** | Low | Medium | Radix UI provides most features; custom components for rest |

### 14.2 Project Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Timeline overrun** | Medium | Medium | Phased approach; prioritize critical features first |
| **Scope creep** | Medium | High | Strict feature parity initially; enhancements post-launch |
| **Testing gaps** | Medium | Medium | Automated testing from Phase 1; continuous QA |
| **Deployment issues** | High | Low | Test build process early; staging environment testing |

### 14.3 Mitigation Strategies

1. **Early API Testing:**
   - Test all critical API endpoints in Phase 1
   - Validate DTOs work correctly
   - Test authentication flow thoroughly

2. **Incremental Migration:**
   - Migrate page by page
   - Keep old Nuxt app running during migration
   - Test each page before moving to next

3. **Parallel Development:**
   - Backend team continues working on C# (no changes needed)
   - Frontend team works independently
   - Regular sync meetings

4. **Staging Environment:**
   - Deploy to staging after Phase 3
   - User acceptance testing
   - Performance testing

---

## 15. Success Criteria

### 15.1 Functional Requirements

- ✅ All 20 pages migrated and functional
- ✅ All 23 components migrated and functional
- ✅ Authentication working (GitHub OAuth)
- ✅ All CRUD operations working
- ✅ Voting and favorites working
- ✅ Comments system working
- ✅ Organization moderation working
- ✅ Search and filtering working

### 15.2 Non-Functional Requirements

- ✅ **Performance:** Page load < 2s (First Contentful Paint)
- ✅ **SEO:** All pages have proper metadata
- ✅ **Accessibility:** WCAG 2.1 AA compliance
- ✅ **Mobile:** Responsive on all screen sizes
- ✅ **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- ✅ **Test Coverage:** >70% for critical paths

### 15.3 Business Requirements

- ✅ Zero downtime deployment
- ✅ Feature parity with current Nuxt app
- ✅ No breaking changes to backend API
- ✅ User data preserved
- ✅ All URLs preserved (or redirected)

---

## 16. Post-Migration Enhancements

**After successful migration, consider:**

1. **Performance Optimizations:**
   - Implement React Server Components more extensively
   - Add database query caching
   - Implement CDN for static assets
   - Image optimization

2. **Feature Enhancements:**
   - Real-time updates (WebSockets)
   - Advanced search (Elasticsearch)
   - Notifications system
   - Dark mode improvements

3. **Developer Experience:**
   - Storybook for component documentation
   - End-to-end testing (Playwright)
   - CI/CD pipeline improvements
   - Automated deployment

4. **User Experience:**
   - Progressive Web App (PWA)
   - Offline support
   - Improved mobile experience
   - Animations and transitions

---

## 17. Appendices

### Appendix A: Key Files Reference

| Purpose | Nuxt Location | Next.js Location |
|---------|--------------|------------------|
| API Client | `src/shared/gateway.js` | `src/lib/api/gateway.ts` |
| DTOs | `src/shared/dtos.ts` | `src/shared/dtos.ts` |
| Store | `src/store/index.js` | `src/lib/stores/useAppStore.ts` |
| Routes | `src/shared/routes.js` | `src/lib/utils/routes.ts` |
| Config | `nuxt.config.js` | `next.config.ts` |
| Styles | `src/assets/css/*.css` | `src/styles/*.css` |

### Appendix B: API Endpoints Used

**Technologies:**
- `GET /api/GetTechnology`
- `GET /api/GetAllTechnologies`
- `POST /api/CreateTechnology`
- `PUT /api/UpdateTechnology`
- `DELETE /api/DeleteTechnology`

**Tech Stacks:**
- `GET /api/GetTechnologyStack`
- `GET /api/GetAllTechnologyStacks`
- `POST /api/CreateTechnologyStack`
- `PUT /api/UpdateTechnologyStack`

**Posts:**
- `GET /api/QueryPosts`
- `GET /api/GetPost`
- `POST /api/CreatePost`
- `PUT /api/UpdatePost`
- `DELETE /api/DeletePost`

**Comments:**
- `POST /api/CreatePostComment`
- `PUT /api/UpdatePostComment`

**Favorites:**
- `PUT /api/AddFavoriteTechnology`
- `DELETE /api/RemoveFavoriteTechnology`
- `PUT /api/AddFavoriteTechStack`
- `DELETE /api/RemoveFavoriteTechStack`

**Voting:**
- `PUT /api/UserPostVote`
- `PUT /api/UserPostCommentVote`

**Organizations:**
- `GET /api/GetOrganizationBySlug`
- `POST /api/CreateOrganization`
- `PUT /api/UpdateOrganization`

**Auth:**
- `POST /auth/Authenticate`
- `GET /api/SessionInfo`

### Appendix C: Environment Setup Checklist

**Development Prerequisites:**
- [ ] Node.js 20.x LTS installed
- [ ] .NET 8.0 SDK installed
- [ ] PostgreSQL running
- [ ] Git configured
- [ ] IDE with TypeScript support (VS Code recommended)

**Project Setup:**
- [ ] Next.js app created
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] API proxy configured
- [ ] DTOs copied from C# project
- [ ] TypeScript compiling without errors
- [ ] Development server running

**Backend Verification:**
- [ ] C# backend running
- [ ] Database migrations applied
- [ ] ServiceStack endpoints accessible
- [ ] OAuth configured (GitHub)
- [ ] wwwroot folder exists

---

## Conclusion

This migration plan provides a comprehensive roadmap for rewriting the TechStacks Nuxt.js application using Next.js 16, React 19, TypeScript, and Tailwind CSS v4 while maintaining full compatibility with the existing C# ServiceStack backend.

**Key Highlights:**

1. **Zero Backend Changes:** The C# ServiceStack API remains untouched
2. **Modern Stack:** React 19 + Next.js 16 + TypeScript + Tailwind CSS v4
3. **Phased Approach:** 6 phases over 10-12 weeks
4. **Maintainable:** Type-safe, well-organized, testable code
5. **Performance:** Server Components + static generation + optimized builds
6. **SEO-Friendly:** Metadata generation + server-side rendering

**Next Steps:**

1. Review and approve this plan
2. Set up development environment
3. Begin Phase 1: Foundation
4. Regular progress reviews (weekly)
5. Adjust timeline based on actual progress

This migration will result in a modern, performant, and maintainable web application while preserving all existing functionality.

---

**Document Version:** 1.0
**Created:** 2025-11-13
**Author:** Migration Planning Team
