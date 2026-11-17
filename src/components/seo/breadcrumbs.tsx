import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { crumbsFor } from "@/lib/links";
import { breadcrumbLd } from "@/lib/seo";

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD, both from
 * `crumbsFor(path)` (src/lib/links.ts), so the schema always describes what is
 * on the page. The current page is the last crumb and is not a link.
 * `bare` drops the container wrapper for layouts that already provide one.
 */
export function Breadcrumbs({ path, bare = false, className = "" }: { path: string; bare?: boolean; className?: string }) {
  const crumbs = crumbsFor(path);
  const nav = (
    <nav aria-label="Breadcrumb" className={`text-[0.875rem] text-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-x-1.5">
              {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />}
              {last ? (
                <span aria-current="page" className="text-ink-2">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="rm-focus inline-flex min-h-6 items-center rounded hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      {bare ? nav : <div className="container-rm pt-6">{nav}</div>}
    </>
  );
}
