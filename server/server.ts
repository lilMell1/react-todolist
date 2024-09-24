import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
const cors = require('cors');

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'  // Only allow requests from this specific origin
}));
 // if not enabled the browser will block requests between port 3001 to port 3000

// Connect to MongoDB using Mongoose
const MONGO_URI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

  // Use Routes
app.use('/api', authRoutes);       //  (register, login)
app.use('/api', taskRoutes);       //  task management (add, update, delete)
app.use('/api', userRoutes);       //  fetching user tasks

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
