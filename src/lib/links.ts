import { BLOG_POSTS, BLOG_TOPICS, postPath, relatedPosts, topicsForPost, type BlogPost } from "./blog";
import { ACHIEVEMENT_COUNT, LIVE_VERSION } from "./site";
import { TOOLS, toolPath } from "./tools";

/**
 * The internal-link graph (pagedrop pattern: links are data, not ad-hoc JSX).
 *
 *   PAGES          every indexable non-post URL: meta title/description, anchor
 *                  label, breadcrumb parent, hand-set lastModified. Feeds page
 *                  metadata, the sitemap, breadcrumbs, the footer and tests.
 *   POST_TOOL      every post → exactly 1 tool          (post → tool)
 *   TOOL_POSTS     every tool → 2–4 guides              (tool → posts)
 *   COMPARE_LINKS  money pages rotated into every non-comparison post
 *   FOOTER_GROUPS  sitewide footer, keyword anchors
 *   contextualInlinks()  who links to whom inside <main> (tests assert ≥ 3)
 *
 * Posts: hub (breadcrumb + topic chips) + 1 tool + 3 siblings (relatedPosts)
 * + home (breadcrumb) come from BlogLayout using this file.
 * Anchor text: descriptive, keyword-bearing, never "click here".
 */

export type PageKind = "home" | "hub" | "tool" | "compare" | "product" | "doc" | "topic" | "post";

export type PageEntry = {
  path: string;
  /** <title> without the " | Rise Mission" suffix (≤ 44 chars) unless `absoluteTitle`. */
  title: string;
  absoluteTitle?: boolean;
  /** Meta description, 110–155 chars. */
  description: string;
  /** Short keyword anchor used in breadcrumbs, the footer and related-link blocks. */
  label: string;
  kind: PageKind;
  /** Breadcrumb parent (Home is implied as the root). */
  parent?: string;
  /** Hand-set, real content-change date. Never `new Date()`. */
  lastModified: string;
  priority: number;
  /** Legal/utility pages: footer links are enough, no in-content inlink target. */
  utility?: boolean;
};

const tool = (slug: string) => TOOLS.find((t) => t.slug === slug)!;

