import express from 'express';
import  protect  from '../middleware/authMiddleware.js';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobControllers.js';

const router = express.Router();

router.route('/')
  .get(protect, getJobs)
  .post(protect, createJob);

router.route('/:id')
  .put(protect, updateJob)
  .delete(protect, deleteJob);

export default router;