import Image from "next/image";

/** App Store marketing composite (already has its own frame + headline). */
export function ShotCard({
  src,
  alt,
  preload = false,
  className = "",
  sizes = "(max-width: 640px) 60vw, 260px",
}: {
  src: string;
  alt: string;
  preload?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1320}
      height={2868}
      preload={preload}
      sizes={sizes}
      className={`h-auto min-w-0 rounded-[1.6rem] border border-line shadow-[0_24px_50px_-24px_rgb(13_14_20/0.35)] ${className}`}
    />
  );
}
