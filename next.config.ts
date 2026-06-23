import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/route-registry";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  redirects: async () =>
    legacyRedirects.map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: true,
    })),
};

export default nextConfig;
