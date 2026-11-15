import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/seo";

export function DocPage({ title, path, updated, children }: { title: string; path: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <div className="container-rm pt-12 md:pt-16"><div className="mx-auto max-w-3xl">
        <h1 className="t-h1">{title}</h1>
        {updated && <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>}
        <div className="prose-rm mt-8">{children}</div>
      </div></div>
    </>
  );
}
