import Invite, { generateInviteToken } from "../models/Invite.js";
import User from "../models/User.js";
import { sendJudgeInviteEmail } from "./emailService.js";

const INVITE_EXPIRY_DAYS = 7;

export const createInviteService = async (email, invitedByUserId) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const existingInvite = await Invite.findOne({
    email: normalizedEmail,
    used: false,
    expiresAt: { $gt: new Date() }
  });
  if (existingInvite) {
    throw new Error("An active invite already exists for this email");
  }

  const token = generateInviteToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRY_DAYS);

  const invite = await Invite.create({
    email: normalizedEmail,
    token,
    role: "judge",
    expiresAt,
    invitedBy: invitedByUserId
  });

  const frontendBase = process.env.FRONTEND_BASE_URL || "http://localhost:5173";
  const inviteLink = `${frontendBase}/invite/${token}`;

  await sendJudgeInviteEmail({
    to: normalizedEmail,
    inviteLink,
    expiresAt: invite.expiresAt
  });

  return invite;
};

export const getInviteByTokenService = async (token) => {
  const invite = await Invite.findOne({ token }).populate("invitedBy", "name email");

  if (!invite) {
    throw new Error("Invite not found");
  }
  if (invite.used) {
    throw new Error("This invite has already been used");
  }
  if (new Date() > invite.expiresAt) {
    throw new Error("This invite has expired");
  }

  return invite;
};

export const markInviteUsedService = async (inviteId) => {
  const invite = await Invite.findByIdAndUpdate(
    inviteId,
    { used: true },
    { new: true }
  );
  if (!invite) throw new Error("Invite not found");
  return invite;
};

export const listInvitesService = async (query) => {
  const filter = {};
  if (query.used !== undefined) {
    filter.used = query.used === "true";
  }
  const invites = await Invite.find(filter)
    .populate("invitedBy", "name email")
    .sort({ createdAt: -1 });
  return invites;
};
