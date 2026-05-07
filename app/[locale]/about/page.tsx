import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", ko: "/ko/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, var(--color-wash-lime-light) 0%, #ffffff 100%)",
          }}
        />
        <div
          className="hero-blob -z-10"
          style={{
            top: "-6rem",
            right: "-6rem",
            width: "24rem",
            height: "24rem",
            background:
              "radial-gradient(circle, rgba(176,214,67,0.3), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-8 md:py-32">
          <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("title")}
          </p>
          <h1 className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[28ch] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight">
            {t("lede")}
          </h1>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("missionHeading")}
          </h2>
          <p className="mp-fade-up mp-fade-up-delay-1 mt-8 max-w-[60ch] text-xl leading-relaxed md:text-2xl">
            {t("missionBody")}
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("factsHeading")}
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-5 md:grid-cols-2">
            <Fact label={t("facts.founded")} value={COMPANY.foundedAt} />
            <Fact label={t("facts.team")} value={t("facts.teamValue")} />
            <Fact label={t("facts.based")} value={t("facts.basedValue")} />
            <Fact
              label={t("facts.registration")}
              value={COMPANY.registrationNumber}
            />
            <Fact
              label={t("facts.currentlyBuilding")}
              value={t("facts.currentlyBuildingValue")}
            />
          </dl>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
      <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
        {label}
      </dt>
      <dd className="text-base font-medium">{value}</dd>
    </div>
  );
}
