import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
dotenv.config();  //  loads environment variables from .env file into process.env
const app = express();
const DATABASE_URL = process.env.DATABASE_URL as string;

app.use(express.json());
app.use(cors({ // what domains resources i approve
  origin: 'http://localhost:3000',  // Your frontend's origin
  credentials: true,               // Allow credentials (cookies)
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(DATABASE_URL, {
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Use Routes
app.use('/api', authRoutes);  // Handles login, register, logout
app.use('/api', taskRoutes);  // Handles task management
app.use('/api', userRoutes);  // Handles fetching user tasks

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
