import type { MetadataRoute } from "next";
import { BLOG_POSTS, BLOG_TOPICS, postPath } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { liveTools, toolPath } from "@/lib/tools";
import { GALLERY_SHOTS, GALLERY_VIDEOS, type GalleryVideo } from "@/lib/media";
import { postCover } from "@/lib/blog";

/**
 * Real, hand-set lastModified dates only — never `new Date()` (a build
 * timestamp on every URL tells Google every page changed every deploy).
 */
const PAGES: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-11-17", priority: 1 },
  { path: "/tools", lastModified: "2026-11-15", priority: 0.8 },
  { path: "/alarm-app-size-comparison", lastModified: "2026-11-15", priority: 0.8 },
  { path: "/rise-mission-vs-apple-clock", lastModified: "2026-11-17", priority: 0.8 },
  { path: "/whats-new", lastModified: "2026-11-17", priority: 0.7 },
  { path: "/compatibility", lastModified: "2026-11-17", priority: 0.6 },
  { path: "/blog", lastModified: "2026-11-15", priority: 0.7 },
  { path: "/about", lastModified: "2026-11-15", priority: 0.4 },
  { path: "/support", lastModified: "2026-11-17", priority: 0.3 },
  { path: "/privacy", lastModified: "2026-11-15", priority: 0.2 },
  { path: "/terms", lastModified: "2026-08-21", priority: 0.2 },
];

const videoEntry = (v: GalleryVideo) => ({
  title: v.title,
  description: v.description,
  thumbnail_loc: `${SITE_URL}${v.poster}`,
  content_loc: `${SITE_URL}${v.src}`,
  duration: v.durationSec,
  publication_date: v.uploadDate,
  family_friendly: "yes" as const,
});

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
      ...(p.path === "/" ? { images: [`${SITE_URL}/assets/rise-mission-app-icon.png`, ...GALLERY_SHOTS.slice(0, 2).map((s) => `${SITE_URL}${s.src}`)] } : {}),
      // Homepage videos (v1.6 app demo + 16:9 reel), same data as their VideoObject JSON-LD.
      ...(p.path === "/"
        ? { videos: GALLERY_VIDEOS.filter((v) => v.id === "app-demo" || v.id === "reel-16x9").map(videoEntry) }
        : {}),
    })),
    {
      url: `${SITE_URL}/gallery`,
      lastModified: "2026-11-17",
      priority: 0.7,
      images: GALLERY_SHOTS.map((s) => `${SITE_URL}${s.src}`),
      videos: GALLERY_VIDEOS.map(videoEntry),
    },
    ...liveTools().map((t) => ({ url: `${SITE_URL}${toolPath(t.slug)}`, lastModified: t.lastModified, priority: 0.9 })),
    ...BLOG_TOPICS.map((t) => ({ url: `${SITE_URL}/blog/topic/${t.slug}`, lastModified: latestIn(t.posts), priority: 0.6 })),
    ...BLOG_POSTS.map((p) => ({
      url: `${SITE_URL}${postPath(p.slug)}`,
      lastModified: p.updated ?? p.date,
      priority: 0.8,
      images: [`${SITE_URL}${postCover(p)}`],
    })),
  ];
}
