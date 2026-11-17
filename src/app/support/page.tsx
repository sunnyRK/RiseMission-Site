import Link from "next/link";
import { DocPage } from "@/components/site/doc-page";
import { staticPageMetadata } from "@/lib/seo";
import { BEDTIME_NUDGE, CHALLENGES, CONTACT_EMAIL, FACTS, RISE_CHALLENGE, SOUNDS, XP_RULES } from "@/lib/site";

export const metadata = staticPageMetadata("/support");

export default function Support() {
  return (
    <DocPage answer icon="3d-shield" title="Rise Mission Support" path="/support">
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
        Yes. Hold the emergency dismiss for five seconds and confirm. It stops the alarm and breaks your streak unless a
        Streak Shield absorbs it. iOS also always shows a system Stop button.
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
      <h3>How do I earn XP and level up?</h3>
      <p>
        Finish a real wake-up challenge: that day earns {XP_RULES.base} XP, plus {XP_RULES.onTimeBonus} with no snooze
        within {XP_RULES.onTimeMinutes} minutes, plus {XP_RULES.routineBonus} when you complete the morning routine, times
        your streak multiplier. Only one award per day, and test alarms never count. See{" "}
        <Link href="/whats-new">what&apos;s new in 1.6</Link> for the ranks.
      </p>
      <h3>My {RISE_CHALLENGE.name} ended. Can I restart it?</h3>
      <p>
        Yes. You need {RISE_CHALLENGE.goal} wake-ups within {RISE_CHALLENGE.windowDays} days. If the window passes, Home
        offers Try again.
      </p>
      <h3>Why doesn&apos;t my bedtime nudge arrive?</h3>
      <p>
        Turn it on in Settings and allow notifications. It only fires on nights before a morning alarm (one before noon),{" "}
        {BEDTIME_NUDGE.leadMinutes} minutes before the bedtime worked out from your sleep goal. A skipped alarm means no
        nudge that night.
      </p>
      <h3>Why does the Lock Screen alarm use a different sound?</h3>
      <p>{SOUNDS.caveat} Pick your sound in the alarm editor and preview it there.</p>
      <h3>What is a Streak Shield?</h3>
      <p>{FACTS.streakShields}</p>
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
