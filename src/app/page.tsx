import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { ClayTile } from "@/components/site/clay-tile";
import { CtaBand } from "@/components/site/cta-band";
import { CountUp } from "@/components/motion/count-up";
import { Faq } from "@/components/site/faq";
import { Icon3D, type Icon3DName } from "@/components/site/icon-3d";
import { Phone } from "@/components/site/phone";
import { Section, SectionHeader } from "@/components/site/section";
import { StickyCta } from "@/components/site/sticky-cta";
import { LazyVideo } from "@/components/site/lazy-video";
import { FlipBadge } from "@/components/site/home/flip-badge";
import { MissionCard } from "@/components/site/home/mission-card";
import { RankLadder } from "@/components/site/home/rank-ladder";
import { CHALLENGE_STYLE } from "@/components/site/home/data";
import { v16Screen, type V16ScreenId } from "@/lib/media";
import { Carousel } from "@/components/motion/carousel";
import { Orbit } from "@/components/motion/orbit";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { REEL_16X9_VIDEO } from "@/lib/perf/video-sources";
import { BLOG_TOPICS, postPath, sortedPosts } from "@/lib/blog";
import { faqPageLd, mobileApplicationLd, organizationLd, pageMetadata, reelVideoLd, webSiteLd, type QA } from "@/lib/seo";
import {
  ACHIEVEMENT_COUNT,
  ACHIEVEMENTS,
  CHALLENGE_GUIDES,
  CHALLENGES,
  FACTS,
  FOCUS_PRESETS,
  LIVE_VERSION,
  PRICING_COPY,
  PRIVACY_COPY,
  RANKS,
  V16_FEATURES,
  XP_RULES,
} from "@/lib/site";

/** Screens carousel order. The paywall screen is left out on purpose: it shows prices. */
const SCREEN_IDS: V16ScreenId[] = ["home", "challenges", "ringing", "math", "success", "stats", "focus", "memory", "editor", "typing", "onboarding", "settings"];
const SCREENS = SCREEN_IDS.map(v16Screen);

const DESCRIPTION =
  "Rise Mission is the iPhone alarm clock for heavy sleepers. When it rings, you prove you're awake with a challenge: push-ups, a walk, a QR scan, math or your voice.";

export const metadata = pageMetadata({
  title: "Rise Mission: Alarm Clock App for Heavy Sleepers",
  absoluteTitle: true,
  description: "The iPhone alarm clock app for heavy sleepers: stop it with a wake-up challenge like push-ups, a walk, a QR scan or math. Rings on Silent. iOS 26+.",
  path: "/",
});

const FAQ: QA[] = [
  {
    q: "How does Rise Mission stop me from snoozing?",
    a: "When the alarm rings you complete a short wake-up challenge, such as push-ups counted by your camera, a walk, scanning a QR code in another room, math, or saying an affirmation out loud. Finishing it takes a working brain or your feet on the floor, so you can't switch it off half-asleep the way you would a normal alarm.",
  },
  { q: "Can I just turn it off?", a: FACTS.systemStop },
  { q: "Is there a snooze button?", a: FACTS.snooze },
  { q: "Which iPhones does Rise Mission work on?", a: FACTS.minIOS },
  { q: "Does the alarm ring on Silent, in Focus, or when the app is closed?", a: `Yes. ${FACTS.ringsOnSilent} ${FACTS.poweredOff}` },
  { q: "Which wake-up challenges can I choose from?", a: `${FACTS.challengeCount}: ${CHALLENGES.map((c) => c.name).join(", ")}. ${FACTS.backupChallenge}` },
  {
    q: "How do levels and XP work?",
    a: `Every completed wake-up earns ${XP_RULES.base} XP, plus ${XP_RULES.onTimeBonus} for finishing on time without snoozing and ${XP_RULES.routineBonus} for your morning routine. A streak multiplies it, up to ×2 from 14 days. You climb six ranks, from ${RANKS[0].name} to ${RANKS[RANKS.length - 1].name}, and can earn ${ACHIEVEMENT_COUNT} achievements.`,
  },
  { q: "Is my camera and voice data private?", a: PRIVACY_COPY.long },
  { q: "What if the camera can't see me or I'm sick?", a: `${FACTS.backupChallenge} ${FACTS.emergencyDismiss}` },
  { q: "How much does Rise Mission cost?", a: PRICING_COPY.long },
  {
    q: "Who is Rise Mission for?",
    a: "Heavy sleepers and chronic snoozers: anyone who can switch off a normal alarm in their sleep. It's especially useful if you have early workouts, classes, shifts or flights, where waking up on the first alarm actually matters.",
  },
];

