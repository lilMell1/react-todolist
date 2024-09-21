import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { Taskprops } from './Task';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { addTaskReducer } from '../store/taskSlice';

interface TaskAdderProps {
  userId: string;
}

const TaskAdder: React.FC<TaskAdderProps> = ({ userId }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      try {
        // Send the new task to the server
        const response = await axios.post(`http://localhost:3001/api/users/${userId}/tasks`, { title: inputValue });
        
        dispatch(addTaskReducer(response.data));

        setInputValue('');  // Clear input field
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };
  return (
    <div style={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input
        className="input-info"
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
