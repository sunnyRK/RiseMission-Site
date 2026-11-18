import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("iphone-alarm-not-going-off");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * Apple pages fetched and read 2026-11-15 (iOS 26 and iOS 27 versions of the
 * iPhone User Guide). Only behaviour these pages state is described as Apple's;
 * everything else is labelled as my own check.
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
  setAlarm27: {
    label: "Apple. iPhone User Guide (iOS 27): Set an alarm in Clock on iPhone",
    href: "https://support.apple.com/guide/iphone/set-an-alarm-iph2909d3a74/27/ios/27",
  },
  sleepOff: {
    label: "Apple. iPhone User Guide: Turn off alarms and delete sleep schedules in Health",
    href: "https://support.apple.com/guide/iphone/turn-off-alarms-and-delete-sleep-schedules-iph35e7e0e5f/ios",
  },
  wakeAlarm: {
    label: "Apple. iPhone User Guide (iOS 26): Change your wake up alarm in Clock on iPhone",
    href: "https://support.apple.com/guide/iphone/change-your-wake-up-alarm-iphf2a780f81/26/ios/26",
  },
  sleepSetup: {
    label: "Apple. iPhone User Guide (iOS 26): Set up a sleep schedule in Health",
    href: "https://support.apple.com/guide/iphone/set-up-a-sleep-schedule-iphaf56dceb4/26/ios/26",
  },
  standBy: {
    label: "Apple. iPhone User Guide (iOS 26): Use StandBy while iPhone is charging",
    href: "https://support.apple.com/guide/iphone/use-standby-iph878d77632/26/ios/26",
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
    q: "Why did my iPhone alarm not go off this morning?",
    a: "The usual causes are an alarm that was toggled off, a sound set to None, a very low alarm volume, a sleep schedule wake up alarm that was turned off for the next day, or a phone that was powered off. Check them in that order, then set a test alarm two minutes ahead.",
  },
  {
    q: "Does Do Not Disturb or a Focus stop the iPhone alarm?",
    a: "No. Apple's iOS 26 user guide says the Clock alarm sounds even when Silent mode is on and when Do Not Disturb or another Focus is on.",
  },
  {
    q: "Will my alarm go off if my iPhone is dead or turned off?",
    a: "No. A powered-off iPhone can't ring, whichever alarm app you use. Charge it overnight or keep it above a safe battery level before you sleep.",
  },
  {
    q: "Why doesn't my alarm app go off when the iPhone is locked?",
    a: "Before iOS 26, third-party alarm apps mostly relied on notifications, which Silent mode and Focus can mute. Apps built on Apple's AlarmKit ring like real alarms, but only if you allowed the app to schedule alarms; you can change that permission in the Settings app.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>If your iPhone alarm didn&apos;t go off, the cause is almost always a setting, not a broken phone.</strong>{" "}
        Check that the alarm is toggled on, its sound isn&apos;t None, the alarm volume is up, your sleep schedule
        alarm wasn&apos;t switched off, and the phone stayed powered on. Then test it two minutes ahead.
      </Answer>

      <KeyTakeaways
        items={[
          "Silent mode, Do Not Disturb and other Focus modes don't stop the Clock alarm, according to Apple.",
          "An alarm sound set to None means vibration only, and in StandBy alarm haptics are off, so it can be silent.",
          "Sleep schedule wake up alarms live in the Health app and can be turned off for just the next morning.",
          "Apple warns that manually changing the time in Settings can affect alarms.",
          "Third-party alarm apps need AlarmKit (iOS 26) and your permission to ring like a real alarm.",
        ]}
      />

      <H2>Why didn&apos;t my iPhone alarm go off?</H2>
      <p>
        I build an alarm app, so I hear a lot of &ldquo;my alarm didn&apos;t ring&rdquo; stories. When I dig in, it is
        rarely a bug. It is usually one of a dozen settings that interact in ways nobody remembers at 11 p.m. Apple&apos;s
        own troubleshooting page lists the main suspects: a volume that is too low, an alarm sound set to None, headphones,
        StandBy and manual time changes (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Add a few everyday ones, like
        an alarm that was simply switched off or a phone that died overnight, and you have the full list.
      </p>
      <p>
        The table below is the whole checklist in one place. The sections after it explain each cause, with Apple&apos;s
        exact setting names so you can find them on your phone.
      </p>

      <H2>What&apos;s the full iPhone alarm troubleshooting checklist?</H2>
      <p>
        Work top to bottom. The &ldquo;Source&rdquo; column tells you whether Apple documents the behaviour or whether
        it&apos;s a practical check of my own.
      </p>
      <table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Likely cause</th>
            <th>Fix</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No sound, no vibration</td>
            <td>Alarm toggled off</td>
            <td>Clock → Alarms, turn on the switch next to the time</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Only vibrated</td>
            <td>Sound set to None</td>
            <td>Clock → Alarms → Edit → alarm → Sound, pick a sound</td>
            <td>Apple Support</td>
          </tr>
          <tr>
            <td>Too quiet to hear</td>
            <td>Low alarm volume</td>
            <td>Settings → Sounds &amp; Haptics → Ringtone and Alerts (iOS 26) or Alarms and Timers (iOS 27)</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Quiet some days, loud others</td>
            <td>Change with Buttons is on</td>
            <td>Turn off Change with Buttons so the side buttons can&apos;t lower it</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Totally silent while charging on its side</td>
            <td>StandBy disables alarm haptics, plus sound set to None</td>
            <td>Give the alarm a real sound</td>
            <td>Apple Support</td>
          </tr>
          <tr>
            <td>Wake up alarm skipped one day</td>
            <td>Sleep schedule alarm turned off for &ldquo;Next&rdquo; only</td>
            <td>Health → Sleep → Your Schedule → Edit (below Next)</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>No wake up alarm at all</td>
            <td>Sleep Schedule turned off</td>
            <td>Health → Sleep → Full Schedule &amp; Options → Sleep Schedule on</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Alarm at the wrong time</td>
            <td>Time changed manually in Settings</td>
            <td>Set date and time back to automatic, then recheck alarms</td>
            <td>Apple Support</td>
          </tr>
          <tr>
            <td>Rang at 7 p.m., not 7 a.m.</td>
            <td>AM/PM or repeat days wrong</td>
            <td>Open the alarm and check time and Repeat</td>
            <td>My check</td>
          </tr>
          <tr>
            <td>Nothing at all, screen black</td>
            <td>Phone powered off or battery died</td>
            <td>Charge overnight</td>
            <td>My check</td>
          </tr>
          <tr>
            <td>Third-party app alarm silent</td>
            <td>App uses notifications, or alarm permission denied</td>
            <td>Use an AlarmKit app and allow alarms in Settings</td>
            <td>Apple Developer</td>
          </tr>
          <tr>
            <td>Worked before an iOS update, not after</td>
            <td>Setting moved or changed (not documented by Apple)</td>
            <td>Re-open Clock and Sounds &amp; Haptics, then test</td>
            <td>My check</td>
          </tr>
        </tbody>
      </table>

      <H2>Is the alarm actually turned on?</H2>
      <p>
        Start with the obvious one, because it catches more people than anything else. In the Clock app, each alarm has a
        switch next to the time. Apple&apos;s guide describes turning an alarm off as simply tapping that button (
        <a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>), which also means a stray tap while you check the time
        at night can disable it. While you&apos;re there, check three things: the AM/PM, the Repeat days (an alarm with no
        Repeat days rings once and then stays off), and whether you have duplicate alarms where only the wrong one is on.
        If you want to start over cleanly, here is{" "}
        <Link href="/blog/how-to-set-an-alarm-on-iphone">how to set an alarm on iPhone</Link> step by step.
      </p>

      <H2>Why did my alarm only vibrate, or make no sound at all?</H2>
      <p>
        If your alarm vibrated but made no sound, its sound is probably set to None. Apple&apos;s fix: open the Clock app,
        tap the Alarms tab, tap Edit, tap the alarm, then tap Sound and choose a sound (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>). Apple&apos;s guide describes the Sound option as letting you
        choose &ldquo;a vibration, song, or ringtone&rdquo; (<a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>),
        so a vibration-only alarm is a valid setting, just not a good one for heavy sleepers.
      </p>
      <H3>The StandBy trap</H3>
      <p>
        StandBy turns a charging iPhone on its side into a bedside clock (
        <a href={EXTRA.standBy.href}>Apple iPhone User Guide</a>). Apple notes that when you use StandBy, haptics for your
        alarms are disabled (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Put those two facts together: an alarm
        with its sound set to None, on a phone sitting in StandBy, can go off with no sound and no vibration. If you use
        StandBy at night, every alarm needs a real sound.
      </p>

      <H2>Is the alarm volume too low to hear?</H2>
      <p>
        Alarm volume is not your media volume. On iOS 26, Apple&apos;s guide says to open Settings, tap Sounds &amp;
        Haptics and drag the slider under Ringtone and Alerts (
        <a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide, iOS 26</a>). Apple&apos;s iOS 27 guide adds a separate
        section called Alarms and Timers: turn off Match Ringtone Volume there and you can set the alarm volume on its own (
        <a href={EXTRA.setAlarm27.href}>Apple iPhone User Guide, iOS 27</a>). If you updated recently, it&apos;s worth
        looking at both sliders.
      </p>
      <p>
        The other half is Change with Buttons. When it&apos;s on, the volume buttons on the side change the alarm volume
        too, so turning your phone down in a meeting can quietly turn down tomorrow&apos;s alarm. I go through every reason
        an alarm sounds quiet, including Attention Aware Features, in{" "}
        <Link href="/blog/iphone-alarm-volume-low">why your iPhone alarm volume is low</Link>.
      </p>

      <H2>Do Silent mode, Do Not Disturb or Focus stop the alarm?</H2>
      <p>
        No, not for the Clock app. Apple&apos;s iOS 26 guide says your alarm sounds even when you turn on Silent mode, and
        even when you turn on Do Not Disturb &ldquo;(or another Focus)&rdquo; (
        <a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>). So Focus is not the reason a Clock alarm didn&apos;t
        ring. I cover the details, including the Action button, in{" "}
        <Link href="/blog/does-iphone-alarm-ring-on-silent">does the iPhone alarm ring on Silent</Link>.
      </p>

      <H2>Can headphones or Bluetooth make you miss the alarm?</H2>
      <p>
        Less than people think. Apple says that if headphones are connected, the alarm plays at a set volume through the
        iPhone&apos;s built-in speakers as well as wired and wireless headphones (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>). So falling asleep with earbuds connected doesn&apos;t send the
        alarm only to your ears. What it can do is make the alarm feel different: a set volume in the earbuds plus the
        speaker. If you sleep with earbuds in and still miss alarms, the earbuds are muffling the speaker more than they
        are hijacking the sound.
      </p>

      <H2>How do sleep schedules and wake up alarms interact with Clock alarms?</H2>
      <p>
        This is the one that confuses people most, because there are two kinds of alarm on an iPhone. Apple says any
        alarm you set in Clock is unrelated to a sleep schedule (
        <a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>). The wake up alarm, on the other hand, belongs to a
        sleep schedule in the Health app, and it has its own sound, volume and snooze options (
        <a href={EXTRA.sleepSetup.href}>Apple iPhone User Guide</a>).
      </p>
      <ul>
        <li>
          <strong>Turned off for one day.</strong> You can turn off only your next scheduled alarm; after that wake up
          time, your normal alarm resumes (<a href={EXTRA.sleepOff.href}>Apple iPhone User Guide</a>). If you switched
          it off for a lie-in on Saturday, it comes back by itself, but if you did it Sunday night by mistake, Monday is
          silent.
        </li>
        <li>
          <strong>Changed from Clock.</strong> When you edit the wake up alarm from Clock, Apple offers Change Next Alarm
          Only or Change This Schedule (<a href={EXTRA.wakeAlarm.href}>Apple iPhone User Guide</a>). Picking the wrong
          one is an easy way to move every future alarm.
        </li>
        <li>
          <strong>Sleep Schedule off.</strong> When all sleep schedules are turned off, scheduled alarms are also turned off
          (<a href={EXTRA.sleepOff.href}>Apple iPhone User Guide</a>).
        </li>
        <li>
          <strong>Its own volume.</strong> The wake up alarm has its own volume slider in Alarm Options (
          <a href={EXTRA.wakeAlarm.href}>Apple iPhone User Guide</a>), so a loud Clock alarm doesn&apos;t mean a loud wake
          up alarm.
        </li>
      </ul>

      <H2>Can changing the time or updating iOS break alarms?</H2>
      <p>
        Changing the time manually can. Apple says manually adjusting the time on your iPhone in Settings to change app
        behaviour, like game timers, isn&apos;t recommended and can affect alarms (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>). If you&apos;ve ever moved the clock forward to skip a game
        timer, set it back to automatic and look at your alarms again.
      </p>
      <p>
        On iOS updates, I want to be careful: Apple doesn&apos;t document updates turning alarms off, and I won&apos;t claim
        they do. What does change between versions is where settings live, as the new Alarms and Timers volume in iOS 27
        shows. My own habit after any update is simple: open Clock, confirm every alarm is still there and on, and set one
        test alarm.
      </p>

      <H2>Why won&apos;t my third-party alarm app go off?</H2>
      <p>
        For years, App Store alarm apps had a structural problem. The Clock app gets special treatment, but a regular app
        had no real alarm system to use, so most woke you with a scheduled notification. Apple&apos;s documentation
        describes ignoring the mute switch and Do Not Disturb as something critical alerts do, and critical alerts require
        a special entitlement issued by Apple (<a href={EXTRA.criticalAlert.href}>Apple Developer</a>).
      </p>
      <p>
        iOS 26 changed that with AlarmKit, a framework for scheduling prominent alarms and countdowns (
        <a href={EXTRA.alarmKitDocs.href}>Apple Developer</a>). Apple&apos;s WWDC25 session says an AlarmKit alarm
        &ldquo;breaks through the silent mode and the current focus&rdquo;, but also that people opt in per app, the app
        must get authorization before it can schedule alarms, and people can change that authorization status in the
        Settings app at any time (<a href={EXTRA.wwdcAlarmKit.href}>WWDC25</a>). So if an AlarmKit app stays silent,
        check that you didn&apos;t decline its alarm permission.
      </p>
      <p>
        That&apos;s the reason I built <Link href="/">Rise Mission</Link> on AlarmKit. {FACTS.ringsOnSilent} One honest
        limit applies to every app, ours included: {FACTS.poweredOff}
      </p>

      <Callout title="The two-minute test that catches most problems">
        Set a test alarm two minutes ahead. Switch the phone to Silent, turn on your usual night Focus, put it in the spot
        and position you sleep with it (on the charger, in StandBy if you use it), and lock it. If you hear it clearly from
        bed, tomorrow is safe.
      </Callout>

      <H2>What if the alarm rang and I still didn&apos;t wake up?</H2>
      <p>
        Then the settings are fine and the problem moves to you. Many people switch an alarm off in a groggy state and
        don&apos;t remember it; that half-awake period after waking is called sleep inertia (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). Two things help. First, make the sound harder to sleep
        through; my guide to the{" "}
        <Link href="/blog/loudest-alarm-sound-iphone">loudest alarm setup on iPhone</Link> covers volume, tone and
        placement. Second, make the alarm impossible to stop from bed. I compare the options, from a phone across the room
        to QR codes and step goals, in{" "}
        <Link href="/blog/alarm-that-makes-you-get-out-of-bed">alarms that make you get out of bed</Link>. If it happens
        often, read <Link href="/blog/why-do-i-sleep-through-my-alarm">why you sleep through your alarm</Link>.
      </p>

      <Limits>
        <p>
          This checklist uses the behaviour Apple documents on its support, user guide and developer pages as of November
          2026, in both the iOS 26 and iOS 27 guides. Apple doesn&apos;t document every edge case, such as alarms during a
          restart or a software update, and settings move between versions, so the rows marked &ldquo;My check&rdquo; are
          practical advice rather than Apple statements. If your alarm passes the two-minute test but you keep sleeping
          through it, that&apos;s a sleep question; persistent daytime sleepiness is worth raising with a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>). For anything critical, like a flight, set a second alarm on another
          device.
        </p>
      </Limits>

      <Sources
        items={[
          EXTRA.appleAlarms,
          EXTRA.setAlarm26,
          EXTRA.setAlarm27,
          EXTRA.sleepSetup,
          EXTRA.sleepOff,
          EXTRA.wakeAlarm,
          EXTRA.standBy,
          EXTRA.criticalAlert,
          EXTRA.alarmKitDocs,
          EXTRA.wwdcAlarmKit,
          SRC.tassi2000,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
