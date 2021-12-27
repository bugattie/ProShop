import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

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
