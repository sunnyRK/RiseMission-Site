import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { COMPETITORS, SNAPSHOT_DATE } from "@/lib/competitors";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS, PRIVACY_COPY } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("squat-alarm-clock");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/** DOIs resolved and titles confirmed via Crossref on 2026-11-17. */
const EXTRA = {
  kovac2021: {
    label: "Kovac K. et al. The impact of a short burst of exercise on sleep inertia. Physiology & Behavior, 2021",
    href: "https://doi.org/10.1016/j.physbeh.2021.113617",
  },
  hilditch2019: {
    label: "Hilditch C.J., McHill A.W. Sleep inertia: current insights. Nature and Science of Sleep, 2019",
    href: "https://doi.org/10.2147/NSS.S188911",
  },
  escamilla2001: {
    label: "Escamilla R.F. Knee biomechanics of the dynamic squat exercise. Medicine & Science in Sports & Exercise, 2001",
    href: "https://doi.org/10.1097/00005768-200101000-00020",
  },
  bull2020: {
    label: "Bull F.C. et al. World Health Organization 2020 guidelines on physical activity and sedentary behaviour. British Journal of Sports Medicine, 2020",
    href: "https://doi.org/10.1136/bjsports-2020-102955",
  },
};

/**
 * Rep rules: app repo, branch v1.6, Services/PushUpDetection/SquatStateMachine.swift
 * (`Config` defaults, unchanged since v1.5). Targets: Models/ChallengeTypes.swift
 * `ChallengeDifficulty.defaultTarget`. Setup text: SquatChallengeView.swift.
 */
const RULES = {
  standDeg: 160,
  squatDeg: 100,
  holdSec: 0.15,
  minRepSec: 0.8,
  hipDropPct: 15,
  lostAfterSec: 1,
  targets: { easy: 3, normal: 5, hard: 10 },
} as const;

const squats = CHALLENGES.find((c) => c.slug === "squats")!;
const othersWithSquats = COMPETITORS.filter((c) => c.slug !== "rise-mission" && c.missions.some((m) => /squat/i.test(m)));