/** Every indexable URL except posts and topic hubs (those live in blog.ts). */
export const PAGES: PageEntry[] = [
  {
    path: "/",
    title: "Rise Mission: Alarm Clock App for Heavy Sleepers",
    absoluteTitle: true,
    description:
      "The iPhone alarm clock app for heavy sleepers: stop it with a wake-up challenge like push-ups, a walk, a QR scan or math. Rings on Silent. iOS 26+.",
    label: "Rise Mission alarm clock app",
    kind: "home",
    lastModified: "2026-11-17",
    priority: 1,
  },
  {
    path: "/tools",
    title: "Free Sleep & Alarm Tools",
    description:
      "Free sleep and alarm tools: a sleep cycle calculator, nap calculator, online alarm clock and more. They run in your browser with no sign-up.",
    label: "Free sleep tools",
    kind: "hub",
    lastModified: "2026-11-15",
    priority: 0.8,
  },
  {
    path: "/blog",
    title: "Wake-Up Guides & Sleep Tips",
    description:
      "Practical, research-backed guides to waking up on time: heavy sleepers, the snooze habit, early rising and morning routines.",
    label: "Guides",
    kind: "hub",
    lastModified: "2026-11-17",
    priority: 0.7,
  },
  {
    path: "/sleep-calculator",
    title: "Sleep Calculator: Best Time to Wake Up",
    description:
      "Free sleep cycle calculator. Enter your wake-up time to get bedtimes that fit 90-minute cycles, or find the best time to wake if you go to bed now.",
    label: "Sleep cycle calculator",
    kind: "tool",
    parent: "/tools",
    lastModified: tool("sleep-calculator").lastModified,
    priority: 0.9,
  },
  {
    path: "/online-alarm-clock",
    title: "Online Alarm Clock with Math Challenge",
    description:
      "Free online alarm clock that rings in your browser and only stops after you solve 3 math problems. Set a time or a countdown, pick a tone. No sign-up.",
    label: "Online alarm clock",
    kind: "tool",
    parent: "/tools",
    lastModified: tool("online-alarm-clock").lastModified,
    priority: 0.9,
  },
  {
    path: "/nap-calculator",
    title: "Nap Calculator: Power Nap or Full Cycle",
    description:
      "Free nap calculator. Pick a power nap, recovery nap or full 90-minute cycle and get the exact alarm time, plus the deep-sleep window to avoid waking in.",
    label: "Nap calculator",
    kind: "tool",
    parent: "/tools",
    lastModified: tool("nap-calculator").lastModified,
    priority: 0.9,
  },
  {
    path: "/snooze-calculator",
    title: "Snooze Calculator: What Snoozing Costs",
    description:
      "Free snooze calculator. Enter how often you hit snooze and for how long to see the minutes per morning, hours per year and full nights it adds up to.",
    label: "Snooze cost calculator",
    kind: "tool",
    parent: "/tools",
    lastModified: tool("snooze-calculator").lastModified,
    priority: 0.9,
  },
  {
    path: "/sleep-debt-calculator",
    title: "Sleep Debt Calculator: Your Weekly Total",
    description:
      "Free sleep debt calculator. Enter your sleep need and the last 7 nights to see your weekly sleep debt, nightly average and a gentle plan to catch up.",
    label: "Sleep debt calculator",
    kind: "tool",
    parent: "/tools",
    lastModified: tool("sleep-debt-calculator").lastModified,
    priority: 0.9,
  },
  {
    path: "/chronotype-quiz",
    title: "Chronotype Quiz: Early Bird or Night Owl?",
    description:
      "Free 8-question chronotype quiz. Find out if you lean early bird, in between or night owl, and get practical wake-time advice for your type.",
    label: "Chronotype quiz",
    kind: "tool",
    parent: "/tools",
    lastModified: tool("chronotype-quiz").lastModified,
    priority: 0.9,
  },
  {
    path: "/rise-mission-vs-apple-clock",
    title: "Rise Mission vs iPhone Clock Alarm",
    description:
      "The iPhone Clock alarm is free and reliable. Rise Mission adds wake-up challenges. What each does, what it costs, and who should stay with Clock.",
    label: "Rise Mission vs iPhone Clock",
    kind: "compare",
    parent: "/blog/topic/alarm-apps",
    lastModified: "2026-11-17",
    priority: 0.8,
  },
  {
    path: "/alarm-app-size-comparison",
    title: "Alarm App Size Comparison (2026)",
    description:
      "How big are iPhone alarm apps? App Store sizes and ratings for 13 alarm apps, from 20 MB to 348 MB, with methodology and an open dataset.",
    label: "Alarm app size comparison",
    kind: "compare",
    parent: "/blog/topic/alarm-apps",
    lastModified: "2026-11-15",
    priority: 0.8,
  },
  {
    path: "/whats-new",
    title: `What's New in Rise Mission ${LIVE_VERSION}`,
    description: `Rise Mission ${LIVE_VERSION} release notes: levels and XP, the 7-Day Rise Challenge, a morning routine, a bedtime nudge, ${ACHIEVEMENT_COUNT} achievements and a new Focus tab.`,
    label: `What's new in ${LIVE_VERSION}`,
    kind: "product",
    lastModified: "2026-11-17",
    priority: 0.7,
  },
  {
    path: "/gallery",
    title: "Rise Mission Screenshots & Videos",
    description: `Screenshots and videos of Rise Mission ${LIVE_VERSION}, the iPhone alarm that makes you prove you're awake: the ringing screen, challenges, levels, streaks and a demo.`,
    label: "Screenshots and videos",
    kind: "product",
    lastModified: "2026-11-17",
    priority: 0.7,
  },
  {
    path: "/compatibility",
    title: "Which iPhones Run Rise Mission? (iOS 26)",
    description:
      "Rise Mission needs an iPhone on iOS 26 or later because it uses Apple's AlarmKit. Supported models, permissions and why there's no Android or iPad version.",
    label: "iPhone and iOS 26 requirements",
    kind: "product",
    lastModified: "2026-11-17",
    priority: 0.6,
  },
  {
    path: "/about",
    title: "About Rise Mission",
    description:
      "Rise Mission is an independent iPhone alarm app built by Sunny Radadiya for heavy sleepers. Who builds it, why, and how we write our guides.",
    label: "About",
    kind: "doc",
    lastModified: "2026-11-15",
    priority: 0.4,
  },
  {
    path: "/support",
    title: "Help & Support: Alarms and Challenges",
    description:
      "Get help with Rise Mission: setting up alarms and challenges, push-up counting tips, Silent mode, emergency dismiss, and how to contact us.",
    label: "Support",
    kind: "doc",
    lastModified: "2026-11-17",
    priority: 0.3,
    utility: true,
  },
  {
    path: "/privacy",
    title: "Privacy Policy & Data Practices",
    description:
      "How Rise Mission handles your data: alarms stay on your iPhone, camera frames are processed on-device, and analytics aren't linked to your identity.",
    label: "Privacy",
    kind: "doc",
    lastModified: "2026-11-15",
    priority: 0.2,
    utility: true,
  },
  {
    path: "/terms",
    title: "Terms of Use & Subscriptions",
    description:
      "Terms of Use for the Rise Mission iPhone alarm app, including Rise Mission Pro subscriptions, renewals, cancellation and acceptable use.",
    label: "Terms",
    kind: "doc",
    lastModified: "2026-08-21",
    priority: 0.2,
    utility: true,
  },
  {
    path: "/licenses",
    title: "Licenses and Credits",
    description:
      "Third-party art and software credits for the Rise Mission website and iPhone app, including the CC0 3D icon set from 3dicons.",
    label: "Licenses",
    kind: "doc",
    lastModified: "2026-11-17",
    priority: 0.2,
    utility: true,
  },
];

