import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const home = `${site.url}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Las demos son diseños de muestra; no deben aparecer en Google.
      disallow: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/demos/`,
    },
    sitemap: `${home}/sitemap.xml`,
  };
}
