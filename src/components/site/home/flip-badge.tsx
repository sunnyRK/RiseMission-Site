"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { Icon3D, type Icon3DName } from "@/components/site/icon-3d";

/** Achievement card that flips (hover on desktop, tap anywhere) to show how to earn it. */
export function FlipBadge({ name, how, icon, isNew }: { name: string; how: string; icon: Icon3DName; isNew: boolean }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={`${name}. How to earn it: ${how}`}
      onClick={() => setFlipped((f) => !f)}
      data-flipped={flipped}
      className="rm-flip group block h-[230px] w-full text-left"
    >
      <span className="rm-flip-inner block">
        <span className="rm-flip-face rm-card flex flex-col items-center justify-center p-5 text-center">
          {isNew && <span className="absolute right-3 top-3 rounded-full bg-sun-soft px-2 py-0.5 text-[0.68rem] font-extrabold uppercase tracking-wide text-[#8a5300] dark:text-sun">New</span>}
          <Icon3D name={icon} size={96} className="icon3d-hover" />
          <span className="mt-3 text-[1.1rem] font-extrabold tracking-tight text-ink">{name}</span>
          <span className="mt-1 inline-flex items-center gap-1 text-[0.75rem] font-bold text-muted">
            <RotateCw aria-hidden className="h-3 w-3" /> How to earn
          </span>
        </span>
        <span className="rm-flip-face rm-flip-back rm-grad flex flex-col justify-between p-5" style={{ ["--top" as string]: "#4A72FF", ["--deep" as string]: "#1E3FD9" }}>
          <Icon3D name={icon} size={48} />
          <span>
            <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-white/80">How to earn</span>
            <span className="mt-1 block text-[1.15rem] font-extrabold leading-snug">{how}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
