# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wird Admin Dashboard - React admin interface for managing contests, participants, leaderboards, groups, and contest criteria for the Wird app.

## Development Commands

```bash
npm start          # Start dev server (local environment)
npm run build      # Build for production
npm test           # Run tests in watch mode
```

Environment is configured via `.env-cmdrc` with `local`, `dev`, and `prod` configurations.

## Architecture

### Tech Stack
- React 18 with Create React App
- React Router v6 (with loader/action patterns)
- Ant Design for UI components
- Emotion for CSS-in-JS styling
- i18next for internationalization (Arabic default, English supported)
- Axios for HTTP requests

### Directory Structure
```
src/
├── components/          # Feature-based components (Competition, Groups, Users, etc.)
│   ├── layout/          # DashboardLayout, loaders
│   └── shared/          # Reusable components (Navbar, Sidebar, Modal)
├── services/            # API layer - one file per domain (auth/, contests/, groups/)
├── util/                # Utilities (axios config, colors, role helpers)
├── styles/              # Global styles and theme configuration
├── hooks/               # Custom React hooks (useHandleError)
├── ui/                  # Reusable UI utilities (animated-page, error-boundary)
└── data/                # Static data and i18n translations
```

### Key Patterns

**Routing & Data Loading:**
- Routes defined in `src/router.jsx`
- `dashboardLoader` in `src/components/layout/dashboard-loader.js` pre-fetches user data
- Use `useDashboardData()` from `src/util/routes-data.js` to access loader data

**API Services:**
- Centralized axios instance at `src/util/axios.js` with auth interceptors
- Services export async functions: `AuthApi.doLogin()`, `ContestsApi.getContests()`
- Token refresh handled automatically via interceptors

**Authentication:**
- Session stored in cookies (`wird-session` key)
- Role checks via `src/util/ContestPeople_Role.js`: `isOwner()`, `isAdmin()`, `isMember()`

**Internationalization:**
- Default language: Arabic
- Language stored in localStorage (`lang` key)
- Supported: `["ar", "en"]`

**Styling:**
- Color system in `src/styles/index.js`
- Ant Design theme in `src/styles/antd-theme.js`
- RTL support for Arabic
