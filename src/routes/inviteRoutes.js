import express from "express";
import {
  createInvite,
  getInviteByToken,
  listInvites
} from "../controllers/inviteController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  createInviteValidation,
  inviteTokenParamValidation
} from "../utils/inviteValidation.js";

const router = express.Router();

// Admin: list all invites (must be before /:token)
router.get("/", protect, authorizeRoles("admin"), listInvites);

// Public: validate invite token (for accept-invite page)
router.get(
  "/:token",
  inviteTokenParamValidation,
  validateRequest,
  getInviteByToken
);

// Admin: create judge invite (sends email)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  ...createInviteValidation,
  validateRequest,
  createInvite
);

export default router;
