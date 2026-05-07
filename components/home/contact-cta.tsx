import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/company";

export function ContactCta() {
  const t = useTranslations("home.contactCta");
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-fg)] text-white">
      <div
        className="hero-blob"
        style={{
          top: "-6rem",
          right: "-6rem",
          width: "24rem",
          height: "24rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.18), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-8 md:py-32">
        <h2 className="mp-fade-up max-w-[20ch] text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
          {t("title")}
        </h2>
        <p className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[40ch] text-lg text-white/70">
          {t("subline")}
        </p>
        <a
          href={`mailto:${COMPANY.email}`}
          className="cta-glow mp-fade-up mp-fade-up-delay-2 mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"
        >
          {t("button")} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
