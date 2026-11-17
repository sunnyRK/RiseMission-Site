/**
 * Single source of truth for every product fact the website states.
 *
 * Rule (borrowed from pagedrop's plan.ts): marketing copy, blog posts, FAQ
 * answers, JSON-LD and llms.txt must READ facts from here, never retype them.
 * If the app changes, change it here once. Every fact must be verifiable in
 * the live App Store build (v1.6, build 14; this branch merges only after
 * App Review approves it). Ground truth: the app repo, branch `v1.6`
 * (docs/APP_STORE_v1.6.md + the Swift files named next to each fact below).
 *
 * Deliberately NOT here: prices or introductory offers. App Store prices vary
 * by storefront and change; offers are dynamic and shown in-app only. The site
 * never mentions them and links to the App Store instead.
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

/**
 * The one-paragraph entity definition (≈ 50 words) answer engines should quote.
 * Repeat it verbatim (llms.txt, Organization schema, hub intros) so every
 * source agrees on what Rise Mission is. Honest: a commitment device, not a lock.
 */
export const ENTITY_DESCRIPTION =
  "Rise Mission is an iOS alarm app for heavy sleepers that you stop by finishing a wake-up challenge, such as push-ups counted by the camera, a walk, a QR scan or math. It runs on iPhone with iOS 26 or later, is built on Apple's AlarmKit and rings on Silent.";

/** Live App Store version. Bump on every release. */
export const LIVE_VERSION = "1.6";
export const MIN_IOS = "iOS 26";

/**
 * Honest pricing language. The app is free to download, but new users unlock
 * Rise Mission Pro after onboarding (hard paywall since v1.2). Never claim
 * the app is "free" without the Pro qualifier.
 */
export const PRICING_COPY = {
  short: "Free download · Pro unlocks the app",
  long:
    "Rise Mission is free to download, and Rise Mission Pro unlocks the app after onboarding. Pro is an auto-renewable subscription or a one-time Lifetime purchase. The options and prices for your country are shown in the app before you buy.",
} as const;

/**
 * Honest privacy language. The app ships Firebase Analytics (usage data not linked to identity
 * events) and RevenueCat (purchase sync) — so we never say "no tracking" or
 * "no data collected". What is true: no ads, no account, camera/voice stay on
 * device, no cross-app tracking (no IDFA, no ATT prompt).
 */
export const PRIVACY_COPY = {
  badges: ["No ads", "No account", "Camera stays on your iPhone"],
  long:
    "Camera frames are processed on your iPhone with Apple's Vision framework and are never recorded, saved, or uploaded. Voice recognition runs on your iPhone wherever it supports on-device speech, and your audio is never saved by us. There is no account and no cloud sync; alarms and history stay on your device. The app uses usage analytics (Firebase) that aren't linked to your identity and never tracks you across other apps.",
} as const;

/**
 * 3D icon names in /assets/icons3d/<name>.png. Same files and names as the app
 * (3dicons.co, CC0; app repo docs/ICON_LICENSES.md).
 */
export type Icon3D =
  | "3d-bell" | "3d-bolt" | "3d-calculator" | "3d-calendar" | "3d-camera" | "3d-clock" | "3d-dumbbell"
  | "3d-fire" | "3d-flask" | "3d-gift" | "3d-heart" | "3d-location" | "3d-lock" | "3d-magnifier"
  | "3d-medal" | "3d-mic" | "3d-moon" | "3d-pencil" | "3d-phone" | "3d-puzzle" | "3d-rocket"
  | "3d-shield" | "3d-star" | "3d-sun" | "3d-target" | "3d-tick" | "3d-trophy";

export const icon3dSrc = (name: Icon3D) => `/assets/icons3d/${name}.png`;

export type ChallengeFact = {
  slug: string;
  name: string;
  kind: "physical" | "mental"; // "mental" = no body movement (Voice is mental here but is NOT a backup option in the app)
  /** One line, as the app phrases it. */
  tagline: string;
  /** What the phone actually uses — keep technically accurate. */
  how: string;
  needs: string;
  /** 3D icon in /assets/icons3d, same as `ChallengeKind.icon3DName` in the app. */
  icon3d: Icon3D;
};

