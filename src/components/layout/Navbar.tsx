"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function getPageSection(pathname: string): string | null {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname === "/") return "home";
  return null;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const observedSection = useActiveSection(
    siteConfig.nav.map((item) => item.section),
    isHome,
  );
  const activeSection = getPageSection(pathname) ?? observedSection;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 rounded-full border backdrop-blur-xl transition-[max-width,background-color,height,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "h-14 max-w-6xl border-ink/15 bg-[var(--nav-bg-strong)] px-4 shadow-[var(--nav-shadow)] sm:px-5"
              : "h-16 max-w-[86rem] border-ink/10 bg-[var(--nav-bg)] px-4 sm:px-6",
          )}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.displayName} — home`}
            className="group flex shrink-0 items-center text-[1.15rem] font-semibold tracking-[-0.05em] text-ink"
          >
            {siteConfig.logo}
            <span className="text-accent transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center rounded-full border border-ink/[0.08] bg-ink/[0.025] px-1.5 py-1 lg:flex"
          >
            {siteConfig.nav.map((item) => {
              const active = activeSection === item.section;

              return (
                <Link
                  key={item.section}
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[11px] font-medium transition-colors duration-300",
                    active
                      ? "bg-ink/[0.07] text-ink"
                      : "text-muted hover:bg-ink/[0.04] hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <div className="hidden items-center gap-2 border-r border-ink/10 pr-4 xl:flex">
              <span
                className="size-1.5 animate-blink rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45">
                Open to work
              </span>
            </div>

            <ThemeToggle />

            <Link
              href="/contact"
              className={cn(
                "group hidden h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#080808] transition-all duration-300 hover:bg-accent-hover sm:inline-flex",
                pathname.startsWith("/contact") && "ring-1 ring-ink/40",
              )}
            >
              Let&apos;s Talk
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink/80 transition-colors hover:border-accent/50 hover:text-ink lg:hidden"
            >
              <Menu className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={closeMenu} />
    </>
  );
}
