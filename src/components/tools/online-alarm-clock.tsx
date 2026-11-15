"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AlarmClock, Bell, BellRing, Check, Monitor, Play, X } from "lucide-react";
import { track } from "@/components/analytics/analytics";
import {
  PROBLEMS_TO_STOP,
  STORAGE_KEY,
  describeCountdown,
  fmtClock,
  fmtCountdown,
  isCorrect,
  isTomorrow,
  makeProblem,
  nextOccurrence,
  parseStoredAlarm,
  toHHMM,
  type Difficulty,
  type Problem,
  type SoundId,
  type StoredAlarm,
} from "@/lib/alarm-clock";
import { AlarmSound, SOUNDS } from "./alarm-sound";
import { Segmented } from "./tool-shell";

type Phase = "idle" | "armed" | "ringing" | "done";
type NotifyState = "unsupported" | "default" | "granted" | "denied";

const PRESETS = [
  { key: "in5", label: "In 5 min", inMin: 5 },
  { key: "in10", label: "In 10 min", inMin: 10 },
  { key: "in20", label: "In 20 min", inMin: 20 },
  { key: "600", label: "6:00", at: "06:00" },
  { key: "630", label: "6:30", at: "06:30" },
  { key: "700", label: "7:00", at: "07:00" },
] as const;

const SOUND_OPTIONS = (Object.keys(SOUNDS) as SoundId[]).map((id) => [id, SOUNDS[id].name] as const);
const DIFFICULTY_OPTIONS = [
  ["easy", "Easy"],
  ["medium", "Medium"],
] as const;

function save(a: StoredAlarm | null) {
  try {
    if (a) localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode / storage blocked: the alarm still works for this tab */
  }
}

