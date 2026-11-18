import { BLOG_POSTS, BLOG_TOPICS } from "./blog";
import { CHALLENGE_GUIDES, CHALLENGES, type Icon3D } from "./site";
import { liveTools, toolPath } from "./tools";

/**
 * One navigation model for the header (desktop dropdowns + mobile sheet).
 * Only link to pages that EXIST, no "coming soon" links (they become 404s or thin pages, both bad for crawl budget and trust).
 */

export type NavIcon =
  | "pushups" | "squats" | "walk" | "shake" | "object" | "qr" | "voice" | "math" | "typing" | "memory"
  | "moon" | "sunrise" | "bed" | "book" | "alarm" | "snooze" | "science" | "compare" | "gallery";

export type NavLink = { href: string; label: string; desc?: string; icon?: NavIcon; icon3d?: Icon3D };
export type NavGroup = { title: string; links: NavLink[] };
export type NavMenu = {
  label: string;
  /** Rich rows: clay 3D icon + one-line description. */
  featured: { title: string; links: NavLink[] };
  groups: NavGroup[];
  footer: { text: string; href: string; label: string };
};

/** Hand-picked entry points (not "latest": every post launched the same day). */
const START_HERE = ["best-alarm-apps-for-heavy-sleepers", "how-to-wake-up-as-a-heavy-sleeper", "iphone-alarm-not-going-off"];
/** The newest guides (Nov 2026), surfaced in the Learn menu. */
const NEW_GUIDES: { slug: string; icon3d: Icon3D }[] = [
  { slug: "how-to-set-an-alarm-on-iphone", icon3d: "3d-clock" },
  { slug: "iphone-alarm-apps-alarmkit", icon3d: "3d-phone" },
  { slug: "sunrise-alarm-clock-vs-alarm-app", icon3d: "3d-sun" },
];

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
  "iphone-alarms": "alarm",
};

const TOOL_ICON3D: Record<string, Icon3D> = {
  "sleep-calculator": "3d-moon",
  "online-alarm-clock": "3d-bell",
  "nap-calculator": "3d-clock",
  "snooze-calculator": "3d-calculator",
  "sleep-debt-calculator": "3d-flask",
  "chronotype-quiz": "3d-puzzle",
};

const challengeLink = (slug: string): NavLink => {
  const c = CHALLENGES.find((x) => x.slug === slug)!;
  return { href: CHALLENGE_GUIDES[c.slug] ?? `/#challenge-${c.slug}`, label: c.name, icon: CHALLENGE_ICON[c.slug] };
};

const post = (slug: string) => BLOG_POSTS.find((x) => x.slug === slug)!;

export function navMenus(): NavMenu[] {
  const tools = liveTools();
  return [
    {
      label: "App",
      featured: {
        title: "Rise Mission 1.6",
        links: [
          { href: "/whats-new", label: "What's new in 1.6", desc: "Levels, a 7-day challenge and a morning routine", icon3d: "3d-gift" },
          { href: "/#how-it-works", label: "How it works", desc: "Pick a challenge, then prove you're awake", icon3d: "3d-bell" },
          { href: "/#challenges", label: "All 10 challenges", desc: "Body and brain missions that stop the alarm", icon3d: "3d-target" },
        ],
      },
      groups: [
        { title: "Get your body up", links: ["push-ups", "squats", "walk", "shake", "object-find", "qr-code"].map(challengeLink) },
        { title: "Get your brain on", links: ["math", "voice", "typing", "memory"].map(challengeLink) },
        {
          title: "See it",
          links: [
            { href: "/gallery", label: "Screenshots & videos", icon: "gallery" },
            { href: "/compatibility", label: "iPhone & iOS 26 requirements", icon: "alarm" },
          ],
        },
      ],
      footer: { text: "Every physical challenge has a mental backup. Tough, never a trap.", href: "/blog/wake-up-challenges-explained", label: "Which challenge suits you?" },
    },
    {
      label: "Learn",
      featured: {
        title: "New guides",
        links: NEW_GUIDES.map(({ slug, icon3d }) => {
          const p = post(slug);
          return { href: `/blog/${p.slug}`, label: p.metaTitle ?? p.title, desc: p.eyebrow, icon3d };
        }),
      },
      groups: [
        {
          title: "Start here",
          links: START_HERE.map((slug) => {
            const p = post(slug);
            return { href: `/blog/${p.slug}`, label: p.metaTitle ?? p.title, icon: "book" as const };
          }),
        },
        { title: "Topics", links: BLOG_TOPICS.map((t) => ({ href: `/blog/topic/${t.slug}`, label: t.name, icon: TOPIC_ICON[t.slug] ?? "book" })) },
      ],
      footer: { text: "Research-backed, sourced, and honest about limits.", href: "/blog", label: "All articles" },
    },
    {
      label: "Tools",
      featured: {
        title: "Popular tools",
        links: tools.slice(0, 3).map((t) => ({ href: toolPath(t.slug), label: t.name, desc: t.tagline, icon3d: TOOL_ICON3D[t.slug] ?? "3d-clock" })),
      },
      groups: [
        {
          title: "More tools",
          links: [
            ...tools.slice(3).map((t) => ({ href: toolPath(t.slug), label: t.name, icon: t.icon })),
            { href: "/sleep-calculator#bed-now", label: "Wake-up time calculator", icon: "sunrise" as const },
          ],
        },
      ],
      footer: { text: "Free, works in your browser, no sign-up.", href: "/tools", label: "All sleep tools" },
    },
    {
      label: "Compare",
      featured: {
        title: "Head to head",
        links: [
          { href: "/rise-mission-vs-apple-clock", label: "Rise Mission vs iPhone Clock", desc: "What the built-in Clock app can't do", icon3d: "3d-clock" },
          { href: "/blog/rise-mission-vs-alarmy", label: "Rise Mission vs Alarmy", desc: "Two mission alarms, side by side", icon3d: "3d-target" },
          { href: "/blog/rise-mission-vs-erly", label: "Rise Mission vs Erly", desc: "Challenges, gamification and app size", icon3d: "3d-medal" },
        ],
      },
      groups: [
        {
          title: "Research",
          links: [
            { href: "/alarm-app-size-comparison", label: "Alarm app size comparison", icon: "alarm" },
            { href: `/blog/${post("best-alarm-apps-for-heavy-sleepers").slug}`, label: "Best alarm apps for heavy sleepers", icon: "bed" },
            { href: `/blog/${post("alarmy-alternatives").slug}`, label: "Alarmy alternatives", icon: "compare" },
            { href: `/blog/${post("iphone-alarm-apps-alarmkit").slug}`, label: "How AlarmKit changed alarm apps", icon: "science" },
          ],
        },
      ],
      footer: { text: "Side-by-side comparisons with sources.", href: "/blog/topic/alarm-apps", label: "All alarm app guides" },
    },
    {
      label: "Company",
      featured: {
        title: "Rise Mission",
        links: [
          { href: "/about", label: "About", desc: "Who builds Rise Mission and why", icon3d: "3d-heart" },
          { href: "/support", label: "Support", desc: "Help with alarms, challenges and Pro", icon3d: "3d-shield" },
          { href: "/privacy", label: "Privacy", desc: "What data the app uses, in plain words", icon3d: "3d-lock" },
        ],
      },
      groups: [
        {
          title: "Legal",
          links: [
            { href: "/terms", label: "Terms of use", icon: "book" },
            { href: "/licenses", label: "Licenses and credits", icon: "book" },
          ],
        },
      ],
      footer: { text: "Stuck with an alarm?", href: "/support", label: "Get help" },
    },
  ];
}
