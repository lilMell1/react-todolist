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
  const [tasksAmount, setTaskAnount] = useState(0);  // Displayed filtered tasks
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch tasks and validate the JWT
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);  // Set loading to true before starting the fetch
  
      await dispatch(fetchTasks(navigate)).catch((error) => {
        console.error("Error fetching tasks:", error);  // Handle errors
      });
  
      setIsLoading(false);  // Set loading to false after fetch (or error)
    };
  
    loadTasks();  // Call the async function to load tasks
  }, [dispatch, navigate]);

  // Update displayed tasks when the tasks array changes
  useEffect(() => {
    if (!isLoading) {  // Ensure tasks are updated only when loading is complete (key point! manages flash problem)
      updateDisplayedTasks(activeFilter.current);
      setTaskAnount(tasksArray.filter(task => !task.completed).length);
    }  }, [tasksArray]); // when the tasks get FETCHED it will render again , (tasks array is empty at start in store)

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
