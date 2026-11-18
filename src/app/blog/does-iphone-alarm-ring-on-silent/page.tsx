import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("does-iphone-alarm-ring-on-silent");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * Apple pages fetched and read 2026-11-15. Only behaviour these pages state is
 * described below; anything not confirmed by Apple was left out.
 */
const EXTRA = {
  appleAlarms: {
    label: "Apple Support. How to set and change alarms on your iPhone",
    href: "https://support.apple.com/en-us/118444",
  },
  wwdcAlarmKit: {
    label: "Apple Developer. Wake up to the AlarmKit API (WWDC25 session 230)",
    href: "https://developer.apple.com/videos/play/wwdc2025/230/",
  },
  alarmKitDocs: {
    label: "Apple Developer Documentation. AlarmKit",
    href: "https://developer.apple.com/documentation/alarmkit",
  },
  criticalAlert: {
    label: "Apple Developer Documentation. UNAuthorizationOptions.criticalAlert",
    href: "https://developer.apple.com/documentation/usernotifications/unauthorizationoptions/criticalalert",
  },
};

const FAQ: QA[] = [
  {
    q: "Will my iPhone alarm go off if my phone is on Do Not Disturb?",
    a: "Yes. Apple says Do Not Disturb, the Ring/Silent switch and Silent mode don't affect the alarm sound of the Clock app, so the alarm still sounds.",
  },
  {
    q: "Why did my iPhone alarm only vibrate?",
    a: "The most common reason is that the alarm's sound is set to None. Open Clock, tap Alarms, tap Edit, tap the alarm, then tap Sound and choose a sound. Also check the volume under Settings, Sounds & Haptics, Ringtone and Alerts.",
  },
  {
    q: "Does the iPhone alarm play through AirPods or headphones?",
    a: "According to Apple, when headphones are connected the alarm plays at a set volume through the iPhone's built-in speakers as well as wired and wireless headphones.",
  },
  {
    q: "Do third-party alarm apps ring on Silent?",
    a: "Apps built on Apple's AlarmKit framework, available from iOS 26, can: Apple says their alerts break through Silent mode and the current Focus. Apps that rely on ordinary notifications don't get that: Apple reserves ignoring the mute switch and Do Not Disturb for critical alerts, which need a special entitlement.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>Yes, the iPhone&apos;s built-in Clock alarm rings even when your phone is on Silent.</strong> Apple says the
        Ring/Silent switch, the Action button&apos;s Silent mode and Do Not Disturb don&apos;t affect the alarm sound. Its
        loudness comes from the Ringtone and Alerts volume, and with headphones connected it plays through both the
        speaker and the headphones.
      </Answer>

      <KeyTakeaways
        items={[
          "Silent mode (switch or Action button) and Do Not Disturb don't stop the Clock app's alarm.",
          "Alarm volume is the Ringtone and Alerts slider in Settings, not the media volume.",
          "With headphones connected, the alarm plays through the iPhone speaker as well as wired and wireless headphones.",
          "An alarm that only vibrates usually has its sound set to None.",
          "Third-party alarm apps built on Apple's AlarmKit (iOS 26) can also break through Silent mode and Focus.",
        ]}
      />

      <H2>Does the iPhone alarm ring when the phone is on Silent?</H2>
      <p>
        Yes. This is one of the most searched iPhone questions, and Apple answers it directly on its alarm support page:
        &ldquo;Do Not Disturb, the Ring/Silent switch, and Silent mode don&apos;t affect the alarm sound.&rdquo; If you use
        the Ring/Silent switch or the Action button to turn on Silent mode, or turn on Do Not Disturb, the alarm still
        sounds (<a href={EXTRA.appleAlarms.href}>Apple Support</a>).
      </p>
      <p>
        That applies to alarms you set in Apple&apos;s Clock app. So you can flip the switch at bedtime without losing
        your morning Clock alarm. If you haven&apos;t made one yet, see{" "}
        <Link href="/blog/how-to-set-an-alarm-on-iphone">how to set an alarm on iPhone</Link>.
      </p>

      <H2>Does the alarm still ring with the Action button set to Silent?</H2>
      <p>
        Yes. On iPhones with an Action button instead of the Ring/Silent switch, Silent mode works the same way for alarms.
        Apple names the Action button explicitly: turning on Silent mode with it doesn&apos;t stop the alarm from sounding (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>).
      </p>

      <H2>Does the iPhone alarm go off on Do Not Disturb?</H2>
      <p>
        Yes, for the Clock app. Apple lists Do Not Disturb alongside the Ring/Silent switch and Silent mode as settings that
        don&apos;t affect the alarm sound (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Apple&apos;s alarm page
        names Do Not Disturb specifically; it doesn&apos;t list every other Focus mode, so if you rely on a custom Focus
        overnight, run a test alarm once to be sure.
      </p>

      <H2>Does the iPhone alarm play through AirPods or headphones?</H2>
      <p>
        If headphones are connected, Apple says the alarm &ldquo;plays at a set volume through the built-in speakers on your
        iPhone as well as wired and wireless headphones&rdquo; (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). In other
        words, falling asleep with earbuds in doesn&apos;t redirect the alarm away from the speaker.
      </p>

      <H2>How do I make my iPhone alarm louder?</H2>
      <p>
        The alarm volume isn&apos;t the same as the volume for music and videos. Apple&apos;s steps (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>):
      </p>
      <ol>
        <li>Open Settings and tap Sounds &amp; Haptics.</li>
        <li>Under Ringtone and Alerts, drag the slider to set the volume.</li>
        <li>
          Optionally turn on <strong>Change with Buttons</strong> so the volume buttons on the side of the phone change the
          alarm volume too.
        </li>
      </ol>
      <p>
        If Change with Buttons is on, keep in mind that turning down the volume during the day can also turn down
        tomorrow&apos;s alarm. If you&apos;re a heavy sleeper, loudness is only part of the fix; placement and what it takes
        to stop the alarm matter more. I cover that in{" "}
        <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up as a heavy sleeper</Link>.
      </p>

      <H2>Why does my iPhone alarm only vibrate?</H2>
      <p>
        Usually because the alarm&apos;s sound is set to None. Apple&apos;s fix: open the Clock app, tap the Alarms tab, tap
        Edit, tap the alarm, then tap Sound and choose a sound (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Apple
        also notes one StandBy detail: when you use StandBy, haptics for your alarms are disabled, so an alarm with
        no sound would be completely silent there.
      </p>

      <H2>iPhone alarm troubleshooting checklist</H2>
      <p>
        If your alarm didn&apos;t ring, was too quiet, or only vibrated, work through this list. Everything in the first
        column comes from Apple&apos;s alarm support page (<a href={EXTRA.appleAlarms.href}>Apple Support</a>), except the
        last two rows, which are practical checks of my own.
      </p>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>Where</th>
            <th>What to look for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alarm volume</td>
            <td>Settings → Sounds &amp; Haptics → Ringtone and Alerts</td>
            <td>Slider turned up; the media volume doesn&apos;t control alarms</td>
          </tr>
          <tr>
            <td>Change with Buttons</td>
            <td>Settings → Sounds &amp; Haptics</td>
            <td>If on, the side buttons can lower your alarm by accident</td>
          </tr>
          <tr>
            <td>Alarm sound</td>
            <td>Clock → Alarms → Edit → alarm → Sound</td>
            <td>Not set to None (None means vibration only)</td>
          </tr>
          <tr>
            <td>Headphones</td>
            <td>Connected wired or wireless headphones</td>
            <td>Alarm plays through speaker and headphones at a set volume</td>
          </tr>
          <tr>
            <td>StandBy</td>
            <td>Phone charging on its side in StandBy</td>
            <td>Alarm haptics are disabled, so the sound must be on</td>
          </tr>
          <tr>
            <td>Manual time changes</td>
            <td>Settings (date and time)</td>
            <td>Apple says changing the time manually can affect alarms</td>
          </tr>
          <tr>
            <td>The alarm itself</td>
            <td>Clock → Alarms</td>
            <td>Toggle is on, AM/PM is right, repeat days are set (my check)</td>
          </tr>
          <tr>
            <td>Battery</td>
            <td>Charger overnight</td>
            <td>Phone is on and charged before you sleep (my check)</td>
          </tr>
        </tbody>
      </table>
      <p>
        After any change, set a test alarm two minutes ahead, lock the phone and switch it to Silent. If it rings, your
        setup works.
      </p>

      <H2>Why couldn&apos;t third-party alarm apps ring on Silent?</H2>
      <p>
        For years this was the catch with alarm apps from the App Store. The Clock app gets special treatment from iOS, but
        before AlarmKit a regular app had no equivalent alarm system to use, so most woke you with a scheduled
        notification. Apple&apos;s own documentation describes ignoring the mute switch and Do Not Disturb as something
        &ldquo;critical alerts&rdquo; do, a separate capability that requires a special entitlement issued by Apple (<a href={EXTRA.criticalAlert.href}>Apple Developer</a>).
      </p>
      <p>
        The result was predictable: people set a clever alarm app, flipped the phone to Silent at bedtime, and woke up late.
        If you&apos;ve ever slept through an app alarm and wondered why, that&apos;s one of the possible reasons. For the
        others, see <Link href="/blog/why-do-i-sleep-through-my-alarm">why you sleep through your alarm</Link>.
      </p>

      <H2>What is AlarmKit, and do AlarmKit apps ring on Silent?</H2>
      <p>
        AlarmKit is a framework Apple introduced for iOS and iPadOS 26 that lets apps schedule real, prominent alarms and
        timers (<a href={EXTRA.alarmKitDocs.href}>Apple Developer</a>). Apple&apos;s WWDC25 session on it is explicit: when an
        AlarmKit alarm fires, &ldquo;the alert breaks through the silent mode and the current focus&rdquo; (
        <a href={EXTRA.wwdcAlarmKit.href}>WWDC25</a>).
      </p>
      <p>A few other details from Apple that are useful to know:</p>
      <ul>
        <li>
          <strong>You have to allow it.</strong> People opt in to alarm functionality for each app, and the app asks for
          authorization before it can schedule alarms (<a href={EXTRA.wwdcAlarmKit.href}>WWDC25</a>). If you declined that
          prompt, the app can&apos;t set real alarms until you allow it again.
        </li>
        <li>
          <strong>They show up across the system.</strong> AlarmKit alarms can appear on the Lock Screen, in the Dynamic
          Island and in StandBy, and on a paired Apple Watch (<a href={EXTRA.wwdcAlarmKit.href}>WWDC25</a>).
        </li>
        <li>
          <strong>It&apos;s iOS 26 only.</strong> Older iOS versions don&apos;t have AlarmKit, so apps there still rely on
          older approaches.
        </li>
      </ul>
      <p>
        That&apos;s why I built <Link href="/">Rise Mission</Link> on it. Rise Mission is an alarm that only stops after a
        wake-up challenge, and a challenge alarm is useless if Silent mode can mute it. {FACTS.ringsOnSilent} If you want to
        know which challenge types actually hold up against a sleepy brain, see{" "}
        <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
      </p>
      <Callout title="A quick way to check any alarm app">
        Set a test alarm for two minutes from now, flip the phone to Silent, turn on Do Not Disturb, lock it, and close the
        app. If it rings, it will ring tomorrow. If it only shows a banner, don&apos;t trust it with an early flight.
      </Callout>

      <H2>Can you turn off snooze on the iPhone alarm?</H2>
      <p>
        Yes. Each Clock alarm has a Snooze setting: turn it on to see a Snooze option when the alarm sounds and set a
        snooze duration (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Turning it off removes the big, easy
        button a half-asleep thumb reaches for. It won&apos;t stop you from tapping Stop and going back to sleep, but it
        removes the most tempting option. If snoozing is your real problem, our guide on{" "}
        <Link href="/blog/how-to-stop-hitting-snooze">how to stop hitting snooze</Link> goes further.
      </p>

      <H2>A bedtime setup for an alarm you can trust</H2>
      <p>
        Here is the routine I recommend, built only on the behaviour Apple documents. It takes two minutes once, and
        then nothing at all on most nights:
      </p>
      <ol>
        <li>
          <strong>Set the Ringtone and Alerts slider</strong> to a level that wakes you, and decide whether you want
          Change with Buttons on. If you often turn the phone down during the day, leaving it off keeps your alarm volume
          fixed.
        </li>
        <li>
          <strong>Pick a real sound</strong> for each alarm, never None, especially if you charge the phone in StandBy,
          where alarm haptics are off.
        </li>
        <li>
          <strong>Use Silent and Do Not Disturb freely.</strong> They won&apos;t mute a Clock alarm, so there&apos;s no need
          to leave your phone loud overnight and get woken by messages.
        </li>
        <li>
          <strong>Charge across the room.</strong> This is my advice rather than Apple&apos;s: an alarm you have to stand up
          to reach is much harder to switch off in your sleep.
        </li>
        <li>
          <strong>Test any new alarm app</strong> with the Silent plus Do Not Disturb test above before you rely on it.
        </li>
      </ol>

      <H2>Is the alarm the real problem?</H2>
      <H3>If it rang and you didn&apos;t wake up</H3>
      <p>
        Once you&apos;ve confirmed the alarm rings, missed mornings are usually about sleep, not settings. Short sleep makes
        you harder to wake, and the groggy minutes after waking make it easy to switch an alarm off without remembering (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). I explain that state in{" "}
        <Link href="/blog/sleep-inertia">what sleep inertia is</Link>. Working out a bedtime with our{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> is a good first step.
      </p>

      <Limits>
        <p>
          This article describes the behaviour Apple documents on its support and developer pages as of November 2026. It
          only covers what those pages state: Apple&apos;s alarm page names Do Not Disturb but not every Focus mode, and it
          doesn&apos;t describe every edge case, such as alarms after a restart or during a software update. iOS behaviour can
          change with updates, so if an alarm matters (a flight, an exam, a shift), set a test alarm the night before. If
          your alarm rings correctly and you still sleep through it most days, that&apos;s a sleep question rather than a
          settings question, and persistent daytime sleepiness is worth raising with a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[EXTRA.appleAlarms, EXTRA.criticalAlert, EXTRA.alarmKitDocs, EXTRA.wwdcAlarmKit, SRC.tassi2000, SRC.aasmDisorders]}
      />
    </BlogLayout>
  );
}