/** The 10 wake-up challenges (unchanged in v1.6), in the app's order. */
export const CHALLENGES: ChallengeFact[] = [
  { slug: "push-ups", name: "Push-ups", kind: "physical", tagline: "Camera counts full reps", how: "The front camera and Apple's Vision body-pose detection count each full push-up on-device.", needs: "Camera", icon3d: "3d-dumbbell" },
  { slug: "squats", name: "Squats", kind: "physical", tagline: "Camera counts full squats", how: "Vision body-pose detection tracks hip and knee depth to count each full squat on-device.", needs: "Camera", icon3d: "3d-rocket" },
  { slug: "walk", name: "Walk", kind: "physical", tagline: "Steps counted as you go", how: "The iPhone motion coprocessor counts your steps until you reach the target.", needs: "Motion & Fitness", icon3d: "3d-location" },
  { slug: "shake", name: "Shake", kind: "physical", tagline: "Shake the phone awake", how: "The accelerometer counts hard shakes; no permission needed.", needs: "Nothing", icon3d: "3d-phone" },
  { slug: "object-find", name: "Object Find", kind: "physical", tagline: "Find & snap a real object", how: "Get up and point the camera at a requested everyday object; on-device recognition confirms it.", needs: "Camera", icon3d: "3d-magnifier" },
  { slug: "qr-code", name: "QR code", kind: "physical", tagline: "Walk & scan your code", how: "Print or place your personal QR code in another room; the alarm stops only when you scan it.", needs: "Camera", icon3d: "3d-camera" },
  { slug: "voice", name: "Voice", kind: "mental", tagline: "Say a morning affirmation", how: "Say the on-screen affirmation out loud; on-device speech recognition checks it.", needs: "Microphone", icon3d: "3d-mic" },
  { slug: "math", name: "Math", kind: "mental", tagline: "Solve to dismiss", how: "Solve arithmetic problems at your chosen difficulty.", needs: "Nothing", icon3d: "3d-calculator" },
  { slug: "typing", name: "Typing", kind: "mental", tagline: "Type a phrase exactly", how: "Type the shown phrase exactly, which takes focus a half-asleep brain doesn't have.", needs: "Nothing", icon3d: "3d-pencil" },
  { slug: "memory", name: "Memory", kind: "mental", tagline: "Memorize, then tap in order", how: "Numbered tiles flash on a 3×3 grid, then hide; tap them back in order.", needs: "Nothing", icon3d: "3d-puzzle" },
];

/** Challenge → its dedicated guide (internal linking). */
export const CHALLENGE_GUIDES: Record<string, string> = {
  "push-ups": "/blog/push-up-alarm-clock",
  squats: "/blog/squat-alarm-clock",
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
    "An emergency dismiss (hold for five seconds and confirm) is always available, so a ringing alarm can never trap you. It breaks your streak unless a Streak Shield absorbs it.",
  backupChallenge:
    "Every physical challenge has a mental backup that takes over if the camera can't see you or a sensor isn't available.",
  onDevice:
    "Push-up, squat and object recognition run on-device with Apple's Vision framework; frames are analysed in memory and discarded.",
  systemStop:
    "iOS shows a system Stop button on every alarm, including Rise Mission's, so you can always stop it without the challenge. Rise Mission is a commitment device, not a lock: a wake-up stopped that way isn't counted as a completed challenge.",
  snooze:
    "Snoozing is optional and limited per alarm. With Snooze Tax, each snooze adds to your next wake-up challenge, so snoozing gets more expensive.",
  minIOS: "Rise Mission runs on iPhone with iOS 26 or later, because it's built on Apple's AlarmKit. There is no Android or iPad version.",
  testAlarm:
    "A test alarm rings about ten seconds after you lock the phone, so you can try the full flow safely before tomorrow morning.",
  streakShields:
    "You earn a Streak Shield for every 7 days of streak (up to 3 banked). A shield absorbs one broken morning, such as an emergency dismiss, so your streak survives.",
  /** @deprecated v1.5 list, kept only until the homepage switches to V16_FEATURES. */
  v15Features: [
    "Morning Briefing with the weather and your first calendar event",
    "Lock Screen widgets and Live Activities",
    "Streak Shields that protect your streak on a rough morning",
    "An optional Stay-Awake Check that makes sure you didn't fall back asleep",
    "60 morning motivation quotes",
  ],
} as const;

