import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <header className={cn("border-t border-white/10 pt-5", className)}>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em]">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="text-muted">{eyebrow}</span>
      </div>

      <div className="mt-8 grid gap-8 lg:mt-11 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.33fr)] lg:items-end lg:gap-16">
        <h2
          id={id}
          className="max-w-[18ch] text-balance text-[clamp(2.6rem,5.7vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white"
        >
          {title}
        </h2>

        <div className="lg:pb-1.5">
          {description ? (
            <p className="max-w-sm text-pretty text-sm leading-7 text-muted">
              {description}
            </p>
          ) : null}
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      </div>
    </header>
  );
}
