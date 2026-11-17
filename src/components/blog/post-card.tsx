import Image from "next/image";
import Link from "next/link";
import { postCover, postPath, type BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  const cover = postCover(post);
  return (
    <Link
      href={postPath(post.slug)}
      className="rm-card lift group flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Image
        src={cover}
        alt=""
        width={1200}
        height={630}
        unoptimized={cover.startsWith("/og")}
          sizes="(max-width: 640px) 100vw, 400px"
        className="aspect-[1200/630] h-auto w-full border-b border-line object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-accent">{post.eyebrow}</p>
        <h3 className="mt-2 text-[1.15rem] font-extrabold leading-snug tracking-tight text-ink text-balance decoration-line underline-offset-4 group-hover:underline">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-2">{post.description}</p>
        <p className="mt-auto pt-4">
          <span className="rm-chip">{post.readMinutes} min read</span>
        </p>
      </div>
    </Link>
  );
}
