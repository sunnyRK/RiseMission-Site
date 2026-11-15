/**
 * Single source of truth for every product fact the website states.
 *
 * Rule (borrowed from pagedrop's plan.ts): marketing copy, blog posts, FAQ
 * answers, JSON-LD and llms.txt must READ facts from here, never retype them.
 * If the app changes, change it here once. Every fact must be verifiable in
 * the live App Store build (currently v1.5, build 13).
 *
 * Deliberately NOT here: prices. App Store prices vary by storefront and we
 * changed them several times; the app always shows `product.displayPrice`.
 * The site says "free trial on yearly" and links to the App Store instead.
 */

export const SITE_URL = "https://risemission.app";
export const SITE_NAME = "Rise Mission";
export const APP_NAME_FULL = "Alarm Clock: Rise Mission";
export const APP_STORE_ID = "6791305078";
export const APP_STORE_URL = `https://apps.apple.com/us/app/alarm-clock-rise-mission/id${APP_STORE_ID}`;
export const CONTACT_EMAIL = "radadiyasunny970@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/risemissionapp/";
export const AUTHOR = {
  name: "Sunny Radadiya",
  role: "Founder and iOS developer of Rise Mission",
  url: `${SITE_URL}/about`,
} as const;

/** Live App Store version. Bump on every release. */
export const LIVE_VERSION = "1.5";
export const MIN_IOS = "iOS 26";

/**
 * Honest pricing language. The app is free to download, but new users unlock
 * Rise Mission Pro after onboarding (hard paywall since v1.2). Never claim
 * the app is "free" without the Pro qualifier.
 */
export const PRICING_COPY = {
  short: "Free download · Pro unlocks the app",
  long:
    "Rise Mission is free to download. Rise Mission Pro unlocks the full app and is available as a weekly or yearly subscription (the yearly plan starts with a free trial) or a one-time lifetime purchase. Current prices are shown in the App Store for your country.",
} as const;

/**
 * Honest privacy language. The app ships Firebase Analytics (anonymous usage
 * events) and RevenueCat (purchase sync) — so we never say "no tracking" or
 * "no data collected". What is true: no ads, no account, camera/voice stay on
 * device, no cross-app tracking (no IDFA, no ATT prompt).
 */
export const PRIVACY_COPY = {
  badges: ["No ads", "No account", "Camera & voice stay on your iPhone"],
  long:
    "Camera frames and your voice are processed on your iPhone with Apple's Vision and Speech frameworks and are never recorded, saved, or uploaded. There is no account and no cloud sync; alarms and history stay on your device. The app uses anonymous usage analytics (Firebase) and never tracks you across other apps.",
} as const;

export type ChallengeFact = {
  slug: string;
  name: string;
  kind: "physical" | "mental"; // "mental" = no body movement (Voice is mental here but is NOT a backup option in the app)
  /** One line, as the app phrases it. */
  tagline: string;
  /** What the phone actually uses — keep technically accurate. */
  how: string;
  needs: string;
};

/** The 10 wake-up challenges in v1.5, in the app's order. */
export const CHALLENGES: ChallengeFact[] = [
  { slug: "push-ups", name: "Push-ups", kind: "physical", tagline: "Camera counts full reps", how: "The front camera and Apple's Vision body-pose detection count each full push-up on-device.", needs: "Camera" },
  { slug: "squats", name: "Squats", kind: "physical", tagline: "Camera counts full squats", how: "Vision body-pose detection tracks hip and knee depth to count each full squat on-device.", needs: "Camera" },
  { slug: "walk", name: "Walk", kind: "physical", tagline: "Steps counted as you go", how: "The iPhone motion coprocessor counts your steps until you reach the target.", needs: "Motion & Fitness" },
  { slug: "shake", name: "Shake", kind: "physical", tagline: "Shake the phone awake", how: "The accelerometer counts hard shakes; no permission needed.", needs: "Nothing" },
  { slug: "object-find", name: "Object Find", kind: "physical", tagline: "Find & snap a real object", how: "Get up and point the camera at a requested everyday object; on-device recognition confirms it.", needs: "Camera" },
  { slug: "qr-code", name: "QR code", kind: "physical", tagline: "Walk & scan your code", how: "Print or place your personal QR code in another room; the alarm stops only when you scan it.", needs: "Camera" },
  { slug: "voice", name: "Voice", kind: "mental", tagline: "Say a morning affirmation", how: "Say the on-screen affirmation out loud; on-device speech recognition checks it.", needs: "Microphone" },
  { slug: "math", name: "Math", kind: "mental", tagline: "Solve to dismiss", how: "Solve arithmetic problems at your chosen difficulty.", needs: "Nothing" },
  { slug: "typing", name: "Typing", kind: "mental", tagline: "Type a phrase exactly", how: "Type the shown phrase exactly, which takes focus a half-asleep brain doesn't have.", needs: "Nothing" },
  { slug: "memory", name: "Memory", kind: "mental", tagline: "Memorize, then tap in order", how: "Numbered tiles flash on a 3×3 grid, then hide; tap them back in order.", needs: "Nothing" },
];

/** Challenge → its dedicated guide (internal linking). */
export const CHALLENGE_GUIDES: Record<string, string> = {
  "push-ups": "/blog/push-up-alarm-clock",
  "qr-code": "/blog/qr-code-alarm-clock",
  math: "/blog/math-alarm-clock",
  walk: "/blog/step-alarm-clock",
};

/** Product facts we are allowed to state anywhere. Each verified against v1.5. */
export const FACTS = {
  challengeCount: CHALLENGES.length,
  ringsOnSilent:
    "Built on Apple's AlarmKit, so alarms ring on the Lock Screen, in Silent mode and during Focus, even when the app is closed.",
  poweredOff: "A powered-off iPhone can't ring. No alarm app can change that.",
  emergencyDismiss:
    "An emergency dismiss (hold for five seconds and confirm) is always available, so a ringing alarm can never trap you. It resets your streak.",
  backupChallenge:
    "Every physical challenge has a mental backup that takes over if the camera can't see you or a sensor isn't available.",
  onDevice:
    "Push-up, squat and object recognition run on-device with Apple's Vision framework; frames are analysed in memory and discarded.",
  testAlarm:
    "A test alarm rings about ten seconds after you lock the phone, so you can try the full flow safely before tomorrow morning.",
  v15Features: [
    "Morning Briefing with the weather and your first calendar event",
    "Lock Screen widgets and Live Activities",
    "Streak Shields that protect your streak on a rough morning",
    "An optional Stay-Awake Check that makes sure you didn't fall back asleep",
    "60 morning motivation quotes",
  ],
} as const;
