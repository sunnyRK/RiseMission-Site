import { describe, expect, it } from "vitest";
import {
  ACHIEVEMENT_COUNT,
  ACHIEVEMENTS,
  CHALLENGES,
  LIVE_VERSION,
  NEW_ACHIEVEMENT_COUNT,
  PRICING_COPY,
  RANKS,
  RELEASES,
  V16_FEATURES,
  rankForXP,
  xpForDay,
} from "../site";

/** Mirrors the app's LevelEngine / AchievementEngine (app repo, branch v1.6). */
describe("v1.6 product facts", () => {
  it("live version matches the newest release entry", () => {
    expect(RELEASES[0].version).toBe(LIVE_VERSION);
  });

  it("releases are newest first with real ISO dates", () => {
    const dated = RELEASES.filter((r) => r.date);
    for (const r of dated) expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const dates = dated.map((r) => r.date!);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("six ranks, Sleepyhead to Legend, ascending XP", () => {
    expect(RANKS.map((r) => r.name)).toEqual(["Sleepyhead", "Early Riser", "Morning Pro", "Dawn Chaser", "Sunrise Master", "Legend"]);
    expect(RANKS.map((r) => r.xp)).toEqual([0, 100, 300, 700, 1500, 3000]);
  });

  it("rankForXP matches LevelEngine.Rank.forXP", () => {
    expect(rankForXP(0).name).toBe("Sleepyhead");
    expect(rankForXP(99).name).toBe("Sleepyhead");
    expect(rankForXP(100).name).toBe("Early Riser");
    expect(rankForXP(2999).name).toBe("Sunrise Master");
    expect(rankForXP(10_000).name).toBe("Legend");
  });

  it("xpForDay matches LevelEngine.Award.total", () => {
    expect(xpForDay({ streak: 1, onTime: false, routine: false })).toBe(10);
    expect(xpForDay({ streak: 1, onTime: true, routine: true })).toBe(20);
    expect(xpForDay({ streak: 3, onTime: true, routine: false })).toBe(18); // 15 × 1.2
    expect(xpForDay({ streak: 7, onTime: true, routine: true })).toBe(30); // 20 × 1.5
    expect(xpForDay({ streak: 14, onTime: true, routine: true })).toBe(40); // 20 × 2
    expect(xpForDay({ streak: 0, onTime: false, routine: false })).toBe(10);
  });

  it("15 achievements, 9 new in 1.6, unique names", () => {
    expect(ACHIEVEMENT_COUNT).toBe(15);
    expect(NEW_ACHIEVEMENT_COUNT).toBe(9);
    expect(new Set(ACHIEVEMENTS.map((a) => a.name)).size).toBe(15);
  });

  it("10 challenges, each with a 3D icon", () => {
    expect(CHALLENGES).toHaveLength(10);
    for (const c of CHALLENGES) expect(c.icon3d).toMatch(/^3d-/);
  });

  it("V16_FEATURES have unique ids and short blurbs", () => {
    expect(new Set(V16_FEATURES.map((f) => f.id)).size).toBe(V16_FEATURES.length);
    for (const f of V16_FEATURES) expect(f.blurb.length).toBeLessThanOrEqual(110);
  });

  it("copy follows the honesty rules (no em dash, no trial, no 'no tracking')", () => {
    const text = JSON.stringify({ PRICING_COPY, V16_FEATURES, RELEASES, ACHIEVEMENTS, RANKS });
    expect(text).not.toMatch(/—/);
    expect(text).not.toMatch(/trial/i);
    expect(text).not.toMatch(/no tracking/i);
    expect(text).not.toMatch(/\$\d/);
  });
});
