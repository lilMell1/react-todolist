const express = require('express')
import { getUserTasks } from '../controllers/userController';

const router = express.Router();

// Get all tasks for a user
router.get('/users/:userId/tasks', getUserTasks);

export default router;
