import {Auth} from "../middelwares/auth.middelware.js";
import {upload} from "../middelwares/multer.middelware.js";
import {Router} from "express";
import {createJobPost, updatePost,getAllJobPostings,applyForJob,getAllJobPosts,getAppliedJobs,getJobById,updateJobStatus,
    updateApplicationStatus,
    getAplliedusers,
    getSelectedUsers,
    getRejectedUsers,
    getAppliedJobsByUser} from "../controllers/job.controllers.js";
const router=Router();
router.route('/create').post(Auth,createJobPost);
router.route('/update/:jobId').put(Auth,updatePost);
router.route('/getAll').get(Auth,getAllJobPostings);
router.route('/apply').post(Auth,applyForJob);
router.route('/getAllPost').get(Auth,getAllJobPosts);
router.route('/getAppliedJobs').get(Auth,getAppliedJobs);
router.route('/getJobById').get(Auth,getJobById);
router.route('/updateJobStatus/:jobId').put(Auth,updateJobStatus);
router.route('/updateApplicationStatus').put(Auth,updateApplicationStatus);
router.route('/getAppliedJobsByUser').get(Auth,getAppliedJobsByUser);
router.route('/getAplliedusers').get(Auth,getAplliedusers);
router.route('/getSelectedUsers').get(Auth,getSelectedUsers);
router.route('/getRejectedUsers').get(Auth,getRejectedUsers);
export default router;