import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { COMPANY } from "@/lib/company";

const PAGES = ["", "/about", "/work", "/contact", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routing.locales.flatMap((locale) =>
    PAGES.map((path) => ({
      url: `${COMPANY.url}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
