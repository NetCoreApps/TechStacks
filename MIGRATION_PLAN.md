# TechStacks React + Next.js Migration Plan

## Executive Summary

This document outlines a comprehensive plan to migrate the existing Vuetify-based TechStacks application to a modern React + Next.js + TypeScript + Tailwind CSS v4 stack. The migration will preserve all existing functionality while modernizing the UI/UX with contemporary design patterns and improved visual aesthetics.

**Current Stack:**
- Frontend: Nuxt.js 1.4.5, Vue.js 2, Vuetify 1.0
- Backend: ASP.NET Core 8.0, ServiceStack 8.0
- State: Vuex
- Styling: Vuetify + Tailwind CSS (older version)

**Target Stack:**
- Frontend: React 18+, Next.js 15+, TypeScript 5+
- Backend: ASP.NET Core 8.0, ServiceStack 8.0 (unchanged)
- State: React Context + Zustand + React Query
- Styling: Tailwind CSS v4
- UI Components: shadcn/ui + Headless UI + Radix UI
- Forms: React Hook Form + Zod validation
- Rich Text: Tiptap or Novel editor
- Icons: Lucide React

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Technology Stack Details](#technology-stack-details)
3. [Project Structure](#project-structure)
4. [Component Migration Map](#component-migration-map)
5. [Page Migration Map](#page-migration-map)
6. [API Integration Strategy](#api-integration-strategy)
7. [State Management Strategy](#state-management-strategy)
8. [Authentication & Authorization](#authentication--authorization)
9. [Design System & Styling](#design-system--styling)
10. [Feature Migration Plan](#feature-migration-plan)
11. [Migration Phases](#migration-phases)
12. [Development Workflow](#development-workflow)
13. [Testing Strategy](#testing-strategy)
14. [Performance Optimization](#performance-optimization)
15. [SEO & Accessibility](#seo--accessibility)
16. [Deployment Strategy](#deployment-strategy)

---

## 1. Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  App Pages   │  │   Layouts    │  │  Components  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │            │
│         └──────────────────┴──────────────────┘            │
│                          │                                 │
│         ┌────────────────┴────────────────┐               │
│         │                                  │               │
│    ┌────▼────┐                      ┌─────▼─────┐        │
│    │ React   │                      │  Tailwind │        │
│    │ Query   │                      │  CSS v4   │        │
│    └────┬────┘                      └───────────┘        │
│         │                                                  │
│    ┌────▼────────────────┐                               │
│    │  ServiceStack API   │                               │
│    │  JsonServiceClient  │                               │
│    └────┬────────────────┘                               │
└─────────┼──────────────────────────────────────────────────┘
          │
          │ HTTP/JSON
          │
┌─────────▼──────────────────────────────────────────────────┐
│              ASP.NET Core + ServiceStack                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Services   │  │   AutoQuery  │  │  PostgreSQL  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────────────────────────────────────────────────────┘
```

### Rendering Strategy

**App Router Hybrid Approach:**
- **Server Components (RSC)**: Default for most pages
  - Technology listings
  - Stack browsing
  - Post feeds
  - Organization pages
  - User profiles (public)

- **Client Components**: Interactive features only
  - Forms (create/edit technology, stacks, posts)
  - Voting buttons
  - Comment threads
  - Modals/dialogs
  - Search with instant results
  - User authentication state

- **Server Actions**: Form submissions
  - Create/update/delete operations
  - File uploads
  - Vote submissions

### Route Structure

```
app/
├── (marketing)/          # Public pages, full SEO
│   ├── page.tsx         # Homepage / News feed
│   ├── layout.tsx       # Marketing layout
│   └── about/
├── (browse)/            # Discovery pages
│   ├── tech/
│   │   ├── page.tsx    # Technology listing
│   │   └── [slug]/
│   ├── stacks/
│   │   ├── page.tsx    # Stack listing
│   │   └── [slug]/
│   ├── top/
│   └── favorites/
├── (community)/         # Social features
│   ├── posts/
│   │   └── [id]/[slug]/
│   ├── organizations/
│   │   └── [slug]/
│   └── users/
│       └── [id]/
├── (dashboard)/         # User-specific
│   ├── dashboard/
│   └── settings/
└── api/                 # API routes (if needed)
    └── auth/
```

---

## 2. Technology Stack Details

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.5.0",

    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/forms": "^0.5.9",

    "@servicestack/client": "^2.2.2",

    "@tanstack/react-query": "^5.56.0",
    "zustand": "^4.5.5",

    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-toast": "^1.2.1",

    "react-hook-form": "^7.53.0",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.9.0",

    "lucide-react": "^0.445.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",

    "@tiptap/react": "^2.6.0",
    "@tiptap/starter-kit": "^2.6.0",

    "date-fns": "^3.6.0",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@types/node": "^22.5.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^9.10.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.6"
  }
}
```

### Why These Choices?

**Next.js 15 App Router:**
- Server Components reduce bundle size
- Streaming SSR for faster perceived performance
- Built-in image optimization
- File-based routing with layouts
- Server Actions for mutations

**React Query:**
- Automatic caching and revalidation
- Optimistic updates for voting
- Background refetching
- Perfect for ServiceStack AutoQuery

**Zustand:**
- Lightweight global state (2kb)
- Better than Context for cross-cutting concerns
- User session, preferences, UI state

**shadcn/ui + Radix:**
- Unstyled primitives with accessibility
- Copy/paste components (no npm bloat)
- Full customization with Tailwind
- Better than Vuetify's opinionated styling

**Tailwind CSS v4:**
- Modern CSS with native cascade layers
- Smaller bundle size
- Better performance
- Composable design system

---

## 3. Project Structure

```
TechStacks/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Homepage
│   │   │   └── about/
│   │   ├── (browse)/
│   │   │   ├── layout.tsx
│   │   │   ├── tech/
│   │   │   │   ├── page.tsx         # Technology listing
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx     # Technology detail
│   │   │   │   │   └── edit/page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── stacks/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── edit/page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── top/page.tsx
│   │   │   └── favorites/page.tsx
│   │   ├── (community)/
│   │   │   ├── layout.tsx
│   │   │   ├── posts/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── [slug]/page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── organizations/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── edit/page.tsx
│   │   │   │   │   ├── members/page.tsx
│   │   │   │   │   └── settings/page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   └── users/
│   │   │       └── [id]/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...auth]/route.ts
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css
│   │   └── error.tsx
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── mobile-nav.tsx
│   │   ├── technology/
│   │   │   ├── technology-card.tsx
│   │   │   ├── technology-grid.tsx
│   │   │   ├── technology-list.tsx
│   │   │   ├── technology-form.tsx
│   │   │   ├── technology-header.tsx
│   │   │   ├── technology-stats.tsx
│   │   │   └── technology-comments.tsx
│   │   ├── stacks/
│   │   │   ├── stack-card.tsx
│   │   │   ├── stack-grid.tsx
│   │   │   ├── stack-form.tsx
│   │   │   ├── stack-header.tsx
│   │   │   └── stack-technologies.tsx
│   │   ├── posts/
│   │   │   ├── post-card.tsx
│   │   │   ├── post-feed.tsx
│   │   │   ├── post-form.tsx
│   │   │   ├── post-detail.tsx
│   │   │   ├── post-comments.tsx
│   │   │   ├── comment-thread.tsx
│   │   │   ├── comment-item.tsx
│   │   │   └── vote-buttons.tsx
│   │   ├── organizations/
│   │   │   ├── org-card.tsx
│   │   │   ├── org-header.tsx
│   │   │   ├── org-form.tsx
│   │   │   ├── org-members.tsx
│   │   │   ├── org-categories.tsx
│   │   │   └── member-invite.tsx
│   │   ├── users/
│   │   │   ├── user-profile.tsx
│   │   │   ├── user-avatar.tsx
│   │   │   ├── user-stats.tsx
│   │   │   └── user-activity.tsx
│   │   ├── forms/
│   │   │   ├── file-upload.tsx
│   │   │   ├── markdown-editor.tsx
│   │   │   ├── search-input.tsx
│   │   │   └── tag-input.tsx
│   │   └── shared/
│   │       ├── empty-state.tsx
│   │       ├── error-boundary.tsx
│   │       ├── loading-skeleton.tsx
│   │       ├── pagination.tsx
│   │       └── shortcuts-dialog.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts           # ServiceStack client setup
│   │   │   ├── dtos.ts             # Generated DTOs (existing)
│   │   │   ├── queries.ts          # React Query hooks
│   │   │   ├── mutations.ts        # React Query mutations
│   │   │   └── server.ts           # Server-side API calls
│   │   ├── auth/
│   │   │   ├── session.ts          # Session management
│   │   │   └── middleware.ts       # Auth middleware
│   │   ├── stores/
│   │   │   ├── user-store.ts       # User state (Zustand)
│   │   │   ├── ui-store.ts         # UI state (Zustand)
│   │   │   └── preferences-store.ts
│   │   ├── utils/
│   │   │   ├── cn.ts               # className utility
│   │   │   ├── dates.ts            # Date formatting
│   │   │   ├── slugify.ts          # URL slugs
│   │   │   ├── validation.ts       # Zod schemas
│   │   │   └── markdown.ts         # Markdown utilities
│   │   ├── hooks/
│   │   │   ├── use-user.ts
│   │   │   ├── use-favorite.ts
│   │   │   ├── use-vote.ts
│   │   │   ├── use-debounce.ts
│   │   │   └── use-intersection.ts
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── tiers.ts
│   │       └── post-types.ts
│   │
│   └── types/
│       ├── index.ts
│       └── extended.ts             # Extended/custom types
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── .eslintrc.json
└── package.json
```

---

## 4. Component Migration Map

### Vuetify → shadcn/ui Component Mapping

| Vuetify Component | React Replacement | Notes |
|------------------|-------------------|-------|
| `v-app` | Root Layout | Next.js layout.tsx |
| `v-toolbar` | `<Header>` custom | Tailwind flexbox |
| `v-navigation-drawer` | Radix `Sheet` | Mobile navigation |
| `v-btn` | shadcn `Button` | CVA variants |
| `v-card` | shadcn `Card` | Composition pattern |
| `v-dialog` | Radix `Dialog` | Accessible modal |
| `v-form` | React Hook Form | Controlled forms |
| `v-text-field` | shadcn `Input` | Native input styling |
| `v-select` | Radix `Select` | Keyboard accessible |
| `v-autocomplete` | Headless `Combobox` | Search + select |
| `v-checkbox` | shadcn `Checkbox` | Radix primitive |
| `v-textarea` | shadcn `Textarea` | Auto-resize |
| `v-tabs` | Radix `Tabs` | Accessible tabs |
| `v-menu` | Radix `DropdownMenu` | Keyboard nav |
| `v-data-table` | TanStack Table | Powerful sorting/filtering |
| `v-list` | Custom list | Tailwind grid/flex |
| `v-chip` | shadcn `Badge` | Pill styling |
| `v-icon` | Lucide React | Icon components |
| `v-avatar` | Custom `Avatar` | Next.js Image |
| `v-snackbar` | shadcn `Toast` | Notification system |
| `v-progress-circular` | shadcn `Spinner` | Loading state |
| `v-expansion-panel` | Radix `Accordion` | Collapsible |
| `v-tooltip` | Radix `Tooltip` | Hover popover |

### Vue Component → React Component Migration

#### 1. **TechnologyEdit.vue** → **TechnologyForm.tsx**

**Current:** 9,463 bytes, complex Vuetify form
**New:** React Hook Form + Zod + Server Actions

```tsx
// components/technology/technology-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { technologySchema } from '@/lib/utils/validation'
import { createTechnology, updateTechnology } from '@/lib/api/mutations'
import { FileUpload } from '@/components/forms/file-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

export function TechnologyForm({ technology, mode }: TechnologyFormProps) {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(technologySchema),
    defaultValues: technology
  })

  const mutation = useMutation({
    mutationFn: mode === 'create' ? createTechnology : updateTechnology
  })

  // Modern form implementation
}
```

**Features:**
- Type-safe validation with Zod
- Optimistic updates
- File upload with preview
- Error handling with toast notifications
- Loading states

#### 2. **NewsPosts.vue** → **PostFeed.tsx**

**Current:** 15,436 bytes, complex feed logic
**New:** Server Component + Infinite scroll

```tsx
// components/posts/post-feed.tsx
import { getPosts } from '@/lib/api/server'
import { PostCard } from './post-card'
import { InfiniteScroll } from './infinite-scroll'

export async function PostFeed({ organizationId, filters }: PostFeedProps) {
  const posts = await getPosts({ organizationId, ...filters })

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <InfiniteScroll />
    </div>
  )
}
```

**Features:**
- Server-side rendering
- Infinite scroll with React Query
- Optimistic voting
- Real-time update animations

#### 3. **PostComments.vue** → **CommentThread.tsx**

**Current:** 9,021 bytes, nested comments
**New:** Recursive component with optimistic updates

```tsx
// components/posts/comment-thread.tsx
'use client'

export function CommentThread({ postId, comments }: CommentThreadProps) {
  const { data } = useComments(postId)
  const voteMutation = useVoteComment()

  return (
    <div className="space-y-4">
      {data?.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onVote={voteMutation.mutate}
        />
      ))}
    </div>
  )
}
```

#### 4. **OrganizationEdit.vue** → **OrganizationForm.tsx**

**Current:** 25,230 bytes, massive complex form
**New:** Multi-step wizard with validation

```tsx
// components/organizations/org-form.tsx
'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { OrgBasicInfo } from './org-basic-info'
import { OrgMembers } from './org-members'
import { OrgCategories } from './org-categories'
import { OrgSettings } from './org-settings'

export function OrganizationForm({ organization }: OrgFormProps) {
  return (
    <Tabs defaultValue="basic">
      <TabsList>
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <OrgBasicInfo organization={organization} />
      </TabsContent>
      {/* ... */}
    </Tabs>
  )
}
```

**Features:**
- Tabbed interface for complex data
- Each tab is a separate component
- Independent validation per section
- Auto-save drafts to localStorage

#### 5. **FileInput.vue** → **FileUpload.tsx**

**Current:** 2,468 bytes, simple file input
**New:** Drag-and-drop with preview

```tsx
// components/forms/file-upload.tsx
'use client'

import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

export function FileUpload({ onUpload, accept, maxSize }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    onDrop: onUpload
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
        isDragActive && "border-blue-500 bg-blue-50"
      )}
    >
      <input {...getInputProps()} />
      {/* Upload UI */}
    </div>
  )
}
```

### Full Component List (25 Vue → React)

| Vue Component | React Component | Type | Priority |
|--------------|----------------|------|----------|
| TechnologyEdit.vue | TechnologyForm.tsx | Form | High |
| TechnologyStackEdit.vue | StackForm.tsx | Form | High |
| TechnologyPost.vue | TechPostForm.tsx | Form | Medium |
| PostEdit.vue | PostForm.tsx | Form | High |
| OrganizationEdit.vue | OrgForm.tsx | Form | High |
| OrganizationAdd.vue | OrgCreateForm.tsx | Form | Medium |
| CategoryEdit.vue | CategoryForm.tsx | Form | Low |
| LabelEdit.vue | LabelForm.tsx | Form | Low |
| MemberEdit.vue | MemberForm.tsx | Form | Medium |
| NewsPosts.vue | PostFeed.tsx | Display | High |
| PostsList.vue | PostList.tsx | Display | Medium |
| PostComments.vue | CommentThread.tsx | Display | High |
| PostComment.vue | CommentItem.tsx | Display | High |
| TechnologyComments.vue | TechComments.tsx | Display | Medium |
| OrganizationInfo.vue | OrgHeader.tsx | Display | Medium |
| MembersInfo.vue | MemberList.tsx | Display | Low |
| PostInfo.vue | PostMeta.tsx | Display | Low |
| FileInput.vue | FileUpload.tsx | Utility | Medium |
| DebugInfo.vue | DevTools.tsx | Utility | Low |
| Shortcuts.vue | ShortcutsDialog.tsx | Utility | Low |
| CommentEdit.vue | CommentEditForm.tsx | Form | Low |
| PostAlerts.vue | Alert.tsx | Utility | Low |
| ReportDialog.vue | ReportDialog.tsx | Utility | Medium |

---

## 5. Page Migration Map

### Route Mapping: Nuxt → Next.js

| Nuxt Route | Next.js Route | Type | Features |
|-----------|---------------|------|----------|
| `/` | `/(marketing)/page.tsx` | SSR | News feed, filters |
| `/tech` | `/(browse)/tech/page.tsx` | SSR | Tech search/browse |
| `/tech/:slug` | `/(browse)/tech/[slug]/page.tsx` | SSG | Tech details, SSG |
| `/tech/:slug/edit` | `/(browse)/tech/[slug]/edit/page.tsx` | Client | Edit form |
| `/stacks` | `/(browse)/stacks/page.tsx` | SSR | Stack browse |
| `/stacks/:slug` | `/(browse)/stacks/[slug]/page.tsx` | SSG | Stack details |
| `/stacks/:slug/edit` | `/(browse)/stacks/[slug]/edit/page.tsx` | Client | Edit form |
| `/top` | `/(browse)/top/page.tsx` | SSR | Top tech/stacks |
| `/favorites` | `/(browse)/favorites/page.tsx` | Client | User favorites |
| `/posts/:id/:slug` | `/(community)/posts/[id]/[slug]/page.tsx` | SSG | Post detail |
| `/organizations/:slug` | `/(community)/organizations/[slug]/page.tsx` | SSR | Org page |
| `/users/:id` | `/(community)/users/[id]/page.tsx` | SSR | User profile |
| `/login/:provider` | API route | - | OAuth handled server-side |

### Page Implementation Details

#### Homepage (`/`)

**Current:** 12,170 bytes, complex news feed
**New:** Server Component with streaming

```tsx
// app/(marketing)/page.tsx
import { Suspense } from 'react'
import { PostFeed } from '@/components/posts/post-feed'
import { TrendingOrgs } from '@/components/organizations/trending-orgs'
import { FeedFilters } from '@/components/posts/feed-filters'
import { PostFeedSkeleton } from '@/components/posts/post-feed-skeleton'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FeedFilters />
          <Suspense fallback={<PostFeedSkeleton />}>
            <PostFeed />
          </Suspense>
        </div>
        <aside>
          <Suspense fallback={<div>Loading...</div>}>
            <TrendingOrgs />
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
```

**Design Upgrades:**
- Hero section with gradient background
- Floating cards with subtle shadows
- Smooth animations on scroll
- Filter pills with active states
- Skeleton loaders during streaming

#### Technology Detail (`/tech/:slug`)

**Current:** Basic detail view
**New:** Rich, visual tech showcase

```tsx
// app/(browse)/tech/[slug]/page.tsx
import { getTechnology } from '@/lib/api/server'
import { TechnologyHeader } from '@/components/technology/technology-header'
import { TechnologyStats } from '@/components/technology/technology-stats'
import { TechnologyStacks } from '@/components/technology/technology-stacks'
import { TechnologyComments } from '@/components/technology/technology-comments'

export async function generateStaticParams() {
  // Generate paths for top technologies
  const techs = await getTopTechnologies()
  return techs.map(tech => ({ slug: tech.slug }))
}

export default async function TechnologyPage({ params }) {
  const tech = await getTechnology(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <TechnologyHeader technology={tech} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none">
            <h2>About {tech.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: tech.descriptionHtml }} />
          </div>

          <TechnologyStacks technologyId={tech.id} />
          <TechnologyComments technologyId={tech.id} />
        </div>

        <aside>
          <TechnologyStats technology={tech} />
        </aside>
      </div>
    </div>
  )
}
```

**Design Upgrades:**
- Large logo with gradient background
- Animated stat counters
- Bento grid layout for related stacks
- Floating favorite button with haptic feedback
- Tabbed navigation for comments/versions

#### Stack Detail (`/stacks/:slug`)

**New:** Pinterest-style technology grid

```tsx
// app/(browse)/stacks/[slug]/page.tsx
import { getStack } from '@/lib/api/server'
import { StackHeader } from '@/components/stacks/stack-header'
import { TechnologyGrid } from '@/components/technology/technology-grid'

export default async function StackPage({ params }) {
  const stack = await getStack(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <StackHeader stack={stack} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <TechnologyGrid
          technologies={stack.technologies}
          groupBy="tier"
          layout="masonry"
        />
      </div>
    </div>
  )
}
```

**Design Upgrades:**
- Masonry grid for technologies
- Group by tier with collapsible sections
- Hover effects showing tech details
- Connection lines between related techs

#### Post Detail (`/posts/:id/:slug`)

**New:** Clean, readable post view

```tsx
// app/(community)/posts/[id]/[slug]/page.tsx
import { getPost } from '@/lib/api/server'
import { PostHeader } from '@/components/posts/post-header'
import { PostContent } from '@/components/posts/post-content'
import { CommentThread } from '@/components/posts/comment-thread'
import { VoteButtons } from '@/components/posts/vote-buttons'

export default async function PostPage({ params }) {
  const post = await getPost(params.id)

  return (
    <article className="container max-w-4xl mx-auto px-4 py-8">
      <PostHeader post={post} />

      <div className="flex gap-8 mt-8">
        <aside className="sticky top-8 h-fit">
          <VoteButtons
            postId={post.id}
            upVotes={post.upVotes}
            downVotes={post.downVotes}
          />
        </aside>

        <div className="flex-1">
          <PostContent post={post} />

          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">
              {post.commentsCount} Comments
            </h2>
            <CommentThread postId={post.id} />
          </div>
        </div>
      </div>
    </article>
  )
}
```

**Design Upgrades:**
- Sticky vote buttons on left (Reddit-style)
- Beautiful typography with @tailwindcss/typography
- Syntax highlighting for code blocks
- Nested comment threads with indent lines
- Smooth collapse/expand animations

#### Organization Page (`/organizations/:slug`)

**New:** Rich organization hub

```tsx
// app/(community)/organizations/[slug]/page.tsx
import { getOrganization } from '@/lib/api/server'
import { OrgHeader } from '@/components/organizations/org-header'
import { OrgTabs } from '@/components/organizations/org-tabs'
import { PostFeed } from '@/components/posts/post-feed'
import { MemberGrid } from '@/components/organizations/member-grid'

export default async function OrganizationPage({ params }) {
  const org = await getOrganization(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <OrgHeader organization={org} />

      <OrgTabs>
        <TabsContent value="posts">
          <PostFeed organizationId={org.id} />
        </TabsContent>

        <TabsContent value="members">
          <MemberGrid members={org.members} />
        </TabsContent>

        <TabsContent value="about">
          <OrgAbout organization={org} />
        </TabsContent>
      </OrgTabs>
    </div>
  )
}
```

**Design Upgrades:**
- Cover photo with gradient overlay
- Member avatars in a grid
- Activity timeline
- Category badges with colors

---

## 6. API Integration Strategy

### ServiceStack Client Setup

```typescript
// lib/api/client.ts
import { JsonServiceClient } from '@servicestack/client'

export const baseUrl = typeof window === 'undefined'
  ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  : ''

export const client = new JsonServiceClient(baseUrl)

// Add auth token to requests
client.requestFilter = (req) => {
  const token = getAuthToken()
  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`)
  }
}

// Handle errors globally
client.exceptionFilter = (res, error) => {
  if (error.responseStatus?.errorCode === 'Unauthorized') {
    // Redirect to login
    window.location.href = '/auth/github'
  }
  throw error
}
```

### React Query Integration

```typescript
// lib/api/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from './client'
import {
  GetTechnology,
  QueryTechnology,
  CreateTechnology,
  UpdateTechnology
} from './dtos'

// Query: Get single technology
export function useTechnology(slug: string) {
  return useQuery({
    queryKey: ['technology', slug],
    queryFn: async () => {
      const request = new GetTechnology()
      request.slug = slug
      return await client.get(request)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Query: Search technologies
export function useTechnologies(filters: TechnologyFilters) {
  return useQuery({
    queryKey: ['technologies', filters],
    queryFn: async () => {
      const request = new QueryTechnology()
      Object.assign(request, filters)
      return await client.get(request)
    },
    keepPreviousData: true,
  })
}

// Mutation: Create technology
export function useCreateTechnology() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTechnologyData) => {
      const request = new CreateTechnology()
      Object.assign(request, data)
      return await client.post(request)
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries(['technologies'])
    },
  })
}

// Mutation: Vote on post (optimistic update)
export function useVotePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, weight }: VoteData) => {
      const request = new UserPostVote()
      request.id = postId
      request.weight = weight
      return await client.put(request)
    },
    onMutate: async ({ postId, weight }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries(['post', postId])

      // Snapshot previous value
      const previous = queryClient.getQueryData(['post', postId])

      // Optimistically update
      queryClient.setQueryData(['post', postId], (old: any) => ({
        ...old,
        upVotes: old.upVotes + (weight > 0 ? 1 : 0),
        downVotes: old.downVotes + (weight < 0 ? 1 : 0),
        points: old.points + weight,
      }))

      return { previous }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(['post', variables.postId], context.previous)
      }
    },
  })
}
```

### Server-Side Data Fetching

```typescript
// lib/api/server.ts
import { cookies } from 'next/headers'
import { JsonServiceClient } from '@servicestack/client'
import { GetTechnology, QueryPosts } from './dtos'

const serverClient = new JsonServiceClient(process.env.API_URL || 'http://localhost:5000')

// Add auth from cookies
serverClient.requestFilter = (req) => {
  const cookieStore = cookies()
  const authCookie = cookieStore.get('ss-tok')
  if (authCookie) {
    req.headers.set('Cookie', `ss-tok=${authCookie.value}`)
  }
}

// Server-side data fetching for RSC
export async function getTechnology(slug: string) {
  const request = new GetTechnology()
  request.slug = slug
  return await serverClient.get(request)
}

export async function getPosts(filters: PostFilters) {
  const request = new QueryPosts()
  Object.assign(request, { take: 50, ...filters })
  return await serverClient.get(request)
}
```

### Server Actions for Mutations

```typescript
// lib/api/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { serverClient } from './server'
import { CreateTechnology, UpdatePost } from './dtos'

export async function createTechnology(formData: FormData) {
  const request = new CreateTechnology()
  request.name = formData.get('name') as string
  request.slug = formData.get('slug') as string
  request.tier = formData.get('tier') as TechnologyTier
  // ... map other fields

  try {
    const result = await serverClient.post(request)
    revalidatePath('/tech')
    redirect(`/tech/${result.slug}`)
  } catch (error) {
    return { error: error.message }
  }
}

export async function votePost(postId: number, weight: number) {
  const request = new UserPostVote()
  request.id = postId
  request.weight = weight

  await serverClient.put(request)
  revalidatePath(`/posts/${postId}`)
}
```

---

## 7. State Management Strategy

### Three-Tier State Architecture

**1. Server State (React Query)**
- All API data
- Automatic caching and revalidation
- Optimistic updates

**2. Global Client State (Zustand)**
- User session
- UI preferences
- Cross-page state

**3. Local Component State (useState)**
- Form inputs
- UI toggles
- Component-specific state

### Zustand Store Setup

```typescript
// lib/stores/user-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  session: SessionInfo | null
  favoriteTechIds: number[]
  favoriteStackIds: number[]
  setSession: (session: SessionInfo | null) => void
  addFavoriteTech: (id: number) => void
  removeFavoriteTech: (id: number) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      session: null,
      favoriteTechIds: [],
      favoriteStackIds: [],

      setSession: (session) => set({
        session,
        favoriteTechIds: session?.favoriteTechnologies || [],
        favoriteStackIds: session?.favoriteTechStacks || [],
      }),

      addFavoriteTech: (id) => set((state) => ({
        favoriteTechIds: [...state.favoriteTechIds, id]
      })),

      removeFavoriteTech: (id) => set((state) => ({
        favoriteTechIds: state.favoriteTechIds.filter(x => x !== id)
      })),
    }),
    {
      name: 'techstacks-user',
      partialize: (state) => ({
        favoriteTechIds: state.favoriteTechIds,
        favoriteStackIds: state.favoriteStackIds,
      })
    }
  )
)

// Selector hooks
export const useIsAuthenticated = () => useUserStore(state => !!state.session)
export const useUser = () => useUserStore(state => state.session)
export const useIsFavorite = (techId: number) =>
  useUserStore(state => state.favoriteTechIds.includes(techId))
```

```typescript
// lib/stores/ui-store.ts
import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  hiddenPostIds: number[]
  toggleSidebar: () => void
  setTheme: (theme: UIState['theme']) => void
  hidePost: (postId: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  theme: 'system',
  hiddenPostIds: [],

  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  setTheme: (theme) => set({ theme }),

  hidePost: (postId) => set((state) => ({
    hiddenPostIds: [...state.hiddenPostIds, postId]
  })),
}))
```

### State Usage Example

```tsx
// components/technology/favorite-button.tsx
'use client'

