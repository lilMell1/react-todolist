import { Response } from 'express';
import { User } from '../models/User';
import { IUser, IGetUserAuthInfoRequest } from '../interfaces/User.interface';
import { ITask } from '../interfaces/Task.interface';
import { Types } from 'mongoose'; 

// Add a new task
export const addTask = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response | undefined> => {
  const { title } = req.body;
  const userId = req.user?.userId;  // Extract the userId from the JWT (from middleware)

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask: ITask = { _id: new Types.ObjectId(), title, completed: false };
    user.tasks.push(newTask);

    await user.save();

    const addedTask = user.tasks.id(newTask._id);

    return res.status(201).json(addedTask);

  } catch (error) {
    console.error('Error adding task:', error);
    return res.status(500).json({ message: 'Failed to add task' });
  }
};

// Update a task
export const updateTask: (req: IGetUserAuthInfoRequest, res: Response) => Promise<Response<string> | undefined> 
  = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user?.userId; 
  const { taskId } = req.params;  

  const user: IUser | null = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const task = user.tasks.id(taskId);  
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed
    await user.save();

    res.status(200).json(task); 
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete a task, returnes a string that says if deleted or not
export const deleteTask: (req: IGetUserAuthInfoRequest, res: Response) => Promise<void|string>
  = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user?.userId; 
  const { taskId } = req.params;  

  const user: IUser | null = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  try {
    user.tasks.pull(taskId);  // Remove the task by taskId
    await user.save();
    res.status(200).json({ message: 'Task deleted successfully' });
    return;
    
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
    return;
  }
};
