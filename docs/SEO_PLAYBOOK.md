# Rise Mission SEO / AEO Playbook

> Living doc. Started 2026-11-15 after pausing Apple Ads (too costly). Goal: organic installs from
> Google, AI answer engines (ChatGPT, Gemini, Perplexity, AI Overviews) and faceless social.
> Rules come from pagedrop (≈90–100 Google clicks/day + AI referrals) and claude-seo (AgriciDaniel).

## 0. Baseline (2026-11-15)
- Search Console (domain property `risemission.app`): 3 indexed (`/`, `/privacy.html`, `/support.html`),
  3 "page with redirect" (http/www variants — healthy, do NOT "validate fix"), 1 discovered-not-indexed (`/terms.html`).
- Old site: 4 static HTML pages, no blog, no tools, no analytics. Structured data claimed price 0 with no Pro caveat (fixed).
- Revenue (RevenueCat, last 28d): ~$38, 8 active subs, 2 new yearly buyers this month.

## 1. Where installs actually come from (priority order)
1. **App Store search (ASO)** — most iOS installs. Title/subtitle/keywords/screenshots/ratings. Do an ASO pass (separate task).
2. **Google + AI answers → website → App Store.** Slow (3–6 months to compound), durable. This repo.
3. **Faceless brand social** (TikTok/Reels/Shorts as "Rise Mission"): push-up alarm clips, "can you beat this alarm",
   grogginess test results. Owner can't promote personally on LinkedIn/Reddit — fine, everything is brand-led.
4. **In-app virality**: v1.6 share-streak card (T16 in `RiseMission/docs/PRD_v1.6.md`).
5. **Directories / roundups**: AlternativeTo, app review sites, "best alarm apps for heavy sleepers" lists, iOS bloggers — from the brand email.

**Never:** sock-puppet Reddit/Quora posts, fake reviews, fake stats, mass AI pages. Bans + FTC risk, and AI engines discount it.

## 2. Keyword clusters (hub → spokes)
| Hub (topic) | Spokes (planned posts) | Intent |
|---|---|---|
| heavy-sleepers ✅ | how to wake up as a heavy sleeper ✅ · why do I sleep through my alarm · best alarm for heavy sleepers (honest roundup incl. competitors) · loud alarm sounds for heavy sleepers · how to wake up a heavy sleeper (for parents/partners) | problem-aware |
| snooze-habit ✅ | how to stop hitting snooze ✅ · is snoozing bad (research) · snooze cost calculator (tool) · why do I keep hitting snooze | problem-aware |
| waking-up-early ✅ | benefits of waking up early ✅ · how to wake up at 5 AM · how to become a morning person · morning routine for productivity · 5 AM club: what works | aspirational |
| sleep-science (new) | sleep inertia explained · how many sleep cycles do I need · best time to wake up for a 10 PM bedtime · chronotype / night owl vs lark | informational |
| wake-up-challenges (new) | push-up alarm · math alarm · QR code alarm · walk/step alarm · voice alarm — each a real landing with the challenge's facts from `CHALLENGES` | product / pSEO |
| comparisons (new, careful) | Rise Mission vs Alarmy · vs Erly · best Alarmy alternatives — only with dated, verifiable comparison tables | commercial |

## 3. Tools (utility = links + AI citations)
| Tool | Status | Notes |
|---|---|---|
| `/sleep-calculator` | ✅ live in branch | bedtime ↔ wake time, 90-min cycles; table of common wake times |
| Online alarm clock with challenge (`/online-alarm-clock`) | next | browser alarm you stop by solving math/typing; demo of the app. Honest pSEO: `/alarm/6-30-am` etc. as *working preset alarms* (vclock pattern). Start with ~12 times, grow only if >50% indexed. |
| Chronotype quiz | later | shareable result card → social |
| Snooze cost calculator | later | "you lose N hours/year" share card |
| Grogginess test | later | 30-s reaction + math; shows why challenges work |

## 4. Programmatic SEO guardrails
- A pSEO page must be worth publishing alone: different reader/problem, ≥ 3 unique facts, honest limits, real utility.
- Families of 8–12 pages, then wait 2–4 weeks; grow only if > 50% indexed. Hard stop at 100 pages without review.
- No city pages, no swap-the-keyword templates. Time-preset alarm pages are OK *because each is a working tool*.

## 5. Publishing cadence
- **3 posts/week max** (pagedrop rule: 3–5 new URLs/week). Each ≥ 1,500 words, sourced, with a `<Limits>` box.
- Each post ships with: OG cover (auto via `/og`), 1 Reel/Short script cut from it, 1 Pinterest pin (sleep content does well there).
- Refresh, don't churn: revisit posts at 90 days with Search Console queries; set `updated` only on real changes.

## 6. Indexing protocol (from pagedrop `growth/search-console/README.md`)
1. After deploy: submit `https://risemission.app/sitemap.xml` in Search Console + Bing Webmaster Tools.
2. Request indexing manually for ≤ 10 URLs/day, new pages first, never the same URL twice. **Never use the Indexing API.**
3. Old `.html` URLs 301 to clean URLs — leave them; Google transfers signals.
4. 90-day rule: a page with 0 impressions after 90 days → improve, merge, or noindex.
5. Next: IndexNow cron (copy `pagedrop/src/lib/indexnow.ts`) for Bing/Yandex/ChatGPT-search freshness.

## 7. AEO (AI answer engines)
- Answer-first: bold 40–60 word answer under every H1 (`<Answer>`).
- Self-contained H2 sections, comparison tables, numbered steps, visible FAQ (= FAQPage JSON-LD).
- `robots.txt` allows OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Googlebot, Bingbot.
- `/llms.txt` generated from registries (low weight, cheap). Next: `Accept: text/markdown` negotiation
  (pagedrop saw 812 markdown reads vs 8 llms.txt hits in 2.5 days — worth porting).
- Track: `ai_referral` event (GA4 + PostHog), plus a weekly prompt check (pagedrop `src/lib/aeo/visibility.ts`).

## 8. Analytics + admin (to set up)
- GA4: create property → `NEXT_PUBLIC_GA_ID` on Vercel. (EU visitors: consider consent mode.)
- PostHog: project → `NEXT_PUBLIC_POSTHOG_KEY` (cookieless, no banner needed).
- Search Console verification is already DNS (domain property) — `GOOGLE_SITE_VERIFICATION` optional.
- ASC campaign links: provider token → `NEXT_PUBLIC_APPSTORE_PT` so App Analytics shows which page converts.
- Admin panel (later): new Supabase org/project (NOT shiploop), GSC service account → pagedrop's `src/lib/gsc.ts` pattern.

## 9. Changelog
- 2026-11-15 — Branch `nextjs-seo`: Next.js 16 rebuild; home, sleep calculator, 3 cornerstone posts, 3 topic hubs, about/E-E-A-T,
  privacy/terms/support ported, sitemap/robots/llms.txt/RSS, OG image route, JSON-LD (MobileApplication, FAQPage,
  BlogPosting, BreadcrumbList, CollectionPage, Person), env-gated GA4/PostHog, 301s for old .html URLs, vitest guards. Not deployed yet.
