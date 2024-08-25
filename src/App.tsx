import React from 'react';
import { useSelector } from 'react-redux';
import Task from './components/Task';
import TaskAdder from './components/TaskAdder';
import './App.css';
import { RootState } from './store/store';


function App() {
  const tasks = useSelector((state: RootState) => state.taskArray); // Access taskArray directly from the root state

  const tasksAmount = tasks.filter(task => !task.completed).length;
  console.log("Pending tasks count:", tasksAmount);

  return (
    <div className='container'>
      <TaskHeader tasksAmount={tasksAmount} />
      <div className='tasks-container'>
        {tasks.map((task, index) => (
          <Task 
            taskInfo={task.taskInfo}  
            completed={task.completed}
            key={index}
            index={index}
          />
        ))}
      </div>
      <TaskAdder />
    </div>
  );
}

const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1>
  </div>
);

export default App;
