import asyncHandler from "../utils/asyncHandler.js";


export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

export const getUsersByRole = asyncHandler(async (req, res) => {
  const { role } = req.query;
  const filter = role ? { role } : {};
  const users = await User.find(filter).select("name email role").sort({ name: 1 });
  res.status(200).json({
    success: true,
    count: users.length,
    users
  });
});