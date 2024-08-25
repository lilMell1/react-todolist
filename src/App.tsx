import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './components/Task';
import TaskAdder from './components/TaskAdder';
import './App.css';
import { RootState, AppDispatch } from './store/store';
import { addTask, deleteTask, toggleComplete } from './store/taskSlice';

interface Task {
  taskInfo: string;  // The description of the task
  completed: boolean;  // Whether the task is completed or not
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
      storedTasks.forEach((task: Task) => dispatch(addTask(task))); // Dispatch each task to add it to the Redux store
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

  // Handler to delete a task by its index
  const handleDeleteTask = (index: number) => {
    dispatch(deleteTask(index)); // Dispatch action to delete the task from the Redux store
  };

  // Handler to toggle the completion status of a task by its index
  const handleToggleComplete = (index: number) => {
    dispatch(toggleComplete(index)); // Dispatch action to toggle the task's completed status
  };

  return (
    <div className='container'>
      <TaskHeader tasksAmount={tasksAmount} /> {/* Component displaying the number of pending tasks */}
      <div className='tasks-container'>
        {/* Render each task in the tasks array */}
        {tasks.map((task, index) => (
          <Task 
            key={index}  // Unique key for each task based on its index
            taskInfo={task.taskInfo}  // Pass task description as a prop
            completed={task.completed} // Pass task completion status as a prop
            deleteTask={() => handleDeleteTask(index)}  // Pass delete handler as a prop
            toggleComplete={() => handleToggleComplete(index)} // Pass toggle completion handler as a prop
          />
        ))}
      </div>
      <TaskAdder addTask={handleAddTask} /> {/* Component to add a new task */}
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
