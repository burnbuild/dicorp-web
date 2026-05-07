import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { Glance } from "@/components/home/glance";
import { AboutSummary } from "@/components/home/about-summary";
import { Principles } from "@/components/home/principles";
import { Manifesto } from "@/components/home/manifesto";
import { AntiPatterns } from "@/components/home/anti-patterns";
import { WorkPreview } from "@/components/home/work-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { BigWordmark } from "@/components/big-wordmark";
import { routing, type Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale: Locale = routing.locales.includes(locale as never)
    ? (locale as Locale)
    : "en";
  return (
    <>
      <Hero locale={safeLocale} />
      <Glance />
      <AboutSummary locale={safeLocale} />
      <Principles />
      <Manifesto />
      <AntiPatterns />
      <WorkPreview locale={safeLocale} />
      <ContactCta />
      <BigWordmark />
    </>
  );
}
