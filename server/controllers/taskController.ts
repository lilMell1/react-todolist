import { Request, Response } from 'express';
import { User } from '../models/User';
import { IUser } from '../models/User';

interface ITask {
  title: string;
  completed: boolean;
}
export interface IGetUserAuthInfoRequest extends Request {
  user?: { userId: string } // Adjust the type based on your JWT middleware
}
// Add a new task
export const addTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { title } = req.body;  // Extract the title from the request body
  const userId = req.user?.userId;  // Extract the userId from the JWT (set in your middleware)

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask: ITask = { title, completed: false };
    user.tasks.push(newTask);
    await user.save();

    res.status(201).json(user.tasks[user.tasks.length - 1]);  // Return the newly added task
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

// Update a task
export const updateTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { completed } = req.body;  // Extract completed status from the request body
  const userId = req.user?.userId;  // Extract the userId from the JWT
  const { taskId } = req.params;  // Extract the taskId from the URL parameters

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = user.tasks.id(taskId);  // Find the task by taskId
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = completed !== undefined ? completed : task.completed;
    await user.save();

    res.status(200).json(task);  // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user?.userId;  // Extract the userId from the JWT
  const { taskId } = req.params;  // Extract the taskId from the URL parameters

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.tasks.pull(taskId);  // Remove the task by taskId
    await user.save();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
