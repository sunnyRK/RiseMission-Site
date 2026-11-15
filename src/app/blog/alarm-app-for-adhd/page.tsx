import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("alarm-app-for-adhd");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/**
 * DOIs resolved via Crossref and abstracts read on PubMed, 2026-11-15.
 * Each claim below stays within what the abstract states.
 */
const EXTRA = {
  vanVeen2010: {
    label:
      "Van Veen M.M. et al. Delayed circadian rhythm in adults with attention-deficit/hyperactivity disorder and chronic sleep-onset insomnia. Biological Psychiatry, 2010",
    href: "https://doi.org/10.1016/j.biopsych.2009.12.032",
  },
  coogan2017: {
    label:
      "Coogan A.N., McGowan N.M. A systematic review of circadian function, chronotype and chronotherapy in attention deficit hyperactivity disorder. ADHD Attention Deficit and Hyperactivity Disorders, 2017",
    href: "https://doi.org/10.1007/s12402-016-0214-5",
  },
  kooij2013: {
    label:
      "Kooij J.J.S., Bijlenga D. The circadian rhythm in adult attention-deficit/hyperactivity disorder: current state of affairs. Expert Review of Neurotherapeutics, 2013",
    href: "https://doi.org/10.1586/14737175.2013.836301",
  },
  wynchank2017: {
    label:
      "Wynchank D. et al. Adult ADHD and insomnia: an update of the literature. Current Psychiatry Reports, 2017",
    href: "https://doi.org/10.1007/s11920-017-0860-0",
  },
  fargason2017: {
    label:
      "Fargason R.E. et al. Correcting delayed circadian phase with bright light therapy predicts improvement in ADHD symptoms: a pilot study. Journal of Psychiatric Research, 2017",
    href: "https://doi.org/10.1016/j.jpsychires.2017.03.004",
  },
  nimhAdhd: {
    label: "National Institute of Mental Health. Attention-Deficit/Hyperactivity Disorder (ADHD)",
    href: "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd",
  },
};

