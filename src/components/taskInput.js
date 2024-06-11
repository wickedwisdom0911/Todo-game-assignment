import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { TextField, Button, Box } from '@mui/material';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
      <TextField
        label="Add a new task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ ml: 2 }}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskInput;
