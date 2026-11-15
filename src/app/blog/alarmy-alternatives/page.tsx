import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { AppEntry, AppSizeTable } from "@/components/compare/app-table";
import { getPost } from "@/lib/blog";
import { getCompetitor, SNAPSHOT_DATE } from "@/lib/competitors";
import { itemListLd, pageMetadata, type QA } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SRC } from "@/lib/sources";

const post = getPost("alarmy-alternatives");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

const c = (s: string) => getCompetitor(s)!;
const al = c("alarmy");
const asOf = new Date(`${SNAPSHOT_DATE}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const ALTS = ["rise-mission", "erly", "wayk", "superalarm", "one-percent-alarm", "challenges-alarm-clock", "mathe-alarm-clock"];

const FAQ: QA[] = [
  {
    q: "What is the best alternative to Alarmy?",
    a: "It depends on why you're leaving. For a much smaller app with camera-counted push-ups, try Rise Mission. For streaks and accountability, Erly. For routine-style missions, Wayk. For a free math-only alarm, Mathe.",
  },
  {
    q: "Is there a free Alarmy alternative?",
    a: "Mathe's App Store listing says all its features are free; it's math-only. Most other mission alarms are free to download but need a paid plan for full use.",
  },
  {
    q: "Why do people look for Alarmy alternatives?",
    a: `Common reasons are app size (${al.sizeMB.toFixed(0)} MB in our ${asOf} snapshot), wanting different missions such as push-ups or a QR code, or preferring a different paid model. Alarmy itself is highly rated.`,
  },
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <JsonLd data={itemListLd(post.title, ALTS.map((s) => ({ name: c(s).name, url: c(s).appStoreUrl })))} />
      <Callout title="Disclosure" tone="accent">
        I build Rise Mission, which is on this list. All app facts come from each app&apos;s own App Store listing on {asOf}.
      </Callout>

      <Answer>
        <strong>The best Alarmy alternatives are Rise Mission, Erly, Wayk, SuperAlarm and 1% Alarm, depending on what you
        want instead.</strong> Rise Mission is about twelve times smaller with camera-counted push-ups, Erly adds a locked
        commitment, Wayk has routine-style missions, and Mathe is a free, math-only option.
      </Answer>

      <KeyTakeaways
        items={[
          `Alarmy is excellent and hugely popular (${al.ratingCount.toLocaleString("en-US")} US ratings). Switch for a reason, not by default.`,
          "Pick the alternative that fixes your specific complaint: size, missions, price model or motivation style.",
          "Every alternative here keeps the key idea: the alarm stops only after a task.",
        ]}
      />

      <H2>Why people look for an Alarmy alternative</H2>
      <p>
        Alarmy pioneered the &quot;mission&quot; alarm on iPhone and its listing names math, memory games, shaking, squats and a
        photo mission, plus sleep tracking and sleep sounds. People who switch usually want one of four things:
      </p>
      <ul>
        <li>
          <strong>A smaller app.</strong> Alarmy was {al.sizeMB.toFixed(1)} MB on {asOf}.
        </li>
        <li>
          <strong>Different missions</strong>, such as push-ups, a QR code in another room, or walking.
        </li>
        <li>
          <strong>A different payment model</strong>, like a one-time purchase.
        </li>
        <li>
          <strong>A different kind of motivation</strong>, such as streaks and accountability.
        </li>
      </ul>
      <p>
        If you&apos;re unsure missions are right for you at all, start with{" "}
        <Link href="/blog/wake-up-challenges-explained">how wake-up challenges work</Link>.
      </p>

      <H2>7 Alarmy alternatives for iPhone</H2>
      <div className="grid gap-3">
        <AppEntry slug="rise-mission" rank={1}>
          Push-ups and squats counted by the camera on-device, plus walk, shake, object find, QR code, voice, math, typing and
          memory. Built on Apple&apos;s AlarmKit. Requires iOS 26 and Rise Mission Pro (weekly, yearly or lifetime).
        </AppEntry>
        <AppEntry slug="erly" rank={2}>
          Streaks and a wake-up goal that locks within 4 hours of your alarm. A subscription is required for full access.
        </AppEntry>
        <AppEntry slug="wayk" rank={3}>
          Missions like making your bed, a sky photo or reading an affirmation aloud. Wayk Pro is required to set alarms.
        </AppEntry>
        <AppEntry slug="superalarm" rank={4}>
          Barcode, object scan, Face ID and walking missions, a wake-up check, and deletion prevention while ringing.
        </AppEntry>
        <AppEntry slug="one-percent-alarm" rank={5}>
          Movement-only challenges: object hunt, push-ups, squats, brushing your teeth, and challenge chains.
        </AppEntry>
        <AppEntry slug="challenges-alarm-clock" rank={6}>
          Game-style challenges including a maze and Lucky 777, and a strict mode. Its lower average rating is worth noting.
        </AppEntry>
        <AppEntry slug="mathe-alarm-clock" rank={7}>
          A free, math-only alarm with multiple-choice problems and a bedtime reminder.
        </AppEntry>
      </div>
      <p>The numbers are for scanning, not a score: each app is strongest at something different.</p>

      <H2>Size compared with Alarmy</H2>
      <AppSizeTable slugs={["alarmy", ...ALTS]} />
      <p>
        More apps and the methodology are on the <Link href="/alarm-app-size-comparison">alarm app size comparison</Link> page.
      </p>

      <H2>How to choose</H2>
      <table>
        <thead>
          <tr>
            <th>Your reason for leaving Alarmy</th>
            <th>Alternative to try</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>It takes too much storage</td><td>Rise Mission, Challenges Alarm Clock</td></tr>
          <tr><td>I want exercise to wake me up</td><td>Rise Mission, 1% Alarm, Wayk</td></tr>
          <tr><td>I need accountability, not just a task</td><td>Erly</td></tr>
          <tr><td>I want to pay once</td><td>Rise Mission (lifetime option)</td></tr>
          <tr><td>I want something free</td><td>Mathe</td></tr>
        </tbody>
      </table>
      <p>
        Want a head-to-head? Read <Link href="/blog/rise-mission-vs-alarmy">Rise Mission vs Alarmy</Link>, or see the wider{" "}
        <Link href="/blog/best-alarm-apps-for-heavy-sleepers">best alarm apps for heavy sleepers</Link> guide, which also covers
        sleep trackers and loud alarms.
      </p>

      <Limits>
        <p>
          We compared App Store listings on {asOf}. Apps may offer more than their listings say, and features and prices change.
          No alarm app fixes chronic sleep loss: adults need at least 7 hours a night on a regular basis (
          <a href={SRC.watson2015.href}>AASM/SRS, 2015</a>).
        </p>
      </Limits>

      <Sources
        items={[
          { label: "Alarmy on the App Store", href: al.appStoreUrl, note: `listing as of ${asOf}` },
          ...ALTS.map((s) => ({ label: `${c(s).name} on the App Store`, href: c(s).appStoreUrl, note: `listing as of ${asOf}` })),
          SRC.watson2015,
        ]}
      />
    </BlogLayout>
  );
}
