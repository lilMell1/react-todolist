import express from 'express';
import { addTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Import the JWT middleware

const router = express.Router();

// Add new task to user
router.post('/tasks', authenticateJWT, addTask);

// Update task for user
router.put('/tasks/:taskId', authenticateJWT, updateTask);

// Delete task for user
router.delete('/tasks/:taskId', authenticateJWT, deleteTask);


export default router;
