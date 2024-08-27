import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskAdder from './components/TaskAdder';
import './App.css';
import { RootState } from './store/store';
import TaskChooser from './components/TaskChooser';
import TaskFilter from './components/TaskFilter';

type Task = {
  taskInfo: string;
  completed: boolean;
  id: string;
};

function App() {
  const tasks = useSelector((state: RootState) => state.taskArray);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'notFinished'>('all');

  const tasksAmount = tasks.filter(task => !task.completed).length;
  console.log("Pending tasks count:", tasksAmount);

  useEffect(() => {
    if (activeFilter === 'all') {
      setDisplayedTasks(tasks);
    } else if (activeFilter === 'completed') {
      setDisplayedTasks(tasks.filter(task => task.completed));
    } else if (activeFilter === 'notFinished') {
      setDisplayedTasks(tasks.filter(task => !task.completed));
    }
  }, [tasks, activeFilter]);

  const showAll = () => {
    setDisplayedTasks(tasks);
    setActiveFilter('all');
  };

  const showCompleted = () => {
    setDisplayedTasks(tasks.filter(task => task.completed));
    setActiveFilter('completed');
  };

  const showOnlyNotFinished = () => {
    setDisplayedTasks(tasks.filter(task => !task.completed));
    setActiveFilter('notFinished');
  };

  return (
    <div style={{height: '100vh', width:'100vw',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <TaskFilter 
        showAll={showAll} 
        showCompleted={showCompleted} 
        showOnlyNotFinished={showOnlyNotFinished} 
        activeFilter={activeFilter}
      />
      <div className='container'>
        <TaskHeader tasksAmount={tasksAmount} />
        <TaskChooser tasks={displayedTasks} />
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