const STEPS: { icon: Icon3DName; t: string; d: string }[] = [
  { icon: "3d-clock", t: "Set your alarm", d: "Pick a time, the days, and a wake-up challenge with a difficulty that suits you." },
  { icon: "3d-bell", t: "It rings, for real", d: "AlarmKit rings on the Lock Screen, in Silent and in Focus, even with the app closed." },
  { icon: "3d-tick", t: "Prove you're up", d: "Finish the challenge to stop it. Your streak grows, you earn XP and your brain is already online." },
];

const STATS: { icon: Icon3DName; value: number; prefix?: string; label: string }[] = [
  { icon: "3d-dumbbell", value: CHALLENGES.length, label: "wake-up challenges" },
  { icon: "3d-trophy", value: RANKS.length, label: "ranks to climb" },
  { icon: "3d-medal", value: ACHIEVEMENT_COUNT, label: "badges to earn" },
  { icon: "3d-star", value: XP_RULES.base, prefix: "+", label: "XP every wake-up" },
];

const STEP_TINTS = ["#F5A623", "#FF7A59", "#2F5BFF"];

const ORBIT_ICONS: Icon3DName[] = ["3d-dumbbell", "3d-calculator", "3d-fire", "3d-pencil", "3d-camera", "3d-puzzle", "3d-trophy"];

/** Focus preset tiles in the app's colours (teal / blue / violet). */
const PRESET_HUES: Record<number, [string, string]> = {
  15: ["#2DD4BF", "#0E8F9A"],
  25: ["#4F7BFF", "#1E3FD9"],
  45: ["#B57BFF", "#6D3FD6"],
};

/** Morning routine (amber) and bedtime nudge (indigo) tiles. */
const TINT_HUES: [string, string][] = [
  ["#F59E0B", "#C2410C"],
  ["#4F46E5", "#2E2A8F"],
];

/** Gradient hues for the two lead feature cards (RMGradientHue). */
const LEAD_HUES: [string, string][] = [
  ["#7B4DFF", "#5A2FD6"], // violet
  ["#D23B1E", "#A8221D"], // ember
];

