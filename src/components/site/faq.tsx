import { ChevronDown } from "lucide-react";
import type { QA } from "@/lib/seo";

/** Visible FAQ. Pair with faqPageLd(sameArray) so schema == what users see. */
export function Faq({ items, heading = "Questions, answered" }: { items: QA[]; heading?: string }) {
  return (
    <section aria-labelledby="faq" className="container-rm py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="t-eyebrow w-full justify-center">FAQ</p>
        <h2 id="faq" className="t-h2 mt-3 text-balance text-center">
          {heading}
        </h2>
        <div className="rm-card mt-10 divide-y divide-line overflow-hidden">
          {items.map((f) => (
            <details key={f.q} className="group" open={false}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-ink transition-colors hover:bg-paper-2/60 focus-visible:bg-paper-2/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1rem] font-semibold leading-snug tracking-[-0.01em] text-pretty">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-ink motion-reduce:transition-none"
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-[65ch] px-5 pb-5 text-[0.98rem] leading-relaxed text-ink-2 text-pretty sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
