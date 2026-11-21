import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-25" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.16),transparent_66%)] blur-3xl"
      />

      <div className="wrap relative z-10 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
          Error / 404
        </p>
        <h1 className="mt-6 text-[clamp(5rem,17vw,14rem)] font-medium leading-[0.8] tracking-[-0.08em]">
          Lost<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-md text-sm leading-7 text-muted">
          This page doesn&apos;t exist — or it moved somewhere quieter. Let&apos;s
          get you back to something worth reading.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={buttonStyles({ size: "lg" })}>
            <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/projects"
            className={buttonStyles({ variant: "route", size: "lg" })}
          >
            Explore projects
            <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
