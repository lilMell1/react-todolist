import { Schema, model, Document,Types } from 'mongoose';

export interface ITask {
  title: string;
  completed: boolean;
}

export interface IUser extends Document {
  username: string;
  password: string;
  tasks:  Types.DocumentArray<ITask>;
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
