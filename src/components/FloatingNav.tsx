"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { href: "/#projects", label: "Work", id: "projects" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#sidequests", label: "Side quests", id: "sidequests" },
  { href: "/blog", label: "Writing", id: "writing" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

/** Floating pill. On the home page the highlighted link follows the section in view; elsewhere it follows the route. */
export function FloatingNav() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    const els = items.map((i) => document.getElementById(i.id === "writing" ? "writing" : i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (i: (typeof items)[number]) => (pathname === "/" ? section === i.id : i.href === "/blog" && pathname.startsWith("/blog"));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4">
      <div className="pointer-events-auto relative w-full max-w-fit">
        <div className="flex items-center gap-1 liquid-glass rounded-full p-1.5">
          <Link href="/" aria-label={`${site.name}, home`} className="flex items-center gap-2 rounded-full py-0.5 pr-3 pl-0.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-accent ring-2 ring-white/50">
              {/* Head-only vector avatar: the full sticker art blurs when scaled this small. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mascot/dannybouy-avatar.svg" alt="" width={40} height={38} className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-base font-bold tracking-tight">Dannybouy</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center md:flex">
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                aria-current={isActive(i) ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive(i) ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          {site.cvPath && (
            <Link
              href={site.cvPage}
              className="ml-1 hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-transform hover:scale-105 sm:inline-block"
            >
              CV
            </Link>
          )}
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="liquid-glass liquid-glass-menu absolute top-full left-1/2 mt-2 w-[min(22rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-3xl p-3 md:hidden">
            <ul>
              {items.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display text-2xl font-semibold hover:bg-bg">
                    {i.label}
                  </Link>
                </li>
              ))}
              {site.cvPath && (
                <li>
                  <Link href={site.cvPage} onClick={() => setOpen(false)} className="mt-1 block rounded-2xl bg-accent px-4 py-3 text-center font-display text-xl font-semibold text-accent-ink">
                    View CV
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
