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

    // Store password in plain text (for learning/testing purposes)
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
    // Find the user
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Respond with success and return user ID for further operations
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

    // Return only the newly created task, not the whole task array
    res.status(201).json(user.tasks[user.tasks.length - 1]);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
});

// Route to get all tasks for a specific user
app.post('/api/users/:userId/tasks', async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the task to the user's tasks array
    const newTask = { title, completed: false };  // Create the task object
    user.tasks.push(newTask);

    // Save the user with the updated tasks array
    await user.save();

    // Get the newly added task (the last task in the array)
    const addedTask = user.tasks[user.tasks.length - 1];

    // Return the newly added task only
    res.status(201).json(addedTask);  // Return only the new task
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

    // Find the task in the array using task._id
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task fields
    task.title = title || task.title;
    task.completed = completed !== undefined ? completed : task.completed;

    await user.save();  // Save the updated user document
    res.status(200).json(task);  // Return the updated task
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
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found: ${user.username}`);
    
    // Find the task using its ID
    const task = user.tasks.id(taskId);
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log(`Task found: ${task.title}`);
    
    // Remove the task by filtering the tasks array
    user.tasks = user.tasks.filter(t => t._id.toString() !== taskId);

    // Save the updated user document
    await user.save();

    console.log('Task deleted successfully');
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Failed to delete task' });
  }
});




// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
