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
  {
    slug: "sleep-debt-calculator",
    name: "Sleep debt calculator",
    tagline: "Your weekly sleep debt",
    description: "Add up the sleep you've missed over the last 7 nights and get a gentle plan to catch up.",
    icon: "science",
    status: "live",
    lastModified: "2026-11-15",
  },
  {
    slug: "chronotype-quiz",
    name: "Chronotype quiz",
    tagline: "Early bird or night owl?",
    description: "A quick, informal 8-question quiz on your natural sleep timing, with wake-time advice for your type.",
    icon: "sunrise",
    status: "live",
    lastModified: "2026-11-15",
  },
];

export const liveTools = () => TOOLS.filter((t) => t.status === "live");
export const toolPath = (slug: string) => `/${slug}`;
