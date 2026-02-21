import {
  createTaskService,
  getMyTasksService,
  getTaskByIdService,
  updateTaskService
} from "../services/taskService.js";

// 🎯 Admin creates review task
export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.body);

    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 👨‍⚖️ Judge — my tasks
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await getMyTasksService(req.user._id);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔍 Get single task
export const getTaskById = async (req, res) => {
  try {
    const task = await getTaskByIdService(req.params.id);

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// ✍️ Judge updates review
export const updateTask = async (req, res) => {
  try {
    const task = await updateTaskService(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};