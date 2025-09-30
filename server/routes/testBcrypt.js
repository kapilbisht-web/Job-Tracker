import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/test-bcrypt', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Step 1: Hash the incoming password
    const salt = await bcrypt.genSalt(10);
    const generatedHash = await bcrypt.hash(password.trim(), salt);

    // Step 2: Compare the password with the hash we just generated
    const match = await bcrypt.compare(password.trim(), generatedHash);

    res.json({
      originalPassword: password,
      generatedHash,
      matchWithGeneratedHash: match
    });
  } catch (error) {
    res.status(500).json({ message: 'Bcrypt test failed', error: error.message });
  }
});

export default router;