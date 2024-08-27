import React from 'react';
import Task from './Task';

type Task = {
    taskInfo: string;
    completed: boolean;
    id: string;
};

type TaskListProps = {
    tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div style={{ width: '100%' }}>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Task 
                        taskInfo={task.taskInfo}  
                        completed={task.completed}
                        key={task.id}
                        id={task.id}
                    />
                ))
            ) : (
                <p>No tasks to show</p>
            )}
        </div>
    );
};

export default TaskList;
