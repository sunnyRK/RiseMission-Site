import Link from "next/link";
import { HeroIcon, TOPIC_ICON3D } from "@/components/site/page-icons";
import { Icon3D } from "@/components/site/icon-3d";
import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_TOPICS, postPath, sortedPosts } from "@/lib/blog";
import { BLOG_INDEX_ANSWER, getPage } from "@/lib/links";
import { collectionPageLd, staticPageMetadata } from "@/lib/seo";

const DESCRIPTION = getPage("/blog").description;

export const metadata = staticPageMetadata("/blog");

export default function BlogIndex() {
  const posts = sortedPosts();
  return (
    <>
      <JsonLd
        data={[
          collectionPageLd({
            name: "Rise Mission Blog",
            description: DESCRIPTION,
            path: "/blog",
            items: posts.map((p) => ({ url: postPath(p.slug), name: p.title })),
          }),
        ]}
      />
      <section className="sunrise-glow dawn">
        <div className="container-rm pb-12 pt-8 md:pt-12">
          <Breadcrumbs path="/blog" bare className="mb-5" />
          <HeroIcon name="3d-sun" />
          <h1 className="t-h1">Wake up on the first alarm</h1>
          <p className="t-lead mt-4 max-w-2xl">{BLOG_INDEX_ANSWER}</p>
          <nav aria-label="Topics" className="mt-6 flex flex-wrap gap-2 text-sm">
            {BLOG_TOPICS.map((t) => (
              <Link key={t.slug} href={`/blog/topic/${t.slug}`} className="lift inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-card py-1 pl-1.5 pr-3.5 font-bold text-ink-2 shadow-[inset_0_1px_0_var(--highlight)] hover:text-ink">
                <Icon3D name={TOPIC_ICON3D[t.slug] ?? "3d-sun"} size={28} />
                {t.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <section className="container-rm">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
