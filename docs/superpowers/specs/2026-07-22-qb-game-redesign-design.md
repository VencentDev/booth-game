# QB Game Redesign Design

## Goal

Redesign the matching card game to match the provided QB logo while preserving the existing gameplay, product-photo card fronts, timer, score, restart, give-up, local best time, and PWA behavior.

## Approved Concept

Reference concept: `docs/superpowers/assets/qb-redesign-concept.png`.

The approved direction keeps the product photos as the matching content and uses the QB logo as the visual anchor for the whole app: deep navy background, true white type and photo surfaces, cyan-blue accents, circular brand geometry, branded card backs, and a denser kiosk-style HUD.

## UI Scope

- Add a compact brand header showing the QB logo and "QB MATCH".
- Redesign the HUD into scan-friendly stat modules with cyan dividers and white numerals.
- Redesign controls as crisp navy/white/cyan buttons matching the concept.
- Redesign card backs with the QB logo and concentric ring geometry.
- Redesign card fronts as clean white product-photo tiles with cyan/white borders.
- Update status text to a brand-accent row with a small circular check marker.
- Update PWA metadata, manifest, service worker cache list, and icon references to use `public/icons/qb-logo.png`.

## Constraints

- Do not change deck generation, timing, scoring, matching behavior, best-time persistence, or tests.
- Keep all app text and controls code-native.
- Use the supplied logo asset directly; do not overwrite it.
- Keep card radius at 8px or less.
- Maintain responsive desktop and mobile layouts without clipped text or overlapping UI.

## Verification

- `pnpm build`
- `pnpm lint`
- `pnpm test`
- browser screenshot checks at desktop and mobile sizes
- `view_image` inspection of the approved concept and final screenshots
