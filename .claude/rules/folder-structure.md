# Folder Structure

## Source Structure (`src/`)

```
src/
├── api/             # API service layer
│   ├── http.ts      # Base HTTP client (shared Axios/fetch config)
│   ├── auth.service.ts
│   ├── course.service.ts
│   └── health.service.ts
├── components/
│   ├── ui/          # shadcn/ui components — add via: npx shadcn@latest add [name]
│   ├── layout/      # Navbar, Sidebar, layout wrappers
│   └── startup/     # App startup logic (ServerAwakener)
├── pages/           # Page-level route components
│   ├── auth/        # SignIn, SignUp
│   ├── instructor/  # InstructorDashboard, CourseBuilder
│   └── ...
├── store/           # Zustand stores (auth.store.ts)
├── lib/             # Shared utilities
│   ├── utils.ts     # cn() from shadcn
│   ├── jwt.ts       # JWT decode helpers
│   ├── storage.ts   # LocalStorage helpers
│   └── user-utils.ts
├── types/           # TypeScript interfaces and types
│   ├── auth.types.ts
│   └── course.types.ts
├── config/          # App configuration (sidebar.config.ts)
├── assets/          # Static assets (images, SVGs)
└── index.css        # Global styles, CSS variables, Tailwind base
```

## Path Aliases

All internal imports use `@/` mapped to `src/`:

```ts
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import type { Course } from '@/types/course.types'
```

Never use relative paths like `../../components/...`.

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
# Examples:
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add select
```

Components are added to `src/components/ui/` — do not modify them manually.

## Where Things Go

| Thing | Location |
|---|---|
| New page/route | `src/pages/` |
| Reusable component | `src/components/` |
| shadcn/ui component | `src/components/ui/` (via CLI only) |
| Layout wrapper | `src/components/layout/` |
| API call | `src/api/*.service.ts` |
| Global state | `src/store/*.store.ts` |
| Shared types | `src/types/*.types.ts` |
| Utility function | `src/lib/` |
| App constants | `src/config/` |
| Global CSS | `src/index.css` only |
