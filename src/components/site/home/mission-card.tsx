import type { CSSProperties } from "react";
import { Clock, Zap } from "lucide-react";
import { Icon3D } from "@/components/site/icon-3d";
import type { ChallengeFact } from "@/lib/site";
import { CHALLENGE_STYLE } from "./data";
import { TryIt } from "./try-it";

/** One card of the app's Challenges carousel (ChallengeCarousel.swift). */
export function MissionCard({ c, index, total }: { c: ChallengeFact; index: number; total: number }) {
  const st = CHALLENGE_STYLE[c.slug];
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <article className="rm-mission flex h-full flex-col p-5" style={{ "--top": st.top, "--deep": st.deep } as CSSProperties}>
      <div aria-hidden className="rm-mission-bg" />
      <span className="rm-mission-icon rm-px-x">
        <Icon3D name={c.icon3d} size={128} />
      </span>
      <p aria-hidden className="t-rounded relative flex items-baseline gap-1 text-white">
        <span className="text-[2.1rem] font-extrabold leading-none">{pad(index + 1)}</span>
        <span className="text-[0.8rem] font-bold opacity-80">/ {pad(total)}</span>
      </p>
      <div className="relative mt-auto pt-16">
        <h3 className="text-[1.85rem] font-extrabold leading-tight tracking-[-0.02em] [text-shadow:0_1px_8px_rgb(0_0_0/0.18)]">{c.name}</h3>
        <p className="mt-0.5 text-[0.95rem] font-semibold opacity-95">{c.tagline}</p>
        <p className="mt-3 flex flex-wrap gap-1.5">
          <span className="rm-meta">
            <Clock aria-hidden className="h-3 w-3" /> {st.time}
          </span>
          <span className="rm-meta">
            <Zap aria-hidden className="h-3 w-3" /> {st.effort}
          </span>
        </p>
        <div className="mt-3 flex">
          <TryIt slug={c.slug} name={c.name} color={st.ink} />
        </div>
      </div>
    </article>
  );
}
