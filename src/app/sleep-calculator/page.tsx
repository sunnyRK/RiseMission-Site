import Link from "next/link";
import { Answer, H2, Limits, Sources } from "@/components/blog/prose";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { SleepCalculator } from "@/components/tools/sleep-calculator";
import { MoreTools, ToolCard, ToolCta, ToolHero } from "@/components/tools/tool-shell";
import { bedtimesFor, fmtTime } from "@/lib/sleep";
import { breadcrumbLd, faqPageLd, pageMetadata, type QA } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { SRC } from "@/lib/sources";

export const metadata = pageMetadata({
  title: "Sleep Calculator: Best Time to Wake Up",
  description: "Free sleep cycle calculator. Enter your wake-up time to get bedtimes that fit 90-minute cycles, or find the best time to wake if you go to bed now.",
  path: "/sleep-calculator",
});

const FAQ: QA[] = [
  {
    q: "How does a sleep cycle calculator work?",
    a: "It counts back from your wake-up time in roughly 90-minute sleep cycles and adds about 15 minutes to fall asleep. Waking near the end of a cycle, in lighter sleep, tends to feel less groggy than waking from deep sleep.",
  },
  {
    q: "How many sleep cycles do I need?",
    a: "Five cycles (about 7.5 hours) suits most adults, and six (9 hours) suits people who need more. Four cycles (6 hours) is below the 7-hour minimum experts recommend for adults, so treat it as an occasional fallback.",
  },
  {
    q: "What time should I go to bed to wake up at 6 AM?",
    a: `To wake at 6:00 AM, go to bed by ${fmtTime(bedtimesFor(360)[1].at)} for five cycles, or ${fmtTime(bedtimesFor(360)[0].at)} for six. Those bedtimes include 15 minutes to fall asleep.`,
  },
  {
    q: "Are sleep cycles always 90 minutes?",
    a: "No. Cycles typically run about 70 to 120 minutes, vary between people, and change through the night. Treat the calculator as a good starting point, then adjust by 15 minutes based on how you feel.",
  },
];

const COMMON = [300, 330, 360, 390, 420, 450, 480];

export default function SleepCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sleep Cycle Calculator",
            url: `${SITE_URL}/sleep-calculator`,
            applicationCategory: "HealthApplication",
            operatingSystem: "Any (web browser)",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Sleep calculator", path: "/sleep-calculator" },
          ]),
          faqPageLd(FAQ),
        ]}
      />
      <ToolHero
        title="Sleep cycle calculator"
        lead="Find the best time to go to bed or wake up, so your alarm lands at the end of a sleep cycle instead of in the middle of deep sleep."
      />
      <ToolCard>
        <SleepCalculator />
      </ToolCard>

      <div className="prose-rm mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <Answer>
          <strong>For most adults the best bedtime is about 7.5 hours plus 15 minutes before your alarm.</strong> That
          gives five full 90-minute sleep cycles and time to fall asleep. To wake at 6:30 AM, be in bed by about 10:45 PM. Waking at the end of a cycle usually feels less groggy than waking from deep sleep.
        </Answer>

        <H2>Bedtimes for common wake-up times</H2>
        <table>
          <thead>
            <tr>
              <th>Wake up at</th>
              <th>6 cycles (9 h)</th>
              <th>5 cycles (7.5 h)</th>
              <th>4 cycles (6 h)</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map((w) => {
              const [six, five, four] = bedtimesFor(w);
              return (
                <tr key={w}>
                  <td>
                    <strong>{fmtTime(w)}</strong>
                  </td>
                  <td>{fmtTime(six.at)}</td>
                  <td>{fmtTime(five.at)}</td>
                  <td>{fmtTime(four.at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <H2>Why waking up mid-cycle feels so bad</H2>
        <p>
          Through the night your brain moves through lighter sleep, deep slow-wave sleep and REM sleep in cycles of
          roughly 90 minutes (<a href={SRC.nindsSleep.href}>NIH</a>). Deep sleep is concentrated in the first half of the
          night. If an alarm drags you out of deep sleep, the grogginess known as <strong>sleep inertia</strong> is
          stronger and lasts longer (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). That&apos;s the heavy,
          confused feeling where you can&apos;t remember switching off your alarm.
        </p>
        <p>
          Planning your bedtime around full cycles makes it more likely that your alarm goes off when you&apos;re already
          in lighter sleep. It won&apos;t make a short night feel like a long one, but it can make the same amount of
          sleep feel noticeably better.
        </p>

        <H2>How much sleep do you actually need?</H2>
        <p>
          Adults should sleep at least 7 hours a night on a regular basis (
          <a href={SRC.watson2015.href}>AASM/SRS consensus, 2015</a>). That&apos;s why the calculator highlights five
          cycles, about 7.5 hours, and labels four cycles as a minimum. If you regularly need the 6-hour option, your
          schedule is the problem to fix, not the alarm.
        </p>

        <H2>Making the calculated time stick</H2>
        <ul>
          <li>Keep the same wake-up time every day, weekends included, and the bedtime follows.</li>
          <li>Dim lights and screens about an hour before your target bedtime.</li>
          <li>Get daylight within the first 30 minutes of waking.</li>
          <li>
            Use one alarm you can&apos;t ignore. If you sleep through alarms, read{" "}
            <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up as a heavy sleeper</Link>; if you snooze,
            read <Link href="/blog/how-to-stop-hitting-snooze">how to stop hitting snooze</Link>.
          </li>
        </ul>

        <Limits>
          <p>
            This is a planning tool, not a medical device. It assumes 90-minute cycles and 15 minutes to fall asleep, but
            real cycles vary between people and across the night, so treat the results as a starting point and adjust by
            15 minutes. It can&apos;t detect your actual sleep stage. If you&apos;re tired no matter how much you sleep,
            talk to a doctor (<a href={SRC.aasmDisorders.href}>AASM</a>).
          </p>
        </Limits>
      </div>

      <ToolCta
        placement="sleep-calculator"
        title="Got your wake-up time? Now make sure you get up."
        body="Rise Mission keeps ringing until you prove you're awake with push-ups, a walk, a QR scan or math."
      />
      <MoreTools current="sleep-calculator" />

      <Faq items={FAQ} />

      <div className="prose-rm mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <Sources items={[SRC.nindsSleep, SRC.tassi2000, SRC.watson2015, SRC.aasmDisorders]} />
      </div>
    </>
  );
}
