import { SITE_URL } from "./site";

/**
 * Every public image/video of the app, described once. Feeds /gallery, its
 * JSON-LD (ImageGallery + VideoObject), the image/video sitemap and llms.txt.
 * Only current-version media (v1.4+ marketing screens, v1.5 reel). The old
 * v1.0 raw screenshots in /assets/screenshots are intentionally NOT listed.
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

export type GalleryShot = { src: string; title: string; caption: string; alt: string };

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    id: "reel-16x9",
    title: "Rise Mission in 30 seconds",
    description: "Animated explainer of how Rise Mission works, from the alarm ringing to a wake-up streak.",
    src: "/assets/reel/rise-mission-reel-16x9.mp4",
    poster: "/assets/reel/rise-mission-reel-16x9-poster.jpg",
    width: 1920,
    height: 1080,
    durationSec: 31,
    uploadDate: "2026-11-15T10:00:00+00:00",
    transcript: [
      "The alarm you can't snooze away.",
      "It rings for real: built on Apple's AlarmKit, so it rings on Silent, breaks through Focus and works with the app closed.",
      "Pick your mission from 10 wake-up challenges: push-ups, math, squats, typing, walk, memory, shake, voice, object find and QR code.",
      "Prove you're awake: the camera counts every push-up on-device until you reach 10 reps.",
      "Build the habit with a wake-up streak.",
    ],
  },
  {
    id: "demo",
    title: "Rise Mission app demo",
    description: "Screen recording of the real app: the alarm rings, you complete a wake-up challenge and the alarm stops.",
    src: "/assets/demo.mp4",
    poster: "/assets/demo-poster.jpg",
    width: 1280,
    height: 720,
    durationSec: 30,
    uploadDate: "2026-08-26T09:00:00+00:00",
    transcript: [
      "A recording of Rise Mission on iPhone.",
      "The alarm screen shows the time and the wake-up challenge you chose.",
      "You complete the challenge to stop the alarm, then land on the success screen.",
    ],
  },
  {
    id: "reel-9x16",
    title: "Rise Mission vertical reel",
    description: "The same 30-second explainer in vertical 9:16 format for phones, Instagram Reels and YouTube Shorts.",
    src: "/assets/reel/rise-mission-reel-9x16.mp4",
    poster: "/assets/reel/rise-mission-reel-9x16-poster.jpg",
    width: 1080,
    height: 1920,
    durationSec: 31,
    uploadDate: "2026-11-15T10:00:00+00:00",
    transcript: ["Vertical version of the 30-second explainer above."],
  },
];

export const GALLERY_SHOTS: GalleryShot[] = [
  {
    src: "/assets/screens/rise-mission-alarm-ringing-screen.jpg",
    title: "The alarm clock that makes you wake up",
    caption: "The ringing screen at 6:30 AM. The alarm keeps going until you tap Start Challenge and finish it.",
    alt: "Rise Mission ringing screen showing 6:30 AM, a push-ups goal and a Start Challenge button",
  },
  {
    src: "/assets/screens/rise-mission-push-up-alarm-camera-counts-reps.jpg",
    title: "Prove you're awake, camera counts reps",
    caption: "Push-ups counted by the front camera with Apple's Vision framework, processed on your iPhone.",
    alt: "Person doing push-ups in front of an iPhone while the app counts repetitions on screen",
  },
  {
    src: "/assets/screens/rise-mission-object-find-and-voice-challenge.jpg",
    title: "Find an object or say it out loud",
    caption: "Object Find asks you to point the camera at an everyday item; Voice asks you to say an affirmation.",
    alt: "Object Find challenge recognising a backpack, and the Voice challenge showing a spoken affirmation",
  },
  {
    src: "/assets/screens/rise-mission-choose-wake-up-challenge.jpg",
    title: "Pick your challenge, set your alarm",
    caption: "Choose a primary challenge and a backup, set the time and days, then run a test alarm.",
    alt: "Challenge picker with push-ups selected next to the new alarm editor with a time wheel",
  },
  {
    src: "/assets/screens/rise-mission-focus-pomodoro-timer.jpg",
    title: "Pomodoro and focus timer",
    caption: "A built-in focus timer and Pomodoro mode for the work you got up early to do.",
    alt: "Focus timer counting down and Pomodoro settings with focus and break lengths",
  },
  {
    src: "/assets/screens/rise-mission-wake-up-streak-statistics.jpg",
    title: "Track every morning",
    caption: "Wake-up history, streaks, completion rate and snoozes per wake-up.",
    alt: "Wake-up history calendar and statistics screen with current streak and completion rate",
  },
  {
    src: "/assets/screens/rise-mission-alarms-and-challenges-home.jpg",
    title: "Ready for tomorrow morning",
    caption: "Your alarms and the full challenge list on the home screen.",
    alt: "Alarms list with a 6:30 AM alarm ready and the challenges grid",
  },
];

export const abs = (p: string) => `${SITE_URL}${p}`;
