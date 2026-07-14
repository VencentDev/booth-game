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
