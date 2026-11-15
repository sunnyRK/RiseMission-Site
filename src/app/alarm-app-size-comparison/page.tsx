import Link from "next/link";
import { AppSizeTable, sizeRatio } from "@/components/compare/app-table";
import { Answer, H2, Limits } from "@/components/blog/prose";
import { AppStoreButton } from "@/components/site/app-store-button";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPETITORS, SNAPSHOT_DATE, SNAPSHOT_SOURCE, getCompetitor } from "@/lib/competitors";
import { breadcrumbLd, faqPageLd, pageMetadata, type QA } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Alarm App Size Comparison (2026)",
  description: "How big are iPhone alarm apps? App Store sizes and ratings for 12 alarm apps, from 20 MB to 348 MB, with methodology and an open dataset.",
  path: "/alarm-app-size-comparison",
});

const rm = getCompetitor("rise-mission")!;
const missionApps = COMPETITORS.filter((c) => c.missions.length > 0 && c.slug !== "rise-mission");
const sortedBySize = [...COMPETITORS].sort((a, b) => a.sizeMB - b.sizeMB);
const largest = sortedBySize.at(-1)!;
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const others = COMPETITORS.filter((c) => c.slug !== "rise-mission");
const othersMedian = median(others.map((c) => c.sizeMB));
const over100 = others.filter((c) => c.sizeMB > 100).length;
const dateLabel = new Date(`${SNAPSHOT_DATE}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const FAQ: QA[] = [
  {
    q: "How big is a typical iPhone alarm app?",
    a: `In our ${dateLabel} snapshot of 12 popular alarm apps, the median size of the 11 third-party apps other than Rise Mission was ${othersMedian.toFixed(1)} MB. The range ran from ${sortedBySize[0].sizeMB.toFixed(1)} MB (${sortedBySize[0].shortName}) to ${largest.sizeMB.toFixed(1)} MB (${largest.shortName}).`,
  },
  {
    q: "Why are some alarm apps over 200 MB?",
    a: "App Store listings don't say, but common reasons include bundled sound libraries, video and animation, sleep-sound content, and third-party SDKs. Size alone doesn't make an app better or worse; it affects download time, storage and update size.",
  },
  {
    q: "Is the App Store size the same as the download size?",
    a: "Not exactly. Apple reports the universal binary size. With App Thinning, the download on a specific iPhone is often smaller. The numbers are still the fairest like-for-like comparison available publicly.",
  },
  {
    q: "Can I use this data?",
    a: "Yes. The dataset is CC BY 4.0: use it with a link to this page. The JSON version is at /data/alarm-apps.json.",
  },
];

export default function SizeComparisonPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "iPhone alarm app sizes and ratings",
            description: `App Store size, rating, rating count and minimum iOS version for ${COMPETITORS.length} iPhone alarm apps, captured ${dateLabel}.`,
            url: `${SITE_URL}/alarm-app-size-comparison`,
            license: "https://creativecommons.org/licenses/by/4.0/",
            creator: { "@type": "Organization", name: "Rise Mission", url: SITE_URL },
            dateModified: SNAPSHOT_DATE,
            temporalCoverage: SNAPSHOT_DATE,
            isAccessibleForFree: true,
            distribution: [{ "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE_URL}/data/alarm-apps.json` }],
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Alarm app size comparison", path: "/alarm-app-size-comparison" },
          ]),
          faqPageLd(FAQ),
        ]}
      />
      <section className="sunrise-glow dawn">
        <div className="container-rm pb-10 pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="t-eyebrow">Data · Updated <time dateTime={SNAPSHOT_DATE}>{dateLabel}</time>
            </p>
            <h1 className="t-h1 mt-3">How big are iPhone alarm apps?</h1>
            <p className="t-lead mt-4">
              App Store sizes and ratings for {COMPETITORS.length} popular alarm apps, side by side. Rise Mission, the app we
              make, is included and labelled.
            </p>
          </div>
        </div>
      </section>

      <div className="container-rm">
        <div className="prose-rm mx-auto max-w-3xl">
          <Answer>
            <strong>
              {over100} of the {others.length} other popular iPhone alarm apps we checked are over 100 MB.
            </strong>{" "}
            In our {dateLabel} App Store snapshot, the median of the other 11 apps was {othersMedian.toFixed(1)} MB and the largest was{" "}
            {largest.shortName} at {largest.sizeMB.toFixed(1)} MB. Rise Mission is {rm.sizeMB.toFixed(1)} MB, roughly{" "}
            {Math.round(sizeRatio(getCompetitor("erly")!))} to {Math.round(sizeRatio(largest))} times smaller than the big mission
            alarm apps.
          </Answer>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <AppSizeTable />
        </div>

        <div className="prose-rm mx-auto mt-12 max-w-3xl">
          <H2>Key numbers</H2>
          <ul>
            <li>
              <strong>{COMPETITORS.length} apps</strong> compared, all free to download on the US App Store on {dateLabel}.
            </li>
            <li>
              Median size of the {COMPETITORS.length - 1} other apps: <strong>{othersMedian.toFixed(1)} MB</strong>.
            </li>
            <li>
              Mission alarm apps (ones whose listing names wake-up challenges) other than Rise Mission:{" "}
              {missionApps.map((c) => `${c.shortName} ${c.sizeMB.toFixed(0)} MB`).join(", ")}.
            </li>
            <li>
              Most-rated app in the set: <strong>Alarmy</strong>, {getCompetitor("alarmy")!.ratingCount.toLocaleString("en-US")} US ratings
              at {getCompetitor("alarmy")!.rating!.toFixed(2)}.
            </li>
            <li>
              Rise Mission: <strong>{rm.sizeMB.toFixed(1)} MB</strong>, 10 wake-up challenges, no ratings in this US snapshot yet, and
              it requires iOS 26 (Apple&apos;s AlarmKit), so it won&apos;t run on older iPhones that the others support.
            </li>
          </ul>

          <H2>Why app size matters for an alarm app</H2>
          <p>
            Size isn&apos;t a quality score. A bigger app can have more sound libraries, sleep content or animation. But for an
            app you install once and open for a few seconds each morning, size has practical costs: longer downloads on mobile
            data, more storage on a full phone, and bigger updates. If your iPhone regularly shows &quot;Storage almost
            full&quot;, a lighter alarm app is a real advantage.
          </p>
          <p>
            We built Rise Mission to stay small on purpose: the wake-up challenges use Apple&apos;s on-device frameworks (Vision
            for push-ups and squats, Speech for voice), and the interface is drawn in code rather than shipped as video. See the{" "}
            <Link href="/#challenges">full list of challenges</Link>, or read our{" "}
            <Link href="/blog/best-alarm-apps-for-heavy-sleepers">guide to the best alarm apps for heavy sleepers</Link>, which
            covers what each of these apps is actually good at.
          </p>

          <H2>Methodology</H2>
          <ul>
            <li>Source: {SNAPSHOT_SOURCE}</li>
            <li>Size is Apple&apos;s reported file size (bytes ÷ 1,000,000, one decimal). It is the universal binary, not the thinned download for one specific iPhone.</li>
            <li>Ratings and counts are the US App Store figures on the snapshot date. They change daily.</li>
            <li>Missions are only those named in each app&apos;s own App Store description; apps may offer more.</li>
            <li>We make Rise Mission. We included it, labelled it, and listed its weaknesses alongside the others.</li>
          </ul>

          <H2>Use this data</H2>
          <p>
            The dataset is free to use under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Download the{" "}
            <a href="/data/alarm-apps.json">JSON version</a>. Suggested citation:
          </p>
          <blockquote className="rounded-xl border border-line bg-card p-4 text-[0.95rem]">
            Rise Mission. &quot;How big are iPhone alarm apps?&quot; risemission.app/alarm-app-size-comparison, data as of {dateLabel}.
          </blockquote>

          <Limits>
            <p>
              This is a snapshot of one storefront on one day. Sizes change with every update, and some apps download smaller on
              your device. Ratings measure satisfaction among people who left one, not how well an app wakes up a heavy sleeper.
              Try an app for a week before deciding.
            </p>
          </Limits>
        </div>
      </div>

      <Faq items={FAQ} />

      <section className="container-rm">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-card p-8 text-center shadow-soft">
          <p className="t-h2 !text-2xl">A {rm.sizeMB.toFixed(0)} MB alarm that makes you prove you&apos;re awake</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">Ten wake-up challenges, built on AlarmKit, processed on your iPhone.</p>
          <div className="mt-6 flex justify-center">
            <AppStoreButton placement="size-comparison" />
          </div>
        </div>
      </section>
    </>
  );
}
