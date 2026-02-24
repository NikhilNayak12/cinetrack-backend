import express from "express";
import {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  createTaskValidation,
  taskIdValidation,
  updateTaskValidation,
} from "../utils/taskValidation.js";

const router = express.Router();

// 🎯 Admin creates review task
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create review task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  ...createTaskValidation,
  validateRequest,
  createTask,
);

// 👨‍⚖️ Judge — my tasks
/**
 * @swagger
 * /api/tasks/my:
 *   get:
 *     summary: Get my assigned tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/my", protect, authorizeRoles("judge"), getMyTasks);

// 🔍 Get single task
/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get single task by ID
 *     tags: [Tasks]
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
 *         description: Task details
 */
router.get("/:id", protect, taskIdValidation, validateRequest, getTaskById);

// ✍️ Judge updates review
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task review
 *     tags: [Tasks]
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
 *         description: Task updated
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("judge"),
  ...updateTaskValidation,
  validateRequest,
  updateTask,
);

export default router;
