import React from 'react';

type TaskFilterProps = {
  showAll: () => void;
  showCompleted: () => void;
  showOnlyNotFinished: () => void;
  activeFilter: 'all' | 'completed' | 'notFinished';
};

const TaskFilter: React.FC<TaskFilterProps> = ({ showAll, showCompleted, showOnlyNotFinished, activeFilter }) => {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={showAll}
      >
        Show All
      </button>
      <button
        className={`filter-button ${activeFilter === 'completed' ? 'active' : ''}`}
        onClick={showCompleted}
      >
        Show Completed
      </button>
      <button
        className={`filter-button ${activeFilter === 'notFinished' ? 'active' : ''}`}
        onClick={showOnlyNotFinished}
      >
        Show Not Finished
      </button>
    </div>
  );
};

export default TaskFilter;