import { useIsFavorite, useUserStore } from '@/lib/stores/user-store'
import { useFavoriteTech } from '@/lib/api/queries'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export function FavoriteButton({ techId }: { techId: number }) {
  const isFavorite = useIsFavorite(techId)
  const addFavorite = useUserStore(state => state.addFavoriteTech)
  const removeFavorite = useUserStore(state => state.removeFavoriteTech)

  const mutation = useFavoriteTech()

  const handleClick = async () => {
    // Optimistic update
    if (isFavorite) {
      removeFavorite(techId)
    } else {
      addFavorite(techId)
    }

    // API call
    await mutation.mutateAsync(techId)
  }

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      onClick={handleClick}
      disabled={mutation.isLoading}
    >
      <Heart className={isFavorite ? "fill-current" : ""} />
      {isFavorite ? 'Favorited' : 'Favorite'}
    </Button>
  )
}
```

---

## 8. Authentication & Authorization

### Auth Flow

**GitHub OAuth (Recommended):**

```typescript
// app/api/auth/github/route.ts
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const returnUrl = searchParams.get('returnUrl') || '/'

  // ServiceStack handles OAuth, just redirect
  redirect(`/auth/github?continue=${encodeURIComponent(returnUrl)}`)
}
```

**Session Management:**

```typescript
// lib/auth/session.ts
import { cookies } from 'next/headers'
import { SessionInfo } from '@/lib/api/dtos'
import { serverClient } from '@/lib/api/server'