export function getPage(path: string): PageEntry {
  const p = PAGES.find((x) => x.path === path);
  if (!p) throw new Error(`Unknown page: ${path}`);
  return p;
}

/* ------------------------------------------------------------------ */
/* Post ↔ tool                                                         */
/* ------------------------------------------------------------------ */

/** Every post links to exactly one tool (the most useful next step for its reader). */
export const POST_TOOL: Record<string, string> = {
  "how-to-wake-up-as-a-heavy-sleeper": "sleep-calculator",
  "how-to-stop-hitting-snooze": "snooze-calculator",
  "benefits-of-waking-up-early": "chronotype-quiz",
  "best-alarm-apps-for-heavy-sleepers": "online-alarm-clock",
  "alarmy-alternatives": "online-alarm-clock",
  "rise-mission-vs-alarmy": "online-alarm-clock",
  "rise-mission-vs-erly": "online-alarm-clock",
  "wake-up-challenges-explained": "online-alarm-clock",
  "push-up-alarm-clock": "sleep-calculator",
  "squat-alarm-clock": "sleep-calculator",
  "qr-code-alarm-clock": "online-alarm-clock",
  "math-alarm-clock": "online-alarm-clock",
  "step-alarm-clock": "sleep-calculator",
  "sleep-inertia": "nap-calculator",
  "why-do-i-sleep-through-my-alarm": "sleep-debt-calculator",
  "how-to-wake-up-at-5am": "sleep-calculator",
  "does-iphone-alarm-ring-on-silent": "online-alarm-clock",
  "iphone-alarm-not-going-off": "online-alarm-clock",
  "loudest-alarm-sound-iphone": "online-alarm-clock",
  "iphone-alarm-volume-low": "online-alarm-clock",
  "alarm-app-for-adhd": "chronotype-quiz",
  "alarm-that-makes-you-get-out-of-bed": "snooze-calculator",
  "morning-routine-that-sticks": "chronotype-quiz",
};

/** Anchor + one-line pitch for the post → tool card. */
export const TOOL_PITCH: Record<string, string> = {
  "sleep-calculator": "Work backwards from your alarm to a bedtime that fits 90-minute sleep cycles.",
  "online-alarm-clock": "Try a wake-up challenge in your browser: an alarm that stops only after 3 math problems.",
  "nap-calculator": "Time a nap so you wake before deep sleep, not in the middle of it.",
  "snooze-calculator": "See how many hours a year your snooze habit really costs.",
  "sleep-debt-calculator": "Add up last week's missing sleep and get a gentle plan to catch up.",
  "chronotype-quiz": "Find out if you lean early bird or night owl, with wake-time advice for your type.",
};

