import Job from '../models/Job.js';

export const getUserProfile = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({ user: req.user._id });
    res.json({
      name: req.user.name,
      email: req.user.email,
      totalJobs,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};