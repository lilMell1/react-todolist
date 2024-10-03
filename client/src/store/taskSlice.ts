import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './store'; // Assuming you have set up your store and AppDispatch

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

export const fetchTasks: (navigate: (path: string) => void) => (dispatch: AppDispatch) => Promise<void> = (navigate) => {
  return async (dispatch: AppDispatch) => {
    try {
      // Make the request to the API to fetch tasks
      const response = await axios.get('http://localhost:3001/api/tasks', { withCredentials: true });
      
      // Handle 200 OK - Dispatch tasks to the Redux store
      const tasks = response.data;
      dispatch(loadTasks(tasks));

    } catch (error: any) {
      const status = error.response?.status;

      // Handle 401 User not found, redirect to login (from the controller)
      if (status === 401) {
        console.error('User not found, redirecting to login');
        navigate('/login');  // Redirect to login if user is not found (401)
      
      // Handle 500 Server error
      } else if (status === 500) {
        console.error('Server error: Failed to fetch tasks');
        // Optionally, you can dispatch an error state or show a notification
      } else {
        // Handle other unexpected errors
        console.error('Unexpected error:', error);
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
