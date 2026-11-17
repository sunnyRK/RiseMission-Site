#!/usr/bin/env node
/**
 * Post-build SEO crawl of the static output (run after `pnpm build`):
 *   pnpm seo:audit
 *
 * Reads .next/server/app/sitemap.xml.body and every page's prerendered HTML,
 * then checks what Google and answer engines actually receive:
 *   - every sitemap URL has a built page, a self canonical, OG + Twitter image
 *   - <title> ≤ 60 chars, meta description 70–155 chars, both unique
 *   - every JSON-LD block parses and has its type's required fields
 *   - BreadcrumbList on every page except the homepage
 *   - ≥ 3 internal inlinks from other pages (and how many come from <main>)
 *   - no em dash and no "trial" anywhere in the HTML
 * Exits 1 on any failure. No dependencies (regex over our own HTML).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const APP = join(ROOT, ".next/server/app");
const SITE = "https://risemission.app";
const MIN_INLINKS = 3;

if (!existsSync(join(APP, "sitemap.xml.body"))) {
  console.error("No build output. Run `pnpm build` first.");
  process.exit(1);
}

const sitemap = readFileSync(join(APP, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const pathOf = (u) => u.replace(SITE, "") || "/";
const fileOf = (p) => join(APP, p === "/" ? "index.html" : `${p}.html`);
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const errors = [];
const warn = [];
const fail = (p, msg) => errors.push(`${p}: ${msg}`);

/** schema.org type → required keys (Google rich-result + our own rules). */
const REQUIRED = {
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  BlogPosting: ["headline", "image", "datePublished", "dateModified", "author", "publisher"],
  Article: ["headline", "image", "datePublished", "dateModified", "author", "publisher"],
  MobileApplication: ["name", "operatingSystem", "applicationCategory", "offers", "softwareVersion"],
  SoftwareApplication: ["name", "operatingSystem", "applicationCategory", "offers"],
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  VideoObject: ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl"],
  ImageObject: ["contentUrl"],
  HowTo: ["name", "step"],
  CollectionPage: ["name", "url"],
  ItemList: ["itemListElement"],
  ImageGallery: ["name"],
  Person: ["name"],
  WebPage: ["name", "url"],
  Dataset: ["name", "description"],
};

function checkNode(p, node, nested = false) {
  const types = [].concat(node["@type"] ?? []);
  // A nested node with an @id is a reference to an entity described elsewhere.
  const isRef = nested && typeof node["@id"] === "string";
  for (const t of isRef ? [] : types) {
    for (const k of REQUIRED[t] ?? []) {
      const v = node[k];
      if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) fail(p, `JSON-LD ${t} missing ${k}`);
    }
    if (t === "BreadcrumbList") {
      node.itemListElement.forEach((li, i) => {
        if (li.position !== i + 1 || !li.name || !li.item) fail(p, `BreadcrumbList item ${i + 1} incomplete`);
      });
    }
    if (t === "FAQPage") for (const q of node.mainEntity) if (!q.name || !q.acceptedAnswer?.text) fail(p, "FAQPage question incomplete");
    if (t === "VideoObject" && !/T\d\d:\d\d/.test(node.uploadDate ?? "")) fail(p, "VideoObject uploadDate needs a time + timezone");
    if ((t === "MobileApplication" || t === "SoftwareApplication") && node.aggregateRating) {
      const r = node.aggregateRating;
      if (!r.ratingValue || !r.ratingCount) fail(p, "aggregateRating without a real count");
    }
  }
  for (const v of Object.values(node)) {
    if (Array.isArray(v)) v.forEach((x) => x && typeof x === "object" && checkNode(p, x, true));
    else if (v && typeof v === "object") checkNode(p, v, true);
  }
}

const pages = new Map();
for (const u of urls) {
  const p = pathOf(u);
  const f = fileOf(p);
  if (!existsSync(f)) {
    fail(p, "in sitemap but no prerendered HTML");
    continue;
  }
  pages.set(p, readFileSync(f, "utf8"));
}

const titles = new Map();
const descs = new Map();
const inlinks = new Map([...pages.keys()].map((p) => [p, new Set()]));
const mainInlinks = new Map([...pages.keys()].map((p) => [p, new Set()]));
const norm = (href) => {
  const h = href.split("#")[0].split("?")[0];
  if (!h) return null;
  if (h.startsWith(SITE)) return h.slice(SITE.length) || "/";
  return h.startsWith("/") ? (h.length > 1 ? h.replace(/\/$/, "") : "/") : null;
};

for (const [p, html] of pages) {
  const head = html.split("</head>")[0];
  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!title) fail(p, "no <title>");
  if (title.length > 60) fail(p, `title ${title.length} chars: "${title}"`);
  if (desc.length > 155) fail(p, `description ${desc.length} chars`);
  if (desc.length < 70) fail(p, `description only ${desc.length} chars`);
  if (titles.has(title)) fail(p, `duplicate title with ${titles.get(title)}`);
  if (descs.has(desc)) fail(p, `duplicate description with ${descs.get(desc)}`);
  titles.set(title, p);
  descs.set(desc, p);
  if (canonical !== `${SITE}${p === "/" ? "" : p}`) fail(p, `canonical ${canonical}`);
  if (!/<meta property="og:image" content="[^"]+"/.test(head)) fail(p, "no og:image");
  if (!/<meta name="twitter:image" content="[^"]+"/.test(head)) fail(p, "no twitter:image");
  if (/<meta name="robots" content="[^"]*noindex/.test(head)) fail(p, "noindex page listed in sitemap");

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = new Set();
  for (const b of blocks) {
    let data;
    try {
      data = JSON.parse(b);
    } catch {
      fail(p, "JSON-LD does not parse");
      continue;
    }
    for (const node of [].concat(data["@graph"] ?? data)) {
      if (!node["@context"] && !data["@context"]) fail(p, "JSON-LD without @context");
      [].concat(node["@type"] ?? []).forEach((t) => types.add(t));
      checkNode(p, node);
    }
  }
  if (p !== "/" && !types.has("BreadcrumbList")) fail(p, "no BreadcrumbList JSON-LD");
  if (p !== "/" && !/<nav aria-label="Breadcrumb"/.test(html)) fail(p, "no visible breadcrumb nav");
  const faqCount = blocks.filter((b) => b.includes('"FAQPage"')).length;
  if (faqCount > 1) fail(p, `${faqCount} FAQPage blocks`);

  if (/—/.test(html)) fail(p, "em dash in HTML");
  if (/trial/i.test(html)) fail(p, '"trial" in HTML');

  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  for (const [, href] of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const t = norm(href);
    if (t && t !== p && inlinks.has(t)) inlinks.get(t).add(p);
  }
  for (const [, href] of main.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const t = norm(href);
    if (t && t !== p && mainInlinks.has(t)) mainInlinks.get(t).add(p);
  }
}

const rows = [...pages.keys()].map((p) => [p, inlinks.get(p).size, mainInlinks.get(p).size]).sort((a, b) => a[2] - b[2]);
for (const [p, all, inMain] of rows) {
  if (all < MIN_INLINKS) fail(p, `only ${all} internal inlinks (need ${MIN_INLINKS})`);
  if (inMain < MIN_INLINKS) warn.push(`${p}: ${inMain} in-content inlinks`);
}

console.log(`Crawled ${pages.size}/${urls.length} sitemap URLs.`);
console.log("Fewest in-content inlinks:", rows.slice(0, 8).map(([p, , m]) => `${p}=${m}`).join(", "));
if (warn.length) console.log(`Warnings (${warn.length}):\n  ${warn.join("\n  ")}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("SEO audit passed.");
