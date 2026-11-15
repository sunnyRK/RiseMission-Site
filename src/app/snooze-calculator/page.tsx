import Link from "next/link";
import { Answer, H2, Limits, Sources } from "@/components/blog/prose";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { MoreTools, ToolCard, ToolCta, ToolHero } from "@/components/tools/tool-shell";
import { SnoozeCalculator } from "@/components/tools/snooze-calculator";
import { breadcrumbLd, faqPageLd, pageMetadata, type QA } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { NIGHT_HOURS, WEEKS_PER_YEAR, fmtNumber, snoozeCost } from "@/lib/snooze";
import { SRC } from "@/lib/sources";

export const metadata = pageMetadata({
  title: "Snooze Calculator: What Snoozing Costs",
  description:
    "Free snooze calculator. Enter how often you hit snooze and for how long to see the minutes per morning, hours per year and full nights it adds up to.",
  path: "/snooze-calculator",
});

const typical = snoozeCost({ snoozes: 3, minutes: 9, days: 5 });

const FAQ: QA[] = [
  {
    q: "Is hitting snooze bad for you?",
    a: "Not necessarily. In a 2023 lab study of habitual snoozers, 30 minutes of snoozing cost about 6 minutes of sleep and didn't harm cognitive performance, mood or morning sleepiness compared with getting up at once. The bigger cost is usually the time it eats.",
  },
  {
    q: "How much time does snoozing waste?",
    a: `It depends on your habit. Three 9-minute snoozes on five mornings a week adds up to ${fmtNumber(typical.perYearHours)} hours a year, about ${fmtNumber(typical.nights)} full nights of ${NIGHT_HOURS}-hour sleep. Use the calculator to plug in your own numbers.`,
  },
  {
    q: "Does snoozing give you extra sleep?",
    a: "A little, but less than the clock suggests. In the 2023 study, people still slept through most of a 30-minute snooze period, losing about 6 minutes of sleep compared with sleeping until the final alarm. That sleep is light and broken up by alarms.",
  },
  {
    q: "How do I stop hitting snooze?",
    a: "Set one alarm for the time you actually need to get up, put the phone out of reach, and use an alarm that makes you do something before it stops, such as a short math problem or scanning a code in another room.",
  },
];

const HABITS: [string, number, number, number][] = [
  ["One quick snooze", 1, 5, 5],
  ["Two snoozes, weekdays", 2, 9, 5],
  ["Three snoozes, weekdays", 3, 9, 5],
  ["Three snoozes, every day", 3, 10, 7],
  ["Snooze marathon", 6, 10, 7],
];

