import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './store'; // Assuming you have set up your store and AppDispatch
import { useNavigate } from 'react-router-dom';
// Define the Task interface
interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

// Define the initial state interface
interface TaskState {
  taskArray: Task[];
}

// Initial state
const initialState: TaskState = {
  taskArray: [],
};

// Thunk for fetching tasks (with JWT)
export const fetchTasks = (navigate: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    console.log('Loading tasks...');
    try {
      // Fetch tasks using JWT stored in cookies
      const response = await axios.get('http://localhost:3001/api/tasks', { withCredentials: true });
      const tasks = response.data;

      // Dispatch the fetched tasks to the Redux store
      dispatch(loadTasks(tasks));
    } catch (error: any) {
      console.error('Error fetching tasks:', error);

      // Handle authentication errors and redirect to login if token is invalid or expired
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('Authentication error. Redirecting to login...');
        navigate('/login');  // Redirect to login
      }
    }
  };
};

// The slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Load tasks into the state
    loadTasks(state, action: PayloadAction<Task[]>) {
      state.taskArray = action.payload;
    },

    // Add new task to the state
    addTaskReducer(state, action: PayloadAction<Task>) {
      state.taskArray.push(action.payload);
    },

    // Delete a task from the state
    deleteTaskReducer(state, action: PayloadAction<string>) {
      state.taskArray = state.taskArray.filter((task) => task._id !== action.payload);
    },

    // Toggle task completion status
    toggleCompleteReducer(state, action: PayloadAction<string>) {
      const task = state.taskArray.find((task) => task._id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// Export actions for use in components
export const { loadTasks, addTaskReducer, toggleCompleteReducer, deleteTaskReducer } = taskSlice.actions;

// Export the reducer for store configuration
export default taskSlice.reducer;
