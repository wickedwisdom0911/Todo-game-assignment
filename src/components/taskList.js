import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask, toggleTaskCompletion } from '../redux/taskSlice';
import {
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField, Button, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const handleEditOpen = (task) => {
    setCurrentTask(task);
    setUpdatedText(task.text);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleEditSave = () => {
    if (currentTask && updatedText.trim()) {
      dispatch(updateTask({ id: currentTask.id, text: updatedText }));
      handleEditClose();
    }
  };

  return (
    <Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => dispatch(toggleTaskCompletion(task.id))}
            />
            <ListItemText
              primary={task.text}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTask(task.id))}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your task below:
          </DialogContentText>
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
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
