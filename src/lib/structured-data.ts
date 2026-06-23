import { canonicalUrl, getRoute, siteConfig, type FaqEntry } from "@/lib/route-registry";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function auditToolSchema() {
  const route = getRoute("aiVisibility");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QueryArc Free AI Visibility Audit",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl(route.path),
    description: route.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqSchema(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
