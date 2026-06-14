"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      // FormSubmit delivers straight to the inbox — no account/key/DNS.
      const res = await fetch("https://formsubmit.co/ajax/manager@dicorporations.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          locale,
          _subject: `Contact form - ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: unknown };
      if (res.ok && (data.success === true || data.success === "true")) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 md:p-10">
        <h3 className="text-xl font-semibold tracking-tight">
          {t("successTitle")}
        </h3>
        <p className="mt-3 max-w-[50ch] text-base text-[var(--color-fg-muted)]">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium underline underline-offset-4 hover:text-[var(--color-accent-2)]"
        >
          {t("sendAnother")} <span aria-hidden>→</span>
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  const inputCls =
    "rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-fg)] outline-none transition placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-fg)] disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
            {t("nameLabel")}
          </span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={sending}
            maxLength={100}
            placeholder={t("namePlaceholder")}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
            {t("emailLabel")}
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
            maxLength={200}
            placeholder={t("emailPlaceholder")}
            className={inputCls}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
          {t("messageLabel")}
        </span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sending}
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          className={`${inputCls} min-h-[160px] resize-y`}
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={sending}
          className="cta-glow inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-2)] disabled:opacity-60"
        >
          {sending ? t("sending") : t("send")}
          {!sending && <span aria-hidden>→</span>}
        </button>
        {status === "error" && (
          <span className="text-sm text-[#b91c1c]">{t("errorBody")}</span>
        )}
      </div>
    </form>
  );
}
