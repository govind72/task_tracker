import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      onAddTask({ name: taskName, dateAdded: new Date(), completed: false });
      setTaskName('');
    }
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={8}>
        <TextField
          label="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <Button variant="contained" color="primary" size='small' margin="normal" onClick={handleAddTask}>
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
