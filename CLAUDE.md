# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wird Admin Dashboard - React admin interface for managing contests, participants, leaderboards, groups, and contest criteria for the Wird app.

## Development Commands

```bash
bun dev            # Start dev server
bun run build      # Build for production
bun run build:dev  # Build for development
bun test           # Run tests with Vitest
bun run lint       # Lint with Biome
bun run lint:fix   # Lint and fix with Biome
bun run format     # Format with Biome
bun run check      # Run all Biome checks
bun run check:fix  # Run all Biome checks and fix
```

## Architecture

### Tech Stack
- **Runtime:** Bun
- **Build:** Vite with TypeScript
- **Framework:** React 18 with React Router v6
- **Data Fetching:** TanStack Query (React Query)
- **UI:** Ant Design
- **Styling:** Emotion CSS-in-JS
- **i18n:** i18next (Arabic default, English supported)
- **HTTP:** Axios
- **Linting/Formatting:** Biome
- **Testing:** Vitest

### Path Aliases
Configured in `vite.config.ts` and `tsconfig.json`:
- `assets/*`, `components/*`, `services/*`, `util/*`, `hooks/*`, `ui/*`, `styles/*`, `data/*`, `types/*`

### Directory Structure
```
src/
├── components/          # Feature-based components (Competition, Groups, Users, etc.)
│   ├── layout/          # DashboardLayout, providers
│   ├── providers/       # App-wide providers (React Query, etc.)
│   └── shared/          # Reusable components (Navbar, Sidebar, Modal)
├── services/            # API layer - one folder per domain with service + queries files
├── types/               # TypeScript type definitions
├── util/                # Utilities (axios config, colors, role helpers)
├── styles/              # Global styles and theme configuration
├── hooks/               # Custom React hooks (useHandleError)
├── ui/                  # Reusable UI utilities (animated-page, error-boundary)
└── data/                # Static data and i18n translations
```

### Key Patterns

**Routing & Data Loading:**
- Routes defined in `src/router.tsx`
- Use `useDashboardData()` from `src/util/routes-data.ts` to access dashboard context

**API Services:**
- Centralized axios instance at `src/util/axios.ts` with auth interceptors
- Services organized by domain: `services/auth/`, `services/contests/`, `services/groups/`
- Each domain has `*.service.ts` (API calls) and `queries.ts` (TanStack Query hooks)
- Token refresh handled automatically via interceptors

**Authentication:**
- Session managed in `src/services/auth/session.ts`
- Role checks via `src/util/roles.ts`

**Internationalization:**
- Default language: Arabic
- Language stored in localStorage (`lang` key)
- Supported: `["ar", "en"]`

**Styling:**
- Color system in `src/styles/index.js`
- Ant Design theme in `src/styles/antd-theme.js`
- RTL support for Arabic
