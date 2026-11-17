import type { MetadataRoute } from "next";
import { BLOG_POSTS, BLOG_TOPICS, postCover, postPath } from "@/lib/blog";
import { PAGES } from "@/lib/links";
import { GALLERY_SHOTS, GALLERY_VIDEOS, galleryShot, type GalleryVideo } from "@/lib/media";
import { SITE_URL } from "@/lib/site";

/**
 * Every indexable URL, from the registries (PAGES in src/lib/links.ts, blog
 * posts and topic hubs in src/lib/blog.ts). Tests assert nothing is missing.
 *
 * lastModified is hand-set on each registry entry: never `new Date()` (a build
 * timestamp on every URL tells Google every page changed on every deploy).
 * Image and video entries list only v1.6 media (src/lib/media.ts) that the
 * page actually shows.
 */
const abs = (p: string) => `${SITE_URL}${p}`;

const videoEntry = (v: GalleryVideo) => ({
  title: v.title,
  description: v.description,
  thumbnail_loc: abs(v.poster),
  content_loc: abs(v.src),
  duration: v.durationSec,
  publication_date: v.uploadDate,
  family_friendly: "yes" as const,
});

const shots = (...ids: string[]) => ids.map((id) => galleryShot(id)).filter((s) => !!s).map((s) => abs(s!.src));

/** Media per page: the same files the page renders. */
const MEDIA: Record<string, { images?: string[]; videos?: GalleryVideo[] }> = {
  "/": {
    images: [abs("/assets/rise-mission-app-icon.png"), ...GALLERY_SHOTS.slice(0, 2).map((s) => abs(s.src))],
    videos: GALLERY_VIDEOS.filter((v) => v.id === "app-demo" || v.id === "reel-16x9"),
  },
  "/gallery": { images: GALLERY_SHOTS.map((s) => abs(s.src)), videos: GALLERY_VIDEOS },
  "/rise-mission-vs-apple-clock": { images: shots("ringing", "stats") },
};

/** Topic hubs got their direct-answer paragraphs on this day (a real content change). */
const HUBS_UPDATED = "2026-11-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const postDate = (slug: string) => {
    const p = BLOG_POSTS.find((x) => x.slug === slug);
    return p?.updated ?? p?.date ?? "2026-11-15";
  };
  const latestIn = (slugs: string[]) => [...slugs.map(postDate), HUBS_UPDATED].sort().at(-1)!;

  return [
    ...PAGES.map((p) => {
      const m = MEDIA[p.path];
      return {
        url: p.path === "/" ? SITE_URL : abs(p.path),
        lastModified: p.lastModified,
        priority: p.priority,
        ...(m?.images ? { images: m.images } : {}),
        ...(m?.videos ? { videos: m.videos.map(videoEntry) } : {}),
      };
    }),
    ...BLOG_TOPICS.map((t) => ({ url: abs(`/blog/topic/${t.slug}`), lastModified: latestIn(t.posts), priority: 0.6 })),
    ...BLOG_POSTS.map((p) => ({
      url: abs(postPath(p.slug)),
      lastModified: p.updated ?? p.date,
      priority: 0.8,
      images: [abs(postCover(p))],
    })),
  ];
}
