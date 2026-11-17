"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/**
 * The one carousel (≈2 KB): the app's ChallengeCarousel feel on the web.
 *
 * - Native CSS scroll-snap, centered, next card peeking: swipe works on touch
 *   with zero JS. Mouse drag + arrow keys + dots + prev/next are layered on.
 * - Side-card scale/tilt and icon parallax are CSS scroll-driven animations
 *   (globals.css `.rm-depth`, `.rm-px-x`), not per-frame JS.
 * - Slides are server-rendered children (crawlable); this only adds behavior.
 * - ARIA: region + aria-roledescription="carousel", each slide a group
 *   "n of N", counter is a polite live region (off while auto-playing).
 * - Auto-advance (opt-in) pauses on hover, focus, off-screen, hidden tab, the
 *   pause button, and never runs with reduced motion.
 */
export function Carousel({
  label,
  children,
  autoplay,
  dotColors,
  cardWidth,
  padTop,
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
  className?: string;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(Boolean(autoplay));
  const [held, setHeld] = useState(false); // hover / focus inside
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      // Past the end (or stuck at the scroll end on wide screens): wrap around.
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      const idx = i >= n || (i > active && atEnd) ? 0 : (i + n) % n;
      const s = el.children[idx] as HTMLElement | undefined;
      if (!s) return;
      el.scrollTo({ left: targetLeft(el, s), behavior: reduced ? "auto" : "smooth" });
    },
    [n, reduced, active],
  );

  // Track the centered slide (rAF-throttled scroll listener).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      let best = 0;
      let bestD = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const s = c as HTMLElement;
        const d = Math.abs(targetLeft(el, s) - el.scrollLeft);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

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
        const s = c as HTMLElement;
        const d = Math.abs(targetLeft(el, s) - startLeft);
        if (d < bestD) {
          bestD = d;
          from = i;
        }
      });
      const jump = Math.abs(dx) > step / 3 ? Math.max(1, Math.round(Math.abs(dx) / step)) : 0;
      const target = Math.min(n - 1, Math.max(0, from + (dx < 0 ? jump : -jump)));
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
  }, [n]);

  // Auto-advance.
  const running = Boolean(autoplay) && playing && !held && visible && !reduced;
  useEffect(() => {
    if (!running || !autoplay) return;
    const id = setInterval(() => {
      if (!document.hidden) go(active + 1);
    }, autoplay);
    return () => clearInterval(id);
  }, [running, autoplay, active, go]);

  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`relative ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest("input,textarea,[contenteditable]")) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(Math.min(n - 1, active + 1));
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(Math.max(0, active - 1));
        } else if (e.key === "Home") {
          e.preventDefault();
          go(0);
        } else if (e.key === "End") {
          e.preventDefault();
          go(n - 1);
        }
      }}
    >
      <div
        ref={track}
        tabIndex={0}
        role="group"
        aria-label={`${label}: use the arrow keys to move between cards`}
        className="rm-track focus-visible:outline-offset-[-2px]"
        style={{ ...(cardWidth ? { "--card-w": cardWidth } : {}), ...(padTop ? { "--pad-top": padTop } : {}) } as CSSProperties}
      >
        {slides.map((child, i) => (
          <div key={i} className="rm-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
            <div className="rm-depth h-full">{child}</div>
          </div>
        ))}
      </div>

      <div className="container-rm -mt-3 flex items-center justify-between gap-3">
        <p aria-live={running ? "off" : "polite"} aria-atomic="true" className="t-rounded min-w-[4.5rem] text-[0.95rem] font-extrabold text-ink">
          {pad(active + 1)} <span className="text-[0.8rem] font-bold text-muted">/ {pad(n)}</span>
        </p>
        <div className="hidden flex-wrap justify-center sm:flex" role="group" aria-label="Choose a card">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className="rm-dot"
              aria-label={`Go to card ${i + 1}`}
              aria-current={i === active}
              style={dotColors?.[i] ? ({ "--dot": dotColors[i] } as CSSProperties) : undefined}
              onClick={() => go(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {autoplay && !reduced && (
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause auto-advance" : "Start auto-advance"} className={BTN}>
              {playing ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
            </button>
          )}
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous card" className={BTN}>
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next card" className={BTN}>
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
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
