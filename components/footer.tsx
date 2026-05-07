import Link from "next/link";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/company";
import type { Locale } from "@/i18n/routing";

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-wash-lime-light)]">
      <div className="mx-auto max-w-[1080px] px-6 pt-16 pb-10 md:px-8">
        <p className="max-w-[40ch] text-base leading-relaxed text-[var(--color-fg)]">
          {t("tagline")}
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* studio facts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              {t("studioHeading")}
            </h3>
            <p className="mt-4 font-semibold tracking-tight">
              {locale === "ko" ? COMPANY.name.ko : COMPANY.name.en}
            </p>
            <dl className="mt-4 space-y-2 text-xs text-[var(--color-fg-muted)]">
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-[var(--color-fg)]">
                  {t("businessNumberLabel")}
                </dt>
                <dd>{COMPANY.registrationNumber}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-[var(--color-fg)]">
                  {t("foundedLabel")}
                </dt>
                <dd>{COMPANY.foundedAt}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-[var(--color-fg)]">
                  {t("addressLabel")}
                </dt>
                <dd className="max-w-[44ch]">
                  {locale === "ko" ? COMPANY.address.ko : COMPANY.address.en}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-[var(--color-fg)]">
                  {t("emailLabel")}
                </dt>
                <dd>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="transition hover:text-[var(--color-fg)] hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* site nav */}
          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              {t("navHeading")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/work`}
                  className="text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {tNav("work")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* legal */}
          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-fg-muted)] md:flex-row md:items-center">
          <p>{t("copyright", { year })}</p>
          <a
            href={COMPANY.url}
            className="transition hover:text-[var(--color-fg)]"
          >
            {COMPANY.domain}
          </a>
        </div>
      </div>
    </footer>
  );
}
