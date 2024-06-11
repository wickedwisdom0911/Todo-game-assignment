import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {

  }
};

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: loadState(),
  },
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export default store;
