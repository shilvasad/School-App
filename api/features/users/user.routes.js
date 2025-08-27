import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
} from "./user.controller.js";
import { authorize, protect } from "../../common/middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// Chain Routing
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin  only routes
router.get("/", protect, authorize("admin"), getUsers);
router.delete("/:id", protect, authorize("admin"), deleteUser);
router.put("/:id", protect, authorize("admin"), updateUser);

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({
    message: "User Endpoint: Router Testing",
  });
});

export default router;
