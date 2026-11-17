import Image from "next/image";
import { ENTITY_DESCRIPTION } from "@/lib/site";

/**
 * "What is Rise Mission?" direct answer (ENTITY_DESCRIPTION, 40-60 words),
 * styled like the app's tinted info row: app icon, bold question, the answer.
 */
export function EntityAnswer({ className = "", heading = "What is Rise Mission?" }: { className?: string; heading?: string }) {
  return (
    <div className={`rm-card rm-tint-card flex gap-4 p-5 text-left sm:p-6 ${className}`} style={{ ["--tint" as string]: "#2F5BFF" }}>
      <Image src="/assets/icon.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-[12px] shadow-[0_6px_14px_-6px_rgb(30_63_217/0.55)]" />
      <div className="min-w-0">
        <p className="font-extrabold tracking-tight text-ink">{heading}</p>
        <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{ENTITY_DESCRIPTION}</p>
      </div>
    </div>
  );
}
