import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  image?: string;
}

const defaultImage = "/images/og/og-image.jpg";

export function createMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
  image = defaultImage,
}: SeoOptions): Metadata {
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      title,
      description,
      url: absoluteUrl(path),
      siteName: `${siteConfig.displayName} — Portfolio`,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.displayName} — ${siteConfig.title}`,
        },
      ],
      ...(type === "article" && publishedTime
        ? { publishedTime, tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
