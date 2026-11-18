import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { APP_STORE_URL, FACTS, MIN_IOS, SOUNDS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("iphone-alarm-apps-alarmkit");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * Apple pages read 2026-11-18. Every AlarmKit behaviour below is stated in the
 * WWDC25 session 230 transcript or Apple's developer documentation. The 30-second
 * limit is quoted from the UNNotificationSound docs. Deliberately left out: any
 * list of other AlarmKit apps (we can't verify which apps use it, and we don't
 * rank competitors here) and any claim about exact battery cost of the old
 * background-audio workaround (no source).
 *
 * Rise Mission details come from site.ts FACTS and the app repo, branch v1.6
 * (Services/AlarmService/AlarmKitService.swift: "Start Challenge" custom
 * secondary button; OpenChallengeIntent; the in-app ringing screen).
 */
const EXTRA = {
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
  notificationSound: {
    label: "Apple Developer Documentation. UNNotificationSound",
    href: "https://developer.apple.com/documentation/usernotifications/unnotificationsound",
  },
};

const FAQ: QA[] = [
  {
    q: "Why don't third-party alarm apps ring on Silent?",
    a: "Older ones usually can't. Before iOS 26, App Store apps had no real alarm system, so most woke you with a scheduled notification, which Silent mode and Focus can mute. Apps built on Apple's AlarmKit in iOS 26 can break through Silent and Focus like the Clock app.",
  },
  {
    q: "What is AlarmKit?",
    a: "AlarmKit is an Apple framework, introduced at WWDC 2025 for iOS 26, that lets apps schedule alarms and countdown timers the system presents as real alarms. They break through Silent mode and Focus, appear on the Lock Screen and in the Dynamic Island, and need your permission first.",
  },
  {
    q: "Which iPhone alarm apps use AlarmKit?",
    a: "There's no official list, but you can tell. An AlarmKit app needs iOS 26 or later, asks for permission to schedule alarms, and rings on Silent with the app closed. Set a test alarm two minutes ahead, mute the phone, close the app and lock it.",
  },
  {
    q: "Can an AlarmKit app remove the Stop button?",
    a: "No. iOS shows a Stop button on every AlarmKit alarm, and the app can't take it away. Apps can add one custom button, such as Snooze or a button that opens the app, which is how challenge alarms like Rise Mission start their wake-up task.",
  },
  {
    q: "Does an AlarmKit alarm ring if the phone is off?",
    a: "No. A powered-off iPhone can't ring, whether the alarm comes from the Clock app or an AlarmKit app. Keep the phone charged overnight. If an AlarmKit app stays silent on a working phone, check that you allowed its alarms in Settings.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>
          Third-party alarm apps used to miss Silent mode because iOS gave them no real alarm, only notifications that
          Silent and Focus can mute.
        </strong>{" "}
        Apple&apos;s AlarmKit, new in iOS 26, fixes that: apps can now schedule alarms the system treats like Clock
        alarms, which break through Silent and Focus and show on the Lock Screen, once you allow them.
      </Answer>

      <KeyTakeaways
        items={[
          "Before iOS 26, App Store alarm apps leaned on notifications or on keeping the app running. Both could fail.",
          "AlarmKit (WWDC 2025, iOS 26) lets apps schedule real system alarms and timers.",
          "AlarmKit alarms break through Silent mode and Focus, and appear on the Lock Screen and in the Dynamic Island.",
          "You must allow each app's alarms. The system Stop button always stays.",
          "No list of AlarmKit apps exists. Test any app: Silent on, app closed, phone locked.",
        ]}
      />

      <p>
        I build an iPhone alarm app on AlarmKit, so I&apos;ve read Apple&apos;s documentation closely and tested alarms on
        real phones. This guide explains what changed, in plain words, with every claim about AlarmKit linked to
        Apple&apos;s own developer material. It sits in our <Link href="/blog/topic/iphone-alarms">iPhone alarm help</Link>{" "}
        series.
      </p>

      <H2>Why didn&apos;t third-party alarm apps ring on Silent?</H2>
      <p>
        Because, until iOS 26, they had nothing to ring with. The Clock app has always had a real alarm system built into
        iOS. Apps from the App Store didn&apos;t get one, so developers used one of two workarounds. Both worked some of the
        time, and both had a catch.
      </p>
      <H3>Workaround 1: scheduled notifications</H3>
      <p>
        The app schedules a local notification for 7:00 and attaches a sound to it. At 7:00 iOS shows a banner and plays
        that sound once. The trouble is that a notification is not an alarm:
      </p>
      <ul>
        <li>
          <strong>Silent mode and Focus can mute it.</strong> Ignoring the mute switch and Do Not Disturb is something
          Apple describes for &ldquo;critical alerts&rdquo;, a separate capability that needs a special entitlement from
          Apple (<a href={EXTRA.criticalAlert.href}>Apple Developer</a>). An ordinary alarm app doesn&apos;t get it.
        </li>
        <li>
          <strong>The sound is short.</strong> Apple&apos;s documentation says notification sound files must be under 30
          seconds, and if a file is longer the system plays the default sound instead (
          <a href={EXTRA.notificationSound.href}>Apple Developer</a>). Many apps got around this by firing a string of
          notifications a few seconds apart.
        </li>
        <li>
          <strong>It looks like every other banner.</strong> A notification at 7:00 sits in the same pile as your
          messages, easy to swipe away half asleep.
        </li>
      </ul>
      <H3>Workaround 2: keep the app awake all night</H3>
      <p>
        Some apps kept running in the background overnight, often by playing silent or quiet audio, so they could start a
        loud sound at the right minute. When it worked, it could get past Silent mode. But it depended on the app still
        running at 7:00. If you swiped the app away, restarted the phone, or iOS closed the app to free up memory, the
        alarm was gone. Most of these apps told you to leave them open with the screen on the charger, and a running app
        all night uses some battery.
      </p>
      <p>
        So the honest summary of the old days: a third-party alarm could be clever, but it couldn&apos;t be as dependable
        as the Clock app. For the full history of the Silent switch question, see{" "}
        <Link href="/blog/does-iphone-alarm-ring-on-silent">does the iPhone alarm ring on Silent?</Link>
      </p>

      <H2>What is AlarmKit?</H2>
      <p>
        AlarmKit is a framework Apple introduced at WWDC 2025 for iOS and iPadOS 26. It lets apps schedule alarms and
        countdown timers that the system presents as real, prominent alarms (<a href={EXTRA.alarmKitDocs.href}>Apple
        Developer</a>). Apple&apos;s WWDC25 session describes an alarm as &ldquo;a prominent alert for things that occur at
        a fixed, pre-determined time&rdquo;, and says that when it fires, &ldquo;the alert breaks through the silent mode
        and the current focus&rdquo; (<a href={EXTRA.wwdcAlarmKit.href}>WWDC25</a>).
      </p>
      <p>Here is what else Apple says an AlarmKit alarm does, all from the same session:</p>
      <ul>
        <li>
          <strong>It needs your permission.</strong> &ldquo;People opt in to enable alarm functionality for each
          app.&rdquo; The app asks when you first create an alarm (or earlier), and you can change your answer in the
          Settings app at any time.
        </li>
        <li>
          <strong>It shows up across the system.</strong> Alarms appear as a full alert with the alarm&apos;s title and
          the app&apos;s name, and countdowns can show as a Live Activity on the Lock Screen, in the Dynamic Island and in
          StandBy. A paired Apple Watch can show the alarm too.
        </li>
        <li>
          <strong>Stop is always there.</strong> People can always stop the alert. Apps can&apos;t remove that option.
        </li>
        <li>
          <strong>Apps can add one more button.</strong> The second button can start a countdown, which is how snooze
          works, or run a custom action defined by the app, such as opening the app to a specific screen.
        </li>
        <li>
          <strong>Custom sounds are possible.</strong> An app can use the default system sound or ship its own.
        </li>
      </ul>
      <p>
        Apple also says what AlarmKit is not for: alarms are &ldquo;not a replacement for other prominent notifications,
        like critical alerts or time-sensitive notifications&rdquo; (<a href={EXTRA.wwdcAlarmKit.href}>WWDC25</a>). It is
        for wake-up alarms and timers, not for any app that wants to be loud.
      </p>

      <H2>Old way vs AlarmKit: side by side</H2>
      <table>
        <thead>
          <tr>
            <th>What matters at 7:00</th>
            <th>Notification alarm (before iOS 26)</th>
            <th>Background audio trick</th>
            <th>AlarmKit alarm (iOS 26+)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rings on Silent and in Focus</td>
            <td>Usually not</td>
            <td>Sometimes, if the app is still running</td>
            <td>Yes, per Apple</td>
          </tr>
          <tr>
            <td>Works with the app closed</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Sound length</td>
            <td>Under 30 seconds per notification</td>
            <td>As long as the app plays it</td>
            <td>A full alarm alert, not a one-off notification sound</td>
          </tr>
          <tr>
            <td>Looks like an alarm</td>
            <td>No, a banner</td>
            <td>Only inside the app</td>
            <td>Yes, full alert, Lock Screen, Dynamic Island</td>
          </tr>
          <tr>
            <td>Needs your permission</td>
            <td>Notification permission</td>
            <td>No system prompt</td>
            <td>Alarm permission, per app</td>
          </tr>
          <tr>
            <td>Can you always stop it</td>
            <td>Yes</td>
            <td>Depends on the app</td>
            <td>Yes, the system Stop button</td>
          </tr>
          <tr>
            <td>iOS version</td>
            <td>Any</td>
            <td>Any</td>
            <td>iOS 26 or later</td>
          </tr>
        </tbody>
      </table>
      <p>
        The row people forget is the last one. AlarmKit doesn&apos;t exist on older iOS versions, so an app that wants to
        support them has to keep a fallback, and on those phones you&apos;re back to the old trade-offs. If an alarm still
        doesn&apos;t sound, our <Link href="/blog/iphone-alarm-not-going-off">iPhone alarm not going off checklist</Link>{" "}
        covers every setting to check.
      </p>

      <H2>Which iPhone alarm apps use AlarmKit?</H2>
      <p>
        Apple doesn&apos;t publish a list, and App Store listings don&apos;t always say. Rather than guess at other
        developers&apos; apps, here is how to check any alarm app yourself in a couple of minutes:
      </p>
      <ol>
        <li>
          <strong>Look at the iOS requirement.</strong> An app that builds its alarms only on AlarmKit needs iOS 26 or
          later. An app that also supports older versions may still use AlarmKit on iOS 26, but it can&apos;t use it
          everywhere.
        </li>
        <li>
          <strong>Watch for the alarm permission.</strong> AlarmKit apps must ask to schedule alarms, separately from
          notifications. You&apos;ll also find the setting for that app in the Settings app.
        </li>
        <li>
          <strong>Run the Silent test.</strong> Set an alarm two minutes ahead, switch the phone to Silent, turn on Do Not
          Disturb, swipe the app away and lock the phone. An AlarmKit alarm rings and shows a full alarm alert. A
          notification alarm shows a banner or stays quiet.
        </li>
      </ol>
      <Callout title="Trust the test, not the listing">
        A two-minute test with Silent on and the app closed tells you more than any feature list. If it rings, it will
        ring tomorrow. If it only shows a banner, don&apos;t trust it with an early flight.
      </Callout>

      <H2>How Rise Mission uses AlarmKit</H2>
      <p>
        <Link href="/">Rise Mission</Link> is the alarm app I build: an alarm you stop by finishing a wake-up challenge,
        such as push-ups counted by the camera, a walk or math. A challenge alarm is pointless if Silent mode can mute it,
        so I built it on AlarmKit from the first version, and it requires {MIN_IOS} for that reason (more on the{" "}
        <Link href="/compatibility">compatibility page</Link>). {FACTS.ringsOnSilent}
      </p>
      <p>Designing a challenge alarm around AlarmKit&apos;s rules shaped a few decisions:</p>
      <ul>
        <li>
          <strong>The challenge starts from a custom button.</strong> Since the second alarm button can run an app action,
          Rise Mission&apos;s alarm shows a Start Challenge button that opens the challenge straight away.
        </li>
        <li>
          <strong>The Stop button stays, on purpose.</strong> {FACTS.systemStop}
        </li>
        <li>
          <strong>A ringing screen inside the app.</strong> Opening Rise Mission while an alarm is going off shows its own
          ringing screen, where you can start the challenge or manage the alarm. {SOUNDS.caveat}
        </li>
        <li>
          <strong>Backups and an exit.</strong> {FACTS.backupChallenge} {FACTS.emergencyDismiss}
        </li>
      </ul>
      <p>
        If you want to see how this compares with the built-in alarm, the{" "}
        <Link href="/rise-mission-vs-apple-clock">Rise Mission vs Apple Clock comparison</Link> lays it out row by row, and
        the 1.6 changes are in <Link href="/whats-new">what&apos;s new</Link>. You can get it from{" "}
        <a href={APP_STORE_URL}>Alarm Clock: Rise Mission on the App Store</a>, or try a wake-up challenge first in the{" "}
        <Link href="/online-alarm-clock">online alarm clock</Link> in your browser.
      </p>

      <H2>What AlarmKit doesn&apos;t fix</H2>
      <p>AlarmKit makes third-party alarms dependable. It doesn&apos;t make them magic:</p>
      <ul>
        <li>
          <strong>A dead phone.</strong> {FACTS.poweredOff}
        </li>
        <li>
          <strong>A declined permission.</strong> If you said no to the alarm prompt, the app can&apos;t schedule real
          alarms until you allow them again in Settings.
        </li>
        <li>
          <strong>Volume.</strong> Breaking through Silent isn&apos;t the same as being loud enough. If the alarm is too
          quiet, see <Link href="/blog/iphone-alarm-volume-low">iPhone alarm volume low</Link>.
        </li>
        <li>
          <strong>Sleeping through it.</strong> A ringing alarm can still be switched off on autopilot during sleep
          inertia, the groggy spell after waking (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). That&apos;s
          the problem <Link href="/blog/wake-up-challenges-explained">wake-up challenges</Link> are meant to solve.
        </li>
      </ul>

      <H2>Where this guide stops</H2>
      <Limits>
        <p>
          AlarmKit details here come from Apple&apos;s WWDC25 session and developer documentation as of November 2026;
          Apple can change how alarms behave in later iOS versions. We describe the older workarounds in general terms,
          because each app implemented them differently, and we don&apos;t name which other apps use AlarmKit because we
          can&apos;t verify it. An alarm only wakes you; if you sleep 7 hours or more and still can&apos;t wake up or stay
          awake, talk to a doctor (<a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[EXTRA.wwdcAlarmKit, EXTRA.alarmKitDocs, EXTRA.criticalAlert, EXTRA.notificationSound, SRC.tassi2000, SRC.aasmDisorders]}
      />
    </BlogLayout>
  );
}
