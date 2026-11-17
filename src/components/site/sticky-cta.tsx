"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { appStoreHref } from "./app-store-button";
import { AppleLogo } from "./icons";

/**
 * Phone-only floating glass bar, styled like the app's tab bar. Appears once
 * the hero CTA has scrolled away and hides again while any other App Store
 * button is on screen, so there is never a duplicate CTA in view.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ctas = Array.from(document.querySelectorAll<HTMLElement>("[data-cta]:not([data-cta='sticky']):not([data-cta='header']):not([data-cta='mobile-menu'])"));

    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setShow(seen.size === 0 && window.scrollY > 400);
    });
    ctas.forEach((c) => io.observe(c));
    const footer = document.querySelector("footer");
    if (footer) io.observe(footer);
    const onScroll = () => setShow(seen.size === 0 && window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className="rm-sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden" data-show={show} aria-hidden={!show}>
      <div className="rm-glass pointer-events-auto mx-auto flex max-w-md items-center gap-3 rounded-[26px] p-2 pl-3">
        <Image src="/assets/icon.png" alt="" width={36} height={36} className="rounded-[9px]" />
        <p className="min-w-0 flex-1 leading-tight">
          <span className="block text-[0.92rem] font-extrabold text-ink">Rise Mission</span>
          <span className="block truncate text-[0.75rem] font-semibold text-muted">Prove you&apos;re awake</span>
        </p>
        <a
          href={appStoreHref("sticky")}
          data-cta="sticky"
          tabIndex={show ? 0 : -1}
          className="rm-btn-primary inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[0.9rem] font-extrabold"
        >
          <AppleLogo className="h-4 w-4" /> Get the app
        </a>
      </div>
    </div>
  );
}
