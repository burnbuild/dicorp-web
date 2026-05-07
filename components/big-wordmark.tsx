import { useTranslations } from "next-intl";

export function BigWordmark() {
  const t = useTranslations("footer.wordmark");
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("subline")}
        </p>
        <div className="mt-8 leading-[0.85]">
          <p
            className="font-bold tracking-[-0.04em]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
          >
            {t("primary")}
          </p>
          <p
            className="font-bold tracking-[-0.04em]"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              background:
                "linear-gradient(135deg, var(--color-accent-2), var(--color-accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("secondary")}
          </p>
        </div>
      </div>
    </section>
  );
}
