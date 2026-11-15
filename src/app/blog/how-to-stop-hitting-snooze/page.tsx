import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { SRC } from "@/lib/sources";

const post = getPost("how-to-stop-hitting-snooze");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

const FAQ: QA[] = [
  {
    q: "Is hitting snooze bad for you?",
    a: "Not necessarily. A 2023 study in the Journal of Sleep Research found that 30 minutes of snoozing didn't make habitual snoozers groggier and cost little sleep. The real costs are practical: running late, a habit of ignoring alarms, and often an underlying lack of sleep.",
  },
  {
    q: "Why can't I stop hitting snooze?",
    a: "Because the decision is made by a half-awake brain during sleep inertia, when the bed feels best and the consequences feel furthest away. Willpower set the night before doesn't reach that moment, so the fix has to change the environment, not your resolve.",
  },
  {
    q: "How long does it take to break the snooze habit?",
    a: "Most people see a difference within one to two weeks of keeping the same wake time and removing the easy snooze. Expect the first three or four mornings to be the hardest.",
  },
  {
    q: "Should I just set my alarm later instead of snoozing?",
    a: "If you routinely snooze for 30 minutes, setting one alarm 30 minutes later gives you that time as unbroken sleep. Then make that single alarm one you have to get up for.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>To stop hitting snooze, take the decision away from your half-asleep brain.</strong> Set one alarm for
        the time you really need to get up, put it out of arm&apos;s reach, make stopping it require a task, and keep the
        same wake time every day. Most people break the habit within one to two weeks.
      </Answer>

      <KeyTakeaways
        items={[
          "Snoozing is extremely common, and research says a short snooze isn't necessarily harmful.",
          "The problem is what it trains: ignoring alarms, running late, and hiding a lack of sleep.",
          "Willpower doesn't work at 6 AM. Changing the setup does.",
          "Use one alarm, make it need a task, and protect your bedtime. Give it two weeks.",
        ]}
      />

      <H2>What the research actually says about snoozing</H2>
      <p>
        Snoozing is the norm, not a personal failing. In a 2023 survey published in the Journal of Sleep Research, most
        respondents said they used the snooze button or multiple alarms at least some of the time (
        <a href={SRC.sundelin2023.href}>Sundelin et al., 2023</a>). People who snooze tend to be younger, to be evening
        types, and to feel more tired in the morning.
      </p>
      <p>
        The same paper ran a lab experiment with habitual snoozers. Thirty minutes of snoozing cost only a few minutes of
        sleep, didn&apos;t make people sleepier or moodier, and on some cognitive tests they did slightly better right
        after waking. So if you were told snoozing &quot;ruins your brain&quot;, that claim isn&apos;t supported.
      </p>
      <Callout title="So why stop at all?">
        Because for most chronic snoozers, snoozing isn&apos;t a calm 30-minute ritual. It&apos;s an unpredictable 10 to
        60 minutes that makes you late, teaches you that alarms are optional, and covers up the fact that you aren&apos;t
        getting enough sleep. That&apos;s what this guide fixes.
      </Callout>

      <H2>Why your half-asleep brain always wins</H2>
      <p>
        The person who sets the alarm and the person who hears it are, practically speaking, different people. In the
        first minutes after waking you&apos;re in <strong>sleep inertia</strong>: slower, foggier, and worse at weighing
        future consequences (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). The snooze button is designed to
        be the easiest action available in that state.
      </p>
      <p>
        That&apos;s why resolutions don&apos;t work. &quot;Tomorrow I&apos;ll get up on the first alarm&quot; is a promise
        made by your evening self and broken by your morning self, every time. The only reliable approach is to change
        what your morning self is able to do.
      </p>

      <H2>A two-week plan to stop snoozing</H2>

      <H3>Days 1 to 3: set up the room</H3>
      <ul>
        <li>
          <strong>One alarm, at your real time.</strong> Delete the backups. If you usually snooze from 6:00 to 6:30,
          set one alarm for 6:30 and enjoy that half hour as real sleep.
        </li>
        <li>
          <strong>Phone across the room.</strong> Charge it on a dresser or in the hallway so stopping it means standing
          up.
        </li>
        <li>
          <strong>Make stopping it require a task.</strong> A puzzle, a walk to another room, or a code you have to scan
          in the bathroom. This is the core of <Link href="/">Rise Mission</Link>: no snooze button, and the alarm only
          stops once you finish a wake-up challenge.
        </li>
      </ul>

      <H3>Days 4 to 7: protect the night</H3>
      <ul>
        <li>
          <strong>Count back from your alarm.</strong> Adults need at least 7 hours on a regular basis (
          <a href={SRC.watson2015.href}>AASM/SRS, 2015</a>). Use the{" "}
          <Link href="/sleep-calculator">sleep calculator</Link> to pick a bedtime that fits full sleep cycles.
        </li>
        <li>
          <strong>Set a wind-down reminder</strong> 45 minutes before bed. Screens off or dimmed, lights low.
        </li>
      </ul>

      <H3>Days 8 to 14: lock in the habit</H3>
      <ul>
        <li>
          <strong>Same wake time on weekends</strong>, within about an hour. Large swings create social jetlag (
          <a href={SRC.wittmann2006.href}>Wittmann et al., 2006</a>) and make Monday feel like jet lag.
        </li>
        <li>
          <strong>Light and movement first.</strong> Curtains open, a glass of water, stay standing for five minutes.
        </li>
        <li>
          <strong>Track your streak.</strong> Seeing &quot;9 mornings in a row&quot; is surprisingly motivating, and it
          makes the next snooze feel expensive.
        </li>
      </ul>

      <H2>Snooze fixes compared</H2>
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Works because</th>
            <th>Weak spot</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phone across the room</td>
            <td>You have to stand up</td>
            <td>Easy to walk back to bed</td>
          </tr>
          <tr>
            <td>Many alarms</td>
            <td>Feels safe</td>
            <td>Trains you to ignore alarms</td>
          </tr>
          <tr>
            <td>Sunrise lamp</td>
            <td>Light helps your body clock</td>
            <td>Doesn&apos;t force you up</td>
          </tr>
          <tr>
            <td>Wake-up challenge alarm</td>
            <td>Needs a working brain or a walk</td>
            <td>Needs an emergency exit for bad days</td>
          </tr>
          <tr>
            <td>Accountability partner</td>
            <td>Social pressure</td>
            <td>Depends on someone else</td>
          </tr>
        </tbody>
      </table>

      <H2>If you sleep through alarms entirely</H2>
      <p>
        Snoozing and sleeping through alarms are related but different. If your problem is that you don&apos;t hear the
        alarm at all, read{" "}
        <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up when you&apos;re a heavy sleeper</Link>{" "}
        first. If you&apos;re trying to shift to an earlier schedule, see{" "}
        <Link href="/blog/benefits-of-waking-up-early">the real benefits of waking up early</Link>.
      </p>

      <Limits>
        <p>
          Constant snoozing can be a sign of chronic sleep loss, depression, or a sleep disorder. If you feel exhausted
          no matter how long you sleep, talk to a doctor (<a href={SRC.aasmDisorders.href}>AASM</a>). And if snoozing
          for 20 minutes genuinely works for you and never makes you late, the research suggests you don&apos;t need to
          fight it.
        </p>
      </Limits>

      <Sources items={[SRC.sundelin2023, SRC.tassi2000, SRC.watson2015, SRC.wittmann2006, SRC.aasmDisorders]} />
    </BlogLayout>
  );
}
