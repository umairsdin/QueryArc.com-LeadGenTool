import AIVisibilityPage from "@/views/AIVisibility";
import { buildMetadata } from "@/lib/metadata";
import { getRoute } from "@/lib/route-registry";
import { auditToolSchema, faqSchema } from "@/lib/structured-data";

const route = getRoute("aiVisibility");

export const metadata = buildMetadata(route);

export default function AIVisibilityRoute() {
  const jsonLd = [auditToolSchema(), faqSchema(route.faqs || [])];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AIVisibilityPage />
    </>
  );
}
