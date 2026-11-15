/** Sleep debt math shared by the sleep debt calculator (client) and its page (server). */

export const NEED_MIN = 6;
export const NEED_MAX = 10;
export const NEED_STEP = 0.25;
export const DEFAULT_NEED = 8;

export const SLEPT_MIN = 0;
export const SLEPT_MAX = 14;
export const SLEPT_STEP = 0.25;

/** Oldest night first; the last entry is last night. A typical short-weekday, long-weekend week. */
export const DEFAULT_NIGHTS = [6.5, 6, 7, 6.5, 6, 9, 8.5] as const;

/** Labels for the 7 nights, oldest first. */
export const NIGHT_LABELS = ["7 nights ago", "6 nights ago", "5 nights ago", "4 nights ago", "3 nights ago", "2 nights ago", "Last night"] as const;
export const NIGHT_SHORT = ["-7", "-6", "-5", "-4", "-3", "-2", "Last"] as const;

/** A night counts as a "big lie-in" when it runs this many hours past your need. */
export const LIE_IN_HOURS = 2;

export type DebtLevel = "none" | "small" | "moderate" | "large";

export type SleepDebt = {
  need: number;
  nights: number[];
  /** Sum of every hour slept under your need (extra sleep on other nights is NOT subtracted). */
  debtHours: number;
  /** Hours slept over your need, summed across nights. */
  surplusHours: number;
  /** debt − surplus, floored at 0. Optimistic view if lie-ins fully "paid back" (they don't, fully). */
  netHours: number;
  avgSlept: number;
  avgShortfall: number;
  shortNights: number;
  /** Largest night minus smallest night, in hours. A rough regularity signal. */
  swingHours: number;
  hasBigLieIn: boolean;
  level: DebtLevel;
  /** Suggested extra minutes per night (0, 30, 45 or 60). */
  extraMinPerNight: number;
  /** Nights at that extra amount to cover the debt on paper. */
  recoveryNights: number;
};

const round2 = (v: number) => Math.round(v * 100) / 100;

export function clampHours(v: number, lo: number, hi: number): number {
  if (!Number.isFinite(v)) return lo;
  const snapped = Math.round(v / 0.25) * 0.25;
  return Math.min(hi, Math.max(lo, snapped));
}

export function levelFor(debtHours: number): DebtLevel {
  if (debtHours < 1) return "none";
  if (debtHours < 5) return "small";
  if (debtHours < 10) return "moderate";
  return "large";
}

/** 30 min a night for small debts, up to 60 for large ones. Never asks for more than an hour. */
export function extraFor(debtHours: number): number {
  if (debtHours < 1) return 0;
  if (debtHours < 3.5) return 30;
  if (debtHours < 7) return 45;
  return 60;
}

export function sleepDebt(needInput: number, nightsInput: readonly number[]): SleepDebt {
  const need = clampHours(needInput, NEED_MIN, NEED_MAX);
  const nights = nightsInput.map((n) => clampHours(n, SLEPT_MIN, SLEPT_MAX));
  let debt = 0;
  let surplus = 0;
  let short = 0;
  for (const n of nights) {
    if (n < need) {
      debt += need - n;
      short += 1;
    } else surplus += n - need;
  }
  const count = nights.length || 1;
  const total = nights.reduce((a, b) => a + b, 0);
  const extra = extraFor(debt);
  return {
    need,
    nights,
    debtHours: round2(debt),
    surplusHours: round2(surplus),
    netHours: round2(Math.max(0, debt - surplus)),
    avgSlept: round2(total / count),
    avgShortfall: round2(debt / count),
    shortNights: short,
    swingHours: nights.length ? round2(Math.max(...nights) - Math.min(...nights)) : 0,
    hasBigLieIn: nights.some((n) => n - need >= LIE_IN_HOURS),
    level: levelFor(debt),
    extraMinPerNight: extra,
    recoveryNights: extra ? Math.ceil((debt * 60) / extra) : 0,
  };
}

/** 6.5 → "6 h 30 min", 8 → "8 h", 0.25 → "15 min". */
export function fmtHours(h: number): string {
  const total = Math.round(Math.abs(h) * 60);
  const hh = Math.floor(total / 60);
  const mm = total % 60;
  if (!hh) return `${mm} min`;
  return mm ? `${hh} h ${mm} min` : `${hh} h`;
}

