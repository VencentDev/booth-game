# Matching Card Game Design

## Goal

Create a small Next.js TypeScript matching card game with no authentication. The player has 60 seconds to solve a 5x4 board containing 10 matching pairs. The app records the fastest completed solve locally using IndexedDB.

## Scope

- Single playable page.
- No backend, accounts, authentication, or external score sharing.
- 5 columns by 4 rows on desktop, responsive grid on smaller screens.
- 20 cards total, representing 10 pairs.
- 60-second countdown per round.
- Restart button to immediately reshuffle and start a new round.
- Give up button to reveal the end state and stop the timer.
- Best solve time persisted in IndexedDB only.
- Card artwork uses swappable placeholder image slots so real pictures can be added later.

## Gameplay

The game starts automatically on page load with a shuffled deck. A player can flip two cards at a time. If the two cards match, they stay revealed and receive a matched animation. If they do not match, they flip back after a short delay. Input is locked while mismatched cards are flipping back.

The round ends when all pairs are matched, time reaches zero, or the player clicks Give up. A completed solve records the elapsed time only if all pairs are matched before the 60-second limit. If the elapsed time is lower than the current best, the app updates IndexedDB.

Restart creates a new shuffled round, resets time and move state, and hides all cards.

## UI Design

The interface uses a modern game-table style:

- Neutral dark background with a subtle surface treatment.
- Compact top HUD showing time remaining, moves, matches, and best time.
- Board centered in the primary viewport.
- Cards use a 3D flip animation.
- Card backs use a polished geometric placeholder treatment.
- Card fronts show a consistent placeholder image area and pair label.
- Matched cards animate with a brief pulse or glow, then settle into a subdued completed state.
- Buttons are clear and compact: Restart and Give up.

The placeholder card assets should be implemented in code or static data so future image URLs can replace them without changing game logic.

## Architecture

Use a standard Next.js TypeScript app structure.

- `app/page.tsx`: game page composition and state wiring.
- Component boundaries:
  - `GameBoard`: renders the 5x4 card grid.
  - `MemoryCard`: renders one flippable card.
  - `GameHud`: renders timer, move count, match count, and best time.
  - `GameControls`: renders Restart and Give up.
- Local helper modules:
  - deck generation and shuffle logic.
  - IndexedDB best-time read/write helpers.
  - formatting helpers for seconds and status text.

React state owns the current deck, selected cards, lock state, move count, match count, timer, and game status.

## IndexedDB

Use a small direct IndexedDB wrapper with one database and one object store:

- Database: `matching-card-game`
- Store: `records`
- Key: `bestSolveMs`
- Value: fastest elapsed solve time in milliseconds.

If IndexedDB is unavailable or fails, the game remains playable and simply omits best-time persistence for that session.

## Error Handling

- Ignore card clicks when the game is over, a card is already matched/revealed, or input is locked.
- Prevent selecting the same card twice.
- Treat IndexedDB errors as non-fatal.
- Clamp timer behavior so it cannot continue below zero.

## Testing And Verification

Minimum verification:

- Build passes with TypeScript.
- Lint passes if the scaffold includes linting.
- Game can be solved and records best time.
- Restart resets board and timer.
- Give up ends the round.
- Timer ends the round at 60 seconds.
- Desktop and mobile layouts show the full board without overlap or clipped text.

