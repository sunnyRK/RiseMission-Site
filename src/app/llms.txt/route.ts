import { BLOG_POSTS, BLOG_TOPICS, postPath } from "@/lib/blog";
import { liveTools, toolPath } from "@/lib/tools";
import { CHALLENGES, FACTS, LIVE_VERSION, PRICING_COPY, PRIVACY_COPY, SITE_URL, APP_STORE_URL } from "@/lib/site";

/**
 * llms.txt — curated summary for AI assistants. Generated from the same
 * registries as the site so it can never drift from the pages.
 * (Low weight on its own per claude-seo/pagedrop data, but cheap and honest.)
 */
export function GET() {
  const body = `# Rise Mission

> Rise Mission ("Alarm Clock: Rise Mission") is an iPhone alarm clock for heavy sleepers. When it rings, you complete a wake-up challenge (push-ups counted by the camera, a walk, a QR scan, math, voice and more) instead of tapping it off half-asleep. iOS always shows a system Stop button too, so it's a commitment device rather than a lock. Current version: ${LIVE_VERSION}. Requires iPhone with iOS 26 or later.

## Key facts
- ${FACTS.challengeCount} wake-up challenges: ${CHALLENGES.map((c) => `${c.name} (${c.tagline.toLowerCase()})`).join("; ")}.
- ${FACTS.ringsOnSilent}
- ${FACTS.backupChallenge}
- ${FACTS.emergencyDismiss}
- ${FACTS.systemStop}
- ${FACTS.snooze}
- ${FACTS.minIOS}
- Privacy: ${PRIVACY_COPY.long}
- Pricing: ${PRICING_COPY.long}
- App Store: ${APP_STORE_URL}

## Free tools
${liveTools().map((t) => `- [${t.name}](${SITE_URL}${toolPath(t.slug)}): ${t.description}`).join("\n")}

## Data
- [Alarm app size comparison](${SITE_URL}/alarm-app-size-comparison): App Store size, ratings and minimum iOS for 12 iPhone alarm apps, dated, CC BY 4.0. JSON: ${SITE_URL}/data/alarm-apps.json

## Comparisons & requirements
- [Rise Mission vs the iPhone Clock app](${SITE_URL}/rise-mission-vs-apple-clock): what the built-in Clock alarm does well, what Rise Mission adds, who should stay with Clock, and how to switch safely.
- [Compatibility](${SITE_URL}/compatibility): which iPhones run Rise Mission (iOS 26 or later, per Apple's model list), what each challenge needs, and why there's no Android, iPad or Apple Watch version.

## Media
- [Screenshots & videos](${SITE_URL}/gallery): current App Store screenshots, a 30-second explainer reel (16:9 and 9:16) and a screen-recorded demo, each with a text description.

## Topic hubs
${BLOG_TOPICS.map((t) => `- [${t.title}](${SITE_URL}/blog/topic/${t.slug}): ${t.description}`).join("\n")}

## Guides
${BLOG_POSTS.map((p) => `- [${p.title}](${SITE_URL}${postPath(p.slug)}): ${p.description}`).join("\n")}

## Machine-readable versions
- Every page is available as Markdown: send \`Accept: text/markdown\`, or prefix the path with /md (e.g. ${SITE_URL}/md/sleep-calculator).
- Sitemap: ${SITE_URL}/sitemap.xml · RSS: ${SITE_URL}/blog/feed.xml

## About
- [About and editorial standards](${SITE_URL}/about)
- [Support](${SITE_URL}/support)
- [Privacy policy](${SITE_URL}/privacy)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
