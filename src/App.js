import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';
import { Container, Typography } from '@mui/material';


const App = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>
        <TaskInput />
        <TaskList />
      </Container>
    </Provider>
  );
};

export default App;
