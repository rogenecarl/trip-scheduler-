# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trip Scheduler is a web application for scheduling trips and automatically assigning available drivers using AI (Gemini). See `prd/implementation.md` for full requirements and phased implementation plan.

## Development Commands

```bash
pnpm dev          # Start development server at localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Database (Prisma)

```bash
pnpm prisma generate    # Generate Prisma client (outputs to src/lib/generated/prisma)
pnpm prisma migrate dev # Run migrations in development
pnpm prisma studio      # Open Prisma Studio GUI
```

## Architecture

This is a Next.js 16 application using the App Router with React 19.

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
  - Uses route groups: `(landing)/` for landing page routes
- `src/components/ui/` - shadcn/ui components (new-york style)
- `src/components/` - Feature-specific components organized by domain (e.g., `landing/`)
- `src/context/` - React context providers (QueryProvider for TanStack Query)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and generated code
  - `utils.ts` - Contains `cn()` helper for Tailwind class merging
  - `generated/prisma/` - Prisma client output location

### Key Technologies

- **UI**: shadcn/ui with Radix primitives, Tailwind CSS 4, Lucide icons
- **Forms**: react-hook-form with zod validation
- **Data Fetching**: TanStack Query (React Query)
- **Database**: PostgreSQL with Prisma ORM
- **Notifications**: Sonner for toast notifications

### Path Aliases

- `@/*` maps to `./src/*`
- Component imports: `@/components/ui/button`, `@/lib/utils`, `@/hooks/use-mobile`
