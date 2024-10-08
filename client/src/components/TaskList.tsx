import React from 'react';
import {TaskListProps} from '../interfaces/TaskList.interface'
import Task from '../components/Task';

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
  return (
    <div className="tasksPage-tasks-container">
      {isLoading ? (
        <p style={{ color: 'white' }}>Loading tasks...</p>  // Show loading message when isLoading is true
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task._id}  // Don't touch this as requested
            _id={task._id}
            title={task.title}
            completed={task.completed}
          />
        ))
      ) : (
        <p style={{ color: 'white' }}>No tasks to show</p>  // Show "No tasks to show" if tasks array is empty
      )}
    </div>
  );
};

export default TaskList;
