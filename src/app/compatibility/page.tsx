import Image from "next/image";
import Link from "next/link";
import { Answer, H2, Limits, Sources, type Source } from "@/components/blog/prose";
import { AppStoreButton } from "@/components/site/app-store-button";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { GALLERY_SHOTS } from "@/lib/media";
import { breadcrumbLd, faqPageLd, mobileApplicationLd, pageMetadata, type QA } from "@/lib/seo";
import { CHALLENGES, FACTS, LIVE_VERSION, MIN_IOS, PRICING_COPY } from "@/lib/site";

/**
 * Compatibility / requirements page (audit B2 + §E.4): the one quotable answer
 * to "which iPhones can run Rise Mission", "is there an Android version".
 * iPhone model list copied from Apple's "iPhone models compatible with iOS 26".
 */

const PATH = "/compatibility";
const UPDATED = "2026-11-15";

export const metadata = pageMetadata({
  title: "Which iPhones Run Rise Mission? (iOS 26)",
  description:
    "Rise Mission needs an iPhone on iOS 26 or later because it uses Apple's AlarmKit. Supported models, permissions and why there's no Android or iPad version.",
  path: PATH,
});

const SRC_APPLE = {
  models: {
    label: "Apple. iPhone models compatible with iOS 26 (iPhone User Guide)",
    href: "https://support.apple.com/guide/iphone/iphone-models-compatible-with-ios-26-iphe3fa5df43/26/ios/26",
  },
  alarmKit: { label: "Apple Developer Documentation. AlarmKit", href: "https://developer.apple.com/documentation/alarmkit" },
  wwdc: { label: "Apple Developer. Wake up to the AlarmKit API (WWDC25 session 230)", href: "https://developer.apple.com/videos/play/wwdc2025/230/" },
  alarms: { label: "Apple Support. How to set and change alarms on your iPhone", href: "https://support.apple.com/en-us/118444" },
} satisfies Record<string, Source>;

/** Apple's iOS 26 compatibility list, grouped by family (source: SRC_APPLE.models). */
const MODELS: { family: string; models: string }[] = [
  { family: "iPhone 17 family", models: "iPhone 17, iPhone 17 Pro, iPhone 17 Pro Max, iPhone Air, iPhone 17e" },
  { family: "iPhone 16 family", models: "iPhone 16, iPhone 16 Plus, iPhone 16 Pro, iPhone 16 Pro Max, iPhone 16e" },
  { family: "iPhone 15 family", models: "iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max" },
  { family: "iPhone 14 family", models: "iPhone 14, iPhone 14 Plus, iPhone 14 Pro, iPhone 14 Pro Max" },
  { family: "iPhone 13 family", models: "iPhone 13 mini, iPhone 13, iPhone 13 Pro, iPhone 13 Pro Max" },
  { family: "iPhone 12 family", models: "iPhone 12 mini, iPhone 12, iPhone 12 Pro, iPhone 12 Pro Max" },
  { family: "iPhone 11 family", models: "iPhone 11, iPhone 11 Pro, iPhone 11 Pro Max" },
  { family: "iPhone SE", models: "iPhone SE (2nd generation), iPhone SE (3rd generation)" },
];

const FAQ: QA[] = [
  { q: "Which iPhones can run Rise Mission?", a: `${FACTS.minIOS} Per Apple, that includes the iPhone 11 and later and the iPhone SE (2nd generation) and later.` },
  {
    q: "Is there an Android version of Rise Mission?",
    a: "No. Rise Mission is an iPhone-only app built on Apple's AlarmKit, which only exists on Apple's platforms.",
  },
  {
    q: "Does Rise Mission work on iPad or Apple Watch?",
    a: "No. Rise Mission is an iPhone app. There is no iPad version and no Apple Watch app.",
  },
  {
    q: "Why does Rise Mission need iOS 26?",
    a: `Because it's built on AlarmKit, the framework Apple introduced in iOS 26 that lets apps schedule real system alarms. ${FACTS.ringsOnSilent}`,
  },
  {
    q: "What if my iPhone can't update to iOS 26?",
    a: "Rise Mission won't install on it. Use the built-in Clock app, which rings on Silent and in Do Not Disturb, and see our guides on waking up as a heavy sleeper for habits that work with any alarm.",
  },
  {
    q: "What happens if I deny the camera or microphone permission?",
    a: `Those challenges can't run, but the alarm still works. ${FACTS.backupChallenge} Shake, Math, Typing and Memory need no permission at all.`,
  },
];

