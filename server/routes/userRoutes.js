// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js'; // Make sure this path is correct

const router = express.Router();

// GET /api/users/list — returns all users
router.get('/list', async (req, res) => {
  try {
    const users = await User.find({}, 'email role'); // Fetch only email and role
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

export default router;