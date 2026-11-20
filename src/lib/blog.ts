import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { BlogPost, BlogPostMeta, TocItem } from "@/types/blog";
import { getReadingTime, slugify } from "@/lib/utils";

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog");

interface Frontmatter {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  category?: unknown;
  tags?: unknown;
  sample?: unknown;
}

function normaliseDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const stringValue = String(value ?? "");
  return /^\d{4}-\d{2}-\d{2}$/.test(stringValue) ? stringValue : stringValue.slice(0, 10);
}

function normaliseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  return [];
}

function parseFrontmatter(slug: string, source: string): { meta: BlogPostMeta; content: string } {
  const { data, content } = matter(source);
  const frontmatter = data as Frontmatter;
  const title = String(frontmatter.title ?? slug);
  const date = normaliseDate(frontmatter.date);

  return {
    content,
    meta: {
      slug,
      title,
      description: String(frontmatter.description ?? ""),
      date,
      category: String(frontmatter.category ?? "Notes"),
      tags: normaliseTags(frontmatter.tags),
      readingTime: getReadingTime(content),
      sample: frontmatter.sample !== false,
    },
  };
}

export function extractTableOfContents(content: string): TocItem[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const headings: TocItem[] = [];
  const pattern = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(withoutCode)) !== null) {
    const level = match[1].length as 2 | 3;
    const title = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ title, id: slugify(title), level });
  }

  return headings;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .flatMap((file) => {
      try {
        const slug = file.replace(/\.mdx?$/, "");
        const source = fs.readFileSync(path.join(BLOG_DIRECTORY, file), "utf8");
        return [parseFrontmatter(slug, source).meta];
      } catch {
        return [];
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const mdxPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIRECTORY, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  try {
    const source = fs.readFileSync(filePath, "utf8");
    const { meta, content } = parseFrontmatter(slug, source);
    return { ...meta, content, toc: extractTableOfContents(content) };
  } catch {
    return null;
  }
}

export function getRelatedPosts(slug: string, limit = 2): BlogPostMeta[] {
  const posts = getAllPosts().filter((post) => post.slug !== slug);
  const current = getAllPosts().find((post) => post.slug === slug);

  if (!current) return posts.slice(0, limit);

  return [...posts]
    .sort((a, b) => {
      const scoreA =
        (a.category === current.category ? 2 : 0) +
        a.tags.filter((tag) => current.tags.includes(tag)).length;
      const scoreB =
        (b.category === current.category ? 2 : 0) +
        b.tags.filter((tag) => current.tags.includes(tag)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function getBlogCategories(): string[] {
  return [...new Set(getAllPosts().map((post) => post.category))];
}
