import React, { useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteTaskReducer, toggleCompleteReducer } from '../store/taskSlice'; // Redux actions

export interface Taskprops {
  title: string;
  completed: boolean;
  _id: string;
  userId: string;
}


const Task: React.FC<Taskprops> = ({ title, completed, _id, userId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(completed);

  // Function to handle completing/unchecking task
  const toggleComplete= async () => {
    try {
      // Update the task's completed status on the backend
      const updateUrl = `http://localhost:3001/api/users/${userId}/tasks/${_id}`;
      await axios.put(updateUrl, { completed: !isCompleted }); // change the data base

      // Dispatch the toggle completion action to Redux
      dispatch(toggleCompleteReducer(_id ));

      // Update the local state for immediate UI feedback
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to delete the task
  const deleteTask = async () => {
    try {
      const deleteUrl = `http://localhost:3001/api/users/${userId}/tasks/${_id}`;
      await axios.delete(deleteUrl);
      
      // Dispatch the remove task action to Redux
      dispatch(deleteTaskReducer( _id ));
    } catch (error) {
      console.error('Error deleting task:', error);
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
