import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cinetrack/videos",
    resource_type: "video"
  }
});

export const uploadVideo = multer({ storage });