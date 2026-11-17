import Image from "next/image";
import Link from "next/link";
import { isValidElement, type ReactElement, type ReactNode } from "react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { CtaBand } from "@/components/site/cta-band";
import { Icon3D } from "@/components/site/icon-3d";
import { HeroIcon, TOOL_ICON3D, TOPIC_ICON3D } from "@/components/site/page-icons";
import { Faq } from "@/components/site/faq";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { postCover, postPath, topicsForPost, type BlogPost } from "@/lib/blog";
import { postLinks } from "@/lib/links";
import { articleLd, faqPageLd, type QA } from "@/lib/seo";
import { AUTHOR, LIVE_VERSION, PRICING_COPY } from "@/lib/site";
import { ArrowRight, ArrowUp, ChevronDown, ChevronRight, ListOrdered } from "lucide-react";
import { ReadingProgress, TocList } from "./article-chrome";
import { H2, flattenBlocks, slugify, textOf, wrapTables } from "./prose";
import "@/app/content.css";

type TocItem = { id: string; text: string };

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
  const blocks = flattenBlocks(children);
  const toc = collectToc(blocks);
  const body = wrapTables(injectMidCta(blocks));
  const topics = topicsForPost(post.slug);
  const links = postLinks(post.slug);
  const related = links.siblings;
  const path = postPath(post.slug);
  const cover = postCover(post);

  const ld: object[] = [
    articleLd({
      title: post.title,
      description: post.metaDescription ?? post.description,
      path,
      image: cover,
      datePublished: post.date,
      dateModified: post.updated,
    }),
  ];
  if (faq?.length) ld.push(faqPageLd(faq));

  return (
    <article id="article" className="pb-8">
      <JsonLd data={ld} />
      <ReadingProgress target="#article-body" />
      <div className="sunrise-glow dawn">
        <div className="container-rm grid grid-cols-[minmax(0,1fr)] gap-x-14 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <header className="mx-auto w-full max-w-[42.5rem] pb-10 pt-10 md:pt-16">
            <Breadcrumbs path={path} bare />
            <div className="mt-5">
              <HeroIcon name={(topics[0] && TOPIC_ICON3D[topics[0].slug]) || "3d-sun"} size={64} />
            </div>
            <h1 className="t-h1 text-balance">{post.title}</h1>
            <p className="t-lead mt-4 text-pretty">{post.description}</p>

            <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
              <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-[0.8rem] font-semibold tracking-wide text-paper">
                {initials(AUTHOR.name)}
              </span>
              <div className="min-w-0 text-[0.875rem] leading-snug">
                <p>
                  <Link href="/about" rel="author" className="rm-focus rounded font-semibold text-ink hover:underline">
                    {AUTHOR.name}
                  </Link>
                  <span className="text-muted"> · {AUTHOR.role}</span>
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-muted">
                  {post.updated ? (
                    <span>
                      Updated <time dateTime={post.updated}>{fmt(post.updated)}</time>
                    </span>
                  ) : (
                    <time dateTime={post.date}>{fmt(post.date)}</time>
                  )}
                  <span aria-hidden>·</span>
                  <span>{post.readMinutes} min read</span>
                  {post.updated && (
                    <>
                      <span aria-hidden>·</span>
                      <span>
                        Published <time dateTime={post.date}>{fmt(post.date)}</time>
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {topics.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2 text-[0.8125rem]">
                {topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/blog/topic/${t.slug}`}
                      className="rm-focus inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-card py-0.5 pl-1 pr-3 font-bold text-ink-2 shadow-[inset_0_1px_0_var(--highlight)] transition-colors hover:border-ink/20 hover:text-ink"
                    >
                      <Icon3D name={TOPIC_ICON3D[t.slug] ?? "3d-sun"} size={24} />
                      {t.name}
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
        <div className="mx-auto w-full min-w-0 max-w-[42.5rem]">
          <Image
            src={cover}
            alt={post.title}
            width={1200}
            height={630}
            preload
            unoptimized={cover.startsWith("/og")}
          sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-[24px] border border-line shadow-[var(--shadow)]"
          />
          {toc.length >= 2 && (
            <nav aria-label="On this page" className="mt-6 lg:hidden">
              <details className="rm-toc-mobile rm-card group !rounded-[20px]">
                <summary className="rm-focus flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 text-[0.9375rem] font-semibold text-ink">
                  <span className="flex items-center gap-2">
                    <ListOrdered aria-hidden className="h-4 w-4 text-muted" /> On this page
                    <span className="font-normal text-muted">· {toc.length} sections</span>
                  </span>
                  <ChevronDown aria-hidden className="rm-chevron h-4 w-4 text-muted transition-transform motion-reduce:transition-none" />
                </summary>
                <ol className="border-t border-line px-4 py-2 text-[0.9375rem]">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="rm-focus flex min-h-11 items-center gap-3 rounded py-1.5 text-ink-2 hover:text-ink">
                        <span className="w-5 shrink-0 text-right text-[0.8125rem] tabular-nums text-muted">{i + 1}</span>
                        <span>{t.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>
          )}
          <div id="article-body" className="prose-rm mt-10">
            {body}
          </div>
        </div>
        {toc.length >= 2 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6 pt-2">
              <p className="text-[0.8125rem] font-semibold text-ink">On this page</p>
              <TocList items={toc} />
              <a href="#article" className="rm-focus mt-5 inline-flex items-center gap-1.5 rounded text-[0.8125rem] font-medium text-muted hover:text-ink">
                <ArrowUp aria-hidden className="h-3.5 w-3.5" /> Back to top
              </a>
            </div>
          </nav>
        )}
      </div>

      {faq?.length ? <Faq items={faq} heading="Quick answers" /> : null}

      <div className="container-rm">
        <div className="mx-auto max-w-[42.5rem]">
          <CtaBand
            placement={`blog-end-${post.slug}`}
            title="Make tomorrow the morning you don't snooze"
            body={<>Rise Mission makes you prove you&apos;re awake before your morning starts. iPhone · iOS 26+ · {PRICING_COPY.short}.</>}
          />
          <ul className="mt-4 flex flex-wrap justify-center gap-2 text-[0.875rem]">
            {[
              ["/compatibility", "iPhone and iOS 26 requirements"],
              ["/whats-new", `What's new in ${LIVE_VERSION}`],
              ["/gallery", "Screenshots and videos"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="rm-focus lift inline-flex min-h-11 items-center gap-1 rounded-full border border-line bg-card px-4 font-bold text-ink-2 shadow-[inset_0_1px_0_var(--highlight)] hover:text-ink">
                  {label} <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>

          <aside aria-labelledby="try-tool" className="mt-10">
            <p id="try-tool" className="t-eyebrow">
              Free tool
            </p>
            <Link
              href={links.tool.href}
              className="rm-grad lift rm-focus group mt-3 flex items-center gap-4 p-4 sm:p-5"
              style={{ ["--top" as string]: "#3B3F8F", ["--deep" as string]: "#23265E" }}
            >
              <Icon3D name={TOOL_ICON3D[links.tool.href.replace(/^\//, "")] ?? "3d-clock"} size={64} className="icon3d-hover h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
              <span className="min-w-0 flex-1">
                <span className="block text-[1.08rem] font-extrabold">{links.tool.label}</span>
                <span className="mt-0.5 block text-[0.9375rem] text-white/85">{links.tool.pitch}</span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
                <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </Link>
          </aside>

          {links.compare.length > 0 && (
            <aside aria-labelledby="choose-app" className="mt-10">
              <p id="choose-app" className="t-eyebrow">
                Choosing an alarm app?
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {links.compare.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="rm-card lift rm-focus group flex h-full min-h-14 items-center justify-between gap-3 !rounded-[18px] px-4 py-3 text-[0.9375rem] font-bold leading-snug text-ink"
                    >
                      <span>{l.label}</span>
                      <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {related.length > 0 && (
            <aside aria-labelledby="keep-reading" className="mt-16">
              <p id="keep-reading" className="t-h2 !text-[1.5rem]">
                Keep reading
              </p>
              <ul className="rm-card mt-5 divide-y divide-line overflow-hidden !rounded-[22px]">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={postPath(r.slug)} className="rm-focus group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-paper-2/50">
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-accent">{r.eyebrow}</span>
                        <span className="mt-1 block text-[1.0625rem] font-extrabold leading-snug tracking-[-0.01em] text-ink group-hover:underline group-hover:decoration-line group-hover:underline-offset-4">
                          {r.title}
                        </span>
                        <span className="mt-1.5 line-clamp-2 block text-[0.9375rem] leading-relaxed text-ink-2">{r.description}</span>
                        <span className="mt-2 block text-[0.8125rem] text-muted">{r.readMinutes} min read</span>
                      </span>
                      <ArrowRight aria-hidden className="mt-7 h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function MidCta() {
  return (
    <aside
      aria-label="Rise Mission app"
      className="not-prose rm-card rm-tint-card !my-12 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      style={{ ["--tint" as string]: "#2F5BFF" }}
    >
      <Icon3D name="3d-bell" size={56} className="hidden shrink-0 sm:block" />
      <div className="flex-1 text-[1rem] leading-snug">
        <p className="font-extrabold text-ink">An alarm that checks you&apos;re actually up</p>
        <p className="mt-1.5 text-[0.9375rem] text-ink-2">Push-ups, a walk, a QR scan or math. Snoozing stops being an option.</p>
      </div>
      <AppStoreButton placement="blog-mid" className="shrink-0" />
    </aside>
  );
}
