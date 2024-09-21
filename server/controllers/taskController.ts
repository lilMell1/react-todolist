import { Request, Response } from 'express';
import { User } from '../models/User';  // Assuming User is your Mongoose model

// Add a new task
export const addTask = async (req: Request<{ userId: string }, {}, { title: string }>, res: Response) => {
  const { userId } = req.params;
  const { title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask = { title, completed: false };
    user.tasks.push(newTask);
    await user.save();
    res.status(201).json(user.tasks[user.tasks.length - 1]); // Return the newly added task
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

// Update a task
export const updateTask = async (req: Request<{ userId: string, taskId: string }>, res: Response) => {
  const { userId, taskId } = req.params;
  const { title, completed } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.completed = completed !== undefined ? completed : task.completed;

    await user.save();
    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req: Request<{ userId: string, taskId: string }>, res: Response) => {
  const { userId, taskId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    user.tasks.pull(taskId);
    await user.save();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
