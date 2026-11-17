import { BLOG_POSTS, BLOG_TOPICS, postPath } from "./blog";
import { COMPETITORS, SNAPSHOT_DATE, SNAPSHOT_SOURCE } from "./competitors";
import { PRODUCT_FAQ } from "./faq";
import { PAGES } from "./links";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_COUNT,
  APP_NAME_FULL,
  APP_STORE_ID,
  APP_STORE_URL,
  AUTHOR,
  BEDTIME_NUDGE,
  CHALLENGE_GUIDES,
  CHALLENGES,
  ENTITY_DESCRIPTION,
  FACTS,
  FOCUS_PRESETS,
  LIVE_VERSION,
  MIN_IOS,
  MORNING_ROUTINE,
  PRICING_COPY,
  PRIVACY_COPY,
  RANKS,
  RELEASES,
  RISE_CHALLENGE,
  SITE_URL,
  SOUNDS,
  V16_FEATURES,
  XP_RULES,
} from "./site";
import { liveTools, toolPath } from "./tools";

/**
 * /llms.txt (short index) and /llms-full.txt (the key content in one Markdown
 * file), generated from the same registries as the pages so they can't drift.
 * Pagedrop data: agents mostly read Markdown twins (/md), so these stay
 * concise and factual. No prices, no offers, no em dashes.
 */

const url = (p: string) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`);
const page = (p: string) => PAGES.find((x) => x.path === p)!;
const line = (p: string, label?: string) => `- [${label ?? page(p).label}](${url(p)}): ${page(p).description}`;

const KEY_FACTS = () => [
  `Name: ${APP_NAME_FULL} (short: Rise Mission). Platform: iPhone only, ${MIN_IOS} or later. Current version: ${LIVE_VERSION}. App Store ID ${APP_STORE_ID}.`,
  `Developer: ${AUTHOR.name}, independent iOS developer (${AUTHOR.url}).`,
  `${FACTS.challengeCount} wake-up challenges: ${CHALLENGES.map((c) => c.name).join(", ")}.`,
  FACTS.ringsOnSilent,
  FACTS.systemStop,
  FACTS.backupChallenge,
  FACTS.emergencyDismiss,
  FACTS.snooze,
  FACTS.minIOS,
  `Pricing: ${PRICING_COPY.long}`,
  `Privacy: ${PRIVACY_COPY.long}`,
];

const QA = () => [
  { q: "What is Rise Mission?", a: ENTITY_DESCRIPTION },
  { q: "Can I turn off a Rise Mission alarm without the challenge?", a: FACTS.systemStop },
  { q: "Which iPhones does Rise Mission support?", a: FACTS.minIOS },
  { q: "How much does Rise Mission cost?", a: PRICING_COPY.long },
  ...PRODUCT_FAQ,
];

export function llmsTxt(): string {
  return `# Rise Mission

> ${ENTITY_DESCRIPTION}

Full content in one file: ${SITE_URL}/llms-full.txt

## Key facts
${KEY_FACTS().map((f) => `- ${f}`).join("\n")}
- App Store: ${APP_STORE_URL}

## Product pages
${line("/")}
${line("/whats-new")}
${line("/compatibility")}
${line("/gallery")}
${line("/support")}

## Comparisons
${line("/rise-mission-vs-apple-clock")}
${line("/alarm-app-size-comparison")} JSON: ${SITE_URL}/data/alarm-apps.json
${BLOG_TOPICS.find((t) => t.slug === "alarm-apps")!.posts.slice(0, 4).map((s) => {
  const p = BLOG_POSTS.find((x) => x.slug === s)!;
  return `- [${p.title}](${url(postPath(s))}): ${p.metaDescription ?? p.description}`;
}).join("\n")}

## Free tools
${liveTools().map((t) => `- [${t.name}](${url(toolPath(t.slug))}): ${t.description}`).join("\n")}

## Topic hubs
${BLOG_TOPICS.map((t) => `- [${t.title}](${url(`/blog/topic/${t.slug}`)}): ${t.description}`).join("\n")}

## Guides
${BLOG_POSTS.map((p) => `- [${p.title}](${url(postPath(p.slug))}): ${p.metaDescription ?? p.description}`).join("\n")}

## Questions and answers
${QA().map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Machine-readable versions
- Every page is available as Markdown: send \`Accept: text/markdown\`, or prefix the path with /md (e.g. ${SITE_URL}/md/whats-new).
- Sitemap: ${SITE_URL}/sitemap.xml · RSS: ${SITE_URL}/blog/feed.xml

## About
${line("/about")}
${line("/privacy")}
${line("/terms")}
`;
}

