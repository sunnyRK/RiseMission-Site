import { NextResponse, type NextRequest } from "next/server";
import { isMarkdownable, MD_FETCH_HEADER, MD_ROUTE, prefersMarkdown } from "@/lib/markdown";

/**
 * 1. Agents asking for `Accept: text/markdown` get the Markdown twin of a page.
 * 2. Every content page advertises that twin via an HTTP `Link` header.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (request.method !== "GET" || !isMarkdownable(pathname) || request.headers.get(MD_FETCH_HEADER)) {
    return NextResponse.next();
  }
  const twin = `${MD_ROUTE}${pathname === "/" ? "" : pathname}`;
  if (prefersMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = twin;
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept");
    return res;
  }
  const res = NextResponse.next();
  res.headers.append("Link", `<${twin || MD_ROUTE}>; rel="alternate"; type="text/markdown"`);
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  // Skip static assets and Next internals entirely.
  matcher: ["/((?!_next/|assets/|og|favicon.ico|icon|apple-icon|.*\\.(?:png|jpg|jpeg|webp|svg|mp4|ico|xml|txt|webmanifest)$).*)"],
};
