"use client";

import { useId, useState, type CSSProperties } from "react";
import { Carousel } from "@/components/motion/carousel";
import { Icon3D } from "@/components/site/icon-3d";
import { RANKS, XP_RULES } from "@/lib/site";
import { weeksToRanks } from "./data";

/**
 * Rank ladder carousel + "how long to Legend?" estimator. Drag mornings per
 * week; every card re-computes its estimate with the app's real XP rules
 * (LevelEngine via site.ts). Server-rendered with the defaults, so the
 * ladder is in the HTML for crawlers.
 */
export function RankLadder() {
  const [perWeek, setPerWeek] = useState(5);
  const [onTime, setOnTime] = useState(true);
  const [routine, setRoutine] = useState(false);
  const weeks = weeksToRanks(perWeek, onTime, routine);
  const max = weeks[weeks.length - 1] || 1;
  const id = useId();

  return (
    <div>
      <div className="container-rm">
        <div className="rm-card mx-auto grid max-w-3xl gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
          <div>
            <label htmlFor={`${id}-pw`} className="flex items-baseline justify-between gap-3 font-bold text-ink">
              <span>Mission mornings per week</span>
              <span className="t-rounded text-[1.6rem] font-extrabold text-accent">{perWeek}</span>
            </label>
            <input
              id={`${id}-pw`}
              type="range"
              min={1}
              max={7}
              step={1}
              value={perWeek}
              onChange={(e) => setPerWeek(Number(e.target.value))}
              aria-valuetext={`${perWeek} mornings per week`}
              className="rm-range mt-3 w-full"
              style={{ "--v": `${((perWeek - 1) / 6) * 100}%`, "--rm-fill": `${((perWeek - 1) / 6) * 100}%` } as CSSProperties}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Toggle on={onTime} set={setOnTime} label={`On time, no snooze (+${XP_RULES.onTimeBonus})`} />
            <Toggle on={routine} set={setRoutine} label={`Morning routine (+${XP_RULES.routineBonus})`} />
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-3xl text-center text-[0.82rem] text-muted">
          An estimate: it assumes every one of those mornings is a completed mission and the streak never breaks. Days without
          an alarm don&apos;t break a streak in the app.
        </p>
      </div>

      <Carousel label="Rank ladder" cardWidth="min(74vw, 290px)" padTop="28px" autoplay={3200} perView={4} className="mt-2">
        {RANKS.map((r, i) => (
          <article key={r.name} className="rm-card group flex h-full flex-col p-5">
            <div className="flex items-start justify-between">
              <span className="rm-px-x">
                <Icon3D name={r.icon3d} size={84} className="icon3d-hover -mt-1" />
              </span>
              <span className="t-rounded rounded-full bg-accent-soft px-2.5 py-1 text-[0.78rem] font-extrabold text-accent-deep dark:text-accent">
                {r.xp.toLocaleString("en-US")} XP
              </span>
            </div>
            <p className="t-eyebrow mt-3">Level {r.level}</p>
            <h3 className="mt-1 text-[1.45rem] font-extrabold tracking-tight text-ink">{r.name}</h3>
            <p className="mt-auto pt-4 text-[0.92rem] font-semibold text-ink-2" aria-live="polite">
              {i === 0 ? "Where everyone starts" : (
                <>
                  About <span className="t-rounded font-extrabold text-ink">{weeks[i]}</span> {weeks[i] === 1 ? "week" : "weeks"}
                </>
              )}
            </p>
            <div className="rm-bar mt-2" aria-hidden>
              <span style={{ "--v": i === 0 ? 0.02 : weeks[i] / max, "--fill": "linear-gradient(90deg, var(--accent), #6F8BFF)" } as CSSProperties} />
            </div>
          </article>
        ))}
      </Carousel>
    </div>
  );
}

function Toggle({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => set(!on)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-[0.85rem] font-bold transition-colors duration-150 ${on ? "border-transparent bg-accent text-accent-ink" : "border-line bg-card text-ink-2 hover:border-ink/20"}`}
    >
      <span aria-hidden className={`grid h-4 w-4 place-items-center rounded-full border-2 ${on ? "border-accent-ink" : "border-muted"}`}>
        {on && <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" />}
      </span>
      {label}
    </button>
  );
}