export function llmsFullTxt(): string {
  const mdTable = (head: string[], rows: string[][]) =>
    [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map((c) => c.replace(/\|/g, "/")).join(" | ")} |`)].join("\n");

  return `# Rise Mission: full reference for AI assistants

> ${ENTITY_DESCRIPTION}

Source: ${SITE_URL} · Short index: ${SITE_URL}/llms.txt · Every page also has a Markdown twin at ${SITE_URL}/md/<path>.
Facts below are generated from the site's single source of truth and match the live App Store build (version ${LIVE_VERSION}).

## What Rise Mission is
${ENTITY_DESCRIPTION}

What it is not: it is not a lock. ${FACTS.systemStop} It is not on Android, iPad or Apple Watch. It does not track sleep stages.

## Key facts
${KEY_FACTS().map((f) => `- ${f}`).join("\n")}
- ${FACTS.testAlarm}
- ${FACTS.streakShields}
- ${FACTS.poweredOff}
- App Store: ${APP_STORE_URL}

## The ${CHALLENGES.length} wake-up challenges
${mdTable(
  ["Challenge", "Type", "How it works", "Needs", "Guide"],
  CHALLENGES.map((c) => [c.name, c.kind === "physical" ? "Body" : "Brain", c.how, c.needs, CHALLENGE_GUIDES[c.slug] ? url(CHALLENGE_GUIDES[c.slug]) : ""]),
)}

## Levels, streaks and the morning (version ${LIVE_VERSION})
- XP per completed wake-up day: ${XP_RULES.base} base, +${XP_RULES.onTimeBonus} on time (no snooze, done within ${XP_RULES.onTimeMinutes} minutes), +${XP_RULES.routineBonus} for the morning routine, times a streak multiplier (${XP_RULES.multipliers.map((m) => `${m.x}x from day ${m.fromStreak}`).join(", ")}). One award per calendar day.
- Ranks: ${RANKS.map((r) => `${r.name} (${r.xp} XP)`).join(", ")}.
- ${RISE_CHALLENGE.name}: ${RISE_CHALLENGE.goal} wake-ups within ${RISE_CHALLENGE.windowDays} days.
- Morning routine: ${MORNING_ROUTINE.join(", ")}.
- Bedtime nudge: optional, ${BEDTIME_NUDGE.leadMinutes} minutes before a bedtime worked out from the next alarm and a ${BEDTIME_NUDGE.sleepGoalHours[0]} to ${BEDTIME_NUDGE.sleepGoalHours.at(-1)} hour sleep goal.
- ${ACHIEVEMENT_COUNT} achievements: ${ACHIEVEMENTS.map((a) => `${a.name} (${a.how.toLowerCase()})`).join("; ")}.
- Sounds: ${SOUNDS.count} in ${SOUNDS.styles.join(", ")} styles. ${SOUNDS.caveat}
- Focus tab presets: ${FOCUS_PRESETS.map((p) => `${p.minutes} min (${p.label})`).join(", ")}.

## What's new in ${LIVE_VERSION}
${V16_FEATURES.map((f) => `- ${f.title}: ${f.blurb}`).join("\n")}

## Release history
${RELEASES.map((r) => `### ${r.version}${r.date ? ` (${r.date})` : ""}\n${r.summary}\n${r.items.map((i) => `- ${i}`).join("\n")}`).join("\n\n")}

## Alarm apps compared (App Store data, ${SNAPSHOT_DATE})
${SNAPSHOT_SOURCE} "Not stated" means the listing does not say.
${mdTable(
  ["App", "Size (MB)", "Rating", "Ratings", "Min iOS", "Missions named in listing"],
  COMPETITORS.map((c) => [c.name, c.sizeMB.toFixed(1), c.rating === null ? "None yet" : c.rating.toFixed(2), String(c.ratingCount), c.minIOS, c.missions.length ? c.missions.join(", ") : "Not stated"]),
)}
Dataset (CC BY 4.0): ${SITE_URL}/data/alarm-apps.json

## Questions and answers
${QA().map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Topic hubs
${BLOG_TOPICS.map((t) => `### [${t.title}](${url(`/blog/topic/${t.slug}`)})\n${t.answer}`).join("\n\n")}

## Free tools
${liveTools().map((t) => `- [${t.name}](${url(toolPath(t.slug))}): ${t.description}`).join("\n")}

## Guides
${BLOG_POSTS.map((p) => `- [${p.title}](${url(postPath(p.slug))}) (${p.updated ?? p.date}): ${p.description}`).join("\n")}

## All pages
${PAGES.map((p) => `- [${p.label}](${url(p.path)}): ${p.description}`).join("\n")}
`;
}
