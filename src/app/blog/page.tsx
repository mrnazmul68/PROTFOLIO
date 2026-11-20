import Link from "next/link";

import { getAllPosts, getBlogCategories } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { BlogExplorer } from "@/components/ui/BlogExplorer";
import { Reveal } from "@/components/animations/Reveal";

export const metadata = createMetadata({
  title: "Journal",
  description:
    "Notes on JavaScript, TypeScript, React, backend development, databases and computer science — a learning journal by Nazmul Islam Mazumdar.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getBlogCategories();

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid opacity-[0.16] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[14%] -top-[24%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.13),transparent_68%)] blur-3xl"
        />

        <div className="wrap relative z-10">
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-subtle">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Journal / Notes &amp; learning
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="text-balance text-[clamp(3rem,6.8vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.07em] lg:col-span-8">
              Thoughts, learnings
              <br />
              &amp;{" "}
              <em className="font-serif font-normal italic">experiences</em>
              <span className="text-accent">.</span>
            </h1>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-sm text-pretty text-sm leading-7 text-muted">
                Notes on the web, computer science and the process of learning.
                Writing is how I make sure I actually understand the thing.
              </p>
              <div className="mt-5 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
                <span>{String(posts.length).padStart(2, "0")} entries</span>
                <span className="h-px w-6 bg-ink/15" aria-hidden="true" />
                <span>Updated as I learn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <BlogExplorer posts={posts} categories={categories} />

          <Reveal delay={0.08} className="mt-14">
            <div className="flex flex-col gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-[11px] leading-6 text-subtle">
                <span className="text-ink/50">On the samples:</span> each entry
                marked &ldquo;sample article&rdquo; is a demonstration post for
                the journal layout. They are educational pieces, not fictional
                diary entries or claims of professional experience.
              </p>
              <Link
                href="/contact"
                className="shrink-0 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-accent"
              >
                Suggest a topic →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