/* ------------------------------------------------------------------------ */
/* v1.6 facts. Each one cites the Swift file it was checked against          */
/* (app repo ~/IOS-App/RiseMission, branch v1.6).                            */
/* ------------------------------------------------------------------------ */

export type Rank = { level: number; name: string; xp: number; icon3d: Icon3D };

/** Services/LevelEngine.swift `Rank`: titles, XP thresholds and icon3DName. */
export const RANKS: Rank[] = [
  { level: 1, name: "Sleepyhead", xp: 0, icon3d: "3d-moon" },
  { level: 2, name: "Early Riser", xp: 100, icon3d: "3d-sun" },
  { level: 3, name: "Morning Pro", xp: 300, icon3d: "3d-star" },
  { level: 4, name: "Dawn Chaser", xp: 700, icon3d: "3d-fire" },
  { level: 5, name: "Sunrise Master", xp: 1500, icon3d: "3d-medal" },
  { level: 6, name: "Legend", xp: 3000, icon3d: "3d-trophy" },
];

/**
 * Services/LevelEngine.swift: XP is derived from wake history, one award per
 * calendar day (a second alarm can't farm XP).
 */
export const XP_RULES = {
  base: 10,
  onTimeBonus: 5,
  /** On time = no snooze and finished within this many minutes of the ring. */
  onTimeMinutes: 15,
  routineBonus: 5,
  /** Streak multiplier: streak length (days) from → multiplier. */
  multipliers: [
    { fromStreak: 1, toStreak: 2, x: 1.0 },
    { fromStreak: 3, toStreak: 6, x: 1.2 },
    { fromStreak: 7, toStreak: 13, x: 1.5 },
    { fromStreak: 14, toStreak: null, x: 2.0 },
  ],
} as const;

/** XP for one credited wake-up day (mirrors LevelEngine.Award.total). */
export function xpForDay(input: { streak: number; onTime: boolean; routine: boolean }): number {
  const streak = Math.max(1, input.streak);
  const m = XP_RULES.multipliers.find((r) => streak >= r.fromStreak && (r.toStreak === null || streak <= r.toStreak))!;
  const subtotal = XP_RULES.base + (input.onTime ? XP_RULES.onTimeBonus : 0) + (input.routine ? XP_RULES.routineBonus : 0);
  return Math.round(subtotal * m.x);
}

/** The rank for a total XP (mirrors LevelEngine.Rank.forXP). */
export function rankForXP(xp: number): Rank {
  return [...RANKS].reverse().find((r) => xp >= r.xp) ?? RANKS[0];
}

/** Services/RiseChallengeEngine.swift: 7 credited wake-ups within 10 calendar days. */
export const RISE_CHALLENGE = {
  name: "7-Day Rise Challenge",
  goal: 7,
  windowDays: 10,
} as const;

/** Models/MorningRoutine.swift `MorningRoutineItem` (titles as the app shows them). */
export const MORNING_ROUTINE = ["Drink water", "Get sunlight", "Stretch"] as const;

/** Services/BedtimeMath.swift: bedtime = next morning alarm − sleep goal; nudge 30 min earlier. */
export const BEDTIME_NUDGE = {
  sleepGoalHours: [7, 7.5, 8, 8.5, 9],
  defaultSleepGoalHours: 8,
  leadMinutes: 30,
} as const;

export type AchievementFact = { name: string; how: string; icon3d: Icon3D; since: "1.1+" | "1.6" };

