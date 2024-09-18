const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');  // Ensure correct path for your models

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
const MONGO_URI = 'mongodb://localhost:27017/mydatabase';  
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Route for registering users
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password, tasks: [] });  // Initialize tasks as an empty array
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for logging in users
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch all tasks for a specific user
app.get('/api/users/:userId/tasks', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.tasks);  // Return the user's tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Route to add a new task to the user's tasks array
app.post('/api/users/:userId/tasks', async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask = { title, completed: false };
    user.tasks.push(newTask);
    await user.save();
    res.status(201).json(user.tasks[user.tasks.length - 1]); // Return the newly added task
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
});

// Route to update a specific task for a user
app.put('/api/users/:userId/tasks/:taskId', async (req, res) => {
  const { userId, taskId } = req.params;
  const { title, completed } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.completed = completed !== undefined ? completed : task.completed;

    await user.save();
    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// Route to delete a specific task for a user
app.delete('/api/users/:userId/tasks/:taskId', async (req, res) => {
  const { userId, taskId } = req.params;
  console.log(`Received request to delete task with ID: ${taskId} for user: ${userId}`);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    user.tasks = user.tasks.filter(t => t._id.toString() !== taskId);
    await user.save();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
