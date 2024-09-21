import express from 'express';
import { addTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

// Add new task to user
router.post('/users/:userId/tasks', addTask);

// Update task for user
router.put('/users/:userId/tasks/:taskId', updateTask);

// Delete task for user
router.delete('/users/:userId/tasks/:taskId', deleteTask);

export default router;
