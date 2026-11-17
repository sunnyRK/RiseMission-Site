"use client";

import { useEffect, useRef } from "react";

/**
 * Number that counts up once when it scrolls into view (~0.3 KB).
 * Server HTML holds the real value (crawlers, no-JS, reduced motion). Only
 * numbers still below the fold are reset to 0 and animated; the box is sized
 * to the final value in `ch` with tabular figures, so nothing shifts (CLS 0).
 */
export function CountUp({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    const fmt = (v: number) => `${prefix}${v}${suffix}`;
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const D = 1100;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / D);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix, suffix]);
  const chars = `${prefix}${value}${suffix}`.length;
  return (
    <span ref={ref} className={`rm-stat-num inline-block ${className}`} style={{ minWidth: `${chars}ch` }}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
