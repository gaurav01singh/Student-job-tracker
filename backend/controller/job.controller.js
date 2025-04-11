import Job from "../models/job.model.js";


export const createJob = async (req, res) => {
    const { company, role, status, appliedDate, link } = req.body;
    try {
        const newJob = new Job({
            company,
            role,
            status,
            appliedDate,
            link,
            createdby: req.user.id, 
        });

        await newJob.save();
        res.status(201).json({ message: "Job created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { company, role, status, appliedDate, link } = req.body;
    try {
        const updatedJob = await Job.findByIdAndUpdate(id, {
            company,
            role,
            status,
            appliedDate,
            link,
        }, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getJobsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const jobs = await Job.find({ createdby: id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



