import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  FlaskConical,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { BlogCard } from "@/components/ui/BlogCard";
import { BlogCover } from "@/components/ui/BlogCover";
import { MdxContent } from "@/components/blog/MdxContent";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Reveal } from "@/components/animations/Reveal";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: `${post.date}T00:00:00.000Z`,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const articleIndex = allPosts.findIndex((item) => item.slug === post.slug);
  const relatedPosts = getRelatedPosts(post.slug, 2);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl,
    mainEntityOfPage: postUrl,
    image: absoluteUrl("/images/og/og-image.jpg"),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <article>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden border-b border-white/10 pb-10 pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid opacity-[0.14] [mask-image:linear-gradient(to_bottom,black,transparent_95%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[12%] -top-[30%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.12),transparent_68%)] blur-3xl"
        />

        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
              <li>
                <Link href="/blog" className="transition-colors hover:text-accent">
                  Journal
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>{post.category}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="border border-accent/25 bg-accent/[0.06] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-accent/85">
                {post.category}
              </span>
              {post.sample ? (
                <span className="inline-flex items-center gap-1.5 border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
                  <FlaskConical className="size-2.5" strokeWidth={1.5} aria-hidden="true" />
                  Sample article
                </span>
              ) : null}
            </div>

            <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.3vw,5rem)] font-medium leading-[0.95] tracking-[-0.06em]">
              {post.title}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-sm leading-7 text-muted">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
              <span className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full border border-white/15 font-serif text-[11px] italic text-white/60">
                  NI
                </span>
                {siteConfig.displayName}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3" strokeWidth={1.5} aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-3" strokeWidth={1.5} aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap pt-8 sm:pt-10">
        <BlogCover
          index={String(Math.max(articleIndex, 0) + 1).padStart(2, "0")}
          category={post.category}
          sample={post.sample}
          className="aspect-[21/9]"
        />
      </div>

      <section className="py-12 sm:py-16">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-32">
                <TableOfContents items={post.toc} />
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.22em] text-subtle">
                    Share
                  </p>
                  <ShareLinks title={post.title} url={postUrl} />
                </div>
              </div>
            </aside>

            <div className="min-w-0 lg:col-span-8 lg:col-start-4">
              <details className="group mb-8 border border-white/10 bg-white/[0.015] lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/55">
                  On this page
                  <span className="text-white/25 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-white/10 px-4 py-4">
                  <TableOfContents items={post.toc} />
                </div>
              </details>

              {post.sample ? (
                <div className="mb-8 flex items-start gap-3 border border-accent/20 bg-accent/[0.035] p-4">
                  <FlaskConical className="mt-0.5 size-4 shrink-0 text-accent/70" strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-[11px] leading-5 text-muted">
                    <span className="text-white/70">Demonstration article.</span>{" "}
                    This piece is a clearly labelled sample created to show the
                    journal&apos;s reading experience. It is educational content,
                    not a fictional account of personal experience.
                  </p>
                </div>
              ) : null}

              <div className="prose-editorial max-w-[46rem]">
                <MdxContent source={post.content} />
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-y border-white/10 py-5">
                <ul className="flex flex-wrap gap-2" aria-label="Article tags">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/45"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
                <ShareLinks title={post.title} url={postUrl} />
              </div>

              <Reveal className="mt-12">
                <div className="flex flex-col gap-5 border border-white/10 bg-[#0d0d0d] p-5 sm:flex-row sm:items-start sm:p-6">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] font-serif text-xl italic text-white/70">
                    NI
                  </span>
                  <div className="flex-1">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                      Written by
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-white/85">
                      {siteConfig.name}
                    </p>
                    <p className="mt-2 max-w-lg text-[11px] leading-5 text-subtle">
                      {siteConfig.shortBio}
                    </p>
                    <Link
                      href="/about"
                      className="group mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-accent"
                    >
                      About Nazmul
                      <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <div className="mt-10">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-subtle transition-colors hover:text-white"
                >
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                  Back to the journal
                </Link>
              </div>

              {relatedPosts.length > 0 ? (
                <section className="mt-16 border-t border-white/10 pt-8" aria-labelledby="related-heading">
                  <div className="flex items-end justify-between gap-4">
                    <h2
                      id="related-heading"
                      className="text-2xl font-medium tracking-[-0.04em] text-white/85"
                    >
                      Keep reading
                    </h2>
                    <Link
                      href="/blog"
                      className="text-[9px] uppercase tracking-[0.16em] text-subtle transition-colors hover:text-accent"
                    >
                      All articles
                    </Link>
                  </div>
                  <div className="mt-7 grid gap-8 sm:grid-cols-2">
                    {relatedPosts.map((related, index) => (
                      <BlogCard
                        key={related.slug}
                        post={related}
                        index={allPosts.findIndex((item) => item.slug === related.slug) || index}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
