import { describe, expect, it } from "vitest";
import { BLOG_POSTS, BLOG_TOPICS } from "../blog";
import { PAGES, allPaths, crumbsFor } from "../links";
import { campaignToken, CT_MAX, appStoreLink } from "../appstore";
import { llmsFullTxt, llmsTxt } from "../llms";
import {
  DESCRIPTION_MAX,
  articleLd,
  breadcrumbLd,
  collectionPageLd,
  howToLd,
  mobileApplicationLd,
  organizationLd,
  webSiteLd,
  faqPageLd,
  demoVideoLd,
  reelVideoLd,
} from "../seo";
import { ENTITY_DESCRIPTION, LIVE_VERSION } from "../site";
import { wordCount } from "../faq";

const SUFFIX = " | Rise Mission";

/** Every page's final <title> and description, from the registries. */
function allMeta() {
  return [
    ...PAGES.map((p) => ({ path: p.path, title: p.absoluteTitle ? p.title : p.title + SUFFIX, description: p.description })),
    ...BLOG_TOPICS.map((t) => ({ path: `/blog/topic/${t.slug}`, title: t.metaTitle + SUFFIX, description: t.description })),
    ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, title: (p.metaTitle ?? p.title) + SUFFIX, description: p.metaDescription ?? p.description })),
  ];
}

describe("titles and descriptions (every indexable page)", () => {
  const meta = allMeta();
  it("covers every sitemap URL", () => {
    expect(meta.map((m) => m.path).sort()).toEqual([...allPaths()].sort());
  });
  it("titles are 30–60 chars and unique", () => {
    for (const m of meta) {
      expect(m.title.length, `${m.path}: ${m.title}`).toBeLessThanOrEqual(60);
      expect(m.title.length, m.path).toBeGreaterThanOrEqual(30);
    }
    expect(new Set(meta.map((m) => m.title)).size).toBe(meta.length);
  });
  it(`descriptions are 110–${DESCRIPTION_MAX} chars and unique`, () => {
    for (const m of meta) {
      expect(m.description.length, `${m.path} (${m.description.length})`).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(m.description.length, m.path).toBeGreaterThanOrEqual(110);
    }
    expect(new Set(meta.map((m) => m.description)).size).toBe(meta.length);
  });
  it("no em dash, 'trial' or prices in any title or description", () => {
    const t = JSON.stringify(meta);
    expect(t).not.toMatch(/—|trial|\$\d/i);
  });
});

