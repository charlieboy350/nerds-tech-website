import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildInquiryEmail } from "@/lib/inquiry-email";

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

    const inquiry = buildInquiryEmail({ name, email, service, budget, message });

    await transporter.sendMail({
      from: `"NerdsTech Website" <${SMTP_USER}>`,
      to: TO,
      bcc: BCC,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: inquiry.subject,
      text: inquiry.text,
      html: inquiry.html,
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
