"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Delete, Footprints, Mic, QrCode, RotateCcw, X } from "lucide-react";
import { Icon3D, type Icon3DName } from "@/components/site/icon-3d";
import { appStoreHref } from "@/components/site/app-store-button";
import { CHALLENGES } from "@/lib/site";
import { CHALLENGE_STYLE } from "./data";

/**
 * Tiny playable web demos of the wake-up challenges, in a native <dialog>
 * styled like an iOS sheet. Honest by design: the label says it's a demo, and
 * camera challenges never touch the camera (an animated preview instead).
 */
export function DemoSheet({ slug, onClose }: { slug: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [won, setWon] = useState(false);
  const [round, setRound] = useState(0);
  const c = CHALLENGES.find((x) => x.slug === slug)!;
  const st = CHALLENGE_STYLE[slug];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    d.showModal();
    const close = () => onClose();
    d.addEventListener("close", close);
    return () => d.removeEventListener("close", close);
  }, [onClose]);

  const win = useCallback(() => setWon(true), []);
  const camera = c.needs === "Camera";

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-title"
      className="rm-sheet"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="relative overflow-hidden rounded-t-[28px] bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgb(0_0_0/0.2)] sm:rounded-[28px] sm:p-6">
        <div aria-hidden className="mx-auto -mt-2 mb-3 h-1.5 w-10 rounded-full bg-line sm:hidden" />
        <div className="flex items-start gap-3">
          <span className="rm-icon-tile h-14 w-14" style={{ "--tint": st.top } as CSSProperties}>
            <Icon3D name={c.icon3d} size={40} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-muted">Web demo</p>
            <h2 id="demo-title" className="text-[1.35rem] font-extrabold leading-tight tracking-tight">
              {c.name}
            </h2>
          </div>
          <button type="button" onClick={() => ref.current?.close()} aria-label="Close demo" className="grid h-11 w-11 place-items-center rounded-full bg-paper-2 text-ink">
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-5 min-h-[300px]">
          {won ? (
            <Win slug={slug} color={st.deep} onAgain={() => { setWon(false); setRound((r) => r + 1); }} />
          ) : (
            <Demo key={round} slug={slug} color={st.deep} top={st.top} onWin={win} />
          )}
        </div>

        <p className="mt-4 text-center text-[0.8rem] leading-snug text-muted">
          {camera
            ? "A preview only: this page never uses your camera. In the app, recognition runs on your iPhone."
            : "A quick taste of the real challenge. In the app it runs until you finish, at the difficulty you pick."}
        </p>
      </div>
    </dialog>
  );
}

function Demo({ slug, color, top, onWin }: { slug: string; color: string; top: string; onWin: () => void }) {
  const art = CHALLENGES.find((x) => x.slug === slug)?.icon3d;
  switch (slug) {
    case "math":
      return <MathDemo color={color} onWin={onWin} />;
    case "memory":
      return <MemoryDemo color={color} top={top} onWin={onWin} />;
    case "typing":
      return <TypingDemo color={color} onWin={onWin} />;
    case "shake":
      return <ShakeDemo color={color} onWin={onWin} />;
    case "walk":
      return <CounterPreview color={color} onWin={onWin} target={60} unit="steps" icon={<Footprints aria-hidden className="h-10 w-10" />} caption="Steps counted by your iPhone's motion coprocessor" />;
    case "voice":
      return <VoiceDemo color={color} onWin={onWin} />;
    case "qr-code":
      return <ScanPreview color={color} onWin={onWin} />;
    case "object-find":
      return <CounterPreview color={color} onWin={onWin} target={1} unit="cup found" caption='"Find a cup": point the camera at it and the app confirms it on-device' art={art} />;
    default:
      // push-ups, squats: animated rep counter.
      return <CounterPreview color={color} onWin={onWin} target={10} unit={slug === "squats" ? "squats" : "push-ups"} caption="The camera counts each full rep on your iPhone" art={art} />;
  }
}

