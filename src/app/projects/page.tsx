import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { ProjectsGrid } from "@/components/ui/ProjectsGrid";
import { Reveal } from "@/components/animations/Reveal";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Selected full-stack, frontend and backend projects by Nazmul Islam Mazumdar — built with Next.js, TypeScript, Node.js, MongoDB, PostgreSQL and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  const liveCount = projects.filter((project) => project.liveUrl).length;
  const categoryCount = new Set(projects.map((project) => project.category)).size;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid opacity-[0.18] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[14%] -top-[20%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.14),transparent_68%)] blur-3xl"
        />

        <div className="wrap relative z-10">
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-subtle">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Projects / Archive
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="text-[clamp(3.2rem,8vw,8rem)] font-medium leading-[0.85] tracking-[-0.075em] lg:col-span-8">
              Selected
              <br />
              <em className="font-serif font-normal italic">works</em>
              <span className="text-accent">.</span>
            </h1>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-sm text-pretty text-sm leading-7 text-muted">
                Some things I&apos;ve built with curiosity, creativity, and code.
                Each project is a practical study in interface, data and
                architecture.
              </p>
              <div className="mt-5 flex gap-8 font-mono text-[8px] uppercase tracking-[0.16em]">
                <div>
                  <span className="block text-[1.35rem] font-medium tracking-[-0.04em] text-white">
                    {String(projects.length).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-subtle">Projects</span>
                </div>
                <div>
                  <span className="block text-[1.35rem] font-medium tracking-[-0.04em] text-white">
                    {String(liveCount).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-subtle">Live</span>
                </div>
                <div>
                  <span className="block text-[1.35rem] font-medium tracking-[-0.04em] text-white">
                    {String(categoryCount).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-subtle">Categories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <ProjectsGrid projects={projects} />

          <Reveal delay={0.06} className="mt-14">
            <div className="grid gap-6 border-y border-white/10 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="max-w-xl text-[11px] leading-6 text-subtle">
                <span className="text-white/50">A note on previews:</span> the
                visuals are custom concept artwork, not screenshots. Live and
                repository links appear only where they exist — missing links are
                intentional placeholders, not broken buttons.
              </p>
              <Button href="/contact" variant="outline" size="md">
                Build one together
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909]">
        <div className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
              More context
            </p>
            <p className="mt-2 text-sm text-white/70">
              Read how the journey led to these builds.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/#journey"
              className="group inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
            >
              Development journey
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
            >
              Read the journal
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
