import express from "express";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById
} from "../controllers/projectController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  createProjectValidation,
  projectIdValidation
} from "../utils/projectValidation.js";

const router = express.Router();

// 🎬 Student submit film
router.post(
  "/",
  protect,
  authorizeRoles("student", "admin"),
  ...createProjectValidation,
  validateRequest,
  createProject
);

// 📋 Admin/Judge view all films
router.get(
  "/",
  protect,
  authorizeRoles("admin", "judge"),
  getAllProjects
);

// 👤 Student — my films
router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMyProjects
);

// 🔍 Get single film
router.get(
  "/:id",
  protect,
  projectIdValidation,
  validateRequest,
  getProjectById
);

export default router;