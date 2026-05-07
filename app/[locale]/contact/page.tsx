import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ko: "/ko/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent locale={locale} />;
}

function ContactContent({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, var(--color-wash-lime-light) 0%, #ffffff 100%)",
          }}
        />
        <div
          className="hero-blob -z-10"
          style={{
            top: "-6rem",
            right: "-4rem",
            width: "24rem",
            height: "24rem",
            background:
              "radial-gradient(circle, rgba(176,214,67,0.32), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <p className="mp-fade-up text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("title")}
          </p>
          <h1 className="mp-fade-up mp-fade-up-delay-1 mt-6 max-w-[28ch] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight">
            {t("lede")}
          </h1>
          <p className="mp-fade-up mp-fade-up-delay-2 mt-6 max-w-[50ch] text-lg text-[var(--color-fg-muted)]">
            {t("body")}
          </p>
          <div className="mp-fade-up mp-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#contact-form"
              className="cta-glow inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-2)]"
            >
              {t("form.send")} <span aria-hidden>↓</span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-sm font-medium text-[var(--color-fg-muted)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline"
            >
              {t("emailButton")}
            </a>
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        className="scroll-mt-24 border-t border-[var(--color-border)] bg-white"
      >
        <div className="mx-auto max-w-[860px] px-6 py-24 md:px-8 md:py-32">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("formHeading")}
          </h2>
          <p className="mt-6 max-w-[55ch] text-xl leading-relaxed text-[var(--color-fg)] md:text-2xl">
            {t("formBody")}
          </p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-wash-teal-light)]">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("responseHeading")}
          </h2>
          <p className="mt-8 max-w-[55ch] text-xl leading-relaxed md:text-2xl">
            {t("responseBody")}
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-fg-muted)]">
            {t("studioHeading")}
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-5 md:grid-cols-2">
            <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
              <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                {t("registrationLabel")}
              </dt>
              <dd className="text-base font-medium">
                {COMPANY.registrationNumber}
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
              <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                {t("addressLabel")}
              </dt>
              <dd className="text-base font-medium">
                {locale === "ko" ? COMPANY.address.ko : COMPANY.address.en}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
