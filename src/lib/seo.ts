import type { Metadata } from "next";
import {
  APP_NAME_FULL,
  APP_STORE_URL,
  AUTHOR,
  INSTAGRAM_URL,
  LIVE_VERSION,
  MIN_IOS,
  PRICING_COPY,
  SITE_NAME,
  SITE_URL,
  CHALLENGES,
  ENTITY_DESCRIPTION,
  RELEASES,
  V16_FEATURES,
} from "./site";
import { GALLERY_SHOTS, GALLERY_VIDEOS, type GalleryVideo } from "./media";
import { crumbsFor, getPage } from "./links";

/**
 * Metadata + JSON-LD helpers. Every page goes through `pageMetadata()` and
 * these schema builders; no inline JSON-LD literals in pages.
 *
 * Rules (pagedrop RESEARCH-seo.md §5 + claude-seo quality gates):
 *  - title ≤ 44 chars authored (template adds " | Rise Mission" → ≤ 60)
 *  - description ≤ 155 chars, unique, benefit sentence
 *  - canonical = the page's own path, apex host only
 *  - schema describes only what is visible on the page
 */

export const TITLE_MAX = 44;
export const DESCRIPTION_MAX = 155;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the raw title without the " | Rise Mission" suffix (homepage). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  ogImage?: string;
  /** Pixel size of `ogImage` when it isn't a 1200x630 card. */
  ogImageSize?: { width: number; height: number };
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export function ogImageUrl(title: string, eyebrow?: string): string {
  const p = new URLSearchParams({ title });
  if (eyebrow) p.set("eyebrow", eyebrow);
  return `/og?${p.toString()}`;
}

export function pageMetadata(input: PageMetaInput): Metadata {
  // Blog posts get their static, descriptively named cover (/covers/<slug>.png).
  const blogSlug = input.type === "article" && input.path.startsWith("/blog/") ? input.path.slice(6) : null;
  const image = input.ogImage ?? (blogSlug ? `/covers/${blogSlug}.png` : ogImageUrl(input.title));
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: input.path,
      // Markdown twin for AI agents (served by src/app/md, see src/proxy.ts).
      types: { "text/markdown": input.path === "/" ? "/md" : `/md${input.path}` },
    },
    robots: input.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: input.type ?? "website",
      url: input.path,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      locale: "en_US",
      images: [{ url: image, ...(input.ogImageSize ?? { width: 1200, height: 630 }), alt: input.title }],
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime ?? input.publishedTime,
            authors: [AUTHOR.url],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

/** The v1.6 reel poster (real app screens): share image for home, gallery and what's new. */
export const V16_OG_IMAGE = { url: GALLERY_VIDEOS.find((v) => v.id === "reel-16x9")!.poster, width: 1920, height: 1080 } as const;

/**
 * Metadata for a page registered in `PAGES` (src/lib/links.ts): title,
 * description and canonical come from the registry so tests can check them.
 */
export function staticPageMetadata(path: string, extra: Partial<PageMetaInput> = {}): Metadata {
  const p = getPage(path);
  return pageMetadata({ title: p.title, description: p.description, path: p.path, absoluteTitle: p.absoluteTitle, ...extra });
}

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export const organizationId = `${SITE_URL}/#organization`;
export const appId = `${SITE_URL}/#app`;
export const authorId = `${SITE_URL}/about#sunny`;

/** Inline publisher node so pages that don't emit organizationLd() still resolve name + logo. */
export function publisherRef() {
  return { "@type": "Organization", "@id": organizationId, name: SITE_NAME, url: SITE_URL, logo: abs("/assets/rise-mission-app-icon.png") };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: SITE_URL,
    logo: abs("/assets/rise-mission-app-icon.png"),
    description: ENTITY_DESCRIPTION,
    founder: { "@id": authorId },
    sameAs: [INSTAGRAM_URL, APP_STORE_URL],
  };
}

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": authorId,
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: AUTHOR.url,
    worksFor: { "@id": organizationId },
  };
}

