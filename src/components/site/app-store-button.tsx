import { APP_STORE_URL } from "@/lib/site";
import { AppleLogo } from "./icons";

export function appStoreHref(placement: string) {
  // App Store Connect campaign links need your provider token (`pt`). Set
  // NEXT_PUBLIC_APPSTORE_PT (ASC → App Analytics → Sources → Campaigns) to enable.
  const pt = process.env.NEXT_PUBLIC_APPSTORE_PT;
  return pt ? `${APP_STORE_URL}?pt=${pt}&ct=web-${encodeURIComponent(placement)}&mt=8` : APP_STORE_URL;
}

/**
 * App Store badge-style button: Apple logo + two-line "Download on the /
 * App Store", black in light mode, white in dark mode (Apple badge styling).
 * `placement` feeds the app_store_click analytics event.
 */
export function AppStoreButton({
  placement,
  size = "md",
  className = "",
}: {
  placement: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const lg = size === "lg";
  return (
    <a
      href={appStoreHref(placement)}
      data-cta={placement}
      className={`inline-flex items-center gap-2.5 rounded-[14px] bg-ink text-paper shadow-[0_1px_2px_rgb(22_20_31/0.08),0_8px_20px_-10px_rgb(22_20_31/0.45)] transition-[translate,box-shadow,opacity] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgb(22_20_31/0.08),0_14px_28px_-12px_rgb(22_20_31/0.5)] active:translate-y-0 motion-reduce:hover:translate-y-0 ${lg ? "h-[60px] px-6" : "h-[52px] px-5"} ${className}`}
    >
      <AppleLogo className={lg ? "h-7 w-7" : "h-6 w-6"} />
      <span className="flex flex-col items-start leading-none">
        <span className={lg ? "text-[11px]" : "text-[10px]"}>Download on the</span>
        <span className={`mt-0.5 font-semibold tracking-tight ${lg ? "text-[22px]" : "text-[19px]"}`}>App Store</span>
      </span>
    </a>
  );
}
