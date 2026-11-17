"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type RefObject } from "react";

/** Wait this long after the last interaction (hover out, finger up, arrow tap) before moving again. */
const RESUME_MS = 4000;

/**
 * Shared auto-advance for every carousel (≈0.6 KB).
 *
 * Runs `onTick` every `interval` ms while ALL of these hold:
 *   - the viewer hasn't pressed pause,
 *   - no mouse is over it, no finger is on it, no keyboard focus is inside,
 *   - at least 30% of it is on screen (IntersectionObserver),
 *   - the tab is visible and no modal <dialog> is open,
 *   - prefers-reduced-motion is not "reduce".
 * After an interaction ends it waits RESUME_MS, then carries on.
 * Spread `handlers` onto the carousel root; call `nudge()` after manual moves.
 */
export function useAutoplay(ref: RefObject<HTMLElement | null>, interval: number | undefined, onTick: () => void) {
  const [userPaused, setUserPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [kick, setKick] = useState(0);
  const resumeDelay = useRef(false);
  const tick = useRef(onTick);
  useEffect(() => {
    tick.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(mq.matches);
    const syncPage = () => setPageHidden(document.hidden);
    syncMotion();
    syncPage();
    mq.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncPage);
    const el = ref.current;
    const io = el ? new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), { threshold: 0.3 }) : null;
    if (el) io?.observe(el);
    return () => {
      mq.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncPage);
      io?.disconnect();
    };
  }, [ref]);

  /** Restart the clock with the longer post-interaction delay. */
  const nudge = useCallback(() => {
    resumeDelay.current = true;
    setKick((k) => k + 1);
  }, []);
  const release = useCallback(() => {
    setHold(false);
    nudge();
  }, [nudge]);

  const enabled = Boolean(interval) && !reduced;
  const running = enabled && !userPaused && !hold && visible && !pageHidden;

  useEffect(() => {
    if (!running || !interval) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = (delay: number) => {
      t = setTimeout(() => {
        if (!document.querySelector("dialog[open]")) tick.current();
        loop(interval);
      }, delay);
    };
    loop(resumeDelay.current ? RESUME_MS : interval);
    resumeDelay.current = false;
    return () => clearTimeout(t);
  }, [running, interval, kick]);

  const handlers = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHold(true);
    },
    onPointerLeave: (e: PointerEvent) => {
      if (e.pointerType === "mouse") release();
    },
    onTouchStart: () => setHold(true),
    onTouchEnd: release,
    onTouchCancel: release,
    onFocus: (e: FocusEvent) => {
      // Keyboard focus only: a mouse click leaves focus on the arrow button,
      // which must not freeze the carousel until the next click elsewhere.
      if ((e.target as HTMLElement).matches(":focus-visible")) setHold(true);
    },
    onBlur: (e: FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) release();
    },
  };

  return {
    /** Auto-advance is possible here (has an interval, motion allowed). */
    enabled,
    /** The viewer hasn't pressed pause. */
    playing: !userPaused,
    /** Actually moving right now. */
    running,
    toggle: () => {
      setUserPaused((p) => !p);
      resumeDelay.current = false;
    },
    nudge,
    handlers,
  };
}
