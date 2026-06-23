import { ImageResponse } from "next/og.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { createElement as h } from "react";

// Renders the branded social-share card to a static public/og.png.
// Static asset is immune to `trailingSlash` redirects and needs no runtime cost.
// Re-run with: node scripts/gen-og.mjs

const SITE_NAME = "QueryArc";

const element = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "80px",
      background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%)",
      fontFamily: "sans-serif",
    },
  },
  // Brand row
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: "20px" } },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "72px",
          height: "72px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          fontSize: "40px",
          fontWeight: 800,
          color: "#ffffff",
        },
      },
      "Q",
    ),
    h("span", { style: { fontSize: "40px", fontWeight: 700, color: "#ffffff" } }, SITE_NAME),
  ),
  // Headline
  h(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: "28px" } },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          padding: "10px 22px",
          borderRadius: "999px",
          border: "1px solid rgba(165, 180, 252, 0.4)",
          background: "rgba(99, 102, 241, 0.18)",
          fontSize: "26px",
          fontWeight: 600,
          color: "#c7d2fe",
        },
      },
      "Free AI Visibility Audit",
    ),
    h(
      "div",
      {
        style: {
          fontSize: "68px",
          fontWeight: 800,
          lineHeight: 1.1,
          color: "#ffffff",
          maxWidth: "1000px",
        },
      },
      "Are your buyers choosing competitors in AI answers?",
    ),
  ),
  // Footer
  h(
    "div",
    { style: { display: "flex", fontSize: "28px", color: "#a5b4fc" } },
    "See if your brand shows up in ChatGPT, Claude, Gemini, Perplexity & Grok.",
  ),
);

const image = new ImageResponse(element, { width: 1200, height: 630 });
const buffer = Buffer.from(await image.arrayBuffer());

mkdirSync("public", { recursive: true });
writeFileSync("public/og.png", buffer);
console.log(`Wrote public/og.png (${buffer.length} bytes)`);
