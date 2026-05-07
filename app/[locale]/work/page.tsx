import { useTranslations, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PhoneMockup } from "@/components/phone-mockup";

type Highlight = { title: string; body: string };
type GrainPair = { instead: string; we: string };

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
    work: {
      burnbuild: { highlights: Highlight[] };
      againstGrain: GrainPair[];
    };
  };
  const highlights = messages.work.burnbuild.highlights;
  const grain = messages.work.againstGrain;

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
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("title")}
          </p>
          <h1 className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[28ch] text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight">
            {t("lede")}
          </h1>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("approachHeading")}
          </h2>
          <p className="mt-8 max-w-[65ch] text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.6]">
            {t("approachBody")}
          </p>
        </div>
      </section>

      {/* BurnBuild card with phone mockup */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
                {t("burnbuild.status")}
              </span>
              <h2 className="mt-6 text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold tracking-tight">
                {t("burnbuild.name")}
              </h2>
              <p className="mt-3 text-base text-[var(--color-fg-muted)]">
                {t("burnbuild.tagline")}
              </p>
              <p className="mt-8 max-w-[55ch] text-lg leading-relaxed">
                {t("burnbuild.description")}
              </p>
              <p className="mt-8 text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                {t("burnbuild.platforms")}
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(176,214,67,0.3), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div style={{ transform: "rotate(-3deg)" }}>
                <PhoneMockup scale={0.85} />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-20">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
              {t("burnbuild.highlightsHeading")}
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
              {highlights.map((h, i) => (
                <article
                  key={h.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
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

      {/* Against the grain */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-fg)] text-white">
        <div
          className="hero-blob"
          style={{
            top: "-6rem",
            right: "-6rem",
            width: "28rem",
            height: "28rem",
            background:
              "radial-gradient(circle, rgba(176,214,67,0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <h2 className="max-w-[20ch] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
            {t("againstGrainHeading")}
          </h2>
          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {grain.map((row, i) => (
              <li
                key={row.instead}
                className="flex flex-col gap-3 border-t border-white/15 pt-6"
              >
                <span className="text-xs font-mono text-white/40">
                  0{i + 1}
                </span>
                <p className="text-lg font-semibold tracking-tight text-white">
                  {row.instead},
                </p>
                <p className="text-base leading-relaxed text-white/65">
                  {row.we}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future slot */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-lime-light)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
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
