import React, { useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';

export interface Task {
  title: string;
  completed: boolean;
  _id: string;
  userId: string;
}

interface TaskProps extends Task {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;  // Function to update task list
}

const Task: React.FC<TaskProps> = ({ title, completed, _id, userId, setTasks }) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  // Function to handle completing/unchecking task
  const toggleComplete = async () => {
    try {
      // Update the task's completed status on the backend
      const updateUrl = `http://localhost:3001/api/users/${userId}/tasks/${_id}`;
      await axios.put(updateUrl, { completed: !isCompleted });

      // Update the task's status in the frontend state
      setIsCompleted(!isCompleted);

      // Optionally, update the task list to reflect changes globally
      setTasks(prevTasks => prevTasks.map(task => 
        task._id === _id ? { ...task, completed: !isCompleted } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);  // Log the error
    }
  };

  // Function to delete the task
  const deleteTask = async () => {
    console.log(`Attempting to delete task with ID: ${_id} for user: ${userId}`);
    try {
      const deleteUrl = `http://localhost:3001/api/users/${userId}/tasks/${_id}`;
      console.log(`DELETE request URL: ${deleteUrl}`);
      await axios.delete(deleteUrl);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
    } catch (error) {
      console.error('Error deleting task:', error);  // Log the error
    }
  };

  return (
    <div className="task-container">
      <p style={{ textDecoration: isCompleted ? 'line-through solid 2px white' : 'none' }}>
        {title}
      </p>
      <div className="bring-closer">
        <button
          onClick={toggleComplete}
          className="complete-btn"
        >
          {isCompleted ? "Uncheck" : "Complete"}
        </button>
        <button
          onClick={deleteTask}
          id="red"
          className="delete-btn"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default Task;
