import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate for redirect
import axios from 'axios';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskAdder from './components/TaskAdder';
import { Task } from './components/Task';

const MainApp: React.FC = () => {
  const location = useLocation();  // Type the location state to include userId
  const navigate = useNavigate();  // Use navigate for redirect
  const { userId } = location.state || {};  // Extract userId from state or set it to undefined
  //console.log("userId from response:", userId);  // Debug log

  const [tasks, setTasks] = useState<Task[]>([]);  // Use internal state to manage tasks
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const activeFilter = useRef<'all' | 'completed' | 'notFinished'>('all');
  const tasksAmount = tasks.filter(task => !task.completed).length;

  // Place fetchTasks inside useEffect to fetch tasks when the component mounts
  useEffect(() => {
    // Define fetchTasks function inside useEffect
    const fetchTasks = async () => {
      if (!userId) {
        navigate('/login');  // Redirect to login if no userId is found
        return;
      }
    
      try {
        console.log(`Fetching tasks for userId: ${userId}`);  // Log the userId
        const response = await axios.get(`http://localhost:3001/api/users/${userId}/tasks`);
        console.log('Fetched tasks:', response.data);  // Log fetched tasks
        setTasks(response.data);  // Set tasks in state
        setDisplayedTasks(response.data);  // Set displayed tasks initially
      } catch (error) {
        console.error('Error fetching tasks:', error);  // Log full error response
      }
    };    

    fetchTasks();  // Call fetchTasks when component mounts
  }, [userId, navigate]);  // Dependency array: will re-run if userId or navigate changes

  // Function to update displayed tasks based on filter
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

    setDisplayedTasks(filteredTasks);
  };

  // Update displayed tasks when tasks array changes
  useEffect(() => {
    updateDisplayedTasks(activeFilter.current);
  }, [tasks]);

  return (
    <div  style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <TaskFilter handleFilterChange={updateDisplayedTasks} activeFilter={activeFilter.current} />
        <div className='container'>
          <TaskHeader tasksAmount={tasksAmount} />
          <TaskList tasks={displayedTasks} setTasks={setTasks} userId={userId} /> {/* Pass setTasks to TaskList */}
          <TaskAdder userId={userId} setTasks={setTasks} />
        </div>
    </div>
  );
};

export default MainApp;

const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1>
  </div>
);