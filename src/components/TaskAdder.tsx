import React, { useState, KeyboardEvent } from 'react';

interface TaskAdderProps {
  addTask: (task: string) => void;
}

const TaskAdder: React.FC<TaskAdderProps> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      addTask(inputValue);
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
