import Link from "next/link";
import { Answer, H2, Limits, Sources, type Source } from "@/components/blog/prose";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { NapCalculator } from "@/components/tools/nap-calculator";
import { MoreTools, ToolCard, ToolCta, ToolHero } from "@/components/tools/tool-shell";
import { TOOL_ICON3D } from "@/components/site/page-icons";
import { DEFAULT_BUFFER_MIN, napPlan } from "@/lib/nap";
import { breadcrumbLd, faqPageLd, pageMetadata, type QA } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { fmtTime } from "@/lib/sleep";
import { SRC } from "@/lib/sources";

export const metadata = pageMetadata({
  title: "Nap Calculator: Power Nap or Full Cycle",
  description:
    "Free nap calculator. Pick a power nap, recovery nap or full 90-minute cycle and get the exact alarm time, plus the deep-sleep window to avoid waking in.",
  path: "/nap-calculator",
});

/** Page-local sources. DOIs resolved on Crossref and abstracts read on PubMed, 2026-11-15. */
const NAP_SRC: Record<string, Source> = {
  brooks2006: {
    label: "Brooks A., Lack L. A brief afternoon nap following nocturnal sleep restriction: which nap duration is most recuperative? SLEEP, 2006",
    href: "https://doi.org/10.1093/sleep/29.6.831",
  },
  lovato2010: {
    label: "Lovato N., Lack L. The effects of napping on cognitive functioning. Progress in Brain Research, 2010",
    href: "https://doi.org/10.1016/B978-0-444-53702-7.00009-9",
  },
  hilditch2016: {
    label: "Hilditch C.J. et al. A 30-minute, but not a 10-minute nighttime nap is associated with sleep inertia. SLEEP, 2016",
    href: "https://doi.org/10.5665/sleep.5550",
  },
  milner2009: {
    label: "Milner C.E., Cote K.A. Benefits of napping in healthy adults: impact of nap length, time of day, age, and experience with napping. J Sleep Res, 2009",
    href: "https://doi.org/10.1111/j.1365-2869.2008.00718.x",
  },
  sleepFoundation: {
    label: "Sleep Foundation. Napping: Benefits and Tips (medically reviewed)",
    href: "https://www.sleepfoundation.org/sleep-hygiene/napping",
  },
};

const ONE_PM = 13 * 60;
const power1pm = napPlan(ONE_PM, DEFAULT_BUFFER_MIN, "power");
const full1pm = napPlan(ONE_PM, DEFAULT_BUFFER_MIN, "full");

const FAQ: QA[] = [
  {
    q: "How long should a power nap be?",
    a: "About 10 to 20 minutes of actual sleep. In a lab study of short afternoon naps, a 10-minute nap gave the quickest boost and a 20-minute nap helped after a short delay, while 30 minutes caused a spell of grogginess first.",
  },
  {
    q: "What time should I set my alarm for a 20-minute nap?",
    a: `Add the time it takes you to fall asleep. Lying down at 1:00 PM with ${DEFAULT_BUFFER_MIN} minutes to drift off, set the alarm for ${fmtTime(power1pm.wakeAt)}. For a full 90-minute cycle from the same start, set it for ${fmtTime(full1pm.wakeAt)}.`,
  },
  {
    q: "Why do I feel worse after a long nap?",
    a: "Naps longer than about 30 minutes are more likely to reach deep sleep, and waking from deep sleep causes sleep inertia: a groggy, slow spell that can last a while. Either keep the nap short or sleep a full cycle of about 90 minutes.",
  },
  {
    q: "What is the best time of day to nap?",
    a: "Early afternoon, during the post-lunch dip, suits most people. Napping late in the day can make it harder to fall asleep at night; a common rule of thumb is to finish napping at least eight hours before bedtime.",
  },
];

const ROWS: [string, string, string, string][] = [
  ["Power nap", "10–20 min", "A quick lift in alertness at work or between classes", "Low"],
  ["Recovery nap", "~30 min", "A bit more rest when you're short on sleep", "Medium: a few groggy minutes are common"],
  ["Full cycle", "~90 min", "Catching up after a short night or before a late shift", "Low if you sleep the whole cycle; high if cut short"],
  ["Long nap", "40–80 min", "Not recommended for planning", "High: you're likely to wake from deep sleep"],
];

