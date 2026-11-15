import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("how-to-wake-up-at-5am");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/** New sources verified for this post (Crossref title/journal/year + abstract read 2026-11-15). */
const EXTRA = {
  khalsa2003: {
    label: "Khalsa S.B.S. et al. A phase response curve to single bright light pulses in human subjects. Journal of Physiology, 2003",
    href: "https://doi.org/10.1113/jphysiol.2003.040477",
  },
  drake2013: {
    label: "Drake C. et al. Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. J Clin Sleep Med, 2013",
    href: "https://doi.org/10.5664/jcsm.3170",
  },
  paruthi2016: {
    label: "Paruthi S. et al. Recommended amount of sleep for pediatric populations: AASM consensus statement. J Clin Sleep Med, 2016",
    href: "https://doi.org/10.5664/jcsm.5866",
  },
  crowley2007: {
    label: "Crowley S.J., Acebo C., Carskadon M.A. Sleep, circadian rhythms, and delayed phase in adolescence. Sleep Medicine, 2007",
    href: "https://doi.org/10.1016/j.sleep.2006.12.002",
  },
};

const FAQ: QA[] = [
  {
    q: "What time should I go to bed to wake up at 5 AM?",
    a: "To get 7.5 hours of sleep (five 90-minute cycles) plus about 15 minutes to fall asleep, be in bed by around 9:15 PM. If you can't manage that, 10:45 PM gives about six hours, which is below what most adults need.",
  },
  {
    q: "How long does it take to get used to waking up at 5 AM?",
    a: "If you move your wake time 15 minutes earlier every two days, going from 6:30 to 5:00 takes about two weeks, and most people need another week or two of holding the new time, weekends included, before it feels normal.",
  },
  {
    q: "Is waking up at 5 AM healthy?",
    a: "Waking at 5 AM isn't healthier in itself. What matters is getting enough sleep and keeping a regular schedule. A 5 AM alarm with a midnight bedtime is worse than a 7 AM alarm with enough sleep.",
  },
  {
    q: "Should I sleep in on weekends after waking up at 5 AM all week?",
    a: "Try to keep your weekend wake time within about an hour of your weekday one. Big weekend shifts create social jetlag, which makes Monday's 5 AM alarm feel much harder.",
  },
];

