"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import type { NavLink, NavMenu } from "@/lib/nav";
import { AppStoreButton, appStoreHref } from "./app-store-button";
import { AppleLogo, IconTile } from "./icons";

/**
 * Header: desktop mega menus (hover with intent delay, click, Escape, outside
 * click) and a full-screen mobile sheet with accordion sections and a pinned
 * App Store button. All menu links are server-rendered into the DOM (only
 * visibility toggles), so crawlers see the full internal-link structure.
 */
export function NavBar({ menus }: { menus: NavMenu[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close everything on navigation (adjust state during render, React's
  // recommended pattern instead of setState in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-200 ${scrolled || open !== null || mobile ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-paper/0"}`}
    >
      <div className="container-rm flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="-mx-1 flex min-h-11 items-center gap-2.5 rounded-xl px-1 font-semibold tracking-tight text-ink" aria-label="Rise Mission home">
            <Image src="/assets/icon.png" alt="" width={32} height={32} className="rounded-[8px]" preload />
            <span className="text-[1.05rem]">Rise Mission</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex" onMouseLeave={leave}>
            {menus.map((m, i) => (
              <div key={m.label} onMouseEnter={() => enter(i)}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`menu-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`flex h-10 items-center gap-1 rounded-lg px-3 text-[0.92rem] font-medium transition-colors duration-150 ${open === i ? "bg-paper-2 text-ink" : "text-ink-2 hover:bg-paper-2/70 hover:text-ink"}`}
                >
                  {m.label}
                  <ChevronDown aria-hidden className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ease-[var(--ease-out)] ${open === i ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
            <Link href="/blog" className="flex h-10 items-center rounded-lg px-3 text-[0.92rem] font-medium text-ink-2 transition-colors duration-150 hover:bg-paper-2/70 hover:text-ink" onMouseEnter={() => setOpen(null)}>
              Blog
            </Link>

            {menus.map((m, i) => (
              <MegaPanel key={m.label} id={`menu-${i}`} menu={m} visible={open === i} onEnter={() => enter(i)} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={appStoreHref("header")}
            data-cta="header"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-[0.9rem] font-semibold text-paper transition-opacity duration-150 hover:opacity-90 lg:h-10"
          >
            <AppleLogo className="h-4 w-4" />
            <span className="hidden sm:inline">Get the app</span>
            <span className="sm:hidden">Get app</span>
          </a>
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-paper-2 text-ink transition-colors duration-150 active:bg-line lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((v) => !v)}
          >
            <Menu aria-hidden className={`absolute h-5 w-5 transition duration-200 ${mobile ? "rotate-90 scale-75 opacity-0" : "opacity-100"}`} />
            <X aria-hidden className={`absolute h-5 w-5 transition duration-200 ${mobile ? "opacity-100" : "-rotate-90 scale-75 opacity-0"}`} />
          </button>
        </div>
      </div>
    </header>
    {/* Outside <header>: its backdrop-filter would otherwise become the
        containing block for this fixed sheet and collapse it to 64px. */}
    <MobileSheet menus={menus} open={mobile} />
    </>
  );
}

function MegaPanel({ id, menu, visible, onEnter }: { id: string; menu: NavMenu; visible: boolean; onEnter: () => void }) {
  return (
    <div
      id={id}
      onMouseEnter={onEnter}
      className={`absolute inset-x-0 top-full pt-2 transition-[opacity,translate,visibility] motion-reduce:transition-none ${visible ? "visible translate-y-0 opacity-100 duration-200 ease-[var(--ease-out)]" : "invisible -translate-y-1.5 opacity-0 duration-150 ease-in"}`}
    >
      <div className="container-rm">
        <div className="w-fit max-w-full overflow-hidden rounded-2xl border border-line bg-card shadow-[0_24px_60px_-20px_rgb(22_20_31/0.25)]">
          <div className="grid grid-cols-[16rem_auto]">
            <div className="border-r border-line bg-paper/60 p-6">
              <p className="text-[0.8rem] font-medium text-muted">{menu.featured.title}</p>
              <ul className="mt-3 space-y-1">
                {menu.featured.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="group -mx-2 flex items-start gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-card">
                      {l.icon && <IconTile name={l.icon} size="md" tone="accent" />}
                      <span className="min-w-0 pt-px">
                        <span className="block text-[0.95rem] font-semibold leading-snug text-ink">{l.label}</span>
                        {l.desc && <span className="mt-0.5 block text-[0.84rem] leading-snug text-muted">{l.desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid auto-cols-[13rem] grid-flow-col gap-8 p-6">
              {menu.groups.map((g) => (
                <div key={g.title}>
                  <p className="text-[0.8rem] font-medium text-muted">{g.title}</p>
                  <ul className="mt-3 space-y-0.5">
                    {g.links.map((l) => (
                      <MenuRow key={l.href + l.label} link={l} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-line px-6 py-3.5 text-[0.88rem]">
            <span className="text-muted">{menu.footer.text}</span>
            <Link href={menu.footer.href} className="group inline-flex items-center gap-1.5 font-semibold text-ink transition-colors duration-150 hover:text-accent">
              {menu.footer.label} <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuRow({ link }: { link: NavLink }) {
  return (
    <li>
      <Link href={link.href} className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 text-[0.92rem] font-medium text-ink-2 transition-colors duration-150 hover:bg-paper-2 hover:text-ink">
        {link.icon && <IconTile name={link.icon} size="sm" />}
        <span className="min-w-0">{link.label}</span>
      </Link>
    </li>
  );
}

function MobileSheet({ menus, open }: { menus: NavMenu[]; open: boolean }) {
  const [section, setSection] = useState<number | null>(null);
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col border-t border-line bg-paper transition-[opacity,translate,visibility] motion-reduce:transition-none lg:hidden ${open ? "visible translate-y-0 opacity-100 duration-[240ms] ease-[var(--ease-out)]" : "invisible -translate-y-2 opacity-0 duration-150 ease-in"}`}
    >
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-3">
        <ul className="divide-y divide-line">
          {menus.map((m, i) => (
            <li key={m.label}>
              <button
                type="button"
                aria-expanded={section === i}
                onClick={() => setSection(section === i ? null : i)}
                className="flex min-h-14 w-full items-center justify-between py-3 text-[1.05rem] font-semibold text-ink"
              >
                {m.label}
                <ChevronRight aria-hidden className={`h-5 w-5 text-muted transition-transform duration-200 ${section === i ? "rotate-90" : ""}`} />
              </button>
              {/* Grid 0fr→1fr animates height without measuring. Links stay in
                  the DOM (crawlable); `invisible` removes them from tab order. */}
              <div
                className={`grid transition-[grid-template-rows,visibility] duration-[240ms] ease-[var(--ease-out)] motion-reduce:transition-none ${section === i ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden">
                <ul className="space-y-0.5 pb-4">
                  {[...m.featured.links, ...m.groups.flatMap((g) => g.links)]
                    .filter((l, idx, arr) => arr.findIndex((x) => x.href === l.href && x.label === l.label) === idx)
                    .map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-1 font-medium text-ink-2 active:bg-paper-2">
                          {l.icon ? <IconTile name={l.icon} size="md" /> : <span className="h-9 w-9 shrink-0" aria-hidden />}
                          <span className="min-w-0">{l.label}</span>
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link href={m.footer.href} className="flex min-h-11 items-center gap-1.5 px-2 pl-[3.25rem] font-semibold text-accent">
                      {m.footer.label} <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                </ul>
                </div>
              </div>
            </li>
          ))}
          <li>
            <Link href="/blog" className="flex min-h-14 items-center justify-between py-3 text-[1.05rem] font-semibold text-ink">
              Blog <ChevronRight aria-hidden className="h-5 w-5 text-muted" />
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="flex min-h-14 items-center justify-between py-3 text-[1.05rem] font-semibold text-ink">
              Screenshots &amp; videos <ChevronRight aria-hidden className="h-5 w-5 text-muted" />
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex min-h-14 items-center justify-between py-3 text-[1.05rem] font-semibold text-ink">
              About <ChevronRight aria-hidden className="h-5 w-5 text-muted" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="border-t border-line bg-paper px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <AppStoreButton placement="mobile-menu" className="w-full justify-center" />
      </div>
    </div>
  );
}
