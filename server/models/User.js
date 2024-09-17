const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [taskSchema]  // Array of task subdocuments
});

const User = mongoose.model('User', userSchema);

module.exports = User;