export async function getServerSession(): Promise<SessionInfo | null> {
  try {
    const request = new SessionInfo()
    return await serverClient.get(request)
  } catch {
    return null
  }
}

export function getAuthToken() {
  if (typeof window === 'undefined') {
    const cookieStore = cookies()
    return cookieStore.get('ss-tok')?.value
  } else {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('ss-tok='))
      ?.split('=')[1]
  }
}
```

**Client-Side Auth Hook:**

```typescript
// lib/hooks/use-auth.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/lib/stores/user-store'
import { client } from '@/lib/api/client'
import { SessionInfo } from '@/lib/api/dtos'

export function useAuth() {
  const setSession = useUserStore(state => state.setSession)

  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const request = new SessionInfo()
        const result = await client.get(request)
        setSession(result)
        return result
      } catch {
        setSession(null)
        return null
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  })

  return {
    session,
    isAuthenticated: !!session,
    isLoading,
    user: session,
  }
}
```

**Protected Route Middleware:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/tech/new',
  '/stacks/new',
  '/posts/new',
  '/dashboard',
  '/settings',
]

export function middleware(request: NextRequest) {
  const hasAuth = request.cookies.has('ss-tok')
  const { pathname } = request.nextUrl

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !hasAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/api/auth/github'
    url.searchParams.set('returnUrl', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

**Authorization Components:**

```tsx
// components/auth/require-auth.tsx
'use client'