const SCHEDULE: { days: string; wake: string; bed: string; note: string }[] = [
  { days: "Days 1–2", wake: "6:15 AM", bed: "10:30 PM", note: "First step. Light on as soon as you're up." },
  { days: "Days 3–4", wake: "6:00 AM", bed: "10:15 PM", note: "Cut caffeine by early afternoon." },
  { days: "Days 5–6", wake: "5:45 AM", bed: "10:00 PM", note: "Weekend: same wake time, or within an hour." },
  { days: "Days 7–8", wake: "5:30 AM", bed: "9:45 PM", note: "Screens dimmed in the last hour before bed." },
  { days: "Days 9–10", wake: "5:15 AM", bed: "9:30 PM", note: "If you're exhausted, repeat this step." },
  { days: "Days 11–14", wake: "5:00 AM", bed: "9:15 PM", note: "Hold. Weekends included." },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>To wake up at 5 AM, move your bedtime first, then shift your alarm earlier by 15 minutes every two days.</strong>{" "}
        Aim to be in bed around 9:15 PM, get light as soon as you&apos;re up, plan the first ten minutes, and keep the same
        wake time on weekends. Going from 6:30 to 5:00 this way takes about two weeks.
      </Answer>

      <KeyTakeaways
        items={[
          "The alarm is the easy part. Waking at 5 AM only works if you're asleep by about 9:30 PM.",
          "Shift in 15-minute steps. A sudden two-hour jump mostly produces exhaustion and a week of snoozing.",
          "Morning light helps move your body clock earlier; evening light pushes it later.",
          "Keep weekends within about an hour of your weekday wake time, or Monday resets the progress.",
          "Teens, natural night owls and shift workers often shouldn't force 5 AM at all.",
        ]}
      />

      <H2>Should you wake up at 5 AM at all?</H2>
      <p>
        Before the plan, the honest question. There is nothing special about 5:00 itself. What the research supports is
        enough sleep and a regular schedule. Adults need at least 7 hours a night on a regular basis (
        <a href={SRC.watson2015.href}>Watson et al., 2015</a>), and in a large cohort study, how regular people&apos;s sleep
        was predicted mortality risk better than how long they slept (<a href={SRC.windred2023.href}>Windred et al.,
        2023</a>).
      </p>
      <p>
        So a 5 AM wake time is worth it if you have a reason: a quiet hour before kids wake up, a training session, a
        commute, or deep work before the inbox opens. It&apos;s not worth it if it means sleeping six hours. I wrote more
        about what an earlier morning does and doesn&apos;t do in{" "}
        <Link href="/blog/benefits-of-waking-up-early">the real benefits of waking up early</Link>.
      </p>

      <H2>What time should I go to bed to wake up at 5 AM?</H2>
      <p>
        Start with bedtime math. Sleep runs in cycles of roughly 90 minutes (<a href={SRC.nindsSleep.href}>NIH NINDS</a>),
        and most people take around 15 minutes to fall asleep. Working backwards from 5:00 AM:
      </p>
      <table>
        <thead>
          <tr>
            <th>In bed by</th>
            <th>Sleep cycles</th>
            <th>Sleep you get</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7:45 PM</td>
            <td>6</td>
            <td>9 hours</td>
            <td>Only if you genuinely need that much</td>
          </tr>
          <tr>
            <td>9:15 PM</td>
            <td>5</td>
            <td>7.5 hours</td>
            <td>The realistic target for most adults</td>
          </tr>
          <tr>
            <td>10:45 PM</td>
            <td>4</td>
            <td>6 hours</td>
            <td>Below the 7-hour minimum; fine once, not as a habit</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can run your own numbers with our <Link href="/sleep-calculator">sleep cycle calculator</Link>. Cycle length
        varies from person to person, so treat these as starting points. The non-negotiable part is the total: if 9:15 PM
        is impossible for your life, a 5 AM alarm will cost you sleep every night.
      </p>

      <H2>How do I shift my wake-up time to 5 AM?</H2>
      <p>
        Gradually. Your body clock adjusts best in small moves, and small moves also make the bedtime change bearable.
        I suggest 15 minutes every two days: small enough that you barely notice, fast enough to finish in two weeks. If you
        currently wake at 7:00 or later, add another week at the front.
      </p>

      <H3>A 2-week schedule from 6:30 to 5:00 AM</H3>
      <table>
        <thead>
          <tr>
            <th>Days</th>
            <th>Alarm</th>
            <th>In bed by</th>
            <th>Focus</th>
          </tr>
        </thead>
        <tbody>
          {SCHEDULE.map((r) => (
            <tr key={r.days}>
              <td>{r.days}</td>
              <td>{r.wake}</td>
              <td>{r.bed}</td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Bedtimes assume 7.5 hours of sleep plus 15 minutes to fall asleep. If a step leaves you wrecked, stay on it for
        two more days rather than pushing on. Going slower is not failing. Going faster and quitting on day six is.
      </p>

      <H3>Move bedtime first, not the alarm</H3>
      <p>
        Most people who try 5 AM move the alarm and leave bedtime where it was. That works for about three days. Treat the
        bedtime column as the real commitment: set a reminder an hour before it, and start winding down then.
      </p>

      <H2>How does light help you wake up earlier?</H2>
      <p>
        Light is the main signal that sets your body clock (<a href={SRC.blume2019.href}>Blume et al., 2019</a>), and when
        you get it matters. In a lab study that mapped the effect of bright light across the day, light given before the
        body&apos;s low point in core body temperature shifted the clock later, while light given after it shifted the
        clock earlier (<a href={EXTRA.khalsa2003.href}>Khalsa et al., 2003</a>). That low point normally falls during the
        night, which is why morning light helps an earlier schedule and late-evening light works against it.
      </p>
      <p>In practice, for someone trying to wake earlier:</p>
      <ul>
        <li>
          <strong>Get bright light soon after waking.</strong> Open the curtains, switch on the main light, or step
          outside. In winter, when it&apos;s dark at 5 AM, a bright lamp or smart bulb on a timer helps.
        </li>
        <li>
          <strong>Dim the evening.</strong> Light at night has been shown to alter circadian rhythms and sleep (
          <a href={SRC.blume2019.href}>Blume et al., 2019</a>). Lower the lights and the screen brightness in the last hour
          before your new bedtime.
        </li>
      </ul>

      <H2>What should you do in the first 10 minutes?</H2>
      <p>
        The first ten minutes decide whether 5 AM sticks. Right after waking you&apos;re in sleep inertia, a groggy state
        where judgment is impaired and the pull back to sleep is strongest. Most of it fades within 15 to 30 minutes (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>), which is exactly the window you need to get through. I
        explain it in detail in <Link href="/blog/sleep-inertia">what sleep inertia is and how long it lasts</Link>.
      </p>
      <p>Here&apos;s the routine I recommend, because it asks nothing of a groggy brain:</p>
      <ol>
        <li>
          <strong>Stand up to stop the alarm.</strong> Phone across the room, or an alarm that needs a task before it
          stops.
        </li>
        <li>
          <strong>Lights on.</strong> Main light or curtains, before anything else.
        </li>
        <li>
          <strong>Water and bathroom.</strong> Simple, physical, no decisions.
        </li>
        <li>
          <strong>Start the reason you got up.</strong> Shoes on for the run, kettle on for the writing session. Decide it
          the night before so you don&apos;t negotiate at 5:01.
        </li>
      </ol>
      <p>
        The first step is where most 5 AM plans fail, so it&apos;s worth over-engineering. That&apos;s what{" "}
        <Link href="/">Rise Mission</Link>, the alarm app I build, is for: the alarm keeps ringing until you complete a
        wake-up challenge such as walking a set number of steps, scanning a QR code in the kitchen, or a few squats counted
        by the camera. By the time it stops, you&apos;re standing up in a lit room.
      </p>
      <Callout title="Snoozing at 5 AM">
        If you set 5:00 and snooze to 5:40, you&apos;ve trained a 5:40 wake time with worse sleep. Pick one alarm time
        you&apos;ll actually get up for. Our guide to{" "}
        <Link href="/blog/how-to-stop-hitting-snooze">stopping the snooze habit</Link> has a plan for this.
      </Callout>

      <H2>What about caffeine, exercise and evenings?</H2>
      <p>
        <strong>Caffeine:</strong> a morning coffee is fine, but cut off caffeine early. In a study of 400 mg of caffeine,
        even a dose six hours before bed significantly disrupted sleep (<a href={EXTRA.drake2013.href}>Drake et al.,
        2013</a>). With a 9:15 PM bedtime, that means no caffeine after about 3 PM, and earlier is better.
      </p>
      <p>
        <strong>Evenings:</strong> this is where the real cost of 5 AM lives. Dinner, social plans and screens all have to
        move earlier. Be honest with yourself about which evening habits you&apos;re willing to change before you start.
      </p>
      <p>
        <strong>Exercise:</strong> having a morning workout planned gives you a concrete reason to get up, which matters
        more than any specific benefit of exercising early.
      </p>

      <H2>Can you sleep in on weekends?</H2>
      <p>
        A little. When weekday and weekend sleep times drift apart, you get what researchers call social jetlag: your body
        clock follows the weekend, then gets yanked back on Monday. Late chronotypes, natural night owls, tend to have the
        biggest gaps and build up the most sleep debt on workdays (<a href={SRC.wittmann2006.href}>Wittmann et al.,
        2006</a>).
      </p>
      <p>
        My rule: keep your weekend wake time within about an hour of 5:00. If you&apos;re tired, take an earlier night
        rather than a long lie-in. A 9 AM Saturday lie-in followed by a 5 AM Monday is roughly a four-hour time-zone jump
        every week.
      </p>

      <H2>What if you still can&apos;t wake up at 5 AM?</H2>
      <p>
        If you&apos;ve held the schedule for two or three weeks and still sleep through the alarm, the alarm probably
        isn&apos;t the problem. The most common causes are not enough sleep, a body clock that runs late, or a habit of
        dismissing the alarm without fully waking. I go through how to tell them apart in{" "}
        <Link href="/blog/why-do-i-sleep-through-my-alarm">why you sleep through your alarm</Link>.
      </p>
      <p>
        Whatever alarm you use, test it before the first real morning. In Rise Mission,{" "}
        {FACTS.testAlarm.charAt(0).toLowerCase() + FACTS.testAlarm.slice(1)}
      </p>

      <H2>Who shouldn&apos;t force a 5 AM wake-up?</H2>
      <Limits>
        <p>
          A 5 AM alarm is a lifestyle choice, not a health intervention, and it isn&apos;t right for everyone.{" "}
          <strong>Teenagers</strong> need 8 to 10 hours of sleep (<a href={EXTRA.paruthi2016.href}>Paruthi et al.,
          2016</a>) and their sleep timing naturally shifts later during adolescence (
          <a href={EXTRA.crowley2007.href}>Crowley et al., 2007</a>), so an early alarm usually just means less sleep.{" "}
          <strong>Natural night owls</strong> can shift somewhat, but forcing a big gap between their body clock and their
          schedule creates social jetlag (<a href={SRC.wittmann2006.href}>Wittmann et al., 2006</a>). Studies linking
          morning preference to better outcomes, such as lower depression risk in genetic analyses (
          <a href={SRC.daghlas2021.href}>Daghlas et al., 2021</a>), describe people who are naturally early, not proof that
          forcing yourself earlier produces the same benefit. <strong>Shift workers</strong>, new parents, and anyone with
          insomnia, a sleep disorder or a medical condition affected by sleep should get personal advice from a doctor
          before changing their schedule. The two-week plan above is a practical approach, not a tested clinical protocol.
        </p>
      </Limits>

      <Sources
        items={[
          SRC.watson2015,
          SRC.windred2023,
          SRC.nindsSleep,
          SRC.blume2019,
          EXTRA.khalsa2003,
          SRC.tassi2000,
          EXTRA.drake2013,
          SRC.wittmann2006,
          EXTRA.paruthi2016,
          EXTRA.crowley2007,
          SRC.daghlas2021,
        ]}
      />
    </BlogLayout>
  );
}