export default function HomePage() {
  const posts = sortedPosts().slice(0, 3);
  const home = v16Screen("home");
  const challengesShot = v16Screen("challenges");
  const focus = v16Screen("focus");
  const lead = V16_FEATURES.slice(0, 2);
  const tinted = V16_FEATURES.slice(2, 4);
  const restFeatures = V16_FEATURES.slice(4);

  return (
    <>
      <JsonLd data={[organizationLd(), webSiteLd(), mobileApplicationLd(DESCRIPTION, { releaseNotesUrl: "/whats-new" }), reelVideoLd(), faqPageLd(FAQ)]} />

      {/* HERO: the app's time-of-day header wash, the pitch, and the real v1.6
          Home screen in a device frame with the welcome-scene icon orbit. */}
      <section className="rm-wash -mt-16 overflow-hidden pt-16">
        <div className="container-rm grid items-center gap-6 pb-10 pt-8 md:pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-8 lg:pb-16">
          <div className="fade-up-group text-center lg:text-left">
            <Link
              href="#whats-new"
              className="fade-up inline-flex items-center gap-2 rounded-full border border-white/80 bg-card/80 py-1 pl-1 pr-3 text-[0.82rem] font-semibold text-ink-2 shadow-[0_1px_2px_rgb(20_23_28/0.06)] backdrop-blur transition-colors duration-150 hover:border-ink/20 dark:border-line"
            >
              <span className="whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[0.72rem] font-extrabold text-accent-ink">New in {LIVE_VERSION}</span>
              <span className="whitespace-nowrap">
                Levels, badges<span className="hidden sm:inline"> &amp; a Focus tab</span>
              </span>
              <ArrowRight aria-hidden className="h-3.5 w-3.5 text-muted" />
            </Link>

            <h1 className="fade-up t-display mx-auto mt-5 max-w-[15ch] lg:mx-0">
              The alarm clock app that makes you <span className="hl">prove</span> you&apos;re awake.
            </h1>

            <p className="fade-up t-lead mx-auto mt-5 max-w-[36rem] lg:mx-0">
              Rise Mission is an iPhone alarm app for heavy sleepers. When it rings, you finish a wake-up challenge: push-ups
              counted by your camera, a walk, a QR code across the room, math or your voice. By the time you&apos;re done,
              you&apos;re up.
            </p>

            <div className="fade-up mx-auto mt-7 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <AppStoreButton placement="home-hero" size="lg" className="justify-center" />
              <Link
                href="#challenges"
                className="group inline-flex h-[60px] items-center justify-center gap-2 rounded-full border border-line bg-card px-6 font-bold text-ink shadow-[inset_0_1px_0_var(--highlight)] transition-colors duration-150 hover:border-ink/20"
              >
                Try a challenge <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="fade-up mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.85rem] font-semibold text-muted lg:mx-0 lg:justify-start">
              {["iPhone · iOS 26 or later", PRICING_COPY.short, PRIVACY_COPY.badges[0], "Rings on Silent & Focus"].map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5">
                  <Check aria-hidden className="h-3.5 w-3.5 text-good" strokeWidth={3} />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Stage */}
          <div className="fade-in-late relative mx-auto h-[500px] w-full max-w-[560px] sm:h-[560px] lg:h-[640px]">
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--glow)_55%,transparent),transparent)] blur-2xl" />
            <Orbit icons={ORBIT_ICONS} bubble={58} className="[--rx:150px] [--ry:205px] sm:[--rx:205px] sm:[--ry:235px] lg:[--rx:235px] lg:[--ry:270px]">
              <div className="relative">
                <Phone
                  src={challengesShot.src}
                  alt=""
                  sizes="180px"
                  className="rm-float-slow absolute -left-[46%] top-[9%] hidden w-[180px] [--tilt:-8deg] opacity-95 sm:block lg:w-[200px]"
                />
                <Phone src={home.src} alt={home.alt} preload sizes="(max-width: 640px) 210px, (max-width: 1024px) 240px, 272px" className="rm-float relative w-[210px] sm:w-[240px] lg:w-[272px]" />
                {/* Floating "alarm ready" + streak chips, like the Home screen cards */}
                <div aria-hidden className="rm-card rm-float-slow absolute -right-[46%] top-[2%] hidden items-center gap-2 rounded-2xl px-3 py-2 sm:flex">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-good text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block text-[0.8rem] font-extrabold text-ink">Your 6:30 AM alarm is ready</span>
                    <span className="block text-[0.7rem] font-semibold text-muted">Backup: Math</span>
                  </span>
                </div>
                <div aria-hidden className="rm-card rm-float absolute -left-[30%] bottom-[12%] flex items-center gap-2 rounded-2xl py-1.5 pl-1.5 pr-3 [--tilt:-3deg]">
                  <Icon3D name="3d-fire" size={34} />
                  <span className="text-left leading-tight">
                    <span className="t-rounded block text-[0.95rem] font-extrabold text-ink">7 day streak</span>
                    <span className="block text-[0.68rem] font-bold text-muted">+15 XP this morning</span>
                  </span>
                </div>
              </div>
            </Orbit>
          </div>
        </div>
      </section>

      {/* AT A GLANCE: animated counters */}
      <section aria-label="Rise Mission at a glance" className="container-rm relative z-[1] -mt-4 lg:-mt-8">
        <Reveal stagger className="rm-card mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden !rounded-[28px] bg-line p-0 sm:grid-cols-4">
          {STATS.map((st) => (
            <div key={st.label} className="flex items-center gap-3 bg-card px-4 py-4 sm:flex-col sm:items-start sm:gap-2 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:gap-3">
              <Icon3D name={st.icon} size={48} className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
              <p className="leading-tight">
                <span className="t-rounded block text-[1.75rem] font-extrabold tracking-tight text-ink sm:text-[2rem]">
                  <CountUp value={st.value} prefix={st.prefix} />
                </span>
                <span className="block text-[0.82rem] font-bold text-muted">{st.label}</span>
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works">
        <SectionHeader eyebrow="How it works" title="Three steps to a morning you don't negotiate with." />
        <Reveal as="ol" stagger className="relative mt-12 grid gap-4 md:grid-cols-3">
          <span aria-hidden className="absolute left-[16%] right-[16%] top-[60px] hidden h-0.5 rounded-full bg-[linear-gradient(90deg,var(--sun),var(--coral),var(--accent))] opacity-50 md:block" />
          {STEPS.map((s, i) => (
            <li key={s.t} className="rm-card lift group relative p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="rm-icon-tile h-[84px] w-[84px] !rounded-[22px]" style={{ "--tint": STEP_TINTS[i] } as CSSProperties}>
                  <Icon3D name={s.icon} size={64} className="icon3d-hover" />
                </span>
                <span className="t-rounded grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,#4a72ff,var(--accent-deep))] text-[0.9rem] font-extrabold text-white shadow-[0_6px_14px_-6px_var(--accent)]">{i + 1}</span>
              </div>
              <h3 className="t-h3 mt-4 text-[1.25rem]">{s.t}</h3>
              <p className="mt-2 text-ink-2">{s.d}</p>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* CHALLENGES: the app's mission carousel with playable demos, then the full list */}
      <section id="challenges" className="scroll-mt-16 border-y border-line/70 bg-paper-2/60 py-20 md:py-28">
        <div className="container-rm">
          <SectionHeader
            eyebrow={`${FACTS.challengeCount} wake-up challenges`}
            title="Prove you're awake, your way."
            lead="Swipe through the missions and tap Try it for a 20-second web demo. Body challenges get you out of bed, brain challenges get your head online, and the backup takes over if the camera can't see you."
          />
        </div>
        <Carousel label="Wake-up challenges" cardWidth="min(76vw, 340px)" padTop="56px" autoplay={3000} perView={4} dotColors={CHALLENGES.map((c) => CHALLENGE_STYLE[c.slug].top)} className="mt-6">
          {CHALLENGES.map((c, i) => (
            <MissionCard key={c.slug} c={c} index={i} total={CHALLENGES.length} />
          ))}
        </Carousel>

        <div className="container-rm mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2.5 text-[1.35rem] font-extrabold tracking-tight">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-[10px] bg-accent text-white">
                <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                  <rect x="2" y="2" width="5" height="5" rx="1.5" />
                  <rect x="9" y="2" width="5" height="5" rx="1.5" />
                  <rect x="2" y="9" width="5" height="5" rx="1.5" />
                  <rect x="9" y="9" width="5" height="5" rx="1.5" />
                </svg>
              </span>
              All missions
            </h3>
            <Link href="/blog/wake-up-challenges-explained" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-accent hover:underline">
              Which challenge suits you? <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <Reveal as="ul" stagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CHALLENGES.map((c) => {
              const st = CHALLENGE_STYLE[c.slug];
              return (
                <li
                  key={c.slug}
                  id={`challenge-${c.slug}`}
                  className="rm-card lift group flex scroll-mt-24 gap-4 p-4 sm:flex-col sm:gap-0"
                  style={{ "--tint": st.top, "--chip": st.ink } as CSSProperties}
                >
                  <span className="rm-icon-tile h-[72px] w-[72px] sm:h-16 sm:w-16">
                    <Icon3D name={c.icon3d} size={56} className="icon3d-hover h-14 w-14 sm:h-[46px] sm:w-[46px]" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h4 className="text-[1.2rem] font-extrabold leading-tight tracking-tight text-ink sm:mt-3 sm:text-[1.1rem]">{c.name}</h4>
                    <p className="mt-0.5 text-[0.95rem] font-semibold text-ink-2 sm:text-[0.88rem]">{c.tagline}</p>
                    <p className="mt-2">
                      <span className="rm-chip dark:[--chip:var(--ink-2)]">
                        {st.time} · {st.effort}
                      </span>
                    </p>
                    <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-2 sm:mt-3 sm:text-[0.88rem]">{c.how}</p>
                    {CHALLENGE_GUIDES[c.slug] && (
                      <Link href={CHALLENGE_GUIDES[c.slug]} className="mt-auto inline-flex min-h-11 items-center gap-1 pt-1 text-[0.9rem] font-bold text-accent hover:underline sm:pt-2 sm:text-[0.85rem]">
                        Read the guide <ChevronRight aria-hidden className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* NEW IN 1.6 */}
      <Section id="whats-new">
        <SectionHeader eyebrow={`New in ${LIVE_VERSION}`} title="The biggest update yet." lead="A fresh look and new reasons to win every morning." />
        <Reveal stagger className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {/* Bento: Levels is the big tile, Rise Challenge the wide one, then two tinted tiles. */}
          <div className="rm-grad lift group relative flex min-h-[240px] flex-col justify-between p-6 sm:col-span-2 lg:row-span-2 lg:min-h-[420px] lg:p-8" style={{ "--top": LEAD_HUES[0][0], "--deep": LEAD_HUES[0][1] } as CSSProperties}>
            <Icon3D name={lead[0].icon3d} size={128} className="icon3d-hover -ml-2 -mt-2 h-24 w-24 lg:h-32 lg:w-32" />
            <div className="mt-6">
              <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.12em] text-white/80">The big one</p>
              <h3 className="mt-1 text-[1.6rem] font-extrabold leading-tight tracking-tight lg:text-[2.1rem]">{lead[0].title}</h3>
              <p className="mt-2 max-w-md text-[1.02rem] font-medium text-white/90">{lead[0].blurb}</p>
              <ul aria-label="Ranks" className="mt-5 flex flex-wrap gap-1.5">
                {RANKS.map((r) => (
                  <li key={r.name} className="inline-flex items-center gap-1 rounded-full bg-white/15 py-1 pl-1 pr-2.5 text-[0.78rem] font-bold">
                    <Icon3D name={r.icon3d} size={22} />
                    {r.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rm-grad lift group flex min-h-[180px] items-center gap-5 p-6 sm:col-span-2" style={{ "--top": LEAD_HUES[1][0], "--deep": LEAD_HUES[1][1] } as CSSProperties}>
            <Icon3D name={lead[1].icon3d} size={96} className="icon3d-hover h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
            <div>
              <h3 className="text-[1.4rem] font-extrabold leading-tight tracking-tight">{lead[1].title}</h3>
              <p className="mt-1.5 font-medium text-white/90">{lead[1].blurb}</p>
            </div>
          </div>
          {tinted.map((f, i) => (
            <div key={f.id} className="rm-grad lift group flex items-center gap-4 p-5 sm:min-h-[170px] sm:flex-col sm:items-start sm:justify-between" style={{ "--top": TINT_HUES[i][0], "--deep": TINT_HUES[i][1] } as CSSProperties}>
              <Icon3D name={f.icon3d} size={64} className="icon3d-hover h-14 w-14 shrink-0 sm:-ml-1 sm:h-16 sm:w-16" />
              <div>
                <h3 className="text-[1.15rem] font-extrabold tracking-tight">{f.title}</h3>
                <p className="mt-1 text-[0.92rem] font-medium leading-snug text-white/90">{f.blurb}</p>
              </div>
            </div>
          ))}
          <ul className="rm-group sm:col-span-2 lg:col-span-4">
            {restFeatures.map((f, i) => (
              <li key={f.id} className="lift group flex items-center gap-4 p-4 sm:flex-col sm:items-start sm:gap-3 sm:p-5" style={{ "--j": i } as CSSProperties}>
                <span className="rm-icon-tile h-14 w-14 sm:h-auto sm:w-auto sm:bg-none sm:shadow-none" style={{ "--tint": "#2F5BFF" } as CSSProperties}>
                  <Icon3D name={f.icon3d} size={52} className="icon3d-hover h-10 w-10 sm:h-[52px] sm:w-[52px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-extrabold tracking-tight text-ink">{f.title}</h3>
                  <p className="mt-0.5 text-[0.9rem] leading-relaxed text-ink-2">{f.blurb}</p>
                </div>
              </li>
            ))}
            <li className="sm:col-span-2 sm:!border-0 sm:!bg-none sm:!shadow-none">
              <Link href="/whats-new" className="rm-btn-primary group flex h-full min-h-[88px] items-center justify-between gap-4 p-5 sm:rounded-[24px]">
                <span>
                  <span className="block text-[1.1rem] font-extrabold">Everything in {LIVE_VERSION}</span>
                  <span className="block text-[0.9rem] text-white/85">Full release notes and the version history</span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden className="h-5 w-5" />
                </span>
              </Link>
            </li>
          </ul>
        </Reveal>
      </Section>

      {/* LEVELS + STREAK */}
      <section id="levels" className="rm-wash scroll-mt-16 py-20 md:py-28">
        <div className="container-rm">
          <SectionHeader
            center
            eyebrow="Levels, streaks & badges"
            title={
              <>
                From Sleepyhead to <span className="hl">Legend</span>.
              </>
            }
            lead="Every completed wake-up earns XP. Keep the streak alive and it counts for more."
          />
          <Reveal stagger className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            <LevelCard />
            <StreakCard />
          </Reveal>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h3 className="text-[1.6rem] font-extrabold tracking-tight">How long until Legend?</h3>
            <p className="mt-2 text-ink-2">Slide to your routine. The ranks below update with the app&apos;s real XP rules.</p>
          </div>
        </div>
        <div className="mt-6">
          <RankLadder />
        </div>

        <div className="container-rm mt-16" id="badges">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-[1.6rem] font-extrabold tracking-tight">{ACHIEVEMENT_COUNT} badges to earn</h3>
            <p className="mt-2 text-ink-2">Hover or tap a badge to see how to earn it.</p>
          </div>
        </div>
        <Carousel label="Achievements" cardWidth="min(56vw, 220px)" padTop="20px" autoplay={2600} perView={6} className="mt-2">
          {ACHIEVEMENTS.map((a) => (
            <FlipBadge key={a.name} name={a.name} how={a.how} icon={a.icon3d} isNew={a.since === "1.6"} />
          ))}
        </Carousel>
      </section>

      {/* FOCUS TAB */}
      <Section id="focus">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative order-2 mx-auto lg:order-1">
            <div aria-hidden className="absolute inset-[-10%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)] blur-2xl" />
            <div className="rm-parallax relative [--px:24px]">
              <Phone src={focus.src} alt={focus.alt} sizes="(max-width: 1024px) 250px, 290px" className="w-[250px] lg:w-[290px]" />
            </div>
            <Icon3D name="3d-target" size={88} className="rm-parallax rm-float absolute -right-12 top-[18%] [--px:-36px]" />
            <Icon3D name="3d-clock" size={80} className="rm-parallax rm-float-slow absolute -left-12 bottom-[16%] [--px:40px]" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader icon="3d-bolt" eyebrow="The new Focus tab" title="Up early? Use the time." lead="A focus timer and Pomodoro that ring like an alarm, right next to your alarms." />
            <Reveal stagger className="mt-8 grid grid-cols-3 gap-3">
              {FOCUS_PRESETS.filter((p) => PRESET_HUES[p.minutes]).map((p) => (
                <div key={p.minutes} className="rm-grad lift p-4" style={{ "--top": PRESET_HUES[p.minutes][0], "--deep": PRESET_HUES[p.minutes][1] } as CSSProperties}>
                  <p className="t-rounded text-[1.9rem] font-extrabold leading-none">
                    {p.minutes}
                    <span className="ml-0.5 text-[0.85rem] font-bold">min</span>
                  </p>
                  <p className="mt-2 text-[0.9rem] font-bold">{p.label}</p>
                </div>
              ))}
            </Reveal>
            <Reveal as="ul" stagger className="mt-8 space-y-3">
              {[
                ["Timer", "Any length, with presets, pause and extra time."],
                ["Pomodoro", "Focus, Break and Long Break cycles."],
                ["Today's focus", "Minutes focused and sessions done, at a glance."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-ink-2">
                    <span className="font-extrabold text-ink">{t}.</span> {d}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SCREENS */}
      <section id="screens" className="scroll-mt-16 overflow-hidden border-y border-line/70 bg-paper-2/60 py-20 md:py-28">
        <div className="container-rm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader eyebrow={`Rise Mission ${LIVE_VERSION}`} title="Every screen, redesigned." />
            <Link href="/gallery" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-ink hover:text-accent">
              Screenshots &amp; videos <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <Carousel label="App screenshots" cardWidth="min(60vw, 260px)" padTop="28px" autoplay={3000} perView={5} className="mt-4">
          {SCREENS.map((s) => (
            <figure key={s.id} className="px-1">
              <Phone src={s.src} alt={s.alt} sizes="(max-width: 640px) 64vw, 260px" />
            </figure>
          ))}
        </Carousel>
      </section>

      <div aria-hidden className="rm-divider mt-0" />

      {/* FAIR + PRIVATE */}
      <Section id="fair">
        <SectionHeader eyebrow="Reliable, fair and private" title="Tough, never a trap." lead="Honest about what an alarm app can and can't do." />
        <Reveal stagger className="mt-12 grid gap-4 lg:grid-cols-3">
          <FairCard icon="3d-bell" tint="#F5A623" title="It rings for real">
            {FACTS.ringsOnSilent} <span className="text-muted">{FACTS.poweredOff}</span>
          </FairCard>
          <FairCard icon="3d-shield" tint="#00B865" title="A way out, always">
            {FACTS.backupChallenge} {FACTS.emergencyDismiss}
          </FairCard>
          <FairCard icon="3d-lock" tint="#2F5BFF" title="Private by design" chips={PRIVACY_COPY.badges}>
            {FACTS.onDevice} No account, and your alarms and history stay on your iPhone.
          </FairCard>
        </Reveal>
        <Reveal className="rm-card mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <Icon3D name="3d-clock" size={56} />
          <p className="flex-1 text-ink-2">
            <span className="font-extrabold text-ink">The honest part: </span>
            {FACTS.systemStop}
          </p>
        </Reveal>
        <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {[
            ["/rise-mission-vs-apple-clock", "Rise Mission vs the iPhone Clock app"],
            ["/compatibility", "Which iPhones it runs on"],
            ["/privacy", "Privacy policy"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-bold text-accent hover:underline">
                {label} <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 30-SECOND REEL */}
      <section className="container-rm pb-20 md:pb-28">
        <Reveal className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="t-eyebrow justify-center">Watch</p>
            <h2 className="t-h2 mt-3">Rise Mission in 30 seconds</h2>
          </div>
          <div className="rm-card mt-8 p-1.5 sm:p-2">
            <LazyVideo
              video={REEL_16X9_VIDEO}
              width={1920}
              height={1080}
              className="aspect-video w-full rounded-[18px] bg-paper-2"
              label="Animated explainer: the alarm rings on Silent, you pick a wake-up challenge, prove you're awake, and build a streak"
            />
          </div>
        </Reveal>
      </section>

      {/* TOOLS + GUIDES (internal linking hub) */}
      <Section tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Free tools & guides" title="Wake up on the first alarm." />
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-ink hover:text-accent">
            All articles <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <Reveal stagger className="mt-12 grid gap-4 lg:grid-cols-3">
          <Link href="/sleep-calculator" className="rm-grad lift group flex flex-col justify-between p-7 lg:row-span-2" style={{ "--top": "#3B3F8F", "--deep": "#23265E" } as CSSProperties}>
            <div>
              <Icon3D name="3d-moon" size={80} className="icon3d-hover -ml-1" />
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight">Sleep cycle calculator</h3>
              <p className="mt-2 text-white/85">Find the bedtime that lines your alarm up with the end of a sleep cycle. Free, no sign-up.</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 font-bold">
              Open the calculator <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
          {posts.map((p) => (
            <Link key={p.slug} href={postPath(p.slug)} className="rm-card lift group p-6">
              <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.1em] text-accent">{p.eyebrow}</p>
              <h3 className="t-h3 mt-2 decoration-1 underline-offset-[3px] group-hover:underline">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-[0.92rem] text-ink-2">{p.description}</p>
            </Link>
          ))}
          <div className="rounded-[24px] border border-dashed border-line p-6">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.1em] text-muted">Browse by topic</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {BLOG_TOPICS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/blog/topic/${t.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-3.5 text-[0.88rem] font-semibold text-ink-2 transition-colors duration-150 hover:border-ink/20 hover:text-ink">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Faq items={FAQ} />

      {/* FINAL CTA: the welcome scene (clay brand tile + icon orbit) on the app's blue band */}
      <section className="container-rm pb-4">
        <CtaBand
          placement="home-final"
          title="Wake up on your terms."
          body="Prove you're actually up, then the alarm stops. Set it tonight, try the test alarm, and make tomorrow the first morning you don't snooze."
          note={`${PRICING_COPY.short} · iOS 26 or later`}
          className="!pt-4"
          heading
        >
          <div className="relative mx-auto h-[260px] max-w-[420px] sm:h-[300px]">
            <Orbit icons={["3d-dumbbell", "3d-calculator", "3d-clock", "3d-pencil", "3d-camera", "3d-puzzle"]} bubble={60} period={70} className="[--rx:125px] [--ry:92px] sm:[--rx:160px] sm:[--ry:104px]">
              <div className="rm-float">
                <ClayTile size={108} />
              </div>
            </Orbit>
          </div>
        </CtaBand>
      </section>

      <StickyCta />
    </>
  );
}

/** Statistics tab "Level" card (StatisticsView): rank, XP bar, ladder, how you earn XP. */
function LevelCard() {
  const xp = 96;
  const next = RANKS[1];
  return (
    <article className="rm-card p-6" aria-label="Example level card from the app">
      <div className="flex items-center gap-4">
        <Icon3D name={RANKS[0].icon3d} size={88} />
        <div>
          <p className="t-eyebrow">Level 1</p>
          <p className="mt-1 text-[1.7rem] font-extrabold leading-tight tracking-tight">{RANKS[0].name}</p>
          <p className="text-[0.9rem] font-semibold text-muted">{xp} XP total</p>
        </div>
      </div>
      <div className="rm-bar mt-5">
        <span style={{ "--v": xp / next.xp } as CSSProperties} />
      </div>
      <p className="mt-2 flex justify-between text-[0.85rem] font-bold text-muted">
        <span>
          {next.xp - xp} XP to {next.name}
        </span>
        <span className="t-rounded">
          {xp}/{next.xp}
        </span>
      </p>
      <ul className="mt-5 flex justify-between gap-1" aria-label="Rank ladder">
        {RANKS.map((r, i) => (
          <li key={r.name} className="flex flex-col items-center gap-1">
            <span className={`grid h-11 w-11 place-items-center rounded-full ${i === 0 ? "bg-accent-soft ring-2 ring-accent" : "bg-paper-2 grayscale"}`}>
              <Icon3D name={r.icon3d} size={28} alt={r.name} className={i === 0 ? "" : "opacity-60"} />
            </span>
            <span className="t-rounded text-[0.72rem] font-bold text-muted">{r.xp.toLocaleString("en-US")}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-line pt-4">
        <p className="font-extrabold">How you earn XP</p>
        <dl className="mt-2 space-y-1.5 text-[0.92rem]">
          {[
            ["Every wake-up", `+${XP_RULES.base}`],
            ["On time, no snooze", `+${XP_RULES.onTimeBonus}`],
            ["Morning routine done", `+${XP_RULES.routineBonus}`],
            ["Streak bonus (3, 7, 14+ days)", "up to ×2"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-ink-2">{k}</dt>
              <dd className="t-rounded font-extrabold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/** Home "streak" card: 3D fire, week dots, next-badge bar. */
function StreakCard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <article className="rm-card flex flex-col p-6" aria-label="Example streak card from the app">
      <div className="flex items-center gap-4">
        <Icon3D name="3d-fire" size={80} />
        <div>
          <p className="text-[1.7rem] font-extrabold leading-tight tracking-tight">6 day streak</p>
          <p className="font-semibold text-muted">Wake with a mission to keep it burning.</p>
        </div>
      </div>
      <ol className="mt-6 flex justify-between" aria-label="This week">
        {days.map((d, i) => (
          <li
            key={i}
            aria-label={i < 6 ? "Done" : "Today"}
            className={`grid h-10 w-10 place-items-center rounded-full text-[0.8rem] font-extrabold sm:h-11 sm:w-11 ${i < 6 ? "bg-good text-white" : "border-2 border-accent text-ink"}`}
          >
            {i < 6 ? <Check aria-hidden className="h-4 w-4" strokeWidth={3.5} /> : d}
          </li>
        ))}
      </ol>
      <div className="mt-6 border-t border-line pt-4">
        <p className="flex items-center gap-2.5 text-[0.95rem]">
          <Icon3D name="3d-calendar" size={30} />
          <span className="flex-1 text-ink-2">
            Next badge: <span className="font-extrabold text-ink">Week Warrior</span>
          </span>
          <span className="font-extrabold text-ink">in 1 day</span>
        </p>
        <div className="rm-bar mt-3">
          <span style={{ "--v": 6 / 7, "--fill": "var(--sun)" } as CSSProperties} />
        </div>
      </div>
      <div className="mt-auto flex items-center gap-3 rounded-2xl bg-paper-2/70 p-3 pt-3">
        <Icon3D name="3d-rocket" size={44} />
        <p className="text-[0.9rem] leading-snug">
          <span className="block font-extrabold">7-Day Rise Challenge</span>
          <span className="text-ink-2">Wake up with a mission 7 times in the next 10 days.</span>
        </p>
      </div>
    </article>
  );
}

function FairCard({ icon, title, tint, chips, children }: { icon: Icon3DName; title: string; tint: string; chips?: readonly string[]; children: React.ReactNode }) {
  return (
    <div className="rm-card rm-tint-card lift group flex flex-col p-6" style={{ "--tint": tint } as CSSProperties}>
      <span className="rm-icon-tile h-[76px] w-[76px] !rounded-[20px]">
        <Icon3D name={icon} size={60} className="icon3d-hover" />
      </span>
      <h3 className="mt-4 text-[1.2rem] font-extrabold tracking-tight">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{children}</p>
      {chips && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <li key={c} className="rm-chip">
              <Check aria-hidden className="h-3 w-3 text-good" strokeWidth={3} /> {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
