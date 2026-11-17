import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postPath } from "@/lib/blog";
import { toolLinks } from "@/lib/links";

/** Tool → guides block (data in TOOL_POSTS, src/lib/links.ts). */
export function RelatedGuides({ tool }: { tool: string }) {
  const posts = toolLinks(tool);
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-guides" className="container-rm mt-16">
      <div className="mx-auto max-w-3xl">
        <p id="related-guides" className="t-h3">
          Related guides
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={postPath(p.slug)} className="rm-focus group flex items-center gap-4 rounded py-4">
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8125rem] font-medium text-accent">{p.eyebrow}</span>
                  <span className="mt-0.5 block font-semibold leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
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
