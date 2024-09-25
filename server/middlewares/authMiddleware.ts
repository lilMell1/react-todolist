import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  //  loads environment variables from .env file into process.env
const SECRET_KEY = process.env.SECRET_KEY as string;
export interface IGetUserAuthInfoRequest extends Request {
  user?: { userId: string; }; // Adjust the type based on your JWT middleware
}
export const authenticateJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const token :string= req.cookies.token;  // JWT is stored in the cookies

  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    // Attach userId and other info to the request object
    req.user = { userId: decoded.userId};

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
