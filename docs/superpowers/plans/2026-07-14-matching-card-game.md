# Matching Card Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a no-auth Next.js TypeScript matching card game with a 5x4 board, 60-second timer, restart/give-up controls, flip/match animations, placeholder card art, and IndexedDB fastest-solve persistence.

**Architecture:** Use a client-side Next.js app. Keep deterministic game helpers and IndexedDB helpers in small modules, and keep UI split across HUD, controls, board, and card components. Store current round state in React and persist only the fastest completed solve in IndexedDB.

**Tech Stack:** Next.js, TypeScript, React, CSS Modules or global CSS, IndexedDB, Vitest for helper tests.

## Global Constraints

- Single playable page.
- No backend, accounts, authentication, or external score sharing.
- 5 columns by 4 rows on desktop, responsive grid on smaller screens.
- 20 cards total, representing 10 pairs.
- 60-second countdown per round.
- Restart button to immediately reshuffle and start a new round.
- Give up button to reveal the end state and stop the timer.
- Best solve time persisted in IndexedDB only.
- Card artwork uses swappable placeholder image slots so real pictures can be added later.
- IndexedDB errors are non-fatal.

---

## File Structure

- Create `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, and app scaffold files.
- Create `src/app/layout.tsx` for metadata and root layout.
- Create `src/app/page.tsx` as the client game page.
- Create `src/app/globals.css` for the visual system, layout, responsive board, card animation, and button states.
- Create `src/lib/deck.ts` for card definitions, deck generation, and shuffling.
- Create `src/lib/format.ts` for time formatting.
- Create `src/lib/best-time-store.ts` for IndexedDB read/write.
- Create `src/components/game-hud.tsx`, `src/components/game-controls.tsx`, `src/components/game-board.tsx`, and `src/components/memory-card.tsx`.
- Create `src/lib/deck.test.ts` and `src/lib/format.test.ts`.

---

### Task 1: Scaffold Next.js Project And Test Harness

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

**Interfaces:**
- Produces: runnable Next.js app shell and `pnpm test`.

- [ ] **Step 1: Write minimal scaffold**

Create standard Next.js TypeScript config, a root layout importing `globals.css`, and scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "@next/env": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@eslint/eslintrc": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `pnpm install`

Expected: dependencies install and lockfile is created.

- [ ] **Step 3: Verify scaffold**

Run: `pnpm build`

Expected: Next.js build succeeds with a placeholder page or layout.

- [ ] **Step 4: Commit**

Run: `git add . && git commit -m "chore: scaffold next app"`

---

### Task 2: Deck And Formatting Helpers

**Files:**
- Create: `src/lib/deck.ts`
- Create: `src/lib/format.ts`
- Create: `src/lib/deck.test.ts`
- Create: `src/lib/format.test.ts`

**Interfaces:**
- Produces: `type Card`, `createDeck(seed?: () => number): Card[]`, `shuffleCards<T>(items: T[], random?: () => number): T[]`, `formatSeconds(seconds: number): string`, `formatElapsed(ms: number | null): string`.

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from "vitest";
import { createDeck, shuffleCards } from "./deck";

describe("createDeck", () => {
  it("creates 20 cards with 10 matched pairs", () => {
    const deck = createDeck(() => 0.5);
    expect(deck).toHaveLength(20);
    const pairIds = new Map<string, number>();
    for (const card of deck) {
      pairIds.set(card.pairId, (pairIds.get(card.pairId) ?? 0) + 1);
    }
    expect(pairIds.size).toBe(10);
    expect([...pairIds.values()]).toEqual(Array(10).fill(2));
  });

  it("does not mutate the input when shuffling", () => {
    const source = [1, 2, 3, 4];
    const shuffled = shuffleCards(source, () => 0);
    expect(source).toEqual([1, 2, 3, 4]);
    expect(shuffled).toEqual([2, 3, 4, 1]);
  });
});
```

```ts
import { describe, expect, it } from "vitest";
import { formatElapsed, formatSeconds } from "./format";

describe("formatSeconds", () => {
  it("formats whole seconds as clock text", () => {
    expect(formatSeconds(60)).toBe("1:00");
    expect(formatSeconds(9)).toBe("0:09");
    expect(formatSeconds(-2)).toBe("0:00");
  });
});

describe("formatElapsed", () => {
  it("formats milliseconds as seconds with one decimal", () => {
    expect(formatElapsed(12345)).toBe("12.3s");
    expect(formatElapsed(null)).toBe("--");
  });
});
```

- [ ] **Step 2: Run tests and verify red**

Run: `pnpm test src/lib/deck.test.ts src/lib/format.test.ts`

Expected: tests fail because helper modules do not exist.

- [ ] **Step 3: Implement helpers**

Implement 10 placeholder pairs with stable `pairId`, `title`, `imageUrl`, and `accent` fields. Implement non-mutating Fisher-Yates shuffle and formatting helpers.

