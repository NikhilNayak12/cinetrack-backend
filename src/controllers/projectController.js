import {
  createProjectService,
  getAllProjectsService,
  getMyProjectsService,
  getProjectByIdService
} from "../services/projectService.js";
import asyncHandler from "../utils/asyncHandler.js";

// 🎬 Create film
export const createProject = asyncHandler(async (req, res) => {
  const project = await createProjectService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    project
  });
});

// 📋 Admin/Judge — all films
export const getAllProjects = asyncHandler(async (req, res) => {
  const { projects, total } = await getAllProjectsService(req.query);

  res.status(200).json({
  success: true,
  total,
  count: projects.length,
  projects
});
});

// 👤 Student — my films
export const getMyProjects = asyncHandler(async (req, res) => {
  const projects = await getMyProjectsService(req.user._id);

  res.status(200).json({
    success: true,
    count: projects.length,
    projects
  });
});

// 🔍 Get single film
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await getProjectByIdService(req.params.id);

  res.status(200).json({
    success: true,
    project
  });
});