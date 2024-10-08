import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskAdder from './components/TaskAdder';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { useFetchTasks } from './hooks/useFetchTasks';  // Import the custom hook
import { useTaskFilter } from './hooks/useTaskFilter';  // Import the custom hook
import './css/TasksPage.css'; 

const TasksPage: React.FC = () => {
  const tasksArray = useSelector((state: RootState) => state.tasks.taskArray);
  
  const isLoading = useFetchTasks();  // Fetch tasks with custom hook
  const { displayedTasks, tasksAmount, activeFilter, updateDisplayedTasks } = useTaskFilter(tasksArray);  // Handle filters with custom hook

  return (
    <div className='tasksPage-body'>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <TaskFilter handleFilterChange={updateDisplayedTasks} activeFilter={activeFilter.current} />
      <div className='tasksPage-container'>
          <TaskHeader tasksAmount={tasksAmount}  />
          <TaskList tasks={displayedTasks} isLoading={isLoading} />  
          <TaskAdder />  
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

const TaskHeader: React.FC<{ tasksAmount: number }> = ({ tasksAmount }) => (
  <div className='pending-text'>
    <h1>Pending tasks ({tasksAmount})</h1>
  </div>
);
