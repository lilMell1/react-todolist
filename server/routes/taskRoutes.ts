import express, { Router } from 'express';
import { addTask, updateTask, deleteTask } from '../controllers/taskController';
const router:Router = express.Router();

// Add new task to user
router.post('/users/:userId/tasks', addTask);

// Update task for user
router.put('/users/:userId/tasks/:taskId', updateTask);

// Delete task for user
router.delete('/users/:userId/tasks/:taskId', deleteTask);

export default router;

// there can be the same routh for diffrenet functions!, the use of each will be decided by the front sending(using), each function.