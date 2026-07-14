# Product Card Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revealed matching cards display only the numbered product images from `public/products`.

**Architecture:** Keep card identity and accessibility data in `src/lib/deck.ts`. Keep rendering behavior isolated in `src/components/memory-card.tsx`, with CSS cleanup in `src/app/globals.css` only if selectors become unused or image sizing needs adjustment.

**Tech Stack:** Next.js, React, TypeScript, CSS, Vitest.

## Global Constraints

- Use the existing ten files in `public/products`: `1.jpeg` through `10.jpeg`.
- Keep the existing ten pair definitions and matching behavior.
- Preserve card titles for accessible labels and internal pair identity.
- Remove visible product initials and names from revealed card fronts.
- Remove the unused initials field from card data.
- Keep hidden card backs unchanged.

---

### Task 1: Product Image Card Fronts

**Files:**
- Modify: `src/lib/deck.ts`
- Modify: `src/components/memory-card.tsx`
- Modify: `src/app/globals.css` if visible-name or initials styles are now unused

**Interfaces:**
- Consumes: `Card` type with `title`, `imageUrl`, and `accent` fields.
- Produces: `PAIRS` entries whose `imageUrl` values are `/products/1.jpeg` through `/products/10.jpeg`; `MemoryCard` revealed fronts render only an image in `.image-slot`.

- [ ] **Step 1: Confirm current test baseline**

Run: `pnpm test -- --run`

Expected: PASS for existing deck, format, and best-time-store tests.

- [ ] **Step 2: Update product image URLs**

In `src/lib/deck.ts`, change only the `imageUrl` fields:

```ts
imageUrl: "/products/1.jpeg"
imageUrl: "/products/2.jpeg"
imageUrl: "/products/3.jpeg"
imageUrl: "/products/4.jpeg"
imageUrl: "/products/5.jpeg"
imageUrl: "/products/6.jpeg"
imageUrl: "/products/7.jpeg"
imageUrl: "/products/8.jpeg"
imageUrl: "/products/9.jpeg"
imageUrl: "/products/10.jpeg"
```

Remove the unused `initials` field from the `Card` type, `PairDefinition` type, and each `PAIRS` entry.

- [ ] **Step 3: Simplify revealed card markup**

In `src/components/memory-card.tsx`, replace the `.card-front` contents with:

```tsx
<span className="card-face card-front">
  <span className="image-slot">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" src={card.imageUrl} />
  </span>
</span>
```

Keep `aria-label={label}` on the button so product names remain available to assistive technology.

- [ ] **Step 4: Clean up CSS**

In `src/app/globals.css`, remove selectors that only style deleted markup: `.product-initial`, `.placeholder-art`, `.placeholder-art span`, and `.card-title`. Keep `.image-slot` and `.image-slot img` sizing rules so product images fill the card face cleanly.

- [ ] **Step 5: Verify**

Run: `pnpm test -- --run`

Expected: PASS.

Run: `pnpm lint`

Expected: PASS.

Run: `pnpm build`

Expected: PASS.
