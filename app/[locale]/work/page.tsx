import { useTranslations, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ProjectCard } from "@/components/work/project-card";

type Highlight = { title: string; body: string };

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
  const messages = useMessages() as {
    work: { burnbuild: { highlights: Highlight[] } };
  };
  const highlights = messages.work.burnbuild.highlights;

  return (
    <>
      {/* Hero */}
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

      {/* Approach */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("approachHeading")}
          </h2>
          <p className="mt-8 max-w-[60ch] text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.55]">
            {t("approachBody")}
          </p>
        </div>
      </section>

      {/* BurnBuild card + highlights */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <ProjectCard
            name={t("burnbuild.name")}
            tagline={t("burnbuild.tagline")}
            description={t("burnbuild.description")}
            status={t("burnbuild.status")}
            platforms={t("burnbuild.platforms")}
          />

          <div className="mt-16">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
              {t("burnbuild.highlightsHeading")}
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
              {highlights.map((h, i) => (
                <article
                  key={h.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white p-7"
                >
                  <span className="text-xs font-mono text-[var(--color-fg-muted)]">
                    0{i + 1}
                  </span>
                  <h4 className="mt-4 text-lg font-semibold tracking-tight">
                    {h.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {h.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future slot */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("futureSlot.label")}
          </p>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {t("futureSlot.body")}
          </p>
        </div>
      </section>
    </>
  );
}
