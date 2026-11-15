/**
 * Pure logic for the online alarm clock (/online-alarm-clock).
 * No DOM, no audio: everything here is unit-tested.
 */

export type Difficulty = "easy" | "medium";
export type SoundId = "chime" | "beep" | "rise";

/** Correct answers needed to stop a ringing alarm when the challenge is on. */
export const PROBLEMS_TO_STOP = 3;

export const STORAGE_KEY = "rm-online-alarm-v1";

/** "HH:MM" (24 h) → minutes since midnight, or null when malformed. */
export function parseHHMM(value: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/** Minutes since midnight → "HH:MM" for an <input type="time">. */
export function toHHMM(min: number): string {
  const v = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
}

/**
 * Next wall-clock occurrence of "HH:MM" after `now` (today if still ahead,
 * otherwise tomorrow), as an epoch ms timestamp in local time. Seconds are 0.
 */
export function nextOccurrence(hhmm: string, now: Date): number | null {
  const min = parseHHMM(hhmm);
  if (min === null) return null;
  const d = new Date(now.getTime());
  d.setHours(Math.floor(min / 60), min % 60, 0, 0);
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1);
  return d.getTime();
}

/** Remaining time as "1:05:09" or "4:09". Never negative. */
export function fmtCountdown(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/** Spoken-style countdown for screen readers: "6 hours 5 minutes". */
export function describeCountdown(ms: number): string {
  const totalMin = Math.max(0, Math.ceil(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} hour${h === 1 ? "" : "s"}`);
  if (m || !h) parts.push(`${m} minute${m === 1 ? "" : "s"}`);
  return parts.join(" ");
}

/** Epoch ms → "6:30 AM" in local time (seconds shown only when non-zero and asked). */
export function fmtClock(ts: number, withSeconds = false): string {
  const d = new Date(ts);
  const h24 = d.getHours();
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = withSeconds ? `:${String(d.getSeconds()).padStart(2, "0")}` : "";
  return `${h}:${mm}${ss} ${h24 < 12 ? "AM" : "PM"}`;
}

/** True when `ts` falls on the calendar day after `now`. */
export function isTomorrow(ts: number, now: Date): boolean {
  const a = new Date(now.getTime());
  a.setHours(0, 0, 0, 0);
  a.setDate(a.getDate() + 1);
  const b = new Date(ts);
  b.setHours(0, 0, 0, 0);
  return a.getTime() === b.getTime();
}

// ---------- Math challenge ----------

export type Problem = { text: string; answer: number };

/** Random integer in [lo, hi] using an injectable RNG (tests pass a seeded one). */
function int(lo: number, hi: number, rand: () => number) {
  return lo + Math.floor(rand() * (hi - lo + 1));
}

/**
 * One arithmetic problem. Answers are always non-negative integers so a
 * half-asleep thumb never needs a minus sign.
 *   easy   → 2-digit + 1/2-digit, or subtraction within 20–60
 *   medium → 2-digit ± 2-digit, or a times-table up to 12 × 9
 */
export function makeProblem(difficulty: Difficulty, rand: () => number = Math.random): Problem {
  const kind = int(0, 2, rand);
  if (difficulty === "easy") {
    if (kind === 2) {
      const a = int(20, 60, rand);
      const b = int(2, 19, rand);
      return { text: `${a} − ${b}`, answer: a - b };
    }
    const a = int(11, 49, rand);
    const b = int(2, 19, rand);
    return { text: `${a} + ${b}`, answer: a + b };
  }
  if (kind === 0) {
    const a = int(23, 89, rand);
    const b = int(14, 79, rand);
    return { text: `${a} + ${b}`, answer: a + b };
  }
  if (kind === 1) {
    const a = int(51, 99, rand);
    const b = int(13, a - 12, rand);
    return { text: `${a} − ${b}`, answer: a - b };
  }
  const a = int(4, 12, rand);
  const b = int(3, 9, rand);
  return { text: `${a} × ${b}`, answer: a * b };
}

/** Lenient answer check: trims spaces, ignores a leading "+", requires an integer. */
export function isCorrect(problem: Problem, input: string): boolean {
  const cleaned = input.trim().replace(/^\+/, "").replace(/\s+/g, "");
  if (!/^\d+$/.test(cleaned)) return false;
  return Number(cleaned) === problem.answer;
}

// ---------- Persistence ----------

export type StoredAlarm = {
  target: number;
  label: string;
  sound: SoundId;
  challenge: boolean;
  difficulty: Difficulty;
};

const SOUNDS: readonly SoundId[] = ["chime", "beep", "rise"];

/** Validate whatever came out of localStorage. Returns null for anything odd. */
export function parseStoredAlarm(raw: string | null): StoredAlarm | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<StoredAlarm>;
    if (typeof v.target !== "number" || !Number.isFinite(v.target)) return null;
    return {
      target: v.target,
      label: typeof v.label === "string" ? v.label.slice(0, 60) : "",
      sound: SOUNDS.includes(v.sound as SoundId) ? (v.sound as SoundId) : "chime",
      challenge: v.challenge !== false,
      difficulty: v.difficulty === "medium" ? "medium" : "easy",
    };
  } catch {
    return null;
  }
}
