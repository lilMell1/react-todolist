import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { Task } from './Task';

interface TaskAdderProps {
  userId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;  // Function to update the task list
}

const TaskAdder: React.FC<TaskAdderProps> = ({ userId, setTasks }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      try {
        // Send the new task to the server
        const response = await axios.post(`http://localhost:3001/api/users/${userId}/tasks`, { title: inputValue });
        
        // Add the new task (response.data) to the list
        setTasks(prevTasks => [...prevTasks, response.data]);

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
