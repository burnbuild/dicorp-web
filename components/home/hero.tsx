import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("home.hero");
  const tagline = t("tagline");

  // EN: highlight last two words ("Goals that stick.").
  // KO: highlight everything after the comma.
  const taglineRendered =
    locale === "ko" ? renderKo(tagline) : renderEn(tagline);

  return (
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
          top: "-8rem",
          right: "-8rem",
          width: "32rem",
          height: "32rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.4), transparent 70%)",
        }}
      />
      <div
        className="hero-blob -z-10"
        style={{
          bottom: "-6rem",
          left: "-6rem",
          width: "24rem",
          height: "24rem",
          background:
            "radial-gradient(circle, rgba(105,165,164,0.18), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1080px] px-6 py-28 md:px-8 md:py-40">
        <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          Di Corporations
        </p>
        <h1 className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight">
          {taglineRendered}
        </h1>
        <p className="mp-fade-up mp-fade-up-delay-2 mt-6 max-w-[40ch] text-base text-[var(--color-fg-muted)] md:text-lg">
          {t("subline")}
        </p>
        <Link
          href={`/${locale}/work`}
          className="cta-glow mp-fade-up mp-fade-up-delay-3 mt-12 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"
        >
          {t("cta")} <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

function renderEn(tagline: string) {
  // "Healthier days. Goals that stick." → split at last 3 words
  const words = tagline.split(" ");
  if (words.length < 4) {
    return <span className="gradient-text">{tagline}</span>;
  }
  const head = words.slice(0, 2).join(" ");
  const tail = words.slice(2).join(" ");
  return (
    <>
      {head} <span className="gradient-text">{tail}</span>
    </>
  );
}

function renderKo(tagline: string) {
  // "건강하게, 원하는 곳까지." → split at comma
  const idx = tagline.indexOf(",");
  if (idx === -1) {
    return <span className="gradient-text">{tagline}</span>;
  }
  const head = tagline.slice(0, idx + 1);
  const tail = tagline.slice(idx + 1).trim();
  return (
    <>
      {head} <span className="gradient-text">{tail}</span>
    </>
  );
}
