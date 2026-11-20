import Link from "next/link";

import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Blog() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="anchor-offset section-pad relative border-t border-ink/10">
      <div className="wrap">
        <SectionHeading
          eyebrow="06 — Journal"
          title={
            <>
              Thoughts, learnings{" "}
              <span className="block">
                &amp;{" "}
                <em className="font-serif font-normal italic">experiences</em>
                <span className="text-accent">.</span>
              </span>
            </>
          }
          description="Notes on the web, computer science and the process of learning. Writing is how I make sure I actually understand the thing."
          action={
            <Button href="/blog" variant="outline" size="sm">
              All articles
            </Button>
          }
        />

        <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.07} className="h-full">
              <BlogCard post={post} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08} className="mt-12">
          <div className="flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-5 text-subtle">
              Early entries are clearly marked{" "}
              <span className="text-ink/60">sample articles</span> while the
              journal is being written.
            </p>
            <Link
              href="/blog"
              className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-accent"
            >
              Browse the journal →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
