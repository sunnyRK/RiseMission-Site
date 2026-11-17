"use client";

import { useEffect, useRef, useState } from "react";
import type { OptimisedVideo } from "@/lib/perf/video-sources";

/**
 * Click-to-play video whose poster is only requested when it nears the
 * viewport (a <video poster> is otherwise fetched at page load, competing
 * with the hero). The box keeps its aspect ratio, so nothing shifts.
 */
export function LazyVideo({ video, width, height, label, className = "" }: { video: OptimisedVideo; width: number; height: number; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} poster={near ? video.poster : undefined} controls muted playsInline preload="none" width={width} height={height} aria-label={label}>
      {video.sources.map((v) => (
        <source key={v.src} src={v.src} type={v.type} />
      ))}
    </video>
  );
}
