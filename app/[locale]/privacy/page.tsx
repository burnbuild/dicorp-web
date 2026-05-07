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
    title: t("privacy.title"),
    description: t("privacy.description"),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { en: "/en/privacy", ko: "/ko/privacy" },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");
  const messages = useMessages() as { privacy: { sections: Sec[] } };
  const sections = messages.privacy.sections;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-8 md:py-32">
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
