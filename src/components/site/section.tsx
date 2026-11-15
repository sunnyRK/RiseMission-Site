import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/** Standard section rhythm: 80px mobile / 112px desktop vertical spacing. */
export function Section({ id, children, className = "", tone }: { id?: string; children: ReactNode; className?: string; tone?: "tint" }) {
  return (
    <section id={id} className={`scroll-mt-16 py-20 md:py-28 ${tone === "tint" ? "border-y border-line/70 bg-paper-2/70" : ""} ${className}`}>
      <div className="container-rm">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, lead, center = false }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`t-eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="t-h2 mt-3">{title}</h2>
      {lead && <p className="t-lead mt-4">{lead}</p>}
    </Reveal>
  );
}
