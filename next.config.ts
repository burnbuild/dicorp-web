import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // HTML pages — always revalidate (browser sends If-None-Match;
        // server returns 304 if unchanged, full page if changed)
        source: "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|logo.png|burnbuild-screen.png|sitemap.xml|robots.txt).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Static assets — cache for 1 year (Next.js fingerprints filenames)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

initOpenNextCloudflareForDev();

export default withNextIntl(nextConfig);
