import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits plain HTML/CSS/JS into `out/`
  output: "export",
  // The default next/image optimizer needs a server; serve images as-is
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
