import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// health route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

export default app;