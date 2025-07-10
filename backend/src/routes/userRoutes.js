import express from "express";
import User from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/user/me
router.get("/me", protect, async (req, res) => {
  try {
    // req.user is just the ID, so fetch full user
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in /me route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
