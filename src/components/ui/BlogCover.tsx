import { cn } from "@/lib/utils";

interface BlogCoverProps {
  index: string;
  category: string;
  sample?: boolean;
  className?: string;
}

const motifs: Record<string, string> = {
  JavaScript: "JS",
  TypeScript: "TS",
  Backend: "<>",
  Databases: "DB",
  "Computer Science": "CS",
  "Web Development": "WWW",
};

export function BlogCover({
  index,
  category,
  sample = true,
  className,
}: BlogCoverProps) {
  const motif = motifs[category] ?? "N";

  return (
    <div
      className={cn(
        "theme-dark relative aspect-[16/10] overflow-hidden border border-ink/10 bg-card",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -left-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.22),transparent_68%)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#080808]/95 to-transparent" />

      <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-ink/40">
        <span className="size-1 rounded-full bg-accent" />
        Journal / {index}
      </div>

      {sample ? (
        <div className="absolute right-4 top-4 border border-ink/10 bg-black/25 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.18em] text-ink/40 backdrop-blur-sm">
          Sample article
        </div>
      ) : null}

      <div className="absolute bottom-5 left-5 z-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-accent/80">
          {category}
        </p>
        <p className="mt-1.5 font-serif text-[clamp(2.8rem,5vw,4.6rem)] italic leading-[0.8] tracking-[-0.03em] text-ink/85">
          Notes<span className="text-accent">.</span>
        </p>
      </div>

      <span className="absolute -right-2 bottom-2 select-none font-mono text-[5.5rem] font-semibold leading-none tracking-[-0.08em] text-ink/[0.045] sm:text-[7rem]">
        {motif}
      </span>

      <div className="absolute inset-x-5 bottom-[4.7rem] h-px bg-gradient-to-r from-ink/15 via-ink/5 to-transparent" />
      <span className="absolute bottom-5 right-5 z-10 font-mono text-[8px] tabular-nums tracking-[0.18em] text-ink/25">
        {index} / 05
      </span>
    </div>
  );
}
