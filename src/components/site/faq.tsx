import type { QA } from "@/lib/seo";

/** Visible FAQ. Pair with faqPageLd(sameArray) so schema == what users see. */
export function Faq({ items, heading = "Questions, answered" }: { items: QA[]; heading?: string }) {
  return (
    <section aria-labelledby="faq" className="container-rm py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
      <h2 id="faq" className="t-h2 text-center">
        {heading}
      </h2>
      <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-card">
        {items.map((f) => (
          <details key={f.q} className="group px-5 py-4 sm:px-6" open={false}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
              <h3 className="text-[1rem] font-semibold tracking-tight">{f.q}</h3>
              <span aria-hidden className="mt-0.5 text-muted transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
      </div>
    </section>
  );
}
