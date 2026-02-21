import {
  registerUserService,
  loginUserService
} from "../services/authService.js";
import asyncHandler from "../utils/asyncHandler.js";

// Register
export const registerUser = asyncHandler(async (req, res) => {
  const data = await registerUserService(req.body);

  res.status(201).json({
    success: true,
    ...data
  });
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const data = await loginUserService(req.body);

  res.status(200).json({
    success: true,
    ...data
  });
});