export default function CompatibilityPage() {
  const editor = GALLERY_SHOTS[3];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Compatibility", path: PATH },
          ]),
          mobileApplicationLd(
            "Rise Mission is an iPhone alarm clock app with wake-up challenges. Requires iOS 26 or later (Apple's AlarmKit); no Android, iPad or Apple Watch version. Free to download; Rise Mission Pro unlocks the app.",
          ),
          faqPageLd(FAQ),
        ]}
      />

      <section className="sunrise-glow dawn">
        <div className="container-rm pb-10 pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="t-eyebrow">
              Requirements · Version {LIVE_VERSION} · Updated <time dateTime={UPDATED}>November 15, 2026</time>
            </p>
            <h1 className="t-h1 mt-3">Rise Mission requirements: iPhone and iOS 26</h1>
            <p className="t-lead mt-4">
              Before you download: which iPhones run Rise Mission, what each wake-up challenge needs, and what to use instead if
              yours can&apos;t.
            </p>
          </div>
        </div>
      </section>

      <div className="container-rm">
        <div className="prose-rm mx-auto max-w-3xl">
          <Answer>
            <strong>Rise Mission runs on any iPhone with {MIN_IOS} or later, which Apple lists as the iPhone 11 and newer plus the iPhone SE (2nd generation) and newer.</strong>{" "}
            It needs iOS 26 because it&apos;s built on Apple&apos;s AlarmKit, the system that lets it ring on Silent and in
            Focus. There is no Android, iPad or Apple Watch version.
          </Answer>

          <H2>Which iPhone models are supported?</H2>
          <p>
            Every iPhone that can run iOS 26. Apple publishes that list, and we copy it here unchanged (
            <a href={SRC_APPLE.models.href}>Apple</a>). If your model isn&apos;t below, it can&apos;t update to iOS 26 and
            can&apos;t install Rise Mission.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Models compatible with iOS 26</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr key={m.family}>
                    <td>
                      <strong>{m.family}</strong>
                    </td>
                    <td>{m.models}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Being on a supported model isn&apos;t enough on its own: the phone has to actually be updated. To check, open
            Settings, tap General, then About, and look at iOS Version. To update, go to Settings, General, Software Update.
          </p>

          <H2>Why does Rise Mission need iOS 26?</H2>
          <p>
            Because of AlarmKit. Apple introduced it in iOS 26 so that apps from the App Store can schedule real, prominent
            alarms instead of ordinary notifications (<a href={SRC_APPLE.alarmKit.href}>Apple Developer</a>). In Apple&apos;s
            WWDC25 session on the framework, Apple says an AlarmKit alert breaks through Silent mode and the current Focus (
            <a href={SRC_APPLE.wwdc.href}>WWDC25</a>).
          </p>
          <p>
            Before AlarmKit, that was the catch with alarm apps: most woke you with a scheduled notification, which a muted
            phone could swallow. We chose to support only iOS 26 rather than ship an alarm that might stay silent on older
            phones. The full background is in{" "}
            <Link href="/blog/does-iphone-alarm-ring-on-silent">does the iPhone alarm ring on Silent?</Link>
          </p>
          <p>
            One thing AlarmKit doesn&apos;t change: {FACTS.poweredOff} {FACTS.systemStop}
          </p>

          <H2>Is there an Android, iPad or Apple Watch version?</H2>
          <p>
            No. {FACTS.minIOS} There is also no Apple Watch app. AlarmKit is an Apple framework, so an Android version would be a
            different app built from scratch, and we&apos;d rather make one iPhone app work well. If you&apos;re on Android,
            other mission alarm apps exist there; our{" "}
            <Link href="/blog/alarmy-alternatives">Alarmy alternatives</Link> list covers the iPhone side.
          </p>

          <H2>What does each wake-up challenge need?</H2>
          <p>
            Some challenges use the camera, microphone or motion sensors, and iOS asks your permission the first time. You can
            say no to any of them and still use the app.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Challenge</th>
                  <th>Type</th>
                  <th>Needs</th>
                </tr>
              </thead>
              <tbody>
                {CHALLENGES.map((c) => (
                  <tr key={c.slug}>
                    <td>
                      <strong>{c.name}</strong>
                    </td>
                    <td>{c.kind === "physical" ? "Body" : "Brain"}</td>
                    <td>{c.needs === "Nothing" ? "No permission" : c.needs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {FACTS.backupChallenge} {FACTS.onDevice} For help choosing, read{" "}
            <Link href="/blog/wake-up-challenges-explained">wake-up challenges explained</Link>.
          </p>
        </div>

        <figure className="mx-auto mt-10 max-w-[320px]">
          <Image
            src={editor.src}
            alt={editor.alt}
            width={1320}
            height={2868}
            sizes="(max-width: 640px) 80vw, 320px"
            className="h-auto w-full rounded-[1.6rem] border border-line"
          />
          <figcaption className="mt-3 text-center text-[0.9rem] text-muted">{editor.caption}</figcaption>
        </figure>

        <div className="prose-rm mx-auto mt-10 max-w-3xl">
          <H2>What else should you set up before the first morning?</H2>
          <ol>
            <li>
              <strong>Allow alarms.</strong> AlarmKit apps must ask before scheduling alarms; if you declined, turn it back on
              for Rise Mission in Settings.
            </li>
            <li>
              <strong>Run the test alarm.</strong> {FACTS.testAlarm}
            </li>
            <li>
              <strong>Charge overnight.</strong> A phone that dies at 4 AM can&apos;t ring at 6:30.
            </li>
            <li>
              <strong>Know your exits.</strong> {FACTS.emergencyDismiss}
            </li>
          </ol>

          <H2>What should you use if your iPhone can&apos;t run iOS 26?</H2>
          <p>
            The built-in Clock app. It rings on Silent and in Do Not Disturb (<a href={SRC_APPLE.alarms.href}>Apple Support</a>
            ), and it&apos;s free. Pair it with habits that don&apos;t depend on an
            app: the phone across the room, a consistent wake time, and light as soon as you&apos;re up. Our guide to{" "}
            <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper">waking up as a heavy sleeper</Link> covers them, and{" "}
            <Link href="/rise-mission-vs-apple-clock">Rise Mission vs the iPhone Clock app</Link> explains what you&apos;d gain
            by upgrading later.
          </p>

          <H2>What does it cost once it&apos;s installed?</H2>
          <p>{PRICING_COPY.long}</p>

          <Limits>
            <p>
              The model list is Apple&apos;s for iOS 26 as of the date above; Apple may change it with future iOS releases.
              Camera challenges need enough light for the front camera to see you, and step counting needs Motion &amp; Fitness
              access. If anything on this page doesn&apos;t match what you see on your iPhone, the{" "}
              <Link href="/support">support page</Link> has a contact address.
            </p>
          </Limits>

          <Sources items={Object.values(SRC_APPLE)} />
        </div>
      </div>

      <Faq items={FAQ} />

      <section className="container-rm">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-card p-8 text-center shadow-soft">
          <p className="t-h2 !text-2xl">On iOS 26? You&apos;re ready.</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">{PRICING_COPY.short}</p>
          <div className="mt-6 flex justify-center">
            <AppStoreButton placement="compatibility" />
          </div>
        </div>
      </section>
    </>
  );
}
