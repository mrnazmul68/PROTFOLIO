import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  Layers3,
  MonitorSmartphone,
  ServerCog,
  type LucideIcon,
} from "lucide-react";

import { services } from "@/data/services";
import type { Service } from "@/types/profile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<Service["icon"], LucideIcon> = {
  frontend: MonitorSmartphone,
  backend: ServerCog,
  fullstack: Layers3,
  performance: Gauge,
};

export function Services() {
  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden border-t border-white/10 bg-[#090909]"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-18%] top-1/3 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.065),transparent_68%)] blur-3xl"
      />

      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="05 — Capabilities"
          title={
            <>
              What I can{" "}
              <em className="font-serif font-normal italic">do</em>
              <span className="text-accent">.</span>
            </>
          }
          description="The areas I'm building depth in through coursework, projects and deliberate practice — from interface to API."
          action={
            <Button href="/contact" variant="outline" size="sm">
              Start a conversation
            </Button>
          }
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const isSecondRow = index > 1;

            return (
              <Reveal key={service.title} delay={index * 0.06} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#0c0c0c] p-6 transition-all duration-500 hover:border-accent/30 hover:bg-[#101010] sm:p-8",
                    isSecondRow ? "" : "",
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-20 size-52 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.12),transparent_68%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center border border-white/10 bg-white/[0.025] text-white/60 transition-all duration-500 group-hover:border-accent/30 group-hover:bg-accent/[0.07] group-hover:text-accent">
                      <Icon className="size-5" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="font-serif text-4xl italic leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-accent/15">
                      {service.index}
                    </span>
                  </div>

                  <h3 className="relative z-10 mt-9 text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-tight tracking-[-0.04em] text-white/90">
                    {service.title}
                  </h3>
                  <p className="relative z-10 mt-3 max-w-sm text-[13px] leading-6 text-muted">
                    {service.description}
                  </p>

                  <ul className="relative z-10 mt-7 space-y-2.5 border-t border-white/[0.08] pt-5">
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-2.5 text-[11px] leading-5 text-white/55"
                      >
                        <span
                          className="mt-[0.44rem] h-px w-3 shrink-0 bg-accent/60"
                          aria-hidden="true"
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="relative z-10 mt-7 inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/45 transition-colors duration-300 hover:text-accent"
                  >
                    Discuss this
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08} className="mt-7">
          <p className="max-w-2xl text-[11px] leading-6 text-subtle">
            These capabilities reflect the areas I&apos;m developing through
            academic study and hands-on projects. If your project needs a
            specialist level I don&apos;t yet have, I&apos;ll say so.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
