import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

export function WorkPreview({ locale }: { locale: Locale }) {
  const t = useTranslations("home.workPreview");
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
      <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-8 md:py-32">
        <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("label")}
        </p>
        <article className="mp-fade-up mp-fade-up-delay-1 mt-10 grid gap-8 rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] md:grid-cols-[2fr_3fr] md:gap-14 md:p-14">
          <header>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t("title")}
            </h2>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
              {t("status")}
            </span>
          </header>
          <p className="text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {t("description")}
          </p>
        </article>
        <Link
          href={`/${locale}/work`}
          className="mp-fade-up mp-fade-up-delay-2 mt-10 inline-block text-sm font-medium transition hover:text-[var(--color-accent-2)]"
        >
          {t("cta")} →
        </Link>
      </div>
    </section>
  );
}
