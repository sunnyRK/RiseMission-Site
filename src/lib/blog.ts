/**
 * Blog registry — the "frontmatter" for every post (pattern from pagedrop).
 *
 * Publishing a post = 4 steps, enforced by src/lib/__tests__/blog.test.ts:
 *   1. add an entry here
 *   2. add src/app/blog/<slug>/page.tsx using <BlogLayout post={getPost(slug)}>
 *   3. put the slug in at least one topic in BLOG_TOPICS (hub-and-spoke)
 *   4. (optional) designed cover at public/blog/covers/<slug>.png — otherwise
 *      the generated /og cover is used
 * Sitemap, RSS, llms.txt and the topic hubs update automatically.
 *
 * `updated` is ONLY for a real content change (it feeds dateModified + the
 * sitemap). Never bump dates to fake freshness — Google treats that as spam.
 */

export type BlogPost = {
  slug: string;
  /** H1 on the page. */
  title: string;
  /** <title>; ≤ 44 chars (template adds " | Rise Mission"). Falls back to title. */
  metaTitle?: string;
  /** Card/listing summary. */
  description: string;
  /** ≤ 155 chars. Falls back to description. */
  metaDescription?: string;
  /** Short line used on the generated cover image. */
  eyebrow: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  readMinutes: number;
  coverImage?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-wake-up-as-a-heavy-sleeper",
    title: "How to Wake Up When You're a Heavy Sleeper (What Actually Works)",
    metaTitle: "How to Wake Up as a Heavy Sleeper",
    description:
      "Why some people sleep through every alarm, and the specific, tested changes that get a heavy sleeper out of bed: alarm placement, light, sound, and making your brain do something.",
    metaDescription:
      "Sleep through alarms? Why heavy sleepers miss them and 9 fixes: alarm placement, light, sound choice, and wake-up challenges that need a working brain.",
    eyebrow: "Heavy sleepers",
    date: "2026-11-15",
    readMinutes: 9,
  },
  {
    slug: "how-to-stop-hitting-snooze",
    title: "How to Stop Hitting Snooze: A Practical Guide for Chronic Snoozers",
    metaTitle: "How to Stop Hitting Snooze",
    description:
      "What the research says about snoozing, why your half-asleep brain always wins the negotiation, and a step-by-step plan to break the snooze habit in two weeks.",
    metaDescription:
      "Why you keep hitting snooze, what research says it does to mornings, and a 2-week plan to stop: one alarm, a reason to stand up, and a wake-up challenge.",
    eyebrow: "Snooze habit",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "benefits-of-waking-up-early",
    title: "The Real Benefits of Waking Up Early (and When It Isn't Worth It)",
    metaTitle: "Benefits of Waking Up Early",
    description:
      "An honest look at what waking up early does and doesn't do: consistency, morning light, quiet time and exercise, plus who should not force a 5 AM alarm.",
    metaDescription:
      "What waking up early really improves (consistency, light, quiet time, exercise), what the research doesn't support, and how to shift your wake time safely.",
    eyebrow: "Early rising",
    date: "2026-11-15",
    readMinutes: 9,
  },
  {
    slug: "best-alarm-apps-for-heavy-sleepers",
    title: "10 Best Alarm Apps for iPhone for Heavy Sleepers (2026)",
    metaTitle: "Best Alarm Apps for iPhone (Heavy Sleepers)",
    description:
      "Alarmy, Erly, Rise Mission, Wayk, Sleep Cycle and more, compared on missions, size, ratings and paid tiers using each app's own App Store listing.",
    metaDescription:
      "10 iPhone alarm apps for heavy sleepers compared: missions, App Store size, ratings and paid tiers, from each app's own listing. Grouped by need, not hype.",
    eyebrow: "App comparisons",
    date: "2026-11-15",
    readMinutes: 10,
  },
  {
    slug: "alarmy-alternatives",
    title: "8 Alarmy Alternatives for iPhone (Smaller, Different Missions)",
    metaTitle: "Alarmy Alternatives for iPhone (2026)",
    description:
      "Leaving Alarmy? Eight iPhone mission alarms compared by what they do differently: size, missions, accountability and payment model.",
    metaDescription:
      "The best Alarmy alternatives for iPhone: Rise Mission, Erly, Wayk, SuperAlarm, 1% Alarm and more, compared on size, missions and paid tiers.",
    eyebrow: "App comparisons",
    date: "2026-11-15",
    readMinutes: 7,
  },
  {
    slug: "rise-mission-vs-alarmy",
    title: "Rise Mission vs Alarmy: Which Mission Alarm Fits You?",
    metaTitle: "Rise Mission vs Alarmy",
    description:
      "A side-by-side comparison of Rise Mission and Alarmy: missions, size, sleep tracking, iOS support and paid plans, including where Alarmy wins.",
    metaDescription:
      "Rise Mission vs Alarmy compared side by side: missions, App Store size, ratings, sleep tracking and paid plans. Honest about where each one wins.",
    eyebrow: "Head to head",
    date: "2026-11-15",
    readMinutes: 6,
  },
  {
    slug: "rise-mission-vs-erly",
    title: "Rise Mission vs Erly: Accountability or a Lighter App?",
    metaTitle: "Rise Mission vs Erly",
    description:
      "Erly locks your wake-up goal and tracks streaks; Rise Mission offers ten on-device challenges in a much smaller app. Which fits your mornings?",
    metaDescription:
      "Rise Mission vs Erly compared: missions, streaks, locked goals, bedtime app limits, App Store size and paid plans, with where each app is better.",
    eyebrow: "Head to head",
    date: "2026-11-15",
    updated: "2026-11-17",
    readMinutes: 6,
  },
  {
    slug: "wake-up-challenges-explained",
    title: "Wake-Up Challenges Explained: Which Alarm Mission Actually Gets You Up",
    metaTitle: "Wake-Up Challenges Explained",
    description: "What alarm missions and wake-up challenges are, why a task beats a single tap during sleep inertia, how body and brain challenges differ, and which one fits the way you sleep.",
    metaDescription: "What alarm missions are, why a task beats a tap when you're groggy, body vs brain challenges, which suits your sleep, and the safety rules every one needs.",
    eyebrow: "Wake-up challenges",
    date: "2026-11-15",
    readMinutes: 9,
  },
  {
    slug: "push-up-alarm-clock",
    title: "Push-Up Alarm Clock: How It Works and How to Set It Up",
    metaTitle: "Push-Up Alarm Clock: How It Works",
    description: "How a push-up alarm counts real reps with the camera and on-device body-pose detection, what research says about exercise right after waking, setup tips that make counting reliable, and who should skip it.",
    metaDescription: "How push-up alarms count reps with on-device body-pose detection, what research says about exercise on waking, placement tips, and who should skip it.",
    eyebrow: "Push-up alarm",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "squat-alarm-clock",
    title: "Squat Alarm Clock: How Camera Rep Counting Works (and How to Set It Up)",
    metaTitle: "Squat Alarm Clock: How It Counts Reps",
    description:
      "How a squat alarm counts real squats with the camera and on-device body-pose detection, the exact rules a rep has to pass, where to put the phone, and who should pick a different challenge.",
    metaDescription:
      "How a squat alarm counts real squats with on-device pose detection, the knee-angle rules a rep must pass, where to put your phone, and who should skip it.",
    eyebrow: "Squat alarm",
    date: "2026-11-17",
    readMinutes: 9,
  },
  {
    slug: "qr-code-alarm-clock",
    title: "QR Code Alarm Clock: The Scan-It-in-Another-Room Method",
    metaTitle: "QR Code Alarm Clock: Scan to Wake Up",
    description: "Why walking to another room and scanning a code beats putting the alarm across the room, where to put the code, whether to print it or use a screen, and how to plan for a lost code.",
    metaDescription: "How a QR code alarm works, why distance plus a task beats sleep inertia, the best places for the code, print vs screen, and what to do if the code is lost.",
    eyebrow: "QR code alarm",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "math-alarm-clock",
    title: "Math Alarm Clock: Why Arithmetic Beats Autopilot (and When It Stops)",
    metaTitle: "Math Alarm Clock: Does It Work?",
    description: "Why solving arithmetic is hard for a half-asleep brain, how to choose a difficulty that wakes you without frustrating you, and what to do when you start solving it on autopilot.",
    metaDescription: "Why math alarms work against sleep inertia, how to pick the right difficulty, the lying-down weak spot, and what to do when you solve it on autopilot.",
    eyebrow: "Math alarm",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "step-alarm-clock",
    title: "Step Alarm Clock: Walk Your Way Awake",
    metaTitle: "Step Alarm Clock: Walk to Turn It Off",
    description: "How a walking alarm counts steps with the phone's motion coprocessor, why walking to the light gets you out of bed, route ideas for any home, and the limits of step counting.",
    metaDescription: "How step alarms count steps with the iPhone motion coprocessor, why walking to light helps you wake, route ideas for any home, and step-counting limits.",
    eyebrow: "Walk alarm",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "sleep-inertia",
    title: "Sleep Inertia: Why You Feel Groggy After Waking and How Long It Lasts",
    metaTitle: "Sleep Inertia: What It Is, How Long It Lasts",
    description: "What sleep inertia is, how long morning grogginess really lasts, why it's worse some mornings, which fixes have evidence (and which don't), and why it makes you hit snooze.",
    metaDescription: "Sleep inertia is the groggy state after waking. How long it lasts, why sleep loss worsens it, what helps and why it makes you hit snooze.",
    eyebrow: "Sleep science",
    date: "2026-11-15",
    readMinutes: 9,
  },
  {
    slug: "why-do-i-sleep-through-my-alarm",
    title: "Why Do I Sleep Through My Alarm? 6 Causes and What to Do",
    metaTitle: "Why Do I Sleep Through My Alarm?",
    description: "The real reasons people sleep through alarms, from sleep debt and deep sleep to habituation and sleep disorders, with a table to match your situation to a fix and clear signs it's time to see a doctor.",
    metaDescription: "Sleep through your alarm? The 6 common causes (sleep debt, deep sleep, schedule, habit, setup, disorders), what to try and when to see a doctor.",
    eyebrow: "Heavy sleepers",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "how-to-wake-up-at-5am",
    title: "How to Wake Up at 5 AM: A 2-Week Plan That Doesn't Wreck Your Sleep",
    metaTitle: "How to Wake Up at 5 AM (2-Week Plan)",
    description: "A practical plan for waking up at 5 AM: bedtime math, shifting in 15-minute steps, morning light, the first ten minutes, weekends, and who shouldn't force an early alarm.",
    metaDescription: "Wake up at 5 AM without wrecking your sleep: what time to go to bed, a 2-week 15-minute shift schedule, morning light, weekends, and who shouldn't try it.",
    eyebrow: "Early rising",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "does-iphone-alarm-ring-on-silent",
    title: "Does the iPhone Alarm Ring on Silent? What Apple Says (and Why Some Apps Didn't)",
    metaTitle: "Does iPhone Alarm Ring on Silent?",
    description: "Yes: the iPhone Clock alarm rings on Silent and Do Not Disturb. What Apple says about volume, headphones and vibration-only alarms, why third-party alarm apps often couldn't ring on Silent, and how AlarmKit changes that.",
    metaDescription: "Yes, the iPhone Clock alarm rings on Silent and Do Not Disturb. Volume, headphones, vibrate-only fixes, a checklist, and AlarmKit apps explained.",
    eyebrow: "iPhone alarms",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "iphone-alarm-not-going-off",
    title: "iPhone Alarm Not Going Off? Every Cause and How to Fix It",
    metaTitle: "iPhone Alarm Not Going Off? Every Fix",
    description: "A complete checklist for an iPhone alarm that didn't ring: alarm toggles, sound set to None, volume, StandBy, sleep schedules, time changes and third-party apps, using Apple's own documentation.",
    metaDescription: "iPhone alarm didn't go off? A full checklist from Apple's docs: toggles, sound set to None, volume, StandBy, sleep schedules, time changes and alarm apps.",
    eyebrow: "iPhone alarms",
    date: "2026-11-15",
    readMinutes: 9,
  },
  {
    slug: "loudest-alarm-sound-iphone",
    title: "How to Make Your iPhone Alarm as Loud as Possible",
    metaTitle: "Loudest iPhone Alarm: How to Max It Out",
    description: "Every setting that controls how loud your iPhone alarm is, the hidden ones that make it quieter, how to choose a tone, where to put the phone, and why volume alone fails heavy sleepers.",
    metaDescription: "Make your iPhone alarm as loud as it goes: the right volume slider, Change with Buttons, Volume Limit, tone and placement, and why loud isn't enough.",
    eyebrow: "iPhone alarms",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "iphone-alarm-volume-low",
    title: "iPhone Alarm Volume Low? Why It's Quiet and How to Fix It",
    metaTitle: "iPhone Alarm Volume Low? Why and How to Fix",
    description: "Why your iPhone alarm is quiet: the ringer-linked slider, Change with Buttons, Attention Aware Features, headphones, speaker limits and the sleep schedule alarm's own volume, checked against Apple's pages.",
    metaDescription: "Why your iPhone alarm is too quiet: ringer-linked volume, Change with Buttons, Attention Aware Features, headphones and speaker limits, with fixes.",
    eyebrow: "iPhone alarms",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "alarm-app-for-adhd",
    title: "Waking Up With ADHD: What Research Says and Where an Alarm App Helps",
    metaTitle: "Alarm App for ADHD: Waking Up Strategies",
    description: "Why waking up is harder with ADHD (research on delayed body clocks and insomnia), practical strategies like structure, light, novelty and body doubling, and the honest limits of any alarm app.",
    metaDescription: "Why ADHD makes mornings harder, what research says about delayed body clocks, practical wake-up strategies, and what an alarm app can and can't do for you.",
    eyebrow: "ADHD mornings",
    date: "2026-11-15",
    readMinutes: 9,
  },
  {
    slug: "alarm-that-makes-you-get-out-of-bed",
    title: "Alarms That Make You Get Out of Bed: Every Approach Compared",
    metaTitle: "Alarms That Make You Get Out of Bed",
    description: "QR codes in another room, object finding, step goals, push-ups, a phone across the room and smart plugs, compared on whether they really get you up and how people cheat them.",
    metaDescription: "Alarms you can't stop from bed, compared: QR codes, object find, step goals, push-ups, a phone across the room and smart plugs, and how not to cheat.",
    eyebrow: "Wake-up challenges",
    date: "2026-11-15",
    readMinutes: 8,
  },
  {
    slug: "morning-routine-that-sticks",
    title: "How to Build a Morning Routine That Sticks: Streaks, Levels and the 7-Day Challenge",
    metaTitle: "How to Build a Morning Routine That Sticks",
    description:
      "What habit research says about making a morning routine automatic, where streaks, XP and levels help or backfire, and a 7-day plan with slack built in for the bad mornings.",
    metaDescription:
      "Make a morning routine automatic: what habit research says, when streaks and levels help or backfire, and a 7-day plan that survives bad mornings.",
    eyebrow: "Morning routine",
    date: "2026-11-17",
    readMinutes: 10,
  },
];