function Switch({ checked, onChange, label, id }: { checked: boolean; onChange: (v: boolean) => void; label: string; id: string }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition before:absolute before:-inset-2.5 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${checked ? "bg-accent" : "bg-line"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-card shadow-soft transition ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export function OnlineAlarmClock() {
  // Settings
  const [time, setTime] = useState("07:00");
  const [preset, setPreset] = useState<{ key: string; target: number } | null>(null);
  const [label, setLabel] = useState("");
  const [sound, setSound] = useState<SoundId>("chime");
  const [challenge, setChallenge] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [wantWakeLock, setWantWakeLock] = useState(false);

  // Runtime
  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState(0);
  const [now, setNow] = useState(0);
  const [audioOk, setAudioOk] = useState<boolean | null>(null);
  const [needsUnlock, setNeedsUnlock] = useState(false);
  const [missed, setMissed] = useState<number | null>(null);
  const [notify, setNotify] = useState<NotifyState>("unsupported");
  const [wakeLockSupported, setWakeLockSupported] = useState(false);
  const [wakeLockOn, setWakeLockOn] = useState(false);
  const [ringAt, setRingAt] = useState(0);
  const [stoppedAt, setStoppedAt] = useState(0);

  // Challenge
  const [problem, setProblem] = useState<Problem | null>(null);
  const [solved, setSolved] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const soundRef = useRef<AlarmSound | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const notificationRef = useRef<Notification | null>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const stopRef = useRef<HTMLButtonElement>(null);

  const getSound = useCallback(() => (soundRef.current ??= new AlarmSound()), []);

  // ---- Mount: capabilities + restore a saved alarm ----
  useEffect(() => {
    const t = Date.now();
    let stored: StoredAlarm | null = null;
    try {
      stored = parseStoredAlarm(localStorage.getItem(STORAGE_KEY));
    } catch {
      stored = null;
    }
    /* eslint-disable react-hooks/set-state-in-effect -- one-time read of browser-only state on mount */
    setNow(t);
    setNotify(typeof Notification === "undefined" ? "unsupported" : (Notification.permission as NotifyState));
    setWakeLockSupported("wakeLock" in navigator);
    if (stored && stored.target > t) {
      setLabel(stored.label);
      setSound(stored.sound);
      setChallenge(stored.challenge);
      setDifficulty(stored.difficulty);
      setTime(toHHMM(new Date(stored.target).getHours() * 60 + new Date(stored.target).getMinutes()));
      setTarget(stored.target);
      setPhase("armed");
      setNeedsUnlock(true);
    } else if (stored) {
      if (t - stored.target < 12 * 3600_000) setMissed(stored.target);
      save(null);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // ---- Wake lock ----
  const acquireWakeLock = useCallback(async () => {
    if (!("wakeLock" in navigator) || wakeLockRef.current) return;
    try {
      const lock = await navigator.wakeLock.request("screen");
      wakeLockRef.current = lock;
      setWakeLockOn(true);
      lock.addEventListener("release", () => {
        wakeLockRef.current = null;
        setWakeLockOn(false);
      });
    } catch {
      setWakeLockOn(false);
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    wakeLockRef.current?.release().catch(() => {});
    wakeLockRef.current = null;
    setWakeLockOn(false);
  }, []);

  // ---- Ringing ----
  const startRinging = useCallback(() => {
    const s = soundRef.current;
    // If the audio clock already started on time, keep it; otherwise (computer
    // was asleep, context suspended) start the loop right now.
    if (s && !s.audible) s.schedule(sound, Date.now());
    setRingAt(Date.now());
    setPhase("ringing");
    setSolved(0);
    setAnswer("");
    setFeedback("");
    setProblem(challenge ? makeProblem(difficulty) : null);
    save(null);
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        const n = new Notification(label || "Alarm", {
          body: challenge ? "Solve 3 quick problems to stop it." : "Your alarm is ringing.",
          tag: "rm-online-alarm",
          requireInteraction: true,
        });
        n.onclick = () => window.focus();
        notificationRef.current = n;
      } catch {
        /* some browsers only allow notifications from a service worker */
      }
    }
  }, [sound, challenge, difficulty, label]);

  // Tick: compare against Date.now() every second (survives timer throttling
  // and sleep because it never relies on one long setTimeout).
  useEffect(() => {
    if (phase !== "armed" && phase !== "ringing") return;
    const check = () => {
      const t = Date.now();
      setNow(t);
      if (phase === "armed" && t >= target) startRinging();
      if (phase === "ringing") soundRef.current?.ensure();
    };
    check();
    const id = window.setInterval(check, 1000);
    const onVisible = () => {
      check();
      if (document.visibilityState === "visible" && wantWakeLock) acquireWakeLock();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, [phase, target, startRinging, wantWakeLock, acquireWakeLock]);

  // Flash the tab title while ringing.
  useEffect(() => {
    if (phase !== "ringing") return;
    const original = document.title;
    const alt = `Alarm! ${label || fmtClock(target)}`;
    let on = true;
    document.title = alt;
    const id = window.setInterval(() => {
      on = !on;
      document.title = on ? alt : "Wake up!";
    }, 900);
    return () => {
      window.clearInterval(id);
      document.title = original;
    };
  }, [phase, label, target]);

  // Focus the answer field (or Stop) when the alarm starts ringing.
  useEffect(() => {
    if (phase !== "ringing") return;
    (answerRef.current ?? stopRef.current)?.focus();
  }, [phase, problem]);

  // A restored alarm needs one user gesture before audio can play.
  const enableSound = useCallback(async () => {
    const s = getSound();
    const ok = await s.unlock();
    setAudioOk(ok);
    if (ok) {
      s.schedule(sound, target);
      setNeedsUnlock(false);
    }
  }, [getSound, sound, target]);

  useEffect(() => {
    if (!needsUnlock) return;
    const onDown = () => void enableSound();
    document.addEventListener("pointerdown", onDown, { once: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, [needsUnlock, enableSound]);

  // Clean up audio + wake lock if the component unmounts.
  useEffect(
    () => () => {
      soundRef.current?.stop();
      wakeLockRef.current?.release().catch(() => {});
    },
    [],
  );

  // ---- Actions ----
  const choosePreset = (p: (typeof PRESETS)[number]) => {
    if ("inMin" in p) {
      // eslint-disable-next-line react-hooks/purity -- click handler, not render
      const t = Date.now() + p.inMin * 60_000;
      const d = new Date(t);
      setTime(toHHMM(d.getHours() * 60 + d.getMinutes()));
      setPreset({ key: p.key, target: t });
    } else {
      setTime(p.at);
      setPreset({ key: p.key, target: 0 });
    }
  };

  const testSound = async () => {
    const ok = await getSound().unlock();
    setAudioOk(ok);
    if (ok) getSound().preview(sound);
  };

  const arm = async (e: FormEvent) => {
    e.preventDefault();
    const t0 = new Date();
    const t = preset?.target || nextOccurrence(time, t0);
    if (!t) return;
    // AudioContext must be created/resumed inside this click (autoplay rules).
    const s = getSound();
    const ok = await s.unlock();
    setAudioOk(ok);
    if (ok) s.schedule(sound, t);
    setTarget(t);
    setNow(Date.now());
    setPhase("armed");
    setMissed(null);
    setNeedsUnlock(false);
    save({ target: t, label: label.trim(), sound, challenge, difficulty });
    if (wantWakeLock) acquireWakeLock();
    track("online_alarm_set", { source: preset?.target ? "countdown" : preset ? "preset" : "custom", challenge: challenge ? difficulty : "off", sound });
  };

  const finish = (how: "challenge" | "stop" | "cancel") => {
    soundRef.current?.stop();
    notificationRef.current?.close();
    notificationRef.current = null;
    releaseWakeLock();
    save(null);
    if (how === "cancel") {
      setPhase("idle");
      return;
    }
    setStoppedAt(Date.now());
    setPhase("done");
    track("online_alarm_stopped", { method: how, seconds_to_stop: Math.round((Date.now() - ringAt) / 1000) });
  };

  const submitAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (!problem) return;
    if (isCorrect(problem, answer)) {
      const n = solved + 1;
      setSolved(n);
      setAnswer("");
      if (n >= PROBLEMS_TO_STOP) {
        finish("challenge");
        return;
      }
      setFeedback(`Correct. ${PROBLEMS_TO_STOP - n} to go.`);
      setProblem(makeProblem(difficulty));
    } else {
      setAnswer("");
      setFeedback(`Not quite (${problem.text} = ${problem.answer}). Try this one.`);
      setProblem(makeProblem(difficulty));
    }
  };

  const askNotify = async () => {
    if (typeof Notification === "undefined") return;
    try {
      const p = await Notification.requestPermission();
      setNotify(p as NotifyState);
    } catch {
      /* ignore */
    }
  };

  const toggleWakeLock = (v: boolean) => {
    setWantWakeLock(v);
    if (v && phase === "armed") acquireWakeLock();
    if (!v) releaseWakeLock();
  };

  // ---- Render ----
  const remaining = target - now;
  const ringsLabel = target ? `${fmtClock(target)}${now && isTomorrow(target, new Date(now)) ? " tomorrow" : ""}` : "";

  const extras = (
    <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-4">
        <span className="flex min-w-0 items-center gap-3">
          <Bell aria-hidden className="h-5 w-5 shrink-0 text-accent" />
          <span className="min-w-0">
            <span className="block text-[0.92rem] font-semibold text-ink">Desktop notification</span>
            <span className="block text-[0.8rem] text-muted">
              {notify === "granted" ? "On: you'll get one when it rings" : notify === "denied" ? "Blocked in browser settings" : notify === "unsupported" ? "Not available in this browser" : "Optional, asks permission"}
            </span>
          </span>
        </span>
        {notify === "default" && (
          <button type="button" onClick={askNotify} className="rm-btn shrink-0 rounded-xl border border-line bg-card px-3 py-2 text-[0.85rem] font-semibold text-ink hover:border-accent">
            Turn on
          </button>
        )}
        {notify === "granted" && <Check aria-label="Notifications on" className="h-5 w-5 shrink-0 text-good" />}
      </div>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-4">
        <label htmlFor="rm-wakelock" className="flex min-w-0 items-center gap-3">
          <Monitor aria-hidden className="h-5 w-5 shrink-0 text-accent" />
          <span className="min-w-0">
            <span className="block text-[0.92rem] font-semibold text-ink">Keep screen awake</span>
            <span className="block text-[0.8rem] text-muted">
              {!wakeLockSupported ? "Not available in this browser" : wakeLockOn ? "On while this tab is visible" : "Stops the screen sleeping"}
            </span>
          </span>
        </label>
        {wakeLockSupported && <Switch id="rm-wakelock" checked={wantWakeLock} onChange={toggleWakeLock} label="Keep screen awake" />}
      </div>
    </div>
  );

  if (phase === "ringing") {
    return (
      <div role="alertdialog" aria-labelledby="rm-ring-title" aria-describedby="rm-ring-desc" className="-m-5 rounded-[23px] bg-ink px-5 py-8 text-center text-paper sm:-m-8 sm:px-8 sm:py-10">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span aria-hidden className="absolute inset-0 rounded-full bg-coral/40 motion-safe:animate-ping" />
          <span aria-hidden className="absolute inset-2 rounded-full bg-coral/30 motion-safe:animate-pulse" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-coral text-ink">
            <BellRing aria-hidden className="h-8 w-8 motion-safe:animate-bounce" />
          </span>
        </div>
        <p id="rm-ring-title" className="mt-5 text-[3rem] font-semibold leading-none tracking-tight tabular-nums">
          {fmtClock(ringAt || target)}
        </p>
        <p className="mt-2 text-paper/75">{label || "Your alarm is ringing"}</p>
        {needsUnlock ? (
          <button type="button" onClick={() => void enableSound()} className="mt-3 rounded-xl bg-sun px-4 py-2 text-[0.9rem] font-semibold text-ink">
            Tap to turn on the sound
          </button>
        ) : (
          audioOk === false && <p className="mt-2 text-[0.85rem] text-sun">Sound couldn&apos;t start in this browser. Your alarm is silent.</p>
        )}

        {problem ? (
          <form onSubmit={submitAnswer} className="mx-auto mt-8 max-w-sm">
            <p id="rm-ring-desc" className="text-[0.9rem] text-paper/75">
              Solve {PROBLEMS_TO_STOP} to stop the alarm
            </p>
            <div className="mt-3 flex justify-center gap-2" aria-hidden>
              {Array.from({ length: PROBLEMS_TO_STOP }, (_, i) => (
                <span key={i} className={`h-2.5 w-10 rounded-full ${i < solved ? "bg-good" : "bg-paper/20"}`} />
              ))}
            </div>
            <label htmlFor="rm-answer" className="mt-6 block text-[2.4rem] font-semibold tabular-nums">
              {problem.text} = ?
            </label>
            <div className="mt-4 flex gap-2">
              <input
                ref={answerRef}
                id="rm-answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                inputMode="numeric"
                autoComplete="off"
                enterKeyHint="done"
                aria-describedby="rm-feedback"
                className="min-w-0 flex-1 rounded-2xl border border-paper/25 bg-paper/10 px-4 py-3 text-center text-[1.6rem] font-semibold tabular-nums text-paper placeholder:text-paper/40"
                placeholder="Answer"
              />
              <button type="submit" className="rounded-2xl bg-paper px-5 text-[1rem] font-semibold text-ink">
                Check
              </button>
            </div>
            <p id="rm-feedback" aria-live="assertive" className="mt-3 min-h-[1.5em] text-[0.9rem] text-paper/80">
              {feedback || `${solved} of ${PROBLEMS_TO_STOP} solved`}
            </p>
          </form>
        ) : (
          <div className="mt-8">
            <p id="rm-ring-desc" className="sr-only">
              Press Stop to turn the alarm off.
            </p>
            <button ref={stopRef} type="button" onClick={() => finish("stop")} className="w-full max-w-xs rounded-2xl bg-paper px-6 py-4 text-[1.1rem] font-semibold text-ink">
              Stop alarm
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="py-4 text-center" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-good">
          <Check aria-hidden className="h-7 w-7" />
        </span>
        <p className="t-h3 mt-4">You&apos;re up.</p>
        <p className="mt-2 text-ink-2">
          Alarm stopped at <strong className="text-ink">{fmtClock(stoppedAt, true)}</strong>
          {ringAt ? <>, {Math.max(1, Math.round((stoppedAt - ringAt) / 1000))} seconds after it started ringing.</> : "."}
        </p>
        <button type="button" onClick={() => setPhase("idle")} className="mt-6 rounded-2xl bg-accent px-6 py-3 font-semibold text-accent-ink">
          Set another alarm
        </button>
      </div>
    );
  }

  if (phase === "armed") {
    return (
      <div className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[0.85rem] font-semibold text-accent">
          <AlarmClock aria-hidden className="h-4 w-4" /> Alarm set
        </p>
        <p className="mt-4 text-[0.95rem] text-muted" aria-live="polite">
          Rings at <strong className="text-ink">{ringsLabel}</strong>
          {label ? <> · {label}</> : null}
        </p>
        <p className="mt-2 text-[3.4rem] font-semibold leading-none tracking-tight tabular-nums text-ink sm:text-[4.2rem]" aria-hidden>
          {now ? fmtCountdown(remaining) : "--:--"}
        </p>
        <p className="sr-only">Rings in about {describeCountdown(remaining)}.</p>
        <p className="mt-3 text-[0.85rem] text-muted">
          {challenge ? `Math challenge on (${difficulty}): solve ${PROBLEMS_TO_STOP} to stop` : "Plain stop button"} · {SOUNDS[sound].name}
        </p>

        {needsUnlock && (
          <div className="mt-5 rounded-2xl border border-sun bg-sun-soft p-4 text-left text-[0.9rem] text-ink" role="status">
            <strong>Restored your alarm.</strong> Browsers only play sound after you interact with the page, so tap anywhere once, or{" "}
            <button type="button" className="font-semibold text-accent underline" onClick={() => void enableSound()}>
              enable the alarm sound
            </button>
            .
          </div>
        )}
        {audioOk === false && !needsUnlock && (
          <p className="mt-5 rounded-2xl border border-sun bg-sun-soft p-4 text-left text-[0.9rem] text-ink" role="status">
            Sound couldn&apos;t start in this browser. The alarm will still take over this card and flash the tab title.
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => finish("cancel")} className="rm-btn inline-flex items-center gap-2 rounded-2xl border border-line bg-card px-5 py-3 font-semibold text-ink hover:border-coral">
            <X aria-hidden className="h-4 w-4" /> Cancel alarm
          </button>
        </div>
        {extras}
      </div>
    );
  }

  // idle
  return (
    <form onSubmit={arm}>
      {missed && (
        <p className="mb-5 rounded-2xl border border-sun bg-sun-soft p-4 text-[0.9rem] text-ink" role="status">
          Your alarm for <strong>{fmtClock(missed)}</strong> passed while this page was closed, so it couldn&apos;t ring.
        </p>
      )}
      <label className="block text-center">
        <span className="text-[0.875rem] font-semibold text-ink-2">Alarm time</span>
        <input
          type="time"
          required
          value={time}
          onChange={(e) => {
            setTime(e.target.value || "07:00");
            setPreset(null);
          }}
          className="rm-field mx-auto mt-2 block min-h-16 w-full max-w-xs rounded-2xl px-4 py-3 text-center text-[2.2rem] font-semibold tracking-tight tabular-nums"
        />
      </label>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6" role="group" aria-label="Quick presets">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-pressed={preset?.key === p.key}
            onClick={() => choosePreset(p)}
            className={`rm-btn rounded-xl border px-2 py-2 text-[0.88rem] font-semibold ${preset?.key === p.key ? "border-accent bg-accent-soft text-accent" : "border-line bg-paper text-ink-2 hover:text-ink"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <label className="mt-6 block">
        <span className="text-[0.875rem] font-semibold text-ink-2">Label <span className="font-normal text-muted">(optional)</span></span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          maxLength={60}
          placeholder="e.g. Leave for the train"
          className="rm-field mt-2 block min-h-12 w-full rounded-2xl px-4 py-3 placeholder:text-muted"
        />
      </label>

      <div className="mt-6">
        <p className="text-[0.875rem] font-semibold text-ink-2" id="rm-sound-label">
          Sound
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <div className="min-w-0 flex-1">
            <Segmented label="Alarm sound" value={sound} options={SOUND_OPTIONS} onChange={setSound} />
          </div>
          <button type="button" onClick={testSound} className="rm-btn inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-paper px-4 py-2.5 text-[0.9rem] font-semibold text-ink hover:border-accent">
            <Play aria-hidden className="h-4 w-4" /> Test sound
          </button>
        </div>
        {audioOk === false && <p className="mt-2 text-[0.85rem] text-coral">This browser blocked or doesn&apos;t support Web Audio, so the alarm will be silent.</p>}
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="rm-challenge" className="min-w-0">
            <span className="block font-semibold text-ink">Math challenge to stop</span>
            <span className="block text-[0.85rem] text-muted">Answer {PROBLEMS_TO_STOP} problems correctly before it goes quiet</span>
          </label>
          <Switch id="rm-challenge" checked={challenge} onChange={setChallenge} label="Math challenge to stop" />
        </div>
        {challenge && (
          <div className="mt-4">
            <Segmented label="Difficulty" value={difficulty} options={DIFFICULTY_OPTIONS} onChange={setDifficulty} />
            <p className="mt-2 text-[0.8rem] text-muted">
              {difficulty === "easy" ? "Like 27 + 15 or 44 − 9" : "Like 58 + 37, 82 − 46 or 7 × 8"}
            </p>
          </div>
        )}
      </div>

      {extras}

      <button type="submit" className="rm-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-[1.05rem] font-semibold text-accent-ink shadow-soft hover:brightness-110">
        <AlarmClock aria-hidden className="h-5 w-5" /> Set alarm
      </button>
      <p className="mx-auto mt-5 max-w-lg text-center text-[0.8125rem] leading-relaxed text-muted">
        Keep this tab open and your computer awake. A browser alarm can&apos;t ring if the laptop sleeps or the browser is closed. For a phone alarm that rings on Silent, use an app.
      </p>
    </form>
  );
}