import { useAuth } from '@/lib/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/api/auth/github?returnUrl=' + window.location.pathname)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
```

---

## 9. Design System & Styling

### Tailwind CSS v4 Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-bottom': 'slide-in-from-bottom 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
```

### CSS Variables

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
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
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
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

### Design Principles

**1. Visual Hierarchy**
- Large, bold headings with gradient text
- Clear spacing between sections
- Prominent CTAs with hover effects

**2. Color Palette**
- Primary: Blue (#3B82F6) - tech, modern
- Secondary: Purple (#8B5CF6) - accent, premium
- Success: Green (#10B981) - upvotes, positive
- Danger: Red (#EF4444) - downvotes, warnings
- Neutral: Slate (#64748B) - text, borders

**3. Typography**
- Headings: Inter (font-bold, font-semibold)
- Body: Inter (font-normal)
- Code: JetBrains Mono (font-mono)
- Scale: text-xs → text-sm → text-base → text-lg → text-xl → text-2xl → text-3xl → text-4xl

**4. Spacing**
- Consistent: 4px grid (space-1, space-2, space-4, space-8)
- Generous whitespace
- Breathing room between sections

**5. Animations**
- Subtle: opacity, scale, translate
- Fast: 150-300ms transitions
- Spring physics for modals
- Scroll-triggered animations with Framer Motion

**6. Components**
- Rounded corners: rounded-lg (8px)
- Shadows: shadow-sm, shadow-md, shadow-lg
- Borders: 1px solid with low opacity
- Hover states: lift + shadow increase

### Modern UI Patterns

**Bento Grid Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="col-span-2 row-span-2">
    {/* Featured content */}
  </Card>
  <Card>{/* Smaller card */}</Card>
  <Card>{/* Smaller card */}</Card>
</div>
```

**Gradient Backgrounds:**
```tsx
<div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
  {/* Hero section */}
</div>
```

**Glassmorphism:**
```tsx
<div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg">
  {/* Floating card */}
</div>
```

**Floating Labels:**
```tsx
<div className="relative">
  <input
    id="name"
    className="peer"
    placeholder=" "
  />
  <label
    htmlFor="name"
    className="absolute left-2 -top-2.5 peer-placeholder-shown:top-2"
  >
    Name
  </label>
</div>
```

---

## 10. Feature Migration Plan

### Priority 1: Core Browsing (Week 1-2)

**Features:**
- Technology listing and search
- Stack listing and search
- Technology detail pages
- Stack detail pages
- Homepage news feed
- Basic navigation

**Acceptance Criteria:**
- Users can browse all technologies
- Users can search by name, tier, vendor
- Users can view technology details
- Users can see which stacks use a technology
- Users can browse and search stacks
- Users can view stack details
- Homepage shows latest posts

### Priority 2: User Accounts & Auth (Week 2)

**Features:**
- GitHub OAuth login
- Session management
- User profile pages
- User authentication state
- Protected routes

**Acceptance Criteria:**
- Users can sign in with GitHub
- Users see their profile info
- Protected pages require login
- Session persists across page loads
- Users can sign out

### Priority 3: Content Creation (Week 3)

**Features:**
- Create/edit technologies
- Create/edit stacks
- Create/edit posts
- File uploads (logos)
- Form validation

**Acceptance Criteria:**
- Authenticated users can create technologies
- Users can upload technology logos
- Users can create technology stacks
- Users can create posts with markdown
- Forms validate input and show errors
- Successful submissions redirect appropriately

### Priority 4: Social Features (Week 4)

**Features:**
- Post voting (up/down)
- Comment on posts
- Nested comment threads
- Vote on comments
- Favorite technologies/stacks
- User karma

**Acceptance Criteria:**
- Users can vote on posts
- Votes update optimistically
- Users can comment on posts
- Comments can be nested
- Users can vote on comments
- Users can favorite techs/stacks
- Favorites persist and display

### Priority 5: Organizations (Week 5)

**Features:**
- Organization pages
- Create/edit organizations
- Organization members
- Organization categories/labels
- Organization posts
- Member management

**Acceptance Criteria:**
- Users can create organizations
- Organizations have custom pages
- Users can join organizations
- Owners can manage members
- Organizations can create posts
- Categories organize content

### Priority 6: Content Moderation (Week 6)

**Features:**
- Report posts/comments
- Lock/hide posts
- Admin approval workflow
- User banning
- Content flagging

**Acceptance Criteria:**
- Users can report content
- Moderators can lock posts
- Moderators can hide posts
- Admins can ban users
- Reports show in admin queue

### Priority 7: Advanced Features (Week 7-8)

**Features:**
- Post subscriptions
- Email notifications
- Technology version history
- Advanced search filters
- Keyboard shortcuts
- Dark mode
- SEO optimization

**Acceptance Criteria:**
- Users can subscribe to posts
- Subscribers get email notifications
- Technology changes are versioned
- Advanced filters work correctly
- Keyboard shortcuts implemented
- Dark mode toggles properly
- Meta tags optimized for SEO

---

## 11. Migration Phases

### Phase 0: Setup & Foundation (3-5 days)

**Tasks:**
1. Initialize Next.js 15 project with TypeScript
2. Configure Tailwind CSS v4
3. Set up project structure
4. Install core dependencies
5. Configure ESLint and Prettier
6. Set up Git workflow
7. Copy existing `dtos.ts` file
8. Configure ServiceStack client
9. Set up React Query
10. Create base layout and navigation

**Deliverables:**
- Working Next.js app
- Basic navigation working
- ServiceStack API connected
- Development environment ready

### Phase 1: Static Pages & Layouts (1 week)

**Tasks:**
1. Create root layout with header/footer
2. Implement navigation component
3. Create homepage layout (no data)
4. Create technology listing page (static)
5. Create stack listing page (static)
6. Create technology detail page template
7. Create stack detail page template
8. Set up Tailwind design tokens
9. Install and configure shadcn/ui
10. Create base UI components

**Deliverables:**
- All page layouts created
- Navigation works
- Responsive design
- UI component library ready

### Phase 2: Data Integration (1 week)

**Tasks:**
1. Implement server-side data fetching
2. Connect technology listing to API
3. Connect stack listing to API
4. Connect homepage feed to API
5. Implement client-side queries with React Query
6. Add loading states
7. Add error handling
8. Implement search functionality
9. Add filters and sorting
10. Test all data flows

**Deliverables:**
- All browse pages show real data
- Search works
- Filters work
- Loading and error states

### Phase 3: Authentication (3-5 days)

**Tasks:**
1. Set up GitHub OAuth flow
2. Implement session management
3. Create user store (Zustand)
4. Add auth middleware
5. Create protected route wrapper
6. Add sign-in/sign-out buttons
7. Display user info in header
8. Create user profile pages
9. Add authentication to API calls
10. Test authentication flow

**Deliverables:**
- GitHub login works
- Sessions persist
- Protected routes redirect
- User info displays

### Phase 4: Forms & Creation (1-2 weeks)

**Tasks:**
1. Install React Hook Form + Zod
2. Create technology form component
3. Create stack form component
4. Create post form component
5. Implement file upload component
6. Add form validation
7. Connect forms to API mutations
8. Add optimistic updates
9. Handle form errors
10. Add success notifications

**Deliverables:**
- Users can create technologies
- Users can create stacks
- Users can create posts
- File uploads work
- Forms validate properly

### Phase 5: Social Features (1-2 weeks)

**Tasks:**
1. Implement voting system
2. Add optimistic vote updates
3. Create comment components
4. Implement nested comments
5. Add comment voting
6. Create favorite button
7. Implement favorite persistence
8. Add user karma calculation
9. Create activity feeds
10. Test all interactions

**Deliverables:**
- Post voting works
- Comments display correctly
- Comment voting works
- Favorites work
- User activity shows

### Phase 6: Organizations (1 week)

**Tasks:**
1. Create organization pages
2. Implement organization forms
3. Add member management
4. Create category/label management
5. Implement organization posts
6. Add member roles
7. Create organization settings
8. Add organization navigation
9. Implement permissions
10. Test organization features

**Deliverables:**
- Organizations display
- Users can create orgs
- Member management works
- Organization posts work

### Phase 7: Moderation (3-5 days)

**Tasks:**
1. Create report dialog
2. Implement report submission
3. Add lock/hide post functionality
4. Create admin queue
5. Implement ban user flow
6. Add moderation permissions
7. Create moderation UI
8. Test moderation features

**Deliverables:**
- Content reporting works
- Moderators can lock/hide
- Admin queue displays
- Banning works

### Phase 8: Polish & Optimization (1 week)

**Tasks:**
1. Implement keyboard shortcuts
2. Add dark mode
3. Optimize images
4. Add loading skeletons
5. Implement infinite scroll
6. Add animations
7. Optimize bundle size
8. Add SEO meta tags
9. Implement sitemap
10. Performance testing

**Deliverables:**
- Dark mode works
- Fast page loads
- Smooth animations
- Good SEO scores
- Passing Lighthouse audit

### Phase 9: Testing & QA (3-5 days)

**Tasks:**
1. Manual testing of all features
2. Cross-browser testing
3. Mobile responsiveness testing
4. Accessibility audit
5. Performance testing
6. Fix bugs
7. User acceptance testing
8. Security review
9. Final polish

**Deliverables:**
- All features tested
- Bugs fixed
- Performance optimized
- Accessibility compliant

### Phase 10: Deployment (2-3 days)

**Tasks:**
1. Set up production environment
2. Configure environment variables
3. Build production bundle
4. Deploy to hosting
5. Configure CDN
6. Set up monitoring
7. Test production deployment
8. Update DNS if needed
9. Monitor for issues

**Deliverables:**
- App deployed to production
- Monitoring in place
- Production stable

---

## 12. Development Workflow

### Daily Development Process

**1. Start Development Server:**
```bash
npm run dev              # Next.js dev server on :3000
cd ../TechStacks && dotnet run  # Backend on :5000
```

**2. Feature Development:**
```bash
# Create feature branch
git checkout -b feature/tech-listing

# Make changes, commit frequently
git add .
git commit -m "feat: add technology listing page"

# Push and create PR
git push origin feature/tech-listing
```

**3. Code Quality:**
```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

### Scripts Setup

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "generate:dtos": "cd lib/api && x ts && tsc -m ES6 dtos.ts"
  }
}
```

### Component Development Pattern

**1. Create the component:**
```tsx
// components/technology/technology-card.tsx
import { Technology } from '@/lib/api/dtos'
import { Card } from '@/components/ui/card'

interface TechnologyCardProps {
  technology: Technology
}

export function TechnologyCard({ technology }: TechnologyCardProps) {
  return (
    <Card>
      {/* Implementation */}
    </Card>
  )
}
```

**2. Add to Storybook (optional):**
```tsx
// components/technology/technology-card.stories.tsx
import { TechnologyCard } from './technology-card'

export default {
  title: 'Technology/TechnologyCard',
  component: TechnologyCard,
}

export const Default = {
  args: {
    technology: {
      id: 1,
      name: 'React',
      slug: 'react',
      // ...
    }
  }
}
```

**3. Use in page:**
```tsx
// app/(browse)/tech/page.tsx
import { TechnologyCard } from '@/components/technology/technology-card'
import { getTechnologies } from '@/lib/api/server'

export default async function TechPage() {
  const technologies = await getTechnologies()

  return (
    <div className="grid grid-cols-3 gap-4">
      {technologies.map(tech => (
        <TechnologyCard key={tech.id} technology={tech} />
      ))}
    </div>
  )
}
```

---

## 13. Testing Strategy

### Testing Levels

**1. Unit Tests (Vitest)**
```typescript
// lib/utils/slugify.test.ts
import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('converts string to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('handles special characters', () => {
    expect(slugify('React.js & Vue.js')).toBe('reactjs-vuejs')
  })
})
```

**2. Component Tests (React Testing Library)**
```typescript
// components/ui/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

