import { useTranslations } from "next-intl";

export function Manifesto() {
  const t = useTranslations("home.manifesto");
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-fg)] text-white">
      <div
        className="hero-blob"
        style={{
          top: "-8rem",
          right: "-8rem",
          width: "32rem",
          height: "32rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.18), transparent 70%)",
        }}
      />
      <div
        className="hero-blob"
        style={{
          bottom: "-6rem",
          left: "-6rem",
          width: "24rem",
          height: "24rem",
          background:
            "radial-gradient(circle, rgba(105,165,164,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 py-28 md:px-8 md:py-40">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          {t("label")}
        </p>
        <h2 className="mt-8 max-w-[26ch] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight">
          {t("headingLeft")}{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #b0d643 0%, #69a5a4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("headingHighlight")}
          </span>{" "}
          <span className="text-white/85">{t("headingRight")}</span>
        </h2>
        <p className="mt-12 max-w-[68ch] text-lg leading-[1.7] text-white/70 md:text-xl md:leading-[1.65]">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
