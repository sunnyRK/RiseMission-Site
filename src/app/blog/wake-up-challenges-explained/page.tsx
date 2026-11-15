import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("wake-up-challenges-explained");

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

const FAQ: QA[] = [
  {
    q: "What is a wake-up challenge or alarm mission?",
    a: "It's a task an alarm makes you complete before it stops ringing: solving math problems, typing a phrase, walking a number of steps, doing push-ups in front of the camera, or scanning a code in another room. The point is that switching it off needs more than a half-asleep tap.",
  },
  {
    q: "Are alarm challenges better than snoozing?",
    a: "Research hasn't tested alarm challenges directly. What it does show is that the first minutes after waking are a groggy state called sleep inertia, and that snoozing for 30 minutes isn't clearly harmful for people who already do it. Challenges help people whose real problem is switching the alarm off and falling back asleep.",
  },
  {
    q: "Which wake-up challenge is the hardest to cheat?",
    a: "Challenges that need you out of bed are the hardest to finish on autopilot: scanning a code placed in another room, walking, or a camera-counted exercise. Mental challenges such as math can be done lying down, so they work best when the phone is also out of reach.",
  },
  {
    q: "Can a wake-up challenge trap me if something goes wrong?",
    a: "It shouldn't. A safe challenge alarm always has a way out, such as an emergency dismiss or a backup challenge for when the camera can't see you. Before relying on any challenge alarm, test the whole flow during the day.",
  },
];

