import { useTranslations, useMessages } from "next-intl";

type Item = { title: string; body: string };

export function AntiPatterns() {
  const t = useTranslations("home.antiPatterns");
  const messages = useMessages() as {
    home: { antiPatterns: { items: Item[] } };
  };
  const items = messages.home.antiPatterns.items;

  return (
    <section className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("label")}
        </p>
        <h2 className="mt-6 max-w-[28ch] text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
          {t("heading")}
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map((item, i) => (
            <article
              key={item.title}
              className="group flex gap-6 border-t border-[var(--color-border)] pt-7"
            >
              <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                0{i + 1}
              </span>
              <div className="flex-1">
                <h3 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                  <span aria-hidden className="text-[var(--color-accent)]">
                    ✕
                  </span>
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-[var(--color-fg-muted)]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
