# TechStacks Next.js Application

This is the Next.js 16 implementation of the TechStacks web application, migrated from Nuxt.js 1.4.5.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI Library:** React 19
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **API Client:** @servicestack/client
- **Backend:** C# ServiceStack (unchanged)

## Getting Started

### Prerequisites

- Node.js 20.x LTS
- npm or yarn
- C# Backend running (see TechStacks/TechStacks/README.md)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

### Development

The Next.js app proxies API requests to the C# backend during development. Make sure the C# backend is running at https://localhost:5001

```bash
# Terminal 1: C# Backend
cd ../TechStacks
dotnet run

# Terminal 2: Next.js Frontend
npm run dev
```

## Project Structure

```
nextjs-app/
├── src/
│   ├── app/                     # Next.js App Router (pages)
│   ├── components/              # React components
│   │   ├── ui/                  # Base UI components
│   │   ├── forms/               # Form components
│   │   ├── posts/               # Post-related components
│   │   ├── tech/                # Technology components
│   │   ├── stacks/              # Stack components
│   │   ├── organizations/       # Organization components
│   │   ├── layout/              # Layout components
│   │   └── providers/           # React providers
│   ├── lib/                     # Utilities & configuration
│   │   ├── api/                 # API client & gateway
│   │   ├── hooks/               # Custom React hooks
│   │   ├── stores/              # State management (Zustand)
│   │   └── utils/               # Utility functions
│   ├── shared/                  # Shared with backend
│   │   └── dtos.ts              # ServiceStack DTOs (auto-generated)
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Architecture

### Data Flow

All data flows through the existing C# ServiceStack APIs:

```
React Components → Zustand Store → API Gateway → JsonServiceClient → C# ServiceStack Backend
```

### Key Features

- **Server Components (RSC):** Used for initial data fetching and SEO
- **Client Components:** Used for interactive features
- **API Integration:** Fully integrated with existing ServiceStack backend
- **Type Safety:** Full TypeScript coverage with auto-generated DTOs
- **State Management:** Zustand for global state, React hooks for local state

## Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run build:prod   # Build and output to C# wwwroot

# Type checking
npm run type-check   # Run TypeScript compiler check

# Linting
npm run lint         # Run ESLint
```

## Migration Status

### Phase 1: Foundation ✅ Complete

- [x] Next.js 16 setup
- [x] TypeScript configuration
- [x] Tailwind CSS v4 configuration
- [x] API client and gateway layer
- [x] Zustand store for state management
- [x] Authentication hooks and provider
- [x] Base UI component library
- [x] Root layout with AuthProvider

### Phase 2: Core Pages (Next)

- [ ] Home page (news feed)
- [ ] Technology listing and detail pages
- [ ] Tech stacks listing and detail pages
- [ ] Navigation and routing

## Environment Variables

Create a `.env.local` file:

```env
# Development
NEXT_PUBLIC_API_URL=https://localhost:5001
INTERNAL_API_URL=https://localhost:5001
```

## Building for Production

The production build outputs to the C# project's wwwroot directory:

```bash
npm run build:prod
```

The C# backend will then serve the static files.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ServiceStack Documentation](https://docs.servicestack.net)
- [Migration Plan](../NEXTJS_MIGRATION_PLAN.md)
