import Job from '../models/Job.js';

// @desc    Create a new job
export const createJob = async (req, res) => {
  const { company, position, status } = req.body;

  try {
    const job = await Job.create({
      company,
      position,
      status,
      user: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job' });
  }
};

// @desc    Get all jobs for logged-in user
export const getJobs = async (req, res) => {
  const { page = 1, limit = 5, search = '', status = 'All' } = req.query;
  const skip = (page - 1) * limit;
  const query = { user: req.user._id };

  if (status !== 'All') query.status = status;
  if (search) {
    query.$or = [
      { company: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
    ];
  }

  try {
    const jobs = await Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Job.countDocuments(query);
    res.json({ jobs, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// @desc    Update a job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position, status } = req.body;

  try {
    const job = await Job.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { company, position, status },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job' });
  }
};

// @desc    Delete a job
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findOneAndDelete({ _id: id, user: req.user._id });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
};