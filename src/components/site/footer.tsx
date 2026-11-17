import Image from "next/image";
import Link from "next/link";
import { BLOG_TOPICS } from "@/lib/blog";
import { liveTools, toolPath } from "@/lib/tools";
import { APP_STORE_URL, CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/site";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/60">
      <div className="container-rm grid grid-cols-2 gap-x-6 gap-y-10 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
        <div className="col-span-2 lg:col-span-1">
          <p className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-tight"><Image src="/assets/icon.png" alt="" width={28} height={28} className="rounded-[7px]" />Rise Mission</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            The iPhone alarm clock for heavy sleepers. Prove you&apos;re awake before it stops.
          </p>
        </div>
        <FooterCol
          title="App"
          links={[
            { href: "/#challenges", label: "Wake-up challenges" },
            ...liveTools().map((t) => ({ href: toolPath(t.slug), label: t.name })),
            { href: "/tools", label: "All free tools" },
            { href: "/alarm-app-size-comparison", label: "Alarm app sizes" },
            { href: "/gallery", label: "Screenshots & videos" },
            { href: APP_STORE_URL, label: "App Store" },
            { href: "/support", label: "Support" },
          ]}
        />
        <FooterCol
          title="Guides"
          links={[{ href: "/blog", label: "All articles" }, ...BLOG_TOPICS.map((t) => ({ href: `/blog/topic/${t.slug}`, label: t.name }))]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "About" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/licenses", label: "Licenses" },
            { href: INSTAGRAM_URL, label: "Instagram" },
            { href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
          ]}
        />
      </div>
      <div className="container-rm">
        <p className="border-t border-line/70 pb-10 pt-6 text-xs text-muted">
          © {year} Sunny Radadiya. iPhone and App Store are trademarks of Apple Inc.
        </p>
      </div>
    </footer>
  );
}

// 44px rows on touch screens, compact list from sm up.
const LINK = "inline-flex min-h-11 items-center rounded-md transition-colors duration-150 hover:text-ink sm:min-h-0";

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-2 text-sm text-muted sm:mt-3 sm:space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.href.startsWith("/") ? (
              <Link href={l.href} className={LINK}>
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className={LINK}>
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
