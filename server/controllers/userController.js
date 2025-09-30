import User from '../models/User.js';
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    await user.save();

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};