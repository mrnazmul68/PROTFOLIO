import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Link2,
} from "lucide-react";

import {
  getAdjacentProject,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ProjectArtwork } from "@/components/ui/ProjectArtwork";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/animations/Reveal";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const nextProject = getAdjacentProject(project.slug);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: {
      "@type": "Person",
      name: "Nazmul Islam Mazumdar",
      url: absoluteUrl("/"),
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden border-b border-ink/10 pb-12 pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid opacity-[0.16] [mask-image:linear-gradient(to_bottom,black,transparent_95%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[12%] -top-[30%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.13),transparent_68%)] blur-3xl"
        />

        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-accent"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink/50">{project.index}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[8px] uppercase tracking-[0.2em]">
                <span className="text-accent">{project.index}</span>
                <span className="h-px w-6 bg-ink/15" aria-hidden="true" />
                <span className="text-subtle">{project.category}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.9rem,6.4vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">
                {project.title}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-5 font-serif text-[clamp(1.2rem,2vw,1.65rem)] italic text-ink/45">
                {project.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-pretty text-sm leading-7 text-muted">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <Button href={project.liveUrl} size="lg">
                    Visit live site
                  </Button>
                ) : (
                  <span className="inline-flex h-14 items-center rounded-full border border-ink/10 bg-ink/[0.02] px-6 font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    Live link coming soon
                  </span>
                )}
                {project.repoUrl ? (
                  <Button href={project.repoUrl} variant="outline" size="lg">
                    View repository
                  </Button>
                ) : (
                  <span className="inline-flex h-14 items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.02] px-6 font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    <BrandIcon name="github" className="size-3.5" />
                    Repo not configured
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <dl className="w-full min-w-60 divide-y divide-ink/10 border-y border-ink/10">
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    Type
                  </dt>
                  <dd className="text-[11px] text-ink/70">{project.category}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    Stack
                  </dt>
                  <dd className="text-right text-[11px] text-ink/70">
                    {project.technologies.slice(0, 3).join(", ")}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    Focus
                  </dt>
                  <dd className="text-right text-[11px] text-ink/70">
                    {project.category === "Full Stack"
                      ? "End-to-end product"
                      : project.category === "Backend"
                        ? "API & data"
                        : "Interactive interface"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
                    Preview
                  </dt>
                  <dd className="text-[11px] text-ink/70">Concept artwork</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap pt-8 sm:pt-10">
        <Reveal>
          <div className="overflow-hidden border border-ink/10">
            <ProjectArtwork
              visual={project.visual}
              index={project.index}
              title={project.title}
              className="aspect-[16/9]"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/25">
            <span>Concept preview — not a screenshot</span>
            <span>{project.title} / {project.index}</span>
          </div>
        </Reveal>
      </div>

      <section className="section-pad">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
                  <Layers3 className="size-3.5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  Overview
                </div>
                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-ink/70">
                  {project.longDescription}
                </p>
              </Reveal>

              <Reveal delay={0.08} className="mt-12">
                <div className="flex items-center gap-3 border-t border-ink/10 pt-7">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
                    What it explores
                  </span>
                </div>
                <ul className="mt-5 divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      className="group flex items-center gap-4 py-4 transition-colors hover:bg-ink/[0.015]"
                    >
                      <span className="font-mono text-[8px] text-ink/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[13px] text-ink/65 transition-colors group-hover:text-ink/85">
                        {highlight}
                      </span>
                      <ArrowUpRight
                        className="size-3.5 text-ink/15 transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <div className="border border-ink/10 bg-ink/[0.015] p-5">
                  <p className="flex items-start gap-3 text-[11px] leading-6 text-subtle">
                    <Link2 className="mt-1 size-3.5 shrink-0 text-accent/60" strokeWidth={1.5} aria-hidden="true" />
                    The live and repository links shown here are only the ones
                    that have been provided. Missing links are intentional
                    placeholders and will be updated when the URLs are available.
                  </p>
                </div>
              </Reveal>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.06}>
                <div className="border border-ink/10 bg-card p-5 sm:p-6">
                  <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
                    Project details
                  </p>
                  <div className="mt-5 border-t border-ink/10 pt-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent/70">
                      Technology stack
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="border border-ink/10 bg-ink/[0.025] px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/55"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent/70">
                      Project links
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 text-[12px] text-ink/65 transition-colors hover:text-accent"
                        >
                          Live deployment
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <p className="text-[11px] text-subtle">Live link not available</p>
                      )}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 text-[12px] text-ink/65 transition-colors hover:text-accent"
                        >
                          GitHub repository
                          <BrandIcon name="github" className="size-3.5" />
                        </a>
                      ) : (
                        <p className="text-[11px] text-subtle">Repository link not configured</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <Button href="/contact" variant="outline" size="sm" className="w-full">
                      Discuss a project
                    </Button>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="wrap py-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-subtle transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              All projects
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-5 text-right"
            >
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                  Next project
                </p>
                <p className="mt-1.5 text-lg font-medium tracking-[-0.03em] text-ink/80 transition-colors group-hover:text-accent sm:text-xl">
                  {nextProject.title}
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.6} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
