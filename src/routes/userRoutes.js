import express from "express";
import { getProfile, getUsersByRole } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsersByRole);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/profile", protect, getProfile);

export default router;