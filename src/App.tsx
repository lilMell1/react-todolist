import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskAdder from './components/TaskAdder';
import './App.css';
import { RootState } from './store/store';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import {Task} from './components/Task';

function App() {
  const tasks = useSelector((state: RootState) => state.taskArray);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);
  const activeFilter = useRef<'all' | 'completed' | 'notFinished'>('all');

  const tasksAmount = tasks.filter(task => !task.completed).length;
  console.log("Pending tasks count:", tasksAmount);

  const updateDisplayedTasks = (filter: 'all' | 'completed' | 'notFinished') => {
    activeFilter.current = filter;

    switch (filter) {
      case 'all':
        setDisplayedTasks(tasks);
        break;
      case 'completed':
        setDisplayedTasks(tasks.filter(task => task.completed));
        break;
      case 'notFinished':
        setDisplayedTasks(tasks.filter(task => !task.completed));
        break;
      default:
        setDisplayedTasks(tasks);
    }
  };

  useEffect(() => {
    updateDisplayedTasks(activeFilter.current);
  }, [tasks]); // Re-renders when tasks change, for example if i delete or add it needs to filter the displayedTasks again.

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <TaskFilter
        handleFilterChange={updateDisplayedTasks}
        activeFilter={activeFilter.current}
      />
      <div className='container'>
        <TaskHeader tasksAmount={tasksAmount} />
        <TaskList tasks={displayedTasks} />
        <TaskAdder />
      </div>
    </div>
  );
}

const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1>
  </div>
);

export default App;
