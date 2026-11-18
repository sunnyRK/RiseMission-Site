"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, X } from "lucide-react";
import { appStoreHref } from "./app-store-button";
import { AppleLogo } from "./icons";

const DISMISS_KEY = "rm-getapp-dismissed";

function readDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Sitewide floating chrome (mounted once in the root layout):
 * - Phones: a compact glass bar, styled like the app's tab bar.
 * - Desktop (lg+): a wide dark "get the app" card centered at the bottom.
 * - Back-to-top button at the bottom right, after ~800px of scroll.
 *
 * The CTA slides in shortly after load on every page and stays while
 * scrolling. It hides only while the footer is on screen (so it never covers
 * it) or after the visitor closes it (remembered for the session). The bottom
 * spacer keeps it off the last content on every width.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [toTop, setToTop] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // sessionStorage is client-only: read after mount (no hydration mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(readDismissed());
  }, []);

  useEffect(() => {
    // Short delay so the CTA slides in after first paint (no CLS: it's fixed).
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => setToTop(window.scrollY > 800);
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(([e]) => setNearFooter(e.isIntersecting));
    if (footer) io.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  const visible = ready && !dismissed && !nearFooter;
  const close = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Private mode / blocked storage: hide for this page view only.
    }
  };
  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <>
      {/* Room for the floating bar/card so it never sits on top of the last content. */}
      <div aria-hidden className="h-24 lg:h-28" />

      {/* Phone bar */}
      <div
        className="rm-sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        data-show={visible}
        inert={!visible}
      >
        <div className="rm-glass pointer-events-auto mx-auto flex max-w-md items-center gap-2.5 rounded-[26px] p-2 pl-3">
          <Image src="/assets/icon.png" alt="" width={36} height={36} className="rounded-[9px]" />
          <p className="min-w-0 flex-1 leading-tight">
            <span className="block text-[0.92rem] font-extrabold text-ink">Rise Mission</span>
            <span className="block truncate text-[0.75rem] font-semibold text-muted">Prove you&apos;re awake</span>
          </p>
          <a
            href={appStoreHref("sticky")}
            data-cta="sticky"
            className="rm-btn-primary inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-[0.9rem] font-extrabold"
          >
            <AppleLogo className="h-4 w-4" /> Get the app
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-ml-0.5 flex h-11 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:text-ink"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Desktop card: narrower than the viewport by enough to leave the
          back-to-top button its own lane on the right at every width. */}
      <aside
        aria-label="Get Rise Mission"
        className="rm-sticky-cta pointer-events-none fixed inset-x-0 bottom-4 z-40 mx-auto hidden w-[min(880px,calc(100vw-10rem))] lg:block"
        data-show={visible}
        inert={!visible}
      >
        <div className="rm-getapp pointer-events-auto flex items-center gap-4 rounded-[24px] py-2.5 pl-2.5 pr-2.5">
          <Image src="/assets/icon.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-[13px] shadow-[0_8px_18px_-8px_rgb(47_91_255/0.8)]" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[1.12rem] font-extrabold leading-tight tracking-[-0.02em]">Wake up on the first alarm.</p>
            <p className="rm-getapp-sub truncate text-[0.88rem]">Rise Mission rings on Silent and won&apos;t stop until you finish a quick challenge.</p>
          </div>
          <a
            href={appStoreHref("sticky")}
            data-cta="sticky"
            className="rm-btn-primary group inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[0.95rem] font-extrabold transition-[filter] duration-150 hover:brightness-110"
          >
            Get the app <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors duration-150 hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* Back to top: lifts above the phone bar while it is showing. */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        data-show={toTop}
        inert={!toTop}
        className={`rm-totop fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full lg:right-6 lg:bottom-[22px] ${visible ? "bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+4.75rem)]" : "bottom-[max(1rem,env(safe-area-inset-bottom))]"}`}
      >
        <ArrowUp aria-hidden className="h-5 w-5" />
      </button>
    </>
  );
}
