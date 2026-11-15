"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { track } from "@/components/analytics/analytics";
import { CHRONOTYPES, MAX_SCORE, QUESTIONS, answeredCount, emptyAnswers, lateness, quizScore, shareText, typeForScore } from "@/lib/chronotype";

export function ChronotypeQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(emptyAnswers);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const score = quizScore(answers);
  const type = score === null ? null : typeForScore(score);
  const done = answeredCount(answers);
  const info = type ? CHRONOTYPES[type] : null;
  const text = type && score !== null ? shareText(type, score) : "";

  // Fire "complete" once per visit, the first time a result appears.
  const tracked = useRef(false);
  useEffect(() => {
    if (!type || score === null || tracked.current) return;
    tracked.current = true;
    track("chronotype_quiz_complete", { result: type, score });
  }, [type, score]);

  const choose = (qi: number, oi: number) => setAnswers((prev) => prev.map((a, j) => (j === qi ? oi : a)));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
      if (type && score !== null) track("chronotype_quiz_copy", { result: type, score });
    } catch {
      setCopied("fail");
    }
    window.setTimeout(() => setCopied("idle"), 2500);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.9rem] font-semibold text-ink">
          {done} of {QUESTIONS.length} answered
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={() => setAnswers(emptyAnswers())}
            className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-muted hover:text-ink"
          >
            <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Start over
          </button>
        )}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-2" aria-hidden>
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${(done / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <ol className="mt-6 space-y-6">
        {QUESTIONS.map((q, qi) => (
          <li key={q.id}>
            <fieldset>
              <legend className="text-[1rem] font-semibold text-ink">
                <span className="mr-1.5 text-muted tabular-nums">{qi + 1}.</span>
                {q.q}
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const checked = answers[qi] === oi;
                  return (
                    <label
                      key={opt}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-[0.92rem] transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                        checked ? "border-accent bg-accent-soft text-ink" : "border-line bg-paper text-ink-2 hover:border-accent/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`chrono-${q.id}`}
                        value={oi}
                        checked={checked}
                        onChange={() => choose(qi, oi)}
                        className="h-4 w-4 shrink-0 accent-[var(--accent)]"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="mt-8">
        {info && type && score !== null ? (
          <div className="rounded-2xl border border-accent bg-accent p-5 text-accent-ink sm:p-6">
            <p className="text-[0.8rem] font-medium opacity-85">Your result (informal quiz)</p>
            <p className="mt-1 text-[2rem] font-semibold leading-tight tracking-tight">{info.name}</p>
            <p className="mt-2 opacity-90">{info.summary}</p>
            <div className="mt-4" aria-hidden>
              <div className="relative h-2 rounded-full bg-white/25">
                <div className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-accent-ink" style={{ left: `${lateness(score)}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[0.75rem] opacity-85">
                <span>Early</span>
                <span>Late</span>
              </div>
            </div>
            <p className="mt-3 text-[0.85rem] opacity-85">
              Score {score} of {MAX_SCORE} (higher = later). {info.wakeWindow}.
            </p>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line bg-paper p-4 text-center text-[0.9rem] text-muted">
            Answer all {QUESTIONS.length} questions to see your result.
          </p>
        )}
      </div>

      {info && type && (
        <>
          <div className="mt-5 rounded-2xl border border-line bg-paper p-4">
            <p className="font-semibold text-ink">Wake-time advice for a {info.name.toLowerCase()}</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.92rem] text-ink-2">
              {info.advice.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-paper p-4">
            <p className="text-[0.8rem] font-medium text-muted">Share it</p>
            <p className="mt-1 break-words text-ink">{text}</p>
            <button
              type="button"
              onClick={copy}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-[0.9rem] font-semibold text-ink hover:border-accent"
            >
              {copied === "ok" ? <Check aria-hidden className="h-4 w-4 text-good" /> : <Copy aria-hidden className="h-4 w-4" />}
              {copied === "ok" ? "Copied" : copied === "fail" ? "Copy failed, select the text instead" : "Copy text"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied === "ok" ? "Copied to clipboard" : ""}
            </span>
          </div>
        </>
      )}

      <p className="mt-5 text-center text-[0.8rem] text-muted">
        An informal, original quiz for curiosity and planning. It is not the Horne–Östberg MEQ or the Munich ChronoType
        Questionnaire, and it isn&apos;t a validated or clinical instrument.
      </p>
    </div>
  );
}
