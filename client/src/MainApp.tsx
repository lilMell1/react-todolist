import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate for redirect
import axios from 'axios';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskAdder from './components/TaskAdder';
import { Task } from './components/Task';

const MainApp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};  // Get userId from the passed state
  
  const [tasks, setTasks] = useState<Task[]>([]);  // Manage tasks
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);  // Displayed filtered tasks
  const activeFilter = useRef<'all' | 'completed' | 'notFinished'>('all');  // Track current filter
  const tasksAmount = tasks.filter(task => !task.completed).length;  // Count incomplete tasks

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) {
        navigate('/login');  // Redirect to login if no userId is found
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}/tasks`);
        setTasks(response.data);  // Set fetched tasks in state
        setDisplayedTasks(response.data);  // Initially, show all tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);  // Log error if fetching fails
      }
    };

    fetchTasks();  // Call the function on component mount
  }, [userId, navigate]);

  // Function to update displayed tasks based on the selected filter
  const updateDisplayedTasks = (filter: 'all' | 'completed' | 'notFinished') => {
    activeFilter.current = filter;
    let filteredTasks: Task[] = [];
    
    switch (filter) {
      case 'all':
        filteredTasks = tasks;
        break;
      case 'completed':
        filteredTasks = tasks.filter(task => task.completed);
        break;
      case 'notFinished':
        filteredTasks = tasks.filter(task => !task.completed);
        break;
      default:
        filteredTasks = tasks;
    }

    setDisplayedTasks(filteredTasks);  // Update displayed tasks
  };

  // Update displayed tasks when the tasks array changes
  useEffect(() => {
    updateDisplayedTasks(activeFilter.current);
  }, [tasks]);

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <TaskFilter handleFilterChange={updateDisplayedTasks} activeFilter={activeFilter.current} />
      <div className='container'>
        <TaskHeader tasksAmount={tasksAmount} />
        <TaskList tasks={displayedTasks} setTasks={setTasks} userId={userId} />  {/* Pass setTasks to TaskList */}
        <TaskAdder userId={userId} setTasks={setTasks} />  {/* Pass setTasks to TaskAdder */}
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
