import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { flattenBlocks, wrapTables } from "@/components/blog/prose";
import "@/app/content.css";

export function DocPage({ title, path, updated, children }: { title: string; path: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <div className="container-rm pb-8 pt-10 md:pt-16">
        <div className="mx-auto max-w-[42.5rem]">
          <header className="border-b border-line pb-6">
            <Breadcrumbs path={path} bare className="mb-4" />
            <h1 className="t-h1 text-balance">{title}</h1>
            {updated && <p className="mt-3 text-[0.875rem] text-muted">Last updated: {updated}</p>}
          </header>
          <div className="prose-rm mt-8">{wrapTables(flattenBlocks(children))}</div>
        </div>
      </div>
    </>
  );
}