/** Every tool links to 2–4 guides (rendered under the tool as "Related guides"). */
export const TOOL_POSTS: Record<string, string[]> = {
  "sleep-calculator": ["how-to-wake-up-at-5am", "how-to-wake-up-as-a-heavy-sleeper", "sleep-inertia", "squat-alarm-clock"],
  "online-alarm-clock": ["math-alarm-clock", "wake-up-challenges-explained", "iphone-alarm-not-going-off", "best-alarm-apps-for-heavy-sleepers"],
  "nap-calculator": ["sleep-inertia", "why-do-i-sleep-through-my-alarm", "benefits-of-waking-up-early"],
  "snooze-calculator": ["how-to-stop-hitting-snooze", "alarm-that-makes-you-get-out-of-bed", "sleep-inertia"],
  "sleep-debt-calculator": ["why-do-i-sleep-through-my-alarm", "how-to-wake-up-as-a-heavy-sleeper", "sleep-inertia"],
  "chronotype-quiz": ["benefits-of-waking-up-early", "how-to-wake-up-at-5am", "alarm-app-for-adhd", "morning-routine-that-sticks"],
};

/** Topic hub → its tool(s) and non-post pages (rendered under the hub's answer). */
export const TOPIC_LINKS: Record<string, SimpleLink[]> = {
  "heavy-sleepers": [
    { href: "/sleep-calculator", label: "Sleep cycle calculator" },
    { href: "/sleep-debt-calculator", label: "Sleep debt calculator" },
  ],
  "snooze-habit": [{ href: "/snooze-calculator", label: "Snooze cost calculator" }],
  "waking-up-early": [
    { href: "/chronotype-quiz", label: "Chronotype quiz" },
    { href: "/sleep-calculator", label: "Wake-up time calculator" },
  ],
  "sleep-science": [
    { href: "/nap-calculator", label: "Nap calculator" },
    { href: "/sleep-debt-calculator", label: "Sleep debt calculator" },
  ],
  "wake-up-challenges": [
    { href: "/online-alarm-clock", label: "Online alarm clock with a math challenge" },
    { href: "/gallery", label: "Challenge screenshots and videos" },
  ],
  "iphone-alarms": [
    { href: "/compatibility", label: "Which iPhones run Rise Mission" },
    { href: "/rise-mission-vs-apple-clock", label: "Rise Mission vs the iPhone Clock app" },
  ],
  "alarm-apps": [
    { href: "/rise-mission-vs-apple-clock", label: "Rise Mission vs the iPhone Clock app" },
    { href: "/alarm-app-size-comparison", label: "Alarm app size comparison" },
  ],
};

/** Direct answer under the /blog H1. */
export const BLOG_INDEX_ANSWER =
  "These guides are about waking up on the first alarm: why heavy sleepers sleep through alarms, how to stop snoozing, how to wake up early, and how wake-up challenges work. Every guide cites its sources and has a limits box. They are written by the developer of Rise Mission, an iOS alarm app for heavy sleepers.";

/* ------------------------------------------------------------------ */
/* Comparison (money) pages                                            */
/* ------------------------------------------------------------------ */

export type SimpleLink = { href: string; label: string };

/** Commercial-intent pages. Non-comparison posts each show 3 of these, rotated by slug. */
export const COMPARE_LINKS: SimpleLink[] = [
  { href: "/blog/best-alarm-apps-for-heavy-sleepers", label: "Best alarm apps for heavy sleepers" },
  { href: "/blog/rise-mission-vs-alarmy", label: "Rise Mission vs Alarmy" },
  { href: "/rise-mission-vs-apple-clock", label: "Rise Mission vs the iPhone Clock app" },
  { href: "/blog/alarmy-alternatives", label: "Alarmy alternatives for iPhone" },
  { href: "/blog/rise-mission-vs-erly", label: "Rise Mission vs Erly" },
  { href: "/alarm-app-size-comparison", label: "Alarm app size comparison" },
];

