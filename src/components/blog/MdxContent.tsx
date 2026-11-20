import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getTextFromNode, slugify } from "@/lib/utils";

const components = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 id={slugify(getTextFromNode(children))} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 id={slugify(getTextFromNode(children))} {...props}>
      {children}
    </h3>
  ),
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = Boolean(href && /^https?:\/\//.test(href));

    if (!isExternal && href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  table: ({ children }: { children?: ReactNode }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
