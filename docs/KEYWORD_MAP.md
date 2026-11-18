# Keyword map: one keyword, one page

Started 2026-11-17 (branch `v1.6-site-seo`). Each keyword has exactly **one primary page**, so pages don't
compete with each other (cannibalization). Other pages may mention the keyword, but they link to the
primary page with the keyword in the anchor text and never target it in their `<title>` or H1.

Volumes are not measured here: there is no Search Console data yet (site live since 2026-11-15).
Revisit this map at the 4-week and 90-day Search Console checks (playbook §6).

The link graph that supports this map is data in `src/lib/links.ts` (`PAGES`, `POST_TOOL`, `TOOL_POSTS`,
`TOPIC_LINKS`, `COMPARE_LINKS`, `FOOTER_GROUPS`). `src/lib/__tests__/links.test.ts` fails if any URL
has fewer than 3 in-content inlinks.

## 1. Head terms (web search)

| Keyword | Primary page | Secondary pages (link to the primary, don't target it) | Notes |
|---|---|---|---|
| alarm clock app | `/` | `/blog/best-alarm-apps-for-heavy-sleepers`, `/rise-mission-vs-apple-clock` | Home title: "Rise Mission: Alarm Clock App for Heavy Sleepers". Very competitive; the brand page should win the long tail ("alarm clock app that makes you…"). |
| alarm app for heavy sleepers | `/blog/best-alarm-apps-for-heavy-sleepers` | `/`, `/blog/how-to-wake-up-as-a-heavy-sleeper`, `/blog/topic/heavy-sleepers` | The roundup owns the commercial "best … for heavy sleepers" query. Home owns the brand + "heavy sleepers" combination. |
| alarm that makes you get up | `/blog/alarm-that-makes-you-get-out-of-bed` | `/blog/wake-up-challenges-explained`, `/blog/qr-code-alarm-clock` | Covers "alarm that makes you get out of bed" and "alarm you can't turn off from bed". |
| push-up alarm | `/blog/push-up-alarm-clock` | `/blog/squat-alarm-clock`, `/` | Footer anchor "Push-up alarm clock". |
| math alarm | `/blog/math-alarm-clock` | `/online-alarm-clock` (tool: "online alarm clock with math") | The tool targets the *online* variant only. |
| QR code alarm | `/blog/qr-code-alarm-clock` | `/blog/alarm-that-makes-you-get-out-of-bed` | Exists; no new page needed. |
| snooze | `/blog/how-to-stop-hitting-snooze` | `/snooze-calculator` ("snooze calculator"), `/blog/topic/snooze-habit` | Tool owns "snooze calculator / cost of snoozing". |
| wake up early | `/blog/benefits-of-waking-up-early` | `/blog/how-to-wake-up-at-5am` ("wake up at 5 AM"), `/blog/topic/waking-up-early` | "how to wake up early" belongs to the hub until a dedicated how-to exists (gap G4). |
| sleep calculator | `/sleep-calculator` | `/nap-calculator`, `/sleep-debt-calculator` | Also "wake-up time calculator" (`/sleep-calculator#bed-now`). |
| online alarm clock | `/online-alarm-clock` | `/tools` | |
| set alarm, how to set an alarm on iPhone, alarm set | `/blog/how-to-set-an-alarm-on-iphone` | `/blog/iphone-alarm-not-going-off`, `/blog/does-iphone-alarm-ring-on-silent` | Added 2026-11-18 (Google Trends 2026: "set alarm clock" +70%). Steps first; troubleshooting links out to the fix posts. |
| sunrise alarm clock (vs app) | `/blog/sunrise-alarm-clock-vs-alarm-app` | `/blog/how-to-wake-up-as-a-heavy-sleeper`, `/blog/alarm-that-makes-you-get-out-of-bed` | Added 2026-11-18 (Trends: +40%). Comparison intent only; Rise Mission has no light feature, never imply it does. |

## 2. App Store keyword set (spillover into web search)

The App Store keyword field is not shown to users, but the same words are what people type into Google
before they reach the App Store. Map each to the page that best answers it.

| Keyword | Primary page | Status |
|---|---|---|
| wake, up, wakeup | `/` | Covered (H1 + title "alarm clock app", "prove you're awake"). |
| loud | `/blog/loudest-alarm-sound-iphone` | Covered. `/blog/iphone-alarm-volume-low` owns "alarm too quiet". |
| snooze | `/blog/how-to-stop-hitting-snooze` | Covered. |
| morning | `/blog/morning-routine-that-sticks` | Covered ("morning routine"). |
| qr | `/blog/qr-code-alarm-clock` | Covered. |
| pushup | `/blog/push-up-alarm-clock` | Covered. |
| squat | `/blog/squat-alarm-clock` | **New page (this branch).** Was a homepage anchor only. |
| math, puzzle | `/blog/math-alarm-clock` | Math covered; "puzzle alarm" partly (Memory challenge has no guide, gap G2). |
| early, riser | `/blog/benefits-of-waking-up-early` | Covered. "Early Riser" is also a v1.6 rank name (`/whats-new`). |
| shake | (none) | **Gap G1.** Homepage anchor only. |
| walk | `/blog/step-alarm-clock` | Covered ("step alarm", "walk to turn off alarm"). |
| sleep | `/sleep-calculator` | Covered (tool). |
| oversleep | `/blog/why-do-i-sleep-through-my-alarm` | Covered ("sleep through alarm", "oversleeping"). |
| alarm, clock | `/` | Covered. |
| deep, sleeper | `/blog/how-to-wake-up-as-a-heavy-sleeper` | Covered ("deep sleeper" phrasing is in the body; consider an H2 using it). |
| gym, fitness | `/blog/push-up-alarm-clock` | Partly. Squat + push-up guides cover "fitness alarm"; no page targets "gym". Low fit, no new page. |
| habit, streak | `/blog/morning-routine-that-sticks` | Covered (streaks, levels, 7-Day Rise Challenge). |
| focus, pomodoro, timer | `/whats-new#focus` | **Gap G3.** Only a feature card. Low purchase intent for an alarm app; don't create a page yet. |
| weather, widget | `/whats-new` | Partly (1.5 release notes: Morning Briefing, widgets). No page; low intent. |
| memory | (none) | **Gap G2.** Homepage anchor only. |

## 3. Brand / entity terms

| Keyword | Primary page |
|---|---|
| Rise Mission, Alarm Clock: Rise Mission | `/` (entity paragraph `ENTITY_DESCRIPTION` in `src/lib/site.ts`, also in Organization schema, `/llms.txt`, `/llms-full.txt`) |
| Rise Mission vs Alarmy / Erly / iPhone Clock | `/blog/rise-mission-vs-alarmy`, `/blog/rise-mission-vs-erly`, `/rise-mission-vs-apple-clock` |
| Alarmy alternatives | `/blog/alarmy-alternatives` |
| Rise Mission iOS version / iPhone requirements | `/compatibility` |
| Rise Mission 1.6 / what's new / changelog | `/whats-new` |
| Rise Mission screenshots / demo | `/gallery` |
| alarm app size | `/alarm-app-size-comparison` |

## 4. Cannibalization watch list

- **Heavy sleepers**: home, roundup, how-to and hub all mention it. Rule: only the roundup uses "best … for heavy
  sleepers" in its title; the how-to uses "how to wake up as a heavy sleeper"; the hub uses "guides".
- **Snooze**: the how-to post owns "stop hitting snooze"; the calculator owns "snooze calculator". The sleep
  inertia post must not add "snooze" to its title.
- **Math**: the post owns "math alarm clock"; the tool owns "online alarm clock".
- **iPhone alarm loudness**: `loudest-alarm-sound-iphone` (make it louder) vs `iphone-alarm-volume-low`
  (why it's quiet). Different intent; keep the titles distinct.

## 5. Gaps and proposals (pace: 3–5 new URLs a week)

This week already added `/whats-new`, `/blog/morning-routine-that-sticks` and now `/blog/squat-alarm-clock`
(3 URLs). No more new URLs until next week.

| # | Gap | Proposal | Why | When |
|---|---|---|---|---|
| G1 | "shake alarm" has no page | `/blog/shake-alarm-clock`: how the accelerometer counts shakes (targets 10/15/25 per difficulty, no permission), when shaking is enough and when it isn't, the "shake it from bed" weak spot. | App Store keyword `shake`; competitors (Alarmy, Risly, Mathe) all name a shake mission; nav still points at a homepage anchor. | Next week |
| G2 | "memory / puzzle alarm" has no page | `/blog/memory-alarm-clock`: the 3x3 grid, rounds per difficulty (2/3/4), why working memory is weak on waking, quiet-room use. | App Store keywords `memory`, `puzzle`; a quiet alternative for shared rooms. | Week after |
| G3 | focus / pomodoro | No page now. Revisit only if Search Console shows impressions for "pomodoro" queries. | Low intent for an alarm app. | Watch |
| G4 | "how to wake up early" | Consider retitling the hub `waking-up-early` or a future how-to; don't create a duplicate of the 5 AM post. | Avoid cannibalization with `/blog/how-to-wake-up-at-5am`. | After 90-day review |

Written now: **`/blog/squat-alarm-clock`** (G0). It fills the App Store `squat` keyword, replaces the nav's
homepage anchor for Squats, and has facts no other page has (knee-angle thresholds, hold and rep timing,
the hip-drop rule when ankles are hidden, targets per difficulty), checked against the app repo.
