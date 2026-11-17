import { SITE_URL } from "./site";

/**
 * Every public image/video of the app, described once. Feeds /gallery, its
 * JSON-LD (ImageGallery + VideoObject), the image/video sitemap and llms.txt.
 *
 * Only current-version (1.6) media is listed. Older files stay on disk because
 * existing pages, JSON-LD and old sitemap entries may still point at them
 * (/assets/screens/*, /assets/reel/rise-mission-reel-*.mp4, /assets/demo.mp4,
 * the v1.0 /assets/screenshots/*); they are just not listed here any more.
 *
 * Files live in /assets/v16/. Every image ships as .jpg + .webp + .avif at
 * 1320 x 2868 (next/image picks the format; the .jpg is the canonical URL).
 */

export type GalleryVideo = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  durationSec: number;
  uploadDate: string;
  /** Plain-text description of what happens, for people and AI engines that can't watch. */
  transcript: string[];
};

export type GalleryShot = {
  id: string;
  /** "app-store" = framed marketing image with a headline; "screen" = raw device screen. */
  kind: "app-store" | "screen";
  src: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
};

const V16 = "/assets/v16";
const UPLOAD = "2026-11-17T10:00:00+00:00";

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    id: "reel-16x9",
    title: "Rise Mission 1.6 in 30 seconds",
    description:
      "Animated explainer built from real Rise Mission 1.6 screens: the alarm rings at 6:30, you pick one of 10 wake-up challenges, the camera counts your push-ups, and you earn XP and keep your streak.",
    src: `${V16}/rise-mission-1-6-reel-16x9.mp4`,
    poster: `${V16}/rise-mission-1-6-reel-16x9-poster.jpg`,
    width: 1920,
    height: 1080,
    durationSec: 30,
    uploadDate: UPLOAD,
    transcript: [
      "Rise Mission: the alarm you can't snooze away.",
      "It rings for real. Built on Apple's AlarmKit, so it rings on Silent and in Focus, even when the app is closed. The ringing screen shows 6:30 AM and the push-ups mission.",
      "Pick from 10 challenges: push-ups, squats, math, typing, walk, memory, shake, voice, object find and QR code. Choose a main mission and a backup.",
      "Prove you're awake. A real recording of the push-ups challenge: the front camera counts each full rep on your iPhone with Apple's Vision framework, and frames are never recorded.",
      "Level up every morning. The home screen shows a 6 day streak, and the success screen shows a 7 day streak and a level up to Early Riser. You earn 10 XP for every wake-up, 5 more for waking on time without snoozing, and a streak bonus of up to two times.",
      "Focus beyond the morning: a focus timer and Pomodoro that ring even on Silent.",
      "End card: Download on the App Store, risemission.app. Alarm Clock: Rise Mission for iPhone, iOS 26 or later.",
    ],
  },
  {
    id: "app-demo",
    title: "Rise Mission 1.6 app demo",
    description:
      "Screen recording of the real Rise Mission 1.6 app on iPhone: the ringing screen, a wake-up challenge, the success screen with streak and level, the home screen and the focus timer.",
    src: `${V16}/rise-mission-1-6-app-demo.mp4`,
    poster: `${V16}/rise-mission-1-6-app-demo-poster.jpg`,
    width: 1280,
    height: 720,
    durationSec: 24,
    uploadDate: UPLOAD,
    transcript: [
      "A screen recording of Rise Mission 1.6 on an iPhone simulator with demo data.",
      "The alarm rings at 6:30 AM with a push-ups mission and a Push-ups button to start the challenge.",
      "The Memory challenge shows numbers on a grid, then hides them so you tap them back in order.",
      "The success screen confirms the challenge is done, shows the streak, an unlocked achievement and a level up.",
      "The home screen greets you, shows the next alarm and the current wake-up streak.",
      "The Focus tab runs a focus timer, then an end card links to the App Store and risemission.app.",
    ],
  },
  {
    id: "reel-9x16",
    title: "Rise Mission 1.6 vertical reel",
    description:
      "The same 30-second Rise Mission 1.6 explainer in vertical 9:16 format for phones, Instagram Reels, TikTok and YouTube Shorts.",
    src: `${V16}/rise-mission-1-6-reel-9x16.mp4`,
    poster: `${V16}/rise-mission-1-6-reel-9x16-poster.jpg`,
    width: 1080,
    height: 1920,
    durationSec: 30,
    uploadDate: UPLOAD,
    transcript: ["Vertical version of the 30-second Rise Mission 1.6 explainer above, with the same scenes and text."],
  },
];

