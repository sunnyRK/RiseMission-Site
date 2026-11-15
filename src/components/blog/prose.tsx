import Link from "next/link";
import type { ReactNode } from "react";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return <h2 id={id ?? slugify(textOf(children))}>{children}</h2>;
}
H2.isH2 = true;

export function H3({ children }: { children: ReactNode }) {
  return <h3>{children}</h3>;
}

export { textOf };

/** Bold, 40–60 word direct answer at the top of every post (what AI engines lift). */
export function Answer({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-line bg-card p-5 text-[1.05rem] leading-relaxed text-ink shadow-soft">
      {children}
    </p>
  );
}

export function KeyTakeaways({ items }: { items: ReactNode[] }) {
  return (
    <aside aria-label="Key takeaways" className="rounded-2xl bg-accent-soft/60 p-5 sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Key takeaways</p>
      <ul className="mt-3 space-y-2 !pl-5 text-ink">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </aside>
  );
}

export function Callout({ title, children, tone = "sun" }: { title?: string; children: ReactNode; tone?: "sun" | "accent" }) {
  return (
    <aside className={`rounded-2xl border-l-4 p-5 ${tone === "sun" ? "border-sun bg-sun-soft" : "border-accent bg-accent-soft/60"}`}>
      {title && <p className="font-semibold text-ink">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </aside>
  );
}

/** Honest limitation box — required on every post/landing (E-E-A-T trust). */
export function Limits({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-line bg-paper-2 p-5">
      <p className="font-semibold text-ink">Where this advice stops</p>
      <div className="mt-1">{children}</div>
    </aside>
  );
}

export type Source = { label: string; href: string; note?: string };

/** Cited sources rendered as a numbered list at the end of the post. */
export function Sources({ items }: { items: Source[] }) {
  return (
    <section aria-label="Sources" className="border-t border-line pt-6 text-sm">
      <h2 id="sources" className="!mt-0 !font-sans !text-base !font-semibold">
        Sources
      </h2>
      <ol className="mt-3 space-y-1.5">
        {items.map((s) => (
          <li key={s.href}>
            <a href={s.href} rel="noopener" target="_blank">
              {s.label}
            </a>
            {s.note ? <span className="text-muted"> ({s.note})</span> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href}>{children}</Link>;
}
