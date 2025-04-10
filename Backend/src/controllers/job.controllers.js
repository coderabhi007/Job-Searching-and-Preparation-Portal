import Job from "../models/jobPost.model.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { ApiError } from "../util/ApiError.js";
import JobApplication from "../models/jobApplication.model.js";
import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import JobPost from "../models/jobPost.model.js";

async function createJobPost(req, res) {
    try {
        const companyId = req.user._id;
        const company = await Company.findBy({authId:companyId});
        if (!company) {
            return res.status(404).json(new ApiError(404, "Company not found"));
        }

        const job = req.body;
        const newJob = new Job(job);
        newJob.companyId = companyId;
        newJob.companyName = company.companyName;
        await newJob.save();

        return res.status(201).json(new ApiResponse(201, newJob, "Job post created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function updatePost(req, res) {
    try {
        const authId = req.user._id;
        const jobId = req.params.id;
        const job = req.body;
        const company = await Company.findBy({authId});
        if (!company) {
            return res.status(404).json(new ApiError(404, "Company not found"));
        }
        const companyId = company._id;
        const updatedJob = await Job.findOneAndUpdate({companyId , _id: jobId }, job, { new: true });
        if (!updatedJob) {
            return res.status(404).json(new ApiError(404, "Job not found"));
        }

        return res.status(200).json(new ApiResponse(200, updatedJob, "Job updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getAllJobPostings(req, res) {
    try {
        const authId = req.user._id;
        const company = await Company.findBy({authId});
        if (!company) {
            return res.status(404).json(new ApiError(404, "Company not found"));
        }
      const  companyId = company._id;
        const jobs = await Job.find({ companyId });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json(new ApiError(404, "No job posts found"));
        }

        return res.status(200).json(new ApiResponse(200, jobs, "Job posts retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function applyForJob(req, res) {
    try {
        const jobId = req.params.id;
        const authId = req.user._id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json(new ApiError(404, "Job not found"));
        }
        const user = await User.find({authId});
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        const application = new JobApplication({ userId, jobId, status: "applied" });
        await application.save();

        return res.status(201).json(new ApiResponse(201, application, "Job application submitted successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getAllJobPosts(req, res) {
    try {
        const jobs = await Job.find({ isActive: true });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json(new ApiError(404, "No job posts found"));
        }

        return res.status(200).json(new ApiResponse(200, jobs, "Job posts retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getAppliedJobs(req, res) {
    try {
        const authId = req.user._id;
        const user = await User.find({ authId });
        if (!user) {

            return res.status(404).json(new ApiError(404, "User not found"));
        }
        const userId = user._id;
        const jobApplications = await JobApplication.find({ userId });

        if (!jobApplications || jobApplications.length === 0) {
            return res.status(404).json(new ApiError(404, "No job applications found"));
        }

        const jobIds = jobApplications.map(app => app.jobId);
        const jobs = await Job.find({ _id: { $in: jobIds } });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json(new ApiError(404, "No job application found"));
        }

        return res.status(200).json(new ApiResponse(200, jobs, "Job applications retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getJobById(req, res) {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json(new ApiError(404, "Job not found"));
        }

        return res.status(200).json(new ApiResponse(200, job, "Job retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function updateJobStatus(req, res) {
    try {
       // const companyId = req.user._id;
        const jobId = req.params.id;
        const { status } = req.body;

        const job = await JobPost.findById(jobId);
        if (!job) {
            return res.status(404).json(new ApiError(404, "Job not found"));
        }

        job.status = status;
        await job.save();

        return res.status(200).json(new ApiResponse(200, job, "Job status updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function updateApplicationStatus(req, res) {
    try {
        const jobId = req.params.id;
        const { userId, status } = req.body;
        let application = await JobApplication.findOne({ jobId, userId });
        if (!application) {
            return res.status(404).json(new ApiError(404, "Application not found"));
        }

        application.status = status;
        await application.save();

        return res.status(200).json(new ApiResponse(200, application, "Application status updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getAplliedusers(req, res) {
    try {
        const jobId = req.params.id;
        const applications = await JobApplication.find({ jobId });

        if (!applications || applications.length === 0) {
            return res.status(404).json(new ApiError(404, "No applications found"));
        }

        const userIds = applications.map(app => app.userId);
        const users = await User.find({ _id: { $in: userIds } });

        if (!users || users.length === 0) {
            return res.status(404).json(new ApiError(404, "No users found"));
        }

        return res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getSelectedUsers(req, res) {
    try {
        const jobId = req.params.id;
        const applications = await JobApplication.find({ jobId, status: "selected" });

        if (!applications || applications.length === 0) {
            return res.status(404).json(new ApiError(404, "No selected applications found"));
        }

        const userIds = applications.map(app => app.userId);
        const users = await User.find({ _id: { $in: userIds } });

        return res.status(200).json(new ApiResponse(200, users, "Selected users retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getRejectedUsers(req, res) {
    try {
        const jobId = req.params.id;
        const applications = await JobApplication.find({ jobId, status: "rejected" });

        if (!applications || applications.length === 0) {
            return res.status(404).json(new ApiError(404, "No rejected applications found"));
        }

        const userIds = applications.map(app => app.userId);
        const users = await User.find({ _id: { $in: userIds } });

        return res.status(200).json(new ApiResponse(200, users, "Rejected users retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

async function getAppliedJobsByUser(req, res) {
    try {
        const authId = req.user._id;
        const user = await User.find({authId});
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        const userId = user._id;
        const applications = await JobApplication.find({ userId });

        if (!applications || applications.length === 0) {
            return res.status(404).json(new ApiError(404, "No applications found"));
        }

        const jobIds = applications.map(app => app.jobId);
        const jobs = await Job.find({ _id: { $in: jobIds } });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json(new ApiError(404, "No jobs found"));
        }

        return res.status(200).json(new ApiResponse(200, jobs, "Jobs retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

export {
    createJobPost,
    updatePost,
    getAllJobPostings,
    applyForJob,
    getAllJobPosts,
    getAppliedJobs,
    getJobById,
    updateJobStatus,
    updateApplicationStatus,
    getAplliedusers,
    getSelectedUsers,
    getRejectedUsers,
    getAppliedJobsByUser
};