const FAQ: QA[] = [
  {
    q: "Why is it so hard to wake up with ADHD?",
    a: "Research consistently links ADHD with a later chronotype and a delayed body clock, including later melatonin onset and later sleep onset. If you fall asleep late but must wake early, you're waking at a biologically harder time, on less sleep.",
  },
  {
    q: "Can an alarm app treat ADHD sleep problems?",
    a: "No. An alarm app can make it harder to switch the alarm off and fall back asleep, but it doesn't shift your body clock, fix insomnia or treat ADHD. Sleep problems with ADHD are worth raising with your clinician.",
  },
  {
    q: "Does morning light help people with ADHD wake up?",
    a: "Reviews list morning bright light as one approach for a delayed rhythm in adults with ADHD, and a small pilot study found it advanced sleep timing. It's not proven for everyone, and light therapy should be discussed with a clinician first.",
  },
  {
    q: "Should I use several alarms if I have ADHD?",
    a: "Many people do, but a stack of snooze-able alarms often trains you to ignore them. One alarm you have to get out of bed to stop, plus a consistent wake time, is usually a stronger setup.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>An alarm app can help with ADHD mornings by making the alarm impossible to dismiss from bed, but it
        can&apos;t fix the underlying sleep timing.</strong> Research links ADHD with a delayed body clock, so waking early
        is genuinely harder. Pair an out-of-bed alarm with consistent wake times and morning light, and talk to your
        clinician.
      </Answer>

      <KeyTakeaways
        items={[
          "A systematic review of 62 studies found consistent evidence that ADHD is linked to later chronotype and a delayed body clock.",
          "Insomnia is common in adults with ADHD and is also a reported side effect of some ADHD medications.",
          "External structure helps most: one fixed wake time, an alarm you must get up to stop, light right away.",
          "Novelty and rotating challenges are practical tricks, not research-backed treatments.",
          "An alarm app is a tool for the moment of waking; it isn't ADHD or sleep treatment.",
        ]}
      />

      <Callout title="Not medical advice">
        I build an alarm app; I&apos;m not a clinician. ADHD and sleep problems overlap in ways that need a professional,
        especially if you take medication or have insomnia. Use this article for ideas to bring to that conversation, not
        as a substitute for it.
      </Callout>

      <H2>Why is waking up so hard with ADHD?</H2>
      <p>
        Part of the answer is timing. In 2017, Coogan and McGowan reviewed 62 studies covering 4,462 people with ADHD and
        found consistent evidence that ADHD is associated with more &ldquo;eveningness&rdquo;, or a later chronotype, and
        with delays in circadian markers like dim light melatonin onset and sleep onset (
        <a href={EXTRA.coogan2017.href}>Coogan &amp; McGowan, 2017</a>).
      </p>
      <p>
        One earlier study shows what that looks like in adults. Van Veen and colleagues tracked 40 adults with ADHD for a
        week. Those with chronic sleep-onset insomnia, which was 31 of them, had a delayed start and end of their sleep
        period and a delayed melatonin onset compared with healthy controls (
        <a href={EXTRA.vanVeen2010.href}>Van Veen et al., 2010</a>). In plain terms: their body clock was running late, so
        a 7 a.m. alarm landed at a time that felt much earlier to their biology.
      </p>
      <p>
        A review by Kooij and Bijlenga puts it directly: adults with ADHD often have sleep problems caused by a delay of
        their internal circadian rhythm, and are often typified as &ldquo;evening&rdquo; or &ldquo;night&rdquo; people (
        <a href={EXTRA.kooij2013.href}>Kooij &amp; Bijlenga, 2013</a>). That doesn&apos;t mean everyone with ADHD is a night
        owl, but it explains why so many people with ADHD describe mornings as a daily fight.
      </p>
      <H3>Insomnia and medication add to it</H3>
      <p>
        A literature update by Wynchank and colleagues reports insomnia in 43 to 80 percent of adults with ADHD across
        three studies, and notes insomnia is reported as a side effect in trials of several ADHD medications (
        <a href={EXTRA.wynchank2017.href}>Wynchank et al., 2017</a>). Its recommendation is that adults with ADHD should be
        assessed for insomnia and both conditions treated. If you fall asleep late because you can&apos;t fall asleep,
        that&apos;s a conversation for your prescriber, not something to work around with louder alarms. Never change
        medication timing on your own.
      </p>

      <H2>What does an alarm actually need to do for an ADHD brain?</H2>
      <p>
        When people with ADHD describe bad mornings, the problem is rarely &ldquo;I didn&apos;t hear it&rdquo;. It&apos;s &ldquo;I turned it off and don&apos;t remember&rdquo;, or &ldquo;I snoozed nine times and
        then it was 10 a.m.&rdquo; Three things tend to matter:
      </p>
      <ul>
        <li>
          <strong>No easy exit.</strong> If one tap stops the alarm, a groggy brain will find that tap. The half-awake
          state after waking, sleep inertia, impairs judgement for a while (
          <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>).
        </li>
        <li>
          <strong>Movement.</strong> Getting vertical and moving is the single best way I know to make waking stick.
        </li>
        <li>
          <strong>Something that isn&apos;t boring yet.</strong> Many people with ADHD say routines that worked last month
          stop working once they become automatic. That&apos;s lived experience, not a study, but it&apos;s common enough
          to plan for.
        </li>
      </ul>

      <H2>Which morning strategies have the most support?</H2>
      <p>
        Here&apos;s how I&apos;d rank the common strategies, with an honest note on the evidence behind each. &ldquo;Lived
        experience&rdquo; means there&apos;s no strong research specific to ADHD that I could verify.
      </p>
      <table>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>What it targets</th>
            <th>Evidence</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clinician assessment of sleep</td>
            <td>Insomnia, delayed rhythm, medication effects</td>
            <td>Recommended in reviews</td>
            <td>The step most people skip</td>
          </tr>
          <tr>
            <td>Morning bright light</td>
            <td>Delayed body clock</td>
            <td>Reviews plus a small pilot study</td>
            <td>Discuss light therapy with a clinician first</td>
          </tr>
          <tr>
            <td>Consistent wake time</td>
            <td>Irregular sleep timing</td>
            <td>General sleep guidance</td>
            <td>Weekends included, within reason</td>
          </tr>
          <tr>
            <td>Alarm you must get up to stop</td>
            <td>Dismissing it half-asleep</td>
            <td>Practical, not ADHD-specific</td>
            <td>Phone across the room, QR code, steps</td>
          </tr>
          <tr>
            <td>Rotating wake-up tasks</td>
            <td>Habituation and boredom</td>
            <td>Lived experience</td>
            <td>Swap the task when it gets automatic</td>
          </tr>
          <tr>
            <td>Body doubling the morning</td>
            <td>Starting tasks</td>
            <td>Lived experience</td>
            <td>A call or co-working session at a fixed time</td>
          </tr>
          <tr>
            <td>Five stacked snooze alarms</td>
            <td>Nothing well</td>
            <td>None I could find</td>
            <td>Often teaches you to ignore alarms</td>
          </tr>
        </tbody>
      </table>

      <H2>Does morning light help with a delayed body clock?</H2>
      <p>
        Light and darkness are how your body clock synchronises to the 24-hour day, and light at night has been shown to
        alter circadian rhythms and sleep in humans (<a href={SRC.blume2019.href}>Blume et al., 2019</a>). The same review
        describes light as a noninvasive therapeutic option for sleep and mood. For
        ADHD specifically, the Kooij and Bijlenga review lists bright light therapy in the morning, alongside sleep hygiene
        education and melatonin, as treatment approaches for a delayed rhythm (
        <a href={EXTRA.kooij2013.href}>Kooij &amp; Bijlenga, 2013</a>).
      </p>
      <p>
        The direct evidence is still small. In a pilot study, two weeks of 30-minute morning bright light therapy, added to
        usual care, moved melatonin onset about 31 minutes earlier and mid-sleep about 57 minutes earlier in adults with
        ADHD, and the shifts correlated with lower ADHD symptom scores (
        <a href={EXTRA.fargason2017.href}>Fargason et al., 2017</a>). Participants were also asked to minimise overhead light after 4 p.m., so the
        evening side was part of the plan too. It was a pilot without a control group, so it
        suggests rather than proves. A light box and melatonin are things to set up with a clinician, especially the timing.
        Opening the curtains or stepping outside right after your alarm is the low-risk version anyone can try.
      </p>

      <H2>How do structure, novelty and body doubling fit in?</H2>
      <H3>External structure</H3>
      <p>
        Willpower at 6:30 a.m. is a bad plan for anyone, and worse with ADHD. Put the decision outside your head: one wake
        time, set once, the phone charging across the room, clothes laid out, a glass of water by the charger. Every step
        you design the night before is a step your groggy self doesn&apos;t have to choose. Our{" "}
        <Link href="/sleep-calculator">sleep calculator</Link> helps you work backwards from that wake time to a realistic
        bedtime.
      </p>
      <H3>Novelty and rotating challenges</H3>
      <p>
        If the same alarm stops working after a few weeks, change what it asks of you. Rotate between a physical task one
        week and a puzzle the next, or move your QR code to a new room. I have no study showing this works for ADHD; it&apos;s
        a practical response to something many people report. I explain how different challenge types compare in{" "}
        <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
      </p>
      <H3>Body doubling your routine</H3>
      <p>
        Body doubling means doing a task while someone else is present, in person or on a call. Many people with ADHD use
        it for chores and work. For mornings, that might be a fixed 7:15 call with a friend, a gym partner who expects you,
        or a co-working session that starts at a set time. Again, this is lived experience rather than research, but an
        appointment with a person is a kind of alarm your brain takes seriously.
      </p>

      <H2>Where does an alarm app help, and where doesn&apos;t it?</H2>
      <p>
        An alarm app helps with one specific moment: the minute between the alarm going off and you deciding whether to get
        up. It can make that minute harder to sleep through. That&apos;s the idea behind{" "}
        <Link href="/">Rise Mission</Link>, which I built: the alarm only stops after a wake-up challenge, and there are{" "}
        {FACTS.challengeCount} to switch between, from push-ups and a step goal to typing and memory puzzles. One thing I
        insisted on: {FACTS.emergencyDismiss}
      </p>
      <p>What no alarm app can do, ours included:</p>
      <ul>
        <li>Move your body clock earlier on its own.</li>
        <li>Make up for going to sleep at 3 a.m.</li>
        <li>Treat insomnia, medication side effects or ADHD itself.</li>
      </ul>
      <p>
        If you want options beyond apps, like smart plugs and a phone across the room, I compare them in{" "}
        <Link href="/blog/alarm-that-makes-you-get-out-of-bed">alarms that make you get out of bed</Link>. And if the
        problem is not hearing the alarm at all, start with{" "}
        <Link href="/blog/loudest-alarm-sound-iphone">making your iPhone alarm as loud as possible</Link>.
      </p>

      <H2>When should you talk to a clinician?</H2>
      <p>
        Sooner than most people do. The NIMH notes that ADHD often co-occurs with other conditions, including sleep
        problems, which can make them harder to diagnose and treat, and that NIH-supported research highlights sleep as a
        target for early ADHD interventions (<a href={EXTRA.nimhAdhd.href}>NIMH</a>). Raise it if you regularly can&apos;t
        fall asleep until very late, wake exhausted even after enough hours, feel very sleepy in the day, or notice sleep
        changing after starting or adjusting medication.
      </p>
      <p>
        One thing that makes that appointment more useful: keep a simple two-week log before you go. Write down when you
        went to bed, roughly when you fell asleep, when the alarm rang, how many times you snoozed or switched it off, and
        when you actually got up. It turns &ldquo;I&apos;m terrible at mornings&rdquo; into a pattern a clinician can work
        with, and it shows you whether your problem is falling asleep, waking up, or both.
      </p>

      <Limits>
        <p>
          The research cited here is about groups, not you. The circadian findings come from a systematic review and smaller
          studies; the light therapy result is a small pilot without a control group. Body doubling and rotating challenges
          have no ADHD-specific evidence I could verify, so I present them as practical ideas. Nothing here is treatment,
          and an alarm app isn&apos;t a medical device. Don&apos;t start light therapy or melatonin, or change ADHD
          medication timing, without your clinician. If you have signs of a sleep disorder, see a professional (
          <a href={SRC.aasmDisorders.href}>AASM</a>).
        </p>
      </Limits>

      <Sources
        items={[
          EXTRA.coogan2017,
          EXTRA.vanVeen2010,
          EXTRA.kooij2013,
          EXTRA.wynchank2017,
          EXTRA.fargason2017,
          EXTRA.nimhAdhd,
          SRC.blume2019,
          SRC.tassi2000,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
