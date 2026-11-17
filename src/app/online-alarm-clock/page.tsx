import Link from "next/link";
import { Answer, H2, Limits, Sources, type Source } from "@/components/blog/prose";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { OnlineAlarmClock } from "@/components/tools/online-alarm-clock";
import { MoreTools, ToolCard, ToolCta, ToolHero } from "@/components/tools/tool-shell";
import { TOOL_ICON3D } from "@/components/site/page-icons";
import { PROBLEMS_TO_STOP } from "@/lib/alarm-clock";
import { faqPageLd, type QA, staticPageMetadata } from "@/lib/seo";
import { FACTS, SITE_URL } from "@/lib/site";
import { SRC } from "@/lib/sources";

export const metadata = staticPageMetadata("/online-alarm-clock");

/** Page-local sources, each fetched and read on 2026-11-15. */
const WEB: Record<string, Source> = {
  mdnTimers: {
    label: "MDN Web Docs. setTimeout(): reasons for delays longer than specified (inactive tabs)",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
  },
  mdnAutoplay: {
    label: "MDN Web Docs. Autoplay guide for media and Web Audio APIs",
    href: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay",
  },
  mdnWakeLock: {
    label: "MDN Web Docs. Screen Wake Lock API",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API",
  },
  mdnNotifications: {
    label: "MDN Web Docs. Using the Notifications API",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API",
  },
};

const FAQ: QA[] = [
  {
    q: "Does the online alarm clock work if I close the tab?",
    a: "No. The alarm lives in the open tab, so closing the tab or the browser stops it. The time you set is saved in your browser, and if you come back after it passed, the page tells you it couldn't ring.",
  },
  {
    q: "Will a browser alarm ring if my laptop goes to sleep?",
    a: "No. A sleeping or powered-off computer doesn't run web pages, so no browser alarm can ring. Plug the laptop in, keep the lid open and turn on Keep screen awake, or use a phone alarm for anything important.",
  },
  {
    q: "Why do I have to click before the alarm can make sound?",
    a: "Browsers block web audio until you interact with the page, so tabs can't start blaring on their own. Clicking Set alarm or Test sound gives the page permission to play the alarm later.",
  },
  {
    q: "How does the math challenge stop the alarm?",
    a: `When the alarm rings it shows an arithmetic problem. Answer ${PROBLEMS_TO_STOP} correctly and the sound stops. A wrong answer swaps in a new problem, so you can't guess your way out. Turn the challenge off for a plain Stop button.`,
  },
];

const BEHAVIOUR: [string, string, string][] = [
  ["Tab open and visible", "Yes, on time", "The page checks the clock every second."],
  ["Another tab or window in front", "Yes", "The tone is queued on the audio clock in advance, which keeps time even when background timers slow down."],
  ["Browser minimised", "Usually yes", "Same as a background tab, as long as the computer stays awake."],
  ["Screen locked, computer awake", "Depends", "Some systems pause audio or the browser when locked. Test it once on your setup."],
  ["Laptop asleep or lid closed", "No", "Nothing in the browser runs while the computer sleeps."],
  ["Tab or browser closed", "No", "Re-open the page and it tells you the alarm was missed."],
  ["Phone browser, screen off", "Unreliable", "Mobile browsers pause or unload background tabs. Use an alarm app."],
];

