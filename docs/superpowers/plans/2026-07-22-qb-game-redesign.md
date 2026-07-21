# QB Game Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing matching card game around the provided QB logo while preserving gameplay and PWA behavior.

**Architecture:** Reuse the existing Next.js App Router structure and component boundaries. Add a brand header in `src/app/page.tsx`, adjust visual markup in `MemoryCard`, retheme `globals.css`, and point PWA metadata/assets to `public/icons/qb-logo.png`.

**Tech Stack:** Next.js, React, TypeScript, CSS, static PWA manifest/service worker.

## Global Constraints

- Do not change deck generation, timing, scoring, matching behavior, best-time persistence, or tests.
- Keep all app text and controls code-native.
- Use the supplied logo asset directly; do not overwrite it.
- Keep card radius at 8px or less.
- Maintain responsive desktop and mobile layouts without clipped text or overlapping UI.

---

### Task 1: Branded App Shell

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `.brand-panel`, `.brand-mark`, `.brand-copy`, `.brand-title`, `.brand-subtitle` styles and markup.

- [ ] Add a brand panel before `GameHud` with `/icons/qb-logo.png`, title `QB MATCH`, and subtitle `Memory sprint`.
- [ ] Update the top row grid so the brand panel, HUD, and controls form one responsive command band.

### Task 2: Card And HUD Theme

**Files:**
- Modify: `src/components/memory-card.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `.back-logo`, `.status-badge`, updated card front/back styles.

- [ ] Replace the abstract card-back mark with the QB logo image and ring elements.
- [ ] Retheme HUD, controls, card backs, card fronts, status text, and responsive breakpoints to match the approved concept.

### Task 3: PWA Brand Alignment

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `public/manifest.json`
- Modify: `public/sw.js`

**Interfaces:**
- Consumes: `/icons/qb-logo.png`.

- [ ] Point app icons and Apple icon metadata to `/icons/qb-logo.png`.
- [ ] Add `/icons/qb-logo.png` to the service worker precache and increment the cache name.

### Task 4: Verification

**Files:**
- Inspect: `git diff --stat`

**Interfaces:**
- Consumes: all redesigned UI and PWA outputs.

- [ ] Run `pnpm build`.
- [ ] Run `pnpm lint`.
- [ ] Run `pnpm test`.
- [ ] Run desktop/mobile browser screenshot checks.
- [ ] Inspect approved concept and final screenshots with `view_image`.
- [ ] Run `git diff --check`.
