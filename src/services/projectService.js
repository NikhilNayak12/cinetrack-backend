import Project from "../models/Project.js";
import { buildProjectSearchQuery } from "../utils/searchFilter.js";

// 🎬 Create film submission
export const createProjectService = async (data, userId) => {
  const project = await Project.create({
    ...data,
    submittedBy: userId
  });

  return project;
};

// 📋 Get all projects (admin/judge use)
import { getPagination } from "../utils/pagination.js";

export const getAllProjectsService = async (query) => {
  const { limit, skip } = getPagination(query);
  const filter = buildProjectSearchQuery(query);

  const projects = await Project.find(filter)
    .populate("submittedBy", "name email role")
    .populate("assignedJudges", "name email role")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(filter);

  return { projects, total };
};

// 👤 Get projects by student
export const getMyProjectsService = async (userId) => {
  return await Project.find({ submittedBy: userId })
    .populate("assignedJudges", "name email role")
    .sort({ createdAt: -1 });
};

// 🔍 Get single project
export const getProjectByIdService = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate("submittedBy", "name email role")
    .populate("assignedJudges", "name email role");

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};