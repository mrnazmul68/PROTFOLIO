import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface PortraitProps {
  variant?: "hero" | "about";
  priority?: boolean;
  className?: string;
}

export function Portrait({
  variant = "hero",
  priority = false,
  className,
}: PortraitProps) {
  return (
    <div
      className={cn(
        "theme-dark relative isolate overflow-hidden border border-ink/10 bg-[#0b0b0b]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-[24%] left-1/2 h-[70%] w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.3)_0%,rgba(153,27,27,0.12)_38%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#080808]/75 to-transparent"
      />

      <div className="absolute inset-x-3 bottom-0 top-10 z-10 sm:inset-x-6 sm:top-12">
        <Image
          src={siteConfig.profileImage}
          alt={`Portrait of ${siteConfig.name}, ${siteConfig.title}`}
          fill
          priority={priority}
          sizes={
            variant === "hero"
              ? "(min-width: 1280px) 480px, (min-width: 1024px) 38vw, (min-width: 640px) 70vw, 90vw"
              : "(min-width: 1024px) 40vw, 90vw"
          }
          className="portrait-treatment object-contain object-bottom drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 border-[10px] border-transparent mix-blend-overlay"
      />

      <div className="absolute left-4 top-4 z-30 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/55 sm:left-5 sm:top-5">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Portrait / 001
      </div>

      <div
        aria-hidden="true"
        className="absolute right-5 top-5 z-30 hidden font-mono text-[9px] uppercase tracking-[0.22em] text-ink/35 sm:block"
        style={{ writingMode: "vertical-rl" }}
      >
        Nazmul Islam — MMXXVI
      </div>

      <div className="absolute inset-x-4 bottom-4 z-30 sm:inset-x-5 sm:bottom-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45">
              {siteConfig.location}
            </p>
            <p className="mt-1 font-serif text-2xl italic leading-none text-ink/90 sm:text-3xl">
              {siteConfig.displayName}
            </p>
          </div>
          <span className="mb-0.5 border border-ink/15 bg-black/30 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/55 backdrop-blur-sm">
            Est. 2026
          </span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-30 h-px w-full bg-gradient-to-r from-accent via-accent/20 to-transparent"
      />
    </div>
  );
}
