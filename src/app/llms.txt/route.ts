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

> Rise Mission ("Alarm Clock: Rise Mission") is an iPhone alarm clock for heavy sleepers. The alarm keeps ringing until you complete a wake-up challenge, so you can't snooze half-asleep. Current version: ${LIVE_VERSION}. Requires iOS 26.

## Key facts
- ${FACTS.challengeCount} wake-up challenges: ${CHALLENGES.map((c) => `${c.name} (${c.tagline.toLowerCase()})`).join("; ")}.
- ${FACTS.ringsOnSilent}
- ${FACTS.backupChallenge}
- ${FACTS.emergencyDismiss}
- Privacy: ${PRIVACY_COPY.long}
- Pricing: ${PRICING_COPY.long}
- App Store: ${APP_STORE_URL}

## Free tools
${liveTools().map((t) => `- [${t.name}](${SITE_URL}${toolPath(t.slug)}): ${t.description}`).join("\n")}

## Data
- [Alarm app size comparison](${SITE_URL}/alarm-app-size-comparison): App Store size, ratings and minimum iOS for 12 iPhone alarm apps, dated, CC BY 4.0. JSON: ${SITE_URL}/data/alarm-apps.json

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
