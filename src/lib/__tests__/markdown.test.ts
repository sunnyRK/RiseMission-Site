import { describe, expect, it } from "vitest";
import { isMarkdownable, prefersMarkdown } from "../markdown";

describe("markdown negotiation", () => {
  it("only agents that ask for markdown get it", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown, */*;q=0.8")).toBe(true);
    expect(prefersMarkdown("text/html,application/xhtml+xml,*/*;q=0.8")).toBe(false);
    expect(prefersMarkdown("text/html;q=1, text/markdown;q=0.5")).toBe(false);
    expect(prefersMarkdown(null)).toBe(false);
  });
  it("only content pages have a markdown twin", () => {
    expect(isMarkdownable("/")).toBe(true);
    expect(isMarkdownable("/blog/how-to-stop-hitting-snooze")).toBe(true);
    for (const p of ["/sitemap.xml", "/llms.txt", "/og", "/assets/icon.png", "/md/blog", "/_next/x", "//evil.com", "/a/../b"]) {
      expect(isMarkdownable(p), p).toBe(false);
    }
  });
});
