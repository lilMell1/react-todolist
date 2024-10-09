import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { Taskprops } from '../interfaces/Task.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTaskReducer } from '../store/taskSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const API_URL:string|undefined = process.env.REACT_APP_API_BASE_URL;

const TaskAdder: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const navigate = useNavigate(); // Hook for navigation

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      try {
        const response = await axios.post<Taskprops>(
          `${API_URL}/tasks`, 
          { title: inputValue },
          { withCredentials: true } 
        );
        
          dispatch(addTaskReducer(response.data));       
          setInputValue('');  
      
      } catch (error: any) {
        if (error.response?.status === 404) { 
          alert('User not found. Redirecting to login...');
          navigate('/login');
        } else { 
          console.error('Error adding task:', error);
          alert('Failed to add task. Please try again later.');
        }
      }
    }
  };

  return (
    <div style={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input
        className="tasksPage-input-info"
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
