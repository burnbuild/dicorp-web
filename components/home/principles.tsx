import { useTranslations, useMessages } from "next-intl";

type Item = { title: string; body: string };

export function Principles() {
  const t = useTranslations("home.principles");
  const messages = useMessages() as {
    home: { principles: { items: Item[] } };
  };
  const items = messages.home.principles.items;

  return (
    <section className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
        <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("label")}
        </p>
        <h2 className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[28ch] text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
          {t("heading")}
        </h2>

        <div className="mp-fade-up mp-fade-up-delay-2 mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, idx) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-wash-lime-light)] p-7 transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
            >
              <span className="text-xs font-mono text-[var(--color-fg-muted)]">
                0{idx + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.body}
              </p>
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(176,214,67,0.55), transparent 70%)",
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
