import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { BLOG_POSTS, BLOG_TOPICS, postPath } from "../blog";
import {
  COMPARE_LINKS,
  FOOTER_GROUPS,
  FOOTER_LEGAL,
  PAGES,
  POST_TOOL,
  TOOL_POSTS,
  TOPIC_LINKS,
  allPaths,
  crumbsFor,
  inlinkCounts,
  postLinks,
} from "../links";
import { liveTools, toolPath } from "../tools";

const SITE = "https://risemission.app";
const MIN_INLINKS = 3;
const known = new Set(allPaths());

describe("internal link graph (no orphans)", () => {
  it(`every indexable page has ≥ ${MIN_INLINKS} in-content inlinks from other pages`, () => {
    const counts = inlinkCounts();
    const utility = new Set(PAGES.filter((p) => p.utility).map((p) => p.path));
    for (const [path, n] of counts) {
      if (path === "/" || utility.has(path)) continue;
      expect(n, `${path} has ${n} contextual inlinks`).toBeGreaterThanOrEqual(MIN_INLINKS);
    }
  });

  it("utility pages (legal, support) are linked from the sitewide footer", () => {
    const footer = new Set([...FOOTER_GROUPS.flatMap((g) => g.links), ...FOOTER_LEGAL].map((l) => l.href));
    for (const p of PAGES.filter((x) => x.utility)) expect(footer.has(p.path), p.path).toBe(true);
  });

  it("every post links to exactly one live tool, its hub and 3 siblings", () => {
    const tools = new Set(liveTools().map((t) => t.slug));
    for (const p of BLOG_POSTS) {
      expect(tools.has(POST_TOOL[p.slug]), `${p.slug} → ${POST_TOOL[p.slug]}`).toBe(true);
      const l = postLinks(p.slug);
      expect(l.hub, p.slug).toBeDefined();
      expect(l.siblings.length).toBeGreaterThanOrEqual(2);
      expect(l.siblings.length).toBeLessThanOrEqual(4);
    }
    expect(Object.keys(POST_TOOL).sort()).toEqual(BLOG_POSTS.map((p) => p.slug).sort());
  });

  it("every live tool links to 2–4 real guides", () => {
    const slugs = new Set(BLOG_POSTS.map((p) => p.slug));
    for (const t of liveTools()) {
      const posts = TOOL_POSTS[t.slug] ?? [];
      expect(posts.length, t.slug).toBeGreaterThanOrEqual(2);
      expect(posts.length, t.slug).toBeLessThanOrEqual(4);
      for (const s of posts) expect(slugs.has(s), `${t.slug} → ${s}`).toBe(true);
    }
  });

  it("footer, comparison and topic links only point at real pages", () => {
    const hrefs = [...FOOTER_GROUPS.flatMap((g) => g.links), ...FOOTER_LEGAL, ...COMPARE_LINKS, ...Object.values(TOPIC_LINKS).flat()].map((l) => l.href);
    for (const h of hrefs) expect(known.has(h), h).toBe(true);
  });

  it("footer has the five groups with descriptive anchors", () => {
    expect(FOOTER_GROUPS.map((g) => g.title)).toEqual(["Challenges", "Tools", "Guides", "Compare", "App"]);
    for (const l of FOOTER_GROUPS.flatMap((g) => g.links)) {
      expect(l.label).not.toMatch(/click here|read more|^here$|^more$/i);
      expect(l.label.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("breadcrumbs start at Home, end at the page, and only use real pages", () => {
    for (const p of allPaths()) {
      const c = crumbsFor(p);
      expect(c[0]).toEqual({ name: "Home", path: "/" });
      expect(c.at(-1)!.path).toBe(p);
      for (const x of c) expect(known.has(x.path), `${p} crumb ${x.path}`).toBe(true);
      if (p !== "/") expect(c.length).toBeGreaterThanOrEqual(2);
    }
    expect(crumbsFor(postPath("squat-alarm-clock")).map((c) => c.path)).toEqual(["/", "/blog", "/blog/topic/wake-up-challenges", "/blog/squat-alarm-clock"]);
    expect(crumbsFor("/sleep-calculator").map((c) => c.path)).toEqual(["/", "/tools", "/sleep-calculator"]);
  });
});

/** Static routes on disk: every src/app/**\/page.tsx without a [param] segment. */
function staticRoutes(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...staticRoutes(full, base));
    else if (name === "page.tsx") {
      const rel = relative(base, dir).split("\\").join("/");
      if (!rel.includes("[")) out.push(rel ? `/${rel}` : "/");
    }
  }
  return out;
}

describe("sitemap completeness", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url.replace(SITE, "") || "/");

  it("lists every registry URL exactly once, and nothing else", () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect([...urls].sort()).toEqual([...allPaths()].sort());
  });

  it("covers every static page route, every post, topic hub and live tool", () => {
    const set = new Set(urls);
    for (const r of staticRoutes(join(__dirname, "..", "..", "app"))) expect(set.has(r), `route ${r} missing from sitemap`).toBe(true);
    for (const p of BLOG_POSTS) expect(set.has(postPath(p.slug))).toBe(true);
    for (const t of BLOG_TOPICS) expect(set.has(`/blog/topic/${t.slug}`)).toBe(true);
    for (const t of liveTools()) expect(set.has(toolPath(t.slug))).toBe(true);
  });

  it("lastModified is a hand-set ISO day, never a build timestamp", () => {
    for (const e of entries) expect(String(e.lastModified), e.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("image and video entries are absolute and use v1.6 media", () => {
    for (const e of entries) {
      for (const img of e.images ?? []) expect(img.startsWith(SITE), img).toBe(true);
      for (const v of e.videos ?? []) {
        expect(v.content_loc).toMatch(/\/assets\/v16\//);
        expect(v.thumbnail_loc).toMatch(/\/assets\/v16\//);
        expect(String(v.publication_date)).toMatch(/T\d\d:\d\d/);
      }
    }
    expect(entries.find((e) => e.url.endsWith("/gallery"))!.videos!.length).toBeGreaterThan(0);
  });
});
