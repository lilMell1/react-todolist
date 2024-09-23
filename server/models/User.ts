import { Schema, model, Document,Types } from 'mongoose';

export interface ITask {
  title: string;
  completed: boolean;
}

export interface IUser extends Document {
  username: string;
  password: string;
  tasks: Types.DocumentArray<ITask>; // tasks is an array of sub-documents of type ITask that i can use mongoose functions on
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [taskSchema],
});

export const User = model<IUser>('User', userSchema);

// By extending Document, we ensure that each user and task object inherits 
// essential Mongoose methods and properties, like _id, save(), and id(), 
// providing full Mongoose document functionality.