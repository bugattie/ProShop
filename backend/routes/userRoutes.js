import express from "express";

import { authUser, signup, protect } from "../controllers/authController.js";

import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/signup", signup);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
