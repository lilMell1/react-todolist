import React, { useState, KeyboardEvent } from 'react'; //{named exports}, default exports
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTask } from '../store/taskSlice'; // Import your addTask action
import { Task } from './Task';

const TaskAdder: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newTask: Task = { id: new Date().toISOString(), taskInfo: inputValue, completed: false }; // Create a new task object
      dispatch(addTask(newTask)); // Dispatch action to add the new task to the Redux store
      setInputValue(''); // Clear input field
    }
  };

  return (
    <div style={{height:'15%' ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <input
        className='input-info'
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task and press Enter"
      />
    </div>

  );
};

export default TaskAdder;
