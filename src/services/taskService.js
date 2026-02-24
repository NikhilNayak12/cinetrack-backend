import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { getPagination } from "../utils/pagination.js";
import { buildTaskSearchQuery } from "../utils/searchFilter.js";

// 🎯 Create review task (admin only)
export const createTaskService = async (data) => {
  const { title, projectId, assignedTo, deadline } = data;

  // ✅ check project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  // ✅ check judge exists
  const judge = await User.findById(assignedTo);
  if (!judge || judge.role !== "judge") {
    throw new Error("Assigned user must be a judge");
  }

  const task = await Task.create({
    title,
    projectId,
    assignedTo,
    deadline
  });

  return task;
};

// 👨‍⚖️ Judge — my assigned tasks
export const getMyTasksService = async (userId, query) => {
  const { limit, skip } = getPagination(query);
  const filter = buildTaskSearchQuery(query, userId);

  const tasks = await Task.find(filter)
    .populate("projectId", "title genre status")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(filter);

  return { tasks, total };
};

// 🔍 Get single task
export const getTaskByIdService = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("projectId", "title genre")
    .populate("assignedTo", "name email role");

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// ✍️ Judge updates review
export const updateTaskService = async (taskId, userId, data) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  // 🔐 only assigned judge can update
  if (task.assignedTo.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this task");
  }

  const allowedUpdates = ["status", "feedback", "rating"];

  allowedUpdates.forEach((field) => {
    if (data[field] !== undefined) {
      task[field] = data[field];
    }
  });

  await task.save();
  return task;
};