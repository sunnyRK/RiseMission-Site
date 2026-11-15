import TurndownService from "turndown";
// @ts-expect-error -- no types published for the GFM plugin
import { tables } from "turndown-plugin-gfm";
import { isMarkdownable, MD_FETCH_HEADER } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

/**
 * Markdown twin of any content page: self-fetches the HTML, keeps <main>,
 * drops scripts/media chrome, converts to Markdown. noindex so search engines
 * never see it as duplicate content; AI agents get a clean, citable text.
 */
const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
td.use(tables);
td.remove(["script", "style", "noscript", "video", "button", "form", "nav"]);
// FAQ toggles render a decorative "+" in an aria-hidden span; drop aria-hidden nodes.
td.addRule("ariaHidden", { filter: (n) => (n as HTMLElement).getAttribute?.("aria-hidden") === "true", replacement: () => "" });
// Inline SVG icons carry no text; drop them (not in HTMLElementTagNameMap).
td.addRule("svg", { filter: (n) => n.nodeName.toLowerCase() === "svg", replacement: () => "" });
td.addRule("img", {
  filter: "img",
  replacement: (_c, node) => {
    const alt = (node as HTMLElement).getAttribute("alt");
    return alt ? `[Image: ${alt}]` : "";
  },
});

export async function GET(req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const pagePath = "/" + path.map(encodeURIComponent).join("/");
  if (!isMarkdownable(pagePath)) return new Response("Not found", { status: 404 });

  const origin = new URL(req.url).origin;
  const res = await fetch(`${origin}${pagePath}`, { headers: { [MD_FETCH_HEADER]: "1", accept: "text/html" } });
  if (!res.ok) return new Response("Not found", { status: res.status === 404 ? 404 : 502 });
  const html = await res.text();

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "Rise Mission";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const body = td
    .turndown(main.replace(/<script[\s\S]*?<\/script>/g, ""))
    .replace(/\]\(\//g, `](${SITE_URL}/`)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const md = `# ${decode(title)}\n\n> ${decode(desc)}\n\nSource: ${SITE_URL}${pagePath === "/" ? "" : pagePath}\n\n${body}\n`;
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      Vary: "Accept",
    },
  });
}

function decode(s: string) {
  return s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
