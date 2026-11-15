import Image from "next/image";
import Link from "next/link";
import { postCover, postPath, type BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  const cover = postCover(post);
  return (
    <Link
      href={postPath(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
        <p className="text-[0.8125rem] font-medium text-accent">{post.eyebrow}</p>
        <h3 className="t-h3 mt-2 text-balance decoration-line underline-offset-4 group-hover:underline">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-2">{post.description}</p>
        <p className="mt-auto pt-4 text-[0.8125rem] text-muted">{post.readMinutes} min read</p>
      </div>
    </Link>
  );
}
