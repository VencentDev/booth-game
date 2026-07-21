import { describe, expect, it } from "vitest";
import {
  createRoundStartedAt,
  getSecondsRemaining,
  ROUND_SECONDS,
  startRoundAt
} from "./round-clock";

describe("round clock", () => {
  it("keeps a new round idle until the first card click starts it", () => {
    expect(createRoundStartedAt()).toBeNull();
    expect(getSecondsRemaining(null, 12_000)).toBe(ROUND_SECONDS);
  });

  it("counts down after the first card click starts the round", () => {
    const startedAt = startRoundAt(1_000);

    expect(getSecondsRemaining(startedAt, 1_000)).toBe(ROUND_SECONDS);
    expect(getSecondsRemaining(startedAt, 3_200)).toBe(58);
  });
});
