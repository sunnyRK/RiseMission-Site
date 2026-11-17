import Link from "next/link";
import { Answer, H2, Limits, Sources, type Source } from "@/components/blog/prose";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SleepDebtCalculator } from "@/components/tools/sleep-debt-calculator";
import { MoreTools, ToolCard, ToolCta, ToolHero } from "@/components/tools/tool-shell";
import { faqPageLd, type QA, staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { DEFAULT_NEED, DEFAULT_NIGHTS, fmtHours, sleepDebt } from "@/lib/sleep-debt";
import { SRC } from "@/lib/sources";

export const metadata = staticPageMetadata("/sleep-debt-calculator");

/** Page-local sources. DOIs resolved on Crossref and abstracts read on PubMed, 2026-11-15. */
const DEBT_SRC: Record<string, Source> = {
  vanDongen2003: {
    label: "Van Dongen H.P.A. et al. The cumulative cost of additional wakefulness: dose-response effects on neurobehavioral functions and sleep physiology from chronic sleep restriction and total sleep deprivation. SLEEP, 2003",
    href: "https://doi.org/10.1093/sleep/26.2.117",
  },
  belenky2003: {
    label: "Belenky G. et al. Patterns of performance degradation and restoration during sleep restriction and subsequent recovery: a sleep dose-response study. J Sleep Res, 2003",
    href: "https://doi.org/10.1046/j.1365-2869.2003.00337.x",
  },
  banks2010: {
    label: "Banks S. et al. Neurobehavioral dynamics following chronic sleep restriction: dose-response effects of one night for recovery. SLEEP, 2010",
    href: "https://doi.org/10.1093/sleep/33.8.1013",
  },
  depner2019: {
    label: "Depner C.M. et al. Ad libitum weekend recovery sleep fails to prevent metabolic dysregulation during a repeating pattern of insufficient sleep and weekend recovery sleep. Current Biology, 2019",
    href: "https://doi.org/10.1016/j.cub.2019.01.069",
  },
  akerstedt2019: {
    label: "Åkerstedt T. et al. Sleep duration and mortality: does weekend sleep matter? J Sleep Res, 2019",
    href: "https://doi.org/10.1111/jsr.12712",
  },
  kitamura2016: {
    label: "Kitamura S. et al. Estimating individual optimal sleep duration and potential sleep debt. Scientific Reports, 2016",
    href: "https://doi.org/10.1038/srep35812",
  },
};

const example = sleepDebt(DEFAULT_NEED, DEFAULT_NIGHTS);

const FAQ: QA[] = [
  {
    q: "How do you calculate sleep debt?",
    a: "Subtract the hours you actually slept from the hours you need, night by night, and add up the shortfalls. If you need 8 hours and sleep 6.5, that night adds 1.5 hours. This calculator doesn't subtract lie-ins from the total, because extra sleep on one night doesn't fully undo a short one.",
  },
  {
    q: "Can you catch up on sleep at the weekend?",
    a: "Partly. Extra sleep reduces sleepiness, but lab studies show a weekend or a single long night doesn't fully restore performance after a week of short sleep, and one study found weekend lie-ins didn't prevent the drop in insulin sensitivity. Steady, adequate sleep every night works better.",
  },
  {
    q: "How long does it take to recover from sleep debt?",
    a: "Longer than one night. In a lab study of people allowed to sleep as long as they wanted, about one hour of sleep debt took four days to recover. Adding 30 to 60 minutes a night over a week or two, with a fixed wake time, is a gentler route.",
  },
  {
    q: "How much sleep do I actually need?",
    a: "Most adults need at least 7 hours a night, according to a joint consensus statement from the American Academy of Sleep Medicine and the Sleep Research Society. Individual needs vary; if you wake without an alarm and feel alert all day on a given amount, that's a good clue to your number.",
  },
];

const ROWS: [string, string, string, string][] = [
  ["14 nights of 6 h or 4 h in bed", "Van Dongen et al., 2003", "Thinking and attention got steadily worse night after night", "People's own sleepiness ratings barely rose after the first days, so they underrated the impairment"],
  ["7 nights of 3, 5, 7 or 9 h in bed, then 3 nights of 8 h", "Belenky et al., 2003", "Reaction-time performance in the 5 h and 7 h groups stayed below baseline", "Three normal nights did not bring them back to their starting level"],
  ["5 nights of 4 h, then one night of 0 to 10 h", "Banks et al., 2010", "More recovery sleep helped, in proportion to how much was allowed", "Even 10 h in bed (about 9 h asleep) didn't fully restore attention or sleepiness"],
  ["5 short weeknights, a free weekend, then 2 short nights", "Depner et al., 2019", "People slept only about 1.1 h extra across the weekend", "Insulin sensitivity still fell, and body clocks shifted later"],
];

export default function SleepDebtCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sleep Debt Calculator",
            url: `${SITE_URL}/sleep-debt-calculator`,
            applicationCategory: "HealthApplication",
            operatingSystem: "Any (web browser)",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          faqPageLd(FAQ),
        ]}
      />
      <Breadcrumbs path="/sleep-debt-calculator" />
      <ToolHero
        title="Sleep debt calculator"
        lead="Enter how much sleep you need and how long you actually slept on each of the last 7 nights. See your weekly sleep debt and a gentle way to pay it back."
      />
      <ToolCard>
        <SleepDebtCalculator />
      </ToolCard>

      <div className="prose-rm mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <Answer>
          <strong>Sleep debt is the total of the hours you slept under your need across recent nights.</strong> Needing 8
          hours but sleeping about 6 to 7 on weeknights builds roughly {fmtHours(example.debtHours)} in a week. Pay it back
          gently: go to bed 30 to 60 minutes earlier for several nights and keep your wake time fixed.
        </Answer>

        <H2>What sleep debt is</H2>
        <p>
          Sleep debt, sometimes called a sleep deficit, is the gap between the sleep your body needs and the sleep it gets,
          added up over several nights. One short night leaves a small debt. A week of short nights leaves a bigger one,
          and the effects stack. Most adults need at least 7 hours a night (
          <a href={SRC.watson2015.href}>Watson et al., 2015</a>), and many people feel best on somewhere between 7 and 9.
        </p>
        <p>
          The tricky part is that a chronic deficit doesn&apos;t feel as bad as it is. In a two-week lab experiment, 48
          healthy adults were kept to 4, 6 or 8 hours in bed per night. The 4- and 6-hour groups got steadily worse on
          attention and thinking tests every day, in a dose-dependent way, yet their own sleepiness ratings rose at first
          and then barely changed (<a href={DEBT_SRC.vanDongen2003.href}>Van Dongen et al., 2003</a>). In other words,
          people stop noticing how impaired they are. That&apos;s why it&apos;s worth counting the hours rather than going by
          feel.
        </p>

        <H2>How this calculator works</H2>
        <p>
          For each of your last 7 nights, the calculator subtracts the hours you slept from your nightly need. Every night
          you fell short adds to your debt. Nights where you slept longer than your need are shown as a lie-in surplus,
          but they are <em>not</em> subtracted from the headline number. That&apos;s deliberate: as the research below
          shows, an extra-long night doesn&apos;t cleanly cancel a short one.
        </p>
        <p>
          The example week, already filled in, is a common pattern: five weeknights of 6 to 7 hours and two longer nights
          at the weekend. With an 8-hour need, that comes to {fmtHours(example.debtHours)} of debt, an average of{" "}
          {fmtHours(example.avgSlept)} a night, and the weekend lie-ins add back {fmtHours(example.surplusHours)}. The
          catch-up suggestion scales with the size of the debt: about 30 minutes extra a night for a small debt, up to
          60 minutes for a large one, never more than an hour, so the plan stays realistic.
        </p>
        <p>
          Use time actually asleep, not time in bed. If you lie awake for 30 minutes before drifting off, take it off. A
          sleep tracker can help, but treat its numbers as estimates too.
        </p>

        <H2>Can you catch up on sleep at the weekend?</H2>
        <p>
          Partly, and that &ldquo;partly&rdquo; matters. Here&apos;s what controlled studies found when people slept short
          and then tried to recover:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>What people did</th>
                <th>Study</th>
                <th>What happened</th>
                <th>The catch</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([what, study, result, caveat]) => (
                <tr key={study}>
                  <td>
                    <strong>{what}</strong>
                  </td>
                  <td>{study}</td>
                  <td>{result}</td>
                  <td>{caveat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          In the Belenky study, 66 volunteers spent 3, 5, 7 or 9 hours in bed for a week, then had three nights of 8
          hours. The 5- and 7-hour groups stayed at a reduced level of performance through all three recovery nights,
          with no sign of recovery, and the authors suggest the brain adapts to chronic restriction in a way that takes
          several days to undo (<a href={DEBT_SRC.belenky2003.href}>Belenky et al., 2003</a>). Banks and colleagues tested
          one recovery night of 0 to 10 hours after five nights of 4 hours in 159 adults: longer recovery helped, but even
          10 hours in bed left attention, sleepiness and fatigue short of baseline (
          <a href={DEBT_SRC.banks2010.href}>Banks et al., 2010</a>).
        </p>
        <p>
          The weekend-specific study came from Colorado. Young adults were kept to 5-hour sleep opportunities during a
          workweek, then allowed to sleep as long as they liked over a weekend, then cut back again. Across the weekend
          they slept only about 1.1 hours more than baseline in total. During the following short nights, their body
          clocks ran later, they ate more after dinner, and whole-body insulin sensitivity was still down by roughly 9 to
          27% depending on the measure. The authors concluded weekend recovery sleep isn&apos;t an effective way to
          prevent the metabolic effects of repeated short sleep (
          <a href={DEBT_SRC.depner2019.href}>Depner et al., 2019</a>).
        </p>

        <H2>What the research doesn&apos;t say</H2>
        <p>
          It doesn&apos;t say weekend sleep is worthless. A Swedish cohort of 43,880 people followed for 13 years found
          that, among people under 65, those who slept short on weekdays but long at weekends had a mortality rate no
          different from people who consistently slept 6 to 7 hours, while consistently short sleepers had a higher rate (
          <a href={DEBT_SRC.akerstedt2019.href}>Åkerstedt et al., 2019</a>). That&apos;s an observational study, so it can&apos;t
          prove the lie-ins caused anything, but it suggests extra weekend sleep isn&apos;t harmful in itself and may
          offset some risk.
        </p>
        <p>
          It also doesn&apos;t give you an exact exchange rate. There&apos;s no study showing that one extra hour on Saturday
          repays exactly one hour from Tuesday. The clearest signal is that recovery takes time: when Japanese researchers
          let volunteers sleep as long as they wanted for several days, the amount of hidden sleep debt varied from person
          to person, and about one hour of it took four days of extended sleep to recover (
          <a href={DEBT_SRC.kitamura2016.href}>Kitamura et al., 2016</a>).
        </p>

        <H2>A gentler way to pay it back</H2>
        <ul>
          <li>
            <strong>Add 30 to 60 minutes a night, not 4 hours on Sunday.</strong> Small, repeated extra sleep is easier to
            get and doesn&apos;t throw off your body clock.
          </li>
          <li>
            <strong>Take it from the evening.</strong> Move your bedtime earlier and keep your alarm where it is. A big
            lie-in pushes your body clock later, which is exactly the shift Depner&apos;s volunteers showed, and makes the
            next early morning harder. The gap between weekday and weekend sleep timing has a name, social jetlag (
            <a href={SRC.wittmann2006.href}>Wittmann et al., 2006</a>).
          </li>
          <li>
            <strong>Keep your wake time fixed, seven days a week.</strong> In more than 60,000 UK Biobank participants,
            sleep regularity was a stronger predictor of mortality risk than sleep duration (
            <a href={SRC.windred2023.href}>Windred et al., 2023</a>). Consistency is worth protecting even while you catch
            up.
          </li>
          <li>
            <strong>Pick a bedtime that fits your cycles.</strong> Our{" "}
            <Link href="/sleep-calculator">sleep cycle calculator</Link> counts back from your wake time so the extra sleep
            lands on a sensible bedtime.
          </li>
          <li>
            <strong>A short nap can bridge the gap.</strong> If a whole earlier bedtime isn&apos;t possible, an early-afternoon
            power nap helps alertness; see the <Link href="/nap-calculator">nap calculator</Link>.
          </li>
        </ul>
        <p>
          Fixing the wake time is the part most people find hardest, especially if they&apos;re trying to become earlier
          risers. If that&apos;s your goal, read the{" "}
          <Link href="/blog/benefits-of-waking-up-early">honest benefits of waking up early</Link> first, and make sure
          your sleep need is covered before you move your alarm.
        </p>

        <Limits>
          <p>
            This is a planning tool, not medical advice. Your true sleep need isn&apos;t known precisely, so the debt figure
            is only as good as the need you enter. Most recovery studies are short, run in labs with healthy young adults,
            and measure specific outcomes like reaction time or insulin sensitivity, so they don&apos;t tell you how a
            given week will feel for you. If you sleep enough and still feel exhausted, snore loudly or fall asleep during
            the day, talk to a doctor: those can be signs of a sleep disorder (<a href={SRC.aasmDisorders.href}>AASM</a>).
          </p>
        </Limits>

        <Sources
          items={[
            SRC.watson2015,
            DEBT_SRC.vanDongen2003,
            DEBT_SRC.belenky2003,
            DEBT_SRC.banks2010,
            DEBT_SRC.depner2019,
            DEBT_SRC.akerstedt2019,
            DEBT_SRC.kitamura2016,
            SRC.wittmann2006,
            SRC.windred2023,
            SRC.aasmDisorders,
          ]}
        />
      </div>

      <Faq items={FAQ} />

      <ToolCta
        placement="sleep-debt-calculator"
        title="Fixed wake time, no excuses."
        body="Rise Mission makes you prove you're awake with push-ups, a walk, a QR scan or math. iPhone, iOS 26 or later."
      />
      <MoreTools current="sleep-debt-calculator" />
    </>
  );
}
