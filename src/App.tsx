import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './components/Task';
import TaskAdder from './components/TaskAdder';
import './App.css';
import { RootState, AppDispatch } from './store/store';
import { addTask, deleteTask, toggleComplete } from './store/taskSlice';

interface Task {
  taskInfo: string;
  completed: boolean;
}

function App() {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.taskArray);
  const [initialLoad, setInitialLoad] = useState(false);
  const [tasksAmount, setTasksAmount] = useState(0);

  useEffect(() => {
    // Retrieve tasks from localStorage on initial render
    if (!initialLoad) {
      const storedTasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
      storedTasks.forEach((task: Task) => dispatch(addTask(task)));
      setInitialLoad(true); // Ensure this effect only runs once
    }
  }, [initialLoad, dispatch]);


  useEffect(() => {
    // Update tasksAmount based on the number of incomplete tasks
    window.localStorage.setItem('tasks', JSON.stringify(tasks));

    const pendingTasks = tasks.filter(task => !task.completed).length;
    setTasksAmount(pendingTasks);
  }, [tasks]);

  const handleAddTask = (taskInfo: string) => {
    const newTask: Task = { taskInfo, completed: false };
    dispatch(addTask(newTask));
  };

  const handleDeleteTask = (index: number) => {
    dispatch(deleteTask(index));
  };

  const handleToggleComplete = (index: number) => {
    dispatch(toggleComplete(index));
  };

  return (
    <div className='container'>
      <TaskHeader tasksAmount={tasksAmount} />
      <div className='tasks-container'>
        {tasks.map((task, index) => (
          <Task 
            key={index} 
            taskInfo={task.taskInfo} 
            completed={task.completed}
            deleteTask={() => handleDeleteTask(index)} 
            toggleComplete={() => handleToggleComplete(index)}
          />
        ))}
      </div>
      <TaskAdder addTask={handleAddTask} />
    </div>
  );
}

const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1>
  </div>
);

export default App;
