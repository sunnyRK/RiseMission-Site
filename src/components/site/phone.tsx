import Image from "next/image";

/**
 * A raw app screenshot (1320×2868, status bar and Dynamic Island included) in a
 * code-drawn iPhone 17 Pro frame: dark titanium bezel, lit rim, side buttons.
 * Corner radii are percentages, so the frame scales with any width. 0 KB of
 * frame images.
 */
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
  return (
    <div className={`rm-phone ${className}`}>
      <span aria-hidden className="rm-phone-btn rm-phone-btn-l" />
      <span aria-hidden className="rm-phone-btn rm-phone-btn-r" />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        sizes={sizes}
        draggable={false}
        className="rm-phone-screen"
      />
    </div>
  );
}
