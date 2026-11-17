import { icon3dSrc, type Icon3D } from "@/lib/site";

/**
 * The app's soft-3D icon (same file and name as in the app). Decorative by
 * default: the label next to it carries the meaning. Kept as a plain <img> so
 * the design agent's components can replace it at merge without layout churn.
 */
export function Icon3d({ name, size = 40, alt = "", className = "" }: { name: Icon3D; size?: number; alt?: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon3dSrc(name)}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`inline-block shrink-0 select-none ${className}`}
    />
  );
}
