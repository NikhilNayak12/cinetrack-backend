import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// health route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

export default app;