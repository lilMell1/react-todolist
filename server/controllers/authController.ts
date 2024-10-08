import { Request, Response } from 'express';
import { User } from '../models/User';  
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();  //  loads environment variables from .env file into process.env
const SECRET_KEY = process.env.SECRET_KEY as string;
const saltRounds = 10;  

export const registerUser:(req: Request, res: Response) => Promise<Response<string> | undefined>
  = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string }  = req.body;

  const existingUser: IUser | null = await User.findOne({ username });
  if (existingUser?.username) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser: IUser = new User({ username: username, password: hashedPassword, tasks: [] });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser: (req: Request, res: Response) => Promise<void|string|any> = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } = req.body;

  const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'No such user exists, create a new user!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
  
    try {
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: '1h',
        algorithm: 'HS512',
      });
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating token' });
    }
};

