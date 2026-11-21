"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { journey } from "@/data/experience";
import { siteConfig } from "@/config/site";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-journey-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-journey-list]",
              start: "top 72%",
              end: "bottom 72%",
              scrub: 0.8,
            },
          },
        );

        gsap.fromTo(
          "[data-journey-item]",
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: "[data-journey-list]",
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="journey"
      className="anchor-offset section-pad relative overflow-hidden border-t border-ink/10 bg-surface"
    >
      <div
        aria-hidden="true"
        className="absolute right-[-15%] top-[10%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.07),transparent_68%)] blur-3xl"
      />

      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="03 — Journey"
          title={
            <>
              My development{" "}
              <em className="font-serif font-normal italic">journey</em>
              <span className="text-accent">.</span>
            </>
          }
          description="A sequence of interests and deliberate practice, not a list of invented job titles. The chapters are still being written."
          action={
            <Button href="/projects" variant="route" size="sm">
              See the work
            </Button>
          }
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-subtle">
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  The path so far
                </div>
                <p className="mt-6 text-balance font-serif text-[clamp(2rem,3.4vw,3rem)] italic leading-[1.08] tracking-[-0.02em] text-ink/90">
                  Still at the
                  <br />
                  beginning
                  <span className="text-accent">.</span>
                </p>
                <p className="mt-5 max-w-xs text-[13px] leading-6 text-muted">
                  Each chapter has been a response to curiosity: learn the
                  concept, build with it, then look for the next gap in
                  understanding.
                </p>
              </Reveal>

              <Reveal delay={0.12} className="mt-9">
                <div className="relative overflow-hidden border border-ink/10 bg-ink/[0.02] p-5">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 size-32 rounded-full bg-accent/10 blur-2xl"
                  />
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                      <GraduationCap className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
                        Currently
                      </p>
                      <p className="mt-1 text-sm leading-5 text-ink/85">
                        {siteConfig.semester} · {siteConfig.department}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-ink/[0.08] pt-3 text-[11px] leading-5 text-subtle">
                    {siteConfig.university}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16} className="mt-7 hidden lg:block">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] tracking-[0.16em] text-ink/30">
                    01
                  </span>
                  <div className="relative h-24 w-px bg-ink/10">
                    <span
                      data-journey-line
                      className="absolute inset-0 origin-top bg-gradient-to-b from-accent to-accent/10"
                    />
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.16em] text-ink/30">
                    06
                  </span>
                  <span className="ml-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/25">
                    Scroll to follow
                  </span>
                </div>
              </Reveal>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol
              data-journey-list
              className="relative ml-[5px] border-l border-ink/10"
            >
              <span
                data-journey-line
                aria-hidden="true"
                className="absolute -left-px top-0 z-10 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent"
              />

              {journey.map((item) => (
                <li
                  key={item.id}
                  data-journey-item
                  className={cn(
                    "group relative pb-11 pl-7 last:pb-0 sm:pl-10",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-[5px] top-2 size-[9px] rounded-full border transition-all duration-300",
                      item.current
                        ? "border-accent bg-accent shadow-[0_0_18px_rgba(255,48,48,0.75)]"
                        : "border-ink/25 bg-surface group-hover:border-accent group-hover:bg-accent",
                    )}
                  />

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-accent/80">
                      {item.index}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                      {item.phase}
                    </span>
                    {item.current ? (
                      <span className="inline-flex items-center gap-1.5 border border-accent/25 bg-accent/[0.07] px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.16em] text-accent">
                        <span className="size-1 animate-blink rounded-full bg-accent" aria-hidden="true" />
                        Now
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-2.5 max-w-lg text-balance text-[clamp(1.3rem,2.2vw,1.8rem)] font-medium leading-[1.18] tracking-[-0.035em] text-ink/85 transition-colors duration-300 group-hover:text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-pretty text-[13px] leading-6 text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            <Reveal delay={0.1} className="mt-10">
              <div className="flex items-center justify-between gap-5 border-t border-ink/10 pt-5">
                <p className="font-serif text-sm italic text-ink/35">
                  The next chapter is being built.
                </p>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-accent"
                >
                  Follow along
                  <ArrowUpRight
                    className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
