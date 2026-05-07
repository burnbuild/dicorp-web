import { useTranslations, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

type Principle = { title: string; body: string };
type Step = { step: string; title: string; body: string };

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
  const messages = useMessages() as {
    about: { principles: Principle[]; approach: Step[] };
  };
  const principles = messages.about.principles;
  const approach = messages.about.approach;

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

      {/* Mission */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("missionHeading")}
          </h2>
          <p className="mp-fade-up mp-fade-up-delay-1 mt-8 max-w-[60ch] text-xl leading-relaxed md:text-[1.5rem] md:leading-[1.5]">
            {t("missionBody")}
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("principlesHeading")}
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="flex flex-col gap-3">
                <span className="text-xs font-mono text-[var(--color-fg-muted)]">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="max-w-[55ch] text-base leading-relaxed text-[var(--color-fg-muted)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
        <div
          className="hero-blob -z-10"
          style={{
            bottom: "-8rem",
            left: "-6rem",
            width: "28rem",
            height: "28rem",
            background:
              "radial-gradient(circle, rgba(105,165,164,0.18), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("approachHeading")}
          </h2>
          <p className="mt-6 max-w-[50ch] text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            {t("approachIntro")}
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {approach.map((s) => (
              <article
                key={s.step}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-7"
              >
                <span className="text-xs font-mono text-[var(--color-accent-2)]">
                  {s.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Studio facts */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("factsHeading")}
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-5 md:grid-cols-2">
            <Fact label={t("facts.founded")} value={COMPANY.foundedAt} />
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
