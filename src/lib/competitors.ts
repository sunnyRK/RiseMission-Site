/**
 * Verified competitor dataset for the comparison pages.
 *
 * Source: data/appstore-snapshot-2026-11-15.json (Apple iTunes Lookup API,
 * US storefront, fetched 2026-11-15). Every feature marked `true` and every
 * mission listed is backed by a verbatim quote (20 words or fewer) from that
 * app's own App Store description or release notes, kept in `evidence`.
 * Keys ending in "(release notes)" quote `releaseNotes`; all others quote
 * `description`.
 *
 * Rules for anyone editing this file:
 * - `null` means "the listing does not say". It is NOT "no". Never render
 *   null as a cross or "No" on the site; render it as "Not stated".
 * - `missions` lists only what the description names. Apps may offer more
 *   than their listing mentions; say "missions named in the listing".
 * - Do not add features from memory, reviews, or third-party sites.
 *
 * Caveats:
 * - sizeMB is fileSizeBytes / 1e6 as reported by Apple: the universal binary
 *   size. The actual download on a given iPhone is often smaller (App
 *   Thinning), and it changes with every update.
 * - Ratings and rating counts change daily. Always show SNAPSHOT_DATE next to
 *   them.
 * - Prices vary by storefront and change often, so we do not list them. Every
 *   app here is "Free" to download (formattedPrice); paid tiers are described
 *   only as the listing describes them.
 * - Rise Mission has 0 ratings in this snapshot, so `rating` is null.
 */

export const SNAPSHOT_DATE = "2026-11-15";
export const SNAPSHOT_SOURCE =
  "Apple iTunes Lookup API (itunes.apple.com/lookup), US storefront, fetched 2026-11-15. Features are taken only from each app's own App Store description and release notes.";

export type Competitor = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  developer: string;
  appStoreUrl: string;
  sizeMB: number;
  rating: number | null;
  ratingCount: number;
  minIOS: string;
  lastUpdated: string;
  genre: string;
  missions: string[];
  sleepTracking: boolean | null;
  music: boolean | null;
  subscription: boolean | null;
  bestFor: string;
  evidence: Record<string, string>;
  notes: string;
};

