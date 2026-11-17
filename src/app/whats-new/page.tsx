import Link from "next/link";
import { Answer, H2, H3, Limits } from "@/components/blog/prose";
import { Icon3d } from "@/components/content/icon-3d";
import { AppStoreButton } from "@/components/site/app-store-button";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PRODUCT_FAQ } from "@/lib/faq";
import { faqPageLd, mobileApplicationLd, staticPageMetadata, V16_OG_IMAGE } from "@/lib/seo";
import {
  ACHIEVEMENT_COUNT,
  ACHIEVEMENTS,
  BEDTIME_NUDGE,
  CHALLENGES,
  FACTS,
  FOCUS_PRESETS,
  LIVE_VERSION,
  MIN_IOS,
  MORNING_ROUTINE,
  NEW_ACHIEVEMENT_COUNT,
  PRICING_COPY,
  RANKS,
  RELEASES,
  RISE_CHALLENGE,
  SOUNDS,
  V16_FEATURES,
  XP_RULES,
  xpForDay,
} from "@/lib/site";
import "@/app/content.css";

/**
 * Release notes. Facts come from site.ts (checked against the app repo, branch
 * v1.6); dates from the App Store version history. Update RELEASES in site.ts
 * on every release and this page, llms.txt and the schema follow.
 */

const PATH = "/whats-new";
const UPDATED = "2026-11-17";

export const metadata = staticPageMetadata("/whats-new", { ogImage: V16_OG_IMAGE.url, ogImageSize: { width: V16_OG_IMAGE.width, height: V16_OG_IMAGE.height } });

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const live = RELEASES[0];
const earlier = RELEASES.slice(1);
const fullDay = xpForDay({ streak: 7, onTime: true, routine: true });
const plainDay = xpForDay({ streak: 1, onTime: false, routine: false });

