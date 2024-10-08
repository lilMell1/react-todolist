import { useState, useRef, useEffect } from 'react';
import { Taskprops } from '../interfaces/Task.interface';

export const useTaskFilter = (tasksArray: Taskprops[]) => {
  const [displayedTasks, setDisplayedTasks] = useState<Taskprops[]>([]);
  const [tasksAmount, setTaskAmount] = useState<number>(0);
  const activeFilter = useRef<'all' | 'completed' | 'notFinished'>('all');

  // Define the function to update displayed tasks
  const updateDisplayedTasks = (filter: 'all' | 'completed' | 'notFinished') => {
    activeFilter.current = filter;
    let filteredTasks: Taskprops[] = [];

    if (filter === 'all') filteredTasks = tasksArray;
    else if (filter === 'completed') filteredTasks = tasksArray.filter(task => task.completed);
    else if (filter === 'notFinished') filteredTasks = tasksArray.filter(task => !task.completed);

    setDisplayedTasks(filteredTasks);
    setTaskAmount(tasksArray.filter(task => !task.completed).length);
  };

  // Run the update logic initially and when tasksArray changes
  useEffect(() => {
    updateDisplayedTasks(activeFilter.current); // Apply the default filter on load
  }, [tasksArray]);

  // Return the necessary values and functions
  return { displayedTasks, tasksAmount, activeFilter, updateDisplayedTasks };
};
