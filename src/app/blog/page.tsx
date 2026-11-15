import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_TOPICS, postPath, sortedPosts } from "@/lib/blog";
import { breadcrumbLd, collectionPageLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION = "Practical, research-backed guides to waking up on time: heavy sleepers, the snooze habit, early rising and morning routines.";

export const metadata = pageMetadata({
  title: "Wake-Up Guides & Sleep Tips",
  description: DESCRIPTION,
  path: "/blog",
});

export default function BlogIndex() {
  const posts = sortedPosts();
  return (
    <>
      <JsonLd
        data={[
          collectionPageLd({ name: "Rise Mission Blog", description: DESCRIPTION, path: "/blog", urls: posts.map((p) => postPath(p.slug)) }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <section className="sunrise-glow dawn">
        <div className="container-rm pb-12 pt-12 md:pt-16">
          <h1 className="t-h1">Wake up on the first alarm</h1>
          <p className="t-lead mt-4 max-w-2xl">{DESCRIPTION}</p>
          <nav aria-label="Topics" className="mt-6 flex flex-wrap gap-2 text-sm">
            {BLOG_TOPICS.map((t) => (
              <Link key={t.slug} href={`/blog/topic/${t.slug}`} className="rounded-full border border-line bg-card px-3 py-1.5 text-ink-2 hover:text-ink">
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
