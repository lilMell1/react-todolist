import React, { useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteTaskReducer, toggleCompleteReducer } from '../store/taskSlice'; 
import {Taskprops} from '../interfaces/Task.interface'

const Task: React.FC<Taskprops> = ({ title, completed, _id }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(completed);

  const toggleComplete:() => Promise<void|string> = async () => {
    try {
      const updateUrl = `http://localhost:3001/api/tasks/${_id}`;  
      await axios.put(updateUrl, { completed: !isCompleted }, { withCredentials: true }); 

      dispatch(toggleCompleteReducer(_id));

      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask: () => Promise<void|string> = async () => {
    try {
      const deleteUrl = `http://localhost:3001/api/tasks/${_id}`;  
      await axios.delete(deleteUrl, { withCredentials: true }); 
      
      dispatch(deleteTaskReducer(_id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="tasksPage-task-container">
      <p style={{ textDecoration: isCompleted ? 'line-through solid 2px white' : 'none' }}>
        {title}
      </p>
      <div className="tasksPage-bring-closer">
        <button
          onClick={toggleComplete}
          className="tasksPage-btn"
        >
          {isCompleted ? "Uncheck" : "Complete"}
        </button>
        <button
          onClick={deleteTask}
          id="red"
          className="tasksPage-btn"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default Task;
