import { Request, Response } from 'express';
import { User } from '../models/User';  
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  //  loads environment variables from .env file into process.env
// Define a secret key for signing the JWT
const SECRET_KEY = process.env.SECRET_KEY as string;

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string }  = req.body;

  try {
    const existingUser: IUser | null = await User.findOne({ username });
    if (existingUser?.username) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser: IUser = new User({ username, password, tasks: [] });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user with JWT and HTTP-only cookie
export const loginUser = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string }  = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: '1h',  // Token expiration time
    });

    // Send JWT in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,   // Make the cookie HTTP-only
      secure: false,    // Set true in production (requires HTTPS)
      maxAge: 3600000,  // 1 hour
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user and clear JWT cookie
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('token');  // Clear the JWT cookie
  res.status(200).json({ message: 'Logout successful' });
};
