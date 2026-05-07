import Link from "next/link";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/company";
import type { Locale } from "@/i18n/routing";

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-wash-lime-light)]">
      <div className="mx-auto grid max-w-[1080px] gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-semibold tracking-tight">
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
        <nav className="text-sm">
          <Link
            href={`/${locale}/privacy`}
            className="block py-1 text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
          >
            {t("privacy")}
          </Link>
          <Link
            href={`/${locale}/terms`}
            className="block py-1 text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
          >
            {t("terms")}
          </Link>
        </nav>
        <p className="self-end text-xs text-[var(--color-fg-muted)] md:text-right">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
