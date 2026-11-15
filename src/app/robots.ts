import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Allow search engines AND AI search/answer crawlers (they're how ChatGPT,
 * Perplexity, Claude and Gemini cite us). Content-Signal (contentsignals.org)
 * states: search + AI answers yes, model training no.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User", "Googlebot", "Bingbot"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
