import { Request, Response } from 'express';
import { User } from '../models/User';  
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();  //  loads environment variables from .env file into process.env
const SECRET_KEY = process.env.SECRET_KEY as string;
const saltRounds = 10;  

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string; password: string } = req.body;

  const existingUser: IUser | null = await User.findOne({ username });
  
  if (existingUser?.username) {
    res.status(400).json({ message: 'User already exists' });
    return;  // exit the function early
  }
  
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser: IUser = new User({ username, password: hashedPassword, tasks: [] });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//any for data, void for nothing
export const loginUser: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
  const { username, password } : { username: string; password: string } = req.body;

  const user: IUser | null = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ message: 'No such user exists, create a new user!' });
    return;
  }

  const isPasswordValid:boolean = await bcrypt.compare(password, user.password); // hasing pass then comapres it
  if (!isPasswordValid) {
    res.status(400).json({ message: 'Incorrect password' });
    return;
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

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


