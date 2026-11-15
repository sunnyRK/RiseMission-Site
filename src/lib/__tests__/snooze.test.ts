import { describe, expect, it } from "vitest";
import { fmtNumber, shareLine, snoozeCost } from "../snooze";

describe("snooze math", () => {
  it("3 snoozes × 9 min, 5 days a week", () => {
    const c = snoozeCost({ snoozes: 3, minutes: 9, days: 5 });
    expect(c.perMorningMin).toBe(27);
    expect(c.perWeekMin).toBe(135);
    expect(c.perYearHours).toBe(117); // 135 × 52 / 60
    expect(c.nights).toBeCloseTo(15.6, 5);
  });

  it("zero snoozes costs nothing", () => {
    expect(snoozeCost({ snoozes: 0, minutes: 10, days: 7 })).toEqual({ perMorningMin: 0, perWeekMin: 0, perYearHours: 0, nights: 0 });
  });

  it("clamps out-of-range input", () => {
    expect(snoozeCost({ snoozes: 50, minutes: 10, days: 9 }).perWeekMin).toBe(10 * 10 * 7);
    expect(snoozeCost({ snoozes: -2, minutes: 10, days: 3 }).perWeekMin).toBe(0);
  });

  it("formats numbers for display", () => {
    expect(fmtNumber(0)).toBe("0");
    expect(fmtNumber(12.54)).toBe("12.5");
    expect(fmtNumber(3.04)).toBe("3");
    expect(fmtNumber(1516.7)).toBe("1,517");
  });

  it("builds a share line", () => {
    expect(shareLine({ snoozes: 3, minutes: 9, days: 5 })).toBe(
      "I snooze 3× 9 min, 5 days a week. That's 117 hours a year (15.6 full nights of sleep) spent between alarms.",
    );
    expect(shareLine({ snoozes: 0, minutes: 9, days: 5 })).toMatch(/don't hit snooze/);
    expect(shareLine({ snoozes: 1, minutes: 5, days: 1 })).toMatch(/1 day a week/);
  });
});
