import { emailTransporter, isEmailConfigured } from "../config/email.js";

const APP_NAME = "CineTrack";
const getFrontendBaseUrl = () =>
  process.env.FRONTEND_BASE_URL || "http://localhost:5173";

export const sendJudgeInviteEmail = async ({ to, inviteLink, expiresAt }) => {
  if (!isEmailConfigured()) {
    throw new Error("Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS.");
  }

  const expiresFormatted = new Date(expiresAt).toLocaleDateString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #6366f1;">${APP_NAME} — Judge Invitation</h2>
      <p>You have been invited to join ${APP_NAME} as a <strong>Judge</strong>.</p>
      <p>Click the link below to create your account and set your password. This link will expire on <strong>${expiresFormatted}</strong>.</p>
      <p style="margin: 24px 0;">
        <a href="${inviteLink}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #6366f1, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Accept invitation</a>
      </p>
      <p style="color: #6b7280; font-size: 14px;">If you did not expect this email, you can ignore it.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #9ca3af; font-size: 12px;">${APP_NAME} — Film Festival Management System</p>
    </div>
  `;

  await emailTransporter.sendMail({
    from: process.env.SMTP_FROM || `"${APP_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: `You're invited to join ${APP_NAME} as a Judge`,
    html
  });
};
