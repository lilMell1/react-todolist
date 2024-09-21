import { Request, Response } from 'express';
import { User } from '../models/User';  // Assuming User is your Mongoose model
import {IUser} from '../models/User'

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser:IUser = new User({ username, password, tasks: [] });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    console.log("WOW!");
    const user:IUser|null = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
