# TechStacks - Next.js Migration

This is the modernized React + Next.js version of TechStacks, migrating from Nuxt.js + Vuetify.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v3+ (migrating to v4)
- **UI Components:** shadcn/ui + Radix UI
- **State Management:** React Query + Zustand
- **Forms:** React Hook Form + Zod
- **Backend:** ASP.NET Core + ServiceStack (unchanged)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Make sure the backend is running on port 5000:
```bash
cd ../TechStacks
dotnet run
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── api/             # ServiceStack client & queries
│   ├── utils/           # Utility functions
│   └── dtos.ts          # ServiceStack DTOs
└── types/               # TypeScript type definitions
```

## Migration Progress

- [x] Phase 0: Setup & Foundation
- [ ] Phase 1: Static Pages & Layouts
- [ ] Phase 2: Data Integration
- [ ] Phase 3: Authentication
- [ ] Phase 4: Forms & Creation
- [ ] Phase 5: Social Features
- [ ] Phase 6: Organizations
- [ ] Phase 7: Moderation
- [ ] Phase 8: Polish & Optimization
- [ ] Phase 9: Testing & QA
- [ ] Phase 10: Deployment

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [ServiceStack Documentation](https://docs.servicestack.net/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
