import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { ProjectArtwork } from "@/components/ui/ProjectArtwork";
import { BrandIcon } from "@/components/ui/BrandIcon";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article className={cn("group", className)}>
      <div className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em]">
        <span className="text-accent">{project.index}</span>
        <span className="h-px w-6 bg-white/20" aria-hidden="true" />
        <span className="text-subtle">{project.category}</span>
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="relative block overflow-hidden border border-white/10 transition-colors duration-500 group-hover:border-accent/30"
        aria-label={`View the ${project.title} project details`}
      >
        <ProjectArtwork
          visual={project.visual}
          index={project.index}
          title={project.title}
        />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex translate-y-3 items-center justify-between opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <span className="border border-white/15 bg-black/60 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
            View case study
          </span>
          <span className="flex size-9 items-center justify-center rounded-full bg-accent text-[#080808]">
            <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>
      </Link>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <h3 className="text-balance text-[clamp(1.45rem,2.3vw,2.05rem)] font-medium leading-[1.1] tracking-[-0.04em]">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors duration-300 hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2.5 max-w-xl text-pretty text-[13px] leading-6 text-muted">
            {project.description}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="hidden shrink-0 font-serif text-4xl italic leading-none text-white/10 sm:block"
        >
          {project.index}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-white/[0.08] pt-4">
        <ul
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1"
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.technologies.slice(0, 5).map((technology, index) => (
            <li
              key={technology}
              className="flex items-center gap-2.5 font-mono text-[8px] uppercase tracking-[0.13em] text-subtle"
            >
              {index > 0 ? (
                <span className="size-0.5 rounded-full bg-white/20" aria-hidden="true" />
              ) : null}
              {technology}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-[10px] font-medium">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
              aria-label={`Open the live ${project.title} site`}
            >
              Live site
              <ArrowUpRight className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 text-subtle/60"
              title="A live link will be added when it is available."
            >
              Live soon
            </span>
          )}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
              aria-label={`Open the ${project.title} GitHub repository`}
            >
              <BrandIcon name="github" className="size-3.5" />
              GitHub
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 text-subtle/60"
              title="The repository link has not been configured yet."
            >
              <BrandIcon name="github" className="size-3.5" />
              Repo soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