export default function NapCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Nap Calculator",
            url: `${SITE_URL}/nap-calculator`,
            applicationCategory: "HealthApplication",
            operatingSystem: "Any (web browser)",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Nap calculator", path: "/nap-calculator" },
          ]),
          faqPageLd(FAQ),
        ]}
      />
      <ToolHero
        icon={TOOL_ICON3D["nap-calculator"]}
        title="Nap calculator"
        lead="Pick a power nap, a recovery nap or a full sleep cycle and get the exact time to set your alarm, plus the window where waking up would leave you groggy."
      />
      <ToolCard>
        <NapCalculator />
      </ToolCard>

      <div className="prose-rm mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <Answer>
          <strong>For a quick boost, sleep 10 to 20 minutes; for real recovery, sleep a full cycle of about 90 minutes.</strong>{" "}
          Add the time you take to fall asleep and set your alarm for then. Avoid waking roughly 30 to 60 minutes in, when
          deep sleep makes grogginess more likely.
        </Answer>

        <H2>Nap lengths compared</H2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Nap</th>
                <th>Sleep time</th>
                <th>Good for</th>
                <th>Grogginess risk</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([n, t, g, r]) => (
                <tr key={n}>
                  <td>
                    <strong>{n}</strong>
                  </td>
                  <td>{t}</td>
                  <td>{g}</td>
                  <td>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          &ldquo;Sleep time&rdquo; means time actually asleep, which is why the calculator asks how long you usually take to
          drift off and adds it on. If you&apos;re not sure, {DEFAULT_BUFFER_MIN} minutes is a sensible default; pick 5 if you
          crash instantly, or 15 to 20 if you tend to lie there thinking.
        </p>

        <H2>Power nap vs full-cycle nap</H2>
        <p>
          The best-known comparison of short naps had 24 healthy young adults sleep only about five hours, then take a nap
          at 3 PM of exactly 5, 10, 20 or 30 minutes, or no nap (
          <a href={NAP_SRC.brooks2006.href}>Brooks &amp; Lack, 2006</a>). Five minutes did little. Ten minutes improved
          sleepiness, fatigue and cognitive performance straight away, with some benefits lasting up to 155 minutes.
          Twenty minutes helped too, but the improvements only showed up about 35 minutes after waking. Thirty minutes
          first caused a period of impaired alertness, the classic sign of sleep inertia, before improvements kicked in.
        </p>
        <p>
          A later review from the same group summed up the pattern: brief naps of 5 to 15 minutes give almost immediate
          benefits that last one to three hours, while naps longer than 30 minutes can cause short-term impairment but
          then improve performance for longer (<a href={NAP_SRC.lovato2010.href}>Lovato &amp; Lack, 2010</a>). The authors
          also note that more prior wakefulness favours longer naps, and that the conclusions should be taken cautiously
          until more research is done.
        </p>
        <p>
          A full-cycle nap of about 90 minutes is the other option. Sleep runs in cycles of roughly 90 minutes that move
          from light sleep into deep sleep and REM and back (<a href={SRC.nindsSleep.href}>NIH</a>), so sleeping a whole
          cycle gives you a better chance of waking from lighter sleep. The Sleep Foundation suggests naps of about 20
          minutes and no longer than 30 for most adults, and notes that a nap of around an hour and a half can help shift
          and emergency workers (<a href={NAP_SRC.sleepFoundation.href}>Sleep Foundation</a>).
        </p>

        <H2>Sleep inertia: why long naps can backfire</H2>
        <p>
          Sleep inertia is the groggy, slowed-down state right after waking, and it&apos;s stronger when you wake from deep
          slow-wave sleep (<a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>). In a simulated night shift, people
          given a 30-minute nap spent about 15 minutes of it in slow-wave sleep and performed worse on a reaction-time
          test immediately afterwards, and still worse 47 minutes later, than before the nap. A 10-minute nap had almost no
          slow-wave sleep and no such dip (<a href={NAP_SRC.hilditch2016.href}>Hilditch et al., 2016</a>).
        </p>
        <p>
          The same study found something worth remembering: people rated their own performance as better after every nap,
          even when the test showed it was worse. You may <em>feel</em> fine after a 40-minute nap while your reactions are
          still slow, so leave a margin before driving or doing anything safety-critical. That&apos;s also why the calculator
          shows the &ldquo;avoid waking&rdquo; band: hitting snooze on a 20-minute nap pushes you straight into it.
        </p>

        <H2>The best time of day to nap</H2>
        <p>
          Early afternoon is the most favourable time for most people (<a href={NAP_SRC.lovato2010.href}>Lovato &amp; Lack,
          2010</a>). That lines up with the post-lunch dip in alertness many people feel. Late naps are more likely to eat
          into night-time sleep; the Sleep Foundation&apos;s rule of thumb is to nap at least eight hours before bedtime,
          which for most people means before about 3 PM (<a href={NAP_SRC.sleepFoundation.href}>Sleep Foundation</a>). A
          review of napping research looks at how age and experience with napping change the benefit (
          <a href={NAP_SRC.milner2009.href}>Milner &amp; Cote, 2009</a>), and people who nap regularly seem to get more out
          of a nap than people who rarely do (<a href={NAP_SRC.lovato2010.href}>Lovato &amp; Lack, 2010</a>).
        </p>

        <H2>Who should skip or limit naps</H2>
        <ul>
          <li>
            <strong>People who struggle to sleep at night.</strong> Relying on naps instead of consistent night-time sleep
            can contribute to fragmented sleep (<a href={NAP_SRC.sleepFoundation.href}>Sleep Foundation</a>). If you have
            insomnia, ask a clinician before adding naps.
          </li>
          <li>
            <strong>Anyone who needs to be sharp straight after.</strong> Keep it to a power nap, or allow time for
            grogginess to clear before driving.
          </li>
          <li>
            <strong>People who feel very sleepy every day despite enough sleep.</strong> Excessive daytime sleepiness can
            be a sign of a sleep disorder and is worth checking with a doctor (
            <a href={SRC.aasmDisorders.href}>AASM</a>).
          </li>
          <li>
            <strong>People who feel fine without naps.</strong> If you function well without one, you probably don&apos;t
            need it.
          </li>
        </ul>

        <H2>Make sure the alarm actually wakes you</H2>
        <p>
          A nap only works if you get up on time. If you&apos;re at a computer, set the time from this calculator in our{" "}
          <Link href="/online-alarm-clock">online alarm clock</Link>, which uses countdown presets and a math challenge so
          you can&apos;t switch it off half-asleep. For a proper night&apos;s sleep, use the{" "}
          <Link href="/sleep-calculator">sleep cycle calculator</Link> instead, and if you keep sleeping through alarms, read{" "}
          <Link href="/blog/sleep-inertia">what sleep inertia is and how to beat it</Link>.
        </p>

        <Limits>
          <p>
            This is a planning tool, not medical advice. The 30-to-60-minute deep-sleep window is an approximation: how fast
            you reach deep sleep depends on how tired you are, the time of day and your age. Most nap studies are small,
            involve healthy young adults and look at a single nap, so the exact &ldquo;best&rdquo; length for you may differ.
            If you rely on naps to get through every day, treat that as a sign to look at your night-time sleep (
            <a href={SRC.watson2015.href}>adults need at least 7 hours</a>).
          </p>
        </Limits>

        <Sources
          items={[
            NAP_SRC.brooks2006,
            NAP_SRC.lovato2010,
            NAP_SRC.hilditch2016,
            NAP_SRC.milner2009,
            NAP_SRC.sleepFoundation,
            SRC.tassi2000,
            SRC.nindsSleep,
            SRC.watson2015,
            SRC.aasmDisorders,
          ]}
        />
      </div>

      <Faq items={FAQ} />

      <ToolCta
        placement="nap-calculator"
        title="Naps are easy. Getting up is the hard part."
        body="Rise Mission makes you prove you're awake with push-ups, a walk, a QR scan or math. iPhone, iOS 26 or later."
      />
      <MoreTools current="nap-calculator" />
    </>
  );
}
