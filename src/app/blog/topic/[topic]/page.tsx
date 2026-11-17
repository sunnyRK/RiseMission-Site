import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_TOPICS, getPost, getTopic, postPath } from "@/lib/blog";
import { TOPIC_LINKS } from "@/lib/links";
import { collectionPageLd, pageMetadata } from "@/lib/seo";

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
          collectionPageLd({ name: t.title, description: t.description, path, items: posts.map((p) => ({ url: postPath(p.slug), name: p.title })) }),
        ]}
      />
      <section className="sunrise-glow dawn">
        <div className="container-rm pb-12 pt-8 md:pt-12">
          <Breadcrumbs path={path} bare />
          <h1 className="t-h1 mt-3">{t.title}</h1>
          <p className="t-lead mt-4 max-w-2xl">{t.answer}</p>
          <p className="mt-3 max-w-2xl text-ink-2">{t.intro}</p>
          {(TOPIC_LINKS[t.slug] ?? []).length > 0 && (
            <ul aria-label="Related tools and pages" className="mt-6 flex flex-wrap gap-2 text-sm">
              {TOPIC_LINKS[t.slug].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center rounded-full border border-line bg-card px-3 font-medium text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