export type BlogTopic = {
  slug: string;
  name: string;
  /** Hub H1. */
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  /** Direct 40–60 word answer shown under the H1 (answer engines quote this). */
  answer: string;
  posts: string[];
};

/** Hub-and-spoke clusters. Every post must belong to ≥ 1 topic. */
export const BLOG_TOPICS: BlogTopic[] = [
  {
    slug: "heavy-sleepers",
    name: "Heavy sleepers",
    title: "Waking up as a heavy sleeper",
    metaTitle: "Guides for Heavy Sleepers",
    description:
      "Guides for people who sleep through alarms: why it happens, what helps, and how to build a wake-up you can't sleep through.",
    intro:
      "If you've ever slept through three alarms and woken up to a missed meeting, these guides are for you. They focus on what changes behaviour on a real morning, not generic sleep tips.",
    answer:
      "Heavy sleepers usually miss alarms for a few reasons: too little sleep, waking from deep sleep, an alarm the brain has learned to ignore, or a setup that lets you switch it off without standing up. The guides below cover each cause with sourced fixes for placement, light, sound and wake-up challenges, and say when to see a doctor.",
    posts: ["how-to-wake-up-as-a-heavy-sleeper", "how-to-stop-hitting-snooze", "sleep-inertia", "why-do-i-sleep-through-my-alarm", "does-iphone-alarm-ring-on-silent", "loudest-alarm-sound-iphone", "iphone-alarm-volume-low", "alarm-that-makes-you-get-out-of-bed"],
  },
  {
    slug: "snooze-habit",
    name: "Snooze habit",
    title: "Breaking the snooze habit",
    metaTitle: "How to Break the Snooze Habit",
    description:
      "What snoozing really does to your morning, what the research says, and practical two-week plans to stop hitting the snooze button for good.",
    intro:
      "Snoozing feels like a gift and acts like a trap. These guides explain the research and give you a plan that works with a half-asleep brain, not against it.",
    answer:
      "Snoozing breaks the last part of your night into short, fragmented naps, and research has not shown that it leaves you more rested. Breaking the habit usually takes one alarm instead of several, a reason to stand up when it rings, and enough sleep the night before. These guides explain the research and give a two-week plan.",
    posts: ["how-to-stop-hitting-snooze", "how-to-wake-up-as-a-heavy-sleeper", "sleep-inertia", "how-to-wake-up-at-5am", "alarm-that-makes-you-get-out-of-bed", "morning-routine-that-sticks"],
  },
  {
    slug: "waking-up-early",
    name: "Waking up early",
    title: "Becoming a morning person",
    metaTitle: "Waking Up Early: Guides & Science",
    description:
      "The honest benefits of waking up early, how to shift your wake time safely in 15-minute steps, and morning routines that actually stick.",
    intro:
      "Waking up early isn't magic, but a consistent, earlier morning gives you light, quiet time and room to exercise. Here's how to do it without wrecking your sleep.",
    answer:
      "Waking up early helps most when it makes your schedule consistent and gives you morning light, quiet time or room to exercise. It does not suit everyone: night owls who cut sleep to rise early tend to lose more than they gain. These guides cover the evidence, a plan that shifts your wake time in 15-minute steps, and lasting routines.",
    posts: ["morning-routine-that-sticks", "benefits-of-waking-up-early", "how-to-stop-hitting-snooze", "how-to-wake-up-at-5am", "alarm-app-for-adhd"],
  },
  {
    slug: "sleep-science",
    name: "Sleep science",
    title: "The science of waking up",
    metaTitle: "Sleep Science: How Waking Up Works",
    description:
      "Sleep inertia, sleep cycles and why some people sleep through alarms, explained with sources and honest about what the research doesn't show.",
    intro:
      "Why mornings feel the way they do: grogginess, deep sleep, body clocks and alarms. Every claim links to its source, and every guide says where the evidence runs out.",
    answer:
      "Mornings feel hard because of sleep inertia, the groggy spell after waking that can last from a few minutes to over an hour. It is worse after short sleep and when an alarm wakes you from deep sleep. These guides explain sleep inertia, sleep cycles and body clocks, cite every claim, and say where the evidence runs out.",
    posts: ["sleep-inertia", "why-do-i-sleep-through-my-alarm", "alarm-app-for-adhd"],
  },
  {
    slug: "wake-up-challenges",
    name: "Wake-up challenges",
    title: "Wake-up challenges and mission alarms",
    metaTitle: "Wake-Up Challenges & Mission Alarms",
    description:
      "How alarm missions work and which one suits you: push-ups, QR codes, math, walking and more, with the research on what actually wakes you up.",
    intro:
      "A wake-up challenge keeps the alarm ringing until you've done something a sleeping brain can't. These guides explain each type, who it suits, and where it stops working.",
    answer:
      "A wake-up challenge, or alarm mission, asks you to do a task before the alarm stops: push-ups or squats counted by the camera, a walk, scanning a QR code in another room, or math. A task needs a working brain or your feet on the floor, which a tap does not. These guides explain each type and who it suits.",
    posts: ["wake-up-challenges-explained", "push-up-alarm-clock", "squat-alarm-clock", "qr-code-alarm-clock", "math-alarm-clock", "step-alarm-clock", "alarm-that-makes-you-get-out-of-bed"],
  },
  {
    slug: "iphone-alarms",
    name: "iPhone alarms",
    title: "iPhone alarm help",
    metaTitle: "iPhone Alarm Problems & Fixes",
    description:
      "Why an iPhone alarm doesn't go off, rings too quietly or stays silent, and how to fix it, checked against Apple's own support pages for iOS 26 and iOS 27.",
    intro:
      "Every fix here is checked against Apple's support documentation, with the exact setting names, and we say plainly when Apple doesn't document something.",
    answer:
      "Most iPhone alarm problems come down to a few settings: an alarm sound set to None, the ringer-linked volume slider, Attention Aware Features, headphones, or a sleep schedule alarm with its own volume. The iPhone Clock alarm does ring on Silent and in Focus. These guides walk through each fix using Apple's own support pages.",
    posts: ["iphone-alarm-not-going-off", "loudest-alarm-sound-iphone", "iphone-alarm-volume-low", "does-iphone-alarm-ring-on-silent"],
  },
  {
    slug: "alarm-apps",
    name: "Alarm app comparisons",
    title: "Alarm app comparisons",
    metaTitle: "Alarm App Comparisons & Reviews",
    description:
      "Honest comparisons of iPhone alarm apps for heavy sleepers, using each app's own App Store listing: missions, size, ratings and paid tiers.",
    intro:
      "We make Rise Mission, so we hold these comparisons to a simple rule: every fact comes from each app's own App Store listing, dated, and every app is described by what it's genuinely good at.",
    answer:
      "The best alarm app depends on why you oversleep. Mission alarms such as Alarmy, Erly and Rise Mission make you complete a task before the alarm stops, while sleep-tracking apps try to wake you in light sleep. We make Rise Mission, so every comparison here uses each app's own App Store listing, dated, and says where other apps are stronger.",
    posts: ["best-alarm-apps-for-heavy-sleepers", "alarmy-alternatives", "rise-mission-vs-alarmy", "rise-mission-vs-erly", "iphone-alarm-not-going-off", "alarm-app-for-adhd"],
  },
];

