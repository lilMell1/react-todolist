import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { Props } from './Task';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTaskReducer } from '../store/taskSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface TaskAdderProps {
  userId: string;
}

const TaskAdder: React.FC<TaskAdderProps> = ({ userId }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const navigate = useNavigate(); // Hook for navigation

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      try {
        // Send the new task to the server
        const response = await axios.post<Props>(`http://localhost:3001/api/users/${userId}/tasks`, { title: inputValue });
        
        // Check if the response status is successful
        if (response.status === 201 && response.data) {
          // Dispatch the newly created task from the server response
          dispatch(addTaskReducer(response.data));
          
          setInputValue('');
        } else {
          // Handle any unexpected response
          alert('There was an error creating your task!');
        }
      } catch (error:any) {
        // Log the error and alert the user
        if (error.response?.status === 404) { // 404 means the user is not found (likely the user was deleted while logged in)
          alert('User not found. Redirecting to login...');
          // Redirect the user to the login page
          navigate('/login');
        } else {  // no error.response from the server, might be a network error or another issue
          console.error('Error adding task:', error);
          alert('Failed to add task. Please try again later.');
        }
      }
    }
  };
  return (
    <div style={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input
        className="mainapp-input-info"
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
