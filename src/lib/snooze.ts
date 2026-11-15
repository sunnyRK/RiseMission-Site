/** Snooze cost math shared by the snooze calculator (client) and its page (server). */

export const SNOOZE_LENGTHS = [5, 9, 10, 15] as const;
export const WEEKS_PER_YEAR = 52;
/** One "full night" = five 90-minute cycles, matching the sleep calculator. */
export const NIGHT_HOURS = 7.5;

export type SnoozeInput = { snoozes: number; minutes: number; days: number };

export type SnoozeCost = {
  perMorningMin: number;
  perWeekMin: number;
  perYearHours: number;
  nights: number;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.round(v)));

export function snoozeCost({ snoozes, minutes, days }: SnoozeInput): SnoozeCost {
  const s = clamp(snoozes, 0, 10);
  const m = clamp(minutes, 0, 60);
  const d = clamp(days, 0, 7);
  const perMorningMin = s * m;
  const perWeekMin = perMorningMin * d;
  const perYearHours = (perWeekMin * WEEKS_PER_YEAR) / 60;
  return { perMorningMin, perWeekMin, perYearHours, nights: perYearHours / NIGHT_HOURS };
}

/** 0 → "0", 3.04 → "3", 12.5 → "12.5", 151.67 → "152". */
export function fmtNumber(v: number): string {
  if (v >= 100) return Math.round(v).toLocaleString("en-US");
  const r = Math.round(v * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

export function shareLine(input: SnoozeInput, cost = snoozeCost(input)): string {
  if (cost.perMorningMin === 0) return "I don't hit snooze. My alarm rings once and I get up.";
  const hours = fmtNumber(cost.perYearHours);
  const nights = fmtNumber(cost.nights);
  return `I snooze ${input.snoozes}× ${input.minutes} min, ${input.days} day${input.days === 1 ? "" : "s"} a week. That's ${hours} hours a year (${nights} full nights of sleep) spent between alarms.`;
}
