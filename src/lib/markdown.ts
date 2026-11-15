/**
 * Markdown for AI agents (pattern + numbers from pagedrop: 812 Markdown reads
 * vs 8 llms.txt hits in 2.5 days). When a request's Accept header prefers
 * `text/markdown`, src/proxy.ts rewrites the page to /md/<path>, which returns
 * a clean Markdown rendering of the same page. Browsers never send
 * text/markdown, so people always get HTML. Pure module (edge-safe).
 */

export const MD_ROUTE = "/md";
/** Set on the route's own HTML self-fetch so the proxy never re-negotiates it. */
export const MD_FETCH_HEADER = "x-rm-markdown-fetch";

function qualities(accept: string): Map<string, number> {
  const out = new Map<string, number>();
  for (const part of accept.split(",")) {
    const [raw, ...params] = part.split(";");
    const type = raw.trim().toLowerCase();
    if (!type) continue;
    let q = 1;
    for (const p of params) {
      const [k, v] = p.split("=");
      if (k?.trim().toLowerCase() === "q") {
        const n = Number(v);
        q = Number.isFinite(n) ? n : 0;
      }
    }
    out.set(type, Math.max(out.get(type) ?? 0, q));
  }
  return out;
}

/** True when the client asks for Markdown at least as strongly as HTML (`*\/*` doesn't count as HTML). */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const q = qualities(accept);
  const md = q.get("text/markdown") ?? 0;
  if (md <= 0) return false;
  return md >= Math.max(q.get("text/html") ?? 0, q.get("application/xhtml+xml") ?? 0);
}

/** One absolute, same-origin page path. */
export function isSafePagePath(path: string): boolean {
  return /^\/(?!\/)[A-Za-z0-9\-._~/%]*$/.test(path) && !path.includes("..") && path.length <= 512;
}

/** Content pages that have a Markdown twin (not assets, APIs, feeds or images). */
export function isMarkdownable(path: string): boolean {
  if (!isSafePagePath(path)) return false;
  if (path.startsWith(MD_ROUTE + "/") || path === MD_ROUTE) return false;
  if (/^\/(_next|og|api|assets)(\/|$)/.test(path)) return false;
  return !/\.[a-z0-9]+$/i.test(path); // no file extensions (.xml, .txt, .png …)
}
