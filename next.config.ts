import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {},
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
