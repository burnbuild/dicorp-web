import Link from "next/link";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/company";
import type { Locale } from "@/i18n/routing";

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-fg)] text-white">
      <div
        className="hero-blob"
        style={{
          top: "-8rem",
          right: "-8rem",
          width: "30rem",
          height: "30rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-6 pt-20 pb-10 md:px-8">
        <p className="max-w-[40ch] text-base leading-relaxed text-white/85">
          {t("tagline")}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* studio facts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {t("studioHeading")}
            </h3>
            <p className="mt-5 font-semibold tracking-tight">
              {locale === "ko" ? COMPANY.name.ko : COMPANY.name.en}
            </p>
            <dl className="mt-5 space-y-2 text-xs text-white/55">
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-white/85">
                  {t("businessNumberLabel")}
                </dt>
                <dd>{COMPANY.registrationNumber}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-white/85">
                  {t("foundedLabel")}
                </dt>
                <dd>{COMPANY.foundedAt}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-white/85">
                  {t("addressLabel")}
                </dt>
                <dd className="max-w-[44ch]">
                  {locale === "ko" ? COMPANY.address.ko : COMPANY.address.en}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <dt className="min-w-[7rem] font-medium text-white/85">
                  {t("emailLabel")}
                </dt>
                <dd>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="transition hover:text-[var(--color-accent)] hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* site nav */}
          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {t("navHeading")}
            </h3>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-white/65 transition hover:text-white"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/work`}
                  className="text-white/65 transition hover:text-white"
                >
                  {tNav("work")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-white/65 transition hover:text-white"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* legal */}
          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Legal
            </h3>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-white/65 transition hover:text-white"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-white/65 transition hover:text-white"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center">
          <p>{t("copyright", { year })}</p>
          <a
            href={COMPANY.url}
            className="transition hover:text-white"
          >
            {COMPANY.domain}
          </a>
        </div>
      </div>
    </footer>
  );
}
