import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postPath } from "@/lib/blog";
import { toolLinks } from "@/lib/links";
import { Icon3D } from "@/components/site/icon-3d";

/** Tool → guides block (data in TOOL_POSTS, src/lib/links.ts). */
export function RelatedGuides({ tool }: { tool: string }) {
  const posts = toolLinks(tool);
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-guides" className="container-rm mt-16">
      <div className="mx-auto max-w-3xl">
        <p id="related-guides" className="flex items-center gap-2.5 text-[1.35rem] font-extrabold tracking-tight">
          <Icon3D name="3d-pencil" size={40} />
          Related guides
        </p>
        <ul className="rm-card mt-4 divide-y divide-line overflow-hidden !rounded-[22px]">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={postPath(p.slug)} className="rm-focus group flex min-h-14 items-center gap-4 px-5 py-4 transition-colors hover:bg-paper-2/50">
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-accent">{p.eyebrow}</span>
                  <span className="mt-0.5 block font-bold leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                    {p.metaTitle ?? p.title}
                  </span>
                </span>
                <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
