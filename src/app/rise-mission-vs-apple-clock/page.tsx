import Image from "next/image";
import Link from "next/link";
import { Answer, H2, Limits, Sources, type Source } from "@/components/blog/prose";
import { AppStoreButton } from "@/components/site/app-store-button";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { GALLERY_SHOTS } from "@/lib/media";
import { faqPageLd, mobileApplicationLd, type QA, staticPageMetadata } from "@/lib/seo";
import { ACHIEVEMENT_COUNT, CHALLENGES, FACTS, MIN_IOS, PRICING_COPY, PRIVACY_COPY } from "@/lib/site";

/**
 * Commercial comparison: "alarm app vs iPhone Clock", "is an alarm app worth it",
 * "alarm app better than iPhone alarm". Spec: docs/AUDIT-2026-11-15.md §E.2.
 * Apple Clock facts come only from Apple's own support pages (SOURCES below).
 */

const PATH = "/rise-mission-vs-apple-clock";
const UPDATED = "2026-11-17";

export const metadata = staticPageMetadata(PATH);

const SRC_APPLE = {
  alarms: { label: "Apple Support. How to set and change alarms on your iPhone", href: "https://support.apple.com/en-us/118444" },
  models: {
    label: "Apple. iPhone models compatible with iOS 26 (iPhone User Guide)",
    href: "https://support.apple.com/guide/iphone/iphone-models-compatible-with-ios-26-iphe3fa5df43/26/ios/26",
  },
  alarmKit: { label: "Apple Developer Documentation. AlarmKit", href: "https://developer.apple.com/documentation/alarmkit" },
  wwdc: { label: "Apple Developer. Wake up to the AlarmKit API (WWDC25 session 230)", href: "https://developer.apple.com/videos/play/wwdc2025/230/" },
} satisfies Record<string, Source>;

const physical = CHALLENGES.filter((c) => c.kind === "physical").map((c) => c.name);
const mental = CHALLENGES.filter((c) => c.kind === "mental").map((c) => c.name);

const ROWS: { label: string; clock: string; rm: string }[] = [
  { label: "Price", clock: "Free, preinstalled on every iPhone", rm: PRICING_COPY.short },
  { label: "iOS version", clock: "Every iPhone", rm: `${MIN_IOS} or later (built on AlarmKit)` },
  { label: "How you stop it", clock: "One tap on Stop", rm: "Finish a wake-up challenge (the iOS Stop button is still there)" },
  { label: "Snooze", clock: "On or off per alarm, with a Snooze Duration you choose", rm: "Optional and limited per alarm; Snooze Tax makes each snooze cost more" },
  { label: "Rings on Silent / Do Not Disturb", clock: "Yes, per Apple", rm: "Yes, AlarmKit alarms break through Silent and Focus" },
  { label: "Set by Siri", clock: "Yes", rm: "No, set it in the app" },
  { label: "Wake-up challenges", clock: "None", rm: `${FACTS.challengeCount}, from push-ups to math` },
  { label: "Wake-up history & streaks", clock: "No", rm: `Yes: streaks, levels and XP, ${ACHIEVEMENT_COUNT} achievements, completion rate, snoozes per wake-up` },
  { label: "Account / ads", clock: "No account, no ads", rm: "No account, no ads (usage analytics, not linked to you)" },
];

const FAQ: QA[] = [
  {
    q: "Is an alarm app better than the iPhone's built-in alarm?",
    a: "Only if the built-in alarm isn't working for you. If you wake on the first ring, the Clock app is free, preinstalled and reliable. If you tap Stop or Snooze without really waking up, an app that asks you to do something first, like Rise Mission's wake-up challenges, fixes the specific problem Clock can't.",
  },
  {
    q: "Can I stop a Rise Mission alarm without doing the challenge?",
    a: FACTS.systemStop,
  },
  {
    q: "Does Rise Mission ring on Silent like the Clock app?",
    a: `Yes. ${FACTS.ringsOnSilent} ${FACTS.poweredOff}`,
  },
  {
    q: "Can I use Rise Mission and the Clock app together?",
    a: "Yes, and for important mornings in your first week we recommend it: keep a Clock alarm set ten minutes after your Rise Mission alarm as a backup, then delete it once you trust the new routine.",
  },
  {
    q: "Which iPhones can run Rise Mission?",
    a: `${FACTS.minIOS} If your iPhone can't update to iOS 26, the Clock app is still the right alarm for it.`,
  },
  {
    q: "How much does Rise Mission cost compared with Clock?",
    a: `The Clock app is free. ${PRICING_COPY.long}`,
  },
];

