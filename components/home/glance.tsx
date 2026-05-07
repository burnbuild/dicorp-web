import { useTranslations, useMessages } from "next-intl";

type Item = { value: string; label: string };

export function Glance() {
  const t = useTranslations("home.glance");
  const messages = useMessages() as { home: { glance: { items: Item[] } } };
  const items = messages.home.glance.items;

  return (
    <section className="border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-8 md:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
          {t("label")}
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-x-12">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                {item.label}
              </dt>
              <dd className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-none tracking-tight">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
