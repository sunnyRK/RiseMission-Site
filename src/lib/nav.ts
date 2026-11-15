import { BLOG_TOPICS, sortedPosts } from "./blog";
import { CHALLENGE_GUIDES, CHALLENGES } from "./site";
import { liveTools, toolPath } from "./tools";

/**
 * One navigation model for header (desktop mega menu + mobile sheet) and
 * footer. Only link to pages that EXIST — no "coming soon" links (they become
 * 404s or thin pages, both bad for crawl budget and trust).
 */

export type NavIcon =
  | "pushups" | "squats" | "walk" | "shake" | "object" | "qr" | "voice" | "math" | "typing" | "memory"
  | "moon" | "sunrise" | "bed" | "book" | "alarm" | "snooze" | "science" | "compare";

export type NavLink = { href: string; label: string; desc?: string; icon?: NavIcon };
export type NavGroup = { title: string; links: NavLink[] };
export type NavMenu = {
  label: string;
  featured: { title: string; links: NavLink[] };
  groups: NavGroup[];
  footer: { text: string; href: string; label: string };
};

const CHALLENGE_ICON: Record<string, NavIcon> = {
  "push-ups": "pushups",
  squats: "squats",
  walk: "walk",
  shake: "shake",
  "object-find": "object",
  "qr-code": "qr",
  voice: "voice",
  math: "math",
  typing: "typing",
  memory: "memory",
};

const TOPIC_ICON: Record<string, NavIcon> = {
  "heavy-sleepers": "bed",
  "snooze-habit": "snooze",
  "waking-up-early": "sunrise",
  "sleep-science": "science",
  "wake-up-challenges": "pushups",
  "alarm-apps": "compare",
};

const challengeLink = (slug: string): NavLink => {
  const c = CHALLENGES.find((x) => x.slug === slug)!;
  return { href: CHALLENGE_GUIDES[c.slug] ?? `/#challenge-${c.slug}`, label: c.name, icon: CHALLENGE_ICON[c.slug] };
};

export function navMenus(): NavMenu[] {
  const latest = sortedPosts().slice(0, 3);
  return [
    {
      label: "Challenges",
      featured: {
        title: "Most used",
        links: [
          { ...challengeLink("push-ups"), desc: "Your camera counts full reps on-device" },
          { ...challengeLink("qr-code"), desc: "Scan a code in another room to stop it" },
          { ...challengeLink("math"), desc: "Solve problems a sleeping brain can't" },
        ],
      },
      groups: [
        { title: "Get your body up", links: ["squats", "walk", "shake", "object-find"].map(challengeLink) },
        { title: "Get your brain on", links: ["voice", "typing", "memory"].map(challengeLink) },
      ],
      footer: { text: "Every physical challenge has a mental backup. Tough, never a trap.", href: "/blog/wake-up-challenges-explained", label: "Which challenge suits you?" },
    },
    {
      label: "Free tools",
      featured: {
        title: "Most used",
        links: liveTools().slice(0, 3).map((t) => ({ href: toolPath(t.slug), label: t.name, desc: t.tagline, icon: t.icon })),
      },
      groups: [
        {
          title: "Data & comparisons",
          links: [
            { href: "/alarm-app-size-comparison", label: "Alarm app size comparison", icon: "alarm" },
            { href: "/sleep-calculator#bed-now", label: "Wake-up time calculator", icon: "sunrise" },
          ],
        },
      ],
      footer: { text: "Free, works in your browser, no sign-up.", href: "/tools", label: "All free tools" },
    },
    {
      label: "Guides",
      featured: {
        title: "Latest",
        links: latest.map((p) => ({ href: `/blog/${p.slug}`, label: p.metaTitle ?? p.title, desc: p.eyebrow })),
      },
      groups: [{ title: "Topics", links: BLOG_TOPICS.map((t) => ({ href: `/blog/topic/${t.slug}`, label: t.name, icon: TOPIC_ICON[t.slug] ?? "book" })) }],
      footer: { text: "Research-backed, sourced, and honest about limits.", href: "/blog", label: "All articles" },
    },
  ];
}