export default function SnoozeCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Snooze Cost Calculator",
            url: `${SITE_URL}/snooze-calculator`,
            applicationCategory: "HealthApplication",
            operatingSystem: "Any (web browser)",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Snooze calculator", path: "/snooze-calculator" },
          ]),
          faqPageLd(FAQ),
        ]}
      />
      <ToolHero
        title="Snooze cost calculator"
        lead="How many hours a year does your snooze button take? Enter your habit and see it in minutes, hours and full nights of sleep."
      />
      <ToolCard>
        <SnoozeCalculator />
      </ToolCard>

      <div className="prose-rm mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <Answer>
          <strong>Three 9-minute snoozes on weekdays add up to about {fmtNumber(typical.perYearHours)} hours a year.</strong>{" "}
          That&apos;s roughly {fmtNumber(typical.nights)} full nights of sleep spent between alarms. Research suggests a short
          snooze isn&apos;t harmful in itself; the real cost is the time it takes and the mornings it makes you late.
        </Answer>

        <H2>How the snooze math works</H2>
        <p>
          The calculator multiplies three numbers: how many times you hit snooze, how long each snooze lasts, and how
          many mornings a week you do it. That gives minutes per morning and per week. It then multiplies by{" "}
          {WEEKS_PER_YEAR} weeks for the yearly figure and divides by {NIGHT_HOURS} hours, five 90-minute sleep cycles, to
          express it as full nights of sleep. That&apos;s the same night length our{" "}
          <Link href="/sleep-calculator">sleep cycle calculator</Link> recommends.
        </p>
        <p>
          It counts the time between your first alarm and the moment you get up. It doesn&apos;t count the minutes you lie
          there scrolling after the last alarm, which for many people is the bigger leak.
        </p>

        <H2>What common snooze habits add up to</H2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Habit</th>
                <th>Per morning</th>
                <th>Per year</th>
                <th>Full nights</th>
              </tr>
            </thead>
            <tbody>
              {HABITS.map(([name, s, m, d]) => {
                const c = snoozeCost({ snoozes: s, minutes: m, days: d });
                return (
                  <tr key={name}>
                    <td>
                      <strong>{name}</strong>
                      <br />
                      <span className="text-[0.85rem] text-muted">
                        {s} × {m} min, {d} days a week
                      </span>
                    </td>
                    <td>{c.perMorningMin} min</td>
                    <td>{fmtNumber(c.perYearHours)} h</td>
                    <td>{fmtNumber(c.nights)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <H2>Is snoozing actually bad for you?</H2>
        <p>
          Less than the internet claims. The most detailed study so far came from Stockholm University in 2023 (
          <a href={SRC.sundelin2023.href}>Sundelin et al.</a>). In the first part, 1,732 people described their waking
          habits. Snoozing turned out to be common, especially among younger people and night owls, and people who snoozed
          also reported more morning drowsiness and shorter sleep.
        </p>
        <p>
          In the second part, 31 habitual snoozers slept in a lab with their sleep recorded. On one morning they were
          woken abruptly; on another they had a 30-minute snooze period first. Snoozing cost them about 6 minutes of sleep,
          and it stopped them being woken out of the deepest stage of sleep. Their performance on thinking tests straight
          after getting up was the same or better after snoozing, and there were no clear effects on the stress hormone
          cortisol, morning sleepiness, mood or the structure of their night&apos;s sleep. The authors conclude that a brief
          snooze may even help with grogginess for night owls and people who wake up drowsy.
        </p>
        <p>
          What the study does <em>not</em> show: it looked at a single 30-minute snooze period in a lab, not years of daily
          snoozing, and the evidence strength varied between tests. It also didn&apos;t look at the practical side, which is
          where the snooze button really hurts. So the honest summary is that snoozing doesn&apos;t damage your brain, but it
          does take time you meant to use.
        </p>

        <H2>The real cost: time, lateness and short nights</H2>
        <p>
          The number in the calculator is time you planned to be awake. If your first alarm is set for when you need to
          get up, every snooze makes you later; if you set it early on purpose so you can snooze, you&apos;re trading
          unbroken sleep for light sleep interrupted every few minutes. Either way, the same minutes would be better spent
          as solid sleep at the end of the night, with one alarm for the time you actually get up.
        </p>
        <p>
          Snoozing is also often a symptom rather than the problem. Adults need at least 7 hours of sleep on a regular
          basis (<a href={SRC.watson2015.href}>AASM/SRS consensus</a>), and the snoozers in the 2023 survey reported shorter
          sleep. If you snooze every morning, an earlier bedtime may fix more than any alarm trick. Grogginess after waking,
          known as sleep inertia, rarely lasts more than about 30 minutes unless you&apos;re badly sleep-deprived (
          <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>), so getting up and moving tends to beat lying there.
        </p>

        <H2>How to cut your snooze time</H2>
        <ul>
          <li>Set one alarm for the time you actually need to get up, not a cushion of earlier ones.</li>
          <li>Put your phone or alarm across the room so you have to stand up to reach it.</li>
          <li>
            Pick a bedtime that gives you full cycles with the <Link href="/sleep-calculator">sleep calculator</Link>.
          </li>
          <li>
            Use an alarm that needs a task to stop, like our free <Link href="/online-alarm-clock">online alarm clock</Link>{" "}
            with a math challenge.
          </li>
          <li>
            Read the full guide on <Link href="/blog/how-to-stop-hitting-snooze">how to stop hitting snooze</Link>.
          </li>
        </ul>

        <Limits>
          <p>
            The calculator is simple arithmetic and treats every snooze as the full interval you choose. Real mornings vary,
            and some snooze time is still sleep. One night of lab data says a 30-minute snooze isn&apos;t harmful for habitual
            snoozers; nobody has tested years of heavy snoozing, so we can&apos;t tell you it&apos;s good or bad over the long
            run. If you can&apos;t get up despite enough sleep, or feel exhausted every day, talk to a doctor (
            <a href={SRC.aasmDisorders.href}>AASM</a>).
          </p>
        </Limits>

        <Sources items={[SRC.sundelin2023, SRC.watson2015, SRC.tassi2000, SRC.aasmDisorders]} />
      </div>

      <Faq items={FAQ} />

      <ToolCta
        placement="snooze-calculator"
        title="Make the first alarm the last one."
        body="Rise Mission keeps ringing until you prove you're awake with push-ups, a walk, a QR scan or math."
      />
      <MoreTools current="snooze-calculator" />
    </>
  );
}
