import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("alarm-that-makes-you-get-out-of-bed");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

const EXTRA = {
  criticalAlert: {
    label: "Apple Developer Documentation. UNAuthorizationOptions.criticalAlert",
    href: "https://developer.apple.com/documentation/usernotifications/unauthorizationoptions/criticalalert",
  },
};

const qr = CHALLENGES.find((c) => c.slug === "qr-code")!;
const walk = CHALLENGES.find((c) => c.slug === "walk")!;
const objectFind = CHALLENGES.find((c) => c.slug === "object-find")!;
const pushUps = CHALLENGES.find((c) => c.slug === "push-ups")!;

const FAQ: QA[] = [
  {
    q: "What is the best alarm to make you get out of bed?",
    a: "One that can only be stopped from somewhere you can't reach lying down: a QR code or object in another room, or a step goal. Physical tasks you can do beside the bed, like push-ups, also work. Puzzles and shaking the phone can be done without getting up.",
  },
  {
    q: "Does putting your phone across the room work?",
    a: "It works for many people, and it costs nothing. Its weak spot is that once you've walked over and tapped Stop, nothing stops you walking back to bed. Pair it with something you do immediately, like turning on the light.",
  },
  {
    q: "Can a QR code alarm be cheated?",
    a: "Some people photograph their code and keep the photo by the bed. Put the code somewhere that makes you stand up and walk, keep no copies near the bed, and change its location if you notice yourself gaming it.",
  },
  {
    q: "Is it safe to have an alarm you can't turn off?",
    a: "It should never be impossible. A good challenge alarm has an emergency dismiss for real emergencies and a fallback task if the camera or a sensor fails. Check for both before you rely on one.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>The alarms that reliably get you out of bed are the ones you can&apos;t stop while lying down.</strong>{" "}
        Scanning a QR code in another room, finding a specific object, hitting a step goal, or doing camera-counted
        push-ups or squats all work. A phone across the room works too, but nothing stops you walking back to bed.
      </Answer>

      <KeyTakeaways
        items={[
          "Location beats loudness: if the off switch is in another room, you have to stand up.",
          "QR code and object-find alarms make you walk somewhere; step goals make you keep moving.",
          "Push-ups and squats get you vertical, though you can do them next to the bed.",
          "Math, typing, memory and shake tasks wake your brain but can be done without getting up.",
          "Any challenge alarm should have an emergency way out, so it can never trap you.",
        ]}
      />

      <H2>Why do normal alarms let you stay in bed?</H2>
      <p>
        A normal alarm asks for one tap. And the version of you who makes that tap is not at their best: in the minutes
        after waking, sleep inertia leaves you groggy, with reduced alertness and performance (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). That&apos;s the moment you decide five more minutes is
        reasonable, or switch the alarm off and don&apos;t remember doing it.
      </p>
      <p>
        I want to be fair to snoozing here. In a lab study of habitual snoozers, Sundelin and colleagues found 30 minutes of
        snoozing cost about 6 minutes of sleep and didn&apos;t hurt cognitive test performance on rising compared with
        waking abruptly (<a href={SRC.sundelin2023.href}>Sundelin et al., 2023</a>). So the goal of an out-of-bed alarm
        isn&apos;t to punish snoozing. It&apos;s to stop the bigger failure: the alarm that gets switched off and an hour
        disappears. Moving the off switch out of reach is the most direct fix I know.
      </p>

      <H2>What kinds of alarms physically make you get up?</H2>
      <p>
        There are two families. Low-tech setups move the alarm itself. App challenges keep the phone where it is but make
        stopping it require something only an upright, moving person can do.
      </p>

      <H3>Phone or alarm clock across the room</H3>
      <p>
        The classic. Charge the phone on a shelf across the room, or put a cheap alarm clock in the hallway. You must stand
        up to stop it. It costs nothing and works with any alarm. The weak spot: one tap and you can walk straight back to
        bed. Also check the alarm is still loud enough from there; my guide on{" "}
        <Link href="/blog/loudest-alarm-sound-iphone">making your iPhone alarm as loud as possible</Link> covers volume
        and placement.
      </p>

      <H3>Smart plug on a schedule</H3>
      <p>
        A smart plug set to switch on at your wake time can turn on a lamp or a fan across the room. It gives you a
        second signal besides sound, and a lamp you have to cross the room to switch off adds a small walk. But a plug can&apos;t make
        you get up; plenty of people sleep with a light on. I see it as a good add-on, not a replacement for an alarm. The
        same goes for a wake-up light: see{" "}
        <Link href="/blog/sunrise-alarm-clock-vs-alarm-app">sunrise alarm clock vs an alarm app</Link>.
      </p>

      <H3>QR code or barcode in another room</H3>
      <p>
        You stick a code in the bathroom or kitchen, and the alarm only stops when you scan it. In the app I
        build, it works like this: {qr.how} This is the strongest get-out-of-bed setup I know, because the off switch is in a fixed place
        you choose. More detail, including where to put the code, is in our{" "}
        <Link href="/blog/qr-code-alarm-clock">QR code alarm clock guide</Link>.
      </p>

      <H3>Find a real object</H3>
      <p>
        A variation that needs no printing: the alarm asks you to point the camera at an everyday object. {objectFind.how} The
        object changes, so you can&apos;t prepare by leaving it on the pillow, though some objects may already be within
        reach, depending on your bedroom.
      </p>

      <H3>Step goal</H3>
      <p>
        The alarm keeps ringing until you walk a set number of steps. {walk.how} You can&apos;t do it lying down, and the
        walking itself helps you shake off grogginess. See the{" "}
        <Link href="/blog/step-alarm-clock">step alarm clock guide</Link> for the step targets that work.
      </p>

      <H3>Push-ups or squats</H3>
      <p>
        {pushUps.how} Squats work the same way. These guarantee you&apos;re out of bed and moving, though you can do them
        right next to it. My notes on reps and form are in the{" "}
        <Link href="/blog/push-up-alarm-clock">push-up alarm clock guide</Link>.
      </p>

      <H2>How do these approaches compare?</H2>
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Makes you leave the bed?</th>
            <th>Setup effort</th>
            <th>Main weak spot</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phone across the room</td>
            <td>Yes, briefly</td>
            <td>None</td>
            <td>Walk back to bed after tapping Stop</td>
          </tr>
          <tr>
            <td>Second alarm clock in hallway</td>
            <td>Yes</td>
            <td>Low</td>
            <td>Same as above; may wake others</td>
          </tr>
          <tr>
            <td>Smart plug lamp or fan</td>
            <td>No</td>
            <td>Medium</td>
            <td>Easy to sleep through on its own</td>
          </tr>
          <tr>
            <td>QR code in another room</td>
            <td>Yes, to a fixed spot</td>
            <td>Low (print or place once)</td>
            <td>Copies of the code near the bed</td>
          </tr>
          <tr>
            <td>Object find</td>
            <td>Usually</td>
            <td>None</td>
            <td>Some objects may be within reach</td>
          </tr>
          <tr>
            <td>Step goal</td>
            <td>Yes, and keeps you moving</td>
            <td>None</td>
            <td>Needs space to walk</td>
          </tr>
          <tr>
            <td>Push-ups or squats</td>
            <td>Yes, beside the bed</td>
            <td>None</td>
            <td>Needs light and room for the camera to see you</td>
          </tr>
          <tr>
            <td>Shake the phone</td>
            <td>No</td>
            <td>None</td>
            <td>Can be done lying down</td>
          </tr>
          <tr>
            <td>Math, typing, memory</td>
            <td>No</td>
            <td>None</td>
            <td>Wakes the brain, not the body</td>
          </tr>
        </tbody>
      </table>

      <H2>Do math puzzles get you out of bed?</H2>
      <p>
        Not on their own. Math, typing and memory tasks are good at one thing: proving your brain is switched on, which is
        harder than it sounds at 6 a.m. But you can solve them under the duvet. If thinking is your problem, they work; if
        getting vertical is your problem, pair them with a phone across the room or choose a physical task instead. I go
        through difficulty levels in the <Link href="/blog/math-alarm-clock">math alarm clock guide</Link>, and the
        trade-offs of every type in <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
      </p>

      <H2>How do you choose the right one for you?</H2>
      <ul>
        <li>
          <strong>You switch alarms off in your sleep:</strong> QR code in another room. The distance is the point.
        </li>
        <li>
          <strong>You get up, then crawl back into bed:</strong> step goal, or a QR code in the kitchen next to the kettle,
          so your next action is already started.
        </li>
        <li>
          <strong>You share a room:</strong> push-ups, squats or a step goal, so the alarm stops quickly and doesn&apos;t
          blare while you walk down the hall.
        </li>
        <li>
          <strong>You have ADHD or find routines go stale:</strong> rotate tasks every couple of weeks. I wrote more on
          that in <Link href="/blog/alarm-app-for-adhd">waking up with ADHD</Link>.
        </li>
        <li>
          <strong>You don&apos;t want an app:</strong> phone across the room plus a smart plug lamp, and a rule that your
          feet touch the floor before you touch the phone.
        </li>
      </ul>

      <H2>How do you stop yourself from cheating the alarm?</H2>
      <p>
        Your sleepy self is creative. These are the workarounds I see most often, and the counter for each:
      </p>
      <ul>
        <li>
          <strong>A photo of the QR code by the bed.</strong> Don&apos;t keep copies. If you made one &ldquo;just in
          case&rdquo;, delete it.
        </li>
        <li>
          <strong>Disabling the alarm at night.</strong> The decision to skip tomorrow is made at midnight, when it feels
          easy. Set alarms as repeating, and make a rule that changes happen before dinner, not in bed.
        </li>
        <li>
          <strong>Walking back to bed after the task.</strong> Put the code or the end of your step route somewhere
          that has a next action: the kettle, the shower, your running shoes.
        </li>
        <li>
          <strong>The task gets automatic.</strong> When you can do it with your eyes half shut, move the code to a new
          room or switch challenge type for a few weeks.
        </li>
      </ul>

      <H2>What should you do in the first five minutes after getting up?</H2>
      <p>
        Getting out of bed is half the job; staying out is the other half. I keep my first five minutes boring and fixed:
        lights on or curtains open, a glass of water, and no going back into the bedroom until I&apos;m dressed. None of
        that needs willpower once it&apos;s a routine. And if you&apos;re fighting the alarm every morning, check the other
        end of the night: our <Link href="/sleep-calculator">sleep calculator</Link> works backwards from your wake time
        to a bedtime that gives you enough sleep.
      </p>

      <H2>What safety features should an out-of-bed alarm have?</H2>
      <p>
        An alarm you can&apos;t turn off is a bad idea. Cameras fail in the dark, you might be ill, injured or have a crying
        child. When I built <Link href="/">Rise Mission</Link>, I made two rules non-negotiable. {FACTS.backupChallenge}{" "}
        And {FACTS.emergencyDismiss.charAt(0).toLowerCase() + FACTS.emergencyDismiss.slice(1)} Whatever app you choose,
        check it has something similar before you rely on it.
      </p>
      <p>
        The other must-have is that the alarm rings at all. Before iOS 26, many alarm apps relied on notifications; Apple
        reserves ignoring the mute switch and Do Not Disturb for critical alerts, which need a special entitlement (
        <a href={EXTRA.criticalAlert.href}>Apple Developer</a>). {FACTS.ringsOnSilent} If your alarm isn&apos;t going off reliably, start with the{" "}
        <Link href="/blog/iphone-alarm-not-going-off">iPhone alarm troubleshooting checklist</Link> before blaming
        yourself.
      </p>

      <Callout title="A setup I'd recommend trying for one week">
        Put a printed QR code by the bathroom sink or kettle. Set one alarm, snooze off. When it rings, walk, scan, and then
        do one small thing right there: splash water, start the kettle, open the curtains. The walk wakes the body; the
        small task stops the drift back to bed.
      </Callout>

      <Limits>
        <p>
          The comparison above is based on how each method works and on my experience building and testing a challenge
          alarm, not on a controlled study comparing methods; I&apos;m not aware of one. Physical challenges aren&apos;t
          right for everyone: skip push-ups and squats if you have an injury, a heart condition or any reason to avoid sudden
          exertion, and ask a doctor if unsure. No alarm fixes too little sleep, and very hard waking every day can be a
          sign of a sleep problem worth discussing with a professional (<a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources items={[SRC.tassi2000, SRC.sundelin2023, EXTRA.criticalAlert, SRC.aasmDisorders]} />
    </BlogLayout>
  );
}
