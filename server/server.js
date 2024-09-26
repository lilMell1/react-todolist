const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { ConnectOptions } = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
const MONGO_URI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Use Routes
app.use('/api/auth', authRoutes);  // Handle auth (register, login)
app.use('/api', taskRoutes);       // Handle task management (add, update, delete)
app.use('/api', userRoutes);       // Handle fetching user tasks

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
