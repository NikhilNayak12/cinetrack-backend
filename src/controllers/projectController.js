import {
  createProjectService,
  getAllProjectsService,
  getMyProjectsService,
  getProjectByIdService
} from "../services/projectService.js";

// 🎬 Create film submission
export const createProject = async (req, res) => {
  try {
    const project = await createProjectService(req.body, req.user._id);

    res.status(201).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 📋 Admin/Judge — get all films
export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsService();

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 👤 Student — get my submissions
export const getMyProjects = async (req, res) => {
  try {
    const projects = await getMyProjectsService(req.user._id);

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔍 Get single film
export const getProjectById = async (req, res) => {
  try {
    const project = await getProjectByIdService(req.params.id);

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};