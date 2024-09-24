import React from 'react';
import { useEffect } from 'react';
interface TaskFilterProps {
  handleFilterChange: (filter: 'all' | 'completed' | 'notFinished') => void;
  activeFilter: string;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ handleFilterChange, activeFilter }) => {
 
  return (
    <div className="mainapp-filter-buttons">
      <button
        className={`mainapp-filter-button ${activeFilter === 'all' ? 'active' : ''}`} 
        onClick={() => handleFilterChange('all')}
      >
        Show All
      </button>
      <button
        className={`mainapp-filter-button ${activeFilter === 'completed' ? 'active' : ''}`}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={`mainapp-filter-button ${activeFilter === 'notFinished' ? 'active' : ''}`}
        onClick={() => handleFilterChange('notFinished')}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
