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

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;color:#1a1a1a">
        <h2 style="margin:0 0 4px">New website inquiry</h2>
        <p style="color:#666;margin:0 0 20px">Submitted via the nerdstech.co contact form.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
          <tr><td style="font-weight:bold;width:90px">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="font-weight:bold">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="font-weight:bold">Service</td><td>${escapeHtml(service || "—")}</td></tr>
          <tr><td style="font-weight:bold">Budget</td><td>${escapeHtml(budget || "—")}</td></tr>
        </table>
        <h3 style="margin:20px 0 8px">Message</h3>
        <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${escapeHtml(message)}</p>
      </div>`.trim();

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
