import Image from "next/image";
import Link from "next/link";
import { postCover, postPath, type BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  const cover = postCover(post);
  return (
    <Link href={postPath(post.slug)} className="group block overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <Image
        src={cover}
        alt=""
        width={1200}
        height={630}
        unoptimized={cover.startsWith("/og") || cover.startsWith("/covers/")}
        className="h-auto w-full border-b border-line"
      />
      <div className="p-5">
        <p className="text-[0.8rem] font-medium text-accent">{post.eyebrow}</p>
        <h3 className="t-h3 mt-2 group-hover:underline">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink-2">{post.description}</p>
        <p className="mt-3 text-xs text-muted">{post.readMinutes} min read</p>
      </div>
    </Link>
  );
}
