import { createSlice } from '@reduxjs/toolkit'; 


const tasksSlice = createSlice({
  name: 'tasks', 
  initialState: [], 
  reducers: {
 
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload }); // Adding a new task to the state
    },
    
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload); // Removing a task from the state
    },
 
    updateTask: (state, action) => {
      const { id, text } = action.payload; 
      const task = state.find(task => task.id === id); // Finding the task by id
      if (task) {
        task.text = text; // Updating the task's text
      }
    },
    // Reducer function to toggle task completion
    toggleTaskCompletion: (state, action) => {
      const task = state.find(task => task.id === action.payload); // Finding the task by id
      if (task) {
        task.completed = !task.completed; 
      }
    }
  },
});

// Exporting action creators
export const { addTask, deleteTask, updateTask, toggleTaskCompletion } = tasksSlice.actions;

// Exporting the reducer function
export default tasksSlice.reducer;
