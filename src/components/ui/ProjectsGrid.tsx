"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { Project, ProjectFilter } from "@/types/project";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
}

const filters: ProjectFilter[] = ["All", "Full Stack", "Frontend", "Backend"];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
            Filter
          </span>
          <span className="h-px w-5 bg-white/10" aria-hidden="true" />
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => {
              const active = filter === activeFilter;
              const count =
                filter === "All"
                  ? projects.length
                  : projects.filter((project) => project.category === filter).length;

              if (count === 0) return null;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[10px] transition-all duration-300",
                    active
                      ? "border-accent/50 bg-accent text-[#080808]"
                      : "border-white/10 text-muted hover:border-white/20 hover:text-white",
                  )}
                >
                  {filter}
                  <span
                    className={cn(
                      "ml-1.5 font-mono text-[8px]",
                      active ? "text-black/55" : "text-white/25",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p
          className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30"
          aria-live="polite"
        >
          Showing {String(filteredProjects.length).padStart(2, "0")} of{" "}
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-16"
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
