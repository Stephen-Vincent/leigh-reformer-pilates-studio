import type { IncomingMessage, ServerResponse } from "node:http";
import { Resend } from "resend";

interface VercelRequest extends IncomingMessage {
  body?: Record<string, unknown>;
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
}

const TO_EMAIL = "stevevincent17@yahoo.co.uk";

/* ── Spam-protection helpers ─────────────────────────────────── */

function isSpam(body: Record<string, unknown>): boolean {
  // 1. Honeypot — bots auto-fill hidden fields
  if (body._honeypot) return true;

  // 2. Timestamp — reject submissions faster than 3 seconds
  const ts = Number(body._timestamp);
  if (!ts || Date.now() - ts < 3_000) return true;

  // 3. Reject if message contains an unreasonable number of URLs
  const urlCount = (String(body.message).match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) return true;

  return false;
}

/* ── Branded HTML email template ─────────────────────────────── */

function buildEmail(
  fields: { name: string; email: string; subject: string; message: string },
  siteUrl: string,
) {
  const logoUrl = `${siteUrl}/LRPSLogoDark.png`;
  const escapedMessage = fields.message.replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#ece7df;font-family:'Roboto',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ece7df;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">

          <!-- Logo + branding -->
          <tr>
            <td align="center" style="padding:40px 40px 16px;">
              <img src="${logoUrl}" alt="Leigh Reformer Pilates Studio" width="72" style="display:block;height:auto;">
              <p style="font-family:'Nunito Sans',sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#000000;margin:20px 0 4px;font-weight:700;">
                Leigh Reformer Pilates Studio
              </p>
              <p style="font-family:'Roboto',Arial,sans-serif;font-size:11px;color:#6b6b6b;margin:0;">
                Move better. Feel stronger. Build confidence.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e0dbd3;margin:0;">
            </td>
          </tr>

          <!-- Intro line -->
          <tr>
            <td style="padding:28px 40px 20px;text-align:center;">
              <p style="font-family:'Roboto',Arial,sans-serif;font-size:14px;color:#6b6b6b;margin:0;line-height:1.6;">
                A new message has been submitted from<br>
                <strong style="color:#000000;">leighreformerpilatesstudio.com</strong>
              </p>
            </td>
          </tr>

          <!-- Message details card -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f2ec;border-radius:12px;">
                <tr>
                  <td style="padding:28px;">
                    <!-- Name -->
                    <p style="margin:0 0 20px;font-size:13px;line-height:1.5;">
                      <strong style="color:#000;font-family:'Nunito Sans',sans-serif;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;">Name</strong><br>
                      <span style="color:#333;">${fields.name}</span>
                    </p>
                    <!-- Email -->
                    <p style="margin:0 0 20px;font-size:13px;line-height:1.5;">
                      <strong style="color:#000;font-family:'Nunito Sans',sans-serif;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;">Email</strong><br>
                      <a href="mailto:${fields.email}" style="color:#000;text-decoration:underline;">${fields.email}</a>
                    </p>
                    <!-- Subject -->
                    <p style="margin:0 0 20px;font-size:13px;line-height:1.5;">
                      <strong style="color:#000;font-family:'Nunito Sans',sans-serif;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;">Subject</strong><br>
                      <span style="color:#333;">${fields.subject}</span>
                    </p>
                    <!-- Message -->
                    <p style="margin:0;font-size:13px;line-height:1.7;">
                      <strong style="color:#000;font-family:'Nunito Sans',sans-serif;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;">Message</strong><br>
                      <span style="color:#333;">${escapedMessage}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="font-family:'Roboto',Arial,sans-serif;font-size:11px;color:#999;margin:0;">
                This email was sent automatically. Please do not reply to this address.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Handler ──────────────────────────────────────────────────── */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for the deployed frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY environment variable is not set");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const body = req.body ?? {};

  // Silent success for bots (they think it worked)
  if (isSpam(body)) {
    return res.status(200).json({ success: true });
  }

  const { name, email, subject, message } = body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Simple email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // Derive site URL from request for the logo
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host =
    req.headers["x-forwarded-host"] ||
    req.headers.host ||
    "leighreformerpilatesstudio.com";
  const siteUrl = `${proto}://${host}`;

  try {
    // Initialise Resend here so a missing key doesn't crash at module load
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Leigh Reformer Pilates Studio <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: String(email),
      subject: `New message: ${subject}`,
      html: buildEmail(
        { name: String(name), email: String(email), subject: String(subject), message: String(message) },
        siteUrl,
      ),
    });

    if (error) {
      console.error("Resend API error:", JSON.stringify(error));
      return res.status(500).json({ error: "Failed to send email. Please try again." });
    }

    console.log("Email sent successfully:", data);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
