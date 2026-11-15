import { postPath, sortedPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = sortedPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${SITE_URL}${postPath(p.slug)}</link><guid>${SITE_URL}${postPath(p.slug)}</guid><pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Rise Mission Blog</title><link>${SITE_URL}/blog</link><description>Guides to waking up on time.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
