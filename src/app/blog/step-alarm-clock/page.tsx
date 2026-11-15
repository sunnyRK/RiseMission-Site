import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("step-alarm-clock");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/** Verified via Crossref (title, journal, year) on 2026-11-15. */
const EXTRA = {
  hilditch2019: {
    label: "Hilditch C.J., McHill A.W. Sleep inertia: current insights. Nature and Science of Sleep, 2019",
    href: "https://doi.org/10.2147/NSS.S188911",
  },
  kovac2021: {
    label: "Kovac K. et al. The impact of a short burst of exercise on sleep inertia. Physiology & Behavior, 2021",
    href: "https://doi.org/10.1016/j.physbeh.2021.113617",
  },
};

const walk = CHALLENGES.find((c) => c.slug === "walk")!;
const shake = CHALLENGES.find((c) => c.slug === "shake")!;

const FAQ: QA[] = [
  {
    q: "How does a step alarm clock count steps?",
    a: "It reads the phone's built-in step counter. On iPhone, a low-power motion coprocessor tracks steps from the accelerometer, and the alarm keeps ringing until you reach the target number. The app needs Motion & Fitness permission to read it.",
  },
  {
    q: "Is a walking alarm better than a math alarm?",
    a: "It depends on your problem. If you solve challenges and fall back asleep, walking is better because it ends with you standing away from the bed. If you share a room or can't walk around easily in the morning, a silent math challenge is the better fit.",
  },
  {
    q: "Can you cheat a step alarm by shaking the phone?",
    a: "Phone step counters estimate steps from motion, and vigorous shaking can sometimes register. But shaking a phone hard enough for long enough is its own small workout, and you're awake by the end of it. Carrying the phone on a real walk is easier.",
  },
  {
    q: "Where should I walk when a step alarm goes off?",
    a: "Plan a short route that ends somewhere useful and bright: a window, the kitchen, the bathroom. Walking to daylight combines movement with the strongest wake-up signal your body clock gets.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A step alarm clock keeps ringing until you walk a set number of steps.</strong> The phone&apos;s
        built-in motion sensors count them, so there&apos;s nothing to set up and no camera involved. It works because
        it ends with you upright and away from the bed, and it works best when the walk takes you to a window or a
        bright room.
      </Answer>

      <KeyTakeaways
        items={[
          "On iPhone, steps are counted by a low-power motion coprocessor, so there is nothing to print, place or point a camera at.",
          "Walking beats a tap because you can't do it lying down, and it ends with you away from the bed.",
          "Walk to light: a window, the kitchen or the bathroom. Light is the strongest cue your body clock receives.",
          "Step counting is an estimate. Shuffling may undercount and shaking may overcount, so plan a real route.",
        ]}
      />

      <H2>How a step alarm works</H2>
      <p>
        The alarm rings, a step target appears, and the sound keeps going until you&apos;ve walked that many steps. No
        buttons, no puzzle, no QR code to print. You pick up the phone and walk.
      </p>
      <p>
        Under the hood, the alarm reads your phone&apos;s pedometer. Modern iPhones have a dedicated, low-power motion
        coprocessor that counts steps all day from the accelerometer, which is why the Health app knows your step count
        without draining the battery. A step alarm simply watches that counter go up. In{" "}
        <Link href="/">Rise Mission</Link>, the alarm app I build, the Walk challenge works this way:{" "}
        {walk.how.charAt(0).toLowerCase() + walk.how.slice(1)} The only permission it needs is {walk.needs}.
      </p>
      <p>
        That makes walking one of the lowest-friction challenges to set up. It doesn&apos;t need light like a camera
        challenge, a printed code like a{" "}
        <Link href="/blog/qr-code-alarm-clock">QR code alarm</Link>, or floor space like a{" "}
        <Link href="/blog/push-up-alarm-clock">push-up alarm</Link>.
      </p>

      <H2>Why walking gets you out of bed</H2>
      <p>
        After you wake, your brain spends a while in a groggy state called <strong>sleep inertia</strong>. Alertness and
        reaction time are worse than normal, especially if you were woken from deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>) or are short on sleep (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>). It fades the longer you stay awake. The job
        of any wake-up challenge is to keep you awake through that window instead of letting you slide back.
      </p>
      <p>A step challenge does it with three things a tap can&apos;t:</p>
      <H3>1. You have to stand up</H3>
      <p>
        You can solve a math problem lying down. You can&apos;t walk lying down. By the time the alarm stops, you&apos;re
        on your feet, and getting back into bed is a decision rather than a reflex.
      </p>
      <H3>2. Light movement makes you feel more awake</H3>
      <p>
        The evidence here is small but interesting. In a lab study, people woken in the night did 30 seconds of hard
        cycling, 30 seconds of easy cycling, or nothing. They felt least sleepy after the hard effort, then the easy
        one, then sitting still. Their cognitive test scores, though, didn&apos;t differ (
        <a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). So movement seems to change how awake you feel, which is
        what stops you lying back down, without making you instantly sharp.
      </p>
      <H3>3. Walking can take you to the light</H3>
      <p>
        This is the part most people miss. Light is the strongest signal your body clock receives, and morning light
        helps set your daily rhythm (<a href={SRC.blume2019.href}>Blume et al., 2019</a>). A walk that ends at a window,
        with the blinds open, gives you movement and light together. On dark winter mornings, a walk that ends with a
        bright lamp switched on is the next best thing.
      </p>

      <H2>How to set up a step alarm that works</H2>
      <p>
        The difference between a step alarm that works and one you beat is mostly the route. Pacing next to the bed
        technically gets the steps in, but it keeps the bed in view, and the bed always wins. Plan the walk the night
        before.
      </p>
      <table>
        <thead>
          <tr>
            <th>Where you live</th>
            <th>Suggested route</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>House or large flat</td>
            <td>Bedroom &rarr; kitchen, open the blinds, start the kettle</td>
            <td>Leaves the bedroom, ends with light and a reward</td>
          </tr>
          <tr>
            <td>Small apartment</td>
            <td>Bedroom &rarr; bathroom &rarr; living room window, then loop</td>
            <td>Several rooms, ends at daylight</td>
          </tr>
          <tr>
            <td>Studio or dorm</td>
            <td>Laps from the door to the window, lights on first</td>
            <td>Bed stays behind you, light comes on early</td>
          </tr>
          <tr>
            <td>Garden, balcony or hallway</td>
            <td>Walk outside or along the corridor if it&apos;s safe</td>
            <td>Outdoor light is far brighter than indoor light</td>
          </tr>
          <tr>
            <td>Dog owner</td>
            <td>Leash by the bedroom door, walk the dog</td>
            <td>The dog makes sure you don&apos;t go back</td>
          </tr>
        </tbody>
      </table>
      <H3>Practical tips</H3>
      <ul>
        <li>
          <strong>Hold the phone or keep it in a pocket.</strong> The step counter measures the phone&apos;s motion, so
          it needs to move with you. A phone left on the bed counts nothing.
        </li>
        <li>
          <strong>Walk normally.</strong> Very slow shuffling steps can be missed by phone pedometers, which makes the
          challenge take longer than it should.
        </li>
        <li>
          <strong>Light first, then walk.</strong> Switch on the main light on your way out of the bedroom.
        </li>
        <li>
          <strong>Choose a target that matches your route.</strong> Enough steps that you have to leave the room, not so
          many that you&apos;re pacing for five minutes. Walk your route once in the daytime and look at how many steps
          it takes.
        </li>
        <li>
          <strong>Make the route safe in the dark.</strong> No clutter on the floor, a night light on the stairs, and
          nothing to trip over while you&apos;re still groggy.
        </li>
        <li>
          <strong>Rehearse once.</strong> {FACTS.testAlarm}
        </li>
      </ul>
      <Callout title="Make the end of the walk worth it">
        End the walk somewhere you&apos;d want to be: the coffee machine, a glass of water already poured, the window
        with the best view. The walk gets you up; the reward keeps you up. Our post on the{" "}
        <Link href="/blog/benefits-of-waking-up-early">benefits of waking up early</Link> has more ideas for a good
        first half hour.
      </Callout>

      <H2>A two-week plan for switching to a step alarm</H2>
      <p>
        Changing how you wake up takes a little practice, and the first few mornings are the hardest. This is how
        I&apos;d roll it out:
      </p>
      <ol>
        <li>
          <strong>Days 1 to 3:</strong> set a modest step target and one alarm at your usual time. The only goal is to
          walk out of the bedroom before the alarm stops.
        </li>
        <li>
          <strong>Days 4 to 7:</strong> add the light. Blinds open or the main light on at the end of every walk, no
          exceptions.
        </li>
        <li>
          <strong>Week 2:</strong> add the reward at the end of the route (water, coffee, a shower) and keep the same
          wake time on the weekend, too.
        </li>
        <li>
          <strong>Day 14:</strong> review. If you&apos;re still drifting back to bed after the walk, raise the target
          so the route reaches another room, or switch to a stricter challenge such as a QR code.
        </li>
      </ol>

      <H2>Walking vs other challenges</H2>
      <p>
        Walking sits in the middle of the challenge spectrum. It&apos;s more physical than math, gentler than push-ups,
        and simpler than a QR code. A quick comparison:
      </p>
      <ul>
        <li>
          <strong>vs a QR code alarm:</strong> a QR code forces a specific destination; walking lets you pick. If you
          tend to walk a lap and get back into bed, the QR method is stricter.
        </li>
        <li>
          <strong>vs a push-up alarm:</strong> push-ups are a harder jolt but need light, floor space and the camera.
          Walking needs none of those.
        </li>
        <li>
          <strong>vs Shake:</strong> the Shake challenge is the no-setup cousin of walking: {shake.how.charAt(0).toLowerCase() + shake.how.slice(1)} It&apos;s
          great when you can&apos;t walk around, but you can do it sitting in bed.
        </li>
        <li>
          <strong>vs math:</strong> math is silent and works anywhere, but you can solve it lying down.
        </li>
      </ul>
      <p>
        For the full side-by-side, read{" "}
        <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
      </p>

      <H2>The limits of step counting</H2>
      <p>
        A phone pedometer is an estimate, not a precise measuring device. That has a few practical consequences for a
        step alarm:
      </p>
      <ul>
        <li>
          <strong>It can undercount</strong> very slow or short steps, and steps taken with the phone lying still on a
          table.
        </li>
        <li>
          <strong>It can overcount</strong> other kinds of motion, which is how people try to shake their way through.
          Even when it works, shaking a phone hard for that long wakes you up anyway.
        </li>
        <li>
          <strong>It needs the permission.</strong> If Motion &amp; Fitness access is turned off, the phone can&apos;t
          report steps. {FACTS.backupChallenge}
        </li>
      </ul>
      <p>
        And no challenge can make the alarm ring if the phone can&apos;t: {FACTS.ringsOnSilent} {FACTS.poweredOff} A
        challenge should never trap you, either. {FACTS.emergencyDismiss}
      </p>

      <H2>Get the sleep side right too</H2>
      <p>
        A step alarm gets you moving. It doesn&apos;t give you more sleep. Adults need at least 7 hours a night on a
        regular basis (<a href={SRC.watson2015.href}>Watson et al., 2015</a>), and a steady wake time helps more than
        most people expect: in a large cohort study, sleep regularity predicted mortality risk better than sleep length
        (<a href={SRC.windred2023.href}>Windred et al., 2023</a>). Use our{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> to find a bedtime that fits the alarm.
      </p>

      <H2>Who a step alarm isn&apos;t for</H2>
      <Limits>
        <p>
          There&apos;s no study of step alarms themselves; the case rests on what&apos;s known about sleep inertia,
          light and a small study of exercise after waking, which found people felt more alert without performing
          better (<a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). Walking around in the dark straight after
          waking carries a fall risk, so it&apos;s a poor fit if you have balance or mobility problems, get dizzy when
          you stand up, or have stairs between you and the light. In those cases, a seated challenge such as math or
          Shake is safer. If you sleep 7 to 9 hours and still can&apos;t wake, talk to a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          SRC.tassi2000,
          EXTRA.hilditch2019,
          EXTRA.kovac2021,
          SRC.blume2019,
          SRC.watson2015,
          SRC.windred2023,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
