import type { Metadata } from "next";
import {
  APP_NAME_FULL,
  APP_STORE_URL,
  AUTHOR,
  INSTAGRAM_URL,
  LIVE_VERSION,
  MIN_IOS,
  SITE_NAME,
  SITE_URL,
} from "./site";
import { GALLERY_SHOTS, GALLERY_VIDEOS, type GalleryVideo } from "./media";

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
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
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
export function mobileApplicationLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": appId,
    name: APP_NAME_FULL,
    alternateName: SITE_NAME,
    applicationCategory: "HealthApplication",
    softwareVersion: LIVE_VERSION,
    applicationSubCategory: "Alarm clock",
    operatingSystem: MIN_IOS,
    description,
    url: SITE_URL,
    installUrl: APP_STORE_URL,
    image: abs("/assets/rise-mission-app-icon.png"),
    screenshot: GALLERY_SHOTS.slice(0, 3).map((s) => abs(s.src)),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free download. Rise Mission Pro (subscription or lifetime) unlocks the full app.",
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

export function collectionPageLd(input: { name: string; description: string; path: string; urls: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    hasPart: input.urls.map((u) => ({ "@type": "WebPage", url: abs(u) })),
  };
}