export const COMPETITORS: Competitor[] = [
  {
    id: 6791305078,
    slug: "rise-mission",
    name: "Alarm Clock: Rise Mission",
    shortName: "Rise Mission",
    developer: "Sunny Radadiya",
    appStoreUrl: "https://apps.apple.com/us/app/alarm-clock-rise-mission/id6791305078",
    sizeMB: 20.1,
    rating: null,
    ratingCount: 0,
    minIOS: "26.0",
    lastUpdated: "2026-09-05",
    genre: "Health & Fitness",
    missions: ["Shake", "Voice", "Push-ups", "Squats", "Object Find", "Walk", "QR code", "Math", "Typing", "Memory"],
    sleepTracking: false,
    music: false,
    subscription: true,
    bestFor: "Ten on-device challenges, including camera-counted push-ups and squats, in a small app",
    evidence: {
      missions: "10 WAKE-UP CHALLENGES",
      pushUps: "Push-ups: your camera counts completed repetitions on-device",
      squats: "Squats: your camera counts completed squats",
      voice: "Voice: say a positive morning affirmation out loud",
      objectFind: "Object Find: locate an everyday object using on-device vision",
      walk: "Walk: get out of bed and complete your step goal",
      qr: "QR Code: scan a code placed in your bathroom, kitchen, or another room",
      alarmKit: "Rise Mission uses Apple’s AlarmKit for a reliable system alarm experience.",
      weather: "see today’s weather, your first calendar event, your wake-up streak, and fresh motivation",
      widgets: "Home Screen and Lock Screen widgets, plus a Live Activity on the Lock Screen and Dynamic Island.",
      subscription: "Choose a Weekly or Yearly auto-renewable subscription, or unlock Pro permanently with a one-time Lifetime purchase.",
    },
    notes:
      "Our app. Facts cross-checked with src/lib/site.ts. Free to download; Pro is required after onboarding (hard paywall). sleepTracking and music are false from our own product knowledge (no sleep tracking; bundled alarm sounds only), not from the listing. Uses anonymous Firebase analytics; camera, voice and motion are processed on-device. Requires iOS 26 (AlarmKit), which is a real limitation versus apps that support iOS 13-17.",
  },
  {
    id: 1163786766,
    slug: "alarmy",
    name: "Alarmy - Loud alarm clock",
    shortName: "Alarmy",
    developer: "Delight Room Co., Ltd.",
    appStoreUrl: "https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766",
    sizeMB: 250.8,
    rating: 4.76,
    ratingCount: 251919,
    minIOS: "17.0",
    lastUpdated: "2026-11-13",
    genre: "Lifestyle",
    missions: ["Math", "Memory", "Shake", "Squats", "Photo"],
    sleepTracking: true,
    music: null,
    subscription: true,
    bestFor: "The most-reviewed mission alarm, with sleep tracking, snore detection and sleep sounds",
    evidence: {
      missions: "math solving, memory games, shaking, or squats.",
      photo: "Choose 'Photo Mission' as the alarm dismissal mission",
      sleepTracking: "Check if you snored last night",
      sleepSounds: "calm ASMR, rain sounds, white noise.",
      subscription: "a 7-day-Free Trial is provided.",
      "multipleMissions (release notes)": "Now you can enjoy Multiple Missions at one single alarm.",
    },
    notes:
      "By far the largest rating count in this set (251,919 US ratings at 4.76). Broad wellness scope: Anti-Snooze feature, snore and sleep tracker, calm sleep sounds, bedtime alarms. Listing says the sleep tracker and sleep sounds are free and premium features come with a 7-day free trial. Latest release adds combining multiple missions on one alarm. Music/Spotify not mentioned.",
  },
  {
    id: 6751428380,
    slug: "erly",
    name: "Erly: Wake Up Early",
    shortName: "Erly",
    developer: "Glacier Labs LLC",
    appStoreUrl: "https://apps.apple.com/us/app/erly-wake-up-early/id6751428380",
    sizeMB: 196.4,
    rating: 4.78,
    ratingCount: 16196,
    minIOS: "17.6",
    lastUpdated: "2026-11-10",
    genre: "Health & Fitness",
    missions: [],
    sleepTracking: null,
    music: null,
    subscription: true,
    bestFor: "Accountability and streaks: a locked wake-up goal you must beat every morning",
    evidence: {
      missionAlarm: "Alarms that won’t turn off until you complete a mission. No snoozes. No excuses.",
      streaks: "Track your current streak, best streak, and daily wins at a glance.",
      lockedGoal: "Once you’re within 4 hours of your wake-up time, your goal locks in.",
      subscription: "An Erly subscription is required to unlock full access to features.",
    },
    notes:
      "The App Store description says alarms need a mission but does not name any mission types, so `missions` is empty. Erly's own website (erly.co, checked 2026-11-15) lists push-ups, math problems, Bible verses, photos of the sky, item searches, make your bed, touch grass and affirmations, and also describes bedtime app limits; quote the website, not the listing, if those are mentioned. Strong rating (4.78 from 16,196). Positioned around accountability, gamified streaks and a goal that locks 4 hours before wake-up.",
  },
  {
    id: 6480463426,
    slug: "superalarm",
    name: "SuperAlarm - Loud Alarm Clock",
    shortName: "SuperAlarm",
    developer: "Jiseop Han",
    appStoreUrl: "https://apps.apple.com/us/app/superalarm-loud-alarm-clock/id6480463426",
    sizeMB: 234.1,
    rating: 4.53,
    ratingCount: 5483,
    minIOS: "17.0",
    lastUpdated: "2026-11-11",
    genre: "Lifestyle",
    missions: ["Math", "Memory", "Barcode", "Object scan", "Face ID", "Walk"],
    sleepTracking: null,
    music: null,
    subscription: null,
    bestFor: "Six missions, including barcode, Face ID and walking, plus a wake-up check",
    evidence: {
      missions: "[Solving math problems, Memory games, Barcode scanning, Object scanning, Face ID, Walking]",
      wakeUpCheck: "Our [Wake up check] feature ensures you won't drift off again.",
      widgets: "Beautiful widgets",
      weather: "Required to provide weather information.",
      deletionPrevention: "App deletion prevention while alarm is ringing",
    },
    notes:
      "Listing does not mention a subscription or premium tier, sleep tracking, or music, so those are null. Also lists infinite snooze until you wake up, a quick alarm feature, customizable alarm names and memos, weather and widgets.",
  },
  {
    id: 6758021281,
    slug: "wayk",
    name: "Wayk: Alarm Clock to Wake Up",
    shortName: "Wayk",
    developer: "Dialed Labs Inc.",
    appStoreUrl: "https://apps.apple.com/us/app/wayk-alarm-clock-to-wake-up/id6758021281",
    sizeMB: 347.8,
    rating: 4.72,
    ratingCount: 21170,
    minIOS: "17",
    lastUpdated: "2026-11-12",
    genre: "Health & Fitness",
    missions: ["Push-ups", "Sky photo", "Make your bed", "Find an object", "Bible verse", "Affirmation aloud"],
    sleepTracking: null,
    music: null,
    subscription: true,
    bestFor: "Routine-style missions such as making your bed, a sky photo or reading a Bible verse",
    evidence: {
      missions: "Mission examples:",
      pushUps: "Do pushups",
      skyPhoto: "Take a photo of the sky",
      makeBed: "Make your bed",
      findObject: "Find a random object",
      bibleVerse: "Read a Bible verse",
      affirmation: "Read an affirmation aloud",
      streaks: "Track streaks and morning insights",
      subscription: "an active Wayk Pro subscription is required to set alarms and use missions.",
    },
    notes:
      "Listing calls these \"Mission examples\", so the full list may be longer. Pro subscription is required to set alarms and use missions. Strong rating (4.72 from 21,170). Largest binary in this set.",
  },
  {
    id: 749124884,
    slug: "alarm-clock-for-me",
    name: "Alarm Clock for Me - Wake Up!",
    shortName: "Alarm Clock for Me",
    developer: "Mosaic S.r.l.",
    appStoreUrl: "https://apps.apple.com/us/app/alarm-clock-for-me-wake-up/id749124884",
    sizeMB: 147.2,
    rating: 4.59,
    ratingCount: 123674,
    minIOS: "13",
    lastUpdated: "2026-08-18",
    genre: "Utilities",
    missions: ["Shake", "Math"],
    sleepTracking: null,
    music: true,
    subscription: null,
    bestFor: "Waking up to your own music, with designer clocks, weather and a sleep timer",
    evidence: {
      missions: "Choose a way to stop the alarm: shake your device or solve a math problem",
      music: "Create your own wake-up playlist with the best music",
      weather: "Check live weather conditions and temperature",
      sleepTimer: "Go to sleep to your favorite songs or white noise",
    },
    notes:
      "An all-in-one clock app (alarm, designer clocks, sleep timer, weather, countdown, flashlight, timer). Has a sleep timer but the listing does not mention sleep tracking (null). No subscription or premium tier mentioned (null). Very large rating base (123,674). Supports iOS 13+.",
  },
  {
    id: 476555713,
    slug: "alarm-clock-hd",
    name: "Alarm Clock HD",
    shortName: "Alarm Clock HD",
    developer: "Impala Studios B.V.",
    appStoreUrl: "https://apps.apple.com/us/app/alarm-clock-hd/id476555713",
    sizeMB: 245.4,
    rating: 4.53,
    ratingCount: 104526,
    minIOS: "17.6",
    lastUpdated: "2026-11-03",
    genre: "Utilities",
    missions: [],
    sleepTracking: true,
    music: true,
    subscription: true,
    bestFor: "A nightstand clock that wakes you to Apple Music, with sleep tracking and weather",
    evidence: {
      sleepTracking: "Are you curious to see how much you slept? Then, track your sleep in the app.",
      music: "Unlimited Alarms: Apple Music or Alarm Sounds",
      weather: "Local Weather Information",
      subscription: "Upgrade to a Premium Membership and receive the following ongoing value:",
    },
    notes:
      "Not a mission alarm: the listing names no dismissal challenges. Premium Membership is described as Ad-Free, News & X feeds and premium support. Listing itself says to keep the app open and running for 'Music' alarm sounds to play. Large rating base (104,526).",
  },
  {
    id: 320606217,
    slug: "sleep-cycle",
    name: "Sleep Cycle - Tracker & Sounds",
    shortName: "Sleep Cycle",
    developer: "Sleep Cycle AB",
    appStoreUrl: "https://apps.apple.com/us/app/sleep-cycle-tracker-sounds/id320606217",
    sizeMB: 320.7,
    rating: 4.68,
    ratingCount: 32066,
    minIOS: "16.2",
    lastUpdated: "2026-11-12",
    genre: "Health & Fitness",
    missions: [],
    sleepTracking: true,
    music: null,
    subscription: true,
    bestFor: "Serious sleep tracking and a Smart Alarm that wakes you in your lightest sleep phase",
    evidence: {
      sleepTracking: "Track every night using patented sound technology or accelerometer-based sleep detection, no wearables needed.",
      smartAlarm: "Wake up gently during your lightest sleep phase with our Smart Alarm clock.",
      snore: "Detect nighttime noises like snoring, coughing, or sleep talking",
      subscription: "Premium tools like supportive soundscapes, sleep stories, data export, Philips HUE sunrise and Apple Health sync.",
    },
    notes:
      "A sleep tracker first, not a mission alarm: no dismissal challenges are named. The listing mentions 'Premium tools' (marked subscription: true as a premium tier) but does not describe the billing model. Also offers an AI sleep coach (Luma), sleep sounds and stories. Different job from Rise Mission: it optimises when you wake, not whether you get up.",
  },
  {
    id: 6760252122,
    slug: "one-percent-alarm",
    name: "1% Alarm: Scan to Wake Up",
    shortName: "1% Alarm",
    developer: "Zalan Zelles",
    appStoreUrl: "https://apps.apple.com/us/app/1-alarm-scan-to-wake-up/id6760252122",
    sizeMB: 218.7,
    rating: 4.67,
    ratingCount: 722,
    minIOS: "16.4",
    lastUpdated: "2026-11-09",
    genre: "Health & Fitness",
    missions: ["Object hunt", "Push-ups", "Squats", "Toothbrush"],
    sleepTracking: null,
    music: null,
    subscription: true,
    bestFor: "Movement-only challenges for heavy sleepers, including a toothbrush challenge",
    evidence: {
      objectHunt: "When the alarm rings, find and scan the selected object to prove you’re out of bed.",
      pushUps: "Get up and complete your push ups to stop the alarm.",
      squats: "Start moving immediately by completing a set of squats.",
      toothbrush: "Brush your teeth and start the day with one task already completed.",
      subscription: "1% ALARM REQUIRES A PREMIUM SUBSCRIPTION. START YOUR FREE TRIAL TODAY.",
      "challengeChains (release notes)": "Added challenge chains and a random challenge option.",
    },
    notes:
      "Every named challenge requires getting out of bed. Premium subscription required (free trial offered). Latest release adds challenge chains and a random challenge option. Smaller rating base (722).",
  },
  {
    id: 1146308678,
    slug: "loud-alarm-clock",
    name: "Loud Alarm Clock – the LOUDEST",
    shortName: "Loud Alarm Clock",
    developer: "Jason Tongbai",
    appStoreUrl: "https://apps.apple.com/us/app/loud-alarm-clock-the-loudest/id1146308678",
    sizeMB: 211.2,
    rating: 4.84,
    ratingCount: 39056,
    minIOS: "13.0",
    lastUpdated: "2025-02-15",
    genre: "Utilities",
    missions: [],
    sleepTracking: null,
    music: null,
    subscription: null,
    bestFor: "Very loud, randomised alarm sounds and a cutoff time after which you can't snooze",
    evidence: {
      loud: "Volume-boosted audio files!",
      randomSounds: "Play random sounds each morning so you can't get used to it",
      snoozeCutoff: "Set a time at which you can't snooze anymore!",
      voiceCommands: "Say “Jarvis set alarm for 7:30 AM” to set an alarm",
      weather: "Weather for your location",
    },
    notes:
      "Not a mission alarm: no dismissal challenges are named; its approach is loudness plus a snooze cutoff. Voice commands ('Jarvis') set alarms and the flashlight, they are not a wake-up challenge. Highest average rating in this set (4.84 from 39,056). Subscription not mentioned. Last updated 2025-02-15.",
  },
  {
    id: 823532916,
    slug: "mathe-alarm-clock",
    name: "Mathe Alarm Clock - Math Alarm",
    shortName: "Mathe",
    developer: "Jarig Duval",
    appStoreUrl: "https://apps.apple.com/us/app/mathe-alarm-clock-math-alarm/id823532916",
    sizeMB: 87.9,
    rating: 4.5,
    ratingCount: 8490,
    minIOS: "13.0",
    lastUpdated: "2024-10-23",
    genre: "Utilities",
    missions: ["Math"],
    sleepTracking: null,
    music: true,
    subscription: false,
    bestFor: "A focused, free math alarm with loud procedural ringtones and bedtime reminders",
    evidence: {
      math: "Solve multiple-choice math problems in order to kickstart your brain and shut off the alarm.",
      free: "* ALL FEATURES FOR FREE *",
      music: "Wake up to your music, mix in ringtones with the songs you love",
      bedtime: "Bedtime Reminder",
    },
    notes:
      "Math is the only mission (multiple choice). The listing says all features are free, so subscription is false. Also has a bedtime reminder and enforcer, a morning routine checklist and lockable alarms. Last updated 2024-10-23. Supports iOS 13+.",
  },
  {
    id: 1247289889,
    slug: "challenges-alarm-clock",
    name: "Challenges Alarm Clock",
    shortName: "Challenges Alarm Clock",
    developer: "duytu tran",
    appStoreUrl: "https://apps.apple.com/us/app/challenges-alarm-clock/id1247289889",
    sizeMB: 45.9,
    rating: 3.79,
    ratingCount: 2325,
    minIOS: "26.0",
    lastUpdated: "2026-07-06",
    genre: "Utilities",
    missions: ["Math", "Maze", "Shake", "Remember number", "Lucky 777"],
    sleepTracking: null,
    music: null,
    subscription: true,
    bestFor: "Game-style challenges such as a maze and Lucky 777, in a small app",
    evidence: {
      missions: "it won’t stop until you beat a challenge game — MATH, MAZE, SHAKE, REMEMBER NUMBER or LUCKY 777.",
      noStopButton: "the first alarm clock with no “Stop” or “Snooze” button.",
      subscription: "This app requires monthly or yearly subscriptions then you are able to access all features",
      "strictMode (release notes)": "Add strict mode",
    },
    notes:
      "Second-smallest binary here (45.9 MB) and, like Rise Mission, requires iOS 26. The 'no Stop button' wording is the developer's own claim; we have not verified it. Lower average rating in this set (3.79 from 2,325). Also has a bedtime reminder.",
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
