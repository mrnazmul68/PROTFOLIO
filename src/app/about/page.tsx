import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/animations/Reveal";

export const metadata = createMetadata({
  title: "About",
  description:
    "Meet Nazmul Islam Mazumdar — a Computer Science and Engineering student at Port City International University and an aspiring Full Stack Web Developer.",
  path: "/about",
});

const principles = [
  {
    index: "01",
    title: "Understand first",
    description:
      "Read the problem, map the data, and resist reaching for a framework before the shape is clear.",
    icon: Compass,
  },
  {
    index: "02",
    title: "Build clearly",
    description:
      "Prefer understandable structure, readable code and interfaces that explain themselves.",
    icon: Code2,
  },
  {
    index: "03",
    title: "Refine honestly",
    description:
      "Test assumptions, name the trade-offs, and improve the weak parts instead of hiding them.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid opacity-[0.18] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[12%] -top-[24%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.14),transparent_68%)] blur-3xl"
        />

        <div className="wrap relative z-10">
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-subtle">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            About / The longer version
          </div>

          <h1 className="mt-8 max-w-5xl text-balance text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.07em]">
            A student. A builder.
            <br />
            Still{" "}
            <em className="font-serif font-normal italic">becoming</em>
            <span className="text-accent">.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-12 lg:gap-12">
            <p className="max-w-xl text-pretty text-sm leading-7 text-muted lg:col-span-7">
              I&apos;m Nazmul Islam Mazumdar, a Computer Science and Engineering
              student at {siteConfig.university} and an aspiring Full Stack Web
              Developer. This page is the longer story behind the work: what
              I&apos;m learning, how I think about building, and what keeps me
              curious.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 font-mono text-[8px] uppercase tracking-[0.16em] lg:col-span-5">
              <div>
                <p className="text-subtle">Based in</p>
                <p className="mt-1.5 text-white/75">{siteConfig.location}</p>
              </div>
              <div>
                <p className="text-subtle">Status</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-white/75">
                  <span className="size-1.5 animate-blink rounded-full bg-accent" aria-hidden="true" />
                  {siteConfig.availability}
                </p>
              </div>
              <div>
                <p className="text-subtle">Studying</p>
                <p className="mt-1.5 text-white/75">CSE · {siteConfig.semester}</p>
              </div>
              <div>
                <p className="text-subtle">Focus</p>
                <p className="mt-1.5 text-white/75">Full Stack Web</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <div className="wrap">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Portrait variant="about" className="aspect-[4/5] w-full" />
                </Reveal>

                <Reveal delay={0.1}>
                  <dl className="mt-6 divide-y divide-white/10 border border-white/10 px-5">
                    {[
                      ["University", siteConfig.university],
                      ["Department", siteConfig.department],
                      ["Semester", `${siteConfig.semester} · In progress`],
                      ["Location", siteConfig.location],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-start justify-between gap-6 py-4"
                      >
                        <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                          {label}
                        </dt>
                        <dd className="max-w-[60%] text-right text-[11px] leading-5 text-white/70">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-accent/80">
                  The short biography
                </p>
                <p className="mt-4 text-balance font-serif text-[clamp(1.8rem,3vw,2.7rem)] italic leading-[1.15] text-white/90">
                  Learning in public, one project and one concept at a time.
                </p>
                <div className="mt-7 space-y-5 text-[14px] leading-7 text-muted">
                  <p>
                    {siteConfig.longBio}
                  </p>
                  <p>
                    My interest in web development comes from the combination of
                    things it brings together: visual craft, logic, data,
                    thoughtful architecture, and the experience of actually using
                    what you built. I like the full path — from a blank folder to
                    an interface someone can navigate without instructions.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="mt-10">
                <div className="flex items-center gap-3 border-t border-white/10 pt-7">
                  <GraduationCap className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
                    Education
                  </h2>
                </div>
                <div className="mt-5 overflow-hidden border border-white/10 bg-[#0d0d0d]">
                  <div className="flex items-start gap-4 p-5 sm:p-6">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.07] text-accent">
                      <GraduationCap className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                        Current degree
                      </p>
                      <h3 className="mt-1.5 text-base font-medium tracking-[-0.02em] text-white/90">
                        {siteConfig.university}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {siteConfig.department}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
                          {siteConfig.semester}
                        </span>
                        <span className="border border-accent/20 bg-accent/[0.05] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-accent/80">
                          In progress
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-10 border-t border-white/10 pt-7">
                <div className="flex items-center gap-3">
                  <BookOpen className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
                    How I try to work
                  </h2>
                </div>
                <div className="mt-5 space-y-1">
                  {principles.map((principle) => {
                    const Icon = principle.icon;
                    return (
                      <div
                        key={principle.title}
                        className="group flex gap-4 border border-white/[0.07] bg-white/[0.015] p-4 transition-colors duration-300 hover:border-accent/25 hover:bg-white/[0.03] sm:p-5"
                      >
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-white/10 text-white/35 transition-colors group-hover:border-accent/30 group-hover:text-accent">
                          <Icon className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm font-medium text-white/85">
                              {principle.title}
                            </h3>
                            <span className="font-mono text-[8px] text-white/20">
                              {principle.index}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[11px] leading-5 text-subtle">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.12} className="mt-10 border-t border-white/10 pt-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Compass className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                    <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
                      Currently learning
                    </h2>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    No fixed finish line
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {siteConfig.currentFocus.map((goal) => (
                    <li
                      key={goal}
                      className="flex items-start gap-3 text-[12px] leading-5 text-muted"
                    >
                      <ArrowRight className="mt-1 size-3 shrink-0 text-accent/60" strokeWidth={1.6} aria-hidden="true" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.14} className="mt-10 border-t border-white/10 pt-7">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
                    Beyond the screen
                  </h2>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {siteConfig.interests.map((interest) => (
                    <li
                      key={interest}
                      className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] text-white/60"
                    >
                      <span className="size-1 rounded-full bg-accent/70" aria-hidden="true" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16} className="mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Button href="/contact" size="lg">
                    Start a conversation
                  </Button>
                  <Button href="/#journey" variant="outline" size="lg">
                    Read the journey
                  </Button>
                </div>
                <div className="mt-6 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                  <MapPin className="size-3" strokeWidth={1.5} aria-hidden="true" />
                  {siteConfig.location} · Open to opportunities
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909]">
        <div className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
              Elsewhere
            </p>
            <p className="mt-2 text-sm text-white/70">
              Follow the work, or reach out directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            {[
              ["GitHub", siteConfig.socials.github],
              ["LinkedIn", siteConfig.socials.linkedin],
              ["Email", `mailto:${siteConfig.email}`],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
              >
                {label}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
