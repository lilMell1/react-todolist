import { Request, Response } from 'express';
import { User } from '../models/User';  
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  //  loads environment variables from .env file into process.env
const SECRET_KEY = process.env.SECRET_KEY as string;
//Promise is an object representing intermediate state of operation which is guaranteed to complete its execution at some point in future.
// Register user
export const registerUser:(req: Request, res: Response) => Promise<Response<string> | undefined>
  = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string }  = req.body;

  const existingPassword: string | null = await User.findOne({ password });
  const existingUser: IUser | null = await User.findOne({ username });
  if (existingUser?.username) {
    return res.status(400).json({ message: 'User already exists' });
  }
  if(existingPassword)
    return res.status(400).json({ message: 'password taken' });

  try {
    const newUser: IUser = new User({ username, password, tasks: [] });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user with JWT and HTTP-only cookie
export const loginUser: (req: Request, res: Response) => Promise<void|string|any> = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { //the rest is the header
      expiresIn: '1h',  // Token expiration time -> work
      algorithm: 'HS512', // algorithm of coding
    });

    // Send JWT in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,   // Make the cookie HTTP-only
      secure: false,    // Set true in production (requires HTTPS)
      maxAge: 3600000,  // 1 hour, 5000 is 5 second -> works
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// // Logout user and clear JWT cookie
// export const logoutUser = async (req: Request, res: Response) => {
//   res.clearCookie('token');  // Clear the JWT cookie
//   res.status(200).json({ message: 'Logout successful' });
// };
