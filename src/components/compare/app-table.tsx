import { ArrowUpRight, Check, Minus } from "lucide-react";
import { COMPETITORS, SNAPSHOT_DATE, getCompetitor, type Competitor } from "@/lib/competitors";

const fmtCount = (n: number) => n.toLocaleString("en-US");
const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Tri-state: null = the listing doesn't say (never shown as "No"). */
export function YesNo({ v }: { v: boolean | null }) {
  if (v === null) return <span className="text-muted">Not stated</span>;
  return v ? (
    <span className="inline-flex items-center gap-1.5 font-medium text-ink">
      <Check aria-hidden className="h-4 w-4 shrink-0 text-good" strokeWidth={2.5} />
      Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-ink-2">
      <Minus aria-hidden className="h-4 w-4 shrink-0 text-muted" />
      No
    </span>
  );
}

export function sizeRatio(c: Competitor) {
  const rm = getCompetitor("rise-mission")!;
  return c.sizeMB / rm.sizeMB;
}

/* Shared table chrome: framed, scrolls inside itself on phones, first column pinned. */
const FRAME = "not-prose rm-scroll-shadow overflow-x-auto overscroll-x-contain rounded-2xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const TABLE = "rm-ctable w-full border-separate border-spacing-0 text-[0.875rem] leading-normal sm:text-[0.9375rem]";
const CAPTION = "caption-bottom border-t border-line px-4 py-3 text-left text-[0.8125rem] leading-relaxed text-muted";
const TH = "whitespace-nowrap border-b border-line bg-paper-2 px-4 py-2.5 text-left text-[0.8125rem] font-semibold text-ink";
const TH_FIRST = `${TH} sticky left-0 z-[2] shadow-[inset_-1px_0_0_var(--line)] sm:static sm:shadow-none`;
const TD = "border-b border-line px-4 py-3.5 align-top group-last/row:border-b-0";
/** Pinned first cell; opaque background so scrolled cells pass underneath. Ours gets an accent edge. */
const tdFirst = (ours: boolean) =>
  `${TD} sticky left-0 z-[1] text-left font-semibold text-ink sm:static ${
    ours
      ? "bg-[color-mix(in_oklab,var(--accent-soft)_75%,var(--card))] shadow-[inset_3px_0_0_var(--accent),inset_-1px_0_0_var(--line)] sm:shadow-[inset_3px_0_0_var(--accent)]"
      : "bg-card shadow-[inset_-1px_0_0_var(--line)] sm:shadow-none"
  }`;
const rowCls = (ours: boolean) => `group/row ${ours ? "bg-[color-mix(in_oklab,var(--accent-soft)_75%,var(--card))]" : ""}`;

function OursBadge() {
  return <span className="ml-2 inline-flex items-center rounded-full bg-accent px-2 py-0.5 align-[0.1em] text-[0.6875rem] font-semibold leading-none text-accent-ink">Ours</span>;
}

/**
 * Size-sorted comparison table with HTML bars (citable by AI engines, unlike
 * an image chart). Data: Apple App Store listing snapshot.
 */
