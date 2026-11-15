import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { IconTile } from "@/components/site/icons";
import { liveTools, toolPath } from "@/lib/tools";

/**
 * Shared layout for every free tool page:
 *   hero (eyebrow + h1 + lead) → the tool in a raised "device" card →
 *   explanatory prose (children) → app CTA → more tools.
 * Keep tool UIs inside <ToolCard>; keep content inside the prose slot.
 */
export function ToolHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="sunrise-glow dawn">
      <div className="container-rm pb-8 pt-12 text-center md:pt-16">
        <p className="t-eyebrow justify-center">Free tool · No sign-up
        </p>
        <h1 className="t-h1 mx-auto mt-3 max-w-3xl">{title}</h1>
        <p className="t-lead mx-auto mt-4 max-w-2xl">{lead}</p>
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
    <div className={`rounded-2xl border p-4 sm:p-5 ${highlight ? "border-accent bg-accent text-accent-ink" : "border-line bg-paper"}`}>
      <p className={`text-[0.8rem] font-medium ${highlight ? "opacity-85" : "text-muted"}`}>{label}</p>
      <p className="mt-1 text-[1.9rem] font-semibold leading-none tracking-tight tabular-nums">{value}</p>
      {note && <p className={`mt-2 text-[0.82rem] ${highlight ? "opacity-85" : "text-muted"}`}>{note}</p>}
    </div>
  );
}

/** Segmented control used by tools for modes. */
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
  return (
    <div role="tablist" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-paper-2 p-1 text-[0.9rem] font-semibold">
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={value === v}
          onClick={() => onChange(v)}
          className={`rounded-xl px-3 py-2.5 transition ${value === v ? "bg-card text-ink shadow-soft" : "text-muted hover:text-ink"}`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export function ToolProse({ children }: { children: ReactNode }) {
  return (
    <div className="container-rm mt-16">
      <div className="prose-rm mx-auto max-w-3xl">{children}</div>
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
  if (!others.length) return null;
  return (
    <section className="container-rm mt-16">
      <div className="mx-auto max-w-3xl">
        <p className="t-h3">More free tools</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((t) => (
            <li key={t.slug}>
              <Link href={toolPath(t.slug)} className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
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
  );
}
