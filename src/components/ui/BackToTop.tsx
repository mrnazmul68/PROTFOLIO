"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group flex size-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-accent/50 hover:text-white"
      aria-label="Back to top"
    >
      <ArrowUp
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </button>
  );
}
