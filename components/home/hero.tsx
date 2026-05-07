import Link from "next/link";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/company";
import { PhoneMockup } from "@/components/phone-mockup";
import type { Locale } from "@/i18n/routing";

export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("home.hero");
  const tagline = t("tagline");
  const taglineRendered =
    locale === "ko" ? renderKo(tagline) : renderEn(tagline);

  return (
    <section className="relative overflow-hidden">
      {/* layered background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--color-wash-lime-light) 0%, #ffffff 70%)",
        }}
      />
      <div
        className="hero-blob -z-10"
        style={{
          top: "-10rem",
          right: "-10rem",
          width: "44rem",
          height: "44rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.45), transparent 65%)",
        }}
      />
      <div
        className="hero-blob -z-10"
        style={{
          bottom: "-8rem",
          left: "-8rem",
          width: "32rem",
          height: "32rem",
          background:
            "radial-gradient(circle, rgba(105,165,164,0.22), transparent 70%)",
        }}
      />

      {/* deco wordmark on background — large but quiet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 select-none overflow-hidden"
      >
        <p
          className="whitespace-nowrap text-center font-bold tracking-[-0.04em]"
          style={{
            fontSize: "clamp(6rem, 18vw, 16rem)",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(17,17,17,0.06)",
            transform: "translateY(28%)",
          }}
        >
          {t("deco")}
        </p>
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 pb-32 pt-24 md:grid-cols-[1.1fr_1fr] md:px-8 md:pb-40 md:pt-32">
        {/* left: text */}
        <div className="relative z-10">
          <p className="mp-fade-up flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            {t("marker")}
          </p>
          <h1 className="mp-fade-up mp-fade-up-delay-1 mt-7 max-w-[18ch] text-[clamp(2.75rem,6.5vw,5rem)] font-bold leading-[1.02] tracking-tight">
            {taglineRendered}
          </h1>
          <p className="mp-fade-up mp-fade-up-delay-2 mt-7 max-w-[58ch] text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg md:leading-[1.65]">
            {t("subline")}
          </p>
          <div className="mp-fade-up mp-fade-up-delay-3 mt-12 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/work`}
              className="cta-glow inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"
            >
              {t("cta")} <span aria-hidden>→</span>
            </Link>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-fg)]/15 bg-white/60 px-7 py-3 text-sm font-medium backdrop-blur transition hover:border-[var(--color-fg)]/40 hover:bg-white"
            >
              {t("secondaryCta")} <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* right: phone mockup */}
        <div className="mp-fade-up mp-fade-up-delay-3 relative flex items-center justify-center md:justify-end">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(closest-side, rgba(176,214,67,0.25), transparent 70%)",
              filter: "blur(40px)",
              transform: "translate(10%, 10%)",
            }}
          />
          <div
            className="origin-center md:rotate-3"
            style={{ transform: "translateY(0) rotate(2deg)" }}
          >
            <PhoneMockup scale={0.9} />
          </div>
        </div>
      </div>
    </section>
  );
}

function renderEn(tagline: string) {
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
