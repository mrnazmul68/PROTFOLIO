import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The request could not be read. Please try again." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const values = parsed.data;

  // Honeypot: reply with a generic success so automated submissions do not learn anything.
  if (values.website && values.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, 4, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error:
          "Too many messages sent from this connection. Please wait a little while or email me directly.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        error:
          "Email delivery isn't configured yet. Please email me directly at " +
          `${siteConfig.email}.`,
        code: "EMAIL_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const safeSubject = values.subject.replace(/[\r\n]+/g, " ").trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: values.email,
      subject: `Portfolio enquiry — ${safeSubject}`,
      text: [
        "New message from the portfolio contact form",
        "",
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Subject: ${safeSubject}`,
        "",
        "Message:",
        values.message,
        "",
        `Sent: ${new Date().toISOString()}`,
        `IP: ${ip}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return NextResponse.json(
        {
          error:
            "The message couldn't be delivered right now. Please try again shortly or email me directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          "The message couldn't be delivered right now. Please try again shortly or email me directly.",
      },
      { status: 500 },
    );
  }
}
