import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
const cors = require('cors');

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
const MONGO_URI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Use Routes
app.use('/api', authRoutes);  // Handle auth (register, login)
app.use('/api', taskRoutes);       // Handle task management (add, update, delete)
app.use('/api', userRoutes);       // Handle fetching user tasks

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
