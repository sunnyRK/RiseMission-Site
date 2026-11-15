import { describe, expect, it } from "vitest";
import {
  describeCountdown,
  fmtClock,
  fmtCountdown,
  isCorrect,
  isTomorrow,
  makeProblem,
  nextOccurrence,
  parseHHMM,
  parseStoredAlarm,
  toHHMM,
} from "../alarm-clock";

/** Small deterministic RNG (mulberry32). */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("alarm time math", () => {
  it("parses and formats HH:MM", () => {
    expect(parseHHMM("06:30")).toBe(390);
    expect(parseHHMM("6:05")).toBe(365);
    expect(parseHHMM("24:00")).toBeNull();
    expect(parseHHMM("abc")).toBeNull();
    expect(toHHMM(390)).toBe("06:30");
    expect(toHHMM(1445)).toBe("00:05");
  });

  it("next occurrence is later today when still ahead", () => {
    const now = new Date(2026, 10, 15, 5, 0, 30);
    const t = nextOccurrence("06:30", now)!;
    expect(new Date(t).getDate()).toBe(15);
    expect(fmtClock(t)).toBe("6:30 AM");
    expect(isTomorrow(t, now)).toBe(false);
  });

  it("next occurrence rolls to tomorrow when the time has passed (or is now)", () => {
    const now = new Date(2026, 10, 15, 6, 30, 0);
    const t = nextOccurrence("06:30", now)!;
    expect(new Date(t).getDate()).toBe(16);
    expect(isTomorrow(t, now)).toBe(true);
    expect(t - now.getTime()).toBe(24 * 3600 * 1000);
  });

  it("rolls over month ends", () => {
    const now = new Date(2026, 10, 30, 23, 0, 0);
    const t = nextOccurrence("07:00", now)!;
    expect(new Date(t).getMonth()).toBe(11);
    expect(new Date(t).getDate()).toBe(1);
  });

  it("formats countdowns", () => {
    expect(fmtCountdown(0)).toBe("0:00");
    expect(fmtCountdown(-5000)).toBe("0:00");
    expect(fmtCountdown(249_000)).toBe("4:09");
    expect(fmtCountdown(3_909_000)).toBe("1:05:09");
    expect(fmtCountdown(1)).toBe("0:01");
    expect(describeCountdown(3_909_000)).toBe("1 hour 6 minutes");
    expect(describeCountdown(30_000)).toBe("1 minute");
    expect(describeCountdown(2 * 3600_000)).toBe("2 hours");
  });

  it("formats clock times with optional seconds", () => {
    expect(fmtClock(new Date(2026, 0, 1, 0, 0, 0).getTime())).toBe("12:00 AM");
    expect(fmtClock(new Date(2026, 0, 1, 12, 7, 9).getTime(), true)).toBe("12:07:09 PM");
  });
});

describe("math challenge", () => {
  it("always produces non-negative integer answers that match the text", () => {
    for (const difficulty of ["easy", "medium"] as const) {
      const rand = seeded(difficulty === "easy" ? 1 : 2);
      for (let i = 0; i < 2000; i++) {
        const p = makeProblem(difficulty, rand);
        expect(Number.isInteger(p.answer)).toBe(true);
        expect(p.answer).toBeGreaterThanOrEqual(0);
        const [a, op, b] = p.text.split(" ");
        const expected = op === "+" ? +a + +b : op === "−" ? +a - +b : +a * +b;
        expect(p.answer).toBe(expected);
      }
    }
  });

  it("easy problems stay small", () => {
    const rand = seeded(7);
    for (let i = 0; i < 500; i++) expect(makeProblem("easy", rand).answer).toBeLessThanOrEqual(68);
  });

  it("checks answers leniently but strictly on value", () => {
    const p = { text: "12 + 30", answer: 42 };
    expect(isCorrect(p, "42")).toBe(true);
    expect(isCorrect(p, " 42 ")).toBe(true);
    expect(isCorrect(p, "+42")).toBe(true);
    expect(isCorrect(p, "41")).toBe(false);
    expect(isCorrect(p, "42.0")).toBe(false);
    expect(isCorrect(p, "")).toBe(false);
  });
});

describe("stored alarm", () => {
  it("round-trips a valid alarm and fills defaults", () => {
    expect(parseStoredAlarm(JSON.stringify({ target: 123, label: "Gym", sound: "beep", challenge: false, difficulty: "medium" }))).toEqual({
      target: 123,
      label: "Gym",
      sound: "beep",
      challenge: false,
      difficulty: "medium",
    });
    expect(parseStoredAlarm(JSON.stringify({ target: 5, sound: "nope" }))).toEqual({
      target: 5,
      label: "",
      sound: "chime",
      challenge: true,
      difficulty: "easy",
    });
  });

  it("rejects garbage", () => {
    expect(parseStoredAlarm(null)).toBeNull();
    expect(parseStoredAlarm("{bad json")).toBeNull();
    expect(parseStoredAlarm(JSON.stringify({ target: "soon" }))).toBeNull();
  });
});