- [ ] **Step 4: Run tests and verify green**

Run: `pnpm test src/lib/deck.test.ts src/lib/format.test.ts`

Expected: all helper tests pass.

- [ ] **Step 5: Commit**

Run: `git add src/lib package.json pnpm-lock.yaml && git commit -m "feat: add card deck helpers"`

---

### Task 3: IndexedDB Best-Time Store

**Files:**
- Create: `src/lib/best-time-store.ts`

**Interfaces:**
- Produces: `getBestSolveTime(): Promise<number | null>` and `saveBestSolveTime(ms: number): Promise<void>`.
- Consumes: browser `indexedDB`.

- [ ] **Step 1: Implement non-fatal persistence wrapper**

Use database `matching-card-game`, object store `records`, key `bestSolveMs`, and store the fastest elapsed solve time in milliseconds. Return `null` from reads when IndexedDB is unavailable or errors.

- [ ] **Step 2: Commit**

Run: `git add src/lib/best-time-store.ts && git commit -m "feat: persist best solve time locally"`

---

### Task 4: Game UI Components

**Files:**
- Create: `src/components/game-hud.tsx`
- Create: `src/components/game-controls.tsx`
- Create: `src/components/game-board.tsx`
- Create: `src/components/memory-card.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `Card` from `src/lib/deck.ts`.
- Produces: presentational components for the game page.

- [ ] **Step 1: Implement component APIs**

Create:

```ts
type GameHudProps = {
  timeRemaining: number;
  moves: number;
  matches: number;
  totalPairs: number;
  bestSolveMs: number | null;
};
```

```ts
type GameControlsProps = {
  onRestart: () => void;
  onGiveUp: () => void;
  giveUpDisabled: boolean;
};
```

```ts
type GameBoardProps = {
  cards: Card[];
  selectedIds: string[];
  revealedIds: Set<string>;
  matchedIds: Set<string>;
  disabled: boolean;
  onCardClick: (id: string) => void;
};
```

- [ ] **Step 2: Style components**

Implement dark modern layout, responsive 5x4 board, compact HUD, 3D card flip, placeholder image front, geometric card back, match pulse, focus states, and reduced-motion fallbacks.

- [ ] **Step 3: Commit**

Run: `git add src/components src/app/globals.css && git commit -m "feat: add game interface components"`

---

### Task 5: Game State And Interactions

**Files:**
- Create: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `createDeck`, UI components, `getBestSolveTime`, `saveBestSolveTime`, `formatSeconds`, `formatElapsed`.
- Produces: playable game.

- [ ] **Step 1: Implement client page state**

Use `"use client"`. Track deck, selected cards, matched cards, moves, game status (`playing`, `won`, `lost`, `gave-up`), seconds remaining, start timestamp, best time, and input lock.

- [ ] **Step 2: Implement matching behavior**

Flip two cards at a time. Match pairs stay revealed. Mismatches flip back after a short delay while input is locked. Prevent duplicate-card selection.

- [ ] **Step 3: Implement timer and end states**

Count down from 60 seconds only while playing. End as `lost` when time reaches zero. End as `won` when all 10 pairs are matched. Save best solve time only on `won`.

- [ ] **Step 4: Implement controls**

Restart resets and reshuffles. Give up stops the round and reveals the board.

- [ ] **Step 5: Commit**

Run: `git add src/app/page.tsx src/app/globals.css && git commit -m "feat: implement matching card gameplay"`

---

### Task 6: Verification And Polish

**Files:**
- Modify as needed: `src/app/page.tsx`, `src/app/globals.css`, `src/components/*`, `src/lib/*`

**Interfaces:**
- Consumes: complete app from earlier tasks.
- Produces: verified playable local app.

- [ ] **Step 1: Run automated checks**

Run:

```bash
pnpm test
pnpm build
```

Expected: tests and build pass.

- [ ] **Step 2: Run local app**

Run: `pnpm dev`

Expected: app starts on an available localhost port.

- [ ] **Step 3: Manual browser verification**

Verify:

- Board renders 20 cards.
- Cards flip and mismatches flip back.
- Matches stay visible and animate.
- Timer counts down from 60 seconds.
- Restart resets board and timer.
- Give up ends the round and reveals cards.
- Winning before timeout records best time in IndexedDB.
- Mobile-sized layout does not overlap or clip controls.

- [ ] **Step 4: Commit fixes**

Run: `git add . && git commit -m "fix: polish matching game verification issues"` only if verification required changes.

---

## Self-Review

- Spec coverage: The tasks cover scaffold, no-auth single page, 5x4 board, 20 cards, 60-second timer, restart, give up, IndexedDB best time, placeholder image slots, animations, and responsive verification.
- Placeholder scan: The plan intentionally references placeholder card art as a product requirement. It does not include unresolved TBD/TODO items.
- Type consistency: Component props and helper names are defined before page integration and remain consistent across tasks.

