import { configureStore } from '@reduxjs/toolkit'; 
import tasksReducer from './taskSlice'; 

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks'); // Getting tasks from localStorage
    if (serializedState === null) {
      return []; // Returning an empty array if there are no tasks in localStorage
    }
    return JSON.parse(serializedState); 
  } catch (err) {
    return []; // Returning an empty array in case of an error
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state); // Stringifying the state
    localStorage.setItem('tasks', serializedState); // Saving the state to localStorage
  } catch (err) {
    // Handle errors if any
  }
};

// Configuring the Redux store
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Adding tasksReducer to the store
  },
  preloadedState: {
    tasks: loadState(), // Loading tasks from localStorage as preloaded state
  },
});

// Subscribing to store changes to save state to localStorage
store.subscribe(() => {
  saveState(store.getState().tasks); // Saving tasks to localStorage whenever store state changes
});

export default store; 
