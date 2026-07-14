import { describe, expect, it } from "vitest";
import { getBestSolveTime, saveBestSolveTime } from "./best-time-store";

describe("best time store", () => {
  it("is non-fatal when IndexedDB is unavailable", async () => {
    await expect(getBestSolveTime()).resolves.toBeNull();
    await expect(saveBestSolveTime(12000)).resolves.toBeUndefined();
  });
});