const shot = (s: Omit<GalleryShot, "width" | "height">): GalleryShot => ({ ...s, width: 1320, height: 2868 });

/**
 * Order matters for older callers that index into this list:
 * [0] ringing screen, [3] challenges, [5] statistics. Prefer `galleryShot(id)`.
 */
export const GALLERY_SHOTS: GalleryShot[] = [
  shot({
    id: "ringing",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-alarm-ringing-screen.jpg`,
    title: "The alarm you can't snooze away",
    caption: "The ringing screen at 6:30 AM. Snooze is limited, and the alarm stops once you finish your wake-up mission.",
    alt: "Rise Mission ringing screen showing 6:30 AM, a push-ups mission, a Push-ups button and one snooze left",
  }),
  shot({
    id: "pushups",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-push-up-camera-counts-reps.jpg`,
    title: "Prove you're awake, camera counts reps",
    caption: "The front camera counts full push-ups with Apple's Vision framework, on your iPhone. Frames are never recorded.",
    alt: "Two iPhones showing a person doing push-ups while the app counts reps, 1 of 3 and 2 of 3",
  }),
  shot({
    id: "levels",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-levels-and-streaks.jpg`,
    title: "Build a streak, level up every morning",
    caption: "Every wake-up earns XP. The success screen shows your streak and levels, and home keeps your streak in view.",
    alt: "Success screen with a 7 day streak and a level up to Early Riser next to the home screen with a 6 day streak",
  }),
  shot({
    id: "challenges",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-challenges-carousel.jpg`,
    title: "10 wake-up challenges, pick yours",
    caption: "Swipe the challenge carousel or browse all missions, and try any challenge as a quick demo before you rely on it.",
    alt: "Challenges tab with a push-ups card in a carousel and a grid of missions including math, typing and QR code",
  }),
  shot({
    id: "object-voice",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-object-find-and-voice-challenge.jpg`,
    title: "Find an object or say it out loud",
    caption: "Object Find asks you to point the camera at an everyday item; Voice asks you to say a morning affirmation.",
    alt: "Object Find challenge recognising a backpack next to the Voice challenge showing a spoken affirmation",
  }),
  shot({
    id: "stats",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-statistics.jpg`,
    title: "Track streaks, XP and stats",
    caption: "Your level, how you earn XP, current and longest streak, and completion rate in one place.",
    alt: "Statistics screen with the Sleepyhead level card, XP progress and current and longest streak tiles",
  }),
  shot({
    id: "focus",
    kind: "app-store",
    src: `${V16}/rise-mission-1-6-focus-timer.jpg`,
    title: "Focus timer for deep work",
    caption: "A focus timer and Pomodoro mode for the work you got up early to do. Timers ring even on Silent.",
    alt: "Focus tab with a 25 minute timer dial, preset lengths of 15, 25 and 45 minutes and a Start button",
  }),
  shot({
    id: "home",
    kind: "screen",
    src: `${V16}/rise-mission-1-6-home-greeting.jpg`,
    title: "Good morning, your alarms and streak",
    caption: "Home greets you by name, confirms your next alarm is ready and shows this week's wake-up streak.",
    alt: "Rise Mission home screen saying Good morning, Alex, with a 5:45 AM alarm ready and a 6 day streak",
  }),
  shot({
    id: "success",
    kind: "screen",
    src: `${V16}/rise-mission-1-6-success-xp-level-up.jpg`,
    title: "Challenge done: XP, streak and level up",
    caption: "After the challenge, the success screen shows your streak, any achievement you unlocked and your new level.",
    alt: "Success screen saying Great push-ups, with a 7 day streak, the Week Warrior achievement and a level up to Early Riser",
  }),
  shot({
    id: "onboarding",
    kind: "screen",
    src: `${V16}/rise-mission-1-6-onboarding-welcome.jpg`,
    title: "Wake up on your terms",
    caption: "The first screen you see: prove you're actually up, then the alarm stops. Rings on Silent, built on Apple AlarmKit.",
    alt: "Rise Mission welcome screen with the app icon, the headline Wake up on your terms and a Get Started button",
  }),
];