**3. Integration Tests (Playwright)**
```typescript
// e2e/technology.spec.ts
import { test, expect } from '@playwright/test'

test('user can create technology', async ({ page }) => {
  await page.goto('/tech/new')

  await page.fill('[name="name"]', 'TypeScript')
  await page.fill('[name="vendorName"]', 'Microsoft')
  await page.selectOption('[name="tier"]', 'ProgrammingLanguage')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/\/tech\/typescript/)
  await expect(page.locator('h1')).toContainText('TypeScript')
})
```

### Test Coverage Goals

- Unit tests: 80%+ coverage
- Component tests: All interactive components
- E2E tests: Critical user flows
- API integration: Mock server responses

---

## 14. Performance Optimization

### Optimization Strategies

**1. Image Optimization**
```tsx
import Image from 'next/image'

<Image
  src={technology.logoUrl}
  alt={technology.name}
  width={200}
  height={200}
  className="rounded-lg"
  loading="lazy"
/>
```

**2. Code Splitting**
```tsx
import dynamic from 'next/dynamic'

const CommentThread = dynamic(() => import('@/components/posts/comment-thread'), {
  loading: () => <CommentThreadSkeleton />,
  ssr: false,
})
```

**3. Data Fetching**
```tsx
// Parallel data fetching
export default async function TechPage({ params }) {
  const [tech, stacks, comments] = await Promise.all([
    getTechnology(params.slug),
    getTechnologyStacks(params.slug),
    getTechnologyComments(params.slug),
  ])

  return <TechnologyDetail tech={tech} stacks={stacks} comments={comments} />
}
```

