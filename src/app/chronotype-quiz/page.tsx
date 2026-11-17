import Link from "next/link";
import { Answer, H2, Limits, Sources, type Source } from "@/components/blog/prose";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { ChronotypeQuiz } from "@/components/tools/chronotype-quiz";
import { MoreTools, ToolCard, ToolCta, ToolHero } from "@/components/tools/tool-shell";
import { TOOL_ICON3D } from "@/components/site/page-icons";
import { CHRONOTYPES, EARLY_TO, MAX_SCORE, MIN_SCORE, OWL_FROM, QUESTIONS } from "@/lib/chronotype";
import { faqPageLd, type QA, staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { SRC } from "@/lib/sources";

export const metadata = staticPageMetadata("/chronotype-quiz");

/** Page-local sources. DOIs resolved on Crossref and abstracts read on PubMed, 2026-11-15. */
const CHRONO_SRC: Record<string, Source> = {
  horne1976: {
    label: "Horne J.A., Östberg O. A self-assessment questionnaire to determine morningness-eveningness in human circadian rhythms. Int J Chronobiol, 1976 (PubMed)",
    href: "https://pubmed.ncbi.nlm.nih.gov/1027738/",
  },
  roenneberg2003: {
    label: "Roenneberg T., Wirz-Justice A., Merrow M. Life between clocks: daily temporal patterns of human chronotypes. J Biol Rhythms, 2003",
    href: "https://doi.org/10.1177/0748730402239679",
  },
  roenneberg2007: {
    label: "Roenneberg T. et al. Epidemiology of the human circadian clock. Sleep Medicine Reviews, 2007",
    href: "https://doi.org/10.1016/j.smrv.2007.07.005",
  },
  jones2019: {
    label: "Jones S.E. et al. Genome-wide association analyses of chronotype in 697,828 individuals provides insights into circadian rhythms. Nature Communications, 2019",
    href: "https://doi.org/10.1038/s41467-018-08259-7",
  },
  wright2013: {
    label: "Wright K.P. Jr et al. Entrainment of the human circadian clock to the natural light-dark cycle. Current Biology, 2013",
    href: "https://doi.org/10.1016/j.cub.2013.06.039",
  },
  adan2012: {
    label: "Adan A. et al. Circadian typology: a comprehensive review. Chronobiology International, 2012",
    href: "https://doi.org/10.3109/07420528.2012.719971",
  },
};

const FAQ: QA[] = [
  {
    q: "What is a chronotype?",
    a: "Your chronotype is your natural timing preference: when your body clock makes you want to sleep, wake and be active. Early types (larks) wake and peak early; late types (owls) do both later. Most people fall somewhere in between rather than at either extreme.",
  },
  {
    q: "Is this chronotype quiz accurate?",
    a: "It's an informal, original quiz for curiosity and planning, not a validated or clinical test. Researchers use established questionnaires such as the Horne–Östberg Morningness–Eveningness Questionnaire and the Munich ChronoType Questionnaire. If your sleep timing is causing real problems, see a sleep specialist.",
  },
  {
    q: "Can a night owl become an early bird?",
    a: "You can shift your sleep timing, though your underlying tendency is partly genetic. Light is the strongest lever: in a camping study, living with natural light only moved people's body clocks earlier, and late types shifted the most. Move your wake time gradually and get morning daylight.",
  },
  {
    q: "What is social jetlag?",
    a: "Social jetlag is the gap between your body's preferred sleep timing and the timing your work or school schedule forces on you. It shows up as sleeping much later on free days than on workdays, and it's largest in late chronotypes.",
  },
];

const TYPE_ROWS = (["early", "between", "owl"] as const).map((t) => ({
  t,
  range: t === "early" ? `${MIN_SCORE}–${EARLY_TO}` : t === "owl" ? `${OWL_FROM}–${MAX_SCORE}` : `${EARLY_TO + 1}–${OWL_FROM - 1}`,
  ...CHRONOTYPES[t],
}));

export default function ChronotypeQuizPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Chronotype Quiz",
            url: `${SITE_URL}/chronotype-quiz`,
            applicationCategory: "HealthApplication",
            operatingSystem: "Any (web browser)",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          faqPageLd(FAQ),
        ]}
      />
      <ToolHero
        path="/chronotype-quiz"
        icon={TOOL_ICON3D["chronotype-quiz"]}
        title="Chronotype quiz"
        lead={`Are you an early bird, a night owl or in between? Answer ${QUESTIONS.length} quick questions about your natural sleep and energy, then get wake-time advice that fits your type.`}
      />
      <ToolCard>
        <ChronotypeQuiz />
      </ToolCard>

      <div className="prose-rm mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <Answer>
          <strong>Your chronotype is your body clock&apos;s natural lean towards early or late sleep and activity.</strong>{" "}
          Early birds wake and peak early, night owls later, and most people sit in between. It&apos;s partly genetic and
          partly shaped by light and habits, so you can shift your wake time gradually.
        </Answer>

        <H2>What a chronotype is</H2>
        <p>
          Everyone has an internal circadian clock that runs on roughly a 24-hour cycle, and it isn&apos;t set to the same
          time in everyone. In large surveys, preferred sleep and wake times follow a near-bell-shaped distribution:
          extreme early types wake up around when extreme late types fall asleep, and the majority sit between the two (
          <a href={CHRONO_SRC.roenneberg2007.href}>Roenneberg et al., 2007</a>). Chronotype also changes with age and
          differs on average between men and women, according to the same research.
        </p>
        <p>
          Researchers sometimes call this &ldquo;circadian typology&rdquo;, and it shows up in more than sleep. A review of
          the field describes differences between morning and evening types in body temperature rhythms, cortisol and
          melatonin timing, and how people cope with shift work and jet lag (
          <a href={CHRONO_SRC.adan2012.href}>Adan et al., 2012</a>).
        </p>

        <H2>How this quiz works, and what it isn&apos;t</H2>
        <p>
          The quiz asks {QUESTIONS.length} original questions about your free-day wake time, preferred bedtime, peak focus
          time, morning appetite, how you feel after your alarm, evening energy, the kind of day you&apos;d plan, and how much
          you sleep in on days off. Each answer scores 1 (earliest) to 4 (latest), for a total between {MIN_SCORE} and{" "}
          {MAX_SCORE}.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Result</th>
                <th>Score</th>
                <th>What it means</th>
                <th>Wake-time starting point</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_ROWS.map((r) => (
                <tr key={r.t}>
                  <td>
                    <strong>{r.name}</strong>
                  </td>
                  <td>{r.range}</td>
                  <td>{r.summary}</td>
                  <td>{r.wakeWindow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          These bands are our own plain-language cut-offs, not research norms. Researchers use validated questionnaires
          instead. The best known is the Horne–Östberg Morningness–Eveningness Questionnaire (MEQ), published in 1976 and
          checked against the timing of people&apos;s daily body-temperature peak (
          <a href={CHRONO_SRC.horne1976.href}>Horne &amp; Östberg, 1976</a>). The Munich ChronoType Questionnaire (MCTQ)
          takes a different approach: it asks for actual sleep times on work days and free days separately and
          calculates chronotype from them. It has been completed by tens of thousands of people and validated against the
          MEQ, sleep logs and activity monitors (<a href={CHRONO_SRC.roenneberg2007.href}>Roenneberg et al., 2007</a>).
          We don&apos;t reproduce either questionnaire here; if you want a research-grade measure, use the published versions.
        </p>

        <H2>Genes, light and behaviour</H2>
        <p>
          Chronotype is partly inherited. A genome-wide study of 697,828 people from UK Biobank and 23andMe found 351
          genetic regions linked to being a morning person, many involved in circadian regulation. The effect of any one
          person&apos;s genes on actual sleep timing was modest, though: the 5% of people carrying the most
          &ldquo;morning&rdquo; variants slept on average just 25 minutes earlier than the 5% carrying the fewest (
          <a href={CHRONO_SRC.jones2019.href}>Jones et al., 2019</a>).
        </p>
        <p>
          Light does a lot of the rest. The researchers behind the MCTQ found that people who spent more time outdoors in
          daylight slept earlier, across all chronotypes, and concluded that sleep timing depends on genetics, sleep debt
          built up on workdays and light exposure together (
          <a href={CHRONO_SRC.roenneberg2003.href}>Roenneberg et al., 2003</a>). A well-known camping study made the same
          point. After camping with only natural light and no electric lighting, participants&apos; body clocks shifted
          earlier and lined up with sunrise and sunset, and the later chronotypes shifted the most (
          <a href={CHRONO_SRC.wright2013.href}>Wright et al., 2013</a>). Light is the main signal that keeps the body
          clock in step with the day, and artificial light in the evening and at night can shift circadian rhythms and
          sleep (
          <a href={SRC.blume2019.href}>Blume et al., 2019</a>).
        </p>

        <H2>Social jetlag</H2>
        <p>
          The real problem usually isn&apos;t your chronotype, it&apos;s the clash between your chronotype and your alarm.
          Researchers named this &ldquo;social jetlag&rdquo;: the gap between biological time and the time your work or
          school schedule demands. Late types show the largest difference between work-day and free-day sleep, building up
          sleep debt during the week and paying it back by sleeping in at the weekend. In a study of 501 people, poorer
          wellbeing and higher stimulant use, especially smoking, were linked more to social jetlag than to being a late
          type as such (<a href={SRC.wittmann2006.href}>Wittmann et al., 2006</a>).
        </p>
        <p>
          That&apos;s why question 8 asks how much later you sleep on free days. A big gap is a sign your workday alarm is
          fighting your body clock. If it is, our <Link href="/sleep-debt-calculator">sleep debt calculator</Link> shows how
          much sleep the gap is costing you.
        </p>

        <H2>Shifting your rhythm earlier</H2>
        <p>
          You can&apos;t rewrite your genes, but you can move your sleep timing. The practical steps follow from the light
          research above:
        </p>
        <ul>
          <li>
            <strong>Move your wake time in small steps.</strong> 15 minutes earlier every few days is easier to hold than
            jumping an hour. Use the <Link href="/sleep-calculator">sleep cycle calculator</Link> to move your bedtime with
            it, so you still get at least 7 hours (<a href={SRC.watson2015.href}>Watson et al., 2015</a>).
          </li>
          <li>
            <strong>Get daylight early.</strong> Go outside soon after waking, even on cloudy days, and keep evenings dimmer.
          </li>
          <li>
            <strong>Keep weekends close to weekdays.</strong> Sleeping in for hours on Saturday undoes the week&apos;s
            progress; regular sleep timing is also linked to lower mortality risk (
            <a href={SRC.windred2023.href}>Windred et al., 2023</a>).
          </li>
          <li>
            <strong>Make the alarm impossible to ignore</strong> while the new time still feels early. The first two weeks
            are the hardest.
          </li>
        </ul>
        <p>
          If you&apos;re aiming for a very early start, read our guide on{" "}
          <Link href="/blog/how-to-wake-up-at-5am">how to wake up at 5 AM</Link>, and the{" "}
          <Link href="/blog/benefits-of-waking-up-early">honest benefits of waking up early</Link> before you decide it&apos;s
          worth it. A night owl who sleeps enough at a later time may be better off than one forcing a 5 AM alarm on six
          hours of sleep.
        </p>

        <Limits>
          <p>
            This quiz is informal and original. It hasn&apos;t been validated against body-temperature, melatonin or
            activity data, and its score bands are our own, so treat the result as a starting point, not a diagnosis. It
            isn&apos;t the MEQ or the MCTQ. Shift work, new parenthood, medication and some health conditions change sleep
            timing in ways a quiz can&apos;t see. If you can&apos;t fall asleep until very late or can&apos;t stay awake in the
            evening no matter what you try, that can be a circadian rhythm sleep disorder worth discussing with a doctor (
            <a href={SRC.aasmDisorders.href}>AASM</a>).
          </p>
        </Limits>

        <Sources
          items={[
            CHRONO_SRC.roenneberg2007,
            CHRONO_SRC.adan2012,
            CHRONO_SRC.horne1976,
            CHRONO_SRC.jones2019,
            CHRONO_SRC.roenneberg2003,
            CHRONO_SRC.wright2013,
            SRC.blume2019,
            SRC.wittmann2006,
            SRC.watson2015,
            SRC.windred2023,
            SRC.aasmDisorders,
          ]}
        />
      </div>

      <Faq items={FAQ} />

      <ToolCta
        placement="chronotype-quiz"
        title="Early bird or owl, the alarm still has to work."
        body="Rise Mission makes you prove you're awake with push-ups, a walk, a QR scan or math. iPhone, iOS 26 or later."
      />
      <MoreTools current="chronotype-quiz" />
    </>
  );
}
