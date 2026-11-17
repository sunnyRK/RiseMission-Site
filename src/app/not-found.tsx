import Link from "next/link";
import { HeroIcon } from "@/components/site/page-icons";
import { ArrowRight } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { liveTools, toolPath } from "@/lib/tools";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

const POPULAR = [
  { href: "/blog/best-alarm-apps-for-heavy-sleepers", label: "Best alarm apps for heavy sleepers" },
  { href: "/blog/iphone-alarm-not-going-off", label: "iPhone alarm not going off? Fixes" },
  { href: "/blog/how-to-stop-hitting-snooze", label: "How to stop hitting snooze" },
  { href: "/blog/wake-up-challenges-explained", label: "Wake-up challenges explained" },
];

export default function NotFound() {
  return (
    <section className="sunrise-glow dawn">
      <div className="container-rm py-20 text-center md:py-28">
        <HeroIcon name="3d-moon" center />
        <p className="t-eyebrow justify-center">404</p>
        <h1 className="t-h1 mx-auto mt-3 max-w-2xl">This page overslept.</h1>
        <p className="t-lead mx-auto mt-4 max-w-xl">The link may be old or mistyped. Here are the pages people usually want.</p>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
          {[...POPULAR, ...liveTools().slice(0, 2).map((t) => ({ href: toolPath(t.slug), label: t.name }))].map((l) => (
            <Link key={l.href} href={l.href} className="rm-card lift group flex min-h-14 items-center justify-between gap-3 !rounded-[20px] px-5 py-4 font-bold text-ink">
              {l.label}
              <ArrowRight aria-hidden className="h-4 w-4 text-muted transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <AppStoreButton placement="404" />
        </div>
        <p className="mt-6 text-sm text-muted">
          Or go to the <Link href="/" className="font-semibold text-accent underline underline-offset-4">homepage</Link>.
        </p>
      </div>
    </section>
  );
}