/** Required properties per schema.org type (Google rich results + our own rules). */
const REQUIRED: Record<string, string[]> = {
  MobileApplication: ["name", "operatingSystem", "applicationCategory", "offers", "softwareVersion", "publisher"],
  BlogPosting: ["headline", "image", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  CollectionPage: ["name", "url", "hasPart"],
  VideoObject: ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl", "duration"],
  HowTo: ["name", "step"],
};

function validate(node: Record<string, unknown>) {
  const roundTrip = JSON.parse(JSON.stringify(node));
  expect(roundTrip["@context"]).toBe("https://schema.org");
  const type = roundTrip["@type"] as string;
  for (const k of REQUIRED[type] ?? []) {
    const v = roundTrip[k];
    expect(v === undefined || v === "" || (Array.isArray(v) && v.length === 0), `${type}.${k}`).toBe(false);
  }
  return roundTrip;
}

describe("JSON-LD builders", () => {
  it("MobileApplication: version, iOS 26, no unverified rating", () => {
    const app = validate(mobileApplicationLd(ENTITY_DESCRIPTION));
    expect(app.softwareVersion).toBe(LIVE_VERSION);
    expect(app.operatingSystem).toMatch(/iOS 26/);
    expect(app.applicationCategory).toBe("HealthApplication");
    expect(app.aggregateRating).toBeUndefined();
    expect(app.offers.description).toMatch(/Pro/);
  });
  it("Organization, WebSite (no SearchAction: the site has no search)", () => {
    validate(organizationLd());
    const site = validate(webSiteLd());
    expect(site.potentialAction).toBeUndefined();
  });
  it("BlogPosting for every post has an author and dateModified", () => {
    for (const p of BLOG_POSTS) {
      const a = validate(articleLd({ title: p.title, description: p.description, path: `/blog/${p.slug}`, image: `/covers/${p.slug}.png`, datePublished: p.date, dateModified: p.updated }));
      expect(a.author.name).toBeTruthy();
      expect(a.dateModified >= a.datePublished).toBe(true);
    }
  });
  it("BreadcrumbList for every page: positions 1..n with absolute items", () => {
    for (const path of allPaths()) {
      const b = validate(breadcrumbLd(crumbsFor(path)));
      b.itemListElement.forEach((li: { position: number; item: string; name: string }, i: number) => {
        expect(li.position).toBe(i + 1);
        expect(li.item).toMatch(/^https:\/\/risemission\.app/);
        expect(li.name).toBeTruthy();
      });
    }
  });
  it("VideoObjects carry a timezone on uploadDate", () => {
    for (const v of [demoVideoLd(), reelVideoLd()]) expect(validate(v).uploadDate).toMatch(/T\d\d:\d\d:\d\d[+-]\d\d:\d\d$/);
  });
  it("CollectionPage parts are named; FAQPage and HowTo are well formed", () => {
    const c = validate(collectionPageLd({ name: "x", description: "y", path: "/tools", items: [{ url: "/a", name: "A" }] }));
    expect(c.hasPart[0].name).toBe("A");
    const f = validate(faqPageLd([{ q: "Q?", a: "A." }]));
    expect(f.mainEntity[0].acceptedAnswer.text).toBe("A.");
    const h = validate(howToLd({ name: "n", description: "d", path: "/x", steps: [{ name: "s", text: "t" }] }));
    expect(h.step[0].position).toBe(1);
  });
});

describe("answer-engine copy", () => {
  it("the entity description is a 40–60 word direct answer", () => {
    expect(ENTITY_DESCRIPTION).toMatch(/^Rise Mission is an iOS alarm app/);
    const n = wordCount(ENTITY_DESCRIPTION);
    expect(n).toBeGreaterThanOrEqual(40);
    expect(n).toBeLessThanOrEqual(60);
  });
  it("every topic hub has a 40–60 word answer", () => {
    for (const t of BLOG_TOPICS) {
      const n = wordCount(t.answer);
      expect(n, t.slug).toBeGreaterThanOrEqual(40);
      expect(n, t.slug).toBeLessThanOrEqual(60);
    }
  });
  it("llms.txt and llms-full.txt follow the honesty rules", () => {
    for (const body of [llmsTxt(), llmsFullTxt()]) {
      expect(body).toContain(ENTITY_DESCRIPTION);
      expect(body).not.toMatch(/—/);
      expect(body).not.toMatch(/trial/i);
      expect(body).not.toMatch(/\$\d/);
      expect(body).not.toMatch(/no tracking/i);
    }
    expect(llmsTxt().length).toBeLessThan(llmsFullTxt().length);
  });
});

describe("App Store campaign links", () => {
  it("ct stays within Apple's 30 characters and is unique per placement", () => {
    const placements = ["home-hero", "home-final", "header", "sticky", "footer", "mobile-menu", "blog-mid", "404", ...BLOG_POSTS.map((p) => `blog-end-${p.slug}`), "demo-object-find", "sleep-debt-calculator"];
    const tokens = placements.map(campaignToken);
    for (const t of tokens) {
      expect(t.length, t).toBeLessThanOrEqual(CT_MAX);
      expect(t).toMatch(/^web-[a-z0-9-]+$/);
    }
    expect(new Set(tokens).size).toBe(tokens.length);
  });
  it("adds pt/ct/mt only when a provider token is set", () => {
    expect(appStoreLink("home-hero", undefined)).not.toContain("?");
    const u = new URL(appStoreLink("home-hero", "123456"));
    expect(u.searchParams.get("pt")).toBe("123456");
    expect(u.searchParams.get("ct")).toBe("web-home-hero");
    expect(u.searchParams.get("mt")).toBe("8");
  });
});