**4. React Query Caching**
```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
})
```

**5. Bundle Optimization**
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
}
```

### Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## 15. SEO & Accessibility

### SEO Implementation

**1. Meta Tags**
```tsx
// app/(browse)/tech/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const tech = await getTechnology(params.slug)

  return {
    title: `${tech.name} - TechStacks`,
    description: tech.description,
    openGraph: {
      title: tech.name,
      description: tech.description,
      images: [tech.logoUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tech.name,
      description: tech.description,
      images: [tech.logoUrl],
    },
  }
}
```

**2. Structured Data**
```tsx
export default function TechPage({ tech }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tech.name,
    description: tech.description,
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  )
}
```

**3. Sitemap**
```typescript
// app/sitemap.ts
import { getAllTechnologies, getAllStacks } from '@/lib/api/server'

export default async function sitemap() {
  const technologies = await getAllTechnologies()
  const stacks = await getAllStacks()

  const techUrls = technologies.map(tech => ({
    url: `https://techstacks.io/tech/${tech.slug}`,
    lastModified: tech.lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const stackUrls = stacks.map(stack => ({
    url: `https://techstacks.io/stacks/${stack.slug}`,
    lastModified: stack.lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...techUrls, ...stackUrls]
}
```

### Accessibility

**1. Semantic HTML**
```tsx
<article>
  <header>
    <h1>{post.title}</h1>
    <time dateTime={post.created}>{formatDate(post.created)}</time>
  </header>

  <div className="prose">{post.content}</div>

  <footer>
    <VoteButtons postId={post.id} />
  </footer>
</article>
```

**2. ARIA Labels**
```tsx
<button
  aria-label={`Upvote ${post.title}`}
  aria-pressed={hasUpvoted}
  onClick={handleUpvote}
>
  <ChevronUp />
  {post.upVotes}
</button>
```

**3. Keyboard Navigation**
```tsx
export function Dialog({ open, onClose, children }) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onClose}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />
        <RadixDialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onEscapeKeyDown={onClose}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
```

**4. Focus Management**
```tsx
import { useFocusTrap } from '@/lib/hooks/use-focus-trap'

export function Modal({ children }) {
  const trapRef = useFocusTrap()

  return (
    <div ref={trapRef} tabIndex={-1}>
      {children}
    </div>
  )
}
```

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Forms have associated labels
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] No auto-playing media
- [ ] Error messages are clear

---

## 16. Deployment Strategy

### Build Configuration

```javascript
// next.config.ts
const config = {
  reactStrictMode: true,
  output: 'standalone',

  // API proxy to backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + '/:path*',
      },
      {
        source: '/auth/:path*',
        destination: process.env.API_URL + '/auth/:path*',
      },
    ]
  },

  images: {
    domains: ['techstacks.io', 'cdn.techstacks.io'],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL || 'http://localhost:5000',
  },
}

export default config
```

### Deployment Options

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Option 2: Docker**
```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**Option 3: Static Export (SSG only)**
```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
}
```

### Environment Variables

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.techstacks.io
API_URL=http://backend:5000
NEXT_PUBLIC_SITE_URL=https://techstacks.io

# GitHub OAuth
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Monitoring

**1. Error Tracking (Sentry)**
```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

**2. Analytics (Vercel Analytics)**
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Summary & Timeline

### Total Estimated Timeline: 8-10 weeks

**Week 1-2:** Setup, layouts, static pages, data integration
**Week 3:** Authentication
**Week 4:** Forms and content creation
**Week 5:** Social features (voting, comments, favorites)
**Week 6:** Organizations
**Week 7:** Moderation
**Week 8:** Polish, optimization, testing
**Week 9-10:** QA, deployment, monitoring

### Success Criteria

- [ ] All existing features migrated
- [ ] Performance improved (Lighthouse 90+)
- [ ] Mobile responsive
- [ ] Accessibility compliant (WCAG AA)
- [ ] SEO optimized
- [ ] Modern, beautiful UI
- [ ] Fast page loads (< 2s)
- [ ] Zero breaking changes to backend
- [ ] User feedback positive

### Risk Mitigation

**Risk:** Complex state management
**Mitigation:** Use React Query for server state, Zustand for minimal client state

**Risk:** Authentication complexity
**Mitigation:** Leverage existing ServiceStack OAuth, minimal changes needed

**Risk:** Performance issues
**Mitigation:** Server Components by default, code splitting, image optimization

**Risk:** Timeline overrun
**Mitigation:** Phased approach, MVP first, polish later

---

## Next Steps

1. **Get stakeholder approval** on this plan
2. **Set up development environment** (Next.js project)
3. **Create component library** (shadcn/ui setup)
4. **Build first page** (homepage) as proof of concept
5. **Iterate based on feedback**

This migration will result in a modern, performant, visually stunning React application while preserving all existing backend infrastructure and APIs.
