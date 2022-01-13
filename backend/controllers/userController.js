import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import { createAndSendToken } from "./authController.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("No user found with that ID");
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("No user found with that ID");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  createAndSendToken(updatedUser, res);
});
