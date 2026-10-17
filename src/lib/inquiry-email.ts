/**
 * Beautiful branded HTML email for contact-form inquiries.
 * Pure function — no dependencies, safe to unit-test and preview.
 *
 * Renders a light, premium layout (white card on soft gray) because
 * light templates survive Gmail/Outlook dark-mode quirks far better
 * than dark ones. All styling is inline + table-based for maximum
 * email-client compatibility.
 */

export interface InquiryData {
  name: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface InquiryEmail {
  subject: string;
  text: string;
  html: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT = `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`;

export function buildInquiryEmail(data: InquiryData): InquiryEmail {
  const name = data.name.trim();
  const email = data.email.trim();
  const service = (data.service ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const message = data.message.trim();
  const firstName = name.split(/\s+/)[0] ?? name;

  const receivedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const subject = `New inquiry from ${name}${service ? `, ${service}` : ""}`;

  const text = [
    "New contact form inquiry (nerdstech.co)",
    `Received: ${receivedAt} (PKT)`,
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Service: ${service || "Not specified"}`,
    `Budget:  ${budget || "Not specified"}`,
    "",
    "Message:",
    message,
    "",
    `Reply: mailto:${email}`,
  ].join("\n");

  const esc = escapeHtml;

  const detailRow = (label: string, valueHtml: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #edf0f7;vertical-align:top;width:120px;">
        <span style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.6px;color:#8a94ad;">${label}</span>
      </td>
      <td style="padding:12px 0 12px 18px;border-bottom:1px solid #edf0f7;vertical-align:top;">
        ${valueHtml}
      </td>
    </tr>`;

  const value = (v: string) =>
    `<span style="font-family:${FONT};font-size:15px;color:#1a1d29;">${esc(v)}</span>`;

  const pill = (v: string) =>
    `<span style="display:inline-block;font-family:${FONT};font-size:13px;font-weight:600;color:#6d28d9;background-color:#f1ebfd;border:1px solid #ddd0fa;padding:5px 14px;border-radius:999px;">${esc(v)}</span>`;

  const mailto = `mailto:${esc(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#eef0f7;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New project inquiry from ${esc(name)}${service ? ` about ${esc(service)}` : ""}, reply within 24 hours.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef0f7;padding:36px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e2e6f1;border-radius:18px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:30px 36px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family:${FONT};font-size:15px;font-weight:800;letter-spacing:4px;color:#14121f;">NERDSTECH</div>
                    <div style="font-family:${FONT};font-size:11px;letter-spacing:2.4px;color:#8a94ad;margin-top:5px;">AI &middot; DESIGN &middot; DEVELOPMENT STUDIO</div>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <span style="display:inline-block;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.4px;color:#ffffff;background-color:#8b5cf6;padding:7px 14px;border-radius:999px;">NEW INQUIRY</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Aurora divider -->
          <tr>
            <td style="padding:0 36px;">
              <div style="height:4px;border-radius:999px;background-color:#8b5cf6;background-image:linear-gradient(90deg,#22d3ee,#8b5cf6,#d946ef);">&nbsp;</div>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding:26px 36px 6px;">
              <div style="font-family:${FONT};font-size:26px;font-weight:800;color:#14121f;line-height:1.25;">You&rsquo;ve got a new project inquiry</div>
              <div style="font-family:${FONT};font-size:13.5px;color:#8a94ad;margin-top:8px;">From <strong style="color:#4b5568;">${esc(name)}</strong> &middot; received ${esc(receivedAt)} (PKT)</div>
            </td>
          </tr>
          <!-- Details -->
          <tr>
            <td style="padding:14px 36px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow("NAME", value(name))}
                ${detailRow(
                  "EMAIL",
                  `<a href="mailto:${esc(email)}" style="font-family:${FONT};font-size:15px;font-weight:600;color:#7c3aed;text-decoration:none;">${esc(email)}</a>`
                )}
                ${detailRow("SERVICE", service ? pill(service) : value("Not specified"))}
                ${detailRow("BUDGET", budget ? pill(budget) : value("Not specified"))}
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:22px 36px 6px;">
              <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.6px;color:#8a94ad;margin-bottom:10px;">PROJECT DETAILS</div>
              <div style="font-family:${FONT};font-size:15px;line-height:1.75;color:#2b2f42;background-color:#f8f9fd;border:1px solid #e6eaf5;border-left:4px solid #8b5cf6;border-radius:0 12px 12px 0;padding:18px 20px;white-space:pre-wrap;word-break:break-word;">${esc(message)}</div>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td align="center" style="padding:26px 36px 10px;">
              <a href="${mailto}" style="display:inline-block;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;background-color:#8b5cf6;padding:15px 44px;border-radius:999px;">Reply to ${esc(firstName)} &rarr;</a>
              <div style="font-family:${FONT};font-size:12.5px;color:#9aa3bb;margin-top:12px;">We promise replies within 24 hours &mdash; usually much faster.</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px 36px 30px;border-top:1px solid #edf0f7;">
              <div style="font-family:${FONT};font-size:12px;color:#9aa3bb;">Sent from the contact form at <a href="https://www.nerdstech.co" style="color:#7c3aed;text-decoration:none;font-weight:600;">nerdstech.co</a></div>
              <div style="font-family:${FONT};font-size:12px;color:#9aa3bb;margin-top:6px;">Questions? <a href="mailto:support@nerdstech.co" style="color:#7c3aed;text-decoration:none;">support@nerdstech.co</a></div>
            </td>
          </tr>
        </table>
        <div style="font-family:${FONT};font-size:11px;color:#aab2c7;margin-top:16px;">&copy; ${new Date().getFullYear()} NerdsTech. All rights reserved.</div>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return { subject, text, html };
}
