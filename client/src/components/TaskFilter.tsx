import React from 'react';
import {TaskFilterProps} from '../interfaces/TaskFilter.interface'

const TaskFilter: React.FC<TaskFilterProps> = ({ handleFilterChange, activeFilter }) => {
 
  return (
    <div className="tasksPage-filter-buttons">
      <button
        className={`tasksPage-filter-button ${activeFilter === 'all' ? 'active' : ''}`} 
        onClick={() => handleFilterChange('all')}
      >
        Show All
      </button>
      <button
        className={`tasksPage-filter-button ${activeFilter === 'completed' ? 'active' : ''}`}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={`tasksPage-filter-button ${activeFilter === 'notFinished' ? 'active' : ''}`}
        onClick={() => handleFilterChange('notFinished')}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
