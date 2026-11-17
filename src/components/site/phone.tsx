/**
 * A raw app screenshot (1320×2868, status bar and Dynamic Island included) in a
 * code-drawn iPhone 17 Pro frame: dark titanium bezel, lit rim, side buttons.
 * Corner radii are percentages, so the frame scales with any width. 0 KB of
 * frame images.
 *
 * The <img> goes through the Next image optimizer (AVIF/WebP) with a lean
 * three-width srcset: phones are never shown wider than ~300 CSS px, so
 * 384/640/828 cover 1x–3x screens without next/image's 15-URL srcset in the
 * HTML (13 phones on the homepage).
 */
const WIDTHS = [384, 640, 828] as const;
const opt = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

export function Phone({
  src,
  alt,
  preload = false,
  sizes = "(max-width: 640px) 70vw, 300px",
  className = "",
  width = 1320,
  height = 2868,
}: {
  src: string;
  alt: string;
  preload?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const srcSet = WIDTHS.map((w) => `${opt(src, w)} ${w}w`).join(", ");
  return (
    <div className={`rm-phone ${className}`}>
      <span aria-hidden className="rm-phone-btn rm-phone-btn-l" />
      <span aria-hidden className="rm-phone-btn rm-phone-btn-r" />
      {/* eslint-disable-next-line @next/next/no-img-element -- optimizer URLs with a lean srcset, see above */}
      <img
        src={opt(src, 640)}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={preload ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="rm-phone-screen"
      />
    </div>
  );
}
