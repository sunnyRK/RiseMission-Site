import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { FOOTER_GROUPS, FOOTER_LEGAL, type SimpleLink } from "@/lib/links";
import { CONTACT_EMAIL, INSTAGRAM_URL, MIN_IOS } from "@/lib/site";

/**
 * Sitewide footer: five keyword-anchored link groups from FOOTER_GROUPS
 * (src/lib/links.ts), then legal + social links. Descriptive anchors only.
 */
export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="rm-footer mt-24">
      <div className="container-rm grid grid-cols-1 gap-x-6 gap-y-2 py-14 sm:grid-cols-3 sm:gap-y-10 lg:grid-cols-[1.4fr_repeat(5,1fr)] lg:gap-8 lg:py-16">
        <div className="mb-6 sm:col-span-3 sm:mb-0 lg:col-span-1">
          <p className="flex items-center gap-2.5 text-[1.1rem] font-extrabold tracking-tight">
            <Image src="/assets/icon.png" alt="" width={36} height={36} className="rounded-[9px] shadow-[0_4px_10px_-4px_rgb(30_63_217/0.5)]" />
            Rise Mission
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            The iPhone alarm clock for heavy sleepers: stop it by finishing a wake-up challenge. Requires {MIN_IOS} or later.
          </p>
          <AppStoreButton placement="footer" className="mt-5" />
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

/**
 * One link group. Phones: a collapsible row (like a grouped list). From
 * 640px the group is always expanded (globals.css `.rm-foot-group`); every
 * link is in the HTML either way.
 */
function FooterCol({ title, links }: { title: string; links: SimpleLink[] }) {
  return (
    <nav aria-label={title}>
      <details className="rm-foot-group group border-b border-line sm:border-0">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[0.8rem] font-extrabold uppercase tracking-[0.1em] text-ink sm:min-h-0 [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown aria-hidden className="rm-foot-chev h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180 sm:hidden" />
        </summary>
        <ul className="pb-3 text-sm text-muted sm:mt-3 sm:space-y-2 sm:pb-0">
          {links.map((l) => (
            <li key={l.href + l.label}>
              <FooterLink link={l} />
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