/** FNV-1a: stable per-slug rotation (same idea as blog.ts relatedPosts). */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** 3 comparison links for a post, rotated so every money page gets in-content links. */
export function compareLinksFor(slug: string, n = 3): SimpleLink[] {
  const start = hash(slug) % COMPARE_LINKS.length;
  return Array.from({ length: n }, (_, i) => COMPARE_LINKS[(start + i) % COMPARE_LINKS.length]);
}

/* ------------------------------------------------------------------ */
/* Per-page link sets                                                  */
/* ------------------------------------------------------------------ */

export type PostLinks = {
  hub?: { href: string; label: string };
  tool: { href: string; label: string; pitch: string };
  siblings: BlogPost[];
  compare: SimpleLink[];
};

export function postLinks(slug: string): PostLinks {
  const hub = topicsForPost(slug)[0];
  const t = TOOLS.find((x) => x.slug === POST_TOOL[slug]);
  if (!t) throw new Error(`POST_TOOL missing for ${slug}`);
  const isComparison = topicsForPost(slug).some((x) => x.slug === "alarm-apps");
  return {
    hub: hub ? { href: `/blog/topic/${hub.slug}`, label: hub.name } : undefined,
    tool: { href: toolPath(t.slug), label: t.name, pitch: TOOL_PITCH[t.slug] },
    siblings: relatedPosts(slug, 3),
    compare: isComparison ? [] : compareLinksFor(slug),
  };
}

export function toolLinks(slug: string): BlogPost[] {
  return (TOOL_POSTS[slug] ?? []).map((s) => BLOG_POSTS.find((p) => p.slug === s)).filter((p): p is BlogPost => !!p);
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; path: string };

const crumbName = (path: string): string => {
  if (path === "/") return "Home";
  if (path === "/blog") return "Blog";
  if (path === "/tools") return "Free tools";
  const page = PAGES.find((p) => p.path === path);
  if (page) return page.label;
  const topic = BLOG_TOPICS.find((t) => `/blog/topic/${t.slug}` === path);
  if (topic) return topic.name;
  const post = BLOG_POSTS.find((p) => postPath(p.slug) === path);
  if (post) return post.metaTitle ?? post.title;
  throw new Error(`No crumb for ${path}`);
};

