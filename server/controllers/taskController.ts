import { Request, Response } from 'express';
import { User } from '../models/User';  // Assuming User is your Mongoose model
import {IUser} from '../models/User'

interface ITask {
  title: string;
  completed: boolean;
}

// Add a new task
//I set the server to respond with an HTTP 404 status, which represents "Not Found." that being sent to the FRONT
// where the function has been called! 
export const addTask = async (req: Request<{ userId: string }, { title: string }>, res: Response) => {
  const { userId } : { userId:string } = req.params;
  const { title } : { title:string } = req.body;

  try {
    const user:IUser|null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask: ITask = { title, completed: false };
    user.tasks.push(newTask);
    await user.save(); //await pauses the execution of the code in the current function until the promise is resolved or rejected. (because save function is async)
    res.status(201).json(user.tasks[user.tasks.length - 1]); // Return the newly added task back to the front so i can change the redux store
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

// Update a task
export const updateTask = async (req: Request<{ userId: string, taskId: string, completed: boolean }>, res: Response) => {
  const { userId, taskId } : { userId:string, taskId:string } = req.params;
  const { completed }: { completed:boolean } = req.body;

  try {
    const user:IUser = (await User.findById(userId))!; 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task:ITask = user.tasks.id(taskId)!;
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

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
    const user:IUser = (await User.findById(userId))!;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // const task:ITask = user.tasks.id(taskId)!;
    // if (!task) {
    //   return res.status(404).json({ message: 'Task not found' });
    // }

    user.tasks.pull(taskId);
    await user.save();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
