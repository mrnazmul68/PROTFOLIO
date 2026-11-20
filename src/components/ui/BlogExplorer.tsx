"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";

import type { BlogPostMeta } from "@/types/blog";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/ui/BlogCard";

interface BlogExplorerProps {
  posts: BlogPostMeta[];
  categories: string[];
}

export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const reduceMotion = useReducedMotion();

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !search ||
        [post.title, post.description, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-ink/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-ink/30"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the journal..."
            className="h-10 w-full border border-ink/10 bg-ink/[0.02] pl-10 pr-10 text-[12px] text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-accent/50 focus:ring-1 focus:ring-accent/25"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 transition-colors hover:text-ink"
            >
              <X className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5 no-scrollbar"
          role="group"
          aria-label="Filter articles by category"
        >
          {["All", ...categories].map((category) => {
            const active = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[10px] transition-all duration-300",
                  active
                    ? "border-accent/50 bg-accent text-[#080808]"
                    : "border-ink/10 text-muted hover:border-ink/20 hover:text-ink",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p
          className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30"
          aria-live="polite"
        >
          {String(filteredPosts.length).padStart(2, "0")} article
          {filteredPosts.length === 1 ? "" : "s"}
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/20">
          Sample entries clearly labelled
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <motion.div
          layout
          className="mt-9 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredPosts.map((post) => {
              const originalIndex = posts.findIndex(
                (item) => item.slug === post.slug,
              );

              return (
                <motion.div
                  key={post.slug}
                  layout
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <BlogCard post={post} index={Math.max(originalIndex, 0)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-9 flex min-h-64 flex-col items-center justify-center border border-ink/10 bg-ink/[0.015] px-6 text-center">
          <p className="font-serif text-3xl italic text-ink/50">Nothing here yet.</p>
          <p className="mt-3 max-w-sm text-[12px] leading-6 text-subtle">
            No articles match that search. Try a broader phrase or clear the
            filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="mt-5 border-b border-ink/20 pb-1 text-[10px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:border-accent hover:text-accent"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
