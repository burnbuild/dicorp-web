import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
};

function b64utf8(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function encodeHeader(s: string): string {
  return /[^\x20-\x7E]/.test(s) ? `=?UTF-8?B?${b64utf8(s)}?=` : s;
}

function sanitizeHeader(s: string): string {
  return s.replace(/[\r\n]/g, " ");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();
    const locale = (body.locale ?? "unknown").trim();

    if (!name || !email || !message) {
      return Response.json({ error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "invalid_email" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return Response.json({ error: "too_long" }, { status: 400 });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[dev] contact form (mock send):", {
        name,
        email,
        message,
        locale,
      });
      return Response.json({ ok: true, dev: true });
    }

    const { env } = getCloudflareContext();
    const senderBinding = (env as unknown as {
      EMAIL_SENDER?: { fetch: (request: Request) => Promise<Response> };
    }).EMAIL_SENDER;
    if (!senderBinding) {
      console.error("EMAIL_SENDER binding missing");
      return Response.json({ error: "binding_missing" }, { status: 500 });
    }

    const fromAddress = "manager@dicorporations.com";

    const subject = encodeHeader(`Contact form - ${sanitizeHeader(name)}`);
    const bodyLines = [
      `Reply to: ${name} <${email}>`,
      `Locale: ${locale}`,
      ``,
      `Message:`,
      message,
      ``,
      `Sent from dicorporations.com contact form`,
    ];
    const bodyText = bodyLines.join("\r\n") + "\r\n";

    const messageId = `<${crypto.randomUUID()}@dicorporations.com>`;
    const date = new Date().toUTCString();

    const fromDisplay = sanitizeHeader(`${name} (${email})`).replace(
      /["<>]/g,
      "",
    );

    const raw = [
      `From: ${encodeHeader(fromDisplay)} <${fromAddress}>`,
      `To: Di Corporations Team <${fromAddress}>`,
      `Reply-To: ${encodeHeader(name)} <${sanitizeHeader(email)}>`,
      `Subject: ${subject}`,
      `Date: ${date}`,
      `Message-ID: ${messageId}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 8bit`,
      ``,
      bodyText,
    ].join("\r\n");

    const sendRes = await senderBinding.fetch(
      new Request("https://email-sender.internal/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromAddress,
          raw,
        }),
      }),
    );

    if (!sendRes.ok) {
      const detail = await sendRes.text();
      console.error("EMAIL_SENDER returned error:", sendRes.status, detail);
      return Response.json(
        { error: "send_failed", detail },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { error: "send_failed", detail: String(err) },
      { status: 500 },
    );
  }
}
