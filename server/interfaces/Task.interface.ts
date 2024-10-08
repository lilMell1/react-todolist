import { Types } from 'mongoose';  // Import Types from mongoose

export interface ITask {
    title: string;
    completed: boolean;
    _id:  Types.ObjectId;
}