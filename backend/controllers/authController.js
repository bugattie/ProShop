import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import User from "../models/userModel.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("Please provide email or password!");
  }

  const user = await User.findOne({ email });

  if (!user || (await user.matchPassword(password, user.password))) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  createAndSendToken(user, res);
});

export const signup = asyncHandler(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createAndSendToken(newUser, res);
});

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("You are not logged in! Please login to get access");
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401);
    throw new Error("The user belonging to this token does no longer exists.");
  }

  req.user = currentUser;

  next();
});
