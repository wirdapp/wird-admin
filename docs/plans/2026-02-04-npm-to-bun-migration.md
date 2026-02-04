# npm to Bun Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate from npm to Bun as package manager and runtime while keeping Vite as the bundler.

**Architecture:** Replace npm commands with Bun equivalents across all CI/CD workflows. Delete unused Dockerfile and npm lockfile. Generate new bun.lock.

**Tech Stack:** Bun, Vite, GitHub Actions, Cloudflare Pages

---

## Task 1: Generate bun.lock and verify local setup

**Files:**
- Delete: `package-lock.json`
- Create: `bun.lock` (generated)

**Step 1: Delete package-lock.json**

```bash
rm package-lock.json
```

**Step 2: Delete node_modules for clean install**

```bash
rm -rf node_modules
```

**Step 3: Install dependencies with Bun**

```bash
bun install
```

Expected: Creates `bun.lock`, installs to `node_modules/`

**Step 4: Verify dev server works**

```bash
bun dev
```

Expected: Vite dev server starts on localhost:5173

**Step 5: Verify build works**

```bash
bun run build
```

Expected: Build completes, outputs to `dist/`

**Step 6: Verify lint works**

```bash
bun lint
```

Expected: Biome runs without errors

**Step 7: Commit**

```bash
git add bun.lock
git commit -m "Replace package-lock.json with bun.lock"
```

---

## Task 2: Update .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Add bun.lock to tracked files and clean up npm references**

The `.gitignore` should NOT ignore `bun.lock` (we want it committed). No changes needed since `bun.lock` isn't in the ignore list.

Optionally, we can add a Bun section for clarity. But since `bun.lock` should be tracked, no action needed.

**Step 2: Commit (skip if no changes)**

Only commit if you made changes.

---

## Task 3: Update CI workflow

**Files:**
- Modify: `.github/workflows/ci.yml`

**Step 1: Update the CI workflow**

Replace the entire file with:

```yaml
name: CI

on:
  pull_request:
  workflow_dispatch:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - name: Biome Check
        run: bunx biome check src/ --diagnostic-level=error

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - name: Type Check
        run: bunx tsc --noEmit

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, typecheck]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - name: Build
        run: bun run build
```

**Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "Migrate CI workflow from npm to Bun"
```

---

## Task 4: Update deploy-dev workflow

**Files:**
- Modify: `.github/workflows/deploy-dev.yml`

**Step 1: Update the deploy-dev workflow**

Replace the entire file with:

```yaml
name: Deploy to Dev

on:
  push:
    branches:
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    environment: dev
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - name: Build
        run: bun run build:dev
        env:
          VITE_API_URL: ${{ vars.DEV_API_URL }}
          VITE_MAIN_URL: ${{ vars.DEV_MAIN_URL }}
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=${{ vars.CLOUDFLARE_PROJECT_NAME }} --branch=main
```

**Step 2: Commit**

```bash
git add .github/workflows/deploy-dev.yml
git commit -m "Migrate deploy-dev workflow from npm to Bun"
```

---

## Task 5: Update deploy-production workflow

**Files:**
- Modify: `.github/workflows/deploy-production.yml`

**Step 1: Update the deploy-production workflow**

Replace the entire file with:

```yaml
name: Deploy to Production

on:
  release:
    types: [published]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    environment: production
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - name: Build
        run: bun run build
        env:
          VITE_API_URL: ${{ vars.PRODUCTION_API_URL }}
          VITE_MAIN_URL: ${{ vars.PRODUCTION_MAIN_URL }}
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=${{ vars.CLOUDFLARE_PROJECT_NAME }} --branch=main
```

**Step 2: Commit**

```bash
git add .github/workflows/deploy-production.yml
git commit -m "Migrate deploy-production workflow from npm to Bun"
```

---

## Task 6: Delete unused Dockerfile

**Files:**
- Delete: `Dockerfile`

**Step 1: Delete the Dockerfile**

```bash
rm Dockerfile
```

**Step 2: Commit**

```bash
git add Dockerfile
git commit -m "Remove unused Dockerfile"
```

---

## Task 7: Final verification

**Step 1: Run full local verification**

```bash
bun install
bun dev  # Test dev server starts
# Ctrl+C to stop

bun run build  # Test build works
bun lint       # Test linting works
bunx tsc --noEmit  # Test typecheck works
```

**Step 2: Push and verify CI**

```bash
git push origin feature/typescript-vite-migration
```

Expected: CI workflow runs successfully with Bun
