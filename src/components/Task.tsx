import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteTask, toggleComplete } from '../store/taskSlice';
import { RiDeleteBin6Line } from "react-icons/ri";

interface TaskProps {
  taskInfo: string;
  completed: boolean;
  id: string;
}

const Task: React.FC<TaskProps> = ({ taskInfo, completed, id }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="task-container">
      <p style={{ textDecoration: completed ? "line-through solid 2px white" : "none" }}>
        {taskInfo}
      </p>
      <div className="bring-closer">
        <button
          onClick={() => dispatch(toggleComplete(id))}
          className="complete-btn"
        >
          {completed ? "Uncheck" : "Complete"}
        </button>
        <button
          onClick={() => dispatch(deleteTask(id))}
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
