import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_TOPICS, getPost, getTopic, postPath } from "@/lib/blog";
import { breadcrumbLd, collectionPageLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_TOPICS.map((t) => ({ topic: t.slug }));
}


export async function generateMetadata({ params }: PageProps<"/blog/topic/[topic]">) {
  const t = getTopic((await params).topic);
  if (!t) return {};
  return pageMetadata({ title: t.metaTitle, description: t.description, path: `/blog/topic/${t.slug}` });
}

export default async function TopicPage({ params }: PageProps<"/blog/topic/[topic]">) {
  const t = getTopic((await params).topic);
  if (!t) notFound();
  const posts = t.posts.map(getPost);
  const path = `/blog/topic/${t.slug}`;
  return (
    <>
      <JsonLd
        data={[
          collectionPageLd({ name: t.title, description: t.description, path, urls: posts.map((p) => postPath(p.slug)) }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: t.name, path },
          ]),
        ]}
      />
      <section className="sunrise-glow dawn">
        <div className="container-rm pb-12 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
          </nav>
          <h1 className="t-h1 mt-3">{t.title}</h1>
          <p className="t-lead mt-4 max-w-2xl">{t.intro}</p>
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
        <p className="mt-10 text-ink-2">
          Other topics:{" "}
          {BLOG_TOPICS.filter((o) => o.slug !== t.slug).map((o, i, arr) => (
            <span key={o.slug}>
              <Link href={`/blog/topic/${o.slug}`} className="font-semibold text-accent">
                {o.name}
              </Link>
              {i < arr.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>
    </>
  );
}
