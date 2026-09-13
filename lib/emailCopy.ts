import type { GrievancePayload } from "./validation";

export function buildNotificationSubject(payload: GrievancePayload): string {
  return `🌀 Someone Needs Vayuvega's Help — ${payload.name} (${payload.location})`;
}

export function buildNotificationEmail(payload: GrievancePayload): { text: string; html: string } {
  const reportedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const text = [
    "A new grievance was submitted through the Vayuvega help portal.",
    "",
    `Name: ${payload.name}`,
    `Age: ${payload.age}`,
    `Location: ${payload.location}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
    "",
    `Reported at: ${reportedAt} (IST)`,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #171717; line-height: 1.6;">
      <h2 style="color:#0a0a17;">🌀 Someone Needs Vayuvega's Help</h2>
      <table cellpadding="4" cellspacing="0">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(payload.name)}</td></tr>
        <tr><td><strong>Age</strong></td><td>${escapeHtml(payload.age)}</td></tr>
        <tr><td><strong>Location</strong></td><td>${escapeHtml(payload.location)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
      </table>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background:#f4f4f5; padding:12px; border-radius:8px;">${escapeHtml(payload.message)}</p>
      <p style="color:#71717a; font-size: 13px;">Reported at: ${reportedAt} (IST)</p>
    </div>
  `;

  return { text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
