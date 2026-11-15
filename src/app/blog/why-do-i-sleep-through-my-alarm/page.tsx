import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, H3, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { getPost } from "@/lib/blog";
import { pageMetadata, type QA } from "@/lib/seo";
import { FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("why-do-i-sleep-through-my-alarm");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

/** New sources verified for this post (Crossref title/journal/year + abstract read 2026-11-15; Apple page fetched and read). */
const EXTRA = {
  hilditch2019: {
    label: "Hilditch C.J., McHill A.W. Sleep inertia: current insights. Nature and Science of Sleep, 2019",
    href: "https://doi.org/10.2147/NSS.S188911",
  },
  trotti2017: {
    label: "Trotti L.M. Waking up is the hardest thing I do all day: Sleep inertia and sleep drunkenness. Sleep Medicine Reviews, 2017",
    href: "https://doi.org/10.1016/j.smrv.2016.08.005",
  },
  crowley2007: {
    label: "Crowley S.J., Acebo C., Carskadon M.A. Sleep, circadian rhythms, and delayed phase in adolescence. Sleep Medicine, 2007",
    href: "https://doi.org/10.1016/j.sleep.2006.12.002",
  },
  aasmApnea: {
    label: "American Academy of Sleep Medicine. Sleep apnea (sleepeducation.org)",
    href: "https://sleepeducation.org/sleep-disorders/obstructive-sleep-apnea/",
  },
  appleAlarms: {
    label: "Apple Support. How to set and change alarms on your iPhone",
    href: "https://support.apple.com/en-us/118444",
  },
};

const FAQ: QA[] = [
  {
    q: "Is it normal to sleep through an alarm?",
    a: "Occasionally, yes, especially after a short or late night. Doing it most days usually points to chronic sleep debt, an irregular schedule or an alarm you've learned to ignore. If none of those fit, it's worth asking a doctor.",
  },
  {
    q: "Why do I turn off my alarm and not remember?",
    a: "In the first minutes after waking you're in sleep inertia, a groggy state where memory and judgment are impaired. Switching off an alarm is simple enough to do in that state without forming a memory of it.",
  },
  {
    q: "Can a medical condition make you sleep through alarms?",
    a: "Yes. Sleep apnea, narcolepsy, idiopathic hypersomnia and circadian rhythm disorders can all make waking hard. Signs include loud snoring, long sleep that doesn't refresh you, and strong daytime sleepiness.",
  },
  {
    q: "How loud should an alarm be for a heavy sleeper?",
    a: "Loud enough that you hear it from bed, but loudness alone rarely fixes the problem. Placement across the room, a sound you don't hear all day, and a task you must complete before it stops usually matter more.",
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Answer>
        <strong>Most people sleep through their alarm because they are short on sleep, not because the alarm is too quiet.</strong>{" "}
        Other common causes are an alarm that lands in deep sleep, an irregular schedule, and a brain that has learned to
        dismiss the sound on autopilot. Less often, a sleep disorder is the reason, and that needs a doctor.
      </Answer>

      <KeyTakeaways
        items={[
          "Sleep debt is the most common cause. Under 7 hours a night, your body fights harder to stay asleep.",
          "Deep sleep makes you hard to wake, and short nights make it more likely your alarm cuts into it.",
          "Waking at very different times on weekdays and weekends leaves your body clock thinking it's still night.",
          "Many 'slept through it' mornings are actually 'switched it off and forgot'. That's sleep inertia, not deafness.",
          "If you sleep enough and still can't wake, snore loudly, or are sleepy all day, see a doctor.",
        ]}
      />

      <H2>Why do I sleep through my alarm?</H2>
      <p>
        The most frustrating version of this problem isn&apos;t &ldquo;my alarm was too quiet&rdquo;. It&apos;s &ldquo;I
        have no idea what happened&rdquo;. The alarm rang, the phone shows it was dismissed, and you have no memory of
        it. That points to the two halves of this problem: either your brain didn&apos;t register the
        alarm, or it registered it and handled it without you.
      </p>
      <p>
        Both have causes you can check. Below are the six that come up most, roughly in order of how often they&apos;re the
        real culprit, followed by a table to match your situation to a fix.
      </p>

      <H2>Are you just not getting enough sleep?</H2>
      <p>
        This is the boring answer and the most likely one. Adults need at least 7 hours of sleep a night on a regular
        basis (<a href={SRC.watson2015.href}>Watson et al., 2015</a>). Below that, sleep pressure builds up, and your body
        prioritises staying asleep. Sleep loss also makes the groggy period after waking stronger: chronic sleep
        restriction produced roughly a 10% worse performance immediately on waking in studies summarised by a 2019 review (
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>).
      </p>
      <p>
        A quick self-test: on a free week with no alarm, how long do you sleep? If you naturally sleep 8.5 hours and give
        yourself 6 on weekdays, no alarm setup will make those mornings easy. Use our{" "}
        <Link href="/sleep-calculator">sleep calculator</Link> to work out a bedtime that actually fits your wake time.
      </p>

      <H2>Is your alarm going off during deep sleep?</H2>
      <p>
        During stage 3 non-REM sleep, the deepest stage, your heartbeat and breathing slow to their lowest levels and it
        may be difficult to wake you. Deep sleep happens in longer periods during the first half of the night, and full
        sleep cycles repeat through the night (<a href={SRC.nindsSleep.href}>NIH NINDS</a>).
      </p>
      <p>
        That has a practical consequence. If you go to bed at 2 AM and your alarm is at 7, your alarm is ringing into
        what is, for your brain, the first half of the night. Short nights don&apos;t just leave you tired; they push your
        alarm into the stage where you&apos;re hardest to wake. Waking from deep sleep has also been linked to stronger
        grogginess in older research, although newer studies are mixed on how big that effect is (
        <a href={SRC.tassi2000.href}>Tassi &amp; Muzet, 2000</a>;{" "}
        <a href={EXTRA.hilditch2019.href}>Hilditch &amp; McHill, 2019</a>).
      </p>

      <H2>Does an irregular sleep schedule make alarms harder to hear?</H2>
      <p>
        It makes them harder to act on. Sleep inertia is most intense when you wake during your biological night, near
        the low point of your core body temperature (<a href={EXTRA.trotti2017.href}>Trotti, 2017</a>). If you sleep until
        10 on weekends and set a 6:30 alarm on Monday, your body clock is still on weekend time. Researchers call that gap
        social jetlag, and late chronotypes, the natural night owls, tend to have the biggest gaps and the biggest sleep
        debt on workdays (<a href={SRC.wittmann2006.href}>Wittmann et al., 2006</a>).
      </p>
      <p>
        Regularity seems to matter on its own, too. In a large cohort study, how regular people&apos;s sleep was predicted
        mortality risk better than how long they slept (<a href={SRC.windred2023.href}>Windred et al., 2023</a>). That
        doesn&apos;t prove irregular sleep makes you miss alarms, but it&apos;s one more reason to anchor your wake time.
      </p>

      <H2>Have you trained yourself to ignore your alarm?</H2>
      <p>
        This one isn&apos;t backed by a specific study so much as by how habits work. If your alarm
        is the same tone you hear all day for texts and timers, or if you&apos;ve snoozed it hundreds of times, your brain
        has learned that this sound is safe to dismiss. Every time you switch it off and fall back asleep, you rehearse
        exactly that sequence.
      </p>
      <p>
        Add sleep inertia, the groggy state right after waking where memory and judgment are impaired, and you get the
        classic &ldquo;I don&apos;t remember turning it off&rdquo; morning. A brain in that state can do a single tap
        without ever properly waking up. I explain this state in detail in{" "}
        <Link href="/blog/sleep-inertia">what sleep inertia is and how long it lasts</Link>.
      </p>
      <p>
        Many alarms make this worse, not better. Ten alarms five minutes apart teach you that the first nine don&apos;t
        count.
      </p>

      <H2>Is your alarm too quiet or in the wrong place?</H2>
      <p>
        Sometimes it really is the setup. On iPhone, Apple&apos;s checklist for an alarm that doesn&apos;t sound or only
        vibrates includes three things: the volume is low (set it under Settings, Sounds &amp; Haptics, Ringtone and Alerts), the alarm&apos;s
        sound is set to None, or headphones are connected, in which case the alarm plays through the iPhone speaker and the
        headphones (<a href={EXTRA.appleAlarms.href}>Apple Support</a>). I cover the full checklist in{" "}
        <Link href="/blog/does-iphone-alarm-ring-on-silent">does your iPhone alarm ring on Silent</Link>.
      </p>
      <p>
        Placement matters just as much. A phone under your pillow or on the bedside table can be silenced without opening
        your eyes. A phone across the room makes you stand up. Sound choice matters a little: in a 2020 study of reported
        waking sounds, people associated melodic alarms with less grogginess than harsh beeps (
        <a href={SRC.mcfarlane2020.href}>McFarlane et al., 2020</a>).
      </p>

      <H2>Could a sleep disorder be the reason?</H2>
      <p>
        For a minority of people, yes. These are the ones worth knowing about (<a href={SRC.aasmDisorders.href}>AASM</a>):
      </p>
      <ul>
        <li>
          <strong>Obstructive sleep apnea.</strong> The airway becomes blocked repeatedly during sleep, so breathing
          pauses and you may briefly wake, sometimes hundreds of times a night. Loud snoring, choking or gasping sounds,
          unrefreshing sleep, morning headaches and daytime sleepiness are common signs (
          <a href={EXTRA.aasmApnea.href}>AASM</a>).
        </li>
        <li>
          <strong>Idiopathic hypersomnia and narcolepsy.</strong> Hypersomnolence disorders, marked by excessive
          sleepiness. A strong, prolonged confusion on waking, called sleep drunkenness, is common in these conditions,
          especially in idiopathic hypersomnia (<a href={EXTRA.trotti2017.href}>Trotti, 2017</a>).
        </li>
        <li>
          <strong>Delayed sleep phase.</strong> A body clock running much later than your schedule, so you can&apos;t fall
          asleep until very late and can&apos;t wake in the morning. It typically starts in the teenage years, when sleep
          timing naturally shifts later (<a href={EXTRA.crowley2007.href}>Crowley et al., 2007</a>).
        </li>
        <li>
          <strong>Mood disorders.</strong> Difficulty waking is reported disproportionately often by people with mood
          disorders (<a href={EXTRA.trotti2017.href}>Trotti, 2017</a>).
        </li>
      </ul>
      <p>
        If you take a medication that makes you drowsy, ask your doctor whether it could be a factor. If you suspect any
        of these conditions, an alarm is not the fix.
      </p>

      <H2>If this sounds like you, try this</H2>
      <table>
        <thead>
          <tr>
            <th>If this sounds like you</th>
            <th>Likely cause</th>
            <th>Try this</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You sleep under 7 hours on weeknights and long on weekends</td>
            <td>Sleep debt</td>
            <td>Move bedtime earlier by 15 minutes a week until you get 7+ hours</td>
          </tr>
          <tr>
            <td>You went to bed late and the alarm felt impossible</td>
            <td>Alarm landing in deep sleep</td>
            <td>Pick a bedtime with the sleep calculator; avoid very short nights before important mornings</td>
          </tr>
          <tr>
            <td>Weekday and weekend wake times differ by 2+ hours</td>
            <td>Social jetlag</td>
            <td>Keep weekend wake time within about an hour of weekdays</td>
          </tr>
          <tr>
            <td>The phone says the alarm was dismissed but you don&apos;t remember</td>
            <td>Autopilot dismissal during sleep inertia</td>
            <td>Phone across the room, plus an alarm that needs a task to stop</td>
          </tr>
          <tr>
            <td>You set 5 to 10 alarms and still miss them</td>
            <td>Habituation to the sound</td>
            <td>One alarm, a new sound, and a reason to stand up</td>
          </tr>
          <tr>
            <td>The alarm only vibrated or was very quiet</td>
            <td>Settings (volume, sound set to None, headphones)</td>
            <td>Run the iPhone alarm checklist and set a test alarm</td>
          </tr>
          <tr>
            <td>You sleep 8 to 10 hours and still can&apos;t wake, or snore loudly</td>
            <td>Possible sleep disorder</td>
            <td>See a doctor or sleep specialist</td>
          </tr>
        </tbody>
      </table>

      <H2>How do I stop sleeping through my alarm?</H2>
      <H3>Fix the cause first</H3>
      <p>
        Get your sleep to 7 hours or more and keep your wake time steady seven days a week. It&apos;s unglamorous, but
        it&apos;s the change with the strongest evidence behind it. If your target is an early start, shift it gradually,
        as described in our plan for <Link href="/blog/how-to-wake-up-at-5am">waking up at 5 AM</Link>.
      </p>
      <H3>Then make the alarm impossible to dismiss on autopilot</H3>
      <p>
        Put the phone where you have to stand to reach it, use a sound you don&apos;t hear during the day, and make
        stopping it require something a sleeping brain can&apos;t do. That&apos;s why I built{" "}
        <Link href="/">Rise Mission</Link>: the alarm only stops after a wake-up challenge, such as walking a set number of
        steps, scanning a QR code you&apos;ve placed in another room, or solving math problems. {FACTS.ringsOnSilent}
      </p>
      <Callout title="Test it before you trust it">
        Whatever alarm you use, run a test the night you set it up. In Rise Mission, {FACTS.testAlarm.charAt(0).toLowerCase() + FACTS.testAlarm.slice(1)}
      </Callout>
      <p>
        For a full step-by-step setup, see{" "}
        <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">how to wake up as a heavy sleeper</Link>.
      </p>

      <H2>When should you see a doctor?</H2>
      <Limits>
        <p>
          See a doctor or sleep specialist if any of these apply: you regularly sleep 7 to 9 hours (or more) and still
          can&apos;t wake; you feel very sleepy during the day or doze off while reading, in meetings or driving; someone
          has noticed loud snoring, gasping or pauses in your breathing; you wake confused for a long time most mornings;
          or your sleep problems started with a new medication or low mood. These can be signs of conditions that are
          diagnosable and treatable (<a href={SRC.aasmDisorders.href}>AASM</a>). Nothing in this article is a diagnosis,
          the table above is a starting point rather than a test, and no alarm app treats a sleep disorder.
        </p>
      </Limits>

      <Sources
        items={[
          SRC.watson2015,
          EXTRA.hilditch2019,
          SRC.nindsSleep,
          SRC.tassi2000,
          EXTRA.trotti2017,
          SRC.wittmann2006,
          SRC.windred2023,
          EXTRA.appleAlarms,
          SRC.mcfarlane2020,
          EXTRA.aasmApnea,
          EXTRA.crowley2007,
          SRC.aasmDisorders,
        ]}
      />
    </BlogLayout>
  );
}
