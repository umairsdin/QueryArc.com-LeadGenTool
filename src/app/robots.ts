import type { MetadataRoute } from "next";
import { canonicalUrl, siteConfig } from "@/lib/route-registry";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/report/"],
    },
    sitemap: canonicalUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
