import { useTranslations, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

type Principle = { title: string; body: string };
type Step = { step: string; title: string; body: string };
type Focus = { label: string; metric: string; body: string };

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
    about: {
      principles: Principle[];
      approach: Step[];
      visionFocus: Focus[];
    };
  };
  const principles = messages.about.principles;
  const approach = messages.about.approach;
  const visionFocus = messages.about.visionFocus;

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
            width: "32rem",
            height: "32rem",
            background:
              "radial-gradient(circle, rgba(176,214,67,0.32), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("title")}
          </p>
          <h1 className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[28ch] text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight">
            {t("lede")}
          </h1>
        </div>
      </section>

      {/* Mission quote — huge typography on white */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-white">
        <div
          className="hero-blob"
          style={{
            top: "-6rem",
            right: "-6rem",
            width: "28rem",
            height: "28rem",
            background:
              "radial-gradient(circle, rgba(105,165,164,0.22), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("missionHeading")}
          </p>
          <blockquote className="mt-10 max-w-[24ch] text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-tight">
            <span
              aria-hidden
              className="block text-[var(--color-accent-2)] opacity-50"
              style={{ fontSize: "1.4em", lineHeight: 0.7 }}
            >
              "
            </span>
            <span className="gradient-text">{t("missionQuote")}</span>
          </blockquote>
          <p className="mt-12 max-w-[68ch] text-lg leading-[1.7] text-[var(--color-fg-muted)] md:text-xl md:leading-[1.65]">
            {t("missionBody")}
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
        <div
          className="hero-blob -z-10"
          style={{
            top: "-6rem",
            right: "-6rem",
            width: "32rem",
            height: "32rem",
            background:
              "radial-gradient(circle, rgba(176,214,67,0.4), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("visionHeading")}
          </p>
          <h2 className="mt-8 max-w-[26ch] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
            {t("visionTagline")}
          </h2>
          <p className="mt-10 max-w-[68ch] text-lg leading-[1.7] text-[var(--color-fg-muted)] md:text-xl md:leading-[1.65]">
            {t("visionBody")}
          </p>

          {/* Focus areas with metrics */}
          <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 lg:grid-cols-4">
            {visionFocus.map((f) => (
              <article
                key={f.label}
                className="flex flex-col gap-3 bg-white p-7 transition hover:bg-[var(--color-wash-lime-light)]"
              >
                <p className="text-2xl font-bold tracking-tight">{f.label}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-2)]">
                  {f.metric}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("originHeading")}
          </h2>
          <p className="mt-8 max-w-[65ch] text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.6]">
            {t("originBody")}
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("principlesHeading")}
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-7">
                <span className="text-xs font-mono text-[var(--color-fg-muted)]">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">
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
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
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
                className="rounded-2xl border border-[var(--color-border)] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
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

      {/* What we don't make */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("antiHeading")}
          </h2>
          <p className="mt-8 max-w-[65ch] text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.6]">
            {t("antiBody")}
          </p>
        </div>
      </section>

      {/* Studio facts */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-lime-light)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
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
