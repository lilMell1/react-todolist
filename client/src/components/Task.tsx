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
  const [completeButton, setCompleteButton] = useState(false);
  const deleteTask = async () => {
  console.log(`Attempting to delete task with ID: ${_id} for user: ${userId}`);
  console.log(title);  // Ensure title (formerly taskInfo) is logged correctly

  try {
    // Use the correct backend URL with port 3001
    const deleteUrl = `http://localhost:3001/api/users/${userId}/tasks/${_id}`;

    console.log(`DELETE request URL: ${deleteUrl}`);  // Log the full URL

    // Make the DELETE request to the backend
    await axios.delete(deleteUrl);

    // Update the task list in the UI
    setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
  } catch (error) {
    console.error('Error deleting task:', error);  // Log the error
  }
};

  return (
    <div className="task-container">
      <p style={{ textDecoration: completed ? 'line-through solid 2px white' : 'none' }}>
        {title}
      </p>
      <div className="bring-closer">
        <button
          onClick={() => setCompleteButton(!completeButton)}
          className="complete-btn"
        >
          {completed ? "Uncheck" : "Complete"}
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
