"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * Site analytics. Everything is OFF unless its env var is set, so local dev
 * and preview deploys never pollute production numbers.
 *
 *   NEXT_PUBLIC_GA_ID          GA4 measurement id (G-XXXX)
 *   NEXT_PUBLIC_POSTHOG_KEY    PostHog project key
 *   NEXT_PUBLIC_POSTHOG_HOST   defaults to https://us.i.posthog.com
 *
 * Events: page views (both tools) and `app_store_click` for any element with
 * `data-cta` (placement = which section converted), plus `ai_referral` when a
 * visitor arrives from ChatGPT / Perplexity / Gemini / Claude / Copilot.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

const AI_SOURCES: [RegExp, string][] = [
  [/chatgpt\.com|chat\.openai\.com/, "chatgpt"],
  [/perplexity\.ai/, "perplexity"],
  [/gemini\.google\.com|bard\.google\.com/, "gemini"],
  [/claude\.ai/, "claude"],
  [/copilot\.microsoft\.com|bing\.com\/chat/, "copilot"],
];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props: Record<string, string | number> = {}) {
  window.gtag?.("event", event, props);
  if (PH_KEY) posthog.capture(event, props);
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PH_KEY || posthog.__loaded) return;
    posthog.init(PH_KEY, {
      api_host: PH_HOST,
      // Cookieless: no consent banner needed for PostHog itself.
      persistence: "memory",
      capture_pageview: "history_change",
      autocapture: false,
    });
  }, []);

  useEffect(() => {
    const ref = document.referrer;
    const hit = AI_SOURCES.find(([re]) => re.test(ref)) ?? (/[?&]utm_source=chatgpt/.test(location.search) ? [null, "chatgpt"] : undefined);
    if (hit) track("ai_referral", { source: hit[1] as string, landing: location.pathname });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (el) track("app_store_click", { placement: el.dataset.cta ?? "unknown", page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false});`}
      </Script>
    </>
  );
}
