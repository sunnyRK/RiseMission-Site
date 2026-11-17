/**
 * App-mirrored design + product data for the homepage. Every value is ported
 * from the live app source (RiseMission/…) so the site and the app look and
 * behave the same. Pure module: safe in server pages and client components.
 *
 *   Challenge hues  → Features/Challenges/ChallengeCarousel.swift (carouselHex)
 *   Times / effort  → MissionPreviewSheet.typicalTime, ChallengeUsage.catalogEffortLabel
 *   3D icons, ranks, XP rules and badges live in src/lib/site.ts (content-owned).
 */

import { RANKS, xpForDay } from "@/lib/site";

export type ChallengeStyle = {
  /** Bright top-leading and deep bottom-trailing gradient stops. */
  top: string;
  deep: string;
  time: string;
  effort: "Body" | "Move" | "Mind" | "Voice";
  /** Light-mode chip ink (Home alarm-card chip, WCAG AA on its tint). */
  ink: string;
};

export const CHALLENGE_STYLE: Record<string, ChallengeStyle> = {
  "push-ups": { top: "#FF8A3D", deep: "#B93A0B", time: "~30 sec", effort: "Body", ink: "#A8481A" },
  squats: { top: "#E879F9", deep: "#86198F", time: "~30 sec", effort: "Body", ink: "#86339F" },
  walk: { top: "#4ADE80", deep: "#13703A", time: "~1 min", effort: "Move", ink: "#1B7444" },
  shake: { top: "#FB7185", deep: "#B0123A", time: "~20 sec", effort: "Move", ink: "#B43235" },
  "object-find": { top: "#38BDF8", deep: "#0B5A8C", time: "~40 sec", effort: "Move", ink: "#12698F" },
  "qr-code": { top: "#FBBF24", deep: "#9A4A06", time: "~45 sec", effort: "Move", ink: "#7D5A00" },
  voice: { top: "#9F8CFF", deep: "#3F2A9E", time: "~15 sec", effort: "Voice", ink: "#6449C4" },
  math: { top: "#4F8DFF", deep: "#1D3FA8", time: "~40 sec", effort: "Mind", ink: "#1C5FB3" },
  typing: { top: "#2DD4BF", deep: "#0B6B63", time: "~30 sec", effort: "Mind", ink: "#0E716A" },
  memory: { top: "#B57BFF", deep: "#5B21B6", time: "~45 sec", effort: "Mind", ink: "#6440BE" },
};

/* ---------------- Levels estimate (rules in site.ts, from LevelEngine.swift) ---------------- */

/** Completed wake-ups needed to reach `xp`, assuming an unbroken streak. */
export function wakesToXP(xp: number, onTime: boolean, routine: boolean): number {
  let total = 0;
  let n = 0;
  while (total < xp) {
    n += 1;
    total += xpForDay({ streak: n, onTime, routine });
  }
  return n;
}

/**
 * Estimated weeks to reach each rank at `perWeek` mission mornings a week.
 * LevelEngine ignores days without a session (no alarm = no streak break),
 * so the streak only depends on how many mornings in a row you complete.
 */
export function weeksToRanks(perWeek: number, onTime: boolean, routine: boolean): number[] {
  const pw = Math.min(7, Math.max(1, Math.round(perWeek)));
  return RANKS.map((r) => (r.xp === 0 ? 0 : Math.ceil(wakesToXP(r.xp, onTime, routine) / pw)));
}

/* ---------------- Merge fallback ---------------- */

export type V16Screen = { id: string; src: string; alt: string; width: number; height: number };

// TODO: switch to V16_SCREENS from media.ts at merge
export const V16_SCREENS_FALLBACK: V16Screen[] = [
  { id: "home", alt: "Rise Mission home screen: a good-morning greeting, a 5:45 AM alarm with a Memory challenge and a 6 day streak card" },
  { id: "challenges", alt: "Challenges tab with a Push-ups mission card, its time and effort chips and a Try it button" },
  { id: "ringing", alt: "Ringing screen with the alarm time and a button to start the wake-up challenge" },
  { id: "success", alt: "Success screen after a completed wake-up challenge with the streak and a level-up card" },
  { id: "stats", alt: "Statistics tab showing Level 1 Sleepyhead, XP progress toward Early Riser and the rank ladder" },
  { id: "focus", alt: "Focus tab with a 25 minute dial, session presets and today's focus minutes" },
  { id: "editor", alt: "Alarm editor with a time wheel, repeat days and the chosen wake-up challenge" },
  { id: "settings", alt: "Settings tab of Rise Mission" },
].map((s) => ({ ...s, src: `/assets/v16/rise-mission-v16-${s.id}.webp`, width: 1320, height: 2868 }));

export const screenById = (screens: V16Screen[], id: string) => screens.find((s) => s.id === id) ?? screens[0];