/** Services/AchievementEngine.swift `Achievement`: title, description, icon3DName. */
export const ACHIEVEMENTS: AchievementFact[] = [
  { name: "First Light", how: "Complete your first wake-up mission", icon3d: "3d-sun", since: "1.1+" },
  { name: "Three in a Row", how: "Reach a 3-day streak", icon3d: "3d-fire", since: "1.1+" },
  { name: "Week Warrior", how: "Reach a 7-day streak", icon3d: "3d-calendar", since: "1.1+" },
  { name: "Unstoppable", how: "Reach a 30-day streak", icon3d: "3d-bolt", since: "1.1+" },
  { name: "Comeback", how: "Rebuild a 3-day streak after breaking one", icon3d: "3d-target", since: "1.1+" },
  { name: "Early Bird", how: "Finish a mission before 6 AM", icon3d: "3d-clock", since: "1.1+" },
  { name: "Fortnight Strong", how: "Reach a 14-day streak", icon3d: "3d-medal", since: "1.6" },
  { name: "Triple Digits", how: "Reach a 100-day streak", icon3d: "3d-trophy", since: "1.6" },
  { name: "5 AM Club", how: "Finish 5 missions before 6 AM", icon3d: "3d-moon", since: "1.6" },
  { name: "Centurion", how: "Do 100 push-ups across your wake-ups", icon3d: "3d-dumbbell", since: "1.6" },
  { name: "Perfect Week", how: "Wake up with a mission all 7 days of a week", icon3d: "3d-tick", since: "1.6" },
  { name: "Explorer", how: "Complete 5 different challenge types", icon3d: "3d-star", since: "1.6" },
  { name: "Weekend Warrior", how: "Complete a mission on both Saturday and Sunday", icon3d: "3d-gift", since: "1.6" },
  { name: "No-Snooze Week", how: "7 wake-ups in a row without snoozing", icon3d: "3d-bell", since: "1.6" },
  { name: "Rise Challenge", how: "Complete 7 wake-ups within 10 days", icon3d: "3d-rocket", since: "1.6" },
];
export const ACHIEVEMENT_COUNT = ACHIEVEMENTS.length;
export const NEW_ACHIEVEMENT_COUNT = ACHIEVEMENTS.filter((a) => a.since === "1.6").length;

/**
 * Models/ChallengeTypes.swift `AlarmSound`: 16 sounds in Gentle / Classic /
 * Energetic. They play on the in-app ringing screen. The system Lock Screen
 * alarm still uses the iOS default sound, so never claim the custom sound
 * plays on the Lock Screen.
 */
export const SOUNDS = {
  count: 16,
  styles: ["Gentle", "Classic", "Energetic"],
  caveat: "The 16 sounds play on Rise Mission's ringing screen; the system alarm on the Lock Screen uses the standard iOS alarm sound.",
} as const;

/** Features/Timer/FocusMath.swift `FocusPreset.all`. */
export const FOCUS_PRESETS = [
  { minutes: 5, label: "Quick reset" },
  { minutes: 15, label: "Light task" },
  { minutes: 25, label: "Deep work" },
  { minutes: 45, label: "Flow" },
  { minutes: 60, label: "Marathon" },
] as const;

export type V16Feature = { id: string; title: string; blurb: string; icon3d: Icon3D };

/**
 * What's new in 1.6, in the order of the App Store "What's New" text
 * (docs/APP_STORE_v1.6.md). Imported by the homepage; keep this exact shape.
 */
export const V16_FEATURES: V16Feature[] = [
  { id: "levels", title: "Levels and XP", blurb: "Every completed wake-up earns XP. Climb six ranks, from Sleepyhead to Legend.", icon3d: "3d-trophy" },
  { id: "rise-challenge", title: "7-Day Rise Challenge", blurb: "Build the habit in your first week: 7 wake-ups within 10 days.", icon3d: "3d-rocket" },
  { id: "morning-routine", title: "Morning routine", blurb: "Water, sunlight and a stretch after you wake. Finishing it adds bonus XP.", icon3d: "3d-sun" },
  { id: "bedtime-nudge", title: "Bedtime nudge", blurb: "An optional reminder timed from your next alarm and your sleep goal.", icon3d: "3d-moon" },
  { id: "achievements", title: "15 achievements", blurb: "9 new badges, from Fortnight Strong to the 5 AM Club, in a new showcase.", icon3d: "3d-medal" },
  { id: "share-card", title: "Streak share card", blurb: "Share your streak as a card through the standard iOS share sheet.", icon3d: "3d-fire" },
  { id: "home", title: "Redesigned Home", blurb: "A time-of-day greeting, your next alarm and a tracker for your next badge.", icon3d: "3d-clock" },
  { id: "challenges", title: "Challenges carousel", blurb: "Mission cards for all 10 challenges, with your most-used one up front.", icon3d: "3d-target" },
  { id: "focus", title: "New Focus tab", blurb: "A big dial, session presets, pause, and today's focus minutes.", icon3d: "3d-bolt" },
  { id: "redesign", title: "New Settings, Stats and History", blurb: "Redesigned screens to review your mornings and tune the app.", icon3d: "3d-calendar" },
  { id: "onboarding", title: "Faster onboarding", blurb: "A quicker setup with a practice round before your first real alarm.", icon3d: "3d-tick" },
  { id: "sounds", title: "16 ringing-screen sounds", blurb: "Gentle, Classic and Energetic styles, with gentle ones that fade in.", icon3d: "3d-bell" },
  { id: "comeback", title: "Comeback reminders", blurb: "Optional reminders if you stop opening the app. Turn them off in Settings.", icon3d: "3d-heart" },
  { id: "contrast", title: "Better contrast", blurb: "Clearer alarm screens, widgets and Live Activities.", icon3d: "3d-star" },
];

