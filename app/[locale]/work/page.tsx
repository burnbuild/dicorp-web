import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ProjectCard } from "@/components/work/project-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("work.title"),
    description: t("work.description"),
    alternates: {
      canonical: `/${locale}/work`,
      languages: { en: "/en/work", ko: "/ko/work" },
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkContent />;
}

function WorkContent() {
  const t = useTranslations("work");
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
            top: "-4rem",
            left: "-6rem",
            width: "24rem",
            height: "24rem",
            background:
              "radial-gradient(circle, rgba(105,165,164,0.22), transparent 70%)",
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

      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <ProjectCard
            name={t("burnbuild.name")}
            tagline={t("burnbuild.tagline")}
            description={t("burnbuild.description")}
            status={t("burnbuild.status")}
            platforms={t("burnbuild.platforms")}
          />
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("futureSlot.label")}
          </p>
          <p className="mt-6 max-w-[60ch] text-lg text-[var(--color-fg-muted)]">
            {t("futureSlot.body")}
          </p>
        </div>
      </section>
    </>
  );
}
