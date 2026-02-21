import {
  registerUserService,
  loginUserService
} from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const data = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      ...data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const data = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};