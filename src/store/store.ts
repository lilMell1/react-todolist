import { configureStore } from "@reduxjs/toolkit";
import reducer from "./taskSlice"; // This is the part of the code that manages tasks (called a reducer)

// Setting up the store where all your app's data (state) is kept
const store = configureStore({
    // Here, we tell the store to use our tasks manager (reducer) to handle anything related to tasks
    reducer: {
        tasks: reducer, // This means our tasks will be managed under a section called `tasks`
    },
});

export default store; // We export the store so the rest of the app can use it

// This creates a type (kind of like a label) that represents the whole state (data) of the store
export type RootState = ReturnType<typeof store.getState>;

// This creates a type for the `dispatch` function, which is used to send instructions (actions) to change the state
export type AppDispatch = typeof store.dispatch;
