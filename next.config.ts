import type { NextConfig } from "next";

// En GitHub Pages el sitio vive en /<nombre-del-repo>. El workflow de despliegue
// define NEXT_PUBLIC_BASE_PATH; en local queda vacío.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
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
