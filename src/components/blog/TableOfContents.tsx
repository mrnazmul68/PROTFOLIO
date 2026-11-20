"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "@/types/blog";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const itemsKey = items.map((item) => item.id).join("|");

  useEffect(() => {
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= 160) {
          current = item.id;
        }
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, itemsKey]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={cn(className)}>
      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
        On this page
      </p>
      <ul className="mt-4">
        {items.map((item) => {
          const active = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block border-l py-1.5 text-[11px] leading-5 transition-all duration-200",
                  item.level === 3 ? "pl-6" : "pl-4",
                  active
                    ? "border-accent text-white"
                    : "border-white/10 text-subtle hover:border-white/25 hover:text-white/70",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
