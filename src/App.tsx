import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './components/Task';
import TaskAdder from './components/TaskAdder';
import './App.css';
import { RootState, AppDispatch } from './store/store';
import { addTask, deleteTask, toggleComplete } from './store/taskSlice';

interface Task {
  taskInfo: string;  
  completed: boolean; 
  // index is not here because it's not a part of the task data itself
}

function App() {
  const dispatch: AppDispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const tasks = useSelector((state: RootState) => state.tasks.taskArray); // Selecting the taskArray from the Redux store

  // useRef to track if tasks have been loaded from localStorage already
  const hasLoadedTasks = useRef(false);

  // useEffect to load tasks from localStorage on initial render only
  useEffect(() => {
    if (!hasLoadedTasks.current) { 
      console.log("Loading tasks from localStorage...");
      const storedTasks = JSON.parse(window.localStorage.getItem('tasks') || '[]'); 
      console.log("Stored tasks:", storedTasks);
      storedTasks.forEach((task: Task) => dispatch(addTask(task))); // Dispatch each task to add it to the Redux store,(WHEN REFRESH IT TAKES THE STOREDTASKS INTO THE STORE!!!!)
      hasLoadedTasks.current = true; // Mark that tasks have been loaded to prevent re-running this logic
    }
  }, []);

  // useEffect to update localStorage whenever the tasks array changes
  useEffect(() => {
    console.log("Tasks changed:", tasks);
    window.localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks array to localStorage
  }, [tasks]); // This useEffect runs whenever the tasks array changes

  // Calculate the number of incomplete tasks
  const tasksAmount = tasks.filter(task => !task.completed).length; //recalculated every time the component re-renders
  console.log("Pending tasks count:", tasksAmount);

  // Handler to add a new task
  const handleAddTask = (taskInfo: string) => {
    const newTask: Task = { taskInfo, completed: false }; // Create a new task object
    dispatch(addTask(newTask)); // Dispatch action to add the new task to the Redux store
  };


  return (
    <div className='container'>
      <TaskHeader tasksAmount={tasksAmount} /> {/* Component displaying the number of pending tasks */}
      <div className='tasks-container'>
        {/* Render each task in the tasks array */}
        {tasks.map((task, index) => (
          <Task 
            taskInfo={task.taskInfo}  
            completed={task.completed}
            key={index}  
            index={index}
          />
        ))}
      </div>
      <TaskAdder/> {/* Component to add a new task */}
    </div>
  );
}

// Functional component to display the header showing the number of pending tasks
const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1> {/* Display the number of pending tasks */}
  </div>
);

export default App; // Export the App component as the default export
