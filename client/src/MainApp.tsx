import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirect
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskAdder from './components/TaskAdder';
import { Taskprops } from './components/Task';
import { RootState, AppDispatch } from './store/store';
import { fetchTasks } from './store/taskSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import './css/MainApp.css'; 

const MainApp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [displayedTasks, setDisplayedTasks] = useState<Taskprops[]>([]);  // Displayed filtered tasks
  const activeFilter = useRef<'all' | 'completed' | 'notFinished'>('all');  // Track current filter
  const tasksArray: Taskprops[] = useSelector((state: RootState) => state.tasks.taskArray);
  const tasksAmount: number = tasksArray.filter(task => !task.completed).length;  // Count incomplete tasks

  // Fetch tasks and validate the JWT
  useEffect(() => {
    dispatch(fetchTasks(navigate));  // Pass navigate to the thunk for redirect on auth error
  }, [dispatch, navigate]);

  // Function to update displayed tasks based on the selected filter
  const updateDisplayedTasks = (filter: 'all' | 'completed' | 'notFinished') => {
    activeFilter.current = filter;
    let filteredTasks: Taskprops[] = [];

    switch (filter) {
      case 'all':
        filteredTasks = tasksArray;
        break;
      case 'completed':
        filteredTasks = tasksArray.filter(task => task.completed);
        break;
      case 'notFinished':
        filteredTasks = tasksArray.filter(task => !task.completed);
        break;
      default:
        filteredTasks = tasksArray;
    }

    setDisplayedTasks(filteredTasks);  // Update displayed tasks
  };

  // Update displayed tasks when the tasks array changes
  useEffect(() => {
    updateDisplayedTasks(activeFilter.current);
  }, [tasksArray]);

  return (
    <div className='mainapp-body'>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TaskFilter handleFilterChange={updateDisplayedTasks} activeFilter={activeFilter.current} />
        <div className='mainapp-container'>
          <TaskHeader tasksAmount={tasksAmount} />
          <TaskList tasks={displayedTasks} />  
          <TaskAdder />  
        </div>
      </div>
    </div>
  );
};

export default MainApp;

// A simple header component to show the number of pending tasks
const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1>
  </div>
);