export type Release = {
  version: string;
  /** App Store release day (YYYY-MM-DD), from the App Store version history. Null until live. */
  date: string | null;
  summary: string;
  items: string[];
};

/**
 * Release history, newest first. 1.0 to 1.5 dates and contents come from the
 * App Store version history (checked 2026-11-17). Rewritten in plain words:
 * no prices, no offers, and no historic "no subscription" lines that are no
 * longer true. Set the 1.6 date to the App Store release day when it goes live.
 */
export const RELEASES: Release[] = [
  {
    version: "1.6",
    date: null,
    summary: "The biggest update yet: levels, a first-week challenge, a morning routine and a fresh look across the app.",
    items: V16_FEATURES.map((f) => `${f.title}: ${f.blurb}`),
  },
  {
    version: "1.5",
    date: "2026-09-05",
    summary: "Making waking up feel like a win.",
    items: [
      "Morning Briefing after your challenge: today's weather, your first calendar event, your streak and motivation",
      "60 morning motivation quotes",
      "Home Screen and Lock Screen widgets",
      "Live Activity and Dynamic Island support for your next alarm and streak",
      "Louder, more persistent alarm sounds with stronger haptics",
      "Streak Shields and smarter snooze handling",
      "Bigger rep counters for Push-ups and Squats",
      "Reliability fixes for the camera, audio and wake-up sessions",
    ],
  },
  {
    version: "1.4",
    date: "2026-08-26",
    summary: "Two new challenges and a full redesign.",
    items: [
      "Shake challenge: shake your iPhone to the goal",
      "Voice challenge: say a morning affirmation out loud",
      "A new design with bright daytime screens and a focused dark alarm screen",
      "Personalized onboarding and an optional guided tour",
      "Faster Push-up setup, with optional calibration in Settings",
      "New ways to unlock Rise Mission Pro",
    ],
  },
  {
    version: "1.3",
    date: "2026-08-19",
    summary: "Squats, Object Find and focus tools.",
    items: [
      "Squat challenge: the camera counts full squats",
      "Object Find challenge: point the camera at a real object",
      "Focus Timer and Pomodoro, with an optional daily reminder",
      "Live pose guidance for push-ups and squats",
      "Rise Mission Pro as a subscription; earlier lifetime buyers keep full access",
    ],
  },
  {
    version: "1.2",
    date: "2026-08-08",
    summary: "Walk and Memory challenges.",
    items: [
      "Walk challenge: your iPhone counts your steps",
      "Memory challenge: memorize the numbers, then tap them in order",
      "A new Challenges tab",
      "An optional evening reminder before tomorrow's alarm",
    ],
  },
  {
    version: "1.1",
    date: "2026-08-04",
    summary: "Rise Mission Pro and the first achievements.",
    items: [
      "Rise Mission Pro, a one-time unlock at the time",
      "Achievements for consistent mornings",
      "Better streak tracking and progress insights",
      "Push-ups became the default challenge",
    ],
  },
  {
    version: "1.0",
    date: "2026-07-23",
    summary: "First release on the App Store.",
    items: ["An AlarmKit alarm you stop by finishing a wake-up challenge: Push-ups, Math, Typing or QR code", "Wake-up streaks and history"],
  },
];
