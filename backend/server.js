import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.rotes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
