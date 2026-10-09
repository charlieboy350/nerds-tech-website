import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/contact
 * Receives the contact form and emails the details to the NerdsTech team.
 *
 * Recipients (overridable via env):
 *   TO  = CONTACT_TO  (default: support@nerdstech.co, info@nerdstech.co)
 *   BCC = CONTACT_BCC (default: naeem.ur.rehman.co@gmail.com) — silent copy
 *
 * Required env vars (Vercel → Project Settings → Environment Variables,
 * and locally in .env.local — see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   SMTP_SECURE=true when using port 465, otherwise STARTTLS on 587.
 */

const TO = process.env.CONTACT_TO ?? "support@nerdstech.co, info@nerdstech.co";
const BCC = process.env.CONTACT_BCC ?? "naeem.ur.rehman.co@gmail.com";

// Basic per-IP rate limiting: max 5 submissions per 10 minutes per instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: bots fill this hidden field; humans never see it.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ ok: true }); // pretend success, drop silently
    }

    const name = String(body.name ?? "").trim();
    // Field is named "em" (not "email") so Chrome doesn't recognise it as an email field.
    const email = String(body.em ?? body.email ?? "").trim();
    const service = String(body.service ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ ok: false, error: "Please tell us a little more about your project." }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("Contact API: SMTP env vars are not configured.");
      return NextResponse.json(
        { ok: false, error: "Email service is not configured yet. Please email support@nerdstech.co directly." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true", // true for 465, false for 587 (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New website inquiry from ${name}${service ? ` — ${service}` : ""}`;
    const text = [
      "New contact form submission (nerdstech.co)",
      "",
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Service: ${service || "—"}`,
      `Budget:  ${budget || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const esc = escapeHtml;
    const fieldRow = (label: string, value: string, href?: string) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #241f42;vertical-align:top;width:110px;">
          <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:#8f86b8;">${label.toUpperCase()}</span>
        </td>
        <td style="padding:10px 0 10px 16px;border-bottom:1px solid #241f42;vertical-align:top;">
          <span style="font-family:Arial,sans-serif;font-size:15px;color:#f4f4f8;">${
            href
              ? `<a href="${href}" style="color:#a78bfa;text-decoration:none;">${value}</a>`
              : value
          }</span>
        </td>
      </tr>`;

    const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background-color:#07060e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#07060e;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#141126;border:1px solid #2e2560;border-radius:18px;overflow:hidden;">
          <tr>
            <td style="background-color:#8b5cf6;background-image:linear-gradient(90deg,#22d3ee,#a78bfa);padding:30px 36px;">
              <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:bold;letter-spacing:3px;color:#07060e;">NERDSTECH.CO</div>
              <div style="font-family:Arial,sans-serif;font-size:26px;font-weight:bold;color:#07060e;margin-top:8px;">New project inquiry</div>
              <div style="font-family:Arial,sans-serif;font-size:13px;color:#07060e;opacity:0.75;margin-top:4px;">Someone wants to work with you — reply within 24h.</div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fieldRow("Name", esc(name))}
                ${fieldRow("Email", esc(email), `mailto:${esc(email)}`)}
                ${fieldRow("Service", esc(service || "Not specified"))}
                ${fieldRow("Budget", esc(budget || "Not specified"))}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 8px;">
              <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:#8f86b8;margin-bottom:10px;">MESSAGE</div>
              <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#e8e6f5;background-color:#0c0a17;border-left:3px solid #a78bfa;border-radius:0 12px 12px 0;padding:18px 20px;white-space:pre-wrap;">${esc(message)}</div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 36px 8px;">
              <a href="mailto:${esc(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#07060e;text-decoration:none;background-color:#a78bfa;background-image:linear-gradient(90deg,#22d3ee,#a78bfa);padding:14px 38px;border-radius:999px;">Reply to ${esc(name.split(" ")[0])}</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 36px 30px;">
              <div style="font-family:Arial,sans-serif;font-size:12px;color:#6f659c;">Sent from the contact form at <a href="https://www.nerdstech.co" style="color:#a78bfa;text-decoration:none;">nerdstech.co</a> · <a href="mailto:support@nerdstech.co" style="color:#a78bfa;text-decoration:none;">support@nerdstech.co</a></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

    await transporter.sendMail({
      from: `"NerdsTech Website" <${SMTP_USER}>`,
      to: TO,
      bcc: BCC,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please email support@nerdstech.co directly." },
      { status: 500 }
    );
  }
}
