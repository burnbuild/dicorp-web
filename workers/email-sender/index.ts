import { EmailMessage } from "cloudflare:email";

interface Env {
  CONTACT_EMAIL: { send: (msg: EmailMessage) => Promise<void> };
}

interface SendBody {
  from: string;
  raw: string;
}

const FAN_OUT_DESTINATIONS = [
  "paigeshin1991@gmail.com",
  "dicorp0706@gmail.com",
  "manager@burnbuild.app",
] as const;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    try {
      const body = (await request.json()) as SendBody;
      if (!body.from || !body.raw) {
        return Response.json(
          { error: "missing fields: from, raw" },
          { status: 400 },
        );
      }

      const results = await Promise.allSettled(
        FAN_OUT_DESTINATIONS.map((to) =>
          env.CONTACT_EMAIL.send(new EmailMessage(body.from, to, body.raw)),
        ),
      );

      const failed = results
        .map((r, i) =>
          r.status === "rejected"
            ? { to: FAN_OUT_DESTINATIONS[i], reason: String(r.reason) }
            : null,
        )
        .filter((x): x is { to: string; reason: string } => x !== null);

      if (failed.length === FAN_OUT_DESTINATIONS.length) {
        return Response.json(
          { error: "all_destinations_failed", failed },
          { status: 500 },
        );
      }

      return Response.json({
        ok: true,
        delivered: FAN_OUT_DESTINATIONS.length - failed.length,
        failed,
      });
    } catch (err) {
      console.error("email-sender error:", err);
      return Response.json({ error: String(err) }, { status: 500 });
    }
  },
};
