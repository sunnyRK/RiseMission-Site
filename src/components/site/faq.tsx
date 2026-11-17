import type { QA } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { Icon3D } from "./icon-3d";

/** Visible FAQ. Pair with faqPageLd(sameArray) so schema == what users see. */
export function Faq({ items, heading = "Questions, answered" }: { items: QA[]; heading?: string }) {
  return (
    <section aria-labelledby="faq" className="container-rm py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Icon3D name="3d-magnifier" size={64} className="mx-auto mb-3 block" />
        <p className="t-eyebrow w-full justify-center">FAQ</p>
        <h2 id="faq" className="t-h2 mt-3 text-balance text-center">
          {heading}
        </h2>
        <Reveal stagger className="mt-10 space-y-3">
          {items.map((f) => (
            <details key={f.q} className="rm-faq rm-card group !rounded-[20px]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-[20px] px-5 py-4 text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.02rem] font-bold leading-snug tracking-[-0.01em] text-pretty">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="rm-faq-plus relative h-8 w-8 shrink-0 rounded-full bg-accent-soft text-accent transition-colors duration-200 group-open:bg-accent group-open:text-accent-ink"
                >
                  <i />
                  <i />
                </span>
              </summary>
              <p className="max-w-[65ch] px-5 pb-5 text-[0.98rem] leading-relaxed text-ink-2 text-pretty sm:px-6">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
