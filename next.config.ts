import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow the cache-busting query on local portrait assets.
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
