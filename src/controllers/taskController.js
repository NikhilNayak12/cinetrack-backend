import {
  createTaskService,
  getMyTasksService,
  getTaskByIdService,
  updateTaskService
} from "../services/taskService.js";
import asyncHandler from "../utils/asyncHandler.js";

// Admin creates review task
export const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskService(req.body);

  res.status(201).json({
    success: true,
    task
  });
});

// Judge — my tasks
export const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await getMyTasksService(req.user._id);

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks
  });
});

// Get single task
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await getTaskByIdService(req.params.id);

  res.status(200).json({
    success: true,
    task
  });
});

// Judge updates review
export const updateTask = asyncHandler(async (req, res) => {
  const task = await updateTaskService(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json({
    success: true,
    task
  });
});