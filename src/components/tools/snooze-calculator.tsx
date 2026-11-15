"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@/components/analytics/analytics";
import { NIGHT_HOURS, SNOOZE_LENGTHS, WEEKS_PER_YEAR, fmtNumber, shareLine, snoozeCost } from "@/lib/snooze";
import { ResultTile, Segmented } from "./tool-shell";

const LENGTH_OPTIONS = SNOOZE_LENGTHS.map((m) => [String(m), `${m} min`] as const);

function Slider({ id, label, value, min, max, onChange, suffix }: { id: string; label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.9rem] font-medium text-muted">
          {label}
        </label>
        <output htmlFor={id} className="text-[1.4rem] font-semibold tabular-nums text-ink">
          {value}
          <span className="ml-1 text-[0.85rem] font-medium text-muted">{suffix}</span>
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--accent)]"
      />
      <div className="flex justify-between text-[0.75rem] text-muted tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function SnoozeCalculator() {
  const [snoozes, setSnoozes] = useState(3);
  const [minutes, setMinutes] = useState("9");
  const [days, setDays] = useState(5);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  const input = { snoozes, minutes: Number(minutes), days };
  const cost = snoozeCost(input);
  const line = shareLine(input, cost);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(line);
      setCopied("ok");
      track("snooze_calc_copy", { snoozes, minutes: input.minutes, days, hours_year: Math.round(cost.perYearHours) });
    } catch {
      setCopied("fail");
    }
    window.setTimeout(() => setCopied("idle"), 2500);
  };

  // Fire "used" once per visit, after the first real interaction.
  const usedRef = useRef(false);
  const used = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    track("snooze_calc_used", { snoozes, minutes: input.minutes, days });
  };

  return (
    <div>
      <div className="grid gap-6" onPointerUp={used} onKeyUp={(e) => e.key.startsWith("Arrow") && used()}>
        <Slider id="snz-count" label="Snoozes per morning" value={snoozes} min={0} max={10} onChange={setSnoozes} suffix={snoozes === 1 ? "snooze" : "snoozes"} />
        <div>
          <p className="text-[0.9rem] font-medium text-muted">Minutes per snooze</p>
          <div className="mt-2">
            <Segmented label="Minutes per snooze" value={minutes} options={LENGTH_OPTIONS} onChange={setMinutes} />
          </div>
        </div>
        <Slider id="snz-days" label="Mornings per week" value={days} min={1} max={7} onChange={setDays} suffix={days === 1 ? "day" : "days"} />
      </div>

      <div aria-live="polite">
        <p className="mt-8 text-[0.9rem] font-semibold text-ink">Your snooze habit costs</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          <li>
            <ResultTile value={`${cost.perMorningMin} min`} label="Every snooze morning" note={`${fmtNumber(cost.perWeekMin / 60)} h a week`} />
          </li>
          <li>
            <ResultTile value={`${fmtNumber(cost.perYearHours)} h`} label="Every year" note={`Over ${WEEKS_PER_YEAR} weeks`} highlight />
          </li>
          <li>
            <ResultTile value={fmtNumber(cost.nights)} label="Full nights of sleep" note={`At ${NIGHT_HOURS} h a night`} />
          </li>
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
        <p className="text-[0.8rem] font-medium text-muted">Share it</p>
        <p className="mt-1 text-ink">{line}</p>
        <button type="button" onClick={copy} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-[0.9rem] font-semibold text-ink hover:border-accent">
          {copied === "ok" ? <Check aria-hidden className="h-4 w-4 text-good" /> : <Copy aria-hidden className="h-4 w-4" />}
          {copied === "ok" ? "Copied" : copied === "fail" ? "Copy failed, select the text instead" : "Copy text"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied === "ok" ? "Copied to clipboard" : ""}
        </span>
      </div>

      <p className="mt-5 text-center text-[0.8rem] text-muted">
        This is time between your first alarm and getting up, not all lost sleep: in one lab study people still slept through most of a 30-minute snooze. A year here is {WEEKS_PER_YEAR} weeks.
      </p>
    </div>
  );
}
