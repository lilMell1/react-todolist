export interface TaskFilterProps {
    handleFilterChange: (filter: 'all' | 'completed' | 'notFinished') => void;
    activeFilter: 'all' | 'completed' | 'notFinished';
  }