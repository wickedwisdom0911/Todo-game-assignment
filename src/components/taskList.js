import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask, toggleTaskCompletion } from '../redux/taskSlice';
import {
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField, Button, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// TaskList component
const TaskList = () => {
  // Selecting tasks from Redux store
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch(); // Dispatch function to dispatch actions
  const [open, setOpen] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null); 
  const [updatedText, setUpdatedText] = useState(''); 

  // Function to handle opening edit dialog
  const handleEditOpen = (task) => {
    setCurrentTask(task); // Setting the currently edited task
    setUpdatedText(task.text); // Setting the updated text to current task's text
    setOpen(true); // Opening the dialog
  };

  // Function to handle closing edit dialog
  const handleEditClose = () => {
    setOpen(false); // Closing the dialog
  };

  // Function to handle saving edited task
  const handleEditSave = () => {
    if (currentTask && updatedText.trim()) { // Checking if there's a task and updated text is not empty
      dispatch(updateTask({ id: currentTask.id, text: updatedText })); // Dispatching update task action
      handleEditClose(); // Closing the dialog
    }
  };

  return (
    <Box>
      {/* Rendering the list of tasks */}
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            {/* Checkbox to toggle task completion */}
            <Checkbox
              checked={task.completed}
              onChange={() => dispatch(toggleTaskCompletion(task.id))}
            />
            {/* Displaying task text with conditional styling */}
            <ListItemText
              primary={task.text}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            {/* Actions for editing and deleting task */}
            <ListItemSecondaryAction>
              {/* Edit button */}
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(task)}>
                <EditIcon />
              </IconButton>
              {/* Delete button */}
              <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTask(task.id))}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* Dialog for editing task */}
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your task below:
          </DialogContentText>
          {/* Text field for editing task */}
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        </DialogContent>
        {/* Actions for dialog */}
        <DialogActions>
          {/* Cancel button */}
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          {/* Save button */}
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
