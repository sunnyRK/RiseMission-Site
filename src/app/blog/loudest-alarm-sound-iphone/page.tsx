import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("loudest-alarm-sound-iphone");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * Apple pages fetched and read 2026-11-15 (iOS 26 and iOS 27 iPhone User
 * Guide). No tone loudness or decibel figures are given because Apple
 * publishes none for its alarm tones.
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
  sounds27: {
    label: "Apple. iPhone User Guide (iOS 27): Change iPhone sounds and vibrations",
    href: "https://support.apple.com/guide/iphone/change-sounds-and-vibrations-iph07c867f28/27/ios/27",
  },
  volume26: {
    label: "Apple. iPhone User Guide (iOS 26): Adjust the volume on iPhone",
    href: "https://support.apple.com/guide/iphone/adjust-the-volume-iphb71f9b54d/26/ios/26",
  },
  volume27: {
    label: "Apple. iPhone User Guide (iOS 27): Adjust the volume on iPhone",
    href: "https://support.apple.com/guide/iphone/adjust-the-volume-iphb71f9b54d/27/ios/27",
  },
  attention: {
    label: "Apple Support. Turn Attention Aware features on or off on your iPhone or iPad Pro",
    href: "https://support.apple.com/en-us/102216",
  },
};

const FAQ: QA[] = [
  {
    q: "What is the loudest alarm sound on iPhone?",
    a: "Apple doesn't publish loudness figures for its alarm tones, so there's no official answer. The practical way is to set the alarm volume to maximum, then preview tones from across the room and pick the one you hear most clearly.",
  },
  {
    q: "Can I make my iPhone alarm louder than the maximum volume?",
    a: "Not with a setting. Once the alarm slider is at maximum, what's left is removing things that make it quieter: a speaker volume limit, Attention Aware Features, a thick case or a pillow over the phone, and distance from your head.",
  },
  {
    q: "Does the iPhone alarm play through a Bluetooth speaker?",
    a: "Apple documents headphones only: with headphones connected, the alarm plays at a set volume through the built-in speakers and the headphones. Apple doesn't describe Bluetooth speakers, so test yours before relying on it.",
  },
  {
    q: "Why do I sleep through even a very loud alarm?",
    a: "Volume isn't the only factor. Short sleep and the groggy state after waking, called sleep inertia, make it easy to switch an alarm off without remembering. An alarm you must get up to stop works better than a louder one.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>To make your iPhone alarm as loud as possible, drag the alarm volume slider in Sounds &amp; Haptics to the
        maximum and lock it there by turning off Change with Buttons.</strong> Then remove anything that quietens it: a
        speaker volume limit, Attention Aware Features and a muffled phone. Finally, pick a tone you can hear from across
        the room.
      </Answer>

      <KeyTakeaways
        items={[
          "Alarm volume lives under Ringtone and Alerts on iOS 26, and under Alarms and Timers on iOS 27.",
          "Turn off Change with Buttons after setting it, so the side buttons can't lower tomorrow's alarm.",
          "Check Volume Limit and Attention Aware Features, two settings that can make sounds quieter.",
          "Apple publishes no loudness data for its tones; choose by testing from where you sleep.",
          "Past a point, loudness stops helping heavy sleepers. Making the alarm hard to stop matters more.",
        ]}
      />

      <H2>How do I turn the iPhone alarm volume all the way up?</H2>
      <p>
        The alarm doesn&apos;t use your music volume, which is why maxing out a video doesn&apos;t make the alarm louder.
        Where the slider lives depends on your iOS version:
      </p>
      <ul>
        <li>
          <strong>iOS 26:</strong> open Settings, tap Sounds &amp; Haptics, and under Ringtone and Alerts drag the volume
          slider (<a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide, iOS 26</a>). Apple notes that an alert plays as
          you drag, so you can hear the level change (<a href={EXTRA.appleAlarms.href}>Apple Support</a>).
        </li>
        <li>
          <strong>iOS 27:</strong> Apple&apos;s guide says alarms, timers, alerts and system sounds match your ringtone
          volume by default. Turn off Match Ringtone Volume under Alarms and Timers, and you get a separate slider just for
          alarms (<a href={EXTRA.sounds27.href}>Apple iPhone User Guide, iOS 27</a>).
        </li>
      </ul>
      <p>
        The iOS 27 split is the best change for heavy sleepers in years: you can keep notifications quiet and the alarm at
        full volume, instead of one slider doing both jobs.
      </p>

      <H2>Should Change with Buttons be on or off?</H2>
      <p>
        Off, once your alarm is where you want it. Apple says that with Change with Buttons on, the volume buttons on the
        side change the alarm volume (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). When it&apos;s off, the volume
        buttons only control media playback (<a href={EXTRA.volume27.href}>Apple iPhone User Guide</a>). That means a quick
        press to quiet your phone in a cinema can&apos;t silently drop tomorrow&apos;s alarm to a whisper. Set the slider,
        then switch Change with Buttons off and leave it.
      </p>

      <H2>Which settings can make the alarm quieter without you noticing?</H2>
      <H3>Volume Limit on the built-in speaker</H3>
      <p>
        iPhone can cap the maximum volume of sound through its built-in speaker. On iOS 26 this is Settings → Sounds &amp;
        Haptics → Volume Limit → Limit Maximum Volume (<a href={EXTRA.volume26.href}>Apple iPhone User Guide, iOS 26</a>).
        On iOS 27 it sits under Built-In Speaker, next to a Reduce Loud Sounds switch that softens loud sounds from the
        speaker (<a href={EXTRA.volume27.href}>Apple iPhone User Guide, iOS 27</a>). Apple describes these as limits on
        sound through the speaker and doesn&apos;t say whether alarms are exempt, so if you want the loudest alarm, check
        that both are off and test. If a family member set them through Screen Time, you may not be able to change them
        yourself.
      </p>
      <H3>Attention Aware Features</H3>
      <p>
        On iPhones with Face ID, Apple says that when attention is detected, your iPhone will lower the volume of your
        alerts (<a href={EXTRA.attention.href}>Apple Support</a>). Apple doesn&apos;t say alarms are included, but it&apos;s
        the first thing I&apos;d rule out if the alarm seems to drop in volume when you pick up the phone. Turn it off in
        Settings → Face ID &amp; Passcode → Attention Aware Features. The full story is in{" "}
        <Link href="/blog/iphone-alarm-volume-low">why your iPhone alarm volume is low</Link>.
      </p>

      <H2>What is the loudest alarm tone on iPhone?</H2>
      <p>
        Here&apos;s the honest answer: nobody outside Apple can tell you with a number, and Apple doesn&apos;t publish
        loudness figures for its tones. Lists of &ldquo;the loudest iPhone alarm sound&rdquo; are opinions. What I&apos;d
        do instead takes five minutes:
      </p>
      <ol>
        <li>Set the alarm volume to maximum.</li>
        <li>
          Open Clock, edit an alarm, tap Sound, and preview tones. Apple&apos;s guide says the Sound option lets you choose a
          vibration, song or ringtone (<a href={EXTRA.setAlarm26.href}>Apple iPhone User Guide</a>).
        </li>
        <li>
          Put the phone where it sits at night and listen from your pillow. Sharp, high, busy tones tend to cut through
          a fan or a closed door better than soft ones; that&apos;s my experience, not a measured fact.
        </li>
        <li>Pick the one you notice fastest, not the one you like best.</li>
      </ol>
      <p>
        There&apos;s also a small piece of research worth knowing. In an online survey of 50 people, McFarlane and
        colleagues found no link between the type of waking sound and how groggy people felt, but sounds people rated as
        melodic were associated with reports of less grogginess (
        <a href={SRC.mcfarlane2020.href}>McFarlane et al., 2020</a>). It&apos;s self-reported and small, so treat it as a
        hint, not a rule: the tone that wakes you and the tone that helps you feel alert afterwards may not be the same.
      </p>

      <H2>Does vibration help, and what about StandBy?</H2>
      <p>
        Vibration can add a second signal, but don&apos;t count on it at night. Apple says that when you use StandBy,
        haptics for your alarms are disabled (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). If you charge your phone
        on its side as a bedside clock, the alarm is sound-only, so it must have a real sound, never None. A vibrating
        phone on a soft mattress is also easy to sleep through; on a hard nightstand it rattles more, which is my
        experience rather than anything Apple documents.
      </p>

      <H2>Where should the phone be for the loudest alarm?</H2>
      <p>
        Placement is volume that costs nothing. None of this is from Apple; it&apos;s what I&apos;ve learned from testing alarms every
        night while building an alarm app:
      </p>
      <ul>
        <li>
          <strong>Speaker uncovered.</strong> A phone under a pillow, in a drawer or face-down on a duvet loses a lot of
          its sound. Keep the bottom edge, where the speaker is, open to the room.
        </li>
        <li>
          <strong>Hard surface.</strong> A wooden nightstand or shelf beats a bed or a soft chair.
        </li>
        <li>
          <strong>Away from you, not too far.</strong> Across the room is great for getting up, but not behind a closed
          door. Test it from the bed.
        </li>
        <li>
          <strong>Not inside a thick case pocket.</strong> Wallet flaps folded over the speaker muffle it.
        </li>
      </ul>

      <H2>Can I play the alarm through headphones or a speaker?</H2>
      <p>
        Apple only documents headphones: when they&apos;re connected, the alarm plays at a set volume through the
        iPhone&apos;s built-in speakers as well as wired and wireless headphones (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>). So headphones add sound; they don&apos;t take the alarm away
        from the speaker. Apple doesn&apos;t describe what happens with a Bluetooth speaker, so I wouldn&apos;t build a
        morning around one without a test. If you want a second sound source, a laptop running our{" "}
        <Link href="/online-alarm-clock">online alarm clock</Link> in the browser is an easy backup to test the same night.
      </p>

      <H2>Which setting changes make the biggest difference?</H2>
      <table>
        <thead>
          <tr>
            <th>Change</th>
            <th>Where</th>
            <th>What it does</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alarm volume to max</td>
            <td>Sounds &amp; Haptics → Ringtone and Alerts (iOS 26) / Alarms and Timers (iOS 27)</td>
            <td>Sets how loud the alarm plays</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Change with Buttons off</td>
            <td>Sounds &amp; Haptics</td>
            <td>Side buttons can&apos;t lower the alarm</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Volume Limit off</td>
            <td>Sounds &amp; Haptics → Volume Limit</td>
            <td>Removes a cap on speaker volume</td>
            <td>Apple guide</td>
          </tr>
          <tr>
            <td>Attention Aware Features off</td>
            <td>Face ID &amp; Passcode</td>
            <td>Stops alerts lowering when you look at the phone</td>
            <td>Apple Support</td>
          </tr>
          <tr>
            <td>Real sound, not None</td>
            <td>Clock → Alarms → Edit → Sound</td>
            <td>Vital in StandBy, where alarm haptics are off</td>
            <td>Apple Support</td>
          </tr>
          <tr>
            <td>Sharp tone chosen by test</td>
            <td>Clock → Sound</td>
            <td>Easier to notice; no official loudness data</td>
            <td>My check</td>
          </tr>
          <tr>
            <td>Speaker uncovered, hard surface</td>
            <td>Your nightstand</td>
            <td>Less muffling</td>
            <td>My check</td>
          </tr>
        </tbody>
      </table>

      <H2>How do I test that my alarm is really as loud as it can be?</H2>
      <p>
        Settings screens lie by omission: a slider at maximum tells you nothing about a Volume Limit, a muffled speaker or
        a fan running all night. So I test the real thing, the same way every time:
      </p>
      <ol>
        <li>Set an alarm three minutes ahead with the tone you chose.</li>
        <li>
          Recreate your night: phone on the charger where it sleeps, StandBy if you use it, your usual Focus on, white
          noise or fan running, door closed.
        </li>
        <li>Lock the phone, lie down and close your eyes.</li>
        <li>
          When it rings, ask one question: would this get through to me at 6 a.m. after a short night? If you hesitate,
          move the phone, change the tone or both, and repeat.
        </li>
      </ol>
      <p>
        Do it again after every iOS update, since Apple&apos;s guides show alarm volume settings moving between versions.
      </p>

      <H2>Why isn&apos;t a louder alarm enough for heavy sleepers?</H2>
      <p>
        I&apos;ve watched plenty of people max out every slider and still miss mornings. Loudness solves one problem: not
        hearing the alarm. It doesn&apos;t solve the bigger one, which is hearing it, switching it off and going back to
        sleep. That half-awake state after waking, sleep inertia, is when people do things they don&apos;t remember (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). A louder alarm just gets switched off faster.
      </p>
      <p>
        What works is changing what it takes to stop the alarm. That&apos;s the idea behind{" "}
        <Link href="/">Rise Mission</Link>: the alarm stops only after a wake-up challenge like push-ups, a walk or
        scanning a QR code in another room. {FACTS.ringsOnSilent} I compare that approach with no-app options, like
        charging the phone across the room, in{" "}
        <Link href="/blog/alarm-that-makes-you-get-out-of-bed">alarms that make you get out of bed</Link>, and the full
        routine is in <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up as a heavy sleeper</Link>. If
        your alarm isn&apos;t sounding at all, start with the{" "}
        <Link href="/blog/iphone-alarm-not-going-off">iPhone alarm not going off checklist</Link>.
      </p>

      <Callout title="Protect your hearing">
        Maximum alarm volume a few feet away is fine for most people. Don&apos;t sleep with a phone at full volume right
        next to your ear, and keep headphone volume moderate; Apple&apos;s volume pages link its hearing-safety guidance
        for a reason.
      </Callout>

      <Limits>
        <p>
          The settings here come from Apple&apos;s iOS 26 and iOS 27 user guides and support pages as of November 2026.
          Apple doesn&apos;t publish loudness data for alarm tones, and doesn&apos;t say whether Volume Limit, Reduce Loud
          Sounds or Attention Aware Features apply to alarms, so treat those as things to check and test rather than known
          causes. The tone and placement advice is my own experience, not measured data, and the one study on waking sounds
          I cite is a small self-report survey. If you hear your alarm clearly and still can&apos;t wake, a louder sound
          won&apos;t fix it; frequent, severe sleepiness is worth discussing with a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          EXTRA.appleAlarms,
          EXTRA.setAlarm26,
          EXTRA.sounds27,
          EXTRA.volume26,
          EXTRA.volume27,
          EXTRA.attention,
          SRC.mcfarlane2020,
          SRC.tassi2000,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