const FAQ: QA[] = [
  {
    q: "How does a squat alarm clock know I did a real squat?",
    a: `It watches your legs, not the phone. Body-pose detection finds your hip, knee and ankle in each camera frame and measures the knee angle. In Rise Mission a rep counts only when you go from straight legs (about ${RULES.standDeg} degrees) to a deep bend (${RULES.squatDeg} degrees or less) and back up.`,
  },
  {
    q: "Where should I put my phone for a squat alarm?",
    a: "Prop it up at about waist height, facing you, then step back until your whole body is in the frame. A shelf, a dresser or a stack of books works. Your hips, knees and ideally your ankles need to stay visible for the whole rep.",
  },
  {
    q: "Is a squat alarm better than a push-up alarm?",
    a: "For most people, yes, at least to start. Squats need no floor space beyond where you stand, are easier on wrists and shoulders, and the phone can sit at waist height instead of on the floor. Push-ups suit people who already do them comfortably and want a harder start.",
  },
  {
    q: "Who should not use a squat alarm?",
    a: "Skip it if you have a knee, hip or back injury, get dizzy when you stand up quickly, are pregnant without your doctor's go-ahead, or share a room where a lamp and movement at 6 AM would wake someone. A quiet brain challenge such as math or memory suits those mornings better.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A squat alarm clock asks you to stand up and do a set of real squats, counted by the camera, before your morning starts.</strong>{" "}
        Body-pose detection tracks your hip, knee and ankle, and a rep only counts on a full stand, squat and stand. It
        gets you vertical fast, though research suggests exercise on waking makes you feel more awake rather than think
        more sharply.
      </Answer>

      <KeyTakeaways
        items={[
          "Squat alarms use the camera and body-pose detection, so they count your knees bending, not the phone moving.",
          `In Rise Mission a rep needs straight legs (about ${RULES.standDeg}°), a deep bend (${RULES.squatDeg}° or less), a short hold and at least ${RULES.minRepSec} seconds in total.`,
          "Put the phone at waist height and step back so your whole body is in frame. Light matters as much as placement.",
          `Start small: ${RULES.targets.easy} to ${RULES.targets.normal} squats is enough to get you up. Save the workout for later.`,
        ]}
      />

      <H2>What a squat alarm is</H2>
      <p>
        A squat alarm is a type of wake-up challenge, sometimes called an alarm mission. Instead of tapping a button,
        you stand up and do a small set of bodyweight squats while the phone watches. When the set is done, the
        challenge ends. It sits in the same family as the{" "}
        <Link href="/blog/push-up-alarm-clock">push-up alarm clock</Link>, and both rely on the same idea: it is very
        hard to stay asleep while you are standing up and moving your legs.
      </p>
      <p>
        Squats have one big practical advantage over push-ups. You do them where you already stand, so you don&apos;t
        have to get down on the floor in the dark, and the phone sits at a normal height instead of propped against a
        skirting board. For a lot of people that makes squats the easier body challenge to keep up for weeks rather
        than days.
      </p>
      <p>
        Squat missions are not unique to one app. Of the iPhone alarm apps in our{" "}
        <Link href="/alarm-app-size-comparison">alarm app size comparison</Link>, the App Store listings of{" "}
        {othersWithSquats.map((c) => c.shortName).join(" and ")} also name squats (listings checked {SNAPSHOT_DATE}).
        What differs between apps is how strictly a rep is checked, which is what most of this guide is about.
      </p>

      <H2>How the camera counts a squat</H2>
      <p>
        The phone streams frames from the front camera, and a pose model estimates where your joints are in each frame.
        On iPhone, Apple&apos;s Vision framework does this on the device. For squats, the useful joints are the hip,
        the knee and the ankle. Draw a line from hip to knee and another from knee to ankle, and the angle between
        them tells you how bent your legs are: close to straight when you stand, much smaller at the bottom of a squat.
      </p>
      <p>
        I build <Link href="/">Rise Mission</Link>, so I can tell you exactly what its squat challenge checks, rather
        than describing squat counters in general. {squats.how} {FACTS.onDevice} A rep has to pass every one of these
        rules:
      </p>
      <ol>
        <li>
          <strong>Start standing.</strong> Your knee angle has to read about {RULES.standDeg} degrees or more before the
          counter is ready. Until then it asks you to stand in view, facing the camera.
        </li>
        <li>
          <strong>Go deep enough.</strong> The knee has to bend to {RULES.squatDeg} degrees or less. Shallow dips
          don&apos;t reach that, and the screen says &quot;Go lower&quot;.
        </li>
        <li>
          <strong>Pause at the bottom.</strong> You have to stay down for at least {RULES.holdSec} seconds, which rules
          out a fast bounce.
        </li>
        <li>
          <strong>Stand all the way up.</strong> The rep counts only when your legs are straight again.
        </li>
        <li>
          <strong>Take your time.</strong> The whole rep, from starting down to standing up, has to take at least{" "}
          {RULES.minRepSec} seconds. Jittery half reps are too fast to count.
        </li>
      </ol>
      <p>
        There is also a buffer of a few degrees around each threshold, so standing still near the line can&apos;t
        flicker in and out of a rep. These numbers are deliberately forgiving for a groggy person and strict for
        anyone trying to cheat it.
      </p>

      <H3>What happens if your feet are out of frame</H3>
      <p>
        At home the camera often can&apos;t see your ankles, because the bed or a chair is in the way. A knee angle
        without an ankle is easy to fake: you could bend your knees while barely lowering your body. So when no ankle
        is clearly visible, Rise Mission adds a second check. It remembers how high your hips were while you stood, and
        the squat only counts if your hips drop by at least {RULES.hipDropPct}% of your thigh length. If they
        don&apos;t, the screen says &quot;Lower your hips&quot;.
      </p>
      <H3>What happens if you step out of view</H3>
      <p>
        If the camera loses you for more than {RULES.lostAfterSec} second, the rep in progress is dropped and the
        counter waits until it can see you again, starting from a fresh stand. Reps you already finished are kept.
      </p>

      <H2>Does squatting on waking actually help?</H2>
      <p>
        The groggy spell after you wake has a name, <strong>sleep inertia</strong>. It is a real dip in alertness and
        performance that fades with time awake, and it is worse after short sleep (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>) and when an alarm wakes you from deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>).
      </p>
      <p>
        The closest test of exercise against sleep inertia is a small lab study: 15 young adults woken from a
        night-time nap did 30 seconds of hard cycling, 30 seconds of easy cycling or nothing (
        <a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). They felt least sleepy after the hard burst, but their
        reaction time and thinking tests were no better than when they sat still.
      </p>
      <p>
        So the honest promise of a squat alarm is that it gets you up and makes you feel more awake. It does not make
        you sharp instantly. Nobody has studied squat alarms directly, and cycling after a nap is not squats after a
        full night, so treat the research as a hint rather than proof.
      </p>
      <Callout title="What the research doesn't show">
        No study shows that morning squats improve sleep quality, mood or fitness more than squats at any other time
        of day. The case for a squat alarm is practical: standing up and moving your legs is incompatible with going
        back to sleep.
      </Callout>
      <p>
        There is a small fitness bonus. The World Health Organization recommends muscle-strengthening activity for
        the major muscle groups on two or more days a week for adults (
        <a href={EXTRA.bull2020.href}>Bull et al., 2020</a>). A handful of morning squats won&apos;t meet that on its
        own, but it is a daily habit pointed in the right direction.
      </p>

      <H2>How to set up a squat alarm so it counts reliably</H2>
      <p>
        Almost every &quot;it didn&apos;t count my squat&quot; problem is placement or light. The in-app setup card says
        it in three lines: prop your phone up at about waist height, step back so your whole body is visible, then
        squat down and stand back up. Here is the longer version.
      </p>
      <H3>1. Phone at waist height, facing you</H3>
      <p>
        A dresser, a shelf or a stack of books works. Too low and the camera looks up at your knees; too high and it
        looks down on your head. Portrait orientation keeps more of your body in frame.
      </p>
      <H3>2. Step back until you fit</H3>
      <p>
        You want hips, knees and ideally ankles in view for the whole movement. In a small bedroom that usually means
        standing two or three steps away. Pick the spot the night before.
      </p>
      <H3>3. Turn a light on first</H3>
      <p>
        Pose detection needs to see you, and a dark room at 6 AM is the most common reason counting fails. A lamp on a
        timer or a smart bulb fixes it, and morning light helps you wake up anyway (
        <a href={SRC.blume2019.href}>Blume et al., 2019</a>).
      </p>
      <H3>4. Clear the background</H3>
      <p>
        A coat on a chair or a mirror behind you can look like a second person to a pose model. A plain wall behind
        you is ideal.
      </p>
      <H3>5. Rehearse once</H3>
      <p>{FACTS.testAlarm} Do a full set in that room so you know the placement works before you rely on it.</p>

      <table>
        <thead>
          <tr>
            <th>What you see</th>
            <th>Likely cause</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&quot;Stand in view, facing the camera&quot;</td>
            <td>The camera can&apos;t find your legs</td>
            <td>Step back, raise the phone to waist height</td>
          </tr>
          <tr>
            <td>&quot;Go lower&quot;</td>
            <td>Knees not bent to {RULES.squatDeg}° or less</td>
            <td>Sit back further, as if onto a low chair</td>
          </tr>
          <tr>
            <td>&quot;Lower your hips&quot;</td>
            <td>Ankles hidden and hips barely dropped</td>
            <td>Lower your hips, or move so your feet are in frame</td>
          </tr>
          <tr>
            <td>&quot;Stand all the way up&quot;</td>
            <td>Legs not straight at the top</td>
            <td>Finish each rep fully upright</td>
          </tr>
          <tr>
            <td>Counting stops in winter</td>
            <td>Room too dark</td>
            <td>Lamp on a timer, or let the backup challenge take over</td>
          </tr>
        </tbody>
      </table>

      <H2>How many squats should an alarm ask for?</H2>
      <p>
        Fewer than your workout. Rise Mission&apos;s difficulty levels ask for {RULES.targets.easy} squats on Easy,{" "}
        {RULES.targets.normal} on Normal and {RULES.targets.hard} on Hard, with a custom number if you want it. My
        advice is to start on Easy for the first week. Balance and coordination are worse in the first groggy minutes
        (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>), and the goal is to get you standing, not to test
        your legs.
      </p>
      <p>
        Depth matters more than count. A biomechanics review of the squat found that the forces on the knee rise as the
        knee bends further (<a href={EXTRA.escamilla2001.href}>Escamilla, 2001</a>), so if your knees complain, it is
        better to do fewer reps that just reach the counter&apos;s depth than to drop lower than you need. The counter
        does not reward extra depth.
      </p>

      <H2>Squats compared with other body challenges</H2>
      <p>
        Squats are one of several ways to get your body involved. Here is how they compare with the other physical
        challenges, all of which are in the same app:
      </p>
      <table>
        <thead>
          <tr>
            <th>Challenge</th>
            <th>What it checks</th>
            <th>Space needed</th>
            <th>Quiet?</th>
            <th>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Squats</td>
            <td>Knee angle and hip drop via the camera</td>
            <td>Where you stand</td>
            <td>Fairly</td>
            <td>Getting up fast with little setup</td>
          </tr>
          <tr>
            <td>
              <Link href="/blog/push-up-alarm-clock">Push-ups</Link>
            </td>
            <td>Elbow angle via the camera</td>
            <td>A patch of floor</td>
            <td>Fairly</td>
            <td>People who already do push-ups</td>
          </tr>
          <tr>
            <td>
              <Link href="/blog/step-alarm-clock">Walk</Link>
            </td>
            <td>Steps from the motion coprocessor</td>
            <td>A route through your home</td>
            <td>Yes</td>
            <td>No camera, moving to another room</td>
          </tr>
          <tr>
            <td>
              <Link href="/blog/qr-code-alarm-clock">QR code</Link>
            </td>
            <td>A scan of your own code</td>
            <td>Another room</td>
            <td>Yes</td>
            <td>People who need distance from the bed</td>
          </tr>
        </tbody>
      </table>
      <p>
        If you are not sure which suits you, our guide to{" "}
        <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link> walks through body and brain
        challenges, and{" "}
        <Link href="/blog/alarm-that-makes-you-get-out-of-bed">alarms that make you get out of bed</Link> compares the
        ones that force you to stand up.
      </p>

      <H2>Who a squat alarm isn&apos;t for</H2>
      <ul>
        <li>
          <strong>You have a knee, hip or back injury.</strong> Waking up isn&apos;t worth a flare-up. Pick a brain
          challenge instead.
        </li>
        <li>
          <strong>You get lightheaded when you stand up fast.</strong> Sit on the edge of the bed for a moment, stand
          slowly, and consider the Walk challenge.
        </li>
        <li>
          <strong>You share a room.</strong> A lamp and movement at 6 AM will wake a partner or a child. The{" "}
          <Link href="/blog/math-alarm-clock">math alarm</Link> is silent and dark-friendly.
        </li>
        <li>
          <strong>You don&apos;t want a camera involved.</strong> Fair enough, even when nothing is stored. Walk and
          Shake count movement with sensors instead.
        </li>
      </ul>
      <p>
        And because a ringing alarm should never trap anyone: {FACTS.backupChallenge} {FACTS.emergencyDismiss}{" "}
        {FACTS.systemStop}
      </p>

      <H2>Privacy: what happens to the camera frames</H2>
      <p>
        A camera pointed at you first thing in the morning deserves a straight answer. {PRIVACY_COPY.long} Whatever
        app you use, check that pose detection runs on the device and that the app says plainly whether frames are
        stored.
      </p>

      <H2>Make the rest of the morning easier</H2>
      <p>
        A squat alarm handles the hardest moment, getting out of bed. It can&apos;t fix too little sleep: adults need
        at least 7 hours a night regularly (<a href={SRC.watson2015.href}>Watson et al., 2015</a>). The{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> works backwards from your alarm to a bedtime, and
        the rest of our <Link href="/blog/topic/wake-up-challenges">wake-up challenge guides</Link> cover the other
        mission types.
      </p>

      <H2>Where squat alarms fall short</H2>
      <Limits>
        <p>
          The evidence on exercise right after waking is thin: one small lab study found people felt less sleepy but
          didn&apos;t perform better (<a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>), and nothing shows that
          squat alarms improve sleep or health. Camera counting depends on light and placement and will sometimes
          fail, which is why a backup challenge matters. This isn&apos;t medical or exercise advice: if you have a
          joint injury, a heart or blood pressure condition, or are pregnant, ask a doctor before adding morning
          exercise. If you sleep enough but still can&apos;t wake, raise it with a doctor too (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[SRC.tassi2000, EXTRA.hilditch2019, EXTRA.kovac2021, SRC.blume2019, EXTRA.bull2020, EXTRA.escamilla2001, SRC.watson2015, SRC.aasmDisorders]}
      />
    </BlogLayout>
  );
}
