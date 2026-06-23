import type { Metadata } from "next";
import { canonicalUrl, siteConfig, type RouteEntry } from "@/lib/route-registry";

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: siteConfig.defaultTitle,
};

export function buildMetadata(route: RouteEntry, path = route.path): Metadata {
  const url = canonicalUrl(path);

  return {
    metadataBase: new URL(siteConfig.url),
    title: route.title,
    description: route.description,
    alternates: route.index ? { canonical: url } : undefined,
    openGraph: {
      title: route.title,
      description: route.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [ogImage.url],
    },
    robots: route.index
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
  };
}
