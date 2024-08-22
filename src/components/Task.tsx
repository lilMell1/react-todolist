import React from 'react';

interface TaskProps {
  taskInfo: string;
  completed: boolean;
  deleteTask: () => void;
  toggleComplete: () => void;
}

const Task: React.FC<TaskProps> = ({ taskInfo, completed, deleteTask, toggleComplete }) => {
  return (
    <div className="task-container">
      <p style={{ textDecoration: completed ? "line-through solid 2px white" : "none" }}>
        {taskInfo}
      </p>
      <div className="bring-closer">
        <button onClick={toggleComplete} className="complete-btn">
          {completed ? "uncheck" : "complete"}
        </button>
        <button onClick={deleteTask} id="red" className="delete-btn">X</button>
      </div>
    </div>
  );
}

export default Task;
