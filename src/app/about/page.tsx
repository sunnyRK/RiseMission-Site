import Link from "next/link";
import { DocPage } from "@/components/site/doc-page";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationLd, pageMetadata, personLd } from "@/lib/seo";
import { AUTHOR, CONTACT_EMAIL, LIVE_VERSION } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Rise Mission",
  description: "Rise Mission is an independent iPhone alarm app built by Sunny Radadiya for heavy sleepers. Who builds it, why, and how we write our guides.",
  path: "/about",
});

export default function About() {
  return (
    <DocPage icon="3d-heart" title="About Rise Mission" path="/about">
      <JsonLd data={[personLd(), organizationLd()]} />
      <p>
        Rise Mission is an independent iPhone app, now on version {LIVE_VERSION}. It exists for one reason: a normal alarm
        is far too easy to switch off while you&apos;re still asleep. Rise Mission puts a wake-up challenge between you and
        the off switch, so you have to be awake to finish it.
      </p>

      <h2 id="who-builds-this">Who builds it</h2>
      <p>
        I&apos;m <strong>{AUTHOR.name}</strong>, the founder and only developer. I design, build and support the app
        myself, and I write the guides on this site. The app is built natively in Swift on Apple&apos;s AlarmKit, Vision
        and Speech frameworks, which is why the camera and voice challenges run entirely on your iPhone.
      </p>

      <h2>How we write our guides</h2>
      <ul>
        <li>Every health or sleep claim links to its source, usually a peer-reviewed study or a medical body such as the AASM or NIH.</li>
        <li>We say what the research doesn&apos;t show, not only what supports our app.</li>
        <li>Every guide ends with where its advice stops and when to talk to a doctor. We are not doctors, and an alarm app is not medical treatment.</li>
        <li>When we mention Rise Mission, we describe only features that exist in the current App Store version.</li>
        <li>Dates are real: &quot;Updated&quot; appears only when the content actually changed.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions, corrections or press: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. For help with the app,
        see <Link href="/support">support</Link>.
      </p>
    </DocPage>
  );
}
