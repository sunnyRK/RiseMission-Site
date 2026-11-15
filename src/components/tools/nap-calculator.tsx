"use client";

import { useEffect, useMemo, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { track } from "@/components/analytics/analytics";
import { toHHMM, parseHHMM } from "@/lib/alarm-clock";
import { BUFFER_OPTIONS, DEEP_FROM_MIN, DEEP_TO_MIN, DEFAULT_BUFFER_MIN, NAP_ORDER, NAP_TYPES, allNapPlans, fmtDuration, type NapType } from "@/lib/nap";
import { fmtTime } from "@/lib/sleep";
import { ResultTile, Segmented } from "./tool-shell";

const TYPE_OPTIONS = NAP_ORDER.map((t) => [t, NAP_TYPES[t].name.replace(" nap", "")] as const);
const BUFFER_SEG = BUFFER_OPTIONS.map((b) => [String(b), `${b} min`] as const);

/** Timeline length in minutes after lying down. */
const SPAN = 120;

export function NapCalculator() {
  const [type, setType] = useState<NapType>("power");
  const [start, setStart] = useState("13:00");
  const [buffer, setBuffer] = useState(String(DEFAULT_BUFFER_MIN));

  const setNow = () => {
    const d = new Date();
    setStart(toHHMM(d.getHours() * 60 + d.getMinutes()));
  };

  // Default the start time to "now" once we're in the browser.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the local clock on mount
    setNow();
  }, []);

  const startMin = parseHHMM(start) ?? 780;
  const buf = Number(buffer);
  const plans = useMemo(() => allNapPlans(startMin, buf), [startMin, buf]);
  const chosen = plans.find((p) => p.type === type)!;

  const pct = (min: number) => `${Math.min(100, (min / SPAN) * 100)}%`;
  const alarmOffset = buf + chosen.sleepMin;

  return (
    <div>
      <Segmented
        label="Nap type"
        value={type}
        options={TYPE_OPTIONS}
        onChange={(t) => {
          setType(t);
          track("nap_calc_type", { type: t });
        }}
      />

      <p className="mt-3 text-center text-[0.85rem] text-muted">
        {NAP_TYPES[type].sleepMin} minutes of sleep · {NAP_TYPES[type].short}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:items-end">
        <label className="block text-center sm:text-left">
          <span className="text-[0.9rem] font-medium text-muted">I&apos;m lying down at</span>
          <span className="mt-2 flex gap-2">
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value || start)}
              onBlur={() => track("nap_calc_used", { type, buffer: buf })}
              className="block w-full min-w-0 rounded-2xl border border-line bg-paper px-4 py-3 text-center text-[2rem] font-semibold tracking-tight tabular-nums text-ink"
            />
            <button type="button" onClick={setNow} className="shrink-0 rounded-2xl border border-line bg-paper px-4 text-[0.9rem] font-semibold text-ink hover:border-accent">
              Now
            </button>
          </span>
        </label>
        <div>
          <p className="text-center text-[0.9rem] font-medium text-muted sm:text-left">Time to fall asleep</p>
          <div className="mt-2">
            <Segmented label="Time to fall asleep" value={buffer} options={BUFFER_SEG} onChange={setBuffer} />
          </div>
        </div>
      </div>

      <div aria-live="polite">
        <p className="mt-7 text-[0.9rem] font-semibold text-ink">Set your alarm for</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {plans.map((p) => (
            <li key={p.type}>
              <ResultTile
                value={fmtTime(p.wakeAt)}
                label={NAP_TYPES[p.type].name}
                note={`${p.sleepMin} min asleep · ${fmtDuration(p.totalMin)} in total`}
                highlight={p.type === type}
              />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-3 rounded-2xl border border-coral bg-coral/10 p-4 text-[0.92rem] text-ink">
          <TriangleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <p>
            <strong>Avoid waking between {fmtTime(chosen.avoidFrom)} and {fmtTime(chosen.avoidTo)}.</strong>{" "}
            {type === "full"
              ? "Your full-cycle nap passes through deep sleep in this window, so don't cut it short then."
              : type === "recovery"
                ? "A 30-minute nap already brushes the start of deep sleep, so expect a few groggy minutes, and don't snooze past it."
                : "That's roughly 30 to 60 minutes after you fall asleep, when deep sleep is most likely. Don't snooze into it."}
          </p>
        </div>
      </div>

      {/* Timeline: minutes after lying down */}
      <figure className="mt-6" aria-hidden>
        <div className="relative h-10 overflow-hidden rounded-xl bg-paper-2">
          <div className="absolute inset-y-0 left-0 bg-line/70" style={{ width: pct(buf) }} />
          <div className="absolute inset-y-0 bg-coral/30" style={{ left: pct(buf + DEEP_FROM_MIN), width: `${((DEEP_TO_MIN - DEEP_FROM_MIN) / SPAN) * 100}%` }} />
          <div className="absolute inset-y-0 w-1 -translate-x-1/2 rounded bg-accent" style={{ left: pct(alarmOffset) }} />
        </div>
        <div className="relative mt-2 h-4 text-[0.75rem] text-muted tabular-nums">
          {[0, 30, 60, 90, 120].map((m) => (
            <span
              key={m}
              className={`absolute top-0 whitespace-nowrap ${m === 0 ? "" : m === SPAN ? "-translate-x-full" : "-translate-x-1/2"}`}
              style={{ left: pct(m) }}
            >
              {m === SPAN ? `${m} min` : m}
            </span>
          ))}
        </div>
        <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-line" /> Falling asleep</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-coral/50" /> Likely deep sleep</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-1 rounded-sm bg-accent" /> Your alarm</span>
        </figcaption>
      </figure>

      <p className="mt-5 text-center text-[0.8rem] text-muted">
        Assumes {buf} minutes to fall asleep. The deep-sleep window is an estimate; it shifts with how tired you are and the time of day.
      </p>
    </div>
  );
}
