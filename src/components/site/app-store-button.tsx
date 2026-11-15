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
      aria-label="Download Rise Mission on the App Store"
      className={`inline-flex items-center gap-2.5 rounded-[14px] bg-ink text-paper transition hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 ${lg ? "h-[60px] px-6" : "h-[52px] px-5"} ${className}`}
    >
      <AppleLogo className={lg ? "h-7 w-7" : "h-6 w-6"} />
      <span className="flex flex-col items-start leading-none">
        <span className={lg ? "text-[11px]" : "text-[10px]"}>Download on the</span>
        <span className={`mt-0.5 font-semibold tracking-tight ${lg ? "text-[22px]" : "text-[19px]"}`}>App Store</span>
      </span>
    </a>
  );
}
