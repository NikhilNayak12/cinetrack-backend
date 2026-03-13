import { body, param } from "express-validator";

export const createInviteValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail()
];

export const inviteTokenParamValidation = [
  param("token").notEmpty().withMessage("Invite token is required")
];
