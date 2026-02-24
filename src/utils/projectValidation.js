import { body, param } from "express-validator";

export const createProjectValidation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("genre").notEmpty().withMessage("Genre is required"),

  body("filmUrl").optional()
];

export const projectIdValidation = [
  param("id").isMongoId().withMessage("Invalid project id")
];