import Link from "next/link";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import type { Locale } from "@/i18n/routing";

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[var(--color-border)] bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-6 md:px-8">
        <Link
          href={`/${locale}`}
          aria-label="Home"
          className="inline-flex items-center"
        >
          {/* mobile: logo only · desktop: logo + wordmark */}
          <span className="md:hidden">
            <Logo size={32} withWordmark={false} locale={locale} />
          </span>
          <span className="hidden md:inline-flex">
            <Logo size={32} withWordmark locale={locale} />
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm md:gap-6">
          <Link
            href={`/${locale}/about`}
            className="rounded px-1 py-1 transition hover:text-[var(--color-accent-2)]"
          >
            {t("about")}
          </Link>
          <Link
            href={`/${locale}/work`}
            className="rounded px-1 py-1 transition hover:text-[var(--color-accent-2)]"
          >
            {t("work")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded px-1 py-1 transition hover:text-[var(--color-accent-2)]"
          >
            {t("contact")}
          </Link>
          <span className="ml-1 border-l border-[var(--color-border)] pl-3 md:ml-2 md:pl-4">
            <LanguageToggle currentLocale={locale} />
          </span>
        </nav>
      </div>
    </header>
  );
}
