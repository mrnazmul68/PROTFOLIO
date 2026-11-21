import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { featuredProjects, projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  const leftProjects = [featuredProjects[0], featuredProjects[2]];
  const rightProjects = [featuredProjects[1], featuredProjects[3]];
  const liveCount = projects.filter((project) => project.liveUrl).length;

  return (
    <section id="projects" className="anchor-offset section-pad relative overflow-hidden border-t border-ink/10">
      <div
        aria-hidden="true"
        className="absolute right-[-20%] top-1/4 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.06),transparent_68%)] blur-3xl"
      />

      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="04 — Selected work"
          title={
            <>
              Selected{" "}
              <em className="font-serif font-normal italic">works</em>
              <span className="text-accent">.</span>
            </>
          }
          description="Some things I've built with curiosity, creativity, and code. Each project is a study in turning an idea into a working system."
          action={
            <Button href="/projects" variant="route" size="sm">
              View the archive
            </Button>
          }
        />

        <div className="mt-16 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-7 lg:space-y-20">
            {leftProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="space-y-16 lg:col-span-5 lg:space-y-20 lg:pt-28">
            {rightProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.08} className="mt-16">
          <div className="flex flex-col gap-5 border-y border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
              <span>{String(projects.length).padStart(2, "0")} projects in the archive</span>
              <span>{String(liveCount).padStart(2, "0")} live deployments</span>
              <span className="hidden text-ink/25 sm:inline">Updated as work ships</span>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink/75 transition-colors hover:text-accent"
            >
              Explore every build
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
