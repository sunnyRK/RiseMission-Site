import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { flattenBlocks, wrapTables } from "@/components/blog/prose";
import { breadcrumbLd } from "@/lib/seo";
import type { Icon3DName } from "./icon-3d";
import { HeroIcon } from "./page-icons";
import "@/app/content.css";

export function DocPage({ title, path, updated, icon, children }: { title: string; path: string; updated?: string; icon?: Icon3DName; children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <div className="sunrise-glow">
        <header className="container-rm pb-10 pt-10 md:pt-16">
          <div className="mx-auto max-w-[42.5rem]">
            {icon && <HeroIcon name={icon} />}
            <h1 className="t-h1 text-balance">{title}</h1>
            {updated && <p className="mt-3 text-[0.875rem] font-semibold text-muted">Last updated: {updated}</p>}
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
