import { Request, Response } from 'express';
import { User,IUser } from '../models/User';  


export interface IGetUserAuthInfoRequest extends Request {
  user?: { userId: string }; 
}


export const getUserTasks: (req: IGetUserAuthInfoRequest, res: Response) => Promise<void> 
  = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user!.userId; 

  const user: IUser | null = await User.findById(userId);
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  try {  
    res.status(200).json(user!.tasks);
     
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

