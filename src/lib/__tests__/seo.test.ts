import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_POSTS, BLOG_TOPICS, relatedPosts, topicsForPost } from "../blog";
import { DESCRIPTION_MAX, TITLE_MAX } from "../seo";
import { bedtimesFor, fmtTime, wakeTimesFor } from "../sleep";

const root = join(__dirname, "..", "..", "..");

describe("blog registry", () => {
  it("every post has a page file that uses getPost(slug)", () => {
    for (const p of BLOG_POSTS) {
      const file = join(root, "src/app/blog", p.slug, "page.tsx");
      expect(existsSync(file), `missing page for ${p.slug}`).toBe(true);
      expect(readFileSync(file, "utf8")).toContain(`getPost("${p.slug}")`);
    }
  });

  it("every post belongs to at least one topic hub (no orphans)", () => {
    for (const p of BLOG_POSTS) expect(topicsForPost(p.slug).length, p.slug).toBeGreaterThan(0);
  });

  it("topics only reference real posts", () => {
    const slugs = new Set(BLOG_POSTS.map((p) => p.slug));
    for (const t of BLOG_TOPICS) for (const s of t.posts) expect(slugs.has(s), `${t.slug} → ${s}`).toBe(true);
  });

  it("meta titles and descriptions fit SERP limits and are unique", () => {
    const titles = new Set<string>();
    const descs = new Set<string>();
    for (const p of BLOG_POSTS) {
      const title = p.metaTitle ?? p.title;
      const desc = p.metaDescription ?? p.description;
      expect(title.length, `title too long: ${p.slug}`).toBeLessThanOrEqual(TITLE_MAX);
      expect(desc.length, `description too long: ${p.slug}`).toBeLessThanOrEqual(DESCRIPTION_MAX + 10);
      expect(titles.has(title)).toBe(false);
      expect(descs.has(desc)).toBe(false);
      titles.add(title);
      descs.add(desc);
    }
    for (const t of BLOG_TOPICS) expect(t.metaTitle.length, t.slug).toBeLessThanOrEqual(TITLE_MAX);
  });

  it("dates are real ISO days and updated is never before date", () => {
    for (const p of BLOG_POSTS) {
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (p.updated) expect(p.updated >= p.date).toBe(true);
    }
  });

  it("related posts never include the post itself", () => {
    for (const p of BLOG_POSTS) expect(relatedPosts(p.slug).map((r) => r.slug)).not.toContain(p.slug);
  });
});

describe("sleep math", () => {
  it("6:30 AM wake → 9:15 PM / 10:45 PM / 12:15 AM bedtimes", () => {
    expect(bedtimesFor(390).map((b) => fmtTime(b.at))).toEqual(["9:15 PM", "10:45 PM", "12:15 AM"]);
  });
  it("bed at 11:00 PM → wake 5:15 / 6:45 / 8:15 AM", () => {
    expect(wakeTimesFor(1380).map((w) => fmtTime(w.at))).toEqual(["5:15 AM", "6:45 AM", "8:15 AM"]);
  });
  it("formats midnight and noon", () => {
    expect(fmtTime(0)).toBe("12:00 AM");
    expect(fmtTime(720)).toBe("12:00 PM");
  });
});

describe("claude-seo quality gates (titles 30–60 incl. suffix, descriptions 110–160)", () => {
  const SUFFIX = " | Rise Mission".length;
  it("topic hubs", () => {
    for (const t of BLOG_TOPICS) {
      expect(t.metaTitle.length + SUFFIX, t.slug).toBeGreaterThanOrEqual(30);
      expect(t.description.length, t.slug).toBeGreaterThanOrEqual(110);
      expect(t.description.length, t.slug).toBeLessThanOrEqual(160);
    }
  });
  it("posts", () => {
    for (const p of BLOG_POSTS) {
      const title = (p.metaTitle ?? p.title).length + SUFFIX;
      const desc = (p.metaDescription ?? p.description).length;
      expect(title, p.slug).toBeGreaterThanOrEqual(30);
      expect(title, p.slug).toBeLessThanOrEqual(60);
      expect(desc, p.slug).toBeGreaterThanOrEqual(110);
    }
  });
});
