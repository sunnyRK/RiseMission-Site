import type { QA } from "./seo";
import { ACHIEVEMENT_COUNT, CHALLENGES, LIVE_VERSION, RANKS, RISE_CHALLENGE, SOUNDS } from "./site";

/**
 * Answer-engine Q&As: the questions people type into ChatGPT, Perplexity and
 * Google about apps like ours. Each answer is a direct 40–60 word answer that
 * stands on its own when quoted (tests enforce the length). Honest: no claims
 * about competitors we can't verify, no prices, no offers.
 * Used by /whats-new (visible FAQ + FAQPage JSON-LD) and llms.txt.
 */
const rankNames = RANKS.map((r) => r.name).join(", ");

export const PRODUCT_FAQ: QA[] = [
  {
    q: "What alarm app makes you do push-ups to turn it off?",
    a: `Rise Mission for iPhone has a Push-ups challenge: the front camera counts each full rep on-device with Apple's Vision framework, and the challenge ends when you reach your target. Other apps differ: Alarmy's listing names a squat mission, and 1% Alarm's names push-ups and squats. Rise Mission needs iOS 26, and iOS always shows a system Stop button too.`,
  },
  {
    q: "Is there an alarm app with levels and streaks?",
    a: `Yes. Rise Mission ${LIVE_VERSION} gives XP for every completed wake-up, with bonuses for no snooze and a finished morning routine, and a streak multiplier. You climb six ranks: ${rankNames}. It also has Streak Shields, ${ACHIEVEMENT_COUNT} achievements and the ${RISE_CHALLENGE.name}.`,
  },
  {
    q: "What is the best alarm app for heavy sleepers on iPhone in 2026?",
    a: `It depends on why you oversleep. If you switch alarms off half-asleep, pick a mission alarm such as Alarmy, Erly or Rise Mission (we make Rise Mission). If you wake groggy, a sleep-phase alarm like Sleep Cycle targets that. Our comparison of 10 apps uses each app's own App Store listing.`,
  },
  {
    q: "What is the 7-Day Rise Challenge?",
    a: `It's Rise Mission's starter goal: complete ${RISE_CHALLENGE.goal} wake-up challenges within ${RISE_CHALLENGE.windowDays} days. New users start it automatically on their first real wake-up. The three spare days mean one bad morning doesn't end it, and finishing it earns the Rise Challenge achievement.`,
  },
  {
    q: "Does Rise Mission have alarm sounds?",
    a: `Yes. Version ${LIVE_VERSION} has ${SOUNDS.count} sounds for the ringing screen in ${SOUNDS.styles.join(", ")} styles, and the gentle ones fade in. The system alarm on the Lock Screen still uses the standard iOS alarm sound, so the new sounds are for the in-app ringing screen.`,
  },
  {
    q: "How many wake-up challenges does Rise Mission have?",
    a: `${CHALLENGES.length}: ${CHALLENGES.map((c) => c.name).join(", ")}. Push-ups, Squats, Object Find and QR code use the camera, Walk counts steps, and Voice uses on-device speech recognition. Every physical challenge has a mental backup if the camera can't see you.`,
  },
];

export const wordCount = (s: string) => s.trim().split(/\s+/).length;
