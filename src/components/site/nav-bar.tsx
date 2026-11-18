"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import type { NavLink, NavMenu } from "@/lib/nav";
import { AppStoreButton } from "./app-store-button";
import { Icon3D } from "./icon-3d";
import { IconTile } from "./icons";

/**
 * Floating pill header: an inset glass bar that stays pinned while scrolling
 * (compact + more opaque once scrolled). Desktop dropdowns open on click,
 * on mouse hover (with an intent delay), close on Escape (focus returns to
 * the trigger), outside click, focus leaving the menu and route change.
 * Phones get a full-height sheet with the same groups as accordions.
 *
 * All menu links are server-rendered into the DOM (only visibility toggles),
 * so crawlers see the full internal-link structure. The sticky wrapper has a
 * fixed height (--header-h) so the header never shifts layout.
 */
export function NavBar({ menus }: { menus: NavMenu[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // When hover just opened a menu, the click that follows must not close it.
  const hoverOpened = useRef({ i: -1, at: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close everything on navigation (adjust state during render, React's
  // recommended pattern instead of setState in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Latest open state for the global key handler without re-subscribing.
  const state = useRef({ open, mobile });
  useEffect(() => {
    state.current = { open, mobile };
  }, [open, mobile]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const { open: o, mobile: m } = state.current;
      if (o !== null) {
        setOpen(null);
        if (navRef.current?.contains(document.activeElement)) triggers.current[o]?.focus();
      }
      if (m) {
        setMobile(false);
        menuBtn.current?.focus();
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

  // Hover intent for real mice only: a tap also fires pointerenter, which
  // would open the menu and let the following click close it again.
  const enter = (i: number) => (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen((o) => {
      if (o !== i) hoverOpened.current = { i, at: e.timeStamp };
      return i;
    });
  };
  const toggle = (i: number) => (e: { timeStamp: number }) => {
    const h = hoverOpened.current;
    const fresh = h.i === i && e.timeStamp - h.at < 600;
    setOpen((o) => (o === i && !fresh ? null : i));
  };
  const leave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };
  const blur = (i: number) => (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) setOpen((o) => (o === i ? null : o));
  };

  const solid = scrolled || open !== null || mobile;

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 h-[var(--header-h)] px-3 pt-2.5 sm:px-4">
        <div ref={navRef} className="pointer-events-auto relative mx-auto max-w-[1240px]" onPointerLeave={leave}>
          <div
            data-solid={solid}
            className={`rm-pill flex items-center justify-between gap-2 rounded-[22px] pl-2 pr-2 transition-[height] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none sm:pl-2.5 ${scrolled ? "h-[54px]" : "h-[58px]"}`}
          >
            <Link
              href="/"
              className="flex min-h-11 min-w-0 shrink items-center gap-2.5 rounded-[14px] px-1 text-ink"
              aria-label="Rise Mission home"
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(null)}
            >
              <Image src="/assets/icon.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-[10px] shadow-[0_4px_10px_-4px_rgb(30_63_217/0.55)]" preload />
              <span className="flex min-w-0 flex-col leading-none max-[349px]:hidden">
                <span className="truncate text-[1.02rem] font-extrabold tracking-tight">Rise Mission</span>
                <span className="mt-1 hidden text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted sm:block">Wake-up challenge alarm</span>
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
              {menus.map((m, i) => (
                <div key={m.label} onPointerEnter={enter(i)} onBlur={blur(i)}>
                  <button
                    ref={(el) => {
                      triggers.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={open === i}
                    aria-controls={`menu-${i}`}
                    onClick={toggle(i)}
                    className={`flex h-10 items-center gap-1 rounded-xl px-3 text-[0.92rem] font-semibold transition-colors duration-150 ${open === i ? "bg-ink/[0.06] text-ink dark:bg-white/10" : "text-ink-2 hover:bg-ink/[0.045] hover:text-ink dark:hover:bg-white/[0.07]"}`}
                  >
                    {m.label}
                    <ChevronDown aria-hidden className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ease-[var(--ease-out)] ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <MenuPanel id={`menu-${i}`} label={m.label} menu={m} visible={open === i} />
                </div>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5" onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(null)}>
              <AppStoreButton placement="header" size="sm" className="hover:translate-y-0" />
              <button
                ref={menuBtn}
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors duration-150 hover:bg-ink/[0.05] active:bg-ink/10 lg:hidden"
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
        </div>
      </header>
      {/* Outside <header>, which stays above it so the pill (and its close
          button) floats over the sheet. */}
      <MobileSheet menus={menus} open={mobile} />
    </>
  );
}

function MenuPanel({ id, label, menu, visible }: { id: string; label: string; menu: NavMenu; visible: boolean }) {
  const hasGroups = menu.groups.length > 0;
  return (
    <div
      id={id}
      role="region"
      aria-label={`${label} menu`}
      className={`absolute inset-x-0 top-full mx-auto w-fit max-w-[calc(100vw-2rem)] pt-2.5 transition-[opacity,translate,visibility] motion-reduce:transition-none ${visible ? "visible translate-y-0 opacity-100 duration-200 ease-[var(--ease-out)]" : "invisible -translate-y-1.5 opacity-0 duration-150 ease-in"}`}
    >
      <div className="overflow-hidden rounded-[22px] border border-line bg-card shadow-[0_28px_70px_-24px_rgb(22_20_31/0.35)]">
        <div className={hasGroups ? "grid grid-cols-[17.5rem_auto]" : ""}>
          <div className={`p-5 ${hasGroups ? "border-r border-line bg-paper/60" : ""}`}>
            <p className="px-2 text-[0.78rem] font-semibold text-muted">{menu.featured.title}</p>
            <ul className="mt-2 space-y-0.5">
              {menu.featured.links.map((l) => (
                <li key={l.href + l.label}>
                  <FeaturedRow link={l} />
                </li>
              ))}
            </ul>
          </div>
          {hasGroups && (
            <div className="grid auto-cols-[12.5rem] grid-flow-col gap-6 p-5 pl-6">
              {menu.groups.map((g) => (
                <div key={g.title}>
                  <p className="px-2 text-[0.78rem] font-semibold text-muted">{g.title}</p>
                  <ul className="mt-2 space-y-0.5">
                    {g.links.map((l) => (
                      <MenuRow key={l.href + l.label} link={l} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-6 border-t border-line px-6 py-3.5 text-[0.88rem]">
          <span className="text-muted">{menu.footer.text}</span>
          <Link href={menu.footer.href} className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-ink transition-colors duration-150 hover:text-accent">
            {menu.footer.label} <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeaturedRow({ link }: { link: NavLink }) {
  return (
    <Link href={link.href} className="group flex items-center gap-3 rounded-2xl p-2 transition-colors duration-150 hover:bg-card focus-visible:bg-card">
      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-line bg-card shadow-[inset_0_1px_0_var(--highlight)]">
        {link.icon3d ? <Icon3D name={link.icon3d} size={30} className="icon3d-hover transition-transform duration-300 ease-[var(--ease-spring)]" /> : <IconTile name={link.icon} size="md" tone="accent" />}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.94rem] font-semibold leading-snug text-ink">{link.label}</span>
        {link.desc && <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted">{link.desc}</span>}
      </span>
    </Link>
  );
}

function MenuRow({ link }: { link: NavLink }) {
  return (
    <li>
      <Link href={link.href} className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-[0.9rem] font-medium leading-snug text-ink-2 transition-colors duration-150 hover:bg-paper-2 hover:text-ink">
        {link.icon && <IconTile name={link.icon} size="sm" />}
        <span className="min-w-0">{link.label}</span>
      </Link>
    </li>
  );
}

function MobileSheet({ menus, open }: { menus: NavMenu[]; open: boolean }) {
  const [section, setSection] = useState<number | null>(0);
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 flex flex-col bg-paper pt-[calc(var(--header-h)+0.25rem)] transition-[opacity,translate,visibility] motion-reduce:transition-none lg:hidden ${open ? "visible translate-y-0 opacity-100 duration-[240ms] ease-[var(--ease-out)]" : "invisible -translate-y-2 opacity-0 duration-150 ease-in"}`}
    >
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 pb-3">
        <ul className="divide-y divide-line">
          {menus.map((m, i) => (
            <li key={m.label}>
              <button
                type="button"
                aria-expanded={section === i}
                aria-controls={`mobile-section-${i}`}
                onClick={() => setSection(section === i ? null : i)}
                className="flex min-h-14 w-full items-center justify-between py-3 text-[1.08rem] font-bold text-ink"
              >
                {m.label}
                <ChevronRight aria-hidden className={`h-5 w-5 text-muted transition-transform duration-200 ${section === i ? "rotate-90" : ""}`} />
              </button>
              {/* Grid 0fr→1fr animates height without measuring. Links stay in
                  the DOM (crawlable); `invisible` removes them from tab order. */}
              <div
                id={`mobile-section-${i}`}
                className={`grid transition-[grid-template-rows,visibility] duration-[240ms] ease-[var(--ease-out)] motion-reduce:transition-none ${section === i ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="space-y-0.5 pb-4">
                    {m.featured.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="flex min-h-12 items-center gap-3 rounded-2xl px-2 py-1.5 active:bg-paper-2">
                          <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-card">
                            {l.icon3d ? <Icon3D name={l.icon3d} size={26} /> : <IconTile name={l.icon} size="sm" />}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold leading-snug text-ink">{l.label}</span>
                            {l.desc && <span className="block text-[0.82rem] leading-snug text-muted">{l.desc}</span>}
                          </span>
                        </Link>
                      </li>
                    ))}
                    {m.groups.map((g) => (
                      <li key={g.title} className="pt-2">
                        <p className="px-2 pb-1 text-[0.78rem] font-semibold text-muted">{g.title}</p>
                        <ul className="grid grid-cols-1 gap-0.5 min-[480px]:grid-cols-2">
                          {g.links.map((l) => (
                            <li key={l.href + l.label}>
                              <Link href={l.href} className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-1 font-medium text-ink-2 active:bg-paper-2">
                                {l.icon ? <IconTile name={l.icon} size="sm" /> : <span className="h-7 w-7 shrink-0" aria-hidden />}
                                <span className="min-w-0">{l.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                    <li>
                      <Link href={m.footer.href} className="flex min-h-11 items-center gap-1.5 px-2 font-semibold text-accent">
                        {m.footer.label} <ArrowRight aria-hidden className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-line bg-paper px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <AppStoreButton placement="mobile-menu" className="w-full justify-center" />
      </div>
    </div>
  );
}
