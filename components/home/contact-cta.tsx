import Link from "next/link";
import { useTranslations, useMessages, useLocale } from "next-intl";
import { COMPANY } from "@/lib/company";

type Stat = { value: string; label: string };

export function ContactCta() {
  const t = useTranslations("home.contactCta");
  const locale = useLocale();
  const messages = useMessages() as {
    home: { contactCta: { stats: Stat[] } };
  };
  const stats = messages.home.contactCta.stats;

  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-wash-lime-light)]">
      <div
        className="hero-blob"
        style={{
          top: "-6rem",
          right: "-6rem",
          width: "26rem",
          height: "26rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.45), transparent 70%)",
        }}
      />
      <div
        className="hero-blob"
        style={{
          bottom: "-8rem",
          left: "30%",
          width: "20rem",
          height: "20rem",
          background:
            "radial-gradient(circle, rgba(105,165,164,0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-8 md:py-32">
        {/* left: copy */}
        <div>
          <h2 className="mp-fade-up max-w-[20ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
            {t("title")}
          </h2>
          <p className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[40ch] text-lg text-[var(--color-fg-muted)]">
            {t("subline")}
          </p>
          <Link
            href={`/${locale}/contact#contact-form`}
            className="cta-glow mp-fade-up mp-fade-up-delay-2 mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"
          >
            {t("button")} <span aria-hidden>→</span>
          </Link>
        </div>

        {/* right: stats card */}
        <aside className="mp-fade-up mp-fade-up-delay-3 self-stretch">
          <div className="flex h-full flex-col gap-8 rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
              {COMPANY.email}
            </p>
            <dl className="flex flex-col gap-7">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-1 ${
                    i > 0 ? "border-t border-[var(--color-border)] pt-7" : ""
                  }`}
                >
                  <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-none tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
