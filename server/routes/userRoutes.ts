import express from 'express';
import { getUserTasks } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
const router = express.Router();

router.use(authenticateJWT);

// Get all tasks for a user
router.get('/tasks', getUserTasks);

export default router;
