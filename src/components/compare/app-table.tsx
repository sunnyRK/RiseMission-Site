import { COMPETITORS, SNAPSHOT_DATE, getCompetitor, type Competitor } from "@/lib/competitors";

const fmtCount = (n: number) => n.toLocaleString("en-US");
const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Tri-state: null = the listing doesn't say (never shown as "No"). */
export function YesNo({ v }: { v: boolean | null }) {
  if (v === null) return <span className="text-muted">Not stated</span>;
  return v ? <span className="font-medium text-good">Yes</span> : <span className="text-ink-2">No</span>;
}

export function sizeRatio(c: Competitor) {
  const rm = getCompetitor("rise-mission")!;
  return c.sizeMB / rm.sizeMB;
}

/**
 * Size-sorted comparison table with HTML bars (citable by AI engines, unlike
 * an image chart). Data: Apple App Store listing snapshot.
 */
export function AppSizeTable({ slugs, caption }: { slugs?: string[]; caption?: string }) {
  const rows = (slugs ? slugs.map((s) => getCompetitor(s)!).filter(Boolean) : COMPETITORS).slice().sort((a, b) => a.sizeMB - b.sizeMB);
  const max = Math.max(...rows.map((r) => r.sizeMB));
  return (
    <div className="not-prose overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full min-w-[640px] text-[0.92rem]">
        <caption className="caption-bottom px-4 py-3 text-left text-[0.8rem] text-muted">
          {caption ?? `App size as listed on the US App Store, ${fmtDate(SNAPSHOT_DATE)}. Download size on your iPhone can be smaller.`}
        </caption>
        <thead>
          <tr className="border-b border-line text-left text-ink">
            <th className="px-4 py-3 font-semibold">App</th>
            <th className="w-[45%] px-4 py-3 font-semibold">Size</th>
            <th className="px-4 py-3 font-semibold">Rating</th>
            <th className="px-4 py-3 font-semibold">Min. iOS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ours = r.slug === "rise-mission";
            return (
              <tr key={r.slug} className={`border-b border-line last:border-0 ${ours ? "bg-accent-soft/40" : ""}`}>
                <td className="px-4 py-3 font-medium text-ink">
                  {r.shortName}
                  {ours && " "}
                  {ours && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[0.7rem] font-semibold text-accent-ink">ours</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-paper-2">
                      <div className={`h-2 rounded-full ${ours ? "bg-accent" : "bg-ink/30"}`} style={{ width: `${Math.max(2, (r.sizeMB / max) * 100)}%` }} />
                    </div>
                    <span className="w-20 shrink-0 text-right tabular-nums text-ink">{r.sizeMB.toFixed(1)} MB</span>
                  </div>
                </td>
                <td className="px-4 py-3 tabular-nums text-ink-2">
                  {r.rating ? `${r.rating.toFixed(2)} (${fmtCount(r.ratingCount)})` : <span className="text-muted">No ratings yet</span>}
                </td>
                <td className="px-4 py-3 text-ink-2">iOS {r.minIOS.replace(/\.0$/, "")}</td>
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
    <div className="not-prose overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full min-w-[640px] text-[0.92rem]">
        <caption className="caption-bottom px-4 py-3 text-left text-[0.8rem] text-muted">
          Features as named in each app&apos;s own App Store listing, US store, {fmtDate(SNAPSHOT_DATE)}. &quot;Not stated&quot; means the listing doesn&apos;t say, not that the feature is missing.
        </caption>
        <thead>
          <tr className="border-b border-line text-left text-ink">
            <th className="px-4 py-3 font-semibold">App</th>
            <th className="px-4 py-3 font-semibold">Missions named in listing</th>
            <th className="px-4 py-3 font-semibold">Sleep tracking</th>
            <th className="px-4 py-3 font-semibold">Paid tier</th>
            <th className="px-4 py-3 font-semibold">Size</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.slug} className={`border-b border-line align-top last:border-0 ${r.slug === "rise-mission" ? "bg-accent-soft/40" : ""}`}>
              <td className="px-4 py-3 font-medium text-ink">{r.shortName}</td>
              <td className="px-4 py-3 text-ink-2">{r.missions.length ? r.missions.join(", ") : <span className="text-muted">None named</span>}</td>
              <td className="px-4 py-3"><YesNo v={r.sleepTracking} /></td>
              <td className="px-4 py-3"><YesNo v={r.subscription} /></td>
              <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink-2">{r.sizeMB.toFixed(1)} MB</td>
            </tr>
          ))}
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
    <div className="not-prose rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="t-h3 !text-[1.15rem]">
          {rank ? <span className="mr-2 text-muted">{rank}.</span> : null}
          {c.name}
        </p>
        <a href={c.appStoreUrl} rel={ours ? undefined : "nofollow noopener"} target="_blank" className="text-[0.85rem] font-semibold text-accent hover:underline">
          App Store ↗
        </a>
      </div>
      <p className="mt-1 text-[0.85rem] text-muted">
        {c.developer} · {c.sizeMB.toFixed(1)} MB · {c.rating ? `${c.rating.toFixed(2)}★ (${fmtCount(c.ratingCount)} ratings)` : "no ratings yet"} · iOS {c.minIOS.replace(/\.0$/, "")}+
      </p>
      <p className="mt-3 text-ink"><span className="font-semibold">Best for:</span> {c.bestFor}</p>
      {children && <div className="mt-2 leading-relaxed text-ink-2">{children}</div>}
    </div>
  );
}
