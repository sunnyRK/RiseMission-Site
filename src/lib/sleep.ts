/** Sleep-cycle math shared by the calculator (client) and its page (server). */

export const CYCLE_MIN = 90;
export const FALL_ASLEEP_MIN = 15;

/** Pure helpers, exported for tests. Minutes since midnight in, 0..1439 out. */
export function bedtimesFor(wakeMin: number, cycles = [6, 5, 4]) {
  return cycles.map((c) => ({ cycles: c, at: mod(wakeMin - c * CYCLE_MIN - FALL_ASLEEP_MIN), hours: (c * CYCLE_MIN) / 60 }));
}
export function wakeTimesFor(bedMin: number, cycles = [4, 5, 6]) {
  return cycles.map((c) => ({ cycles: c, at: mod(bedMin + FALL_ASLEEP_MIN + c * CYCLE_MIN), hours: (c * CYCLE_MIN) / 60 }));
}
const mod = (m: number) => ((m % 1440) + 1440) % 1440;

export function fmtTime(min: number) {
  const h24 = Math.floor(min / 60);
  const m = min % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
}
