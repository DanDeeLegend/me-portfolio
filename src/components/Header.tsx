import Link from "next/link";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-2 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}
