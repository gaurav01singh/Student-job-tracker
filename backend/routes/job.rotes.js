import express from "express";
import { createJob, updateJob, deleteJob, getJobs, getJobsByUserId } from "../controller/job.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();



// Create a new job
router.post("/",verifyToken, createJob);

// Get all jobs
router.get("/", getJobs);

// Update a job by ID
router.put("/:id",verifyToken, updateJob);

// Delete a job by ID
router.delete("/:id",verifyToken, deleteJob);

//get by user id
router.get("/user/:id",verifyToken, getJobsByUserId);

export default router;