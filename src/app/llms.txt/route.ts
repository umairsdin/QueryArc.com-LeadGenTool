import { getRoute, siteConfig } from "@/lib/route-registry";

export function GET() {
  const audit = getRoute("aiVisibility");
  const body = [
    `# ${siteConfig.name}`,
    "",
    "> QueryArc helps teams audit whether their brand appears in AI-generated buyer recommendations.",
    "",
    "## Primary Resources",
    `- [Free AI Visibility Audit](${siteConfig.url}${audit.path}): ${audit.description}`,
    `- [Content Index](${siteConfig.url}/content-index.json)`,
    `- [Full LLM Reference](${siteConfig.url}/llms-full.txt)`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
