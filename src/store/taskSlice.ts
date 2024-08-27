import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Task from "../components/Task";
import { act } from "react";


interface Task {
    taskInfo: string;
    completed: boolean;
    id: string;
};

interface Task {
    taskInfo: string;
    completed: boolean;
};

type TaskArray = {
    taskArray: Task[];
};

const initialState: TaskArray = {
    taskArray: []
};


// This is where we define how tasks are managed
const taskSlice = createSlice({
    name: "slice",  // Just a label to identify this part of the code
    initialState,   // Starts with the empty list of tasks defined above
    reducers: {
        // This function adds a new task to the list
        addTask(state: TaskArray, action: PayloadAction<Task>) { //sends the state if the store and the payload of the thing i want to change
            state.taskArray.push(action.payload); // Adds the new task to the list
        },

        deleteTask(state: TaskArray, action: PayloadAction<string>) {
            state.taskArray = state.taskArray.filter(task =>  task.id !== action.payload); // Removes one task at the given position
        },

        toggleComplete(state: TaskArray, action: PayloadAction<string>) {
            const currTask = state.taskArray.find(task => task.id === action.payload)!; // Finds the task at the given position
            currTask.completed = !currTask.completed; // Changes the task from done to not done, or vice versa         
        },
      
        
    }
});

// These are the functions (addTask, deleteTask, toggleComplete) that other parts of the app will use to change the tasks
export const { addTask, deleteTask, toggleComplete } = taskSlice.actions;

// This is the part of the code that will actually handle all the task-related changes in the app, exports the new taskArray
export default taskSlice.reducer;


/**
 * This defines how tasks are managed in the application using Redux Toolkit.
 * 
 * 1. **State:**
 *    - The state is the current "snapshot" of all the data your application is managing.
 *    - In this context,in addTask the state includes an array of tasks (`taskArray`), where each task has details like its description and whether it’s completed or not.
 *    - The state is what you see at any given moment in the app – it’s the current list of all tasks.
 * 
 * 2. **Action:**
 *    - An action is an object that tells the Redux store what you want to do.
 *    - Every action has a `type`, which is a string describing what kind of change you want to make (e.g., "add a task").
 *    - Actions are like instructions sent to the state saying, "Hey, do this!"
 * 
 * 3. **Action Payload:**
 *    - The action payload is the extra information that comes with an action.
 *    - For example, when you add a new task, the payload would include the details of that task (like its description and whether it’s completed).
 *    - Think of the payload as the data that the action needs to perform its job.
 * 
 * In the context of this file:
 * - The `addTask` function (a reducer) uses the action’s payload (a new task) to update the state (the task list) by adding this new task.
 * - The `deleteTask` function uses the action’s payload (an index) to remove a task from the state at that specific position.
 * - The `toggleComplete` function uses the action’s payload (an index) to flip the completion status of a task in the state.
 */

/* 
When you dispatch an action (e.g., by calling a reducer function) from a component, it updates the Redux store's state.
This update to the store's state can trigger a re-render of any component that subscribes to the relevant part of the state.

*/