export default function OnlineAlarmClockPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Online Alarm Clock with Math Challenge",
            url: `${SITE_URL}/online-alarm-clock`,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any (web browser)",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          faqPageLd(FAQ),
        ]}
      />
      <ToolHero
        path="/online-alarm-clock"
        icon={TOOL_ICON3D["online-alarm-clock"]}
        title="Online alarm clock you stop with math"
        lead="Set an alarm in your browser for a time or a countdown. When it rings, it keeps going until you solve three quick sums, so you can't switch it off half-asleep."
      />
      <ToolCard>
        <OnlineAlarmClock />
      </ToolCard>

      <div className="prose-rm mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <Answer>
          <strong>This online alarm clock rings in your browser and stops only after you solve three arithmetic problems.</strong>{" "}
          Pick a time or a countdown, choose a tone and press Set alarm. It keeps time in background
          tabs, but keep the tab open and your computer awake: a browser alarm can&apos;t ring on a sleeping laptop or a
          closed tab.
        </Answer>

        <H2>How to use the online alarm clock</H2>
        <ol>
          <li>
            <strong>Pick a time.</strong> Type it into the big time field, or tap a preset: <em>In 5, 10 or 20 min</em> for a
            countdown from right now, or 6:00, 6:30 and 7:00 for the next time that clock time comes round. If the time has
            already passed today, the alarm is set for tomorrow.
          </li>
          <li>
            <strong>Add a label</strong> if you like (&ldquo;Leave for the train&rdquo;). It shows on the ringing screen and in
            the tab title.
          </li>
          <li>
            <strong>Choose a sound and press Test sound.</strong> All three tones are generated in your browser with the Web
            Audio API, so nothing is downloaded. Testing first also tells you whether your volume is loud enough.
          </li>
          <li>
            <strong>Leave the math challenge on</strong> (easy or medium) or switch it off for a plain Stop button.
          </li>
          <li>
            <strong>Press Set alarm.</strong> You&apos;ll see a live countdown. The alarm is saved in this browser, so a
            refresh won&apos;t lose it.
          </li>
        </ol>
        <p>
          Two optional extras sit under the settings. <strong>Desktop notification</strong> asks for permission only when you
          press its button, then pops up a notification when the alarm fires, which helps if the tab is buried behind other
          windows. <strong>Keep screen awake</strong> uses the Screen Wake Lock API to stop the screen dimming while the tab is
          visible. Neither is needed for the alarm itself.
        </p>

        <H2>Will it ring in a background tab?</H2>
        <p>
          Mostly, yes, with one hard limit: the computer has to be awake. Browsers deliberately slow down timers in tabs you
          aren&apos;t looking at to save battery. In Chrome, a page hidden for more than five minutes may have its chained
          timers checked only once a minute, and Firefox for Android can delay background timers by 15 minutes or unload the
          tab entirely (<a href={WEB.mdnTimers.href}>MDN</a>). A web alarm built on one long timer can therefore fire late
          or not at all.
        </p>
        <p>
          This one is built to cope. It never relies on a single long timer: it compares the real clock with your alarm
          time every second, and again whenever you switch back to the tab. On top of that, the moment you press Set alarm
          it queues the first minute and a half of the alarm tone on the browser&apos;s audio clock, which keeps exact time
          even while the page&apos;s timers are slowed. Here&apos;s what to expect:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Situation</th>
                <th>Rings?</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              {BEHAVIOUR.map(([s, r, w]) => (
                <tr key={s}>
                  <td>
                    <strong>{s}</strong>
                  </td>
                  <td>{r}</td>
                  <td>{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Sound needs one click first. Browsers block audio that a page tries to start before you&apos;ve interacted with
          it (<a href={WEB.mdnAutoplay.href}>MDN</a>), so the alarm unlocks audio when you press Set alarm. If you reload
          the page with an alarm pending, tap anywhere once to re-enable the sound. Likewise, notification permission is
          only requested when you click its button, which Firefox and Safari require anyway (
          <a href={WEB.mdnNotifications.href}>MDN</a>).
        </p>

        <H2>Why stop the alarm with math?</H2>
        <p>
          The first minutes after waking come with <strong>sleep inertia</strong>, a state of lowered alertness in which
          performance is temporarily worse than normal (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). That&apos;s when people tap
          &ldquo;stop&rdquo; without really waking up and drift off again. A short arithmetic problem means the alarm can&apos;t be
          silenced on autopilot. You have to read, think and type, and by the third answer you&apos;re usually sitting up
          with your eyes open.
        </p>
        <p>
          The math doesn&apos;t cure grogginess and isn&apos;t meant to be hard. Easy mode asks things like 27 + 15; medium adds
          bigger sums and times tables such as 7 × 8. A wrong answer swaps in a new problem instead of letting you retry
          the same one. For a deeper look at how mental and physical challenges compare, read{" "}
          <Link href="/blog/math-alarm-clock">how a math alarm clock works</Link> and{" "}
          <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
        </p>

        <H2>Which alarm sound should you pick?</H2>
        <p>
          There are three tones: a soft <strong>Chime</strong> arpeggio, a <strong>Classic beep</strong> and a{" "}
          <strong>Rising sweep</strong>. Evidence on alarm sounds is thin. One survey of 50 people found that sounds they
          rated as melodic were linked with less self-reported grogginess after waking, while melodically neutral sounds
          were linked with more (<a href={SRC.mcfarlane2020.href}>McFarlane et al., 2020</a>). That&apos;s self-report from a
          small sample, so treat it as a reason to try the Chime, not as proof. The beep is the one to use if you&apos;re
          worried about sleeping through it.
        </p>

        <H2>Getting the most out of a browser alarm</H2>
        <ul>
          <li>Press Test sound and set your system volume before you rely on it.</li>
          <li>Plug a laptop in and check its sleep settings so it can&apos;t sleep before the alarm time.</li>
          <li>Keep the tab in its own window, or pin it, so you don&apos;t close it by accident.</li>
          <li>
            Use the countdown presets for naps and focus blocks; our <Link href="/nap-calculator">nap calculator</Link>{" "}
            tells you how long to set.
          </li>
          <li>
            For a morning alarm, choose the time with the <Link href="/sleep-calculator">sleep cycle calculator</Link> so it
            lands at the end of a cycle.
          </li>
        </ul>

        <H2>Browser alarm or phone alarm app?</H2>
        <p>
          A browser alarm is great at a desk: a nap at lunch, a reminder to leave, a timer for a study block. It&apos;s the
          wrong tool for tomorrow morning, because your laptop will probably be asleep and a mobile browser can&apos;t ring
          with the screen off. For that you want an alarm that the phone itself guarantees. If you want the same &ldquo;prove
          you&apos;re awake&rdquo; idea there, <Link href="/">Rise Mission</Link> is our iPhone alarm: {FACTS.ringsOnSilent}{" "}
          Besides math it offers {FACTS.challengeCount} challenges in total, including push-ups counted by the camera and a
          QR code you scan in another room.
        </p>

        <Limits>
          <p>
            This page can only ring while your computer is awake, the browser is open and this tab exists. It can&apos;t
            wake a sleeping laptop, ring through a muted system volume or work reliably in a phone browser with the screen
            off. Timers in background tabs are throttled differently by every browser and can change with updates, so test
            it on your setup before you depend on it. Wake Lock and notifications aren&apos;t available in every browser (
            <a href={WEB.mdnWakeLock.href}>MDN</a>). Don&apos;t use a web page as your only alarm for a flight, a shift or
            medication.
          </p>
        </Limits>

        <Sources items={[WEB.mdnTimers, WEB.mdnAutoplay, WEB.mdnNotifications, WEB.mdnWakeLock, SRC.tassi2000, SRC.mcfarlane2020]} />
      </div>

      <Faq items={FAQ} />

      <ToolCta
        placement="online-alarm-clock"
        title="Need an alarm that rings on Silent?"
        body="Rise Mission is the iPhone version of this idea: it makes you prove you're awake with push-ups, a walk, a QR scan or math, and it rings on Silent. iPhone, iOS 26 or later."
      />
      <MoreTools current="online-alarm-clock" />
    </>
  );
}