const parentOf = (path: string): string | null => {
  if (path === "/") return null;
  const page = PAGES.find((p) => p.path === path);
  if (page) return page.parent ?? "/";
  if (path.startsWith("/blog/topic/")) return "/blog";
  const slug = path.replace(/^\/blog\//, "");
  if (BLOG_POSTS.some((p) => p.slug === slug)) {
    const hub = topicsForPost(slug)[0];
    return hub ? `/blog/topic/${hub.slug}` : "/blog";
  }
  return "/";
};

/** Home → … → page, for both the visible trail and BreadcrumbList JSON-LD. */
export function crumbsFor(path: string): Crumb[] {
  const out: Crumb[] = [];
  for (let p: string | null = path; p; p = parentOf(p)) out.unshift({ name: crumbName(p), path: p });
  return out;
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export type FooterGroup = { title: string; links: SimpleLink[] };

/** Sitewide footer. `appStore` is resolved to a campaign link by the footer component. */
export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Challenges",
    links: [
      { href: "/blog/push-up-alarm-clock", label: "Push-up alarm clock" },
      { href: "/blog/squat-alarm-clock", label: "Squat alarm clock" },
      { href: "/blog/qr-code-alarm-clock", label: "QR code alarm clock" },
      { href: "/blog/math-alarm-clock", label: "Math alarm clock" },
      { href: "/blog/step-alarm-clock", label: "Step alarm clock" },
      { href: "/blog/wake-up-challenges-explained", label: "Wake-up challenges explained" },
      { href: "/blog/alarm-that-makes-you-get-out-of-bed", label: "Alarms that make you get out of bed" },
    ],
  },
  {
    title: "Tools",
    links: [
      ...TOOLS.filter((t) => t.status === "live").map((t) => ({ href: toolPath(t.slug), label: t.name })),
      { href: "/tools", label: "All free sleep tools" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/blog/topic/heavy-sleepers", label: "Alarm tips for heavy sleepers" },
      { href: "/blog/topic/snooze-habit", label: "How to stop snoozing" },
      { href: "/blog/topic/waking-up-early", label: "How to wake up early" },
      { href: "/blog/topic/sleep-science", label: "Sleep science" },
      { href: "/blog/topic/wake-up-challenges", label: "Mission alarms" },
      { href: "/blog/topic/iphone-alarms", label: "iPhone alarm fixes" },
      { href: "/blog", label: "All wake-up guides" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/blog/topic/alarm-apps", label: "Alarm app comparisons" },
      ...COMPARE_LINKS,
    ],
  },
  {
    title: "App",
    links: [
      { href: "/", label: "Rise Mission alarm app" },
      { href: "/whats-new", label: `What's new in ${LIVE_VERSION}` },
      { href: "/gallery", label: "Screenshots and videos" },
      { href: "/compatibility", label: "iPhone and iOS 26 requirements" },
      { href: "/support", label: "Help and support" },
      { href: "/about", label: "About the developer" },
    ],
  },
];

/** Bottom-bar links (legal + social), rendered small under the groups. */
export const FOOTER_LEGAL: SimpleLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/licenses", label: "Licenses" },
];

/* ------------------------------------------------------------------ */
/* Inlink model (used by tests)                                        */
/* ------------------------------------------------------------------ */

/** Every indexable path, in sitemap order. */
export function allPaths(): string[] {
  return [
    ...PAGES.map((p) => p.path),
    ...BLOG_TOPICS.map((t) => `/blog/topic/${t.slug}`),
    ...BLOG_POSTS.map((p) => postPath(p.slug)),
  ];
}

/**
 * In-content (inside <main>) links this registry guarantees, as source → targets.
 * Sitewide footer/nav links are deliberately NOT counted: a page that only the
 * footer links to is an orphan for ranking purposes.
 */
export function contextualEdges(): Map<string, Set<string>> {
  const edges = new Map<string, Set<string>>();
  const add = (from: string, to: string) => {
    if (from === to) return;
    if (!edges.has(from)) edges.set(from, new Set());
    edges.get(from)!.add(to);
  };
  // Breadcrumb trails (visible on every page except home).
  for (const p of allPaths()) for (const c of crumbsFor(p).slice(0, -1)) add(p, c.path);
  // Hubs list their children.
  for (const t of TOOLS.filter((x) => x.status === "live")) add("/tools", toolPath(t.slug));
  for (const p of BLOG_POSTS) add("/blog", postPath(p.slug));
  for (const t of BLOG_TOPICS) {
    add("/blog", `/blog/topic/${t.slug}`);
    for (const s of t.posts) add(`/blog/topic/${t.slug}`, postPath(s));
    for (const l of TOPIC_LINKS[t.slug] ?? []) add(`/blog/topic/${t.slug}`, l.href);
    for (const o of BLOG_TOPICS) add(`/blog/topic/${t.slug}`, `/blog/topic/${o.slug}`); // "Other topics"
  }
  // Posts: topic chips, tool card, siblings, comparison links, compatibility + what's new line.
  for (const p of BLOG_POSTS) {
    const from = postPath(p.slug);
    const l = postLinks(p.slug);
    for (const t of topicsForPost(p.slug)) add(from, `/blog/topic/${t.slug}`);
    add(from, l.tool.href);
    for (const s of l.siblings) add(from, postPath(s.slug));
    for (const c of l.compare) add(from, c.href);
    add(from, "/compatibility");
    add(from, "/whats-new");
    add(from, "/gallery");
    add(from, "/about"); // author byline
  }
  // Tools: related guides + "More free tools".
  for (const t of TOOLS.filter((x) => x.status === "live")) {
    const from = toolPath(t.slug);
    for (const p of toolLinks(t.slug)) add(from, postPath(p.slug));
    for (const o of TOOLS.filter((x) => x.status === "live" && x.slug !== t.slug)) add(from, toolPath(o.slug));
    add(from, "/tools");
    add(from, "/about"); // author byline in ToolHero
  }
  return edges;
}

export function inlinkCounts(): Map<string, number> {
  const counts = new Map(allPaths().map((p) => [p, 0]));
  for (const [, targets] of contextualEdges()) for (const t of targets) if (counts.has(t)) counts.set(t, counts.get(t)! + 1);
  return counts;
}
