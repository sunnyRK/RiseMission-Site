import type { ReactNode } from "react";
import { EntityAnswer } from "@/components/site/entity-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { flattenBlocks, wrapTables } from "@/components/blog/prose";
import type { Icon3DName } from "./icon-3d";
import { HeroIcon } from "./page-icons";
import "@/app/content.css";

export function DocPage({ title, path, updated, icon, answer = false, children }: { title: string; path: string; updated?: string; icon?: Icon3DName; answer?: boolean; children: ReactNode }) {
  return (
    <>
      <div className="sunrise-glow">
        <header className="container-rm pb-10 pt-8 md:pt-12">
          <div className="mx-auto max-w-[42.5rem]">
            <Breadcrumbs path={path} bare className="mb-5" />
            {icon && <HeroIcon name={icon} />}
            <h1 className="t-h1 text-balance">{title}</h1>
            {updated && <p className="mt-3 text-[0.875rem] font-semibold text-muted">Last updated: {updated}</p>}
            {answer && <EntityAnswer className="mt-6" />}
          </div>
        </header>
      </div>
      <div className="container-rm pb-8">
        <div className="rm-card mx-auto max-w-[46rem] px-5 py-7 sm:px-10 sm:py-10">
          <div className="prose-rm">{wrapTables(flattenBlocks(children))}</div>
        </div>
      </div>
    </>
  );
}
