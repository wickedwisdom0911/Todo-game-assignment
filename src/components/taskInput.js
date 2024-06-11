import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice'; // Importing the addTask action from Redux slice
import { TextField, Button, Box } from '@mui/material';

// TaskInput component for adding new tasks
const TaskInput = () => {
  const [task, setTask] = useState(''); // State for storing the task input value
  const dispatch = useDispatch(); // Dispatch function to dispatch actions

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (task.trim()) { // Checking if the task input is not empty
      dispatch(addTask(task)); // Dispatching the addTask action with the task text
      setTask(''); // Clearing the task input after adding the task
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
      {/* Text field for entering task */}
      <TextField
        label="Add a new task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      {/* Button to add task */}
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ ml: 2 }}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskInput;
