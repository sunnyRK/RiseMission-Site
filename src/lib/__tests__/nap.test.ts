import { describe, expect, it } from "vitest";
import { allNapPlans, fmtDuration, napPlan } from "../nap";
import { fmtTime } from "../sleep";

describe("nap math", () => {
  it("1:00 PM power nap with 10 min to fall asleep → alarm 1:30 PM, avoid 1:40–2:10 PM", () => {
    const p = napPlan(780, 10, "power");
    expect(fmtTime(p.asleepAt)).toBe("1:10 PM");
    expect(fmtTime(p.wakeAt)).toBe("1:30 PM");
    expect(fmtTime(p.avoidFrom)).toBe("1:40 PM");
    expect(fmtTime(p.avoidTo)).toBe("2:10 PM");
    expect(p.totalMin).toBe(30);
  });

  it("returns power, recovery, full in order", () => {
    expect(allNapPlans(780, 15).map((p) => fmtTime(p.wakeAt))).toEqual(["1:35 PM", "1:45 PM", "2:45 PM"]);
  });

  it("wraps past midnight", () => {
    expect(fmtTime(napPlan(1430, 10, "full").wakeAt)).toBe("1:30 AM");
  });

  it("formats durations", () => {
    expect(fmtDuration(25)).toBe("25 min");
    expect(fmtDuration(60)).toBe("1 h");
    expect(fmtDuration(100)).toBe("1 h 40 min");
  });
});