export default function VsAppleClockPage() {
  const ringing = GALLERY_SHOTS[0];
  const stats = GALLERY_SHOTS[5];
  return (
    <>
      <JsonLd
        data={[
          mobileApplicationLd(
            "Rise Mission is an iPhone alarm clock app (iOS 26+) where you stop the alarm by completing a wake-up challenge. Free to download; Rise Mission Pro unlocks the app.",
          ),
          faqPageLd(FAQ),
        ]}
      />
      <Breadcrumbs path="/rise-mission-vs-apple-clock" />

      <section className="sunrise-glow dawn">
        <div className="container-rm pb-10 pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="t-eyebrow">
              Comparison · Updated <time dateTime={UPDATED}>November 17, 2026</time>
            </p>
            <h1 className="t-h1 mt-3">Rise Mission vs the iPhone Clock app: when the built-in alarm isn&apos;t enough</h1>
            <p className="t-lead mt-4">
              We make Rise Mission, so here is the honest version: for most people the free Clock app is the right alarm. This
              page is about the mornings when it isn&apos;t.
            </p>
          </div>
        </div>
      </section>

      <div className="container-rm">
        <div className="prose-rm mx-auto max-w-3xl">
          <Answer>
            <strong>Keep the iPhone Clock app if you wake up on the first ring; switch to Rise Mission if you stop or snooze it half-asleep.</strong>{" "}
            Clock is free, preinstalled and rings on Silent. Rise Mission also rings on Silent, but asks you to finish a wake-up
            challenge first, such as camera-counted push-ups. It needs {MIN_IOS} and Pro.
          </Answer>

          <H2>How do Rise Mission and the Clock app compare?</H2>
          <p>
            The table below uses Apple&apos;s own support page for the Clock column and the live App Store version of Rise
            Mission for ours. Rows where Clock wins are not hidden.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>iPhone Clock app</th>
                  <th>Rise Mission</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label}>
                    <td>
                      <strong>{r.label}</strong>
                    </td>
                    <td>{r.clock}</td>
                    <td>{r.rm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H2>What does the iPhone Clock alarm do well?</H2>
          <p>
            More than people give it credit for. According to Apple, each Clock alarm can repeat on chosen days, carry a label,
            play a sound you pick, and show a Snooze option with a Snooze Duration you set. You can also ask Siri to set one (
            <a href={SRC_APPLE.alarms.href}>Apple Support</a>). Apple is explicit that Do Not Disturb, the Ring/Silent switch and
            Silent mode don&apos;t affect the alarm sound, so the alarm still sounds when your phone is muted. We cover the
            details in <Link href="/blog/does-iphone-alarm-ring-on-silent">does the iPhone alarm ring on Silent?</Link>
          </p>
          <p>
            It also costs nothing, needs no download, works on every iPhone and never asks you to sign up for anything. If your
            alarm already gets you out of bed, none of the features below are worth paying for.
          </p>

          <H2>Where does the built-in alarm fall short?</H2>
          <p>
            In one place: it trusts whoever presses the button. Stop is a single tap and Snooze is a single tap. Both are easy
            to do with your eyes half-closed, and the part of your brain that would object isn&apos;t fully online yet. That
            groggy window has a name, <Link href="/blog/sleep-inertia">sleep inertia</Link>, and it explains why so many people
            turn an alarm off with no memory of doing it.
          </p>
          <p>
            Clock also keeps no record. It can&apos;t tell you that you snoozed four times on Tuesday or that you&apos;ve got up
            on time nine mornings in a row. If you&apos;re trying to change a habit, that feedback loop is missing. If an alarm
            doesn&apos;t sound at all, that&apos;s a different problem; start with{" "}
            <Link href="/blog/iphone-alarm-not-going-off">why an iPhone alarm doesn&apos;t go off</Link>.
          </p>

          <H2>What does Rise Mission add on top of Clock?</H2>
          <p>
            A step between the alarm and going back to sleep. When a Rise Mission alarm rings, you tap Start Challenge and
            finish a task you chose the night before. There are {FACTS.challengeCount}: body challenges ({physical.join(", ")})
            and brain challenges ({mental.join(", ")}). Finishing one takes either your feet on the floor or a working brain, so
            by the time it&apos;s done, you&apos;re awake.
          </p>
        </div>

        <figure className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {[ringing, stats].map((s) => (
            <div key={s.src}>
              <Image
                src={s.src}
                alt={s.alt}
                width={1320}
                height={2868}
                sizes="(max-width: 640px) 90vw, 360px"
                className="mx-auto h-auto w-full max-w-[300px] rounded-[1.6rem] border border-line"
              />
              <figcaption className="mx-auto mt-3 max-w-[300px] text-center text-[0.9rem] text-muted">{s.caption}</figcaption>
            </div>
          ))}
        </figure>

        <div className="prose-rm mx-auto mt-10 max-w-3xl">
          <p>Around that core, the live version adds:</p>
          <ul>
            <li>
              <strong>Limited snooze with Snooze Tax.</strong> {FACTS.snooze}
            </li>
            <li>
              <strong>A record of every morning.</strong> Streaks, completion rate and snoozes per wake-up, so you can see
              whether it&apos;s working.
            </li>
            <li>
              <strong>A fair backup.</strong> {FACTS.backupChallenge}
            </li>
            <li>
              <strong>A safe way to practise.</strong> {FACTS.testAlarm}
            </li>
            {FACTS.v15Features.slice(0, 3).map((f) => (
              <li key={f}>{f}.</li>
            ))}
          </ul>
          <p>
            Camera challenges stay on the phone: {FACTS.onDevice} See{" "}
            <Link href="/blog/wake-up-challenges-explained">which wake-up challenge suits you</Link> for help choosing.
          </p>

          <H2>Can you just turn a Rise Mission alarm off?</H2>
          <p>
            Yes, and we&apos;d rather you hear it from us. {FACTS.systemStop} That isn&apos;t something an App Store alarm can
            change: iOS presents alarms from apps built on Apple&apos;s AlarmKit with its own system controls (
            <a href={SRC_APPLE.alarmKit.href}>Apple Developer</a>). {FACTS.emergencyDismiss}
          </p>
          <p>
            So the honest difference from Clock is not that Rise Mission is impossible to stop. It&apos;s that stopping it
            properly takes a deliberate choice instead of a reflex, and skipping the challenge shows up in your history. For a
            lot of people, that is enough friction to break the snooze habit. If you need a physical barrier, put the phone
            across the room or use a <Link href="/blog/qr-code-alarm-clock">QR code in another room</Link>.
          </p>

          <H2>Who should stay with the Clock app?</H2>
          <ul>
            <li>
              <strong>You already wake on the first alarm.</strong> There is nothing to fix.
            </li>
            <li>
              <strong>Your iPhone can&apos;t run iOS 26.</strong> Apple lists the iPhone 11 and later, plus the iPhone SE (2nd
              generation) and later, as compatible with iOS 26 (<a href={SRC_APPLE.models.href}>Apple</a>). Older phones can&apos;t
              install Rise Mission.
            </li>
            <li>
              <strong>You don&apos;t want to pay for an alarm.</strong> Rise Mission is free to download, but Pro unlocks the
              app. Clock is free forever.
            </li>
            <li>
              <strong>You need hands-free setup.</strong> Clock alarms can be set by Siri; Rise Mission alarms are set in the
              app.
            </li>
          </ul>

          <H2>Who is Rise Mission for?</H2>
          <ul>
            <li>
              <strong>Chronic snoozers.</strong> If you hit Snooze more than once most mornings, the{" "}
              <Link href="/snooze-calculator">snooze calculator</Link> shows what that costs you in a year.
            </li>
            <li>
              <strong>Heavy sleepers</strong> who switch off alarms without remembering it. Start with{" "}
              <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up as a heavy sleeper</Link>.
            </li>
            <li>
              <strong>People with mornings that matter:</strong> early shifts, flights, classes or workouts, where waking up on
              the first alarm is the whole point.
            </li>
          </ul>
          <p>
            If you&apos;re comparing paid alarm apps rather than Clock, read{" "}
            <Link href="/blog/best-alarm-apps-for-heavy-sleepers">the best alarm apps for heavy sleepers</Link> or{" "}
            <Link href="/blog/rise-mission-vs-alarmy">Rise Mission vs Alarmy</Link>.
          </p>

          <H2>How do you switch from Clock without risking a late morning?</H2>
          <ol>
            <li>Install Rise Mission, allow alarms when it asks, and pick a challenge you can do in your bedroom.</li>
            <li>Run the test alarm tonight. {FACTS.testAlarm}</li>
            <li>Keep your Clock alarm, but move it ten minutes after the Rise Mission alarm as a safety net.</li>
            <li>
              After a week of on-time mornings, turn the Clock alarm off. Line your alarm up with a full sleep cycle using the{" "}
              <Link href="/sleep-calculator">sleep calculator</Link>.
            </li>
          </ol>

          <Limits>
            <p>
              No alarm app can ring on a phone that is powered off or out of battery, and neither app fixes too little sleep.
              Rise Mission is a commitment device, not a lock: anyone determined to go back to sleep can use the system Stop
              button. Privacy: {PRIVACY_COPY.long} If you sleep through every alarm or feel exhausted after a full night, talk to
              a doctor; that can be a sleep disorder, not an alarm problem.
            </p>
          </Limits>

          <Sources items={Object.values(SRC_APPLE)} />
        </div>
      </div>

      <Faq items={FAQ} />

      <section className="container-rm">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-card p-8 text-center shadow-soft">
          <p className="t-h2 !text-2xl">Keep Clock as your backup. Try a morning you can&apos;t sleepwalk through.</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">
            iPhone · {MIN_IOS} or later · {PRICING_COPY.short}
          </p>
          <div className="mt-6 flex justify-center">
            <AppStoreButton placement="vs-apple-clock" />
          </div>
        </div>
      </section>
    </>
  );
}
