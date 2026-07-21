# PWA Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the matching card game installable and usable offline after a successful online load.

**Architecture:** Add static PWA assets under `public/`, register a service worker from a small client component, and update Next metadata to advertise the manifest and app icons. Keep game state and UI behavior unchanged.

**Tech Stack:** Next.js App Router, React, TypeScript, static Web App Manifest, browser Service Worker Cache API.

## Global Constraints

- Do not add runtime dependencies for this small app.
- Keep game logic untouched.
- Cache the app shell, Next static chunks, and product images.
- If service workers are unsupported, the game remains playable online.
- Verification includes build, lint, and tests.

---

### Task 1: Static PWA Assets

**Files:**
- Create: `public/manifest.json`
- Create: `public/sw.js`
- Create: `public/icons/icon.svg`
- Create: `public/icons/icon-192.svg`
- Create: `public/icons/icon-512.svg`

**Interfaces:**
- Produces: `/manifest.json`, `/sw.js`, and install icons referenced by metadata.

- [ ] **Step 1: Add manifest**

Create `public/manifest.json` with app name, standalone display, dark theme colors, root start URL, and SVG icons.

- [ ] **Step 2: Add icons**

Create SVG icons at 192 and 512 sizes plus a maskable source icon using the app's dark board and blue card visual style.

- [ ] **Step 3: Add service worker**

Create `public/sw.js` that precaches `/`, manifest, icons, and product images during install; deletes old caches during activate; serves same-origin GET requests with cache-first behavior for static assets and network-first fallback for navigation.

### Task 2: App Registration And Metadata

**Files:**
- Create: `src/components/service-worker-register.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `ServiceWorkerRegister` React client component.
- Consumes: `/sw.js` service worker path.

- [ ] **Step 1: Add registration component**

Create a client component that registers `/sw.js` only in production-capable browsers, logs registration failures with `console.warn`, and avoids work when `navigator.serviceWorker` is unavailable.

- [ ] **Step 2: Update layout metadata**

Add manifest, theme color, app icon metadata, Apple web app hints, and include `<ServiceWorkerRegister />` in the root body.

### Task 3: Verification

**Files:**
- Inspect: `git diff --stat`

**Interfaces:**
- Consumes: all Task 1 and Task 2 outputs.

- [ ] **Step 1: Run build**

Run `pnpm build`. Expected: exit 0.

- [ ] **Step 2: Run lint**

Run `pnpm lint`. Expected: exit 0.

- [ ] **Step 3: Run tests**

Run `pnpm test`. Expected: exit 0.

- [ ] **Step 4: Inspect diff**

Run `git diff --stat` and `git diff --check`. Expected: scoped PWA changes and no whitespace errors.
