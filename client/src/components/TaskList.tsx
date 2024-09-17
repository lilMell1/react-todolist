import React from 'react';
import Task from './Task';
import { Task as TaskType } from './Task';

interface TaskListProps {
  tasks: TaskType[];
  userId: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;  // Pass setTasks to modify the task list
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, userId }) => {
  return (
    <div className="tasks-container">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
            key={index}  
            _id={task._id}  // Use _id as the task's identifier
            title={task.title}
            completed={task.completed}
            userId={userId}  // Assuming you have userId, this might also come from the task or parent
            setTasks={setTasks}  // Pass setTasks to Task
          />
        ))
      ) : (
        <p style={{ color: 'white' }}>No tasks to show</p>
      )}
    </div>
  );
};

export default TaskList;
