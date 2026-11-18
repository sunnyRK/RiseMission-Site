import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { APP_STORE_URL, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("how-to-set-an-alarm-on-iphone");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * Apple pages read 2026-11-18 (iPhone User Guide for iOS 26 + Apple Support).
 * Only steps these pages state are written as Apple's. Deliberately left out
 * because Apple's iOS 26 pages don't document them: Control Center / Lock
 * Screen alarm controls, the Snooze Duration range, and the ringing screen's
 * exact Stop / Snooze gestures.
 */
const EXTRA = {
  appleAlarms: {
    label: "Apple Support. How to set and change alarms on your iPhone",
    href: "https://support.apple.com/en-us/118444",
  },
  setAlarm26: {
    label: "Apple. iPhone User Guide (iOS 26): Set an alarm in Clock on iPhone",
    href: "https://support.apple.com/guide/iphone/set-an-alarm-iph2909d3a74/26/ios/26",
  },
  sleepSetup: {
    label: "Apple. iPhone User Guide (iOS 26): Set up a sleep schedule in Health",
    href: "https://support.apple.com/guide/iphone/set-up-a-sleep-schedule-iphaf56dceb4/26/ios/26",
  },
  sleepOff: {
    label: "Apple. iPhone User Guide: Turn off alarms and delete sleep schedules in Health",
    href: "https://support.apple.com/guide/iphone/turn-off-alarms-and-delete-sleep-schedules-iph35e7e0e5f/ios",
  },
};

const FAQ: QA[] = [
  {
    q: "How do I set an alarm on my iPhone?",
    a: "Open the Clock app, tap Alarms, then tap the + button. Set the time, choose Repeat, Label, Sound and Snooze if you want them, and tap Done. The alarm appears in the list with its switch turned on.",
  },
  {
    q: "Can I set an iPhone alarm with Siri?",
    a: "Yes. Apple says you can ask Siri to set an alarm, for example \"Hey Siri, set an alarm for 6:30 AM\". Siri creates a normal Clock alarm, so you can open the Clock app afterwards to check the time, change the sound or add Repeat days.",
  },
  {
    q: "Will my iPhone alarm ring on Silent or Do Not Disturb?",
    a: "Yes. Apple says alarms set in the Clock app still sound when Silent mode, Do Not Disturb or another Focus is on. The alarm's loudness follows the Ringtone and Alerts slider in Settings, so check that it isn't turned right down.",
  },
  {
    q: "How do I make an iPhone alarm repeat every weekday?",
    a: "When you add or edit the alarm, tap Repeat and select Monday to Friday. An alarm with no Repeat days rings once and then switches itself off, which is a common reason an alarm doesn't ring the next day.",
  },
  {
    q: "What's the difference between a Clock alarm and a sleep schedule alarm?",
    a: "A Clock alarm is a simple one-off or repeating alarm. A sleep schedule in the Health app sets a bedtime and wake-up time, can turn on Sleep Focus and has its own alarm settings. Apple notes that Clock alarms don't turn on Sleep Focus.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>To set an alarm on iPhone, open the Clock app, tap Alarms, tap the + button, choose a time, then tap Done.</strong>{" "}
        Before saving you can pick Repeat days, a Label, a Sound and whether Snooze is on. You can also ask Siri, or set
        a wake-up alarm as part of a sleep schedule in the Health app.
      </Answer>

      <KeyTakeaways
        items={[
          "Clock app → Alarms → + → set the time, Repeat, Label, Sound and Snooze → Done.",
          "Siri can set one for you: \"Hey Siri, set an alarm for 6:30 AM\".",
          "Turn an alarm off with the switch next to its time; swipe left on it to delete it.",
          "Clock alarms ring on Silent and in Focus, but the volume follows the Ringtone and Alerts slider.",
          "If you set it right and still sleep through it, the problem is waking up, not the settings.",
        ]}
      />

      <p>
        The steps below are checked against Apple&apos;s iPhone User Guide for iOS 26. Menus move around a little
        between versions, so if a button has a slightly different name on your phone, look for the same idea in the same
        place.
      </p>

      <H2>How to set an alarm in the Clock app</H2>
      <p>
        This is the method most people want, and it takes about ten seconds (
        <a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>):
      </p>
      <ol>
        <li>
          <strong>Open the Clock app.</strong> It is on the Home Screen by default. If you can&apos;t find it, swipe down on
          the Home Screen and search for &quot;Clock&quot;.
        </li>
        <li>
          <strong>Tap Alarms</strong> at the bottom of the screen.
        </li>
        <li>
          <strong>Tap the + button</strong> to add a new alarm.
        </li>
        <li>
          <strong>Set the time.</strong> Scroll the hour and minute wheels, and check AM or PM if your phone uses a
          12-hour clock. A wrong AM/PM is one of the most common reasons an alarm &quot;doesn&apos;t go off&quot;.
        </li>
        <li>
          <strong>Choose your options</strong> (all optional):
          <ul>
            <li>
              <strong>Repeat:</strong> pick the days of the week. Leave it empty for a one-time alarm.
            </li>
            <li>
              <strong>Label:</strong> give it a name, like &quot;Gym&quot; or &quot;Leave for work&quot;. The label shows when
              the alarm rings.
            </li>
            <li>
              <strong>Sound:</strong> choose a ringtone, a song or a vibration. Avoid None, which makes a silent alarm.
            </li>
            <li>
              <strong>Snooze:</strong> turn it on to get a Snooze button when the alarm rings. In iOS 26 you can also
              choose a <strong>Snooze Duration</strong>, how long the alarm waits before ringing again.
            </li>
          </ul>
        </li>
        <li>
          <strong>Tap Done.</strong> The alarm appears in your list with its switch turned on.
        </li>
      </ol>
      <Callout title="Quick check before bed">
        Open Clock, tap Alarms, and look at three things: the switch is on, the AM/PM is right, and the Repeat days
        include tomorrow. That catches most missed alarms before they happen.
      </Callout>

      <H2>How to set an alarm with Siri</H2>
      <p>
        Apple says you can ask Siri to set an alarm for you (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Say
        something like:
      </p>
      <p>
        <strong>&quot;Hey Siri, set an alarm for 6:30 AM.&quot;</strong>
      </p>
      <p>
        Siri creates an ordinary alarm in the Clock app. It&apos;s worth opening Clock once afterwards to confirm the
        time, because a misheard &quot;six fifteen&quot; and &quot;six fifty&quot; are an easy mix-up, and to change the
        sound or add Repeat days.
      </p>

      <H2>How to edit, turn off or delete an alarm</H2>
      <H3>Edit an alarm</H3>
      <p>
        Open Clock, tap Alarms, then tap the alarm&apos;s time. You can also tap Edit at the top left and then tap the
        time. Change what you need and tap Done (<a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>).
      </p>
      <H3>Turn an alarm off without deleting it</H3>
      <p>
        Tap the switch next to the alarm&apos;s time. The alarm stays in your list, greyed out, ready to switch back on.
        This is the right choice for a weekday alarm you want to skip on a holiday.
      </p>
      <H3>Delete an alarm</H3>
      <p>
        Swipe left on the alarm and tap Delete. Or tap Edit, then the delete button next to the alarm, and confirm (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>). Clearing out old alarms is a good habit: a list of eight
        alarms makes it easy to switch off the wrong one at night.
      </p>
      <H3>Change how loud the alarm is</H3>
      <p>
        There is no volume setting inside each alarm. Go to Settings, tap Sounds &amp; Haptics and drag the Ringtone and
        Alerts slider. If Change with Buttons is on, the side volume buttons change the alarm volume too (
        <a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>). Our guide on{" "}
        <Link href="/blog/loudest-alarm-sound-iphone">making your iPhone alarm as loud as possible</Link> covers the
        rest.
      </p>

      <H2>How to set a wake-up alarm with a sleep schedule</H2>
      <p>
        If you want a bedtime as well as a wake-up time, use a sleep schedule in the Health app instead. In iOS 26 the
        steps are (<a href={EXTRA.sleepSetup.href}>Apple iPhone User Guide</a>):
      </p>
      <ol>
        <li>Open the Health app and go to Sleep (you can search for it).</li>
        <li>Scroll to Your Schedule and tap Sleep Schedule.</li>
        <li>Turn on Sleep Schedule and tap Set Your First Schedule.</li>
        <li>Choose the days, then drag the bedtime and wake-up markers to your times.</li>
        <li>Turn on Alarm and choose its sound, volume, vibration and snooze settings.</li>
        <li>Tap Add.</li>
      </ol>
      <p>
        Two things trip people up here. The sleep schedule alarm has its own sound and volume, set inside the
        schedule rather than with your other alarms. And Apple notes that ordinary Clock alarms
        don&apos;t turn on Sleep Focus; only a sleep schedule does. To remove one, follow Apple&apos;s steps to{" "}
        <a href={EXTRA.sleepOff.href}>turn off alarms and delete sleep schedules</a>.
      </p>
      <p>
        Picking the time is the harder part. Adults need at least 7 hours of sleep a night regularly (
        <a href={SRC.watson2015.href}>Watson et al., 2015</a>), so work backwards from your alarm. The{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> does that maths for you.
      </p>

      <H2>Alarm didn&apos;t ring or was too quiet? Troubleshooting</H2>
      <p>
        If you followed the steps and the alarm still let you down, one of these guides will cover it. Each one is
        checked against Apple&apos;s documentation:
      </p>
      <table>
        <thead>
          <tr>
            <th>What happened</th>
            <th>Most likely cause</th>
            <th>Read this</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The alarm didn&apos;t ring at all</td>
            <td>Switch off, wrong AM/PM, no Repeat day, sound set to None</td>
            <td>
              <Link href="/blog/iphone-alarm-not-going-off">iPhone alarm not going off</Link>
            </td>
          </tr>
          <tr>
            <td>You&apos;re not sure it rings on Silent</td>
            <td>It does, for Clock alarms. Some older third-party apps couldn&apos;t</td>
            <td>
              <Link href="/blog/does-iphone-alarm-ring-on-silent">Does the iPhone alarm ring on Silent?</Link>
            </td>
          </tr>
          <tr>
            <td>It rang, but very quietly</td>
            <td>Ringtone and Alerts slider, Attention Aware Features, headphones</td>
            <td>
              <Link href="/blog/iphone-alarm-volume-low">iPhone alarm volume low</Link>
            </td>
          </tr>
          <tr>
            <td>It rang and you didn&apos;t hear it</td>
            <td>Tone, volume and where the phone sits</td>
            <td>
              <Link href="/blog/loudest-alarm-sound-iphone">Loudest alarm sound on iPhone</Link>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        One rule no setting can beat: {FACTS.poweredOff} Plug the phone in overnight if the battery is low.
      </p>

      <H2>If you set it and still sleep through it</H2>
      <p>
        Sometimes the alarm works perfectly and you still don&apos;t get up. You turn it off, or snooze it five times,
        without really waking. That isn&apos;t a settings problem. The groggy spell right after waking, called sleep
        inertia, makes it easy to stop an alarm on autopilot (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>),
        and our guide to <Link href="/blog/why-do-i-sleep-through-my-alarm">why you sleep through your alarm</Link>{" "}
        covers the usual reasons, from sleep debt to habit.
      </p>
      <p>
        The fix that works for a lot of heavy sleepers is an alarm that asks for more than a tap. That&apos;s why I
        built <Link href="/">Rise Mission</Link> (
        <a href={APP_STORE_URL}>Alarm Clock: Rise Mission on the App Store</a>). You stop it by finishing a wake-up
        challenge: push-ups or squats counted by the camera, a short walk, math, or{" "}
        <Link href="/blog/qr-code-alarm-clock">scanning a QR code you&apos;ve put in another room</Link>.{" "}
        {FACTS.ringsOnSilent} {FACTS.snooze}
      </p>
      <p>
        It isn&apos;t a trap. {FACTS.emergencyDismiss} {FACTS.systemStop} The 1.6 update added levels, a first-week
        challenge and a morning routine, all listed in <Link href="/whats-new">what&apos;s new in Rise Mission</Link>.
        If the Clock app already gets you up, though, keep using it. It&apos;s reliable and built in.
      </p>

      <H2>Where this guide stops</H2>
      <Limits>
        <p>
          These steps follow Apple&apos;s iOS 26 iPhone User Guide as of November 2026. Apple renames buttons between
          versions, and this guide leaves out shortcuts that Apple&apos;s pages don&apos;t document for iOS 26, such as
          adding alarms from Control Center or the Lock Screen. A perfectly set alarm can&apos;t fix too little sleep. If
          you sleep 7 hours or more and still can&apos;t wake up or stay awake, talk to a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources items={[EXTRA.setAlarm26, EXTRA.appleAlarms, EXTRA.sleepSetup, EXTRA.sleepOff, SRC.tassi2000, SRC.watson2015, SRC.aasmDisorders]} />
    </BlogLayout>
  );
}
