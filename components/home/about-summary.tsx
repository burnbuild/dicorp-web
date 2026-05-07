import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

export function AboutSummary({ locale }: { locale: Locale }) {
  const t = useTranslations("home.aboutSummary");
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
      <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-8 md:py-32">
        <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("label")}
        </p>
        <p className="mp-fade-up mp-fade-up-delay-1 mt-8 max-w-[60ch] text-2xl font-medium leading-snug tracking-tight md:text-[2rem] md:leading-[1.25]">
          {t("body")}
        </p>
        <Link
          href={`/${locale}/about`}
          className="mp-fade-up mp-fade-up-delay-2 mt-10 inline-block border-b border-[var(--color-fg)] pb-0.5 text-sm font-medium transition hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)]"
        >
          {t("cta")} →
        </Link>
      </div>
    </section>
  );
}
