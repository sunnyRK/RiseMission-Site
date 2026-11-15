import type { MetadataRoute } from "next";
import { BLOG_POSTS, BLOG_TOPICS, postPath } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { liveTools, toolPath } from "@/lib/tools";

/**
 * Real, hand-set lastModified dates only — never `new Date()` (a build
 * timestamp on every URL tells Google every page changed every deploy).
 */
const PAGES: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-11-15", priority: 1 },
  { path: "/tools", lastModified: "2026-11-15", priority: 0.8 },
  { path: "/alarm-app-size-comparison", lastModified: "2026-11-15", priority: 0.8 },
  { path: "/blog", lastModified: "2026-11-15", priority: 0.7 },
  { path: "/about", lastModified: "2026-11-15", priority: 0.4 },
  { path: "/support", lastModified: "2026-11-15", priority: 0.3 },
  { path: "/privacy", lastModified: "2026-11-15", priority: 0.2 },
  { path: "/terms", lastModified: "2026-08-21", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestIn = (slugs: string[]) =>
    slugs
      .map((s) => BLOG_POSTS.find((p) => p.slug === s))
      .map((p) => p?.updated ?? p?.date ?? "2026-11-15")
      .sort()
      .at(-1)!;

  return [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
      lastModified: p.lastModified,
      priority: p.priority,
      // Homepage hero demo video (also described by VideoObject JSON-LD on the page).
      ...(p.path === "/"
        ? {
            videos: [
              {
                title: "Rise Mission demo: an alarm you can't snooze",
                description:
                  "30-second demo of Rise Mission for iPhone: the alarm rings, you complete a wake-up challenge, and the alarm stops once you're awake.",
                thumbnail_loc: `${SITE_URL}/assets/demo-poster.jpg`,
                content_loc: `${SITE_URL}/assets/demo.mp4`,
                duration: 30,
                publication_date: "2026-08-26",
                family_friendly: "yes" as const,
              },
              {
                title: "Rise Mission in 30 seconds",
                description:
                  "Animated explainer: Rise Mission rings on Silent and in Focus, you pick one of 10 wake-up challenges, prove you're awake with camera-counted push-ups, and build a wake-up streak.",
                thumbnail_loc: `${SITE_URL}/assets/reel/rise-mission-reel-16x9-poster.jpg`,
                content_loc: `${SITE_URL}/assets/reel/rise-mission-reel-16x9.mp4`,
                duration: 31,
                publication_date: "2026-11-15",
                family_friendly: "yes" as const,
              },
            ],
          }
        : {}),
    })),
    ...liveTools().map((t) => ({ url: `${SITE_URL}${toolPath(t.slug)}`, lastModified: t.lastModified, priority: 0.9 })),
    ...BLOG_TOPICS.map((t) => ({ url: `${SITE_URL}/blog/topic/${t.slug}`, lastModified: latestIn(t.posts), priority: 0.6 })),
    ...BLOG_POSTS.map((p) => ({ url: `${SITE_URL}${postPath(p.slug)}`, lastModified: p.updated ?? p.date, priority: 0.8 })),
  ];
}
