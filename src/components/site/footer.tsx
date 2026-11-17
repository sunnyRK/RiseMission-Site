import Image from "next/image";
import Link from "next/link";
import { appStoreHref } from "@/components/site/app-store-button";
import { FOOTER_GROUPS, FOOTER_LEGAL, type SimpleLink } from "@/lib/links";
import { CONTACT_EMAIL, INSTAGRAM_URL, MIN_IOS } from "@/lib/site";

/**
 * Sitewide footer: five keyword-anchored link groups from FOOTER_GROUPS
 * (src/lib/links.ts), then legal + social links. Descriptive anchors only.
 */
export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/60">
      <div className="container-rm grid grid-cols-2 gap-x-6 gap-y-10 py-16 sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(5,1fr)] lg:gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <p className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-tight">
            <Image src="/assets/icon.png" alt="" width={28} height={28} className="rounded-[7px]" />
            Rise Mission
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            The iPhone alarm clock for heavy sleepers: stop it by finishing a wake-up challenge. Requires {MIN_IOS} or later.
          </p>
          <a
            href={appStoreHref("footer")}
            data-cta="footer"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-ink hover:underline sm:min-h-0"
          >
            Download Rise Mission on the App Store
          </a>
        </div>
        {FOOTER_GROUPS.map((g) => (
          <FooterCol key={g.title} title={g.title} links={g.links} />
        ))}
      </div>
      <div className="container-rm">
        <div className="flex flex-col gap-3 border-t border-line/70 pb-10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Sunny Radadiya. iPhone and App Store are trademarks of Apple Inc.</p>
          <ul className="flex flex-wrap gap-x-4">
            {[...FOOTER_LEGAL, { href: INSTAGRAM_URL, label: "Instagram" }, { href: `mailto:${CONTACT_EMAIL}`, label: "Email" }].map((l) => (
              <li key={l.href}>
                <FooterLink link={l} className="inline-flex min-h-11 items-center hover:text-ink sm:min-h-0" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

// 44px rows on touch screens, compact list from sm up.
const LINK = "inline-flex min-h-11 items-center rounded-md transition-colors duration-150 hover:text-ink sm:min-h-0";

function FooterLink({ link, className = LINK }: { link: SimpleLink; className?: string }) {
  return link.href.startsWith("/") ? (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

function FooterCol({ title, links }: { title: string; links: SimpleLink[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-2 text-sm text-muted sm:mt-3 sm:space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <FooterLink link={l} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