export default function WhatsNewPage() {
  return (
    <>
      <JsonLd
        data={[
          mobileApplicationLd(
            `Rise Mission ${LIVE_VERSION} for iPhone adds levels and XP, the 7-Day Rise Challenge, a morning routine, an optional bedtime nudge and ${ACHIEVEMENT_COUNT} achievements to an alarm you stop by finishing a wake-up challenge. Requires ${MIN_IOS}. Free to download; Rise Mission Pro unlocks the app.`,
            { releaseNotesUrl: PATH },
          ),
          faqPageLd(PRODUCT_FAQ),
        ]}
      />
      <Breadcrumbs path="/whats-new" />

      <section className="sunrise-glow dawn">
        <div className="container-rm pb-10 pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="t-eyebrow">
              Release notes · Version {LIVE_VERSION}
              {live.date ? (
                <>
                  {" "}· Released <time dateTime={live.date}>{fmt(live.date)}</time>
                </>
              ) : null}{" "}
              · Page updated <time dateTime={UPDATED}>{fmt(UPDATED)}</time>
            </p>
            <h1 className="t-h1 mt-3">What&apos;s new in Rise Mission {LIVE_VERSION}</h1>
            <p className="t-lead mt-4">{live.summary}</p>
          </div>
        </div>
      </section>

      <div className="container-rm">
        <div className="prose-rm mx-auto max-w-3xl">
          <Answer>
            <strong>Rise Mission {LIVE_VERSION} turns every wake-up into progress you can see.</strong> Each completed
            challenge earns XP toward six ranks, new users get the {RISE_CHALLENGE.name}, and a short morning routine and
            an optional bedtime nudge bracket the alarm. Home, Challenges, Focus, Settings, Stats and History are
            redesigned. The {CHALLENGES.length} wake-up challenges are unchanged.
          </Answer>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={`New in ${LIVE_VERSION}`}>
          {V16_FEATURES.map((f) => (
            <li key={f.id} id={f.id} className="flex scroll-mt-24 gap-4 rounded-2xl border border-line bg-card p-5">
              <Icon3d name={f.icon3d} size={48} />
              <div>
                <h2 className="font-semibold leading-snug text-ink">{f.title}</h2>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-2">{f.blurb}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="prose-rm mx-auto mt-14 max-w-3xl">
          <H2>How do levels and XP work?</H2>
          <p>
            You earn XP once per calendar day in which you complete a real wake-up challenge, so setting a second alarm
            doesn&apos;t double it. Test alarms never count. Your XP is calculated from your wake-up history on the
            iPhone, so it always matches the mornings you actually completed.
          </p>
          <ul>
            <li>
              <strong>{XP_RULES.base} XP</strong> for the wake-up.
            </li>
            <li>
              <strong>+{XP_RULES.onTimeBonus} XP on time</strong>: no snooze, and the challenge finished within{" "}
              {XP_RULES.onTimeMinutes} minutes of the alarm.
            </li>
            <li>
              <strong>+{XP_RULES.routineBonus} XP</strong> for finishing the morning routine that day.
            </li>
            <li>
              <strong>A streak multiplier</strong>:{" "}
              {XP_RULES.multipliers
                .map((m) => `×${m.x.toFixed(1)} at ${m.toStreak === null ? `${m.fromStreak}+ days` : `${m.fromStreak}–${m.toStreak} days`}`)
                .join(", ")}
              .
            </li>
          </ul>
          <p>
            A plain first morning is worth {plainDay} XP. An on-time wake-up with the routine done, on day 7 of a streak,
            is worth {fullDay} XP.
          </p>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Rank</th>
                <th>Total XP</th>
              </tr>
            </thead>
            <tbody>
              {RANKS.map((r) => (
                <tr key={r.name}>
                  <td>{r.level}</td>
                  <td>
                    <span className="inline-flex items-center gap-2">
                      <Icon3d name={r.icon3d} size={28} />
                      <strong>{r.name}</strong>
                    </span>
                  </td>
                  <td>{r.xp.toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Your streak still has its safety net: {FACTS.streakShields} For how to use all this to build a habit, read{" "}
            <Link href="/blog/morning-routine-that-sticks">how to build a morning routine that sticks</Link>.
          </p>

          <H2>What is the {RISE_CHALLENGE.name}?</H2>
          <p>
            A starter goal for your first week: complete {RISE_CHALLENGE.goal} wake-ups within {RISE_CHALLENGE.windowDays}{" "}
            days. It starts automatically on a new user&apos;s first real wake-up, and existing users can start it from
            Home. The {RISE_CHALLENGE.windowDays - RISE_CHALLENGE.goal} spare days are on purpose: one rough morning
            doesn&apos;t end it. If the window runs out, you can try again. Finishing it unlocks the Rise Challenge
            achievement.
          </p>

          <H2>What are the morning routine and the bedtime nudge?</H2>
          <H3>Morning routine</H3>
          <p>
            After you wake with an alarm, Home offers three quick steps until noon: {MORNING_ROUTINE.join(", ").toLowerCase()}
            . Tick all three and that day earns +{XP_RULES.routineBonus} XP.
          </p>
          <H3>Bedtime nudge</H3>
          <p>
            Optional. Choose a sleep goal ({BEDTIME_NUDGE.sleepGoalHours.join(", ")} hours; {BEDTIME_NUDGE.defaultSleepGoalHours}{" "}
            by default) and Rise Mission works out your bedtime from your next morning alarm. The reminder arrives{" "}
            {BEDTIME_NUDGE.leadMinutes} minutes before that bedtime, at most once a night, and only on nights before an
            alarm. If your alarm is at 6:30 and your goal is 8 hours, it reminds you at 10:00 to be in bed by 10:30. Want
            to plan it yourself? Try the <Link href="/sleep-calculator">sleep cycle calculator</Link>.
          </p>
          <H3>Comeback reminders</H3>
          <p>
            If you stop opening the app, up to three gentle reminders arrive over the following week (for example when
            tomorrow has no alarm set). Opening the app resets them, and the Reminders when I&apos;m away switch in
            Settings turns them off.
          </p>

          <H2>Which achievements are there?</H2>
          <p>
            {ACHIEVEMENT_COUNT} in total, {NEW_ACHIEVEMENT_COUNT} of them new in {LIVE_VERSION}, shown in a new badge
            showcase. Each is worked out from your real wake-up history.
          </p>
          <table>
            <thead>
              <tr>
                <th>Achievement</th>
                <th>How to earn it</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {ACHIEVEMENTS.map((a) => (
                <tr key={a.name}>
                  <td>
                    <span className="inline-flex items-center gap-2">
                      <Icon3d name={a.icon3d} size={28} />
                      <strong>{a.name}</strong>
                    </span>
                  </td>
                  <td>{a.how}</td>
                  <td>{a.since === "1.6" ? "New in 1.6" : "Earlier"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <H2>What changed in Focus, sounds and the rest of the app?</H2>
          <ul>
            <li>
              <strong>Focus tab.</strong> A big dial you drag to set the time, presets (
              {FOCUS_PRESETS.map((p) => `${p.label} ${p.minutes} min`).join(", ")}), pause, and today&apos;s focus minutes.
              Pomodoro is still there.
            </li>
            <li>
              <strong>{SOUNDS.count} sounds</strong> in {SOUNDS.styles.join(", ")} styles, with a preview in the picker.{" "}
              {SOUNDS.caveat}
            </li>
            <li>
              <strong>Streak share card.</strong> Share your streak as an image through the standard iOS share sheet.
            </li>
            <li>
              <strong>Redesigned screens.</strong> Home greets you by time of day and shows your next badge; Challenges
              is a carousel of mission cards; Settings, Stats and History are new.
            </li>
            <li>
              <strong>Faster onboarding</strong> with a practice round: a math problem that you can skip.
            </li>
            <li>
              <strong>Contrast fixes</strong> on alarm screens, widgets and Live Activities.
            </li>
          </ul>

          <H2>What stayed the same?</H2>
          <ul>
            <li>
              {CHALLENGES.length} challenges: {CHALLENGES.map((c) => c.name).join(", ")}.{" "}
              <Link href="/blog/wake-up-challenges-explained">Which one suits you?</Link>
            </li>
            <li>{FACTS.ringsOnSilent}</li>
            <li>{FACTS.systemStop}</li>
            <li>{FACTS.backupChallenge}</li>
            <li>
              {FACTS.minIOS} See <Link href="/compatibility">compatibility</Link>.
            </li>
            <li>{PRICING_COPY.long}</li>
          </ul>

          <H2>Earlier versions</H2>
          <p>From the App Store version history, newest first.</p>
          {earlier.map((r) => (
            <section key={r.version} aria-labelledby={`v${r.version}`} className="mt-6">
              <h3 id={`v${r.version}`}>
                Version {r.version}
                {r.date ? (
                  <>
                    {" "}·{" "}
                    <time dateTime={r.date} className="font-normal text-muted">
                      {fmt(r.date)}
                    </time>
                  </>
                ) : null}
              </h3>
              <p>{r.summary}</p>
              <ul>
                {r.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          ))}

          <Limits>
            <p>
              These notes describe what the app does, not what it will do for your sleep. Levels, streaks and
              achievements are motivation, and research on game elements like these is mixed. Some {LIVE_VERSION} features
              rely on iOS: the bedtime nudge and comeback reminders need notifications allowed, and the Lock Screen alarm
              uses the standard iOS sound. If something here doesn&apos;t match your iPhone, tell us from the{" "}
              <Link href="/support">support page</Link>.
            </p>
          </Limits>
        </div>
      </div>

      <Faq items={PRODUCT_FAQ} />

      <section className="container-rm">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-card p-8 text-center shadow-soft">
          <p className="t-h2 !text-2xl">Start at Sleepyhead tomorrow</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">
            Update or download Rise Mission {LIVE_VERSION}. {PRICING_COPY.short}.
          </p>
          <div className="mt-6 flex justify-center">
            <AppStoreButton placement="whats-new" />
          </div>
          <p className="mt-6 text-[0.9rem] text-muted">
            See it first: <Link href="/gallery" className="font-semibold text-accent hover:underline">screenshots and videos</Link> ·{" "}
            <Link href="/" className="font-semibold text-accent hover:underline">Rise Mission home</Link>
          </p>
        </div>
      </section>
    </>
  );
}