/**
 * The app itself. Offer price "0" is the true download price; the description
 * states Pro is required, so the structured data is not misleading.
 */
export function mobileApplicationLd(description: string, opts: { releaseNotesUrl?: string } = {}) {
  const live = RELEASES[0];
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": appId,
    name: APP_NAME_FULL,
    alternateName: SITE_NAME,
    applicationCategory: "HealthApplication",
    softwareVersion: LIVE_VERSION,
    applicationSubCategory: "Alarm clock",
    operatingSystem: `${MIN_IOS}.0 or later`,
    description,
    url: SITE_URL,
    installUrl: APP_STORE_URL,
    image: abs("/assets/rise-mission-app-icon.png"),
    inLanguage: "en",
    // No aggregateRating: the US listing shows 0 ratings (iTunes lookup, 2026-11-17).
    // Add it only from a verified, current count.
    ...(live.date ? { dateModified: live.date } : {}),
    datePublished: RELEASES.at(-1)!.date,
    ...(opts.releaseNotesUrl ? { releaseNotes: abs(opts.releaseNotesUrl) } : {}),
    featureList: [
      `${CHALLENGES.length} wake-up challenges: ${CHALLENGES.map((c) => c.name).join(", ")}`,
      ...V16_FEATURES.map((f) => f.title),
    ],
    // Current App Store screenshots, read from the gallery registry so they never go stale.
    screenshot: GALLERY_SHOTS.slice(0, 6).map((s) => abs(s.src)),
    // No price: Pro plans and prices are storefront-dependent and shown in the app, and
    // "0" would read as "free" (v1.2+ has a hard paywall). The Offer points to the
    // App Store listing, where the real prices live (PRICING_COPY is the wording).
    offers: {
      "@type": "Offer",
      url: APP_STORE_URL,
      availability: "https://schema.org/InStock",
      description: PRICING_COPY.long,
    },
    publisher: publisherRef(),
  };
}

/** VideoObject for a GALLERY_VIDEOS entry (data lives in media.ts). */
function videoLd(v: GalleryVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    thumbnailUrl: abs(v.poster),
    contentUrl: abs(v.src),
    uploadDate: v.uploadDate,
    duration: `PT${v.durationSec}S`,
    width: v.width,
    height: v.height,
    publisher: publisherRef(),
  };
}

/** The homepage demo video: the v1.6 real-app screen recording. */
export function demoVideoLd() {
  return videoLd(GALLERY_VIDEOS.find((v) => v.id === "app-demo")!);
}

/** The 30-second explainer reel (16:9 on the site; 9:16 is for social). */
export function reelVideoLd() {
  return videoLd(GALLERY_VIDEOS.find((v) => v.id === "reel-16x9")!);
}

export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: publisherRef(),
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList for a registered path (same trail as the visible <Breadcrumbs>). */
export function breadcrumbLdFor(path: string) {
  return breadcrumbLd(crumbsFor(path));
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export type QA = { q: string; a: string };

/** Only emit when every Q&A is rendered visibly on the page. */
export function faqPageLd(faq: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: abs(input.path),
    url: abs(input.path),
    image: abs(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": authorId, "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    publisher: publisherRef(),
    inLanguage: "en",
  };
}

/** Roundup pages: the apps in the order shown (not a quality ranking). */
export function itemListLd(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
  };
}

export function collectionPageLd(input: {
  name: string;
  description: string;
  path: string;
  /** The listed pages, with the name shown for each. */
  items: { url: string; name: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    hasPart: input.items.map((u) => ({ "@type": "WebPage", url: abs(u.url), name: u.name })),
  };
}

/**
 * HowTo: only for real, visible numbered steps on the page. (Google no longer
 * shows HowTo rich results, but the markup still describes the steps for
 * other engines.)
 */
export function howToLd(input: { name: string; description: string; path: string; steps: { name: string; text: string }[]; totalTime?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text, url: `${abs(input.path)}#step-${i + 1}` })),
  };
}
