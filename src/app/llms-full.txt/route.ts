import { routes, siteConfig } from "@/lib/route-registry";

export function GET() {
  const body = [
    `# ${siteConfig.name} Full Content Reference`,
    "",
    siteConfig.defaultDescription,
    "",
    "## Canonical Routes",
    ...routes
      .filter((route) => route.index)
      .map((route) =>
        [
          "",
          `### ${route.title}`,
          `URL: ${siteConfig.url}${route.path}`,
          `Description: ${route.description}`,
          route.facts?.length ? `Key facts: ${route.facts.join(" ")}` : "",
          route.faqs?.length
            ? `FAQs: ${route.faqs.map((faq) => `${faq.question} ${faq.answer}`).join(" ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
