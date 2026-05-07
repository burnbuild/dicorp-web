"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageToggle({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|ko)/, "") || "/";

  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider">
      {routing.locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-2">
          {i > 0 ? <span className="text-[var(--color-border)]">/</span> : null}
          {l === currentLocale ? (
            <span className="font-semibold">{l}</span>
          ) : (
            <Link
              href={`/${l}${stripped}`}
              className="text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
            >
              {l}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
