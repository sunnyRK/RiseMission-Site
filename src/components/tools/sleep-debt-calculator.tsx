"use client";

import { useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { track } from "@/components/analytics/analytics";
import {
  DEFAULT_NEED,
  DEFAULT_NIGHTS,
  NEED_MAX,
  NEED_MIN,
  NEED_STEP,
  NIGHT_LABELS,
  NIGHT_SHORT,
  SLEPT_MAX,
  SLEPT_MIN,
  SLEPT_STEP,
  clampHours,
  fmtHours,
  sleepDebt,
} from "@/lib/sleep-debt";
import { ResultTile } from "./tool-shell";

/** Top of the bar chart, in hours. */
const CHART_MAX = 12;

function NightInput({ index, value, onChange }: { index: number; value: number; onChange: (v: number) => void }) {
  const id = `sd-night-${index}`;
  const label = NIGHT_LABELS[index];
  const step = (d: number) => onChange(clampHours(value + d, SLEPT_MIN, SLEPT_MAX));
  const btn =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-card text-ink transition hover:border-accent disabled:opacity-40 disabled:hover:border-line";
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper px-3 py-2">
      <label htmlFor={id} className="min-w-0 text-[0.9rem] font-medium text-ink-2">
        {label}
      </label>
      <div className="flex items-center gap-1.5">
        <button type="button" className={btn} onClick={() => step(-SLEPT_STEP)} disabled={value <= SLEPT_MIN} aria-label={`${label}: 15 minutes less`}>
          <Minus aria-hidden className="h-4 w-4" />
        </button>
        <div className="relative">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={SLEPT_MIN}
            max={SLEPT_MAX}
            step={SLEPT_STEP}
            value={value}
            onChange={(e) => {
              const v = e.target.valueAsNumber;
              if (Number.isFinite(v)) onChange(Math.min(SLEPT_MAX, Math.max(SLEPT_MIN, v)));
            }}
            onBlur={() => onChange(clampHours(value, SLEPT_MIN, SLEPT_MAX))}
            aria-describedby="sd-hours-hint"
            className="block h-11 w-[4.75rem] rounded-xl border border-line bg-card pr-6 text-center text-[1.1rem] font-semibold tabular-nums text-ink"
          />
          <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[0.8rem] text-muted">
            h
          </span>
        </div>
        <button type="button" className={btn} onClick={() => step(SLEPT_STEP)} disabled={value >= SLEPT_MAX} aria-label={`${label}: 15 minutes more`}>
          <Plus aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function SleepDebtCalculator() {
  const [need, setNeed] = useState(DEFAULT_NEED);
  const [nights, setNights] = useState<number[]>([...DEFAULT_NIGHTS]);
  const d = sleepDebt(need, nights);

  // Fire "used" once per visit, after the first real interaction.
  const usedRef = useRef(false);
  const used = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    track("sleep_debt_used", { need });
  };

  const setNight = (i: number, v: number) => {
    used();
    setNights((prev) => prev.map((n, j) => (j === i ? v : n)));
  };

  const reset = () => {
    setNeed(DEFAULT_NEED);
    setNights([...DEFAULT_NIGHTS]);
  };

  const pct = (h: number) => `${Math.min(100, (h / CHART_MAX) * 100)}%`;

  return (
    <div>
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="sd-need" className="text-[0.9rem] font-medium text-muted">
            Sleep I need a night
          </label>
          <output htmlFor="sd-need" className="text-[1.4rem] font-semibold tabular-nums text-ink">
            {fmtHours(need)}
          </output>
        </div>
        <input
          id="sd-need"
          type="range"
          min={NEED_MIN}
          max={NEED_MAX}
          step={NEED_STEP}
          value={need}
          aria-valuetext={fmtHours(need)}
          onChange={(e) => {
            used();
            setNeed(Number(e.target.value));
          }}
          className="mt-2 w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-[0.75rem] text-muted tabular-nums">
          <span>{NEED_MIN} h</span>
          <span>{NEED_MAX} h</span>
        </div>
        <p className="mt-1 text-[0.8rem] text-muted">Not sure? Adults need at least 7 hours a night; 8 h is the starting value here.</p>
      </div>

      <fieldset className="mt-6">
        <legend className="text-[0.9rem] font-semibold text-ink">Hours actually asleep</legend>
        <p id="sd-hours-hint" className="mt-1 text-[0.8rem] text-muted">
          Type hours (7.5 = 7 h 30 min) or use − / + for 15-minute steps.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {nights.map((n, i) => (
            <NightInput key={NIGHT_LABELS[i]} index={i} value={n} onChange={(v) => setNight(i, v)} />
          ))}
        </div>
        <button type="button" onClick={reset} className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-muted hover:text-ink">
          <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset to example week
        </button>
      </fieldset>

      <div aria-live="polite">
        <p className="mt-8 text-[0.9rem] font-semibold text-ink">Your last 7 nights</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          <li>
            <ResultTile
              value={fmtHours(d.debtHours)}
              label="Sleep debt this week"
              note={d.surplusHours > 0 ? `Lie-ins added ${fmtHours(d.surplusHours)} back, but don't fully cancel it` : `${d.shortNights} of 7 nights short`}
              highlight
            />
          </li>
          <li>
            <ResultTile value={fmtHours(d.avgSlept)} label="Average a night" note={`Your need: ${fmtHours(d.need)}`} />
          </li>
          <li>
            <ResultTile value={d.debtHours ? fmtHours(d.avgShortfall) : "0 min"} label="Short per night, on average" note={`${d.shortNights} short ${d.shortNights === 1 ? "night" : "nights"}`} />
          </li>
        </ul>

        <div className="mt-5 rounded-2xl border border-line bg-paper p-4 text-[0.92rem] text-ink">
          {d.level === "none" ? (
            <p>
              <strong>You&apos;re close to your need.</strong> Keep the same wake time every day and you&apos;re doing the
              part that matters most.
            </p>
          ) : (
            <>
              <p>
                <strong>
                  Gentle catch-up: go to bed about {d.extraMinPerNight} minutes earlier for the next {d.recoveryNights}{" "}
                  {d.recoveryNights === 1 ? "night" : "nights"}.
                </strong>{" "}
                Keep your alarm at the same time, so the extra sleep comes from an earlier bedtime, not a later wake-up.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
                <li>Skip the single giant lie-in: it shifts your body clock later and makes Monday harder.</li>
                {d.hasBigLieIn && <li>You had at least one night 2+ hours over your need, a sign your weekdays are running short.</li>}
                {d.swingHours >= 2 && <li>Your nights vary by {fmtHours(d.swingHours)}. A steadier schedule usually helps more than a bigger total.</li>}
                {d.avgSlept < 7 && <li>Your average is under 7 hours, the minimum sleep experts recommend for adults.</li>}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* 7-night bar chart: HTML/CSS bars, need shown as a dashed line. */}
      <figure className="mt-6">
        <div className="relative h-44 rounded-xl bg-paper-2 px-2 pt-2 sm:px-4" aria-hidden>
          <div className="absolute inset-x-2 border-t-2 border-dashed border-ink/40 sm:inset-x-4" style={{ bottom: pct(d.need) }}>
            <span className="absolute -top-5 right-0 rounded bg-paper-2 px-1 text-[0.7rem] font-semibold text-ink-2">Need {fmtHours(d.need)}</span>
          </div>
          <div className="flex h-full items-end gap-1.5 sm:gap-3">
            {d.nights.map((n, i) => (
              <div key={NIGHT_LABELS[i]} className="flex h-full flex-1 flex-col justify-end">
                <div
                  className={`w-full rounded-t-md transition-[height] duration-300 motion-reduce:transition-none ${n < d.need ? "bg-coral/70" : "bg-accent"}`}
                  style={{ height: pct(n) }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-1.5 flex gap-1.5 px-2 text-center text-[0.72rem] text-muted tabular-nums sm:gap-3 sm:px-4" aria-hidden>
          {d.nights.map((n, i) => (
            <span key={NIGHT_LABELS[i]} className="flex-1">
              <span className="block font-semibold text-ink-2">{n}</span>
              {NIGHT_SHORT[i]}
            </span>
          ))}
        </div>
        <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-muted">
          <span className="inline-flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-coral/70" /> Under your need</span>
          <span className="inline-flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-accent" /> Met your need</span>
          <span className="sr-only">
            Hours slept, oldest night first: {d.nights.map((n, i) => `${NIGHT_LABELS[i]} ${fmtHours(n)}`).join(", ")}.
          </span>
        </figcaption>
      </figure>

      <p className="mt-5 text-center text-[0.8rem] text-muted">
        Debt counts only the hours under your need; extra sleep on other nights isn&apos;t subtracted, because research
        suggests lie-ins don&apos;t fully undo short nights. The catch-up plan is a rule of thumb, not a prescription.
      </p>
    </div>
  );
}
