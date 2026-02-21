import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  registerValidation,
  loginValidation
} from "../utils/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validateRequest,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validateRequest,
  loginUser
);

export default router;