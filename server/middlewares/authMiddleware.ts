import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {User} from '../models/User';  // Import your User model
import {IMiddleWareReq} from '../interfaces/AuthMiddleware.interface'
dotenv.config();  // Loads environment variables from .env file into process.env

const SECRET_KEY = process.env.SECRET_KEY as string;

// Define your extended request interface to include the user object


// JWT Authentication Middleware
export const authenticateJWT = async (req: IMiddleWareReq, res: Response, next: NextFunction): Promise<Response<void|string> | undefined> => {
  const token: string = req.cookies.token;  // Assuming JWT is stored in cookies

  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    const user = await User.findById(decoded.userId);  
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });  
    }

    // Attach the userId to the req object
    req.user = { userId: decoded.userId };

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });  // Handle invalid token or expiration
  }
};
