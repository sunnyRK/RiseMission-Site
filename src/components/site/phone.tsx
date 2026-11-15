import Image from "next/image";

/** Screenshot in a code-drawn iPhone frame (no frame PNG to download). */
export function Phone({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative rounded-[2.6rem] bg-ink p-[9px] shadow-[0_30px_60px_-20px_rgb(13_14_20/0.45)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1320}
        height={2868}
        priority={priority}
        sizes="(max-width: 640px) 70vw, 300px"
        className="h-auto w-full rounded-[2.05rem]"
      />
    </div>
  );
}
