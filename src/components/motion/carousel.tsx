"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useAutoplay } from "./use-autoplay";

/**
 * The one carousel: the app's ChallengeCarousel feel on the web.
 *
 * - Native CSS scroll-snap, centered, next card peeking: swipe works on touch
 *   with zero JS. Mouse drag + arrow keys + dots + prev/next are layered on.
 * - Seamless loop: after hydration the first few slides are appended again as
 *   inert, aria-hidden clones. Moving past the last card slides onto the clone
 *   of the first, then the track silently jumps back to the real one (same
 *   pixels), so it never rewinds across every card.
 * - Auto-advance via the shared useAutoplay hook (pauses on hover, touch,
 *   keyboard focus, off-screen, hidden tab, the pause button; never with
 *   reduced motion; resumes ~4s after an interaction).
 * - Side-card scale/tilt and icon parallax are CSS scroll-driven animations
 *   (globals.css `.rm-depth`, `.rm-px-x`), not per-frame JS.
 * - Slides are server-rendered children (crawlable); clones are client-only.
 * - ARIA: region + aria-roledescription="carousel", each slide a group
 *   "n of N", counter is a polite live region (off while auto-playing).
 */
export function Carousel({
  label,
  children,
  autoplay,
  dotColors,
  cardWidth,
  padTop,
  perView = 4,
  className = "",
}: {
  label: string;
  children: ReactNode;
  /** Auto-advance interval in ms. */
  autoplay?: number;
  /** Per-slide colour for the active dot (the app tints it with the challenge). */
  dotColors?: string[];
  /** CSS width of one card in viewport units (a % would resolve against the padded track), e.g. "min(80vw, 340px)". */
  cardWidth?: string;
  /** Headroom above cards (for icons that break out of the top). */
  padTop?: string;
  /** Whole cards per view on desktop (≥ 1280px; one fewer at 1024px). Cards never clip at the gutter there. */
  perView?: number;
  className?: string;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0); // index in the extended (real + clones) list
  const [clones, setClones] = useState(0);
  const reducedRef = useRef(false);
  const touching = useRef(false);

  const behavior = (): ScrollBehavior => (reducedRef.current ? "auto" : "smooth");

  const scrollToSlide = useCallback((i: number, how: ScrollBehavior) => {
    const el = track.current;
    const s = el?.children[i] as HTMLElement | undefined;
    if (el && s) el.scrollTo({ left: targetLeft(el, s), behavior: how });
  }, []);

  /** Nearest slide to the current scroll position (extended index). */
  const nearest = useCallback(() => {
    const el = track.current;
    if (!el) return 0;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs(targetLeft(el, c as HTMLElement) - el.scrollLeft);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }, []);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const cur = nearest();
      if (i < 0) {
        // Backwards from the first card: hop to its clone (identical view), then slide back one.
        if (clones > 0) {
          scrollToSlide(n, "instant");
          requestAnimationFrame(() => scrollToSlide(n - 1, behavior()));
        } else scrollToSlide(n - 1, behavior());
        return;
      }
      if (cur >= n && i > cur) {
        // Already parked on a clone: normalize first, then move.
        scrollToSlide(cur - n, "instant");
        requestAnimationFrame(() => scrollToSlide(i - n, behavior()));
        return;
      }
      const max = n + clones - 1;
      scrollToSlide(clones > 0 ? Math.min(i, max) : i % n, behavior());
    },
    [n, clones, nearest, scrollToSlide],
  );

  const auto = useAutoplay(root, autoplay, () => go(nearest() + 1));
  const { nudge } = auto;
  const goManual = (i: number) => {
    go(i);
    nudge();
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first || n < 2) return;
    // Enough clones to fill the viewport after the last real card.
    setClones(Math.min(n, Math.ceil(el.clientWidth / (first.offsetWidth + 14)) + 1));
  }, [n]);

  // Track the centered slide; when scrolling settles on a clone, jump to the real slide.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      if (touching.current || el.dataset.dragging !== undefined) return;
      const i = nearest();
      if (i >= n) scrollToSlide(i - n, "instant");
    };
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          setActive(nearest());
        });
      clearTimeout(idle);
      idle = setTimeout(settle, 160);
    };
    const onTouchStart = () => (touching.current = true);
    const onTouchEnd = () => {
      touching.current = false;
      clearTimeout(idle);
      idle = setTimeout(settle, 400);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, [n, nearest, scrollToSlide]);

  // Mouse drag (touch and pens already scroll natively).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let startX = 0;
    let startLeft = 0;
    let down = false;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.dataset.dragging = "";
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      if (!moved) return;
      delete el.dataset.dragging;
      // Swallow the click that ends a drag, then settle on the nearest card,
      // nudged one card in the flick direction past a third of a card.
      const swallow = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      el.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => el.removeEventListener("click", swallow, { capture: true }), 0);
      const first = el.children[0] as HTMLElement | undefined;
      const step = first ? first.offsetWidth : el.clientWidth;
      const dx = e.clientX - startX;
      let from = 0;
      let bestD = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const d = Math.abs(targetLeft(el, c as HTMLElement) - startLeft);
        if (d < bestD) {
          bestD = d;
          from = i;
        }
      });
      const jump = Math.abs(dx) > step / 3 ? Math.max(1, Math.round(Math.abs(dx) / step)) : 0;
      const target = Math.min(el.children.length - 1, Math.max(0, from + (dx < 0 ? jump : -jump)));
      const s = el.children[target] as HTMLElement;
      el.scrollTo({ left: targetLeft(el, s), behavior: "smooth" });
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const pad = (v: number) => String(v).padStart(2, "0");
  const real = active % n;

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`relative ${className}`}
      style={{ ...(cardWidth ? { "--card-w": cardWidth } : {}), ...(padTop ? { "--pad-top": padTop } : {}), "--pv": perView } as CSSProperties}
      {...auto.handlers}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest("input,textarea,[contenteditable]")) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goManual(active + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goManual(active - 1);
        } else if (e.key === "Home") {
          e.preventDefault();
          goManual(0);
        } else if (e.key === "End") {
          e.preventDefault();
          goManual(n - 1);
        }
      }}
    >
      <div className="rm-frame">
        <div ref={track} tabIndex={0} role="group" aria-label={`${label}: use the arrow keys to move between cards`} className="rm-track focus-visible:outline-offset-[-2px]">
          {slides.map((child, i) => (
            <div key={i} className="rm-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
              <div className="rm-depth h-full">{child}</div>
            </div>
          ))}
          {slides.slice(0, clones).map((child, i) => (
            <div key={`c${i}`} className="rm-slide" aria-hidden inert>
              <div className="rm-depth h-full">{child}</div>
            </div>
          ))}
        </div>
        {/* Arrows: round glass buttons centred on the cards, over the edges. */}
        <button type="button" onClick={() => goManual(active - 1)} aria-label="Previous card" className="rm-arrow rm-arrow-l">
          <ChevronLeft aria-hidden className="h-6 w-6" />
        </button>
        <button type="button" onClick={() => goManual(active + 1)} aria-label="Next card" className="rm-arrow rm-arrow-r">
          <ChevronRight aria-hidden className="h-6 w-6" />
        </button>
      </div>

      <div className="container-rm -mt-3 flex items-center justify-between gap-3">
        <p aria-live={auto.running ? "off" : "polite"} aria-atomic="true" className="t-rounded min-w-[4.5rem] text-[0.95rem] font-extrabold text-ink">
          {pad(real + 1)} <span className="text-[0.8rem] font-bold text-muted">/ {pad(n)}</span>
        </p>
        {/* Phones: decorative dots (too small to tap, so not buttons). */}
        <div aria-hidden className="flex flex-wrap justify-center gap-1 sm:hidden">
          {slides.map((_, i) => (
            <span key={i} className="rm-pip" data-on={i === real} style={dotColors?.[i] ? ({ "--dot": dotColors[i] } as CSSProperties) : undefined} />
          ))}
        </div>
        <div className="hidden flex-wrap justify-center sm:flex" role="group" aria-label="Choose a card">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className="rm-dot"
              aria-label={`Go to card ${i + 1}`}
              aria-current={i === real}
              style={dotColors?.[i] ? ({ "--dot": dotColors[i] } as CSSProperties) : undefined}
              onClick={() => goManual(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="flex min-w-[4.5rem] justify-end">
          {auto.enabled && (
            <button type="button" onClick={auto.toggle} aria-label={auto.playing ? "Pause auto-advance" : "Start auto-advance"} className={BTN}>
              {auto.playing ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** scrollLeft that snaps slide `s` into place (centered on phones, start-aligned on wide screens). */
function targetLeft(track: HTMLElement, s: HTMLElement) {
  const start = getComputedStyle(s).scrollSnapAlign.includes("start");
  // padding-left == scroll-padding-left on the track, and unlike scroll-padding
  // it always computes to px.
  const raw = start ? s.offsetLeft - (parseFloat(getComputedStyle(track).paddingLeft) || 0) : s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2;
  return Math.max(0, Math.min(raw, track.scrollWidth - track.clientWidth));
}

const BTN =
  "grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-ink shadow-[inset_0_1px_0_var(--highlight)] transition-[background-color,translate] duration-150 hover:bg-paper-2 active:translate-y-px";
