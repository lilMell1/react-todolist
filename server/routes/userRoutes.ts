import express from 'express';
import { getUserTasks } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
const router = express.Router();

// Get all tasks for a user
router.get('/tasks', authenticateJWT, getUserTasks);

export default router;
