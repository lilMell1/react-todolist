import React from 'react';

interface TaskFilterProps {
  handleFilterChange: (filter: 'all' | 'completed' | 'notFinished') => void;
  activeFilter: 'all' | 'completed' | 'notFinished'; 
};

const TaskFilter: React.FC<TaskFilterProps> = ({ handleFilterChange, activeFilter }) => {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} //active is enabeling the white border around the pressed button
        onClick={() => handleFilterChange('all')}
      >
        Show All
      </button>
      <button
        className={`filter-button ${activeFilter === 'completed' ? 'active' : ''}`}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={`filter-button ${activeFilter === 'notFinished' ? 'active' : ''}`}
        onClick={() => handleFilterChange('notFinished')}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
