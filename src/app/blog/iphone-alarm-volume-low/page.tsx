import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("iphone-alarm-volume-low");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * Apple pages fetched and read 2026-11-15. Where Apple describes a feature
 * that lowers "alerts" or speaker/headphone sound but doesn't name alarms, the
 * post says so instead of claiming it affects alarms.
 */
const EXTRA = {
  appleAlarms: {
    label: "Apple Support. How to set and change alarms on your iPhone",
    href: "https://support.apple.com/en-us/118444",
  },
  sounds26: {
    label: "Apple. iPhone User Guide (iOS 26): Change iPhone sounds and vibrations",
    href: "https://support.apple.com/guide/iphone/change-sounds-and-vibrations-iph07c867f28/26/ios/26",
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
  faceIdSettings: {
    label: "Apple. iPhone User Guide (iOS 26): Change Face ID and attention settings on iPhone",
    href: "https://support.apple.com/guide/iphone/change-face-id-and-attention-settings-iph646624222/26/ios/26",
  },
  headphones: {
    label: "Apple. iPhone User Guide (iOS 26): Check your headphone audio levels on iPhone",
    href: "https://support.apple.com/guide/iphone/check-your-headphone-audio-levels-iph0596a9152/26/ios/26",
  },
  wakeAlarm: {
    label: "Apple. iPhone User Guide (iOS 26): Change your wake up alarm in Clock on iPhone",
    href: "https://support.apple.com/guide/iphone/change-your-wake-up-alarm-iphf2a780f81/26/ios/26",
  },
};

const FAQ: QA[] = [
  {
    q: "Why does my iPhone alarm get quieter when I look at it?",
    a: "On iPhones with Face ID, Attention Aware Features can lower the volume of alerts when the phone detects you're looking at it. Apple doesn't say alarms are included, but you can rule it out by turning off Attention Aware Features in Settings, Face ID & Passcode.",
  },
  {
    q: "Is the iPhone alarm volume the same as the ringer volume?",
    a: "On iOS 26, yes: the Ringtone and Alerts slider sets the alarm volume. Apple's iOS 27 guide says alarms match the ringtone volume by default, but you can turn off Match Ringtone Volume under Alarms and Timers to set them separately.",
  },
  {
    q: "Why is my alarm quiet when headphones are connected?",
    a: "Apple says that with headphones connected, the alarm plays at a set volume through the built-in speakers and the headphones. Apple doesn't say what that set level is, so test it, or disconnect headphones before sleep.",
  },
  {
    q: "Why is my sleep schedule alarm quieter than my other alarms?",
    a: "The wake up alarm from a Health sleep schedule has its own volume slider in Alarm Options. Open Clock, tap Alarms, tap Change, and adjust the alarm volume there.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>An iPhone alarm is usually quiet because its volume follows the Ringtone and Alerts slider, which the side
        buttons can lower when Change with Buttons is on.</strong> Other causes include Attention Aware Features lowering
        alerts while you look at the phone, headphones, speaker volume limits and the sleep schedule alarm&apos;s separate
        volume.
      </Answer>

      <KeyTakeaways
        items={[
          "On iOS 26 the alarm uses the Ringtone and Alerts volume; iOS 27 can give alarms their own slider.",
          "With Change with Buttons on, pressing volume down when nothing is playing lowers ringer and alert volume.",
          "Attention Aware Features can lower alert volume when you look at a Face ID iPhone.",
          "With headphones connected, Apple says the alarm plays at a set volume through speaker and headphones.",
          "The Health sleep schedule wake up alarm has a separate volume slider.",
        ]}
      />

      <H2>Why is my iPhone alarm so quiet?</H2>
      <p>
        When someone tells me their alarm has &ldquo;gone quiet&rdquo;, it nearly always turns out that the alarm was
        never set to a separate, fixed volume in the first place. On most iPhones it shares a slider with your ringtone and
        notifications, and that slider moves every time you press the side buttons. Below are the causes I check, in order
        of how often they&apos;re the culprit. For each one I say whether Apple documents it, because a lot of advice
        online repeats guesses as facts.
      </p>

      <H2>Is the alarm volume tied to the ringer volume?</H2>
      <p>
        On iOS 26, yes. Apple&apos;s guide says to drag the slider below Ringtone and Alerts &ldquo;to set the volume for
        all sounds&rdquo; (<a href={EXTRA.sounds26.href}>Apple iPhone User Guide, iOS 26</a>), and the alarm guide uses the
        same slider for the alarm. Turn the ringer down for a quiet office and you have turned tomorrow&apos;s alarm down
        too.
      </p>
      <p>
        iOS 27 gives you a way out. Apple&apos;s guide says that by default, alarms, timers, alerts and system sounds match
        your ringtone volume, but you can turn off Match Ringtone Volume under Alarms and Timers and drag a separate
        slider (<a href={EXTRA.sounds27.href}>Apple iPhone User Guide, iOS 27</a>). If you&apos;re on iOS 27, this is the
        single most useful change in this article: alarm loud, everything else as quiet as you like.
      </p>

      <H2>Do the volume buttons change the alarm volume?</H2>
      <p>
        They can. Apple explains that the volume buttons control media volume while audio is playing, and when no audio is
        playing they control ringer and alert volume (<a href={EXTRA.volume27.href}>Apple iPhone User Guide</a>). With
        Change with Buttons turned on, Apple says those buttons change the alarm volume as well (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>).
      </p>
      <p>
        That&apos;s how alarms drift quieter over a week without you ever opening Settings: one press during a meeting,
        another when the phone buzzed at dinner. The fix is to set the slider, then go to Settings → Sounds &amp; Haptics
        and turn off Change with Buttons, which Apple calls locking the ringer and alert volumes (
        <a href={EXTRA.volume26.href}>Apple iPhone User Guide, iOS 26</a>).
      </p>

      <H2>Does Face ID lower the alarm volume when you look at the phone?</H2>
      <p>
        This is the most searched cause, and it deserves a careful answer. Apple says that with Attention Aware Features,
        iPhone and iPad models with Face ID can check whether you&apos;re paying attention to the device, and &ldquo;when
        attention is detected, your iPhone will lower the volume of your alerts&rdquo; (
        <a href={EXTRA.attention.href}>Apple Support</a>). The user guide phrases it as iPhone checking for attention
        before &ldquo;lowering the volume of some alerts&rdquo; (<a href={EXTRA.faceIdSettings.href}>Apple iPhone User
        Guide</a>).
      </p>
      <p>
        What Apple doesn&apos;t say is which alerts, or whether alarms are among them. So I treat it as a suspect, not a
        confirmed cause. If your alarm seems loud until you pick up the phone and look at it, rule it out:
      </p>
      <ul>
        <li>
          Settings → Face ID &amp; Passcode → turn off Attention Aware Features (
          <a href={EXTRA.attention.href}>Apple Support</a>), or
        </li>
        <li>
          Settings → Accessibility → Face ID &amp; Attention → Attention Aware Features (
          <a href={EXTRA.faceIdSettings.href}>Apple iPhone User Guide</a>).
        </li>
      </ul>
      <p>
        Apple notes this works through the TrueDepth camera even if you never enrolled in Face ID, and that it isn&apos;t
        on iPhone SE (<a href={EXTRA.attention.href}>Apple Support</a>). Turning it off also affects screen dimming and
        notification previews, so you trade a little convenience for a predictable alarm.
      </p>

      <H2>Why is my alarm quiet with headphones or AirPods connected?</H2>
      <p>
        Apple says that when headphones are connected, the alarm &ldquo;plays at a set volume&rdquo; through the
        built-in speakers on your iPhone as well as wired and wireless headphones (
        <a href={EXTRA.appleAlarms.href}>Apple Support</a>). The key word is &ldquo;set&rdquo;: Apple doesn&apos;t say that
        level matches your slider or what it is. If your alarm sounds weaker on nights you fall asleep with earbuds
        connected, that&apos;s a plausible reason, and the simple fix is to disconnect them before sleep and test.
      </p>
      <H3>Headphone Safety settings</H3>
      <p>
        Two headphone features exist to protect your hearing. Reduce Loud Audio, under Settings → Sounds &amp; Haptics →
        Headphone Safety, analyses headphone audio and reduces any sound above the level you set. And after a headphone
        loudness notification, the next time you connect headphones the volume is automatically set to a lower level (
        <a href={EXTRA.headphones.href}>Apple iPhone User Guide</a>). Apple describes both as headphone audio features and
        doesn&apos;t mention alarms, so they&apos;re unlikely to affect the speaker. I&apos;d leave them on; your hearing
        matters more than an alarm in your ears.
      </p>

      <H2>Can a speaker volume limit make the alarm quieter?</H2>
      <p>
        Possibly. iOS can cap the maximum volume of sound through the built-in speaker: on iOS 26 that&apos;s Settings →
        Sounds &amp; Haptics → Volume Limit → Limit Maximum Volume (
        <a href={EXTRA.volume26.href}>Apple iPhone User Guide, iOS 26</a>), and on iOS 27 there&apos;s also Reduce Loud
        Sounds under Built-In Speaker (<a href={EXTRA.volume27.href}>Apple iPhone User Guide, iOS 27</a>). Apple
        doesn&apos;t say whether alarms are exempt. If your alarm never seems to get loud even at maximum, check these. On a
        child&apos;s or managed iPhone, Screen Time can prevent changes to the speaker limit (
        <a href={EXTRA.volume27.href}>Apple iPhone User Guide</a>).
      </p>

      <H2>Why is my sleep schedule alarm quieter than my Clock alarm?</H2>
      <p>
        Because it has its own volume. The wake up alarm that comes with a Health sleep schedule has Alarm Options with an
        alarm volume slider; Apple&apos;s steps are Clock → Alarms → Change, then scroll to Alarm Options (
        <a href={EXTRA.wakeAlarm.href}>Apple iPhone User Guide</a>). When you save, Apple asks whether to change the next
        alarm only or the whole schedule. Choose Change This Schedule if you want it louder every day.
      </p>

      <H2>Do Silent mode or Do Not Disturb make the alarm quieter?</H2>
      <p>
        No. This one gets blamed constantly, but Apple is explicit: Do Not Disturb, the Ring/Silent switch and Silent mode
        don&apos;t affect the alarm sound, and the alarm still sounds when you turn on Silent mode with the switch or the
        Action button (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). Silent mode silences calls and notifications,
        not the Clock alarm. If your alarm is quiet on Silent nights and loud on others, the difference is far more
        likely the volume slider moving through the side buttons than the switch itself. So you can keep using Silent
        and Do Not Disturb at bedtime without trading away a loud alarm.
      </p>

      <H2>Which cause is it? A quick diagnostic table</H2>
      <table>
        <thead>
          <tr>
            <th>Cause</th>
            <th>Clue</th>
            <th>Fix</th>
            <th>Apple documents it for alarms?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ringer slider low</td>
            <td>Calls and alarm both quiet</td>
            <td>Raise Ringtone and Alerts (iOS 26) or Alarms and Timers (iOS 27)</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Change with Buttons on</td>
            <td>Volume varies day to day</td>
            <td>Turn off Change with Buttons</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Attention Aware Features</td>
            <td>Quieter once you look at it</td>
            <td>Turn off Attention Aware Features</td>
            <td>Alerts yes, alarms not named</td>
          </tr>
          <tr>
            <td>Headphones connected</td>
            <td>Quieter on earbud nights</td>
            <td>Disconnect before sleep</td>
            <td>Yes (&ldquo;set volume&rdquo;)</td>
          </tr>
          <tr>
            <td>Speaker Volume Limit</td>
            <td>Never loud, even at max</td>
            <td>Turn off Limit Maximum Volume</td>
            <td>Speaker yes, alarms not named</td>
          </tr>
          <tr>
            <td>Sleep schedule alarm volume</td>
            <td>Only the wake up alarm is quiet</td>
            <td>Clock → Alarms → Change → Alarm Options</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Soft tone</td>
            <td>Loud on test, missed in sleep</td>
            <td>Pick a sharper tone by testing</td>
            <td>No (my advice)</td>
          </tr>
          <tr>
            <td>Blocked speaker</td>
            <td>All sound is muffled, not just alarms</td>
            <td>Uncover and clean the speaker, or contact Apple</td>
            <td>No (my check)</td>
          </tr>
        </tbody>
      </table>

      <H2>What if every sound on the phone is quiet?</H2>
      <p>
        Then it&apos;s probably not an alarm setting. Play a song through the speaker at full volume. If music is also weak
        or crackly, the speaker may be blocked by lint, a case or a screen protector edge, or it may need repair. That
        part is my own troubleshooting order rather than something Apple lists on its alarm page; if cleaning and removing
        the case don&apos;t help, contact Apple Support.
      </p>

      <Callout title="My two-line fix for most people">
        Set the alarm volume to where it wakes you, then turn off Change with Buttons. If you have a Face ID iPhone and the
        alarm still seems to fade when you look at it, turn off Attention Aware Features and test again.
      </Callout>

      <H2>When is a quiet alarm not the real problem?</H2>
      <p>
        If you&apos;ve fixed the volume and still sleep through, the alarm may be loud enough and you&apos;re turning it
        off half-asleep. That groggy period after waking, sleep inertia, is when people stop alarms without remembering it
        (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). My guide to the{" "}
        <Link href="/blog/loudest-alarm-sound-iphone">loudest alarm setup on iPhone</Link> covers tone and placement, and
        if the alarm isn&apos;t ringing at all, use the{" "}
        <Link href="/blog/iphone-alarm-not-going-off">checklist for an iPhone alarm not going off</Link>. Silent mode is
        not the cause, by the way: see{" "}
        <Link href="/blog/does-iphone-alarm-ring-on-silent">does the iPhone alarm ring on Silent</Link>.
      </p>
      <p>
        For people who hear the alarm and still fall back asleep, I built <Link href="/">Rise Mission</Link>, where the
        alarm stops only after a wake-up challenge. {FACTS.testAlarm} If you&apos;re a deep sleeper, the wider routine is
        in <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up as a heavy sleeper</Link>.
      </p>

      <Limits>
        <p>
          I only describe behaviour stated on Apple&apos;s support and iPhone User Guide pages (iOS 26 and iOS 27) as of
          November 2026. Apple says Attention Aware Features lower alert volume and that Volume Limit and Reduce Loud
          Sounds affect the built-in speaker, but it doesn&apos;t say whether alarms are included, so this post presents
          them as things to rule out, not proven causes. Settings can move between iOS versions. The tone and speaker
          advice is my own. If you have trouble hearing alarms that others hear easily, a hearing check is worth
          considering, and persistent difficulty waking is worth raising with a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          EXTRA.appleAlarms,
          EXTRA.sounds26,
          EXTRA.sounds27,
          EXTRA.volume26,
          EXTRA.volume27,
          EXTRA.attention,
          EXTRA.faceIdSettings,
          EXTRA.headphones,
          EXTRA.wakeAlarm,
          SRC.tassi2000,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
