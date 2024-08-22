import React, { useEffect } from 'react';
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
  const tasksAmount = tasks.filter(task => !task.completed).length+1;

  useEffect(() => {
    // Retrieve tasks from localStorage on initial render
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');

    storedTasks.forEach((task: Task) => dispatch(addTask(task))); //the dispatch recognizes a change and tells and gices the store the change and the store takes the change and renders it
  }, [dispatch]); // useEffect will only re-run if the dispatch function changes, even if the change is not in current file

  useEffect(() => {
    // Store tasks in localStorage when tasks change
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); //useEffect will only re-run if the tasks array changes  

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
