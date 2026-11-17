import Link from "next/link";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Answer, Callout, H2, KeyTakeaways, Limits, Sources } from "@/components/blog/prose";
import { AppEntry } from "@/components/compare/app-table";
import { getPost } from "@/lib/blog";
import { getCompetitor, SNAPSHOT_DATE } from "@/lib/competitors";
import { pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS } from "@/lib/site";
import { SRC } from "@/lib/sources";

const post = getPost("rise-mission-vs-alarmy");

export const metadata = pageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.metaDescription ?? post.description,
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated,
});

const rm = getCompetitor("rise-mission")!;
const al = getCompetitor("alarmy")!;
const asOf = new Date(`${SNAPSHOT_DATE}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const ratio = Math.round(al.sizeMB / rm.sizeMB);

const FAQ: QA[] = [
  {
    q: "Is Rise Mission better than Alarmy?",
    a: "It depends on what you need. Alarmy has a much longer track record, sleep tracking and sleep sounds. Rise Mission is about twelve times smaller, counts push-ups and squats with the camera on-device, and includes QR, walk, voice, typing and memory challenges. Rise Mission needs iOS 26; Alarmy supports iOS 17.",
  },
  {
    q: "Does Alarmy have a push-up mission?",
    a: `Alarmy's App Store listing (${asOf}) names math, memory games, shaking, squats and a photo mission. It does not mention push-ups. Rise Mission's listing includes camera-counted push-ups.`,
  },
  {
    q: "Which is smaller, Rise Mission or Alarmy?",
    a: `On the US App Store on ${asOf}, Rise Mission was ${rm.sizeMB.toFixed(1)} MB and Alarmy was ${al.sizeMB.toFixed(1)} MB, roughly ${ratio} times larger.`,
  },
  {
    q: "Do both apps require a subscription?",
    a: "Both are free to download. Alarmy's listing mentions premium features. Rise Mission Pro unlocks the app after onboarding, as a subscription or a one-time Lifetime purchase.",
  },
];

const ROWS: [string, string, string][] = [
  ["App Store size", `${rm.sizeMB.toFixed(1)} MB`, `${al.sizeMB.toFixed(1)} MB`],
  ["US ratings", "None yet", `${al.rating!.toFixed(2)} from ${al.ratingCount.toLocaleString("en-US")}`],
  ["Minimum iOS", "iOS 26", `iOS ${al.minIOS.replace(/\.0$/, "")}`],
  ["Missions named in listing", rm.missions.join(", "), al.missions.join(", ")],
  ["Exercise missions", "Push-ups and squats, counted by the camera on-device", "Squats named in listing (counting method not stated)"],
  ["Sleep tracking", "No", "Yes (snore + sleep tracker)"],
  ["Sleep sounds", "No", "Yes (ASMR, rain, white noise)"],
  ["Multiple missions per alarm", "Primary challenge + backup", "Yes (added in a recent update)"],
  ["System alarm framework", "Apple AlarmKit", "Not stated"],
  ["Paid tier", "Pro unlocks the app: subscription or Lifetime", "Free core features, paid premium tier"],
];

export default function Page() {
  return (
    <BlogLayout post={post} faq={FAQ}>
      <Callout title="Disclosure" tone="accent">
        I build Rise Mission. Every Alarmy fact here comes from Alarmy&apos;s own App Store listing on {asOf}, and I&apos;ve
        listed where Alarmy is the better choice.
      </Callout>

      <Answer>
        <strong>Choose Alarmy if you want the most proven mission alarm plus sleep tracking; choose Rise Mission if you want a
        lighter app with camera-counted push-ups and squats.</strong> Alarmy has {al.ratingCount.toLocaleString("en-US")} US
        ratings and sleep features. Rise Mission is {rm.sizeMB.toFixed(1)} MB versus {al.sizeMB.toFixed(0)} MB, but it needs iOS 26
        and is new.
      </Answer>

      <KeyTakeaways
        items={[
          `Alarmy's biggest strength is trust: ${al.ratingCount.toLocaleString("en-US")} US ratings at ${al.rating!.toFixed(2)}.`,
          `Rise Mission is roughly ${ratio}× smaller (${rm.sizeMB.toFixed(1)} MB vs ${al.sizeMB.toFixed(1)} MB).`,
          "Alarmy covers sleep (snore detection, tracker, sounds). Rise Mission focuses only on getting you up.",
          "Rise Mission requires iOS 26; Alarmy runs on iOS 17 and later.",
        ]}
      />

      <H2>Rise Mission vs Alarmy: side by side</H2>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[560px] text-[0.92rem]">
          <caption className="caption-bottom px-4 py-3 text-left text-[0.8rem] text-muted">
            From each app&apos;s US App Store listing, {asOf}. Rise Mission details also from our own product documentation.
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-ink">
              <th className="px-4 py-3 font-semibold"> </th>
              <th className="px-4 py-3 font-semibold">Rise Mission</th>
              <th className="px-4 py-3 font-semibold">Alarmy</th>
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

      <H2>Where Alarmy is the better choice</H2>
      <ul>
        <li>
          <strong>You want proof it works for lots of people.</strong> Hundreds of thousands of ratings is a track record no
          new app can match.
        </li>
        <li>
          <strong>You want your sleep tracked too.</strong> Alarmy&apos;s listing includes a snore and sleep tracker and sleep
          sounds. Rise Mission doesn&apos;t track sleep at all.
        </li>
        <li>
          <strong>Your iPhone can&apos;t run iOS 26.</strong> Alarmy supports iOS 17 and later.
        </li>
        <li>
          <strong>You want a photo mission.</strong> Alarmy lets you photograph a registered spot to stop the alarm.
        </li>
      </ul>

      <H2>Where Rise Mission is the better choice</H2>
      <ul>
        <li>
          <strong>You&apos;re short on storage.</strong> {rm.sizeMB.toFixed(1)} MB versus {al.sizeMB.toFixed(1)} MB. See the{" "}
          <Link href="/alarm-app-size-comparison">full size comparison</Link>.
        </li>
        <li>
          <strong>You want push-ups as your wake-up.</strong> The camera counts full reps on-device. Read{" "}
          <Link href="/blog/push-up-alarm-clock">how a push-up alarm works</Link>.
        </li>
        <li>
          <strong>You want camera-counted exercise or voice.</strong> Rise Mission counts push-ups and squats with the camera
          and has a spoken-affirmation challenge. Variety alone isn&apos;t a win: Alarmy&apos;s website lists more missions than
          its App Store listing, including QR or barcode, steps and typing. Rise Mission has {CHALLENGES.length} in total:{" "}
          {CHALLENGES.map((x) => x.name).join(", ")}.
        </li>
        <li>
          <strong>You care where camera frames go.</strong> {FACTS.onDevice}
        </li>
        <li>
          <strong>You want a one-time purchase option.</strong> Rise Mission Pro is also sold as a lifetime unlock.
        </li>
      </ul>

      <H2>The apps</H2>
      <div className="grid gap-3">
        <AppEntry slug="rise-mission" />
        <AppEntry slug="alarmy" />
      </div>

      <H2>What matters more than the app</H2>
      <p>
        Either app works far better with the basics in place: one alarm instead of ten, the phone out of arm&apos;s reach, and
        enough sleep. Adults need at least 7 hours on a regular basis (<a href={SRC.watson2015.href}>AASM/SRS, 2015</a>); use the{" "}
        <Link href="/sleep-calculator">sleep calculator</Link> to plan your bedtime. Still deciding? Our roundup of the{" "}
        <Link href="/blog/best-alarm-apps-for-heavy-sleepers">best alarm apps for heavy sleepers</Link> covers eight more, and{" "}
        <Link href="/blog/rise-mission-vs-erly">Rise Mission vs Erly</Link> compares the other big name.
      </p>

      <Limits>
        <p>
          Alarmy may offer features its listing doesn&apos;t mention, and both apps update often. We compared listings, not
          paid tiers in depth. Ratings measure satisfaction among reviewers, not how well an app wakes heavy sleepers. Try one
          for a week before deciding.
        </p>
      </Limits>

      <Sources
        items={[
          { label: "Rise Mission on the App Store", href: rm.appStoreUrl, note: `listing as of ${asOf}` },
          { label: "Alarmy on the App Store", href: al.appStoreUrl, note: `listing as of ${asOf}` },
          SRC.watson2015,
        ]}
      />
    </BlogLayout>
  );
}
