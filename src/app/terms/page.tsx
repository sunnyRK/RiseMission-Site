import Link from "next/link";
import { DocPage } from "@/components/site/doc-page";
import { staticPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = staticPageMetadata("/terms");

export default function Terms() {
  return (
    <DocPage title="Rise Mission Terms of Use" path="/terms" updated="August 21, 2026">
      <p>
        These Terms of Use (&quot;Terms&quot;) govern your use of the Rise Mission app (&quot;the app&quot;). By
        downloading or using the app you agree to these Terms and to Apple&apos;s Licensed Application End User License
        Agreement (the &quot;Standard EULA&quot;), available at{" "}
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">
          https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
        </a>
        . Where these Terms and the Standard EULA differ, the Standard EULA governs your license to use the app.
      </p>

      <h2>Rise Mission Pro subscription</h2>
      <p>
        Rise Mission is free to download and includes optional in-app purchases. Rise Mission Pro is offered as an
        auto-renewable subscription or as a one-time lifetime purchase:
      </p>
      <ul>
        <li>
          Subscriptions are available on a weekly or yearly basis, or you can buy a one-time lifetime unlock. The price and
          billing period are shown in the app before you confirm a purchase.
        </li>
        <li>Payment is charged to your Apple Account when you confirm the purchase.</li>
        <li>
          Your subscription renews automatically for the same period at the same price unless auto-renew is turned off at
          least 24 hours before the end of the current period.
        </li>
        <li>Your Apple Account is charged for renewal within 24 hours before the end of the current period.</li>
        <li>
          You can manage or cancel your subscription at any time in your Apple Account settings. Cancellation takes effect
          at the end of the current billing period; the current period is not refunded except where required by law or by
          Apple&apos;s policies.
        </li>
        <li>Customers who previously made the earlier one-time purchase retain full access without a subscription.</li>
      </ul>
      <p>
        Purchases and subscriptions are processed by Apple through the App Store. Subscription status is managed on our
        behalf by RevenueCat, Inc.; we do not receive or store your payment details. Refunds are handled by Apple in
        accordance with the App Store Terms and applicable law.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Rise Mission schedules alarms and asks you to complete a wake-up challenge to dismiss them. You are responsible
        for using the app safely: do not attempt a physical challenge (push-ups, squats, walking, or shaking your phone)
        if it is unsafe for you to do so, and never use the app while driving or operating machinery. Every physical
        challenge includes a mental backup, and an emergency dismiss is always available.
      </p>

      <h2>No warranty; limitation of liability</h2>
      <p>
        The app is provided &quot;as is&quot; without warranties of any kind to the maximum extent permitted by law. We
        are not liable for missed alarms, oversleeping, or any consequences arising from your use of the app. The alarm
        relies on Apple&apos;s AlarmKit and on your device&apos;s settings, power, and system state.
      </p>

      <h2>Privacy</h2>
      <p>
        Your use of the app is also governed by our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Changes &amp; contact</h2>
      <p>
        If these Terms change, the update will appear on this page with a new date. Questions: email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </DocPage>
  );
}
