import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateGrievance, type GrievancePayload } from "@/lib/validation";
import { buildNotificationEmail, buildNotificationSubject } from "@/lib/emailCopy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Partial<GrievancePayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validateGrievance(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const payload = body as GrievancePayload;

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const notifyTo = process.env.NOTIFY_TO_EMAIL;

  if (!gmailUser || !gmailAppPassword || !notifyTo) {
    console.error("notify: missing required email environment variables");
    return NextResponse.json({ ok: false, error: "Server is not configured to send notifications." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  const { text, html } = buildNotificationEmail(payload);

  try {
    await transporter.sendMail({
      from: `"Vayuvega Help Portal" <${gmailUser}>`,
      to: notifyTo,
      replyTo: payload.email,
      subject: buildNotificationSubject(payload),
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("notify: send failed:", message);
    return NextResponse.json({ ok: false, error: "Failed to send notification." }, { status: 500 });
  }
}
