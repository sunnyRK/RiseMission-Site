"use client";

import { useEffect, useMemo, useState } from "react";
import { track } from "@/components/analytics/analytics";
import { CYCLE_MIN, FALL_ASLEEP_MIN, bedtimesFor, fmtTime, wakeTimesFor } from "@/lib/sleep";
import { ResultTile, Segmented } from "./tool-shell";

type Mode = "wake" | "bed";
const MODES = [
  ["wake", "I need to wake up at…"],
  ["bed", "I'm going to bed now"],
] as const;

export function SleepCalculator() {
  const [mode, setMode] = useState<Mode>("wake");
  const [time, setTime] = useState("06:30");
  const [nowMin, setNowMin] = useState<number | null>(null);

  const switchTo = (m: Mode) => {
    setMode(m);
    if (m === "bed") {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    }
    track("sleep_calc_mode", { mode: m });
  };

  // Deep link from the nav: /sleep-calculator#bed-now
  useEffect(() => {
    if (window.location.hash === "#bed-now") {
      const d = new Date();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL hash on mount
      setMode("bed");
      setNowMin(d.getHours() * 60 + d.getMinutes());
    }
  }, []);

  const results = useMemo(() => {
    if (mode === "wake") {
      const [h, m] = time.split(":").map(Number);
      return bedtimesFor(h * 60 + m);
    }
    return nowMin === null ? [] : wakeTimesFor(nowMin);
  }, [mode, time, nowMin]);

  return (
    <div>
      <Segmented label="Calculator mode" value={mode} options={MODES} onChange={switchTo} />

      <div className="mt-7 text-center">
        {mode === "wake" ? (
          <label className="block">
            <span className="text-[0.875rem] font-semibold text-ink-2">Wake-up time</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value || "06:30")}
              onBlur={() => track("sleep_calc_used", { mode: "wake", time })}
              className="rm-field mx-auto mt-2 block min-h-16 w-full max-w-xs rounded-2xl px-4 py-3 text-center text-[2.2rem] font-semibold tracking-tight tabular-nums"
            />
          </label>
        ) : (
          <p className="text-ink-2">
            Going to bed now{nowMin !== null ? <> at <strong className="text-ink">{fmtTime(nowMin)}</strong></> : ""}? Set your alarm for one of these:
          </p>
        )}
      </div>

      <p className="mt-8 text-[0.875rem] font-semibold text-ink" aria-live="polite">
        {mode === "wake" ? "Go to bed by" : "Set your alarm for"}
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {results.map((r) => (
          <li key={r.cycles}>
            <ResultTile
              value={fmtTime(r.at)}
              label={r.cycles === 5 ? "Recommended" : r.cycles === 4 ? "Minimum" : "Long night"}
              note={`${r.cycles} cycles · ${r.hours} h of sleep`}
              highlight={r.cycles === 5}
            />
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-lg text-center text-[0.8125rem] leading-relaxed text-muted">
        Assumes {FALL_ASLEEP_MIN} minutes to fall asleep and {CYCLE_MIN}-minute cycles. Real cycles vary between people and through the night.
      </p>
    </div>
  );
}
