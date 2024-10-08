import { Request } from 'express';
import { Document, Types } from 'mongoose';
import { ITask } from './Task.interface';

// The IUser interface represents a User document in MongoDB
export interface IUser extends Document {
  username: string;
  password: string;
  tasks: Types.DocumentArray<ITask>; // Array of embedded Task documents
}

// The IGetUserAuthInfoRequest extends Express's Request interface
// and includes user (from middleware), params, and body
export interface IGetUserAuthInfoRequest extends Request {
  user?: { 
    userId: string; 
  };  // Injected by the auth middleware
  params: {
    taskId: string; //from the req.params
  };
  body: {
    title: string; //from the req.body
  };
}
