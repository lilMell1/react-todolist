import { Request, Response } from 'express';
import { User } from '../models/User';  // Assuming User is your Mongoose model


export interface IGetUserAuthInfoRequest extends Request {
  user?: { userId: string }; 
}

//I don't need to return anything specific in the function itself because the primary action is just sending a response to the client with

//The function doesn't need to return a Response object because the response is fully handled by res.json(). 
export const getUserTasks: (req: IGetUserAuthInfoRequest, res: Response) => Promise<void|string|any> = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user!.userId; // must be a user, checked in middleware

  try {
    // Fetch the user by their ID
    const user = await User.findById(userId);

    // Respond with the user's tasks if successful
    res.status(200).json(user!.tasks);
    return 
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
    return 
  }
};

