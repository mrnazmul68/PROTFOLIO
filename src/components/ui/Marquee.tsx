import { Asterisk } from "lucide-react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  slow?: boolean;
}

export function Marquee({ items, className, slow = false }: MarqueeProps) {
  const duplicated = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee-mask overflow-hidden border-y border-ink/10 py-5 sm:py-6",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max items-center",
          slow ? "animate-marquee-slow" : "animate-marquee",
          "hover:[animation-play-state:paused]",
        )}
      >
        {duplicated.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-8 px-8 sm:gap-10 sm:px-10"
          >
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
              {item}
            </span>
            <Asterisk className="size-3 text-accent/60" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
