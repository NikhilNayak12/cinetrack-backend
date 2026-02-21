import { body, param } from "express-validator";

export const createTaskValidation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("projectId")
    .isMongoId()
    .withMessage("Valid project id required"),

  body("assignedTo")
    .isMongoId()
    .withMessage("Valid judge id required")
];

export const taskIdValidation = [
  param("id").isMongoId().withMessage("Invalid task id")
];

export const updateTaskValidation = [
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Invalid status"),

  body("rating")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Rating must be between 1 and 10")
];