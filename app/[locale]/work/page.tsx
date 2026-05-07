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
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("approachHeading")}
          </p>
          <p className="mt-10 max-w-[65ch] text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.6]">
            {t("approachBody")}
          </p>
        </div>
      </section>

      {/* BurnBuild — split layout (text + phone) */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
                {t("burnbuild.status")}
              </span>
              <h2 className="mt-6 text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold tracking-tight leading-none">
                {t("burnbuild.name")}
              </h2>
              <p className="mt-4 text-lg text-[var(--color-fg-muted)]">
                {t("burnbuild.tagline")}
              </p>
              <p className="mt-10 max-w-[55ch] text-lg leading-relaxed">
                {t("burnbuild.description")}
              </p>
              <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
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

          {/* Highlights — horizontal strip, same pattern as Vision focus */}
          <div className="mt-24 grid gap-y-12 border-t border-[var(--color-fg)]/10 pt-14 md:grid-cols-3 md:gap-x-10">
            <p className="md:col-span-3 text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
              {t("burnbuild.highlightsHeading")}
            </p>
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className={`flex flex-col gap-3 ${
                  i > 0
                    ? "md:border-l md:border-[var(--color-fg)]/10 md:pl-10"
                    : ""
                }`}
              >
                <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {h.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Against the grain */}
      <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-white">
        <div
          className="hero-blob"
          style={{
            top: "-6rem",
            right: "-6rem",
            width: "28rem",
            height: "28rem",
            background:
              "radial-gradient(circle, rgba(176,214,67,0.3), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("againstGrainHeading")}
          </p>
          <ul className="mt-14 flex flex-col">
            {grain.map((row, i) => (
              <li
                key={row.instead}
                className="grid gap-3 border-t border-[var(--color-border)] py-10 md:grid-cols-[auto_1fr_2fr] md:gap-12 md:py-14 last:border-b last:border-[var(--color-border)]"
              >
                <span className="font-mono text-sm text-[var(--color-fg-muted)] md:pt-2">
                  0{i + 1}
                </span>
                <p className="text-xl font-semibold tracking-tight md:text-2xl">
                  {row.instead},
                </p>
                <p className="text-base leading-relaxed text-[var(--color-fg-muted)] md:max-w-[55ch] md:text-lg">
                  {row.we}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future slot */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-lime-light)]">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("futureSlot.label")}
          </p>
          <p className="mt-10 max-w-[60ch] text-xl leading-relaxed text-[var(--color-fg-muted)] md:text-[1.4rem] md:leading-[1.6]">
            {t("futureSlot.body")}
          </p>
        </div>
      </section>
    </>
  );
}
