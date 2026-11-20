import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPostMeta } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { BlogCover } from "@/components/ui/BlogCover";

interface BlogCardProps {
  post: BlogPostMeta;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden border border-white/10 transition-colors duration-500 group-hover:border-accent/30"
        aria-label={`Read ${post.title}`}
      >
        <div className="transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
          <BlogCover
            index={String(index + 1).padStart(2, "0")}
            category={post.category}
            sample={post.sample}
          />
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-subtle">
        <span className="text-accent/80">{post.category}</span>
        <span aria-hidden="true">/</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">/</span>
        <span>{post.readingTime} min read</span>
      </div>

      <h3 className="mt-3 text-balance text-[1.3rem] font-medium leading-[1.2] tracking-[-0.035em] sm:text-[1.45rem]">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors duration-300 hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-2.5 line-clamp-2 text-[13px] leading-6 text-muted">
        {post.description}
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-accent"
        tabIndex={-1}
        aria-hidden="true"
      >
        Read article
        <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
      </Link>
    </article>
  );
}
