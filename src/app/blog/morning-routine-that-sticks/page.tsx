import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { Icon3d } from "@/components/content/icon-3d";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { BEDTIME_NUDGE, FACTS, MORNING_ROUTINE, RANKS, RISE_CHALLENGE, XP_RULES, xpForDay } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("morning-routine-that-sticks");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

const spare = RISE_CHALLENGE.windowDays - RISE_CHALLENGE.goal;

const FAQ: QA[] = [
  {
    q: "How long does it take for a morning routine to become a habit?",
    a: "In the best-known real-world study, it took a median of 66 days for a daily behaviour to feel automatic, with a range of 18 to 254 days. Simple actions got there faster. Plan for about two months, not 21 days.",
  },
  {
    q: "Does missing one day ruin a habit?",
    a: "No. In the same study, missing a single opportunity did not materially affect how the habit formed. What hurts is treating one miss as failure and quitting. Build slack into any streak or challenge so a bad morning doesn't end it.",
  },
  {
    q: "Do streaks and levels actually help build habits?",
    a: "Sometimes. Reviews of gamification find mostly positive or mixed effects, depending on the person and the design, and the evidence quality is modest. Streaks can motivate, but a broken streak can make people give up, so forgiving rules matter.",
  },
  {
    q: "What should a simple morning routine include?",
    a: `Keep it short and tied to waking up: get out of bed, have a glass of water, get daylight, and move for a minute. Rise Mission's routine is exactly three steps: ${MORNING_ROUTINE.join(", ").toLowerCase()}. Add more only once those feel automatic.`,
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>A morning routine sticks when it is small, tied to the same cue every day, and forgiving of bad mornings.</strong>{" "}
        Research on habits points to repetition in a stable context, and about two months before it feels automatic.
        Streaks, XP and levels can help you keep going, but only if one missed morning doesn&apos;t wipe out your
        progress.
      </Answer>

      <KeyTakeaways
        items={[
          "Habits form through repetition in the same context. In one study it took a median of 66 days to feel automatic.",
          "Missing one day didn't materially hurt habit formation. Quitting after the miss does.",
          "An if-then plan (\"when my alarm stops, I drink a glass of water\") reliably helps people follow through.",
          "Streaks and levels motivate some people and backfire for others; a broken streak can trigger giving up.",
          `A first-week goal with slack, like ${RISE_CHALLENGE.goal} wake-ups in ${RISE_CHALLENGE.windowDays} days, matches what the research suggests.`,
        ]}
      />

      <p>
        I build <Link href="/">Rise Mission</Link>, an iPhone alarm that makes you finish a wake-up challenge before it
        stops. In version 1.6 we added levels, XP, a morning routine and a {RISE_CHALLENGE.name}, so I spent a lot of
        time reading what habit research actually says before deciding how those features should work. This guide is
        what I learned, including the parts that argue against piling game mechanics onto your mornings. You can use
        all of it with a paper checklist and the iPhone Clock app.
      </p>

      <H2>Why most morning routines fail in week one</H2>
      <p>
        Most routines fail for the same three reasons. They are too big (meditate, journal, run, cold shower, read ten
        pages), they depend on motivation rather than a cue, and they treat the first missed morning as proof the whole
        thing doesn&apos;t work.
      </p>
      <p>
        The research on habits explains why. A habit is a behaviour that is triggered automatically by a context you
        meet often, after you&apos;ve repeated it in that context many times (
        <a href={SRC.gardner2012.href}>Gardner, Lally and Wardle, 2012</a>). The context does the work, not your
        willpower. That&apos;s why a five-part routine you start whenever you feel ready almost never becomes automatic:
        there is no single, stable cue, and there is too much to repeat.
      </p>
      <p>
        Mornings also have a specific problem: for the first minutes after waking, your brain isn&apos;t fully on. That
        grogginess is called sleep inertia (<a href={SRC.tassi2000.href}>Tassi and Muzet, 2000</a>), and it&apos;s why
        so many routines die between the alarm and the first step. Our guide to{" "}
        <Link href="/blog/how-to-stop-hitting-snooze">breaking the snooze habit</Link> covers that gap in detail.
      </p>

      <H2>What does habit research say about routines that stick?</H2>
      <H3>It takes longer than 21 days</H3>
      <p>
        The most cited real-world study asked 96 volunteers to pick one eating, drinking or activity behaviour and do it
        daily in the same situation for 12 weeks, rating each day how automatic it felt. The median time to reach a
        plateau of automaticity was 66 days, and individual times ranged from 18 to 254 days (
        <a href={SRC.lally2010.href}>Lally et al., 2010</a>). Simpler behaviours, like drinking a glass of water, tended to
        get there sooner than harder ones, like 50 sit-ups.
      </p>
      <p>
        So the popular &ldquo;21 days to a habit&rdquo; line is too optimistic for most people. Plan for about two months,
        and make the routine small enough that two months of it is realistic.
      </p>
      <H3>One missed day is not the end</H3>
      <p>
        The same study found that missing one opportunity to perform the behaviour did not materially affect the habit
        forming process (<a href={SRC.lally2010.href}>Lally et al., 2010</a>). This is the most useful finding for anyone
        building a morning routine, because you will miss days: illness, travel, a late night, a child awake at 4 AM.
      </p>
      <H3>Plan the &ldquo;when&rdquo;, not just the &ldquo;what&rdquo;</H3>
      <p>
        An implementation intention is an if-then plan: &ldquo;When situation X happens, I will do Y.&rdquo; A
        meta-analysis of 94 independent tests found these plans had a medium-to-large effect on reaching goals (
        <a href={SRC.gollwitzer2006.href}>Gollwitzer and Sheeran, 2006</a>). For mornings, the obvious &ldquo;when&rdquo; is
        the moment your alarm stops: &ldquo;When the alarm stops, I stand up and drink the glass of water on my desk.&rdquo;
      </p>
      <H3>Morning light is worth a slot</H3>
      <p>
        If you add one thing beyond water, make it daylight. Light in the morning is the strongest signal that shifts
        your body clock earlier, while bright light late in the evening pushes it later (
        <a href={SRC.blume2019.href}>Blume et al., 2019</a>). A few minutes at a bright window or outside makes it easier
        to feel sleepy at a sensible hour, which makes the next alarm easier.
      </p>

      <H2>Do streaks, XP and levels actually help?</H2>
      <p>
        Here the honest answer is &ldquo;sometimes&rdquo;. A literature review of 24 empirical studies concluded that
        gamification generally does have positive effects, but that the effects depend heavily on the context and on the
        people using it, and many studies had weak designs (
        <a href={SRC.hamari2014.href}>Hamari, Koivisto and Sarsa, 2014</a>). A systematic review focused on health and
        wellbeing found mostly positive and some mixed results, with the strongest support for effects on behaviour, and
        again called for better-quality studies (<a href={SRC.johnson2016.href}>Johnson et al., 2016</a>).
      </p>
      <p>
        Streaks have a specific risk. Research on consumer streaks found that when a streak breaks, people often
        disengage from the behaviour more than their overall record would justify: the broken chain feels like failure,
        even when the long-run performance is good (<a href={SRC.silverman2022.href}>Silverman and Barasch, 2022</a>). That
        lines up with the habit research above. The miss itself is harmless; the giving up after it is the damage.
      </p>
      <Callout title="What this means in practice">
        Use game elements as a reason to show up, not as the point. Prefer rules that forgive a bad day, and reward the
        behaviour you actually want (getting up, and the routine after), not just opening an app.
      </Callout>

      <H2>How Rise Mission&apos;s levels and 7-Day Rise Challenge use this</H2>
      <p>
        When we designed the 1.6 features, we tried to follow that research. Here is exactly how they work, so you can
        judge for yourself. Full details are in the <Link href="/whats-new">Rise Mission 1.6 release notes</Link>.
      </p>
      <H3>XP rewards the morning, not app opens</H3>
      <p>
        You earn XP once per calendar day in which you finish a real wake-up challenge. A second alarm doesn&apos;t
        double it, and test alarms never count. The day is worth {XP_RULES.base} XP, plus {XP_RULES.onTimeBonus} if you
        were on time (no snooze, and finished within {XP_RULES.onTimeMinutes} minutes of the alarm), plus{" "}
        {XP_RULES.routineBonus} if you finished the morning routine. A streak multiplier then rises from ×1.0 to ×1.2 at
        3 days, ×1.5 at 7 days and ×2.0 at 14 days. So a plain first morning earns{" "}
        {xpForDay({ streak: 1, onTime: false, routine: false })} XP, and an on-time morning with the routine done on day
        14 earns {xpForDay({ streak: 14, onTime: true, routine: true })}.
      </p>
      <H3>Ranks you can reach in weeks, not years</H3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Total XP</th>
          </tr>
        </thead>
        <tbody>
          {RANKS.map((r) => (
            <tr key={r.name}>
              <td>
                <span className="inline-flex items-center gap-2">
                  <Icon3d name={r.icon3d} size={26} />
                  Level {r.level}: <strong>{r.name}</strong>
                </span>
              </td>
              <td>{r.xp.toLocaleString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        With on-time mornings and the routine done, you reach Early Riser within your first week. Legend takes months of
        consistent mornings, which happens to match the two-month habit timeline above.
      </p>
      <H3>A first-week goal with slack</H3>
      <p>
        The {RISE_CHALLENGE.name} asks for {RISE_CHALLENGE.goal} wake-ups within {RISE_CHALLENGE.windowDays} days. The{" "}
        {spare} spare days are deliberate: the research says one miss doesn&apos;t hurt the habit, so the challenge
        shouldn&apos;t end on one either. It starts on a new user&apos;s first real wake-up, and if the window runs out you
        can simply try again.
      </p>
      <H3>A streak that can survive a bad morning</H3>
      <p>
        {FACTS.streakShields} That&apos;s our answer to the broken-streak problem: the chain bends once in a while instead of
        snapping.
      </p>

      <H2>A 7-day plan to start your morning routine</H2>
      <p>This works with any alarm. Where Rise Mission does a step for you, I say so.</p>
      <ol>
        <li>
          <strong>Night before day 1: pick your wake time and work back.</strong> Adults need at least 7 hours of sleep
          regularly (<a href={SRC.watson2015.href}>Watson et al., 2015</a>). Use the{" "}
          <Link href="/sleep-calculator">sleep cycle calculator</Link> to find a bedtime. Rise Mission&apos;s optional
          bedtime nudge does this from your next alarm and a sleep goal of {BEDTIME_NUDGE.sleepGoalHours[0]} to{" "}
          {BEDTIME_NUDGE.sleepGoalHours.at(-1)} hours, reminding you {BEDTIME_NUDGE.leadMinutes} minutes before bedtime.
        </li>
        <li>
          <strong>Day 1: one cue, three steps.</strong> Write your if-then plan: &ldquo;When my alarm stops, I drink water,
          open the curtains, and stretch for a minute.&rdquo; Put the glass out the night before.
        </li>
        <li>
          <strong>Day 2: make getting up non-negotiable.</strong> The routine can&apos;t start if you&apos;re still in
          bed. Put the phone across the room or use a wake-up challenge that needs you upright.
        </li>
        <li>
          <strong>Day 3: keep the same time.</strong> Regular timing matters; sleep regularity predicted mortality risk
          better than sleep length in a large UK cohort (<a href={SRC.windred2023.href}>Windred et al., 2023</a>).
        </li>
        <li>
          <strong>Day 4: plan your miss.</strong> Decide now what you&apos;ll do on a bad day: the smallest version (just the
          water) still counts.
        </li>
        <li>
          <strong>Day 5: track, don&apos;t judge.</strong> A tick on paper or in an app. If you missed a day, the next tick
          matters more than the gap.
        </li>
        <li>
          <strong>Days 6 and 7: review.</strong> If the three steps feel easy, keep them for another few weeks before
          adding anything. If they feel hard, cut one.
        </li>
      </ol>

      <H2>Routine options compared</H2>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Time</th>
            <th>Why it&apos;s worth it</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Get out of bed at the alarm</td>
            <td>Seconds</td>
            <td>Every other step depends on it</td>
            <td>Practical; snoozing research is mixed</td>
          </tr>
          <tr>
            <td>Glass of water</td>
            <td>30 seconds</td>
            <td>Easiest possible first step, a good habit anchor</td>
            <td>Simple drinks became automatic fastest in Lally et al.</td>
          </tr>
          <tr>
            <td>Daylight</td>
            <td>2 to 10 minutes</td>
            <td>Shifts your body clock earlier</td>
            <td>Strong (Blume et al., 2019)</td>
          </tr>
          <tr>
            <td>Stretch or short movement</td>
            <td>1 minute</td>
            <td>Keeps you upright and moving</td>
            <td>Practical, not studied as a habit anchor here</td>
          </tr>
          <tr>
            <td>Journal, read, plan the day</td>
            <td>10+ minutes</td>
            <td>Valuable, but add it after the basics are automatic</td>
            <td>Not covered by these sources</td>
          </tr>
        </tbody>
      </table>

      <H2>When game mechanics stop helping</H2>
      <p>
        Watch for three warning signs. You feel anxious about losing a streak rather than glad to keep it. You
        &ldquo;game&rdquo; the rules (setting easy alarms just to keep a number up). Or you stop entirely after one
        broken chain. If any of these show up, turn the focus back to the behaviour: did you get up, drink the water and
        see daylight? That is the habit. The XP is just a scoreboard.
      </p>
      <p>
        If you&apos;re trying to get up much earlier as part of this, read{" "}
        <Link href="/blog/how-to-wake-up-at-5am">how to wake up at 5 AM</Link> and{" "}
        <Link href="/blog/benefits-of-waking-up-early">the real benefits of waking up early</Link> first, and browse the{" "}
        <Link href="/blog/topic/waking-up-early">waking up early guides</Link> for the rest.
      </p>

      <Limits>
        <p>
          The habit studies here mostly involved healthy adults choosing simple behaviours, and automaticity was
          self-reported. Gamification reviews describe mixed results and modest study quality, and the streak research
          comes from consumer settings, not sleep. None of these sources tested a morning routine app, including ours,
          and Rise Mission&apos;s levels are a motivation tool, not a treatment. If you can&apos;t get up despite enough
          time in bed, or you&apos;re exhausted every day, talk to a doctor (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          SRC.lally2010,
          SRC.gardner2012,
          SRC.gollwitzer2006,
          SRC.hamari2014,
          SRC.johnson2016,
          SRC.silverman2022,
          SRC.blume2019,
          SRC.tassi2000,
          SRC.watson2015,
          SRC.windred2023,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
