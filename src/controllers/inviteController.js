import asyncHandler from "../utils/asyncHandler.js";
import {
  createInviteService,
  getInviteByTokenService,
  listInvitesService
} from "../services/inviteService.js";

export const createInvite = asyncHandler(async (req, res) => {
  const invite = await createInviteService(req.body.email, req.user._id);
  res.status(201).json({
    success: true,
    message: "Invitation sent successfully",
    invite: {
      id: invite._id,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt
    }
  });
});

export const getInviteByToken = asyncHandler(async (req, res) => {
  const invite = await getInviteByTokenService(req.params.token);
  res.status(200).json({
    success: true,
    invite: {
      email: invite.email,
      role: invite.role
    }
  });
});

export const listInvites = asyncHandler(async (req, res) => {
  const invites = await listInvitesService(req.query);
  res.status(200).json({
    success: true,
    count: invites.length,
    invites
  });
});
