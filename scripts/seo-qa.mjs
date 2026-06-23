const baseUrl = (process.env.SEO_QA_BASE_URL || process.argv[2] || "http://localhost:3000").replace(/\/+$/, "");

const expectedCopy = [
  "Your buyers may already be",
  "choosing competitors",
  "AI visibility audit FAQs",
  "What is an AI visibility audit?",
];

async function request(pathOrUrl, init) {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${baseUrl}${pathOrUrl}`;
  const response = await fetch(url, init);
  const text = await response.text();
  return { response, text, url };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function extractAll(pattern, text) {
  return [...text.matchAll(pattern)].map((match) => match[1]);
}

async function main() {
  const root = await request("/", { redirect: "manual" });
  assert([301, 308].includes(root.response.status), `Expected / to redirect permanently, got ${root.response.status}`);
  assert(
    root.response.headers.get("location")?.includes("/ai-visibility/"),
    `Expected / to redirect to /ai-visibility/, got ${root.response.headers.get("location")}`,
  );

  const robots = await request("/robots.txt");
  assert(robots.response.status === 200, `robots.txt returned ${robots.response.status}`);
  assert(robots.text.includes("Sitemap:"), "robots.txt does not reference sitemap.xml");

  const sitemap = await request("/sitemap.xml");
  assert(sitemap.response.status === 200, `sitemap.xml returned ${sitemap.response.status}`);
  const sitemapUrls = extractAll(/<loc>(.*?)<\/loc>/g, sitemap.text);
  assert(sitemapUrls.length > 0, "sitemap.xml has no URLs");
  assert(!sitemapUrls.some((url) => url.includes("/report/")), "sitemap.xml includes noindex report URLs");

  for (const url of sitemapUrls) {
    const page = await request(url);
    assert(page.response.status === 200, `${url} returned ${page.response.status}`);
  }

  const auditPage = await request("/ai-visibility/");
  assert(auditPage.response.status === 200, `/ai-visibility/ returned ${auditPage.response.status}`);

  for (const copy of expectedCopy) {
    assert(auditPage.text.includes(copy), `Raw HTML missing expected copy: ${copy}`);
  }

  const titleCount = extractAll(/<title>(.*?)<\/title>/g, auditPage.text).length;
  const description = auditPage.text.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = auditPage.text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = extractAll(/<h1\b[^>]*>/g, auditPage.text).length;
  const jsonLd = extractAll(/<script type="application\/ld\+json">(.*?)<\/script>/g, auditPage.text);

  assert(titleCount === 1, `Expected one title tag, found ${titleCount}`);
  assert(description && description.length > 50, "Missing or thin meta description");
  assert(canonical?.endsWith("/ai-visibility/"), `Unexpected canonical URL: ${canonical}`);
  assert(h1Count === 1, `Expected one H1, found ${h1Count}`);
  assert(jsonLd.length >= 3, `Expected Organization, WebSite, and page JSON-LD, found ${jsonLd.length}`);

  for (const block of jsonLd) {
    JSON.parse(block.replace(/&quot;/g, '"'));
  }

  const contentIndex = await request("/content-index.json");
  assert(contentIndex.response.status === 200, `content-index.json returned ${contentIndex.response.status}`);
  const content = JSON.parse(contentIndex.text);
  assert(content.routes?.some((route) => route.path === "/ai-visibility/"), "content-index.json missing audit route");

  const reportPage = await request("/report/seo-qa/");
  assert(reportPage.response.status === 200, `/report/seo-qa/ returned ${reportPage.response.status}`);
  assert(reportPage.text.includes('name="robots" content="noindex, nofollow"'), "Report page is missing noindex robots meta");

  console.log(`SEO QA passed for ${baseUrl}`);
  console.log(
    `Checked ${sitemapUrls.length} sitemap URL(s), robots.txt, redirect, metadata, JSON-LD, H1, noindex report route, and raw HTML copy.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
