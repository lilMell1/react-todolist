import React, { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTask } from '../store/taskSlice'; // Import your addTask action

interface Task {
  taskInfo: string;  
  completed: boolean; 
  // index is not here because it's not a part of the task data itself
}

const TaskAdder: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newTask: Task = { taskInfo: inputValue, completed: false }; // Create a new task object
      dispatch(addTask(newTask)); // Dispatch action to add the new task to the Redux store
      setInputValue(''); // Clear input field
    }
  };

  return (
    <input
      className='input-info'
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Add a new task and press Enter"
    />
  );
};

export default TaskAdder;
