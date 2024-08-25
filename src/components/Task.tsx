import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteTask, toggleComplete } from '../store/taskSlice';

interface TaskProps {
  taskInfo: string;
  completed: boolean;
  index: number; // You need the index to identify the task in the array
}

const Task: React.FC<TaskProps> = ({ taskInfo, completed, index }) => {
  const dispatch: AppDispatch = useDispatch(); 

  return (
    <div className="task-container">
      <p style={{ textDecoration: completed ? "line-through solid 2px white" : "none" }}>
        {taskInfo}
      </p>
      <div className="bring-closer">
        <button
          onClick={() => dispatch(toggleComplete(index))} // Dispatch the toggleComplete action with the task index
          className="complete-btn"
        >
          {completed ? "uncheck" : "complete"}
        </button>
        <button
          onClick={() => dispatch(deleteTask(index))} // Dispatch the deleteTask action with the task index
          id="red"
          className="delete-btn"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Task;
