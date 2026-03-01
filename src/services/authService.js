import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { getInviteByTokenService, markInviteUsedService } from "../services/inviteService.js";

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const registerFromInviteService = async ({ token, name, password }) => {
  const invite = await getInviteByTokenService(token);

  const existingUser = await User.findOne({ email: invite.email });
  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const user = await User.create({
    name: name.trim(),
    email: invite.email,
    password,
    role: invite.role
  });

  await markInviteUsedService(invite._id);

  const jwt = generateToken(user._id);
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token: jwt
  };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};