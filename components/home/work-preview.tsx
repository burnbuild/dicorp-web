import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

export function WorkPreview({ locale }: { locale: Locale }) {
  const t = useTranslations("home.workPreview");
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime)]">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
        <div className="grid gap-y-10 md:grid-cols-[auto_1fr] md:gap-x-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)] md:pt-2">
            {t("label")}
          </p>

          <div>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
              <h2 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold tracking-tight leading-none">
                {t("title")}
              </h2>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
                {t("status")}
              </span>
            </div>
            <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {t("description")}
            </p>
            <Link
              href={`/${locale}/work`}
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-tight transition hover:text-[var(--color-accent-2)]"
            >
              {t("cta")}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
