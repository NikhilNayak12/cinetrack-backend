import express from "express";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
} from "../controllers/projectController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  createProjectValidation,
  projectIdValidation,
} from "../utils/projectValidation.js";
import { uploadVideo } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// 🎬 Student submit film
/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create film project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created
 */
router.post(
  "/",
  protect,
  authorizeRoles("student", "admin"),
  uploadVideo.single("video"),
  ...createProjectValidation,
  validateRequest,
  createProject
);

// 📋 Admin/Judge view all films
/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", protect, authorizeRoles("admin", "judge"), getAllProjects);

// 👤 Student — my films
/**
 * @swagger
 * /api/projects/my:
 *   get:
 *     summary: Get my projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User projects
 */
router.get("/my", protect, authorizeRoles("student"), getMyProjects);

// 🔍 Get single film
/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get single project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 */
router.get(
  "/:id",
  protect,
  projectIdValidation,
  validateRequest,
  getProjectById,
);

export default router;
