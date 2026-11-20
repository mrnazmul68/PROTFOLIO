import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedStats } from "@/components/sections/AnimatedStats";

export function About() {
  return (
    <section id="about" className="anchor-offset section-pad relative">
      <div className="wrap">
        <SectionHeading
          eyebrow="01 — About"
          title={
            <>
              More about{" "}
              <em className="font-serif font-normal italic">me</em>
              <span className="text-accent">.</span>
            </>
          }
          description="A Computer Science student with a builder's habits: curious about the system, careful about the interface, always learning in public."
          action={
            <Button href="/about" variant="outline" size="sm">
              Read the full story
            </Button>
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <Portrait
                  variant="about"
                  className="aspect-[4/5] w-full"
                />
                <div className="absolute -bottom-5 -right-3 z-30 hidden items-center gap-3 border border-ink/12 bg-elevated px-4 py-3 shadow-2xl sm:flex">
                  <span className="flex size-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <GraduationCap className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                      Currently
                    </p>
                    <p className="mt-0.5 text-xs text-ink/85">
                      {siteConfig.semester} · CSE
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 grid grid-cols-2 gap-3">
              <div className="border border-ink/10 bg-ink/[0.02] p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
                  Focus
                </p>
                <p className="mt-2 text-xs leading-5 text-ink/80">
                  Full Stack
                  <br />
                  Web Development
                </p>
              </div>
              <div className="border border-ink/10 bg-ink/[0.02] p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
                  Method
                </p>
                <p className="mt-2 text-xs leading-5 text-ink/80">
                  Learn by
                  <br />
                  building &amp; refining
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-balance font-serif text-[clamp(1.75rem,2.7vw,2.5rem)] italic leading-[1.15] tracking-[-0.02em] text-ink/90">
                &ldquo;I like the moment a vague idea becomes a system you can
                actually use.&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-5 text-[14px] leading-7 text-muted">
                <p>
                  I&apos;m Nazmul Islam Mazumdar, a Computer Science and
                  Engineering student at {siteConfig.university} and an aspiring
                  Full Stack Web Developer.
                </p>
                <p>
                  I enjoy building web applications, understanding how systems
                  work behind the scenes, and turning ideas into practical
                  digital experiences. I&apos;m continuously improving my
                  programming, problem-solving, and software engineering skills.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-accent/80">
                    Education
                  </p>
                  <p className="mt-3 text-sm font-medium leading-6 text-ink/90">
                    {siteConfig.university}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    {siteConfig.department}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-subtle">
                    {siteConfig.semester} · In progress
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-accent/80">
                    Philosophy
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink/75">
                    Understand the problem first. Keep the structure honest.
                    Refine through iteration — in code and in design.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
                  Personal interests
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {siteConfig.interests.map((interest) => (
                    <li
                      key={interest}
                      className="inline-flex items-center gap-2 border border-ink/10 bg-ink/[0.02] px-3 py-1.5 text-[10px] text-ink/65"
                    >
                      <span className="size-1 rounded-full bg-accent/80" aria-hidden="true" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 border-l border-accent/60 pl-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
                  Currently learning
                </p>
                <ul className="mt-3 space-y-2">
                  {siteConfig.currentFocus.slice(0, 3).map((focus) => (
                    <li
                      key={focus}
                      className="flex items-start gap-2 text-[12px] leading-5 text-ink/65"
                    >
                      <span className="mt-[0.45rem] h-px w-3 shrink-0 bg-accent/50" aria-hidden="true" />
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-2 border-b border-ink/15 pb-1.5 text-[11px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-accent hover:text-accent"
              >
                More on education &amp; direction
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        <AnimatedStats />
      </div>
    </section>
  );
}
