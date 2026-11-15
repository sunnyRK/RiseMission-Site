import Link from "next/link";
import { DocPage } from "@/components/site/doc-page";
import { pageMetadata } from "@/lib/seo";
import { CHALLENGES, CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Help & Support: Alarms and Challenges",
  description: "Get help with Rise Mission: setting up alarms and challenges, push-up counting tips, Silent mode, emergency dismiss, and how to contact us.",
  path: "/support",
});

export default function Support() {
  return (
    <DocPage title="Rise Mission Support" path="/support">
      <h2>Getting started</h2>
      <p>
        Create an alarm with the + button, pick a challenge ({CHALLENGES.map((c) => c.name).join(", ")}) and a backup,
        then allow alarm access. Use <strong>Test alarm</strong> and lock your iPhone: the alarm rings in about ten
        seconds so you can try the whole flow safely.
      </p>

      <h2>Push-up counting tips</h2>
      <ul>
        <li>Lean the phone against a wall or object at floor level, to your left, right, or ahead of you. Portrait or landscape both work.</li>
        <li>The camera needs to see one shoulder, elbow and wrist. A side-on view counts most reliably. Legs don&apos;t need to fit in frame.</li>
        <li>Too dark, or the camera can&apos;t see you? The app offers your backup challenge; completing it keeps your streak safe.</li>
      </ul>

      <h2>Common questions</h2>
      <h3>Will the alarm ring if my phone is locked or the app is closed?</h3>
      <p>
        Yes. Rise Mission uses Apple&apos;s system alarms, which ring on the Lock Screen, in Silent mode, and in Focus. A
        powered-off iPhone cannot ring (no alarm app can do that).
      </p>
      <h3>Can I stop an alarm without the challenge?</h3>
      <p>
        Yes. Hold the emergency dismiss for five seconds and confirm. It stops the alarm and resets your streak. iOS also
        always shows a system Stop button.
      </p>
      <h3>Why don&apos;t test alarms appear in History?</h3>
      <p>Tests are practice runs. They never affect your history, statistics, or streak.</p>
      <h3>Is my camera footage stored anywhere?</h3>
      <p>
        No. Frames are processed on your iPhone and immediately discarded, never recorded, saved, or uploaded. See the{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
      <h3>How does the Voice challenge work?</h3>
      <p>
        Say the on-screen affirmation out loud; your iPhone recognizes it on-device. The audio is never recorded, saved, or
        uploaded. It needs microphone access, and there&apos;s always a streak-safe backup if you can&apos;t speak.
      </p>
      <h3>How do I restore or manage my purchase?</h3>
      <p>
        Use Restore Purchases in the app&apos;s settings. To change or cancel a subscription, open Settings on your
        iPhone, tap your name, then Subscriptions.
      </p>

      <h2>Contact</h2>
      <p>
        Found a bug or need help? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Replies usually within a
        couple of days.
      </p>
    </DocPage>
  );
}