const physical = CHALLENGES.filter((c) => c.kind === "physical");
const mental = CHALLENGES.filter((c) => c.kind === "mental");

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A wake-up challenge is a task your alarm makes you finish before it stops ringing.</strong> Instead of
        one tap, you solve math, walk, scan a code in another room or do push-ups. It works because the groggy first
        minutes after waking can handle a tap but struggle with a real task, so by the time you finish, you&apos;re up.
      </Answer>

      <KeyTakeaways
        items={[
          "Silencing a normal alarm takes almost no thought, which is why a groggy brain does it without you.",
          "Challenges come in two families: body challenges that get you out of bed and brain challenges that need focus.",
          "The best challenge depends on how you sleep, who shares your room, and whether you want the camera involved.",
          "There is no study testing alarm challenges head to head. They are a habit tool, not a sleep treatment.",
          "A good challenge alarm is tough but never a trap: it needs a backup and an emergency exit.",
        ]}
      />

      <H2>What alarm missions actually are</H2>
      <p>
        &quot;Mission&quot;, &quot;challenge&quot;, &quot;puzzle alarm&quot;: different apps use different names for the
        same idea. The alarm rings like any other, but the button that stops it is replaced (or joined) by a task. Until
        the task is done, the sound keeps going.
      </p>
      <p>
        I build <Link href="/">Rise Mission</Link>, an iPhone alarm that works this way, so I spend a lot of time
        thinking about which tasks actually wake people and which ones they learn to beat. The honest answer is that no
        single challenge is best. They differ in what they demand from you and what they need from the phone.
      </p>
      <p>Most challenges fall into one of two families:</p>
      <ul>
        <li>
          <strong>Body challenges</strong> make you move: walk a number of steps, scan a code that lives in another
          room, do push-ups or squats that the camera counts, or find a real object.
        </li>
        <li>
          <strong>Brain challenges</strong> make you think: solve arithmetic, type a sentence exactly, repeat a pattern
          from memory, or say a phrase out loud.
        </li>
      </ul>
      <p>
        For reference, these are the {FACTS.challengeCount} challenges in Rise Mission today and what each one uses on
        the phone:
      </p>
      <table>
        <thead>
          <tr>
            <th>Challenge</th>
            <th>Type</th>
            <th>How it works</th>
            <th>Needs</th>
          </tr>
        </thead>
        <tbody>
          {[...physical, ...mental].map((c) => (
            <tr key={c.slug}>
              <td>{c.name}</td>
              <td>{c.kind === "physical" ? "Body" : "Brain"}</td>
              <td>{c.how}</td>
              <td>{c.needs}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <H2>Why a task beats a single tap</H2>
      <p>
        Waking up is gradual. For a while after you open your eyes, part of your brain is still behaving as if it&apos;s
        asleep. Researchers call this <strong>sleep inertia</strong>: reaction time, memory and decision-making are worse
        than normal, and the effect is strongest when you&apos;re woken from deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). A more recent review adds that the grogginess is
        worse after sleep loss and depends on the time of day you wake (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>).
      </p>
      <p>
        That groggy state is good at one thing: simple, rehearsed movements. Reaching for a phone and pressing a button
        is about as rehearsed as it gets. Plenty of people turn an alarm off and have no memory of doing it.
      </p>
      <p>
        A challenge changes the deal. It asks for something that a half-awake brain finds hard to finish: carrying a
        digit, holding a pattern in memory, standing up and walking into the kitchen. You can&apos;t do it without
        engaging, and the minute or two it takes is time in which you&apos;re upright, moving or thinking rather than
        sinking back into the pillow.
      </p>

      <H3>Where snoozing fits in</H3>
      <p>
        It&apos;s worth being precise here, because a lot of alarm marketing isn&apos;t. A 2023 study of habitual
        snoozers found that 30 minutes of snoozing cost only a few minutes of sleep and didn&apos;t make people sleepier
        or worse at cognitive tests afterwards (<a href={SRC.sundelin2023.href}>Sundelin et al., 2023</a>). So the claim
        that snoozing &quot;wrecks your brain&quot; is not supported.
      </p>
      <p>
        Challenges aren&apos;t about fixing a harmful snooze. They&apos;re for a different problem: the alarm that you
        switch off completely and then sleep through, or the 10-minute snooze that turns into an hour. If you snooze
        twice, get up on time and feel fine, you may not need any of this. Our guide on{" "}
        <Link href="/blog/how-to-stop-hitting-snooze">how to stop hitting snooze</Link> covers the habit side in more
        depth.
      </p>

      <H2>Body challenges vs brain challenges</H2>
      <p>
        Both families make you engage, but they do it differently, and the difference matters when choosing one.
      </p>
      <H3>Body challenges get you vertical</H3>
      <p>
        The big advantage of a body challenge is that it ends with you standing up, often in another room, often with a
        light on. Light is the strongest signal your body clock receives (
        <a href={SRC.blume2019.href}>Blume et al., 2019</a>), so a challenge that walks you to a bright kitchen does two
        jobs at once.
      </p>
      <p>
        Exercise on waking is more nuanced than it sounds. In a small lab study, 30 seconds of hard cycling right after
        waking made people <em>feel</em> less sleepy, but their cognitive performance was no better than when they
        stayed still (<a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). So movement seems to help you feel awake;
        it doesn&apos;t make you sharp instantly.
      </p>
      <p>
        Read the deep dives on the{" "}
        <Link href="/blog/push-up-alarm-clock">push-up alarm clock</Link>, the{" "}
        <Link href="/blog/step-alarm-clock">step-counting walk alarm</Link> and the{" "}
        <Link href="/blog/qr-code-alarm-clock">scan-a-code-in-another-room QR alarm</Link> for setup details.
      </p>
      <H3>Brain challenges work anywhere</H3>
      <p>
        Brain challenges need no space, no light and no camera. They&apos;re quiet, which matters if someone sleeps next
        to you, and they work in a hotel room or on a dark winter morning. Their weakness is that you can do them lying
        down. A brain challenge with the phone on the bedside table is much easier to finish and fall back asleep than
        one with the phone across the room. The{" "}
        <Link href="/blog/math-alarm-clock">math alarm clock guide</Link> covers how to pick a difficulty that actually
        wakes you.
      </p>

      <H2>Which wake-up challenge fits your sleep</H2>
      <p>
        Here&apos;s how I&apos;d match a challenge to a sleeper. These are practical judgments, not study results: no
        research I know of compares challenge types against each other.
      </p>
      <table>
        <thead>
          <tr>
            <th>If you&hellip;</th>
            <th>Try</th>
            <th>Family</th>
            <th>Camera?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sleep through everything and turn alarms off without remembering</td>
            <td>QR code in another room</td>
            <td>Body</td>
            <td>Yes (to scan)</td>
          </tr>
          <tr>
            <td>Wake up but crawl back into bed within minutes</td>
            <td>Walk, with a route to a window</td>
            <td>Body</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Want a quick jolt and have floor space</td>
            <td>Push-ups or squats</td>
            <td>Body</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Share a room and need to stay quiet</td>
            <td>Math, Typing or Memory</td>
            <td>Brain</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Prefer not to use the camera at all</td>
            <td>Walk, Shake, Math, Typing or Memory</td>
            <td>Either</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Have learned to beat your current challenge half-asleep</td>
            <td>Switch family, or pair a brain challenge with distance</td>
            <td>Either</td>
            <td>Depends</td>
          </tr>
          <tr>
            <td>Travel a lot</td>
            <td>Math or Walk (nothing to set up in the room)</td>
            <td>Either</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>
      <p>
        One more variable: how much sleep you get. A challenge only shortens the time between alarm and upright. If
        you&apos;re regularly under the 7 hours adults need (
        <a href={SRC.watson2015.href}>Watson et al., 2015</a>), every challenge will feel brutal. Our{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> helps you pick a bedtime that fits your alarm, and
        the <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">heavy sleeper guide</Link> covers the rest of the
        setup.
      </p>

      <H2>Safety: a challenge should be tough, never a trap</H2>
      <p>
        An alarm you can&apos;t switch off sounds great at 11 PM and terrible at 6 AM when you&apos;ve hurt your wrist,
        the room is pitch dark, or a baby is asleep next door. Any challenge alarm worth using needs two safety valves.
      </p>
      <ul>
        <li>
          <strong>A backup challenge.</strong> Cameras fail in the dark, and sensors aren&apos;t always available. In
          Rise Mission, {FACTS.backupChallenge.charAt(0).toLowerCase() + FACTS.backupChallenge.slice(1)}
        </li>
        <li>
          <strong>An emergency exit.</strong> {FACTS.emergencyDismiss}
        </li>
      </ul>
      <p>
        Two more practical checks. First, make sure the alarm can actually ring: {FACTS.ringsOnSilent}{" "}
        {FACTS.poweredOff} Second, rehearse. {FACTS.testAlarm} Testing at midday tells you whether the camera can see
        you, whether the QR code scans in that light, and whether the math is too hard before it matters.
      </p>
      <Callout title="A rule of thumb">
        Pick a challenge you could finish in about a minute if you were fully awake. Hard enough to need focus, easy
        enough that you&apos;re never stuck. If it&apos;s regularly taking much longer, make it easier rather than
        relying on the emergency dismiss.
      </Callout>

      <H2>How to get started with a challenge alarm</H2>
      <ol>
        <li>
          <strong>Pick one challenge from the table above</strong>, based on your biggest problem: sleeping through, or
          getting back into bed.
        </li>
        <li>
          <strong>Set one alarm, not a stack.</strong> A challenge on the fifth of five alarms teaches you to ignore the
          first four.
        </li>
        <li>
          <strong>Test it during the day</strong> in the same room and the same light you&apos;ll have in the morning.
        </li>
        <li>
          <strong>Plan your first two minutes after the challenge:</strong> lights on, glass of water, stay standing.
        </li>
        <li>
          <strong>Review after two weeks.</strong> If you&apos;re beating the challenge on autopilot, switch to the
          other family.
        </li>
      </ol>

      <H2>What wake-up challenges can&apos;t do</H2>
      <Limits>
        <p>
          The research on sleep inertia is solid, but there is no trial showing that alarm challenges improve sleep,
          mood or health, and nothing here should be read that way. Challenges make it harder to switch an alarm off
          without waking up. They don&apos;t give you more sleep, and the one study on exercise right after waking found
          people felt more alert without performing better (<a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). If
          you sleep 7 to 9 hours and still can&apos;t wake, are exhausted during the day, or snore heavily, talk to a
          doctor: sleep disorders are diagnosable and treatable (<a href={SRC.aasmDisorders.href}>AASM</a>). If you
          have an injury or a heart condition, choose a brain challenge and check with your doctor before adding
          exercise to your mornings.
        </p>
      </Limits>

      <Sources
        items={[
          SRC.tassi2000,
          EXTRA.hilditch2019,
          SRC.sundelin2023,
          SRC.blume2019,
          EXTRA.kovac2021,
          SRC.watson2015,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
