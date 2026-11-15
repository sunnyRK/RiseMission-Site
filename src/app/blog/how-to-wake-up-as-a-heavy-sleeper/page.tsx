import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("how-to-wake-up-as-a-heavy-sleeper");

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
    q: "Why do I sleep through my alarm?",
    a: "Usually because the alarm goes off during deep sleep, you're short on sleep, or you've trained yourself to switch it off without fully waking. Sleep debt is the most common cause; sleep disorders such as sleep apnea are less common but worth ruling out if it happens most days.",
  },
  {
    q: "What is the best alarm for a heavy sleeper?",
    a: "One that you can't turn off without being awake: placed across the room, loud, varied, and ideally requiring a task such as walking, scanning a code in another room, or solving a problem. A task works because switching off a normal alarm needs almost no conscious thought.",
  },
  {
    q: "Is it bad to set 10 alarms?",
    a: "Many alarms mostly train you to ignore them and fragment the last part of your sleep. One well-placed alarm that requires you to get up usually works better than a stack you can dismiss half-asleep.",
  },
  {
    q: "When should I see a doctor about heavy sleeping?",
    a: "If you sleep 7 to 9 hours and still can't wake up, feel exhausted during the day, snore loudly, or fall asleep at the wrong moments, talk to a doctor. Those can be signs of a sleep disorder that no alarm can fix.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>To wake up as a heavy sleeper, make the alarm impossible to switch off on autopilot.</strong> Put it
        across the room, use a loud and varied sound, let light in, and require a task that needs a working brain or
        your feet on the floor. Then fix the cause underneath: most heavy sleepers are simply short on sleep.
      </Answer>

      <KeyTakeaways
        items={[
          "Turning off a normal alarm takes almost no conscious thought, so a groggy brain does it without you.",
          "Sleep debt is the most common reason people sleep through alarms. Distance and difficulty only buy you time.",
          "The best setups combine three things: get up, get light, and do something that needs focus.",
          "If you sleep enough and still can't wake, that's a medical question, not an alarm question.",
        ]}
      />

      <H2>Why some people sleep through every alarm</H2>
      <p>
        Waking up is not a switch. For the first minutes after you open your eyes, your brain is still partly asleep, a
        state researchers call <strong>sleep inertia</strong>. Reaction time, memory and decision-making are all
        measurably worse during it, and it is strongest when you are woken from deep sleep (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>).
      </p>
      <p>
        That matters because silencing an alarm is one of the easiest things a phone lets you do. A tap, a swipe, or a
        press of the side button. A brain running at a fraction of its capacity can do it, and frequently does, without
        forming a memory of it. That is why so many heavy sleepers genuinely don&apos;t remember turning the alarm off.
      </p>
      <p>Four things make it worse:</p>
      <ul>
        <li>
          <strong>Not enough sleep.</strong> Adults need at least 7 hours a night on a regular basis (
          <a href={SRC.watson2015.href}>AASM/SRS consensus, 2015</a>). Below that, your body fights harder to stay
          asleep.
        </li>
        <li>
          <strong>Waking from deep sleep.</strong> Sleep runs in cycles of roughly 90 minutes (
          <a href={SRC.nindsSleep.href}>NIH</a>). An alarm that lands in the deep phase is harder to hear and harder to
          act on.
        </li>
        <li>
          <strong>An irregular schedule.</strong> If your wake time swings by hours between weekdays and weekends, your
          body never knows when morning is. Researchers call the mismatch <strong>social jetlag</strong> (
          <a href={SRC.wittmann2006.href}>Wittmann et al., 2006</a>).
        </li>
        <li>
          <strong>Habit.</strong> Every time you dismiss an alarm and fall back asleep, you rehearse exactly that
          sequence.
        </li>
      </ul>

      <H2>9 changes that actually get heavy sleepers up</H2>

      <H3>1. Put the alarm where you have to stand up to reach it</H3>
      <p>
        The oldest trick still works. If the phone is across the room, you have to stand and walk to stop it. The catch
        is that many people walk over, switch it off, and walk straight back to bed. Distance works best combined with
        the next steps.
      </p>

      <H3>2. Use one alarm, not ten</H3>
      <p>
        A stack of alarms five minutes apart feels safe, but it teaches you that the first nine don&apos;t count. Set one
        alarm for the time you actually need to be up, and make that one hard to ignore.
      </p>

      <H3>3. Choose a sound that changes</H3>
      <p>
        You stop noticing sounds that never change. A 2020 study of reported waking sounds found that people rated
        melodic alarms as less associated with grogginess than harsh beeps (
        <a href={SRC.mcfarlane2020.href}>McFarlane et al., 2020</a>). For heavy sleepers the more practical rule is:
        loud, rising, and not the same tone your phone uses for everything else.
      </p>

      <H3>4. Let light in straight away</H3>
      <p>
        Light is the strongest signal your body clock has (<a href={SRC.blume2019.href}>Blume et al., 2019</a>).
        Open the curtains, switch on the main light, or step outside. A smart bulb on a schedule helps on dark winter
        mornings.
      </p>

      <H3>5. Make the alarm ask for something a sleeping brain can&apos;t do</H3>
      <p>
        This is the change that makes the others stick. If stopping the alarm requires solving a few math problems,
        typing a sentence exactly, or walking to another room to scan a code, autopilot can&apos;t finish the job. By the
        time you&apos;re done, sleep inertia has started to lift.
      </p>
      <p>
        This is the idea behind <Link href="/">Rise Mission</Link>, the app I build: when the alarm rings, you
        finish a wake-up challenge such as push-ups counted by the camera, a walk, a QR scan or math. You can do a
        lighter version with any phone by placing it in the bathroom and committing to wash your face before you touch
        it.
      </p>

      <H3>6. Keep the same wake time every day</H3>
      <p>
        Regular sleep timing matters on its own. In a large cohort study, how regular people&apos;s sleep was predicted
        mortality risk better than how long they slept (<a href={SRC.windred2023.href}>Windred et al., 2023</a>). A
        consistent wake time, weekends included, is the anchor that makes mornings easier.
      </p>

      <H3>7. Work backwards from your wake time</H3>
      <p>
        If you need to be up at 6:30, you need to be asleep around 11:00 or earlier. Our free{" "}
        <Link href="/sleep-calculator">sleep cycle calculator</Link> gives you bedtimes that line up with full cycles so
        the alarm is less likely to land in deep sleep.
      </p>

      <H3>8. Have a reason to be up</H3>
      <p>
        A specific first action makes it easier to stay upright: a glass of water, a short walk, coffee you actually look
        forward to. Our guide to the{" "}
        <Link href="/blog/benefits-of-waking-up-early">benefits of waking up early</Link> covers routines that make the
        first 20 minutes worth getting up for.
      </p>

      <H3>9. Stop rehearsing the snooze</H3>
      <p>
        Every snooze reinforces the habit. If snoozing is your main problem, read{" "}
        <Link href="/blog/how-to-stop-hitting-snooze">how to stop hitting snooze</Link>, which has a two-week plan.
      </p>

      <H2>What a heavy-sleeper morning setup looks like</H2>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>What to do</th>
            <th>Why it helps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Night before</td>
            <td>Bedtime from a fixed wake time, phone charging across the room</td>
            <td>More sleep, less deep-sleep alarms, distance to the alarm</td>
          </tr>
          <tr>
            <td>Alarm</td>
            <td>One loud, rising alarm that rings on Silent</td>
            <td>Can&apos;t be missed, no false safety from backups</td>
          </tr>
          <tr>
            <td>Dismissal</td>
            <td>A task: walk, scan, solve or type</td>
            <td>Autopilot can&apos;t finish it, inertia starts lifting</td>
          </tr>
          <tr>
            <td>First 5 minutes</td>
            <td>Light on, water, stay standing</td>
            <td>Light and movement speed up waking</td>
          </tr>
        </tbody>
      </table>

      <H2>Does your iPhone alarm ring on Silent?</H2>
      <p>
        The built-in Clock alarm does ring when the ring/silent switch is on. Many third-party alarm apps historically
        could not, which is one reason heavy sleepers missed them. Apps built on Apple&apos;s newer AlarmKit framework can.{" "}
        {FACTS.ringsOnSilent} {FACTS.poweredOff}
      </p>
      <Callout title="Safety first">
        A good wake-up challenge is tough, never a trap. {FACTS.emergencyDismiss}
      </Callout>

      <H2>When it isn&apos;t an alarm problem</H2>
      <Limits>
        <p>
          Everything above assumes you&apos;re a healthy adult who is mostly short on sleep or stuck in a habit. If you
          regularly sleep 7 to 9 hours and still can&apos;t wake, feel exhausted all day, snore heavily, or nod off while
          reading or driving, talk to a doctor. Conditions such as sleep apnea, narcolepsy and idiopathic hypersomnia are
          diagnosable and treatable (<a href={SRC.aasmDisorders.href}>AASM</a>), and no alarm app is a substitute for
          that. Shift workers and people on medication that causes drowsiness should also get personal advice.
        </p>
      </Limits>

      <Sources items={[SRC.tassi2000, SRC.watson2015, SRC.nindsSleep, SRC.wittmann2006, SRC.mcfarlane2020, SRC.blume2019, SRC.windred2023, SRC.aasmDisorders]} />
    </BlogLayout>
  );
}