export function getPost(slug: string): BlogPost {
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown blog post: ${slug}`);
  return p;
}

export function getTopic(slug: string): BlogTopic | undefined {
  return BLOG_TOPICS.find((t) => t.slug === slug);
}

export function topicsForPost(slug: string): BlogTopic[] {
  return BLOG_TOPICS.filter((t) => t.posts.includes(slug));
}

export function sortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function postPath(slug: string) {
  return `/blog/${slug}`;
}

export function postCover(post: BlogPost) {
  return post.coverImage ?? `/covers/${post.slug}.png`;
}

/** FNV-1a — stable, order-independent tie-break so older posts keep getting links. */
function pairRank(a: string, b: string): number {
  const s = a < b ? `${a}|${b}` : `${b}|${a}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Related posts: rank by shared topics, tie-break by a stable hash (NOT date).
 * pagedrop learned that date ordering funnels every link to the newest posts
 * and starves older ones into "Discovered – currently not indexed".
 */
export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const mine = new Set(topicsForPost(slug).map((t) => t.slug));
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      shared: topicsForPost(p.slug).filter((t) => mine.has(t.slug)).length,
      rank: pairRank(slug, p.slug),
    }))
    .sort((a, b) => b.shared - a.shared || a.rank - b.rank)
    .slice(0, limit)
    .map((x) => x.p);
}
