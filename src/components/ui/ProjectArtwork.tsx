import { Check, CornerDownRight, ShoppingBag, Sparkles } from "lucide-react";

import type { ProjectVisual } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectArtworkProps {
  visual: ProjectVisual;
  index: string;
  title: string;
  className?: string;
}

function Dots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-1.5 rounded-full bg-ink/20" />
      <span className="size-1.5 rounded-full bg-ink/12" />
      <span className="size-1.5 rounded-full bg-accent/70" />
    </div>
  );
}

function BrowserFrame({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-[46%] w-[84%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-ink/12 bg-[#0e0e0e]/95 shadow-[0_30px_80px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="flex h-7 items-center gap-3 border-b border-ink/10 bg-ink/[0.025] px-3">
        <Dots />
        <span className="truncate font-mono text-[7px] uppercase tracking-[0.16em] text-ink/30">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function NexoraArt() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -right-2 top-2 font-serif text-[9rem] italic leading-none text-ink/[0.035] sm:text-[12rem]"
      >
        N
      </span>
      <BrowserFrame label="nexora — storefront">
        <div className="flex h-8 items-center justify-between border-b border-ink/[0.07] px-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-ink/85">
            NEXORA
          </div>
          <div className="flex gap-3">
            <span className="h-1.5 w-7 bg-ink/10" />
            <span className="h-1.5 w-7 bg-ink/10" />
            <span className="h-1.5 w-7 bg-ink/10" />
          </div>
          <div className="h-4 w-10 border border-ink/15" />
        </div>
        <div className="grid grid-cols-[1.25fr_0.75fr] gap-3 p-4">
          <div>
            <div className="mb-2 h-1.5 w-12 bg-accent/70" />
            <div className="h-4 w-[85%] bg-ink/80" />
            <div className="mt-1.5 h-4 w-[62%] bg-ink/60" />
            <div className="mt-3 h-1.5 w-[78%] bg-ink/12" />
            <div className="mt-1 h-1.5 w-[54%] bg-ink/10" />
            <div className="mt-3 inline-flex h-5 items-center bg-accent px-3 font-mono text-[6px] uppercase tracking-[0.14em] text-black">
              Shop collection
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#101010]">
            <div className="absolute inset-x-4 bottom-4 top-4 border border-ink/10" />
            <div className="absolute bottom-7 left-1/2 size-8 -translate-x-1/2 rounded-full border border-ink/20" />
            <div className="absolute bottom-9 left-1/2 h-9 w-px bg-ink/20" />
            <div className="absolute right-2 top-2 bg-black/50 px-1.5 py-1 font-mono text-[5px] uppercase tracking-widest text-ink/50">
              New
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 border-t border-ink/[0.07] px-4 py-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="space-y-1.5">
              <div className="aspect-square bg-gradient-to-br from-ink/[0.09] to-ink/[0.025]" />
              <div className="h-1 w-3/4 bg-ink/15" />
              <div className="h-1 w-1/3 bg-accent/40" />
            </div>
          ))}
        </div>
      </BrowserFrame>
    </>
  );
}

function TasksArt() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -left-3 bottom-2 font-serif text-[9rem] italic leading-none text-ink/[0.035] sm:text-[12rem]"
      >
        T
      </span>
      <BrowserFrame
        label="task manager — workspace"
        className="top-[49%] h-[62%] w-[86%]"
      >
        <div className="grid h-[calc(100%-1.75rem)] grid-cols-[22%_1fr]">
          <div className="border-r border-ink/[0.07] p-3">
            <div className="mb-2 h-2 w-[70%] bg-ink/20" />
            <div className="mt-4 space-y-2">
              <div className="h-1.5 w-[82%] bg-ink/12" />
              <div className="h-1.5 w-[62%] bg-ink/8" />
              <div className="h-1.5 w-[72%] bg-ink/8" />
              <div className="h-1.5 w-[48%] bg-ink/8" />
            </div>
            <div className="mt-8 border border-ink/10 p-2">
              <div className="h-1 w-[70%] bg-accent/50" />
              <div className="mt-2 h-1 w-full bg-ink/10" />
              <div className="mt-1 h-1 w-[60%] bg-ink/10" />
            </div>
          </div>
          <div className="p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-2 w-20 bg-ink/25" />
              <div className="h-4 w-12 border border-ink/12 bg-ink/[0.03]" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["To do", "In progress", "Done"].map((column, index) => (
                <div
                  key={column}
                  className="border border-ink/[0.07] bg-ink/[0.015] p-2"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "size-1 rounded-full",
                        index === 0
                          ? "bg-ink/35"
                          : index === 1
                            ? "bg-accent"
                            : "bg-emerald-500/70",
                      )}
                    />
                    <span className="font-mono text-[5px] uppercase tracking-[0.12em] text-ink/35">
                      {column}
                    </span>
                  </div>
                  {[0, 1, 2].slice(0, 3 - (index === 2 ? 2 : 0)).map((card) => (
                    <div
                      key={card}
                      className="mb-1.5 border border-ink/[0.07] bg-[#141414] p-1.5"
                    >
                      <div className="h-1 w-[85%] bg-ink/20" />
                      <div className="mt-1 h-1 w-[55%] bg-ink/8" />
                      <div className="mt-2 flex items-center justify-between">
                        <span className="size-2 rounded-full bg-ink/10" />
                        <span className="h-1 w-4 bg-ink/10" />
                      </div>
                    </div>
                  ))}
                  {index === 2 ? (
                    <div className="flex items-center gap-1 px-1 py-2 text-ink/30">
                      <Check className="size-2.5" />
                      <span className="font-mono text-[5px] uppercase tracking-widest">
                        Clear
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </>
  );
}

