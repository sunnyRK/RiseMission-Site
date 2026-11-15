import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS, PRIVACY_COPY } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("push-up-alarm-clock");

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
  kovac2021: {
    label: "Kovac K. et al. The impact of a short burst of exercise on sleep inertia. Physiology & Behavior, 2021",
    href: "https://doi.org/10.1016/j.physbeh.2021.113617",
  },
  kovac2020: {
    label: "Kovac K. et al. Exercising caution upon waking: can exercise reduce sleep inertia? Frontiers in Physiology, 2020",
    href: "https://doi.org/10.3389/fphys.2020.00254",
  },
  hilditch2019: {
    label: "Hilditch C.J., McHill A.W. Sleep inertia: current insights. Nature and Science of Sleep, 2019",
    href: "https://doi.org/10.2147/NSS.S188911",
  },
};

const pushUps = CHALLENGES.find((c) => c.slug === "push-ups")!;
const squats = CHALLENGES.find((c) => c.slug === "squats")!;

const FAQ: QA[] = [
  {
    q: "How does a push-up alarm clock count reps?",
    a: "It uses the phone's camera and body-pose detection to track joints such as your shoulder, elbow and wrist. A rep is counted when your arm goes through a full bend and straighten. On iPhone this can run entirely on the device with Apple's Vision framework.",
  },
  {
    q: "Does exercising right after waking up make you more alert?",
    a: "Partly. In a small lab study, 30 seconds of hard exercise after waking made people feel less sleepy, but their reaction time and thinking tests were no better than when they stayed still. Expect to feel more awake, not to be instantly sharp.",
  },
  {
    q: "Where should I put my phone for push-up counting?",
    a: "Lean it against a wall or object at floor level beside or in front of you. A side-on view, where the camera can see one shoulder, elbow and wrist, counts most reliably. Your legs don't need to be in frame.",
  },
  {
    q: "Who shouldn't use a push-up alarm?",
    a: "Anyone with a shoulder, wrist, elbow or back injury, anyone told to avoid sudden exertion, and people who share a room and would wake someone else. A quiet brain challenge such as math is a better fit.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A push-up alarm clock keeps ringing until the camera counts a set of real push-ups.</strong> The phone
        sits at floor level, body-pose detection tracks your shoulder, elbow and wrist, and each full rep counts. It
        gets you out of bed and moving, though research suggests a burst of exercise makes you feel awake more than it
        sharpens your thinking.
      </Answer>

      <KeyTakeaways
        items={[
          "Push-up alarms use the camera and body-pose detection, not motion sensors, so they can tell a real rep from a wobble.",
          "Placement decides whether counting works: floor level, side-on, one shoulder, elbow and wrist in view.",
          "A short burst of exercise on waking reduced how sleepy people felt in a lab study, but didn't improve test performance.",
          "Skip it if you have an upper-body injury or share a room at 6 AM. Pick a quiet challenge instead.",
        ]}
      />

      <H2>How a push-up alarm works</H2>
      <p>
        A normal alarm asks for a tap. A push-up alarm asks you to get on the floor and do a set before the sound stops.
        The interesting part is how a phone knows you did them.
      </p>
      <p>
        The answer is <strong>body-pose detection</strong>. The camera streams frames, and a computer vision model
        estimates where your joints are in each frame: shoulders, elbows, wrists, hips. Your arm angle tells the model
        whether you&apos;re at the top of a push-up (arm straight) or the bottom (arm bent). A rep is one full trip
        down and back up. Half reps, a hand wave, or shaking the phone don&apos;t count, because the model is looking at
        your body, not at movement of the phone.
      </p>
      <p>
        On iPhone, Apple ships this capability in its Vision framework, and it can run without sending images
        anywhere. In <Link href="/">Rise Mission</Link>, the alarm app I build, the push-up challenge works exactly this
        way: {pushUps.how.charAt(0).toLowerCase() + pushUps.how.slice(1)} {FACTS.onDevice}
      </p>
      <H3>Why the camera beats the accelerometer</H3>
      <p>
        Some fitness alarms try to count exercise with the phone&apos;s motion sensors. That works for steps, but a
        push-up done with the phone on the floor doesn&apos;t move the phone at all, and a push-up with the phone in
        your hand is not a push-up. Pose detection is the reliable way to count bodyweight reps hands-free, which is why
        squat challenges use the same approach: {squats.how.charAt(0).toLowerCase() + squats.how.slice(1)}
      </p>

      <H2>Does exercise on waking actually help?</H2>
      <p>
        The groggy first stretch of the morning has a name: <strong>sleep inertia</strong>. It&apos;s a measurable dip
        in alertness and performance that fades with time awake, and it&apos;s worse after sleep loss (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>) and when you&apos;re woken from deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>).
      </p>
      <p>
        Whether exercise shortens it is a surprisingly new question. A 2020 review pointed out that exercise had not yet
        been tested as a sleep inertia countermeasure, and argued it could plausibly help through blood flow, the
        morning cortisol rise and body temperature (<a href={EXTRA.kovac2020.href}>Kovac et al., 2020</a>).
      </p>
      <p>
        The same group then tested it. Fifteen young adults were woken after a 2-hour nap in the middle of the night and
        did either 30 seconds of sprint cycling, 30 seconds of easy cycling, or nothing (
        <a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). The results were mixed in an instructive way:
      </p>
      <ul>
        <li>People <strong>felt</strong> least sleepy after the hard sprint, then the easy cycle, then sitting still.</li>
        <li>Their <strong>cognitive performance</strong> (reaction time, mental arithmetic, a spatial task) was no different between conditions.</li>
        <li>The hard sprint produced the biggest morning cortisol rise. Core body temperature didn&apos;t differ.</li>
      </ul>
      <p>
        So a burst of push-ups is likely to make you feel more awake, which is exactly what you want when the
        alternative is lying back down. It won&apos;t make you sharp the instant you stand up, and you shouldn&apos;t
        drive or make big decisions on the strength of feeling alert. Note too that this was one small study with
        cycling after a night-time nap, not push-ups after a full night.
      </p>
      <Callout title="What the research doesn't show">
        No study I know of has tested push-up alarms specifically, or shown that morning push-ups improve sleep, mood or
        long-term fitness more than exercise at any other time. The case for a push-up alarm is practical: it&apos;s
        very hard to do push-ups and stay asleep.
      </Callout>

      <H2>How to set up a push-up alarm so it counts reliably</H2>
      <p>
        Nearly every &quot;it didn&apos;t count my reps&quot; problem comes down to where the phone is. These rules
        apply to any camera-based rep counter:
      </p>
      <H3>1. Put the phone at floor level</H3>
      <p>
        Lean it against a wall, a skirting board, a shoe or the leg of a bed, to your left, right or ahead of you. A
        phone on the bedside table looks down at the top of your head and can&apos;t see your arms bend. Portrait and
        landscape orientation both work.
      </p>
      <H3>2. Go side-on</H3>
      <p>
        A side view shows the elbow angle clearly. Head-on, your arm bends towards the camera and the angle is hard to
        read. The camera needs to see <strong>one shoulder, one elbow and one wrist</strong>; your legs don&apos;t need
        to fit in the frame.
      </p>
      <H3>3. Fix the light before you need it</H3>
      <p>
        Pose detection needs to see you. A pitch-black room at 6 AM is the most common reason counting fails. A lamp on
        a timer or a smart bulb solves it, and the light helps wake you anyway (
        <a href={SRC.blume2019.href}>Blume et al., 2019</a>). If it&apos;s too dark or the camera can&apos;t find you,
        Rise Mission offers your backup challenge, and completing it keeps your streak safe.
      </p>
      <H3>4. Clear the spot</H3>
      <p>
        Decide where you&apos;ll do them the night before: a clear patch of floor, ideally a rug, and as little as
        possible in the background that looks like a person, since anything person-shaped can confuse a pose model.
      </p>
      <H3>5. Do a full rep</H3>
      <p>
        Go down until your elbow clearly bends and come back up until it&apos;s straight. Tiny pulses at the top are the
        reps a counter is designed to ignore.
      </p>
      <H3>6. Rehearse once</H3>
      <p>
        {FACTS.testAlarm} Do the full set in the morning light of that room so you know the setup works.
      </p>

      <table>
        <thead>
          <tr>
            <th>Problem</th>
            <th>Likely cause</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reps don&apos;t count at all</td>
            <td>Camera can&apos;t see your arm</td>
            <td>Lower the phone to floor level, turn side-on</td>
          </tr>
          <tr>
            <td>Some reps are missed</td>
            <td>Partial range of motion</td>
            <td>Bend the elbow fully, straighten fully</td>
          </tr>
          <tr>
            <td>Counting stops in winter</td>
            <td>Room is too dark</td>
            <td>Lamp on a timer, or use the backup challenge</td>
          </tr>
          <tr>
            <td>Counter seems confused</td>
            <td>Another person-like shape in view</td>
            <td>Clear clothes or furniture shapes out of the background</td>
          </tr>
          <tr>
            <td>You do them and go back to bed</td>
            <td>Spot is right next to the bed</td>
            <td>Do them in another room with the light on</td>
          </tr>
        </tbody>
      </table>

      <H2>How many push-ups should a wake-up alarm ask for?</H2>
      <p>
        Fewer than you think. The goal is to get you vertical and engaged, not to complete your workout before your eyes
        are open. Pick a number you could do comfortably at midday, then go a bit lower: reaction time and
        coordination are worse in the groggy minutes after waking (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>).
      </p>
      <p>
        A small set done well beats a big set done badly. If you want a real workout, use the alarm to get you up and do
        the workout ten minutes later, once you&apos;re properly awake. Our post on the{" "}
        <Link href="/blog/benefits-of-waking-up-early">benefits of waking up early</Link> covers what a good first half
        hour can look like.
      </p>

      <H2>Who a push-up alarm isn&apos;t for</H2>
      <p>Push-ups are a great challenge for some people and a bad one for others. Skip it if:</p>
      <ul>
        <li>
          <strong>You have a shoulder, elbow, wrist or back injury</strong>, or a condition where a doctor has told you
          to avoid sudden exertion. Waking up isn&apos;t worth a flare-up.
        </li>
        <li>
          <strong>You share a room at 6 AM.</strong> A camera on the floor, a light on and someone puffing through push-ups
          is not a quiet start for a partner, roommate or a child in the same room. A brain challenge such as the{" "}
          <Link href="/blog/math-alarm-clock">math alarm</Link> is silent.
        </li>
        <li>
          <strong>You don&apos;t want the camera involved.</strong> Some people simply prefer not to point a camera at
          themselves in the morning, even when nothing is stored. A{" "}
          <Link href="/blog/step-alarm-clock">step-counting walk alarm</Link> gets you moving without one.
        </li>
        <li>
          <strong>Your floor space is tiny or shared</strong>, such as a dorm or a hotel room you didn&apos;t set up.
        </li>
        <li>
          <strong>You get lightheaded when you stand up fast.</strong> Sit on the edge of the bed for a moment first, or
          choose a gentler challenge.
        </li>
      </ul>
      <p>
        For everyone else, it&apos;s one of the hardest challenges to fake. For a side-by-side of every challenge type,
        see <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
      </p>

      <H2>Privacy: what happens to the camera frames</H2>
      <p>
        A camera pointed at you first thing in the morning deserves a straight answer. Here is how the app I build
        handles it: {PRIVACY_COPY.long}
      </p>
      <p>
        Whatever app you use, check that pose detection runs on the device rather than in the cloud, and that the app
        says plainly whether frames are stored.
      </p>

      <H2>Make the rest of the morning easier</H2>
      <p>
        A push-up alarm handles the hardest moment, getting out of bed. It can&apos;t make up for too little sleep.
        Adults need at least 7 hours a night regularly (<a href={SRC.watson2015.href}>Watson et al., 2015</a>). Our{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> works backwards from your alarm to a bedtime. And
        so the alarm is never a trap: {FACTS.emergencyDismiss}
      </p>

      <H2>Where push-up alarms fall short</H2>
      <Limits>
        <p>
          The evidence on exercise right after waking is thin: one small lab study found people felt less sleepy but
          didn&apos;t perform better (<a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>), and nothing shows that
          push-up alarms improve sleep or health. Camera counting depends on light and placement, so it will sometimes
          fail, which is why a backup matters. This isn&apos;t medical or exercise advice: if you have an injury, a heart
          or blood pressure condition, or are pregnant, ask a doctor before adding morning exercise. And if you sleep
          enough but still can&apos;t wake, that&apos;s worth raising with a doctor too (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          SRC.tassi2000,
          EXTRA.hilditch2019,
          EXTRA.kovac2020,
          EXTRA.kovac2021,
          SRC.blume2019,
          SRC.watson2015,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
