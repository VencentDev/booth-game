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
