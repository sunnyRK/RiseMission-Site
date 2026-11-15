/** Nap timing math shared by the nap calculator (client) and its page (server). */

export type NapType = "power" | "recovery" | "full";

export const NAP_TYPES: Record<NapType, { name: string; sleepMin: number; short: string }> = {
  power: { name: "Power nap", sleepMin: 20, short: "Quick boost, little grogginess" },
  recovery: { name: "Recovery nap", sleepMin: 30, short: "More rest, brief grogginess likely" },
  full: { name: "Full cycle", sleepMin: 90, short: "One whole sleep cycle" },
};

export const NAP_ORDER: NapType[] = ["power", "recovery", "full"];

/** Minutes most people take to drift off for a nap. User-adjustable. */
export const DEFAULT_BUFFER_MIN = 10;
export const BUFFER_OPTIONS = [5, 10, 15, 20] as const;

/**
 * Rough window after falling asleep when deep (slow-wave) sleep is most
 * likely. An approximation for planning, not a measurement.
 */
export const DEEP_FROM_MIN = 30;
export const DEEP_TO_MIN = 60;

const mod = (m: number) => ((Math.round(m) % 1440) + 1440) % 1440;

export type NapPlan = {
  type: NapType;
  /** All values are minutes since midnight, 0..1439. */
  asleepAt: number;
  wakeAt: number;
  avoidFrom: number;
  avoidTo: number;
  sleepMin: number;
  /** Total minutes from lying down to the alarm. */
  totalMin: number;
};

export function napPlan(startMin: number, bufferMin: number, type: NapType): NapPlan {
  const sleepMin = NAP_TYPES[type].sleepMin;
  const asleep = startMin + bufferMin;
  return {
    type,
    asleepAt: mod(asleep),
    wakeAt: mod(asleep + sleepMin),
    avoidFrom: mod(asleep + DEEP_FROM_MIN),
    avoidTo: mod(asleep + DEEP_TO_MIN),
    sleepMin,
    totalMin: bufferMin + sleepMin,
  };
}

export function allNapPlans(startMin: number, bufferMin: number) {
  return NAP_ORDER.map((t) => napPlan(startMin, bufferMin, t));
}

/** "1 h 40 min", "25 min". */
export function fmtDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}
