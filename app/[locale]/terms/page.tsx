import { useTranslations, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Sec = { heading: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("terms.title"),
    description: t("terms.description"),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: { en: "/en/terms", ko: "/ko/terms" },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("terms");
  const messages = useMessages() as { terms: { sections: Sec[] } };
  const sections = messages.terms.sections;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("title")}
        </p>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-xs text-[var(--color-fg-muted)]">
          {t("lastUpdated")}
        </p>
        <p className="mt-10 max-w-[65ch] text-lg leading-relaxed">
          {t("intro")}
        </p>

        <div className="mt-14 space-y-12">
          {sections.map((s) => (
            <section key={s.heading} className="max-w-[65ch]">
              <h2 className="text-xl font-semibold tracking-tight">
                {s.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
