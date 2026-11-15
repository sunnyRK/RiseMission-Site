import Link from "next/link";
import { DocPage } from "@/components/site/doc-page";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy & Data Practices",
  description: "How Rise Mission handles your data: alarms stay on your iPhone, camera frames are processed on-device, and analytics aren't linked to your identity.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <DocPage title="Rise Mission Privacy Policy" path="/privacy" updated="November 15, 2026">
      <h2>The short version</h2>
      <p>
        Everything personal the app knows (your alarms, wake-up history, streaks, and settings) is stored only on your
        iPhone. There are no accounts and no servers of ours that your data could travel to. The app uses Google&apos;s
        Firebase Analytics to collect usage statistics that are not linked to your identity (for example, that the app was installed and opened) so
        we can understand how Rise Mission is used and measure our advertising. This data is not linked to your
        identity, and we never see your alarms, history, or camera.
      </p>

      <h2>Camera</h2>
      <p>
        If you choose a camera-based challenge (push-ups, squats, object find, or QR), Rise Mission uses the camera to
        detect your body position and count repetitions, to recognize an everyday object, or to scan your registered QR
        code. All camera processing happens on your device using Apple&apos;s Vision framework. Camera frames are never
        recorded, saved, or uploaded; they are analyzed in memory and immediately discarded. You can use the app without
        the camera at any time by picking the Math, Typing, or Memory challenge.
      </p>

      <h2>Microphone &amp; voice</h2>
      <p>
        If you choose the Voice challenge, Rise Mission uses the microphone to hear you say the on-screen affirmation,
        using Apple&apos;s Speech Recognition. Recognition runs on your device wherever your iPhone supports it; your
        speech is used only to check the phrase and is never recorded, saved, or uploaded by us. You can use the app
        without the microphone at any time by picking a different challenge.
      </p>

      <h2>Location (Morning Briefing)</h2>
      <p>
        If you turn on the weather in Morning Briefing, Rise Mission asks for your location while the app is in use and
        requests it at approximately one-kilometre accuracy. It is used only to fetch the local forecast from Apple&apos;s
        WeatherKit service. We do not store your location or send it to our own servers. Separately, Firebase Analytics
        derives an approximate region from your IP address, as described under Analytics. Morning Briefing works without
        the weather if you don&apos;t allow location.
      </p>

      <h2>Calendar (Morning Briefing)</h2>
      <p>
        If you turn on calendar events in Morning Briefing, Rise Mission asks for access to your calendars so it can show
        your first event of the day on the wake-up screen. Events are read on your iPhone only; they are never uploaded,
        stored by us, or included in analytics. You can turn this off at any time in iOS Settings.
      </p>

      <h2>Purchases</h2>
      <p>
        Rise Mission Pro is offered as an auto-renewable subscription (weekly or yearly) or a one-time lifetime purchase;
        a legacy one-time purchase also remains valid for customers who bought it previously. Purchases and subscriptions
        are processed by Apple through the App Store; we never see or store your payment details. Subscription status is
        managed on our behalf by RevenueCat, Inc., which processes a random, app-generated purchase identifier to keep
        your Pro access in sync across reinstalls and to measure our advertising. This is not linked to your name, email,
        or Apple Account. See <a href="https://www.revenuecat.com/privacy">RevenueCat&apos;s privacy policy</a> and our{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>

      <h2>What we store on your device</h2>
      <ul>
        <li>Your alarms and their settings</li>
        <li>Your wake-up history and streaks</li>
        <li>Your preferences (default challenge, snooze, haptics)</li>
        <li>Your registered QR code token, if you set one up</li>
      </ul>
      <p>Deleting the app removes this locally stored data from your device.</p>

      <h2>Analytics</h2>
      <p>
        Rise Mission includes Google&apos;s Firebase Analytics SDK, which collects usage data on our behalf. It is not linked
        to your name, email, or Apple Account, and Apple&apos;s App Store privacy label lists it as &quot;Data Not Linked to
        You&quot;:
      </p>
      <ul>
        <li>
          App events such as first open, sessions, screens viewed, whether onboarding was completed, and whether a Pro
          subscription was started, restored, or cancelled
        </li>
        <li>
          Anonymous feature-usage events, for example that an alarm was created or rang, which challenge type it used, and
          whether the challenge was completed. These events never include your alarm times or labels, typed text, wake-up
          history details, or any camera, microphone, or motion data
        </li>
        <li>General device information: device model, iOS version, app version, language, and approximate region derived from IP address</li>
        <li>A random app-instance identifier that is not tied to your name, email, or Apple Account</li>
      </ul>
      <p>
        Firebase Analytics does not access the Apple advertising identifier (IDFA) in Rise Mission, and the app never
        shows Apple&apos;s cross-app tracking prompt because it does not track you across other companies&apos; apps or
        websites. Install and campaign attribution for our ads use Apple&apos;s privacy-preserving SKAdNetwork and the
        Apple Ads Attribution (AdServices) API, neither of which uses the advertising identifier (IDFA). Analytics data is
        processed by Google under the <a href="https://firebase.google.com/support/privacy">Firebase privacy terms</a>.
      </p>
      <p>
        What analytics can never see: your alarms, wake-up history, streaks, camera, QR codes, or anything you type in the
        app.
      </p>

      <h2>This website</h2>
      <p>
        risemission.app may use Google Analytics and PostHog to count visits and see which pages lead to App Store
        downloads. PostHog runs without cookies. We don&apos;t sell this data or use it for advertising profiles.
      </p>

      <h2>What we never do</h2>
      <ul>
        <li>No personal content leaves your device: alarms, history, and camera stay on your iPhone</li>
        <li>No cross-app or cross-site tracking, and no advertising SDKs that show ads in the app</li>
        <li>No account, sign-in, or cloud sync</li>
        <li>No selling of any information</li>
      </ul>

      <h2>Permissions</h2>
      <p>
        <strong>Alarms:</strong> used to schedule the wake-up alarms you create. <strong>Camera:</strong> requested only
        if you pick a camera-based challenge, used as described above. <strong>Microphone &amp; Speech Recognition:</strong>{" "}
        requested only for the Voice challenge, to hear your spoken affirmation on-device. <strong>Motion &amp; Fitness:</strong>{" "}
        requested only for the Walk challenge, to count your steps on-device (the Shake challenge uses the accelerometer,
        which needs no permission). <strong>Location:</strong> optional, only for the weather in Morning Briefing, at
        approximate accuracy. <strong>Calendars:</strong> optional, only to show your first event in Morning Briefing,
        read on your iPhone. <strong>Notifications:</strong> optional, used for the evening wind-down reminder and
        the optional daily focus (Pomodoro) reminder; each can be turned off in the app.
      </p>

      <h2>Children</h2>
      <p>Rise Mission does not knowingly collect personal information from children; the analytics described above are not linked to anyone&apos;s identity.</p>

      <h2>Changes &amp; contact</h2>
      <p>
        If this policy ever changes, the update will appear on this page with a new date. Questions: email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </DocPage>
  );
}
