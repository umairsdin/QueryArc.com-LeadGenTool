import { routes, siteConfig } from "@/lib/route-registry";

export function GET() {
  return Response.json({
    site: siteConfig.name,
    baseUrl: siteConfig.url,
    generatedAt: new Date().toISOString(),
    routes: routes
      .filter((route) => route.index)
      .map((route) => ({
        path: route.path,
        url: `${siteConfig.url}${route.path}`,
        title: route.title,
        description: route.description,
        type: route.type,
        facts: route.facts || [],
        faqs: route.faqs || [],
      })),
  });
}
