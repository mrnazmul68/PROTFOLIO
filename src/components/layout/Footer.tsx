import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { BackToTop } from "@/components/ui/BackToTop";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10">
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/4 h-64 w-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.09),transparent_68%)] blur-3xl"
      />

      <div className="wrap relative z-10 pb-8 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-subtle">
              Next chapter
            </p>
            <h2 className="mt-5 max-w-lg text-balance text-[clamp(2.6rem,4.5vw,4.3rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              Let&apos;s build something{" "}
              <em className="font-serif font-normal italic text-accent">considered.</em>
            </h2>
            <p className="mt-5 max-w-sm text-[13px] leading-6 text-muted">
              {siteConfig.shortBio}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-8 inline-flex items-center gap-3 border-b border-ink/20 pb-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent sm:text-base"
            >
              {siteConfig.email}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="lg:col-span-3 lg:pl-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-subtle">
              Explore
            </p>
            <nav aria-label="Footer" className="mt-5">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-1">
                {siteConfig.nav.map((item) => (
                  <li key={item.section}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                      <ArrowUpRight
                        className="size-3 text-subtle opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-subtle">
              Elsewhere
            </p>
            <SocialLinks variant="list" className="mt-5 grid-cols-2 gap-y-3 lg:grid-cols-1" />
            <div className="mt-8 border-t border-ink/10 pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-subtle">
                Based in
              </p>
              <p className="mt-2 text-sm text-ink/75">{siteConfig.location}</p>
              <div className="mt-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
                <span className="size-1.5 animate-blink rounded-full bg-accent" aria-hidden="true" />
                {siteConfig.availability}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-subtle">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-ink/45">{siteConfig.copyright}</p>
          <BackToTop />
        </div>

        <div aria-hidden="true" className="mt-12 select-none overflow-hidden">
          <p className="-mb-[0.12em] whitespace-nowrap text-center text-[clamp(4.5rem,16vw,15rem)] font-semibold leading-[0.75] tracking-[-0.085em] text-ink/[0.045]">
            {siteConfig.logo}
            <span className="text-accent/25">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
