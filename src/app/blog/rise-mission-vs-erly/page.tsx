import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { AppEntry } from "@/components/compare/app-table";
import { getPost } from "@/lib/blog";
import { getCompetitor, SNAPSHOT_DATE } from "@/lib/competitors";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("rise-mission-vs-erly");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

const rm = getCompetitor("rise-mission")!;
const er = getCompetitor("erly")!;
const asOf = new Date(`${SNAPSHOT_DATE}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const ratio = Math.round(er.sizeMB / rm.sizeMB);

const FAQ: QA[] = [
  {
    q: "Is Rise Mission an Erly alternative?",
    a: "Yes. Both are mission alarms that won't stop until you complete a task. Erly focuses on streaks, a locked wake-up goal and (per its website) bedtime app limits. Rise Mission focuses on ten on-device challenges in a much smaller app.",
  },
  {
    q: "What missions does Erly have?",
    a: "Erly's App Store listing doesn't name its missions. Its website (erly.co) lists push-ups, math problems, Bible verses, sky photos, item searches, making your bed, touching grass and affirmations.",
  },
  {
    q: "Which app is smaller?",
    a: `On the US App Store on ${asOf}, Rise Mission was ${rm.sizeMB.toFixed(1)} MB and Erly was ${er.sizeMB.toFixed(1)} MB, roughly ${ratio} times larger.`,
  },
  {
    q: "Do I need to pay for Erly or Rise Mission?",
    a: "Both are free to download and both require a paid plan for full use. Erly's listing says a subscription is required for full access. Rise Mission Pro is required after onboarding and is sold weekly, yearly or as a one-time lifetime purchase.",
  },
];

const ROWS: [string, string, string][] = [
  ["App Store size", `${rm.sizeMB.toFixed(1)} MB`, `${er.sizeMB.toFixed(1)} MB`],
  ["US ratings", "None yet", `${er.rating!.toFixed(2)} from ${er.ratingCount.toLocaleString("en-US")}`],
  ["Minimum iOS", "iOS 26", `iOS ${er.minIOS}`],
  ["Missions", `${CHALLENGES.length}: ${CHALLENGES.map((c) => c.name).join(", ")}`, "Push-ups, math, Bible verses, sky photos, item searches, make your bed, touch grass, affirmations (per erly.co)"],
  ["Streaks", "Yes, with Streak Shields, levels and XP, and a 7-Day Rise Challenge", "Yes (current, best, daily wins)"],
  ["Locked commitment", "No", "Goal locks within 4 hours of wake-up"],
  ["Bedtime app limits", "No", "Yes (per erly.co)"],
  ["Backup if the camera can't see you", "Yes, automatic mental backup", "Not stated"],
  ["System alarm framework", "Apple AlarmKit", "Not stated"],
  ["Paid tier", "Pro required: weekly, yearly or lifetime", "Subscription required for full access"],
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Callout title="Disclosure" tone="accent">
        I build Rise Mission. Erly facts come from Erly&apos;s App Store listing and its website (erly.co), both checked on{" "}
        {asOf}. Erly is a good app; this page is about which fits you.
      </Callout>

      <Answer>
        <strong>Pick Erly if streaks and a locked commitment keep you honest; pick Rise Mission if you want more challenge
        types in a much lighter app.</strong> Erly has {er.ratingCount.toLocaleString("en-US")} US ratings at{" "}
        {er.rating!.toFixed(2)} and bedtime app limits. Rise Mission is {rm.sizeMB.toFixed(1)} MB versus {er.sizeMB.toFixed(0)} MB
        with {CHALLENGES.length} on-device challenges, but needs iOS 26.
      </Answer>

      <KeyTakeaways
        items={[
          "Both are mission alarms with no easy snooze, both track streaks, and both require a paid plan.",
          "Erly's edge: accountability. The goal locks 4 hours before you wake, and its website describes bedtime app limits.",
          `Rise Mission's edge: ${CHALLENGES.length} challenges, a backup when the camera can't see you, and ~${ratio}× smaller size.`,
          "Erly has a strong rating record; Rise Mission has none yet in the US snapshot.",
        ]}
      />

      <H2>Rise Mission vs Erly: side by side</H2>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[560px] text-[0.92rem]">
          <caption className="caption-bottom px-4 py-3 text-left text-[0.8rem] text-muted">
            Sources: each app&apos;s US App Store listing and erly.co, {asOf}. Rise Mission details also from our product
            documentation.
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-ink">
              <th className="px-4 py-3 font-semibold"> </th>
              <th className="px-4 py-3 font-semibold">Rise Mission</th>
              <th className="px-4 py-3 font-semibold">Erly</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([k, a, b]) => (
              <tr key={k} className="border-b border-line align-top last:border-0">
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink">{k}</th>
                <td className="px-4 py-3 text-ink-2">{a}</td>
                <td className="px-4 py-3 text-ink-2">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Where Erly is the better choice</H2>
      <ul>
        <li>
          <strong>Commitment devices work on you.</strong> Erly locks your wake-up goal once you&apos;re within 4 hours of it,
          so you can&apos;t quietly move it at midnight.
        </li>
        <li>
          <strong>You lose the evening to your phone.</strong> Erly&apos;s website describes bedtime app limits that lock
          distracting apps before bed. Rise Mission doesn&apos;t do this.
        </li>
        <li>
          <strong>You want a proven app.</strong> {er.ratingCount.toLocaleString("en-US")} ratings at {er.rating!.toFixed(2)}.
        </li>
        <li>
          <strong>Your iPhone is on iOS 17 or 18.</strong> Erly supports iOS {er.minIOS}+.
        </li>
      </ul>

      <H2>Where Rise Mission is the better choice</H2>
      <ul>
        <li>
          <strong>You want variety.</strong> Walk, shake, QR code in another room, typing and memory on top of push-ups, squats,
          object find, voice and math. See <Link href="/blog/wake-up-challenges-explained">every wake-up challenge explained</Link>.
        </li>
        <li>
          <strong>You want a safety net.</strong> {FACTS.backupChallenge} {FACTS.emergencyDismiss}
        </li>
        <li>
          <strong>Storage is tight.</strong> {rm.sizeMB.toFixed(1)} MB versus {er.sizeMB.toFixed(1)} MB (
          <Link href="/alarm-app-size-comparison">full size data</Link>).
        </li>
        <li>
          <strong>You want to pay once.</strong> Rise Mission Pro has a lifetime option.
        </li>
      </ul>

      <H2>The apps</H2>
      <div className="grid gap-3">
        <AppEntry slug="rise-mission" />
        <AppEntry slug="erly" />
      </div>

      <H2>Either way, set yourself up to win</H2>
      <p>
        Streaks and challenges only help if you&apos;re getting enough sleep. Regular sleep timing is strongly linked to better
        health outcomes (<a href={SRC.windred2023.href}>Windred et al., 2023</a>), so pick a wake time you can keep every day
        and work back from it with the <Link href="/sleep-calculator">sleep calculator</Link>. For more options, see the{" "}
        <Link href="/blog/best-alarm-apps-for-heavy-sleepers">best alarm apps for heavy sleepers</Link> and{" "}
        <Link href="/blog/rise-mission-vs-alarmy">Rise Mission vs Alarmy</Link>.
      </p>

      <Limits>
        <p>
          Erly&apos;s App Store listing doesn&apos;t name its missions, so the mission list comes from its website and may change.
          We compared public listings, not paid tiers in depth. Ratings and features change often; check the listings before
          you subscribe.
        </p>
      </Limits>

      <Sources
        items={[
          { label: "Rise Mission on the App Store", href: rm.appStoreUrl, note: `listing as of ${asOf}` },
          { label: "Erly on the App Store", href: er.appStoreUrl, note: `listing as of ${asOf}` },
          { label: "erly.co", href: "https://erly.co/", note: `checked ${asOf}` },
          SRC.windred2023,
        ]}
      />
    </BlogLayout>
  );
}
