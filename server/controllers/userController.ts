import { Request, Response } from 'express';
import { User } from '../models/User';  // Assuming User is your Mongoose model
import {IUser} from '../models/User'

export interface IGetUserAuthInfoRequest extends Request {
  user?: { userId: string }; 
}


export const getUserTasks = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    // The userId comes from the JWT, which is decoded in your middleware
    const userId = req.user?.userId;  // Assuming you've decoded and attached user info to req in your JWT middleware

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found in token' });
    }

    // Find the user by their ID
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user's tasks
    res.status(200).json(user.tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};
