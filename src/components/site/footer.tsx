import Image from "next/image";
import Link from "next/link";
import { BLOG_TOPICS } from "@/lib/blog";
import { liveTools, toolPath } from "@/lib/tools";
import { APP_STORE_URL, CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/site";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/60">
      <div className="container-rm grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-tight"><Image src="/assets/icon.png" alt="" width={28} height={28} className="rounded-[7px]" />Rise Mission</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
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
            { href: INSTAGRAM_URL, label: "Instagram" },
            { href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
          ]}
        />
      </div>
      <p className="container-rm pb-10 text-xs text-muted">
        © {year} Sunny Radadiya. iPhone and App Store are trademarks of Apple Inc.
      </p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.href.startsWith("/") ? (
              <Link href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className="hover:text-ink">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
