import { describe, expect, it } from "vitest";
import { DEFAULT_NEED, DEFAULT_NIGHTS, NIGHT_LABELS, clampHours, extraFor, fmtHours, levelFor, sleepDebt } from "../sleep-debt";

describe("sleep debt math", () => {
  it("default week: 8 h need → 8 h debt, 1.5 h surplus, 6.5 h net", () => {
    const d = sleepDebt(DEFAULT_NEED, DEFAULT_NIGHTS);
    expect(d.debtHours).toBe(8);
    expect(d.surplusHours).toBe(1.5);
    expect(d.netHours).toBe(6.5);
    expect(d.shortNights).toBe(5);
    expect(d.avgSlept).toBeCloseTo(7.07, 2);
    expect(d.swingHours).toBe(3);
    expect(d.level).toBe("moderate");
    expect(d.extraMinPerNight).toBe(60);
    expect(d.recoveryNights).toBe(8);
  });

  it("lie-ins don't cancel debt in the headline number", () => {
    const d = sleepDebt(8, [6, 6, 6, 6, 6, 11, 11]);
    expect(d.debtHours).toBe(10);
    expect(d.netHours).toBe(4);
    expect(d.hasBigLieIn).toBe(true);
  });

  it("no debt when every night meets the need", () => {
    const d = sleepDebt(7.5, [7.5, 8, 7.5, 7.75, 8, 7.5, 7.5]);
    expect(d.debtHours).toBe(0);
    expect(d.level).toBe("none");
    expect(d.extraMinPerNight).toBe(0);
    expect(d.recoveryNights).toBe(0);
  });

  it("clamps need and nights to their ranges and snaps to 15 minutes", () => {
    expect(clampHours(12, 6, 10)).toBe(10);
    expect(clampHours(-1, 0, 14)).toBe(0);
    expect(clampHours(Number.NaN, 0, 14)).toBe(0);
    expect(clampHours(6.6, 0, 14)).toBe(6.5);
    expect(sleepDebt(20, [0, 0, 0, 0, 0, 0, 0]).debtHours).toBe(70);
  });

  it("levels and extra-sleep suggestion bands", () => {
    expect(levelFor(0.5)).toBe("none");
    expect(levelFor(3)).toBe("small");
    expect(levelFor(7)).toBe("moderate");
    expect(levelFor(12)).toBe("large");
    expect(extraFor(2)).toBe(30);
    expect(extraFor(5)).toBe(45);
    expect(extraFor(20)).toBe(60);
  });

  it("has seven nights, last one is last night", () => {
    expect(DEFAULT_NIGHTS).toHaveLength(7);
    expect(NIGHT_LABELS[6]).toBe("Last night");
  });

  it("formats hours", () => {
    expect(fmtHours(6.5)).toBe("6 h 30 min");
    expect(fmtHours(8)).toBe("8 h");
    expect(fmtHours(0.25)).toBe("15 min");
    expect(fmtHours(7.07)).toBe("7 h 4 min");
  });
});
