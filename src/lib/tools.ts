import type { NavIcon } from "./nav";

/**
 * Free tools registry: feeds /tools hub, nav "Free tools" menu, footer,
 * sitemap, llms.txt and the "More free tools" block on every tool page.
 * Only list tools that exist (status "live").
 */
export type Tool = {
  slug: string;
  name: string;
  /** Short action label for cards/nav. */
  tagline: string;
  description: string;
  icon: NavIcon;
  status: "live" | "building";
  lastModified: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "sleep-calculator",
    name: "Sleep cycle calculator",
    tagline: "Best bedtime for your alarm",
    description: "Bedtimes and wake-up times that line up with 90-minute sleep cycles.",
    icon: "moon",
    status: "live",
    lastModified: "2026-11-15",
  },
  {
    slug: "online-alarm-clock",
    name: "Online alarm clock",
    tagline: "A browser alarm you stop with math",
    description: "Set an alarm in your browser that only stops after you solve a quick math challenge.",
    icon: "alarm",
    status: "live",
    lastModified: "2026-11-15",
  },
  {
    slug: "nap-calculator",
    name: "Nap calculator",
    tagline: "Power nap or full cycle",
    description: "When to wake from a nap so you feel refreshed, not groggy.",
    icon: "bed",
    status: "live",
    lastModified: "2026-11-15",
  },
  {
    slug: "snooze-calculator",
    name: "Snooze cost calculator",
    tagline: "What snoozing costs you a year",
    description: "See how many hours and mornings your snooze habit adds up to.",
    icon: "sunrise",
    status: "live",
    lastModified: "2026-11-15",
  },
];

export const liveTools = () => TOOLS.filter((t) => t.status === "live");
export const toolPath = (slug: string) => `/${slug}`;
