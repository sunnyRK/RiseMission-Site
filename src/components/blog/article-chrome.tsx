"use client";

import { useEffect, useState } from "react";

/**
 * Reading-progress hairline pinned to the top of the viewport. Tracks the
 * element matching `target`. Scroll-linked only (no autonomous animation), and
 * painted with a transform so it never causes layout shift.
 */
export function ReadingProgress({ target }: { target: string }) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    const bar = document.getElementById("rm-progress");
    if (!el || !bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.style.setProperty("--rm-progress", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target]);
  return <div id="rm-progress" className="rm-progress" aria-hidden />;
}

type TocItem = { id: string; text: string };

/**
 * "On this page" list. Server-rendered links work without JS; with JS the
 * section currently being read is highlighted (aria-current).
 */
export function TocList({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const heads = items.map((t) => document.getElementById(t.id)).filter((h): h is HTMLElement => !!h);
    if (!heads.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<string>();
    const pick = () => {
      // Topmost heading in the reading band wins; otherwise the last one we passed.
      const inBand = heads.find((h) => visible.has(h.id));
      if (inBand) return setActive(inBand.id);
      const passed = heads.filter((h) => h.getBoundingClientRect().top < 120);
      setActive(passed.length ? passed[passed.length - 1].id : null);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        pick();
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <ol className="rm-toc mt-3 border-l border-line text-[0.875rem]">
      {items.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined}>
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