export function AppSizeTable({ slugs, caption }: { slugs?: string[]; caption?: string }) {
  const rows = (slugs ? slugs.map((s) => getCompetitor(s)!).filter(Boolean) : COMPETITORS).slice().sort((a, b) => a.sizeMB - b.sizeMB);
  const max = Math.max(...rows.map((r) => r.sizeMB));
  return (
    <div className={FRAME} role="region" aria-label="App size comparison table (scrolls sideways)" tabIndex={0}>
      <table className={`${TABLE} min-w-[38rem]`}>
        <caption className={CAPTION}>
          {caption ?? `App size as listed on the US App Store, ${fmtDate(SNAPSHOT_DATE)}. Download size on your iPhone can be smaller.`}
        </caption>
        <thead>
          <tr>
            <th scope="col" className={TH_FIRST}>App</th>
            <th scope="col" className={`${TH} w-[45%]`}>Size</th>
            <th scope="col" className={TH}>Rating</th>
            <th scope="col" className={TH}>Min. iOS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ours = r.slug === "rise-mission";
            return (
              <tr key={r.slug} className={rowCls(ours)}>
                <th scope="row" className={tdFirst(ours)}>
                  {r.shortName}
                  {ours && <OursBadge />}
                </th>
                <td className={TD}>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
                      <div className={`h-full rounded-full ${ours ? "bg-accent" : "bg-ink/25"}`} style={{ width: `${Math.max(2, (r.sizeMB / max) * 100)}%` }} />
                    </div>
                    <span className={`w-[4.75rem] shrink-0 text-right tabular-nums ${ours ? "font-semibold text-ink" : "text-ink-2"}`}>{r.sizeMB.toFixed(1)} MB</span>
                  </div>
                </td>
                <td className={`${TD} whitespace-nowrap tabular-nums text-ink-2`}>
                  {r.rating ? (
                    <>
                      <span className="font-medium text-ink">{r.rating.toFixed(2)}</span> <span className="text-muted">({fmtCount(r.ratingCount)})</span>
                    </>
                  ) : (
                    <span className="text-muted">No ratings yet</span>
                  )}
                </td>
                <td className={`${TD} whitespace-nowrap text-ink-2`}>iOS {r.minIOS.replace(/\.0$/, "")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Feature comparison for a handful of apps. */
export function AppFeatureTable({ slugs }: { slugs: string[] }) {
  const rows = slugs.map((s) => getCompetitor(s)!).filter(Boolean);
  return (
    <div className={FRAME} role="region" aria-label="Feature comparison table (scrolls sideways)" tabIndex={0}>
      <table className={`${TABLE} min-w-[42rem]`}>
        <caption className={CAPTION}>
          Features as named in each app&apos;s own App Store listing, US store, {fmtDate(SNAPSHOT_DATE)}. &quot;Not stated&quot; means the listing doesn&apos;t say, not that the feature is missing.
        </caption>
        <thead>
          <tr>
            <th scope="col" className={TH_FIRST}>App</th>
            <th scope="col" className={TH}>Missions named in listing</th>
            <th scope="col" className={TH}>Sleep tracking</th>
            <th scope="col" className={TH}>Paid tier</th>
            <th scope="col" className={TH}>Size</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ours = r.slug === "rise-mission";
            return (
              <tr key={r.slug} className={rowCls(ours)}>
                <th scope="row" className={tdFirst(ours)}>
                  {r.shortName}
                  {ours && <OursBadge />}
                </th>
                <td className={`${TD} min-w-[14rem] text-ink-2`}>{r.missions.length ? r.missions.join(", ") : <span className="text-muted">None named</span>}</td>
                <td className={`${TD} whitespace-nowrap`}><YesNo v={r.sleepTracking} /></td>
                <td className={`${TD} whitespace-nowrap`}><YesNo v={r.subscription} /></td>
                <td className={`${TD} whitespace-nowrap tabular-nums text-ink-2`}>{r.sizeMB.toFixed(1)} MB</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** One app entry in a roundup: name, developer, best-for, facts, App Store link. */
export function AppEntry({ slug, rank, children }: { slug: string; rank?: number; children?: React.ReactNode }) {
  const c = getCompetitor(slug)!;
  const ours = slug === "rise-mission";
  return (
    <div className={`not-prose rounded-2xl border bg-card p-5 sm:p-6 ${ours ? "border-accent/40 shadow-[inset_3px_0_0_var(--accent)]" : "border-line"}`}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <p className="t-h3 flex min-w-0 items-center gap-2.5 !text-[1.15rem]">
          {rank ? (
            <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-[0.8125rem] font-semibold tabular-nums text-ink-2">
              {rank}
            </span>
          ) : null}
          {rank ? <span className="sr-only">{rank}.</span> : null}
          <span className="min-w-0">{c.name}</span>
          {ours && <OursBadge />}
        </p>
        <a
          href={c.appStoreUrl}
          rel={ours ? undefined : "nofollow noopener"}
          target="_blank"
          className="inline-flex min-h-9 items-center gap-1 rounded-lg text-[0.875rem] font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          App Store <ArrowUpRight aria-hidden className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[0.8125rem] text-muted">
        <span>{c.developer}</span>
        <span aria-hidden>·</span>
        <span className="tabular-nums">{c.sizeMB.toFixed(1)} MB</span>
        <span aria-hidden>·</span>
        <span className="tabular-nums">{c.rating ? `${c.rating.toFixed(2)}★ (${fmtCount(c.ratingCount)} ratings)` : "no ratings yet"}</span>
        <span aria-hidden>·</span>
        <span>iOS {c.minIOS.replace(/\.0$/, "")}+</span>
      </p>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-ink">
        <span className="font-semibold">Best for:</span> {c.bestFor}
      </p>
      {children && <div className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{children}</div>}
    </div>
  );
}
