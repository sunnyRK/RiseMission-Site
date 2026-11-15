import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { DemoVideo } from "@/components/site/demo-video";
import { Faq } from "@/components/site/faq";
import { IconTile } from "@/components/site/icons";
import { Section, SectionHeader } from "@/components/site/section";
import { ShotCard } from "@/components/site/shot-card";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_TOPICS, postPath, sortedPosts } from "@/lib/blog";
import type { NavIcon } from "@/lib/nav";
import { demoVideoLd, reelVideoLd, faqPageLd, mobileApplicationLd, organizationLd, pageMetadata, webSiteLd, type QA } from "@/lib/seo";
import { CHALLENGE_GUIDES, CHALLENGES, FACTS, LIVE_VERSION, PRICING_COPY, PRIVACY_COPY } from "@/lib/site";

const DESCRIPTION =
  "Rise Mission is the iPhone alarm clock for heavy sleepers. When it rings, you prove you're awake with a challenge: push-ups, a walk, a QR scan, math or your voice.";

export const metadata = pageMetadata({
  title: "Rise Mission: Alarm Clock for Heavy Sleepers",
  absoluteTitle: true,
  description: "The iPhone alarm that makes you prove you're awake: push-ups, a walk, a QR scan, math or voice. Rings on Silent. Requires iOS 26 or later.",
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
  { q: "Is my camera and voice data private?", a: PRIVACY_COPY.long },
  { q: "What if the camera can't see me or I'm sick?", a: `${FACTS.backupChallenge} ${FACTS.emergencyDismiss}` },
  { q: "How much does Rise Mission cost?", a: PRICING_COPY.long },
  {
    q: "Who is Rise Mission for?",
    a: "Heavy sleepers and chronic snoozers: anyone who can switch off a normal alarm in their sleep. It's especially useful if you have early workouts, classes, shifts or flights, where waking up on the first alarm actually matters.",
  },
];

const STEPS = [
  { n: "01", t: "Set your alarm", d: "Pick a time, the days, and a wake-up challenge with a difficulty that suits you." },
  { n: "02", t: "It rings, for real", d: "AlarmKit rings on the Lock Screen, in Silent and in Focus, even with the app closed." },
  { n: "03", t: "Prove you're up", d: "Finish the challenge to stop it. Your streak grows and your brain is already online." },
];

const ICON: Record<string, NavIcon> = {
  "push-ups": "pushups", squats: "squats", walk: "walk", shake: "shake", "object-find": "object",
  "qr-code": "qr", voice: "voice", math: "math", typing: "typing", memory: "memory",
};

export default function HomePage() {
  const posts = sortedPosts().slice(0, 3);
  return (
    <>
      <JsonLd data={[organizationLd(), webSiteLd(), mobileApplicationLd(DESCRIPTION), demoVideoLd(), reelVideoLd(), faqPageLd(FAQ)]} />

      {/* HERO — compact centered pitch, then the demo video as the visual hero */}
      <section className="sunrise-glow dawn relative overflow-hidden">
        <div className="container-rm pt-8 text-center sm:pt-10 md:pt-12">
          <Link
            href="#whats-new"
            className="fade-up inline-flex items-center gap-2 rounded-full border border-line bg-card/80 py-1 pl-1 pr-3 text-[0.82rem] text-ink-2 shadow-[0_1px_2px_rgb(22_20_31/0.05)] backdrop-blur transition hover:border-ink/20"
          >
            <span className="whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[0.72rem] font-semibold text-accent-ink">New in {LIVE_VERSION}</span>
            <span className="whitespace-nowrap">
              Morning Briefing<span className="hidden sm:inline">, widgets &amp; Live Activities</span>
            </span>
            <ArrowRight aria-hidden className="h-3.5 w-3.5 text-muted" />
          </Link>

          <h1 className="fade-up mx-auto mt-5 max-w-5xl text-[clamp(2.4rem,1.3rem+3.3vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.045em] text-ink">
            The alarm that makes you <span className="hl">prove</span> you&apos;re awake.
          </h1>

          <p className="fade-up t-lead mx-auto mt-4 max-w-[38rem]">
            When it rings, you finish a wake-up challenge: push-ups counted by your camera, a walk, a QR code across the room,
            math or your voice. By the time you&apos;re done, you&apos;re up.
          </p>

          <div className="fade-up mx-auto mt-7 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <AppStoreButton placement="home-hero" size="lg" className="justify-center" />
            <Link
              href="#how-it-works"
              className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[14px] border border-line bg-card px-6 font-semibold text-ink transition hover:border-ink/20"
            >
              How it works <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <ul className="fade-up mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.85rem] text-muted">
            {["iPhone · iOS 26 or later", PRICING_COPY.short, PRIVACY_COPY.badges[0], "Rings on Silent & Focus"].map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-good" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Stage: the demo video, big and above the fold, with app screens overlapping its edges */}
        <div className="container-rm relative mt-8 pb-16 md:mt-10 md:pb-24">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[12%] mx-auto h-[70%] max-w-5xl rounded-full bg-gradient-to-r from-sun/25 via-coral/20 to-accent/25 blur-3xl" />
          <div className="relative mx-auto max-w-[1040px]">
            <div className="rounded-[22px] border border-line bg-card/90 p-1.5 shadow-[0_40px_80px_-30px_rgb(22_20_31/0.45)] backdrop-blur sm:rounded-[28px] sm:p-2.5">
              <DemoVideo className="!rounded-[16px] sm:!rounded-[20px]" />
            </div>
            <ShotCard
              src="/assets/screens/rise-mission-alarm-ringing-screen.jpg"
              alt="Rise Mission ringing screen at 6:30 AM with a Start Challenge button"
              className="absolute -left-14 bottom-[-12%] hidden w-[19%] -rotate-[7deg] xl:block"
              sizes="200px"
            />
            <ShotCard
              src="/assets/screens/rise-mission-push-up-alarm-camera-counts-reps.jpg"
              alt="Camera counting push-ups on the floor to dismiss the alarm"
              className="absolute -right-14 bottom-[-12%] hidden w-[19%] rotate-[7deg] xl:block"
              sizes="200px"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works">
        <SectionHeader eyebrow="How it works" title="Three steps to a morning you don't negotiate with." />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-card p-7">
              <span className="font-mono text-sm text-muted">{s.n}</span>
              <h3 className="t-h3 mt-6">{s.t}</h3>
              <p className="mt-2 text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 30-SECOND REEL */}
      <section className="container-rm pb-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="t-eyebrow justify-center">Watch</p>
            <h2 className="t-h2 mt-3">Rise Mission in 30 seconds</h2>
          </div>
          <div className="mt-8 rounded-[24px] border border-line bg-card p-1.5 shadow-soft sm:p-2">
            <video
              className="aspect-video w-full rounded-[18px] bg-paper-2"
              poster="/assets/reel/rise-mission-reel-16x9-poster.jpg"
              controls
              muted
              playsInline
              preload="none"
              width={1920}
              height={1080}
              aria-label="Animated explainer: the alarm rings on Silent, you pick a wake-up challenge, prove you're awake, and build a streak"
            >
              <source src="/assets/reel/rise-mission-reel-16x9.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="mt-5 text-center">
            <Link href="/gallery" className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
              More screenshots &amp; videos <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* CHALLENGES */}
      <Section id="challenges" tone="tint">
        <SectionHeader
          eyebrow={`${FACTS.challengeCount} wake-up challenges`}
          title="Prove you're awake, your way."
          lead="Body challenges get you out of bed. Brain challenges get your head online. Pair one of each, and the backup takes over if the camera can't see you."
        />
        <p className="mt-4">
          <Link href="/blog/wake-up-challenges-explained" className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
            Which challenge suits you? <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CHALLENGES.map((c) => (
            <li key={c.slug} id={`challenge-${c.slug}`} className="scroll-mt-24 rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center justify-between">
                <IconTile name={ICON[c.slug]} size="md" tone="accent" />
                <span className="text-[0.75rem] font-medium text-muted">{c.kind === "physical" ? "Body" : "Brain"}</span>
              </div>
              <h3 className="t-h3 mt-4">{c.name}</h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2">{c.how}</p>
              {CHALLENGE_GUIDES[c.slug] && (
                <Link href={CHALLENGE_GUIDES[c.slug]} className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent hover:underline">
                  Read the guide <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* FAIR BY DESIGN */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 mx-auto flex w-full max-w-md gap-5 lg:order-1">
            <ShotCard src="/assets/screens/rise-mission-object-find-and-voice-challenge.jpg" alt="Object Find and Voice affirmation challenges" className="w-1/2" />
            <ShotCard src="/assets/screens/rise-mission-wake-up-streak-statistics.jpg" alt="Wake-up history calendar and statistics with streaks" className="mt-14 w-1/2" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader eyebrow="Fair by design" title="Tough, never a trap." />
            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Feature title="A backup for every body challenge">{FACTS.backupChallenge}</Feature>
              <Feature title="Emergency dismiss, always">{FACTS.emergencyDismiss}</Feature>
              <Feature title="Private by design">{FACTS.onDevice}</Feature>
              <Feature title="Practice before tomorrow">{FACTS.testAlarm}</Feature>
            </dl>
          </div>
        </div>
      </Section>

      {/* NEW IN 1.5 */}
      <section id="whats-new" className="container-rm scroll-mt-24">
        <div className="rounded-[28px] bg-ink px-6 py-12 text-paper sm:px-12">
          <p className="t-eyebrow !text-paper/60">What&apos;s new
          </p>
          <h2 className="t-h2 mt-3 !text-paper">Version {LIVE_VERSION}</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.v15Features.map((f) => (
              <li key={f} className="flex gap-3 text-paper/80">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sun" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TOOLS + GUIDES (internal linking hub) */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Free tools & guides" title="Wake up on the first alarm." />
          <Link href="/blog" className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-accent">
            All articles <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Link href="/sleep-calculator" className="group flex flex-col justify-between rounded-2xl bg-accent p-7 text-accent-ink transition hover:-translate-y-0.5 lg:row-span-2">
            <div>
              <IconTile name="moon" size="lg" tone="inverse" />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Sleep cycle calculator</h3>
              <p className="mt-2 opacity-85">Find the bedtime that lines your alarm up with the end of a sleep cycle. Free, no sign-up.</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 font-semibold">
              Open the calculator <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          {posts.map((p) => (
            <Link key={p.slug} href={postPath(p.slug)} className="group rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="text-[0.8rem] font-medium text-accent">{p.eyebrow}</p>
              <h3 className="t-h3 mt-2 group-hover:underline">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-[0.92rem] text-ink-2">{p.description}</p>
            </Link>
          ))}
          <div className="rounded-2xl border border-dashed border-line p-6">
            <p className="text-[0.8rem] font-medium text-muted">Browse by topic</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {BLOG_TOPICS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/blog/topic/${t.slug}`} className="inline-block rounded-full border border-line bg-card px-3 py-1.5 text-[0.88rem] text-ink-2 hover:text-ink">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Faq items={FAQ} />

      {/* FINAL CTA */}
      <section className="container-rm mt-24">
        <div className="sunrise-glow rounded-[28px] border border-line bg-card px-6 py-16 text-center">
          <h2 className="t-h2 mx-auto max-w-2xl">
            Wake up without <span className="hl">negotiating</span> with yourself.
          </h2>
          <p className="t-lead mx-auto mt-4 max-w-lg">Set it tonight, try the test alarm, and make tomorrow the first morning you don&apos;t snooze.</p>
          <div className="mt-8 flex justify-center">
            <AppStoreButton placement="home-final" size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="t-h3">{title}</dt>
      <dd className="mt-1.5 text-ink-2">{children}</dd>
    </div>
  );
}
