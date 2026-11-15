"use client";

import { useEffect, useRef } from "react";
import { DEMO_VIDEO } from "@/lib/perf/video-sources";

/**
 * The 30-second product demo (1280×720), muted loop.
 *
 * Performance: the 7 KB WebP poster is the paint (preloaded, high priority, so
 * it can be the LCP on desktop). The video itself is NOT fetched during page
 * load (`preload="none"`, no `autoPlay`): playback starts after `load` + idle,
 * only while it's on screen, and pauses off screen. Sources go AV1 → HEVC →
 * the original H.264 (`/assets/demo.mp4`, still the sitemap/schema URL).
 * Reduced motion, Save-Data or a blocked autoplay (iOS Low Power Mode) leave
 * the poster up and show native controls instead.
 */
export function DemoVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const showControls = () => {
      video.controls = true;
    };
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showControls();
      return;
    }

    let io: IntersectionObserver | undefined;
    let cancelIdle: (() => void) | undefined;
    const start = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) video.play().catch(showControls);
          else video.pause();
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(video);
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(start, { timeout: 2000 });
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(start, 200);
        cancelIdle = () => clearTimeout(id);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      cancelIdle?.();
      io?.disconnect();
    };
  }, []);

  return (
    <>
      {/* React 19 hoists this into <head>. */}
      <link rel="preload" as="image" href={DEMO_VIDEO.poster} type="image/webp" fetchPriority="high" />
      <video
        ref={ref}
        className={`aspect-video w-full rounded-2xl bg-ink object-cover ${className}`}
        poster={DEMO_VIDEO.poster}
        muted
        loop
        playsInline
        preload="none"
        width={1280}
        height={720}
        aria-label="Rise Mission demo: the alarm rings, you complete a wake-up challenge, and you're awake"
      >
        {DEMO_VIDEO.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </>
  );
}
