@AGENTS.md

# CLAUDE.md: risemission.app

Marketing + SEO/AEO site for **Rise Mission** (iOS alarm app, App Store id 6791305078, live v1.5).
Next.js 16 App Router (Cache Components on), Tailwind 4, pnpm, deployed on Vercel. All pages are static.
Strategy, calendar and indexing protocol: `docs/SEO_PLAYBOOK.md`. Pattern source: pagedrop
(`~/Blockchain/Experiment/SunnyOS/projects/webapps/pagedrop`, see its `docs/revamp/RESEARCH-seo.md`).

```bash
pnpm dev --port 3002     # local
pnpm test                # registry + metadata + sleep-math guards (must pass)
pnpm typecheck && pnpm build
```

## Single sources of truth (never retype these in pages)
- `src/lib/site.ts` — every product fact (challenges, AlarmKit, privacy wording, pricing wording, live version). Verify against the **live** app branch before adding a fact.
- `src/lib/sources.ts` — verified citations (DOI resolved + title checked). Add new sources here first.
- `src/lib/blog.ts` — post registry + topic hubs + related-post ranking.
- `src/lib/seo.ts` — `pageMetadata()` and all JSON-LD builders. No inline schema literals in pages (tool pages excepted).

## Honesty rules (Google + App Review + trust)
- **Never say the app is "free"** without "Pro unlocks the app" — v1.2+ has a hard paywall for new installs. Use `PRICING_COPY`.
- **Never say "no tracking" / "no data collected"** — the app ships Firebase Analytics + RevenueCat. Use `PRIVACY_COPY`.
- **No prices** on the site (storefront-dependent, they change). Link to the App Store.
- Only describe features in the **live** App Store build, not v1.6 WIP.
- Every sleep/health claim links a source from `SRC`; say what research does *not* show; every post has a `<Limits>` box.
- `updated` only on real content changes. Sitemap dates are hand-set, never `new Date()`.

## Publishing a post (tests enforce 1–3)
1. Add entry to `BLOG_POSTS` (metaTitle ≤ 44 chars, metaDescription ≤ 155).
2. `src/app/blog/<slug>/page.tsx` → `<BlogLayout post={getPost(slug)} faq={FAQ}>`.
3. Add slug to ≥ 1 topic in `BLOG_TOPICS`.
4. Structure: `<Answer>` (40–60 words, bold first sentence) → `<KeyTakeaways>` → `<H2>` sections → table → `<Limits>` → `<Sources>`. Visible FAQ == FAQPage JSON-LD (BlogLayout does this).
5. Links: 1 up-link to its hub topic, 2–4 sibling posts, 1 tool (`/sleep-calculator`), the app home `/` once in prose. 3–5 internal links per 1,000 words.
6. ≥ 1,500 words, ≥ 3 facts not on any other page, first-person operator voice where relevant.
7. Pace: max 3–5 new URLs per week. Quality over count. Never mass-generate.

## Layout gotchas
- `BlogLayout` auto-builds the TOC from top-level `<H2>`s and injects the app CTA before the 3rd H2 — keep H2s as direct children of the page (fragments are fine).
- Pure helpers used by both server pages and client components live in `src/lib/` (a server page can't call functions exported from a `"use client"` file).
- Cache Components: don't use `dynamicParams` / `export const dynamic`; use `generateStaticParams` + `notFound()`.
- Old `.html` URLs (App Store support link, in-app privacy/terms links) 301 in `next.config.ts` — never remove.
- Analytics are env-gated: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `NEXT_PUBLIC_APPSTORE_PT`.
