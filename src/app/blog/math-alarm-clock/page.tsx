import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("math-alarm-clock");

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
  lally2010: {
    label: "Lally P. et al. How are habits formed: modelling habit formation in the real world. European Journal of Social Psychology, 2010",
    href: "https://doi.org/10.1002/ejsp.674",
  },
};

const math = CHALLENGES.find((c) => c.slug === "math")!;
const otherMental = CHALLENGES.filter((c) => c.kind === "mental" && c.slug !== "math");

const FAQ: QA[] = [
  {
    q: "Do math alarm clocks actually work?",
    a: "For many people, yes, because solving arithmetic needs working memory and attention that a half-asleep brain struggles to supply. There is no study of math alarms themselves, though. Their weak spot is that you can solve them lying down, so they work best with the phone out of reach.",
  },
  {
    q: "What difficulty should I set on a math alarm?",
    a: "Problems you could solve in a few seconds each when fully awake, but that need you to carry a digit or hold a number in your head. If it takes more than a couple of minutes to finish in the morning, it's too hard; if you can do it with your eyes half shut, it's too easy.",
  },
  {
    q: "Why can I solve my math alarm half-asleep now?",
    a: "Repetition. The same kind of problem at the same time every day becomes familiar, and familiar tasks take less conscious effort. Rotate challenge types every few weeks or add a body challenge that gets you out of bed.",
  },
  {
    q: "Is a math alarm good if I share a room?",
    a: "It's one of the best options. It's silent, works in the dark and needs no camera or floor space, so you can wake yourself without waking anyone else.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A math alarm clock keeps ringing until you solve a few arithmetic problems.</strong> It works because
        carrying digits and holding numbers in your head need attention that the groggy minutes after waking don&apos;t
        have, so autopilot can&apos;t finish it. Its weak spot: you can solve it lying down, and it gets easier with
        repetition.
      </Answer>

      <KeyTakeaways
        items={[
          "Arithmetic is a classic way researchers measure grogginess after waking, because it suffers when you're half asleep.",
          "Choose a difficulty that needs focus but takes you about a minute when awake. Harder isn't better.",
          "Math alarms are silent, camera-free and work anywhere, which makes them ideal for shared rooms and travel.",
          "After a few weeks, some people solve them on autopilot. Rotate challenges, or add distance or a body challenge.",
        ]}
      />

      <H2>How a math alarm works</H2>
      <p>
        The alarm rings, and instead of a stop button you get a sum. Solve it, and you get another, until you&apos;ve
        done the set. Get one wrong and you usually go again. In <Link href="/">Rise Mission</Link>, the alarm app I
        build, the math challenge is exactly that: {math.how.charAt(0).toLowerCase() + math.how.slice(1)} It needs no
        camera, no microphone and no permissions.
      </p>
      <p>
        It sounds almost too simple to work. For most people who sleep through or switch off alarms, it works better
        than they expect, for a specific reason.
      </p>

      <H2>Why arithmetic defeats autopilot</H2>
      <p>
        For a while after you wake, your brain runs below capacity. Researchers call it <strong>sleep inertia</strong>:
        reaction time, memory and reasoning are measurably worse, and it&apos;s strongest after waking from deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). It fades with time awake, and it&apos;s worse when
        you&apos;re short on sleep or waking at an odd hour (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>).
      </p>
      <p>
        Mental arithmetic is one of the standard ways sleep scientists measure that dip. A 2021 sleep inertia study, for
        example, tested people with serial addition and subtraction tasks, alongside reaction time, straight after
        waking (<a href={EXTRA.kovac2021.href}>Kovac et al., 2021</a>). Arithmetic is used because it needs working
        memory: you hold one number while you work on another, then carry a digit. That&apos;s precisely the mental
        machinery that&apos;s slow to come online.
      </p>
      <p>
        Compare that to a normal alarm. Swiping to stop is a single, deeply rehearsed movement. A groggy brain can do it
        while barely conscious, which is how people end up with no memory of turning the alarm off. You can&apos;t do
        37 + 48 that way. Either you engage and wake up a little, or the alarm keeps ringing.
      </p>
      <Callout title="What this doesn't mean">
        Solving math doesn&apos;t clear sleep inertia faster or make you sharper for the rest of the morning. It just
        means you can&apos;t switch the alarm off without becoming awake enough to think. Waking up fully still takes
        time, light and movement.
      </Callout>

      <H2>Choosing the right difficulty</H2>
      <p>
        This is where most people go wrong. The instinct is to set the hardest level so there&apos;s no way to cheat.
        At 6 AM that backfires: a problem you can&apos;t solve makes you frustrated, not awake, and you&apos;ll start
        reaching for the emergency exit or turning the challenge off altogether.
      </p>
      <p>The sweet spot is a set you could finish in about a minute if you were fully awake.</p>
      <table>
        <thead>
          <tr>
            <th>Level (illustrative)</th>
            <th>Example problem</th>
            <th>Good for</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Easy</td>
            <td>7 + 8, 9 &times; 3</td>
            <td>Light sleepers, first week of using a challenge</td>
            <td>Becomes autopilot quickly</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>47 + 36, 64 &minus; 29</td>
            <td>Most people: needs carrying or borrowing</td>
            <td>Fine for weeks, then may get easy</td>
          </tr>
          <tr>
            <td>Hard</td>
            <td>14 &times; 7, 156 &minus; 89</td>
            <td>Heavy sleepers who beat medium half-asleep</td>
            <td>Frustration on bad mornings</td>
          </tr>
          <tr>
            <td>Too hard</td>
            <td>Multi-step problems you&apos;d need paper for</td>
            <td>Nobody, at 6 AM</td>
            <td>You give up and dismiss</td>
          </tr>
        </tbody>
      </table>
      <p>
        The examples are illustrative, not the exact problems any app uses. The point is the ingredient that makes a
        problem wake you: <strong>carrying, borrowing or multiplying</strong>, so you have to hold a number in your
        head. Problems you know by heart (5 + 5, 2 &times; 6) can be answered from memory without working anything out,
        so they ask much less of you.
      </p>
      <H3>How to tune it</H3>
      <ol>
        <li>Start at a middle level. Test it at midday so you know how long it takes awake.</li>
        <li>Use it for a week. If you&apos;re finishing in a few seconds with your eyes half closed, go up a level.</li>
        <li>If you&apos;re regularly stuck for minutes or making mistakes, go down. Stuck isn&apos;t the same as awake.</li>
        <li>Tune the number of problems before the difficulty. More medium problems often beat fewer hard ones.</li>
      </ol>

      <H3>If you&apos;re not a numbers person</H3>
      <p>
        You don&apos;t need to be good at math for this to work. The challenge is relative: what matters is that the
        problem asks for a bit of effort from <em>you</em>, not that it would impress anyone. If two-digit addition
        already feels like work at midday, the easiest level is plenty. Speed doesn&apos;t matter either. Nobody is
        timing you, and taking an extra twenty seconds just means twenty more seconds awake. What you want to avoid is
        dread. If the thought of the alarm makes you anxious the night before, the setting is wrong, or a different
        brain challenge such as typing a phrase will suit you better.
      </p>

      <H2>The weakness: you can do math lying down</H2>
      <p>
        A math alarm is a brain challenge. It needs focus, but it doesn&apos;t need you to stand up. If your phone is on
        the bedside table, you can solve the set, put the phone down and be asleep again a minute later. Sleep inertia
        makes going back to sleep easy, too.
      </p>
      <p>Two simple fixes:</p>
      <ul>
        <li>
          <strong>Charge the phone across the room.</strong> Now you have to get up to solve it, and the math stops you
          from just silencing it and walking back.
        </li>
        <li>
          <strong>Stand up to solve it.</strong> Make it a rule: feet on the floor before the first problem. It&apos;s a
          small commitment, but it changes where you are when the alarm stops.
        </li>
      </ul>
      <p>
        If you keep falling back asleep after solving, a body challenge is a better fit. A{" "}
        <Link href="/blog/qr-code-alarm-clock">QR code alarm</Link> makes you walk to another room before it stops, and
        a <Link href="/blog/push-up-alarm-clock">push-up alarm</Link> gets you on the floor.
      </p>

      <H2>When math becomes autopilot</H2>
      <p>
        Some people find that after a few weeks the math stops working. They solve the problems half-asleep, put the
        phone down and drift off. This isn&apos;t a failure of willpower; it&apos;s what brains do with repetition.
      </p>
      <p>
        Research on habits in everyday life found that doing a behaviour repeatedly in the same context makes it more
        automatic over time, though how long that takes varies enormously, from about 18 to 254 days in one study (
        <a href={EXTRA.lally2010.href}>Lally et al., 2010</a>). That study looked at daily eating, drinking and
        exercise habits, not arithmetic at dawn, so it&apos;s an analogy rather than proof. But the pattern is familiar
        to anyone who has used a math alarm for months: the same kind of problem at the same time each day gets
        easier.
      </p>
      <p>What to do about it:</p>
      <ul>
        <li>
          <strong>Rotate challenge types every few weeks.</strong> Other brain challenges use different skills:{" "}
          {otherMental.map((c, i) => (
            <span key={c.slug}>
              {i > 0 ? (i === otherMental.length - 1 ? " and " : ", ") : ""}
              {c.name} ({c.tagline.toLowerCase()})
            </span>
          ))}
          .
        </li>
        <li>
          <strong>Raise the difficulty a step</strong>, or add a couple more problems.
        </li>
        <li>
          <strong>Add a body challenge</strong>, such as a{" "}
          <Link href="/blog/qr-code-alarm-clock">QR scan in another room</Link>, on the days you most need to get up.
        </li>
      </ul>

      <p>
        One more trick: change where you solve, not just what you solve. If your alarm always rings in bed and you
        always solve in bed, the whole sequence becomes one rehearsed routine. Solving it standing at the bathroom sink
        breaks the routine, even when the problems are the same.
      </p>

      <H2>Who math alarms are best for</H2>
      <p>Math is my default suggestion for anyone who:</p>
      <ul>
        <li>shares a bedroom and needs a silent challenge that works in the dark;</li>
        <li>doesn&apos;t want a camera involved, or has nowhere to put a QR code;</li>
        <li>travels a lot and wants the same alarm in any hotel room;</li>
        <li>has an injury that rules out exercise in the morning.</li>
      </ul>
      <p>
        It&apos;s a weaker choice if you are the &quot;solve it and fall back asleep&quot; type, unless you combine it
        with distance. For the full comparison, see{" "}
        <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>, and if snoozing is the
        habit you&apos;re fighting, <Link href="/blog/how-to-stop-hitting-snooze">how to stop hitting snooze</Link> has
        a two-week plan.
      </p>

      <H2>Safety and the bigger picture</H2>
      <p>
        A challenge should be tough, never a trap. {FACTS.emergencyDismiss} And before relying on any alarm app, make
        sure it can ring when it counts: {FACTS.ringsOnSilent}
      </p>
      <p>
        No challenge fixes too little sleep. Adults need at least 7 hours a night regularly (
        <a href={SRC.watson2015.href}>Watson et al., 2015</a>). If a medium math problem feels impossible every morning,
        you&apos;re probably short on sleep. Our <Link href="/sleep-calculator">sleep cycle calculator</Link> works out
        a bedtime from your wake time.
      </p>

      <H2>What a math alarm can&apos;t do</H2>
      <Limits>
        <p>
          There&apos;s no research on math alarms specifically. The case for them rests on the well-documented
          cognitive dip after waking (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>), and the idea that
          they lose power with repetition is an extrapolation from general habit research, not a measured effect. A
          math alarm won&apos;t make you less groggy, and it can be beaten lying down. If you have dyscalculia or simply
          find arithmetic stressful, choose a different challenge; the goal is to wake up, not to feel tested. If you
          sleep 7 to 9 hours and still can&apos;t wake, talk to a doctor (<a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[SRC.tassi2000, EXTRA.hilditch2019, EXTRA.kovac2021, EXTRA.lally2010, SRC.watson2015, SRC.aasmDisorders]}
      />
    </BlogLayout>
  );
}
