import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Icon3D, type Icon3DName } from "./icon-3d";

/** Standard section rhythm: 80px mobile / 112px desktop vertical spacing. */
export function Section({ id, children, className = "", tone }: { id?: string; children: ReactNode; className?: string; tone?: "tint" | "wash" }) {
  const toneCls = tone === "tint" ? "border-y border-line/70 bg-paper-2/60" : tone === "wash" ? "rm-wash" : "";
  return (
    <section id={id} className={`scroll-mt-16 py-20 md:py-28 ${toneCls} ${className}`}>
      <div className="container-rm">{children}</div>
    </section>
  );
}

/**
 * Section title in the app's header style: optional 3D icon, tracked uppercase
 * label (RMSectionLabel), bold title, secondary lead.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  center = false,
  icon,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  icon?: Icon3DName;
  id?: string;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {icon && <Icon3D name={icon} size={64} className={`mb-3 ${center ? "mx-auto" : ""}`} />}
      {eyebrow && <p className={`t-eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className="t-h2 mt-3">
        {title}
      </h2>
      {lead && <p className="t-lead mt-4">{lead}</p>}
    </Reveal>
  );
}
