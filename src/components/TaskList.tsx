import React from 'react';
import Task from './Task';

interface TaskListProps {
    tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className='tasks-container'>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Task 
                        taskInfo={task.taskInfo}  
                        completed={task.completed}
                        key={task.id}
                        id={task.id}
                    />
                ))) : (
                <p style={{color:'white'}}>No tasks to show</p>
                )}
        </div>
    );
};

export default TaskList;
