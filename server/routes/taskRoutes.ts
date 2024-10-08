import express from 'express';
import { addTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateJWT } from '../middlewares/authMiddleware';  

const router = express.Router();

//makes so all routes will go trough this function
router.use(authenticateJWT);

// Add new task to user
router.post('/tasks', addTask);

// Update task for user
router.put('/tasks/:taskId', updateTask);

// Delete task for user
router.delete('/tasks/:taskId', deleteTask);


export default router;
