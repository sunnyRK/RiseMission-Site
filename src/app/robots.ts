import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Everything is open to everyone (`*`). The named groups make the policy
 * explicit for search engines and AI crawlers, because answer engines
 * (ChatGPT, Perplexity, Claude, Gemini, Apple Intelligence) can only cite
 * pages they are allowed to fetch. The playbook (§7) sets no training
 * opt-out, so training crawlers (GPTBot, ClaudeBot, Google-Extended,
 * Applebot-Extended, CCBot) are allowed too.
 * Markdown twins under /md are noindexed by header, not blocked here, so
 * agents can still read them.
 */
const AI_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["Googlebot", "Bingbot", "DuckDuckBot"], allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
