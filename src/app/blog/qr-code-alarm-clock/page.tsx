import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("qr-code-alarm-clock");

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
};

const qr = CHALLENGES.find((c) => c.slug === "qr-code")!;

const FAQ: QA[] = [
  {
    q: "How does a QR code alarm clock work?",
    a: "You place a QR code somewhere away from your bed, usually in another room. When the alarm rings, the only way to stop it with the challenge is to walk to the code and scan it with your phone's camera. By the time you've walked there, you're standing, moving and usually in the light.",
  },
  {
    q: "Where is the best place to put an alarm QR code?",
    a: "Somewhere you need to be in the morning anyway and that is well lit: the bathroom mirror, the kitchen, next to the coffee machine. Far enough that you have to walk, but not somewhere awkward or unsafe to reach in the dark.",
  },
  {
    q: "Should I print the QR code or show it on a screen?",
    a: "Print it. Paper needs no power, never goes to sleep and doesn't glare much under a matte finish. A code on a tablet or computer screen can fail if the device is off, locked, dimmed or out of battery.",
  },
  {
    q: "What happens if I lose the QR code?",
    a: "Keep a spare copy, and use an alarm with an emergency way out. A QR alarm without an escape hatch can leave you stuck with a ringing phone if the code is damaged or you're away from home.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A QR code alarm only stops when you walk to a code in another room and scan it.</strong> You put a
        printed code somewhere like the bathroom mirror or kitchen, and the alarm keeps ringing until the camera reads
        it. The walk gets you out of bed, and the scan needs just enough attention that autopilot can&apos;t finish the
        job.
      </Answer>

      <KeyTakeaways
        items={[
          "Distance alone fails because you can walk back to bed. Distance plus a task in the other room is what works.",
          "Put the code where your morning already starts, and where there's a light switch.",
          "Print the code on matte paper. A screen can be off, locked or dimmed when you need it.",
          "Plan for failure: a spare copy, a travel copy, and an alarm with an emergency exit.",
        ]}
      />

      <H2>The oldest alarm trick, upgraded</H2>
      <p>
        Every heavy sleeper has been told to put the alarm across the room. It half works. You stand up, walk over,
        switch it off and walk straight back to bed, often without remembering any of it. The reason is that walking a
        few steps and pressing a button are simple, well-rehearsed actions, and the groggy state right after waking
        handles them fine.
      </p>
      <p>
        A QR code alarm keeps the distance and adds a small task at the far end. The alarm stays with you, ringing,
        and the &quot;off switch&quot; is a code stuck to the wall in another room. You carry the phone there, aim the
        camera and hold it steady until it reads. In <Link href="/">Rise Mission</Link>, the alarm app I build, the
        challenge is described simply: {qr.how}
      </p>

      <H2>Why distance plus a task works</H2>
      <p>
        For a while after waking, your brain is in a state called <strong>sleep inertia</strong>: alertness, reaction
        time and memory are all measurably worse than normal, especially if the alarm pulls you out of deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). The grogginess fades the longer you&apos;re awake,
        and it&apos;s heavier when you&apos;re short on sleep (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>).
      </p>
      <p>A QR alarm uses that in three ways:</p>
      <ol>
        <li>
          <strong>It buys time awake.</strong> Getting out of bed, walking and scanning takes a minute or two. That
          minute is spent upright, not lying in a warm bed where sleep is easy.
        </li>
        <li>
          <strong>It moves you away from the bed.</strong> Once you&apos;re standing in the kitchen, getting back into
          bed is a decision you have to make, not something that just happens.
        </li>
        <li>
          <strong>It usually puts you in the light.</strong> You need light to scan a code, so you switch a light on.
          Light is the strongest cue your body clock gets (<a href={SRC.blume2019.href}>Blume et al., 2019</a>).
        </li>
      </ol>
      <p>
        None of this is magic, and no study has tested QR alarms specifically. It&apos;s a well-designed obstacle: hard
        to skip without waking up, easy once you are awake.
      </p>

      <H2>Where to put the code</H2>
      <p>
        The best spot is somewhere you need to be in the first ten minutes anyway. That way scanning the code is step
        one of your morning, not a detour.
      </p>
      <table>
        <thead>
          <tr>
            <th>Spot</th>
            <th>Why it works</th>
            <th>Watch out for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bathroom mirror</td>
            <td>You&apos;re one step from cold water on your face and brushing your teeth</td>
            <td>Steam can curl or smudge paper; tape it at the edge of the mirror, not the middle</td>
          </tr>
          <tr>
            <td>Kitchen, next to the kettle or coffee maker</td>
            <td>Pairs the scan with a reward you look forward to</td>
            <td>Splashes; put it inside a cupboard door or in a plastic sleeve</td>
          </tr>
          <tr>
            <td>By the front door or your shoes</td>
            <td>Good for early runners and dog walkers</td>
            <td>Can be cold and dark in winter; check there&apos;s a light switch</td>
          </tr>
          <tr>
            <td>Window in another room</td>
            <td>You open the blinds and get daylight while you scan</td>
            <td>Before sunrise, you&apos;ll still need a lamp</td>
          </tr>
          <tr>
            <td>Bedroom door (inside)</td>
            <td>Better than the bedside table if you live in one room</td>
            <td>Too close: easy to scan and climb back into bed</td>
          </tr>
        </tbody>
      </table>
      <H3>Four placement rules</H3>
      <ul>
        <li>
          <strong>Another room if you can.</strong> The further the walk, the more the task works. If you live in a
          studio, put it as far from the bed as possible, ideally by the bathroom.
        </li>
        <li>
          <strong>Next to a light switch.</strong> You&apos;ll need light to scan it anyway.
        </li>
        <li>
          <strong>Safe to reach half-asleep.</strong> No stairs in the dark, no climbing on a chair, nothing a child
          could rip down.
        </li>
        <li>
          <strong>At eye level, flat and still.</strong> A code that flaps or sits in shadow takes longer to read and
          makes you fumble.
        </li>
      </ul>

      <H3>Living in one room?</H3>
      <p>
        A studio, a dorm or a shared house where your bedroom is your only space makes the method harder, but not
        useless. Put the code as far from the bed as the room allows, ideally on the bathroom door or by the sink, and
        face it away from the bed so you can&apos;t scan it while sitting up. Some people tape it inside a wardrobe door
        or on the back of the front door. The test is simple: if you can reach it without fully standing up, it&apos;s
        too close. In a shared house, the kitchen works well as long as the walk there is quiet and safe in the dark.
      </p>

      <H2>Print it or show it on a screen?</H2>
      <p>
        Print it. I&apos;d recommend paper for almost everyone, for reasons that only show up at 6 AM:
      </p>
      <ul>
        <li>
          <strong>Paper has no off switch.</strong> A code shown on a tablet or laptop only works if that device is on,
          awake and unlocked. If it updated overnight, ran out of battery or dimmed, your alarm keeps ringing.
        </li>
        <li>
          <strong>Matte paper doesn&apos;t glare.</strong> Glossy paper and screens reflect the ceiling light, which can
          make a camera struggle. Plain printer paper is ideal.
        </li>
        <li>
          <strong>Size helps.</strong> A code roughly the size of your palm reads quickly from arm&apos;s length. Very
          small codes force you to get close and steady your hand.
        </li>
        <li>
          <strong>Protect it.</strong> A plastic sleeve or a strip of clear tape over the code keeps steam and splashes
          off. Keep it flat; creases across the code can stop it reading.
        </li>
      </ul>
      <p>
        If you don&apos;t have a printer, a photo printed at a pharmacy kiosk or copy shop works. A code on a second,
        always-on screen is a fallback, not a plan.
      </p>

      <H2>When the QR method fails, and what to do</H2>
      <p>
        A QR alarm is the most effective challenge for some people, and the one most likely to go wrong for
        others, because it depends on a physical object being where you left it. These are the failure modes I&apos;d
        plan for:
      </p>
      <H3>The code gets lost, wet or torn</H3>
      <p>
        Print two copies the day you set it up. Stick one up and put the spare in a drawer far from the bed (not on the
        bedside table, or it becomes the easy way out).
      </p>
      <H3>You&apos;re travelling</H3>
      <p>
        Take a printed copy or a photo of it on another device, or switch to a challenge that needs no setup in the
        room, such as a <Link href="/blog/step-alarm-clock">step-counting walk alarm</Link> or a{" "}
        <Link href="/blog/math-alarm-clock">math alarm</Link>.
      </p>
      <H3>The room is too dark to scan</H3>
      <p>
        Turn on the light. It&apos;s part of the method. If you can&apos;t (a partner asleep, a baby nearby), a camera
        challenge is the wrong choice for that morning. {FACTS.backupChallenge}
      </p>
      <H3>You need to stop the alarm right now</H3>
      <p>
        A challenge should be tough, never a trap. {FACTS.emergencyDismiss} Know where that exit is before you rely on
        the alarm, whatever app you use.
      </p>
      <Callout title="Rehearse before tomorrow">
        {FACTS.testAlarm} Do the full walk and scan once, at the time of day you&apos;ll actually use it, so you know the
        code reads in that light.
      </Callout>

      <H2>Making the walk count</H2>
      <p>
        The scan is the obstacle; what you do next decides whether you stay up. A few habits that turn the QR walk into
        a morning:
      </p>
      <ul>
        <li>
          <strong>Leave the phone by the code.</strong> Once it&apos;s scanned, put the phone down where you scanned it
          and start the next step: water, face wash, kettle.
        </li>
        <li>
          <strong>Keep the bedroom phone-free.</strong> Charging the phone in the bedroom is fine for the alarm, but
          scrolling in bed after scanning undoes the point.
        </li>
        <li>
          <strong>Keep your wake time steady.</strong> Regular sleep timing matters on its own; in a large cohort study,
          sleep regularity predicted mortality risk better than sleep duration (
          <a href={SRC.windred2023.href}>Windred et al., 2023</a>). An alarm you scan at the same time every day helps
          build that.
        </li>
      </ul>
      <p>
        If the real problem is that you&apos;re exhausted, a QR code won&apos;t solve it. Adults need at least 7 hours
        regularly (<a href={SRC.watson2015.href}>Watson et al., 2015</a>), and our{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> can suggest a bedtime for your wake time. The{" "}
        <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">heavy sleeper guide</Link> covers sound, light and
        schedule in more depth, and{" "}
        <Link href="/blog/wake-up-challenges-explained">our overview of wake-up challenges</Link> compares the QR method
        with every other type.
      </p>

      <H2>Who should skip the QR method</H2>
      <Limits>
        <p>
          The QR method is a practical obstacle, not a treatment, and there&apos;s no research on QR alarms themselves;
          the reasoning rests on what&apos;s known about sleep inertia and light. It suits people who live somewhere
          with a second room or a decent walk from the bed. It&apos;s a poor fit if you have mobility problems, use a
          wheelchair, are on call and need to respond instantly, or share a home where walking around in the dark wakes
          others. Snoozing itself isn&apos;t clearly harmful (<a href={SRC.sundelin2023.href}>Sundelin et al., 2023</a>),
          so if you get up on time already, you may not need this. And if you sleep enough but still can&apos;t wake,
          talk to a doctor (<a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          SRC.tassi2000,
          EXTRA.hilditch2019,
          SRC.blume2019,
          SRC.windred2023,
          SRC.watson2015,
          SRC.sundelin2023,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
