import type { SoundId } from "@/lib/alarm-clock";

/**
 * Web Audio alarm tones, generated in code (no audio files).
 *
 * Sounds are scheduled on the AudioContext clock rather than with timers:
 * the audio clock keeps exact time even when a background tab's timers are
 * throttled, so a pre-scheduled alarm starts on the second. The page's
 * interval only has to keep the schedule topped up (`ensure`).
 */

type Cycle = { length: number; render: (ctx: AudioContext, out: AudioNode, t: number, track: (n: AudioScheduledSourceNode) => void) => void };

function tone(
  ctx: AudioContext,
  out: AudioNode,
  track: (n: AudioScheduledSourceNode) => void,
  t: number,
  opts: { freq: number; to?: number; dur: number; type: OscillatorType; peak: number; attack?: number },
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.freq, t);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t + opts.dur);
  const attack = opts.attack ?? 0.01;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + opts.dur + 0.03);
  track(osc);
}

export const SOUNDS: Record<SoundId, { name: string; cycle: Cycle }> = {
  chime: {
    name: "Chime",
    cycle: {
      length: 2.2,
      render: (ctx, out, t, track) => {
        // C major arpeggio, soft bell-like decay.
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
          tone(ctx, out, track, t + i * 0.22, { freq: f, dur: 0.9, type: "sine", peak: 0.5 }),
        );
      },
    },
  },
  beep: {
    name: "Classic beep",
    cycle: {
      length: 1.4,
      render: (ctx, out, t, track) => {
        for (let i = 0; i < 4; i++) tone(ctx, out, track, t + i * 0.16, { freq: 880, dur: 0.1, type: "square", peak: 0.18, attack: 0.005 });
      },
    },
  },
  rise: {
    name: "Rising sweep",
    cycle: {
      length: 1.5,
      render: (ctx, out, t, track) => {
        tone(ctx, out, track, t, { freq: 440, to: 990, dur: 0.85, type: "triangle", peak: 0.45, attack: 0.08 });
      },
    },
  },
};

type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };

export class AlarmSound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private nodes = new Set<AudioScheduledSourceNode>();
  private sound: SoundId = "chime";
  /** Audio-clock time the current loop started at, and how far it is scheduled. */
  private loopStart = 0;
  private scheduledUntil = 0;
  private nextCycleAt = 0;

  static supported() {
    return typeof window !== "undefined" && !!(window.AudioContext || (window as WindowWithWebkit).webkitAudioContext);
  }

  /** Must be called from a user gesture (click) to satisfy autoplay rules. */
  async unlock(): Promise<boolean> {
    if (!AlarmSound.supported()) return false;
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext!;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state !== "running") {
      try {
        await this.ctx.resume();
      } catch {
        /* ignore: reported via `running` */
      }
    }
    return this.ctx.state === "running";
  }

  get running() {
    return this.ctx?.state === "running";
  }

  private track = (n: AudioScheduledSourceNode) => {
    this.nodes.add(n);
    n.onended = () => this.nodes.delete(n);
  };

  /** Play one cycle now (sound preview). */
  preview(sound: SoundId) {
    if (!this.ctx || !this.master) return;
    SOUNDS[sound].cycle.render(this.ctx, this.master, this.ctx.currentTime + 0.05, this.track);
  }

  /**
   * Start (or keep) the looping alarm at epoch time `atMs`, scheduled
   * `aheadSec` seconds into the future on the audio clock.
   */
  schedule(sound: SoundId, atMs: number, aheadSec = 90) {
    if (!this.ctx || !this.master) return;
    const startCtx = this.ctx.currentTime + Math.max(0.05, (atMs - Date.now()) / 1000);
    this.stop();
    this.sound = sound;
    this.loopStart = startCtx;
    this.nextCycleAt = startCtx;
    this.scheduledUntil = startCtx;
    this.ensure(aheadSec);
  }

  /** True when the loop has actually started playing on the audio clock. */
  get audible() {
    return !!this.ctx && this.nodes.size > 0 && this.loopStart <= this.ctx.currentTime + 0.05;
  }

  /** Top up the schedule so at least `aheadSec` seconds of tones are queued. */
  ensure(aheadSec = 90) {
    if (!this.ctx || !this.master || !this.scheduledUntil) return;
    const horizon = Math.max(this.ctx.currentTime, this.loopStart) + aheadSec;
    const { length, render } = SOUNDS[this.sound].cycle;
    while (this.nextCycleAt < horizon) {
      render(this.ctx, this.master, this.nextCycleAt, this.track);
      this.nextCycleAt += length;
    }
    this.scheduledUntil = this.nextCycleAt;
  }

  stop() {
    this.nodes.forEach((n) => {
      try {
        n.stop();
        n.disconnect();
      } catch {
        /* already stopped */
      }
    });
    this.nodes.clear();
    this.scheduledUntil = 0;
  }
}
