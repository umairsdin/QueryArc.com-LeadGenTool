import type { MetadataRoute } from "next";
import { canonicalUrl, sitemapRoutes } from "@/lib/route-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
