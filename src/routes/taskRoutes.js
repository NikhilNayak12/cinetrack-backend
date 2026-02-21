import express from "express";
import {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask
} from "../controllers/taskController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  createTaskValidation,
  taskIdValidation,
  updateTaskValidation
} from "../utils/taskValidation.js";

const router = express.Router();

// 🎯 Admin creates review task
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  ...createTaskValidation,
  validateRequest,
  createTask
);

// 👨‍⚖️ Judge — my tasks
router.get(
  "/my",
  protect,
  authorizeRoles("judge"),
  getMyTasks
);

// 🔍 Get single task
router.get(
  "/:id",
  protect,
  taskIdValidation,
  validateRequest,
  getTaskById
);

// ✍️ Judge updates review
router.put(
  "/:id",
  protect,
  authorizeRoles("judge"),
  ...updateTaskValidation,
  validateRequest,
  updateTask
);

export default router;