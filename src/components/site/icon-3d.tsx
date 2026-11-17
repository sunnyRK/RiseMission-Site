import Image from "next/image";
import { icon3dSrc, type Icon3D as Icon3DName } from "@/lib/site";

export type { Icon3DName };

/**
 * The app's soft-3D icon (3dicons.co, CC0; same files as the app's
 * Assets.xcassets/Icons3D). Sources are 256px palette PNGs; next/image serves
 * AVIF/WebP at the rendered size. Decorative by default (alt=""), because the
 * text next to it always names the thing.
 */
export function Icon3D({
  name,
  size = 48,
  alt = "",
  priority = false,
  className = "",
}: {
  name: Icon3DName;
  size?: number;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={icon3dSrc(name)}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      preload={priority}
      loading={priority ? undefined : "lazy"}
      draggable={false}
      className={`icon3d pointer-events-none select-none ${className}`}
    />
  );
}
