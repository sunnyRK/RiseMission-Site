import Image from "next/image";
import Link from "next/link";
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { postCover, postPath, relatedPosts, topicsForPost, type BlogPost } from "@/lib/blog";
import { articleLd, breadcrumbLd, faqPageLd, type QA } from "@/lib/seo";
import { AUTHOR, PRICING_COPY } from "@/lib/site";
import { H2, slugify, textOf } from "./prose";

type TocItem = { id: string; text: string };

/** Flatten fragments so the TOC + mid-CTA see top-level blocks. */
function flatten(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  Children.forEach(children, (c) => {
    if (isValidElement(c) && c.type === Fragment) out.push(...flatten((c as ReactElement<{ children?: ReactNode }>).props.children));
    else out.push(c);
  });
  return out;
}

function isH2(node: ReactNode): node is ReactElement<{ children: ReactNode; id?: string }> {
  return isValidElement(node) && node.type === H2;
}

function collectToc(blocks: ReactNode[]): TocItem[] {
  return blocks.filter(isH2).map((h) => {
    const text = textOf(h.props.children);
    return { id: h.props.id ?? slugify(text), text };
  });
}

/** Insert the app CTA right before the 3rd H2 (pagedrop's injectMidCta). */
function injectMidCta(blocks: ReactNode[]): ReactNode[] {
  let seen = 0;
  const out: ReactNode[] = [];
  blocks.forEach((b, i) => {
    if (isH2(b)) {
      seen++;
      if (seen === 3) out.push(<MidCta key={`mid-cta-${i}`} />);
    }
    out.push(b);
  });
  return out;
}

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function BlogLayout({ post, faq, children }: { post: BlogPost; faq?: QA[]; children: ReactNode }) {
  const blocks = flatten(children);
  const toc = collectToc(blocks);
  const body = injectMidCta(blocks);
  const topics = topicsForPost(post.slug);
  const related = relatedPosts(post.slug);
  const path = postPath(post.slug);
  const cover = postCover(post);
  const hub = topics[0];

  const ld: object[] = [
    articleLd({
      title: post.title,
      description: post.metaDescription ?? post.description,
      path,
      image: cover,
      datePublished: post.date,
      dateModified: post.updated,
    }),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      ...(hub ? [{ name: hub.name, path: `/blog/topic/${hub.slug}` }] : []),
      { name: post.title, path },
    ]),
  ];
  if (faq?.length) ld.push(faqPageLd(faq));

  return (
    <article className="pb-8">
      <JsonLd data={ld} />
      <div className="sunrise-glow dawn">
      <div className="container-rm grid grid-cols-[minmax(0,1fr)] gap-x-14 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <header className="mx-auto w-full max-w-3xl pb-10 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
            {hub && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/blog/topic/${hub.slug}`} className="hover:text-ink">
                  {hub.name}
                </Link>
              </>
            )}
          </nav>
          <h1 className="t-h1 mt-4">{post.title}</h1>
          <p className="t-lead mt-4">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span>
              By{" "}
              <Link href="/about" rel="author" className="font-semibold text-ink hover:underline">
                {AUTHOR.name}
              </Link>
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{fmt(post.date)}</time>
            {post.updated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.updated}>{fmt(post.updated)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </div>
          {topics.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link href={`/blog/topic/${t.slug}`} className="rounded-full border border-line bg-card px-3 py-1 text-ink-2 hover:text-ink">
                    #{t.name.toLowerCase().replace(/\s+/g, "")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
      </header>
      <div aria-hidden className="hidden lg:block" />
      </div>
      </div>

      <div className="container-rm grid grid-cols-[minmax(0,1fr)] gap-x-14 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <Image
          src={cover}
          alt={post.title}
          width={1200}
          height={630}
          priority
          unoptimized={cover.startsWith("/og") || cover.startsWith("/covers/")}
          className="h-auto w-full rounded-2xl border border-line"
        />
        <div className="prose-rm mt-10">{body}</div>
      </div>
        {toc.length >= 2 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24 pt-2 text-sm">
              <p className="font-semibold text-ink">On this page</p>
              <ol className="mt-3 space-y-2 border-l border-line pl-4 text-muted">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="hover:text-ink">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}
      </div>

      {faq?.length ? <Faq items={faq} heading="Quick answers" /> : null}

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl border border-line bg-card p-8 text-center shadow-soft">
          <p className="t-h2 !text-2xl">Make tomorrow the morning you don&apos;t snooze</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">
            Rise Mission keeps ringing until you prove you&apos;re awake. {PRICING_COPY.short}.
          </p>
          <div className="mt-6 flex justify-center">
            <AppStoreButton placement={`blog-end-${post.slug}`} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <aside aria-label="Keep reading" className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
          <p className="t-h2 !text-2xl">Keep reading</p>
          <ul className="mt-5 grid gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={postPath(r.slug)} className="block rounded-2xl border border-line bg-card p-5 hover:shadow-soft">
                  <p className="font-semibold">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-2">{r.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}

function MidCta() {
  return (
    <aside className="not-prose my-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-ink">An alarm that checks you&apos;re actually up</p>
        <p className="mt-1 text-sm text-muted">Push-ups, a walk, a QR scan or math. Snoozing stops being an option.</p>
      </div>
      <AppStoreButton placement="blog-mid" className="shrink-0" />
    </aside>
  );
}