function ShortenerArt() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute right-0 top-8 font-mono text-[7rem] font-semibold leading-none text-ink/[0.03] sm:text-[9rem]"
      >
        /
      </span>
      <BrowserFrame label="snip — url shortener" className="w-[78%]">
        <div className="p-5">
          <div className="mx-auto mb-4 text-center font-mono text-[7px] uppercase tracking-[0.3em] text-ink/35">
            Less link. More signal.
          </div>
          <div className="flex items-stretch gap-px">
            <div className="flex h-9 flex-1 items-center gap-2 border border-ink/12 bg-black/40 px-3">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[7px] tracking-wide text-ink/25">
                paste your long url...
              </span>
            </div>
            <div className="flex h-9 items-center gap-2 bg-accent px-4 font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-black">
              Shorten <CornerDownRight className="size-2.5" />
            </div>
          </div>
          <div className="mt-4 space-y-px">
            {[
              ["snip.li/nxora", "nexora-mart-five.vercel.app"],
              ["snip.li/tsk01", "tasks/acme/workspace"],
              ["snip.li/notes", "docs/learning/system-design"],
            ].map(([short, long], index) => (
              <div
                key={short}
                className="flex items-center justify-between border border-ink/[0.06] bg-ink/[0.014] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[7px] text-accent">
                    {short}
                  </span>
                  <span className="hidden font-mono text-[6px] text-ink/20 sm:inline">
                    {long}
                  </span>
                </div>
                <span
                  className="h-1 w-8 bg-ink/12"
                  style={{ opacity: 1 - index * 0.22 }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-3">
            <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-ink/25">
              PostgreSQL · Prisma
            </span>
            <span className="font-mono text-[6px] text-ink/35">
              3 / 3 active
            </span>
          </div>
        </div>
      </BrowserFrame>
    </>
  );
}

function MarketArt() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(transparent,rgba(255,48,48,0.05))] [perspective:300px]"
      >
        <div className="absolute inset-x-[-20%] bottom-0 top-1/3 bg-grid-fine opacity-35 [transform:rotateX(56deg)] [transform-origin:bottom]" />
      </div>
      <span className="absolute left-6 top-1/2 z-10 size-5 -translate-y-1/2 rounded-full border border-ink/25">
        <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-ink/30" />
        <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-ink/30" />
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </span>
      <div className="absolute inset-x-0 top-[20%] grid grid-cols-[1fr_1.7fr_1fr] gap-3 px-5">
        <div className="space-y-1 self-end opacity-70">
          <div className="h-2 w-11/12 bg-ink/[0.07]" />
          <div className="h-2 w-8/12 bg-ink/[0.05]" />
          <div className="grid h-14 grid-cols-3 gap-1 bg-ink/[0.03] p-1">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className="bg-ink/[0.07]" />
            ))}
          </div>
        </div>
        <div className="relative border border-ink/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-3">
          <div className="absolute -top-2 left-3 font-mono text-[6px] uppercase tracking-[0.24em] text-accent">
            Aisle 03
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 12 }).map((_, item) => (
              <div
                key={item}
                className={cn(
                  "aspect-[3/4] border border-ink/10",
                  item === 6
                    ? "bg-accent/60 shadow-[0_0_20px_rgba(255,48,48,0.45)]"
                    : "bg-ink/[0.055]",
                )}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[5px] uppercase tracking-widest text-ink/25">
            <span>Fresh goods</span>
            <span>24 items</span>
          </div>
        </div>
        <div className="space-y-1 self-end opacity-70">
          <div className="grid h-14 grid-cols-3 gap-1 bg-ink/[0.03] p-1">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className="bg-ink/[0.07]" />
            ))}
          </div>
          <div className="h-2 w-8/12 bg-ink/[0.05]" />
          <div className="h-2 w-11/12 bg-ink/[0.07]" />
        </div>
      </div>
      <div className="absolute bottom-[13%] right-[7%] z-10 w-40 border border-ink/12 bg-card/90 backdrop-blur">
        <div className="flex items-center justify-between border-b border-ink/10 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="size-2.5 text-accent" />
            <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-ink/60">
              Your cart
            </span>
          </div>
          <span className="font-mono text-[6px] text-ink/35">03</span>
        </div>
        <div className="space-y-2 p-3">
          {["Whole milk", "Sourdough", "Tomatoes"].map((item, index) => (
            <div key={item} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 bg-ink/10" />
                <span className="font-mono text-[5px] text-ink/35">{item}</span>
              </div>
              <span className="font-mono text-[5px] text-ink/50">
                ${(index + 2) * 1.5}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-accent px-3 py-1.5 text-center font-mono text-[5px] uppercase tracking-[0.16em] text-black">
          Checkout · $9.00
        </div>
      </div>
      <div className="absolute bottom-[11%] left-6 z-10 font-mono text-[6px] uppercase tracking-[0.2em] text-ink/25">
        W A S D · Explore
      </div>
    </>
  );
}

function ChatbotArt() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -right-2 bottom-0 font-serif text-[10rem] italic leading-none text-ink/[0.035] sm:text-[13rem]"
      >
        ?
      </span>
      <BrowserFrame label="ai chatbot — conversation" className="w-[72%]">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between border-b border-ink/[0.07] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                <Sparkles className="size-3 text-accent" />
              </span>
              <div>
                <div className="h-1.5 w-14 bg-ink/30" />
                <div className="mt-1 font-mono text-[5px] uppercase tracking-[0.16em] text-ink/25">
                  Online
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <span className="size-1 rounded-full bg-ink/15" />
              <span className="size-1 rounded-full bg-ink/15" />
              <span className="size-1 rounded-full bg-ink/15" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-accent px-3 py-2 font-mono text-[6px] leading-relaxed text-black">
                Help me plan a clean project structure.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-ink/[0.04]">
                <Sparkles className="size-2 text-accent" />
              </span>
              <div className="max-w-[80%] space-y-1.5 border border-ink/[0.08] bg-ink/[0.03] px-3 py-2">
                <div className="h-1 w-36 bg-ink/20" />
                <div className="h-1 w-28 bg-ink/14" />
                <div className="h-1 w-32 bg-ink/10" />
                <div className="flex gap-1 pt-1">
                  <span className="size-1 animate-blink rounded-full bg-accent/70" />
                  <span className="size-1 animate-blink rounded-full bg-accent/40 [animation-delay:180ms]" />
                  <span className="size-1 animate-blink rounded-full bg-accent/20 [animation-delay:360ms]" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[62%] rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-ink/10 px-3 py-2 font-mono text-[6px] leading-relaxed text-ink/50">
                Start with features, then boundaries.
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 border border-ink/12 bg-black/40 px-3 py-2">
            <span className="flex-1 font-mono text-[6px] text-ink/20">
              Ask anything...
            </span>
            <span className="flex size-5 items-center justify-center rounded-full bg-accent">
              <CornerDownRight className="size-2.5 text-black" />
            </span>
          </div>
        </div>
      </BrowserFrame>
    </>
  );
}

const visuals: Record<ProjectVisual, () => React.JSX.Element> = {
  nexora: NexoraArt,
  tasks: TasksArt,
  shortener: ShortenerArt,
  market: MarketArt,
  chatbot: ChatbotArt,
};

export function ProjectArtwork({
  visual,
  index,
  title,
  className,
}: ProjectArtworkProps) {
  const Visual = visuals[visual];

  return (
    <div
      className={cn(
        "theme-dark relative aspect-[16/11] overflow-hidden bg-[#0a0a0a]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.16),transparent_66%)] blur-2xl" />
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
        <span className="absolute left-4 top-4 z-20 border border-ink/10 bg-black/30 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.2em] text-ink/35 backdrop-blur-sm">
          Concept / {index}
        </span>
        <span className="absolute right-4 top-4 z-20 hidden items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.2em] text-ink/30 sm:flex">
          <span className="size-1 rounded-full bg-accent/80" />
          {title}
        </span>
        <Visual />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_55%,rgba(255,48,48,0.045)_100%)]" />
    </div>
  );
}
