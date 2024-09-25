import React from 'react';
import Task from './Task';
import { Taskprops } from './Task';

interface TaskListProps {
  tasks: Taskprops[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="mainapp-tasks-container">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
            key={task._id}  // Using _id as a unique key for the task
            _id={task._id}
            title={task.title}
            completed={task.completed}
          />
        ))
      ) : (
        <p style={{ color: 'white' }}>No tasks to show</p>
      )}
    </div>
  );
};

export default TaskList;