export const galleryShot = (id: string): GalleryShot | undefined => GALLERY_SHOTS.find((s) => s.id === id);

/**
 * Raw (unframed) v1.6 device screens for device-frame components. Every file
 * exists as .jpg, .webp and .avif: `rise-mission-v16-<id>.<ext>`.
 * Status bar 9:41, demo data (user "Alex"), iPhone 17 Pro Max, 1320 x 2868.
 * Note: "success" shows the simulator's real wall-clock time in its
 * "Woke at ..." line, and "paywall" is the first paywall page (no prices).
 */
export type V16ScreenId =
  | "home"
  | "challenges"
  | "focus"
  | "stats"
  | "ringing"
  | "success"
  | "editor"
  | "settings"
  | "onboarding"
  | "paywall"
  | "math"
  | "memory"
  | "typing";

export type V16Screen = { id: V16ScreenId; src: string; alt: string; width: 1320; height: 2868 };

const screen = (id: V16ScreenId, alt: string): V16Screen => ({ id, src: `${V16}/rise-mission-v16-${id}.jpg`, alt, width: 1320, height: 2868 });

export const V16_SCREENS: V16Screen[] = [
  screen("home", "Rise Mission home screen: Good morning, Alex, a 5:45 AM alarm ready with a Math backup, and a 6 day streak"),
  screen("challenges", "Challenges tab: a push-ups card in a carousel of 10 challenges above a grid of all missions"),
  screen("focus", "Focus tab: a 25 minute timer dial with 15, 25 and 45 minute presets and a Start button"),
  screen("stats", "Statistics screen: Level 1 Sleepyhead with 96 XP, how you earn XP, and 6 day current and longest streaks"),
  screen("ringing", "Alarm ringing screen at 6:30 AM with a push-ups mission, a Push-ups button and one snooze left"),
  screen("success", "Success screen: Great push-ups, a 7 day streak, the Week Warrior achievement and a level up to Early Riser"),
  screen("editor", "New alarm editor with a time wheel set to 6:30 AM, the one-time option, an Add Mission row and a Math backup"),
  screen("settings", "Settings: the Level 1 profile card, Rise Mission Pro active, permissions and alarm defaults"),
  screen("onboarding", "Welcome screen: the Rise Mission app icon among 3D challenge icons, Wake up on your terms, Get Started"),
  screen("paywall", "Rise Mission Pro screen: Wake up on the first alarm, with 10 challenges, unlimited alarms, focus timer and streaks"),
  screen("math", "Math challenge: the problem 6 x 3 above a number pad"),
  screen("memory", "Memory challenge: a grid of tiles to tap back in order, round 1 of 3"),
  screen("typing", "Typing challenge: a morning phrase to type exactly above the text field and the iPhone keyboard tip"),
];

export const v16Screen = (id: V16ScreenId): V16Screen => V16_SCREENS.find((s) => s.id === id)!;

export const abs = (p: string) => `${SITE_URL}${p}`;
