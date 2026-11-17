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
