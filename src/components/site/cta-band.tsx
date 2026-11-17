import type { ReactNode } from "react";
import { AppStoreButton } from "./app-store-button";
import { Icon3D, type Icon3DName } from "./icon-3d";
import { Reveal } from "@/components/motion/reveal";

/**
 * The strong closing CTA band used site-wide: the app's deep-blue gradient
 * card with a sunrise glow, floating 3D icons, white App Store button.
 */
export function CtaBand({
  placement,
  title,
  body,
  note,
  icons = ["3d-bell", "3d-dumbbell", "3d-fire"],
  className = "",
  heading = false,
  children,
}: {
  placement: string;
  title: ReactNode;
  body: ReactNode;
  note?: ReactNode;
  icons?: [Icon3DName, Icon3DName, Icon3DName];
  className?: string;
  /** Render the title as an h2 (when the band is a real page section). */
  heading?: boolean;
  /** Optional art above the title (e.g. the orbit scene). */
  children?: ReactNode;
}) {
  const Title = heading ? "h2" : "p";
  return (
    <Reveal className={`rm-cta-band px-6 pb-10 pt-10 text-center sm:px-10 sm:pb-14 sm:pt-12 ${className}`}>
      <span aria-hidden className="rm-ring -right-16 -top-24 h-64 w-64" />
      <span aria-hidden className="rm-ring -bottom-28 -left-20 h-56 w-56" />
      <Icon3D name={icons[0]} size={64} className="rm-float absolute left-[6%] top-8 hidden opacity-95 sm:block" />
      <Icon3D name={icons[1]} size={56} className="rm-float-slow absolute bottom-10 right-[7%] hidden opacity-95 sm:block" />
      <Icon3D name={icons[2]} size={48} className="rm-float absolute right-[16%] top-10 hidden opacity-90 md:block" />
      {children}
      <Title className="t-h2 mx-auto max-w-2xl !text-white">{title}</Title>
      <p className="mx-auto mt-3 max-w-lg text-[1.05rem] leading-relaxed text-white/85">{body}</p>
      <div className="mt-7 flex justify-center">
        <AppStoreButton placement={placement} size="lg" className="!bg-white !text-[#14171c]" />
      </div>
      {note && <p className="mt-4 text-[0.85rem] font-semibold text-white/75">{note}</p>}
    </Reveal>
  );
}
