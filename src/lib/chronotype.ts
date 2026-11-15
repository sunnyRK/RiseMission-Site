/**
 * Informal chronotype quiz shared by the quiz (client) and its page (server).
 * Original questions written for this site. NOT the Horne–Östberg MEQ or the
 * MCTQ, and not a validated instrument: every answer scores 1 (earliest) to 4
 * (latest), and the total is split into three plain-language bands.
 */

export type Chronotype = "early" | "between" | "owl";

export type QuizQuestion = {
  id: string;
  q: string;
  /** Exactly four options, earliest-leaning first (scores 1..4). */
  options: readonly [string, string, string, string];
};

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "free-wake",
    q: "On a day off with no alarm and no plans, when do you usually wake up on your own?",
    options: ["Before 6:30 AM", "6:30 to 8:00 AM", "8:00 to 9:30 AM", "After 9:30 AM"],
  },
  {
    id: "bedtime",
    q: "If nothing had to happen tomorrow, when would you feel like going to bed?",
    options: ["Before 10 PM", "10 to 11:30 PM", "11:30 PM to 1 AM", "After 1 AM"],
  },
  {
    id: "focus",
    q: "When does your head feel clearest for hard, focused work?",
    options: ["Early morning", "Late morning", "Afternoon", "Evening or late at night"],
  },
  {
    id: "hunger",
    q: "How do you feel about food in the first half hour after you get up?",
    options: ["Ready for a proper breakfast", "Could eat something light", "Not really hungry yet", "The thought of food puts me off"],
  },
  {
    id: "first-hour",
    q: "On a workday, how do you feel during the first hour after your alarm?",
    options: ["Switched on almost straight away", "Fine after a few minutes", "Slow and foggy for a while", "Barely functional until mid-morning"],
  },
  {
    id: "ten-pm",
    q: "At 10 PM on a normal weeknight, you usually feel…",
    options: ["Ready to sleep", "Winding down", "Still fairly alert", "Like the day is only just getting good"],
  },
  {
    id: "day-plan",
    q: "Which plan for a free Saturday sounds best?",
    options: ["A sunrise walk or run", "A late-morning brunch", "An afternoon out", "A late dinner that runs past midnight"],
  },
  {
    id: "sleep-in",
    q: "How much later do you sleep on free days than on workdays?",
    options: ["About the same, under 30 minutes", "30 to 60 minutes", "1 to 2 hours", "More than 2 hours"],
  },
];

export const MIN_SCORE = QUESTIONS.length;
export const MAX_SCORE = QUESTIONS.length * 4;
/** Totals at or below this are "Early bird"; at or above OWL_FROM are "Night owl". */
export const EARLY_TO = 15;
export const OWL_FROM = 25;

export type ChronotypeInfo = {
  name: string;
  summary: string;
  wakeWindow: string;
  advice: readonly string[];
};

export const CHRONOTYPES: Record<Chronotype, ChronotypeInfo> = {
  early: {
    name: "Early bird",
    summary: "You lean towards mornings: you wake easily, feel sharpest early and fade in the evening.",
    wakeWindow: "Roughly 5:30 to 7:00 AM tends to suit early types",
    advice: [
      "Mornings are your easy part. Guard your bedtime instead, because late nights cost you more than they cost an owl.",
      "Put demanding work early in the day while you're sharpest.",
      "If you wake earlier than you want, get some daylight in the late afternoon and keep the morning dim for a while.",
      "Keep the same wake time on weekends; you probably do already.",
    ],
  },
  between: {
    name: "In between",
    summary: "You don't lean hard either way. Most people land here, and your schedule can usually flex with your habits.",
    wakeWindow: "Roughly 6:30 to 7:30 AM is an easy target for most in-between types",
    advice: [
      "Pick one wake time and keep it seven days a week, within about an hour.",
      "Get outside light soon after waking; it helps keep your rhythm from drifting later.",
      "If you want to become an earlier riser, move your alarm 15 minutes earlier every few days rather than all at once.",
      "Count back from your wake time with the sleep calculator to find a bedtime that gives you at least 7 hours.",
    ],
  },
  owl: {
    name: "Night owl",
    summary: "You lean late: you come alive in the evening, and early alarms feel brutal.",
    wakeWindow: "Later wake times suit you; if your job needs an early start, shift towards it gradually",
    advice: [
      "Don't jump straight to 5 AM. Move your wake time 15 minutes earlier every few days and hold each step.",
      "Get bright light, ideally daylight, within an hour of waking, and dim screens and lights in the late evening.",
      "Keep weekend wake-ups within about an hour of weekdays so Monday isn't a fresh jetlag.",
      "Put an alarm out of reach, or use one that needs you to get up, for the first weeks of the shift.",
    ],
  },
};

/** answers[i] is the chosen option index (0..3) for QUESTIONS[i], or null if unanswered. */
export type Answers = readonly (number | null)[];

export const emptyAnswers = (): (number | null)[] => QUESTIONS.map(() => null);

export function answeredCount(answers: Answers): number {
  return answers.filter((a) => a !== null && a !== undefined).length;
}

/** Total score (8..32), or null until every question is answered. */
export function quizScore(answers: Answers): number | null {
  if (answers.length !== QUESTIONS.length) return null;
  let total = 0;
  for (const a of answers) {
    if (a === null || a === undefined || a < 0 || a > 3 || !Number.isInteger(a)) return null;
    total += a + 1;
  }
  return total;
}

export function typeForScore(score: number): Chronotype {
  if (score <= EARLY_TO) return "early";
  if (score >= OWL_FROM) return "owl";
  return "between";
}

/** 0 (fully early) … 100 (fully late), for the result slider. */
export function lateness(score: number): number {
  return Math.round(((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100);
}

export function shareText(type: Chronotype, score: number, url = "https://risemission.app/chronotype-quiz"): string {
  return `My chronotype quiz result: ${CHRONOTYPES[type].name} (${score} of ${MAX_SCORE}, where higher means later). ${CHRONOTYPES[type].wakeWindow}. Take the quiz: ${url}`;
}
