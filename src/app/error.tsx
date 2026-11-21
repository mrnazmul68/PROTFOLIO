"use client";

import { useEffect } from "react";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-25" />
      <div className="wrap relative z-10 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
          Something went wrong
        </p>
        <h1 className="mt-6 max-w-3xl text-balance text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.06em]">
          A small <em className="font-serif font-normal italic">detour.</em>
        </h1>
        <p className="mt-7 max-w-md text-sm leading-7 text-muted">
          The page hit an unexpected problem. You can try again, or head back to
          the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className={buttonStyles({ size: "lg" })}
          >
            Try again
          </button>
          <Link
            href="/"
            className={buttonStyles({ variant: "route", size: "lg", className: "" })}
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
