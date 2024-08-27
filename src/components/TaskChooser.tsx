import React from 'react';
import Task from './Task';

type Task = {
  taskInfo: string;
  completed: boolean;
  id:string;
};

type TaskChooserProps = {
  tasks: Task[];
};

const TaskChooser: React.FC<TaskChooserProps> = ({ tasks }) => {
  return (
    <div className='tasks-container'>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task 
            key={task.id}
            taskInfo={task.taskInfo}  
            completed={task.completed}
            id={task.id}  // Pass index to handle actions like toggleComplete or delete
          />
        ))) : (
        <p>No tasks to show</p>
        )}
    </div>
  );
};

export default TaskChooser;