/* ---------- Math: one sum, number pad ---------- */
function MathDemo({ color, onWin }: { color: string; onWin: () => void }) {
  const [[a, b]] = useState(() => [12 + Math.floor(Math.random() * 60), 11 + Math.floor(Math.random() * 38)]);
  const [v, setV] = useState("");
  const [bad, setBad] = useState(false);
  const check = (val: string) => {
    if (Number(val) === a + b) onWin();
    else {
      setBad(true);
      setTimeout(() => { setBad(false); setV(""); }, 450);
    }
  };
  const press = (k: string) => {
    if (k === "del") return setV((x) => x.slice(0, -1));
    if (k === "ok") return check(v);
    setV((x) => (x.length < 3 ? x + k : x));
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") press("del");
      else if (e.key === "Enter") press("ok");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <div className="text-center">
      <p className="t-rounded text-[2.6rem] font-extrabold tracking-tight" aria-live="polite">
        {a} + {b} = <span className={`inline-block min-w-[3ch] border-b-4 ${bad ? "text-[#E5484D]" : ""}`} style={{ borderColor: color }}>{v || "?"}</span>
      </p>
      <div className="mx-auto mt-4 grid max-w-[260px] grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "ok"].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            aria-label={k === "del" ? "Delete" : k === "ok" ? "Check answer" : k}
            className={`t-rounded grid h-12 place-items-center rounded-2xl text-[1.25rem] font-bold transition-transform active:scale-95 ${k === "ok" ? "text-white" : "bg-paper-2 text-ink"}`}
            style={k === "ok" ? { background: color } : undefined}
          >
            {k === "del" ? <Delete aria-hidden className="h-5 w-5" /> : k === "ok" ? "Go" : k}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Memory: 4 tiles flash on a 3×3 grid, tap them back in order ---------- */
function MemoryDemo({ color, top, onWin }: { color: string; top: string; onWin: () => void }) {
  const seq = useMemo(() => {
    const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    return pool.slice(0, 4);
  }, []);
  const [lit, setLit] = useState<number | null>(null);
  const [phase, setPhase] = useState<"show" | "play">("show");
  const [got, setGot] = useState(0);
  const [bad, setBad] = useState<number | null>(null);
  useEffect(() => {
    if (phase !== "show") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    seq.forEach((t, i) => {
      timers.push(setTimeout(() => setLit(t), 500 + i * 700));
      timers.push(setTimeout(() => setLit(null), 500 + i * 700 + 520));
    });
    timers.push(setTimeout(() => setPhase("play"), 500 + seq.length * 700));
    return () => timers.forEach(clearTimeout);
  }, [phase, seq]);
  const tap = (i: number) => {
    if (phase !== "play") return;
    if (seq[got] === i) {
      if (got + 1 === seq.length) onWin();
      else setGot(got + 1);
    } else {
      setBad(i);
      setTimeout(() => { setBad(null); setGot(0); setPhase("show"); }, 500);
    }
  };
  return (
    <div className="text-center">
      <p className="font-bold text-ink-2" aria-live="polite">
        {phase === "show" ? "Watch the 4 tiles light up..." : `Now tap them in order (${got}/4)`}
      </p>
      <div className="mx-auto mt-4 grid max-w-[240px] grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }, (_, i) => {
          const done = phase === "play" && seq.slice(0, got).includes(i);
          const on = lit === i || done;
          return (
            <button
              key={i}
              type="button"
              disabled={phase !== "play"}
              onClick={() => tap(i)}
              aria-label={`Tile ${i + 1}`}
              className="t-rounded aspect-square rounded-2xl text-lg font-extrabold transition-[background-color,transform] duration-200 active:scale-95"
              style={{ background: bad === i ? "#E5484D" : on ? `linear-gradient(135deg, ${top}, ${color})` : "var(--paper-2)", color: on ? "#fff" : "transparent" }}
            >
              {done ? seq.indexOf(i) + 1 : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Typing ---------- */
const PHRASE = "I am awake and ready";
function TypingDemo({ color, onWin }: { color: string; onWin: () => void }) {
  const [v, setV] = useState("");
  return (
    <div>
      <p className="t-rounded rounded-2xl bg-paper-2 p-4 text-center text-[1.3rem] font-bold tracking-tight" aria-hidden>
        {PHRASE.split("").map((ch, i) => (
          <span key={i} style={{ color: i < v.length ? (v[i] === ch ? color : "#E5484D") : "var(--muted)" }}>
            {ch}
          </span>
        ))}
      </p>
      <label className="mt-4 block text-[0.85rem] font-bold text-ink-2" htmlFor="demo-type">
        Type the phrase exactly: <span className="font-extrabold text-ink">{PHRASE}</span>
      </label>
      <input
        id="demo-type"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        value={v}
        onChange={(e) => {
          setV(e.target.value);
          if (e.target.value.trim() === PHRASE) onWin();
        }}
        className="mt-2 h-12 w-full rounded-2xl border-2 border-line bg-card px-4 text-[1.05rem] font-semibold outline-none focus:border-[var(--c)]"
        style={{ "--c": color } as CSSProperties}
      />
    </div>
  );
}

/* ---------- Shake: DeviceMotion on phones, space-bar mash on laptops ---------- */
function ShakeDemo({ color, onWin }: { color: string; onWin: () => void }) {
  const [n, setN] = useState(0);
  const [mode, setMode] = useState<"keys" | "ask" | "motion">("keys");
  const target = mode === "motion" ? 15 : 25;
  const last = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches && "DeviceMotionEvent" in window) setMode("ask");
  }, []);
  useEffect(() => {
    if (n >= target) onWin();
  }, [n, target, onWin]);
  useEffect(() => {
    if (mode !== "keys") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setN((x) => x + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);
  useEffect(() => {
    if (mode !== "motion") return;
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const mag = Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0);
      const now = Date.now();
      if (mag > 22 && now - last.current > 180) {
        last.current = now;
        setN((x) => x + 1);
      }
    };
    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [mode]);
  const enable = async () => {
    const DM = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
    try {
      const res = DM.requestPermission ? await DM.requestPermission() : "granted";
      setMode(res === "granted" ? "motion" : "keys");
    } catch {
      setMode("keys");
    }
  };
  const pct = Math.min(1, n / target);
  return (
    <div className="text-center">
      <Ring pct={pct} color={color}>
        <span className="t-rounded text-[2.4rem] font-extrabold">{Math.min(n, target)}</span>
        <span className="text-[0.8rem] font-bold text-muted">of {target} shakes</span>
      </Ring>
      {mode === "ask" ? (
        <button type="button" onClick={enable} className="rm-btn-primary mt-5 min-h-12 rounded-full px-6 font-extrabold">
          Use my phone&apos;s motion
        </button>
      ) : mode === "motion" ? (
        <p className="mt-5 font-bold text-ink-2">Shake your phone!</p>
      ) : (
        <div className="mt-5">
          <p className="font-bold text-ink-2">
            Mash the <kbd className="rounded-md border border-line bg-paper-2 px-1.5 py-0.5 text-[0.85em]">Space</kbd> bar, or tap below
          </p>
          <button type="button" onClick={() => setN((x) => x + 1)} className="rm-btn-primary mt-3 min-h-12 rounded-full px-8 font-extrabold active:scale-95">
            Shake!
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Voice: animated preview (no microphone on the web) ---------- */
const AFFIRMATION = "Today I choose to rise and win the morning".split(" ");
function VoiceDemo({ color, onWin }: { color: string; onWin: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= AFFIRMATION.length) {
      const t = setTimeout(onWin, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 420);
    return () => clearTimeout(t);
  }, [i, onWin]);
  return (
    <div className="text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: color }}>
        <Mic aria-hidden className="h-7 w-7" />
      </span>
      <div aria-hidden className="mx-auto mt-4 flex h-10 max-w-[200px] items-center justify-center gap-1">
        {Array.from({ length: 14 }, (_, k) => (
          <span key={k} className="w-1.5 rounded-full transition-[height] duration-300" style={{ background: color, height: `${i < AFFIRMATION.length ? 20 + ((k * 37 + i * 53) % 70) : 12}%` }} />
        ))}
      </div>
      <p className="mt-4 text-[1.35rem] font-extrabold leading-snug tracking-tight">
        {AFFIRMATION.map((w, k) => (
          <span key={k} style={{ color: k < i ? color : "var(--muted)" }}>
            {w}{" "}
          </span>
        ))}
      </p>
      <p className="mt-2 text-[0.85rem] text-muted">In the app you say it out loud and on-device speech recognition checks it.</p>
    </div>
  );
}

/* ---------- QR: animated scan frame ---------- */
function ScanPreview({ color, onWin }: { color: string; onWin: () => void }) {
  useEffect(() => {
    const t = setTimeout(onWin, 2600);
    return () => clearTimeout(t);
  }, [onWin]);
  return (
    <div className="text-center">
      <div className="relative mx-auto grid h-48 w-48 place-items-center overflow-hidden rounded-3xl bg-[#0b0d10]">
        <QrCode aria-hidden className="h-24 w-24 text-white/90" />
        <span aria-hidden className="rm-scanline absolute inset-x-6 h-0.5 rounded-full" style={{ background: color, boxShadow: `0 0 16px ${color}` }} />
        {["left-3 top-3 border-l-4 border-t-4", "right-3 top-3 border-r-4 border-t-4", "bottom-3 left-3 border-b-4 border-l-4", "bottom-3 right-3 border-b-4 border-r-4"].map((p) => (
          <span key={p} aria-hidden className={`absolute h-7 w-7 rounded-md border-white ${p}`} />
        ))}
      </div>
      <p className="mt-4 font-bold text-ink-2" aria-live="polite">Scanning your code in the bathroom...</p>
      <style>{`@keyframes rm-scan{0%{top:12%}100%{top:86%}}.rm-scanline{animation:rm-scan 1.2s ease-in-out infinite alternate}@media (prefers-reduced-motion:reduce){.rm-scanline{animation:none;top:50%}}`}</style>
    </div>
  );
}

/* ---------- Counter preview (camera + walk) ---------- */
function CounterPreview({
  color,
  onWin,
  target,
  unit,
  caption,
  icon,
  art,
}: {
  color: string;
  onWin: () => void;
  target: number;
  unit: string;
  caption: string;
  icon?: React.ReactNode;
  art?: Icon3DName;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= target) {
      const t = setTimeout(onWin, 500);
      return () => clearTimeout(t);
    }
    const step = target > 20 ? Math.ceil(target / 20) : 1;
    const t = setTimeout(() => setN((x) => Math.min(target, x + step)), target === 1 ? 1800 : target > 20 ? 110 : 330);
    return () => clearTimeout(t);
  }, [n, target, onWin]);
  return (
    <div className="text-center">
      <Ring pct={n / target} color={color}>
        {art ? (
          <span className="rm-rep-bounce" key={n}>
            <Icon3D name={art} size={56} />
          </span>
        ) : (
          <span style={{ color }}>{icon}</span>
        )}
        <span className="t-rounded mt-1 text-[1.9rem] font-extrabold leading-none" aria-live="polite">
          {n}
          {target > 1 && <span className="text-[0.95rem] text-muted"> / {target}</span>}
        </span>
        <span className="text-[0.78rem] font-bold text-muted">{unit}</span>
      </Ring>
      <p className="mt-4 font-bold text-ink-2">{caption}</p>
      <style>{`@keyframes rm-rep{0%{transform:translateY(0) scale(1)}40%{transform:translateY(-8px) scale(1.08)}100%{transform:none}}.rm-rep-bounce{display:inline-block;animation:rm-rep .32s ease-out}@media (prefers-reduced-motion:reduce){.rm-rep-bounce{animation:none}}`}</style>
    </div>
  );
}

function Ring({ pct, color, children }: { pct: number; color: string; children: React.ReactNode }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto grid h-[180px] w-[180px] place-items-center">
      <svg aria-hidden viewBox="0 0 160 160" className="absolute inset-0 -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--paper-2)" strokeWidth="12" />
        <circle cx="80" cy="80" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, pct))} style={{ transition: "stroke-dashoffset 300ms ease-out" }} />
      </svg>
      <div className="relative flex flex-col items-center">{children}</div>
    </div>
  );
}

/* ---------- Win state ---------- */
const CONFETTI = ["#2F5BFF", "#F5A623", "#00B865", "#FF7A59", "#B57BFF", "#38BDF8"];
function Win({ slug, color, onAgain }: { slug: string; color: string; onAgain: () => void }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        "--cx": `${Math.round(Math.cos((i / 28) * Math.PI * 2) * (90 + Math.random() * 90))}px`,
        "--cy": `${Math.round(Math.sin((i / 28) * Math.PI * 2) * (70 + Math.random() * 80) + 60)}px`,
        "--cr": `${Math.round(Math.random() * 720 - 360)}deg`,
        background: CONFETTI[i % CONFETTI.length],
        animationDelay: `${Math.random() * 120}ms`,
      })),
    [],
  );
  return (
    <div className="relative text-center" role="status">
      <div aria-hidden className="rm-confetti pointer-events-none absolute inset-0">
        {bits.map((s, i) => (
          <i key={i} style={s as CSSProperties} />
        ))}
      </div>
      <Icon3D name="3d-sun" size={96} className="mx-auto" />
      <p className="mt-3 text-[1.6rem] font-extrabold tracking-tight">You&apos;re awake!</p>
      <p className="mt-1 text-ink-2">That&apos;s the feeling. Tomorrow, the alarm only stops when you do this.</p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <a href={appStoreHref(`demo-${slug}`)} data-cta={`demo-${slug}`} className="rm-btn-primary inline-flex min-h-12 items-center justify-center rounded-full px-6 font-extrabold">
          Get Rise Mission
        </a>
        <button type="button" onClick={onAgain} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-paper-2 px-5 font-bold" style={{ color }}>
          <RotateCcw aria-hidden className="h-4 w-4" /> Try again
        </button>
      </div>
    </div>
  );
}
