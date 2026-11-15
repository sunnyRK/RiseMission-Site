import Link from "next/link";
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import { Info, ListChecks, Scale, Sun } from "lucide-react";

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

/**
 * Scrollable frame for a real <table>: keeps table semantics, scrolls inside
 * itself on phones (edge shadows show there is more), never the page.
 * Focusable so keyboard users can scroll it.
 */
export function TableScroll({ children, label = "Table" }: { children: ReactNode; label?: string }) {
  return (
    <div className="rm-table" role="region" aria-label={`${label} (scrolls sideways)`} tabIndex={0}>
      {children}
    </div>
  );
}

/** Flatten fragments so layouts see top-level blocks. */
export function flattenBlocks(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  Children.forEach(children, (c) => {
    if (isValidElement(c) && c.type === Fragment) out.push(...flattenBlocks((c as ReactElement<{ children?: ReactNode }>).props.children));
    else out.push(c);
  });
  return out;
}

/** Wrap top-level bare <table> blocks in a TableScroll frame. */
export function wrapTables(blocks: ReactNode[]): ReactNode[] {
  return blocks.map((b, i) =>
    isValidElement(b) && b.type === "table" ? <TableScroll key={`tbl-${i}`}>{b}</TableScroll> : b,
  );
}

/** Bold, 40–60 word direct answer at the top of every post (what AI engines lift). */
export function Answer({ children }: { children: ReactNode }) {
  return <p className="rm-callout rm-answer">{children}</p>;
}

export function KeyTakeaways({ items }: { items: ReactNode[] }) {
  return (
    <aside aria-label="Key takeaways" className="rm-callout rm-takeaways">
      <p className="rm-callout-label">
        <ListChecks aria-hidden /> Key takeaways
      </p>
      <ul>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </aside>
  );
}

export function Callout({ title, children, tone = "sun" }: { title?: string; children: ReactNode; tone?: "sun" | "accent" }) {
  const Icon = tone === "sun" ? Sun : Info;
  return (
    <aside className={`rm-callout ${tone === "sun" ? "rm-note-sun" : "rm-note-accent"}`}>
      {title ? (
        <p className="rm-callout-label !text-[0.95rem]">
          <Icon aria-hidden /> {title}
        </p>
      ) : null}
      <div className="text-ink-2">{children}</div>
    </aside>
  );
}

/** Honest limitation box — required on every post/landing (E-E-A-T trust). */
export function Limits({ children }: { children: ReactNode }) {
  return (
    <aside className="rm-callout rm-limits">
      <p className="rm-callout-label !text-[0.95rem]">
        <Scale aria-hidden /> Where this advice stops
      </p>
      <div className="text-ink-2">{children}</div>
    </aside>
  );
}

export type Source = { label: string; href: string; note?: string };

/** Cited sources rendered as a numbered list at the end of the post. */
export function Sources({ items }: { items: Source[] }) {
  return (
    <section aria-label="Sources" className="rm-sources !mt-12 border-t border-line pt-7 text-[0.9rem] leading-relaxed">
      <h2 id="sources" className="!mt-0 !text-[0.8125rem] !font-semibold !tracking-normal text-ink">
        Sources
      </h2>
      <ol className="mt-4 space-y-2.5">
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
