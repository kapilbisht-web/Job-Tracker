import express from 'express';
import  protect  from '../middleware/authMiddleware.js';
import { registerUser } from '../controllers/registerUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { logoutUser } from '../controllers/logoutUser.js';
import { getUserProfile } from '../controllers/userProfile.js';
import { updateUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;