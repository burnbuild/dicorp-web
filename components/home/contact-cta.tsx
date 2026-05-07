import { useTranslations, useMessages } from "next-intl";
import { COMPANY } from "@/lib/company";

type Stat = { value: string; label: string };

export function ContactCta() {
  const t = useTranslations("home.contactCta");
  const messages = useMessages() as {
    home: { contactCta: { stats: Stat[] } };
  };
  const stats = messages.home.contactCta.stats;

  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-fg)] text-white">
      <div
        className="hero-blob"
        style={{
          top: "-6rem",
          right: "-6rem",
          width: "26rem",
          height: "26rem",
          background:
            "radial-gradient(circle, rgba(176,214,67,0.18), transparent 70%)",
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
            "radial-gradient(circle, rgba(105,165,164,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-8 md:py-32">
        {/* left: copy */}
        <div>
          <h2 className="mp-fade-up max-w-[20ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
            {t("title")}
          </h2>
          <p className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[40ch] text-lg text-white/70">
            {t("subline")}
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="cta-glow mp-fade-up mp-fade-up-delay-2 mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"
          >
            {t("button")} <span aria-hidden>→</span>
          </a>
        </div>

        {/* right: stats card */}
        <aside className="mp-fade-up mp-fade-up-delay-3 self-stretch">
          <div className="flex h-full flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              {COMPANY.email}
            </p>
            <dl className="flex flex-col gap-7">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-1 ${
                    i > 0 ? "border-t border-white/10 pt-7" : ""
                  }`}
                >
                  <dt className="text-xs uppercase tracking-wider text-white/40">
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
