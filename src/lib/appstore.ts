import { APP_STORE_URL } from "./site";

/**
 * App Store Connect campaign links (App Analytics → Acquisition → Campaigns).
 * Apple: the campaign token (`ct`) may be up to 30 characters; a provider
 * token (`pt`) is required alongside it, and `mt=8` marks an app.
 * Source: developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links
 */
export const CT_MAX = 30;

/** FNV-1a, 4 hex chars: keeps shortened tokens unique and stable. */
function shortHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 4);
}

/**
 * `web-<placement>`, at most 30 characters. Long placements (e.g. a post slug)
 * are cut on a word boundary and get a 4-char hash so two posts never share a token.
 */
export function campaignToken(placement: string): string {
  const clean = placement.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "unknown";
  const full = `web-${clean.replace(/^blog-end-/, "be-").replace(/^blog-mid-/, "bm-")}`;
  if (full.length <= CT_MAX) return full;
  const suffix = `-${shortHash(clean)}`;
  let head = full.slice(0, CT_MAX - suffix.length);
  const cut = head.lastIndexOf("-");
  if (cut > 8) head = head.slice(0, cut);
  return `${head.replace(/-+$/, "")}${suffix}`;
}

/** Store link with campaign params when a provider token is configured, else the plain URL. */
export function appStoreLink(placement: string, providerToken: string | undefined): string {
  const pt = providerToken?.trim();
  if (!pt) return APP_STORE_URL;
  const q = new URLSearchParams({ pt, ct: campaignToken(placement), mt: "8" });
  return `${APP_STORE_URL}?${q.toString()}`;
}
