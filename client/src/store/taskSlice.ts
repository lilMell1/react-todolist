import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './store'; // Assuming you have set up your store and AppDispatch

// Define the Task interface
interface Task {
  _id: string;
  title: string;
  completed: boolean;
  userId: string;
}

// Define the initial state interface
interface TaskState {
  taskArray: Task[];
}

// Initial state
const initialState: TaskState = {
  taskArray: [],
};

// Thunk for fetching tasks manually 
export const fetchTasks = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    console.log("loading tasks");
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${userId}/tasks`);
      const tasks = response.data;
      dispatch(loadTasks(tasks)); // Dispatch success action
    } catch (error: any) {
      return (error.message); // Dispatch failure action
    }
  };
};

// The slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks(state, action: PayloadAction<Task[]>) {
      state.taskArray = action.payload;
    },
    addTaskReducer(state, action: PayloadAction<Task>) {
      state.taskArray.push(action.payload);
    },
    deleteTaskReducer(state, action: PayloadAction<string>) {
      state.taskArray = state.taskArray.filter((task) => task._id !== action.payload);
    },
    toggleCompleteReducer(state, action: PayloadAction<string>) {
      const task = state.taskArray.find((task) => task._id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// Export actions for use in components
export const { loadTasks, addTaskReducer, toggleCompleteReducer, deleteTaskReducer } =
  taskSlice.actions;

// Export the reducer for store configuration
export default taskSlice.reducer;
