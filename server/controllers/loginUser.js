import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const loginUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    console.log("Login attempt:", name, email);

    const user = await User.findOne({ name, email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Success — no password check
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};