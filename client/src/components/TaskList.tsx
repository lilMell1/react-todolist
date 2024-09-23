import React from 'react';
import Task from './Task';
import { Taskprops } from './Task';

interface TaskListProps {
  tasks: Taskprops[];
  userId: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, userId }) => {
  return (
    <div className="mainapp-tasks-container">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
            key={index}  
            _id={task._id}  // Use _id as the task's identifier
            title={task.title}
            completed={task.completed}
            userId={userId}  // Assuming you have userId, this might also come from the task or parent
          />
        ))
      ) : (
        <p style={{ color: 'white' }}>No tasks to show</p>
      )}
    </div>
  );
};

export default TaskList;
