"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/**
 * Calm scroll reveal (fade + 12px rise), ~1 KB, no dependencies.
 *
 * Progressive enhancement, crawler- and no-JS-safe:
 * - Server HTML renders content fully visible. Nothing is hidden without JS.
 * - After hydration, ONLY elements still below the fold are armed
 *   (`data-reveal="armed"` = hidden by CSS), then revealed by one shared
 *   IntersectionObserver. Anything already on screen is never hidden, so no flash.
 * - Opacity/transform only: no layout shift (CLS 0).
 * - `prefers-reduced-motion: reduce` → never armed (and CSS ignores it too).
 * - `stagger` gives each direct child an index (`--i`) for a 60ms cascade.
 */

type Tag = "div" | "ul" | "ol" | "section" | "dl" | "header";

let observer: IntersectionObserver | null = null;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = "in";
          observer?.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }
  return observer;
}

export function Reveal({
  as = "div",
  stagger = false,
  className,
  children,
  id,
}: {
  as?: Tag;
  stagger?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already (partly) visible: leave it alone, never hide what the user can see.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    if (stagger) {
      Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(Math.min(i, 10))));
    }
    el.dataset.reveal = "armed";
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [stagger]);

  // All Tag options are plain block elements; typing as "div" keeps the ref simple.
  const Comp = as as "div";
  return (
    <Comp ref={ref as RefObject<HTMLDivElement>} id={id} className={className} data-reveal-stagger={stagger ? "" : undefined}>
      {children}
    </Comp>
  );
}
