import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "./user.controller.js";
import { protect } from "../../common/middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// Chain Routing
router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile)

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Testing Router",
  });
});

export default router;
