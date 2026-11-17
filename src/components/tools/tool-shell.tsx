import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { IconTile } from "@/components/site/icons";
import { flattenBlocks, wrapTables } from "@/components/blog/prose";
import { RelatedGuides } from "@/components/seo/related-guides";
import { liveTools, toolPath } from "@/lib/tools";
import "@/app/content.css";

/**
 * Shared layout for every free tool page:
 *   hero (eyebrow + h1 + lead) → the tool in a raised "device" card →
 *   explanatory prose (children) → app CTA → more tools.
 * Keep tool UIs inside <ToolCard>; keep content inside the prose slot.
 */
export function ToolHero({ title, lead, updated = "2026-11-15" }: { title: string; lead: string; updated?: string }) {
  return (
    <section className="sunrise-glow dawn">
      <div className="container-rm pb-8 pt-12 text-center md:pt-16">
        <p className="t-eyebrow justify-center">Free tool · No sign-up</p>
        <h1 className="t-h1 mx-auto mt-3 max-w-3xl text-balance">{title}</h1>
        <p className="t-lead mx-auto mt-4 max-w-2xl text-pretty">{lead}</p>
        <p className="mt-4 text-[0.85rem] text-muted">
          By{" "}
          <Link href="/about" rel="author" className="font-semibold text-ink-2 hover:underline">
            Sunny Radadiya
          </Link>{" "}
          · Updated{" "}
          <time dateTime={updated}>
            {new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}
          </time>{" "}
          · Sources cited below
        </p>
      </div>
    </section>
  );
}

/** The tool itself: a raised card with a soft gradient frame. */
export function ToolCard({ children }: { children: ReactNode }) {
  return (
    <div className="container-rm">
      <div className="mx-auto max-w-3xl rounded-[28px] bg-gradient-to-b from-accent-soft via-card to-sun-soft p-1.5 shadow-[0_30px_70px_-30px_rgb(22_20_31/0.35)]">
        <div className="rounded-[23px] border border-line bg-card p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

/** Big result tile used by calculators. `highlight` = the recommended answer. */
export function ResultTile({ value, label, note, highlight = false }: { value: string; label: string; note?: string; highlight?: boolean }) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl border p-4 transition-colors duration-200 sm:p-5 ${
        highlight
          ? "border-accent bg-accent text-accent-ink shadow-[0_14px_30px_-16px_var(--accent)]"
          : "border-line bg-paper text-ink"
      }`}
    >
      <p className={`flex items-center gap-1.5 text-[0.8125rem] font-semibold ${highlight ? "opacity-90" : "text-muted"}`}>
        {highlight && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />}
        {label}
      </p>
      <p key={value} className="rm-result-value mt-1.5 text-[1.9rem] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[2rem]">
        {value}
      </p>
      {note && <p className={`mt-2.5 text-[0.8125rem] leading-snug ${highlight ? "opacity-90" : "text-ink-2"}`}>{note}</p>}
    </div>
  );
}

/**
 * Segmented control used by tools for modes: a radio group (one choice, arrow
 * keys move it), not tabs, since there are no tab panels.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (v: T) => void;
  label: string;
}) {
  const move = (dir: 1 | -1, el: HTMLElement) => {
    const i = options.findIndex(([v]) => v === value);
    const next = options[(i + dir + options.length) % options.length][0];
    onChange(next);
    const btns = el.parentElement?.querySelectorAll<HTMLButtonElement>("[role=radio]");
    btns?.[(i + dir + options.length) % options.length]?.focus();
  };
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-2xl border border-line bg-paper-2 p-1 text-[0.9rem] font-semibold">
      {options.map(([v, text]) => {
        const on = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(v)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(1, e.currentTarget);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(-1, e.currentTarget);
              }
            }}
            className={`rm-btn min-h-11 rounded-xl px-2.5 py-2 leading-tight text-balance transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent motion-reduce:transition-none ${
              on ? "bg-card text-ink shadow-[0_1px_2px_rgb(22_20_31/0.08),0_4px_12px_-4px_rgb(22_20_31/0.12)]" : "text-muted hover:bg-card/50 hover:text-ink"
            }`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}

export function ToolProse({ children }: { children: ReactNode }) {
  return (
    <div className="container-rm mt-16">
      <div className="prose-rm mx-auto max-w-[42.5rem]">{wrapTables(flattenBlocks(children))}</div>
    </div>
  );
}

export function ToolCta({ placement, title, body }: { placement: string; title: string; body: string }) {
  return (
    <section className="container-rm mt-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-[28px] bg-ink px-6 py-10 text-center text-paper sm:px-10">
        <p className="t-h2 !text-[1.6rem] !text-paper">{title}</p>
        <p className="max-w-md text-paper/75">{body}</p>
        <AppStoreButton placement={placement} className="!bg-paper !text-ink" />
      </div>
    </section>
  );
}

export function MoreTools({ current }: { current: string }) {
  const others = liveTools().filter((t) => t.slug !== current);
  if (!others.length) return <RelatedGuides tool={current} />;
  return (
    <>
    <RelatedGuides tool={current} />
    <section className="container-rm mt-16">
      <div className="mx-auto max-w-3xl">
        <p className="t-h3">More free tools</p>
        <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
          {others.map((t) => (
            <li key={t.slug} className="min-w-0">
              <Link href={toolPath(t.slug)} className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <IconTile name={t.icon} size="lg" tone="accent" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block truncate text-[0.88rem] text-muted">{t.tagline}</span>
                </span>
                <ArrowRight aria-hidden className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/tools" className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-accent">
          All free tools <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </section>
    </>
  );
}
