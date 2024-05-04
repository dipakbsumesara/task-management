// apps/task-manager-frontend/src/app/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';

import { patchApi, postApi } from '../services/axios.service';

import { ITask } from '../../../../index';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';

type Props = {
  taskToUpdate: any;
  setTaskToUpdate: any;
  fetchTasks: any;
};

const TaskForm = ({ taskToUpdate, setTaskToUpdate, fetchTasks }: Props) => {
  const [task, setTask] = useState<ITask>({
    title: '',
    description: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (taskToUpdate) setTask(taskToUpdate);
  }, [taskToUpdate]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = taskToUpdate ? `/tasks/${task._id}` : '/tasks';

    taskToUpdate ? await patchApi(url, task) : await postApi(url, task);

    fetchTasks();
    setTaskToUpdate(null);
    setTask({
      title: '',
      description: '',
      status: 'To Do',
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid
        container
        sx={{ flexDirection: 'column', alignItems: 'baseline', gap: 2, border: "1px solid #efefef", borderRadius: "5px", px: 4, py: 2 }}
      >
        <TextField
          type="text"
          name="title"
          value={task.title}
          onChange={(e) => handleChange(e)}
          placeholder="Title"
          required
        />
        <TextField
          multiline={true}
          rows={3}
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Select name="status" value={task.status} onChange={handleChange}>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
        <Button type="submit" variant='contained' color={taskToUpdate ? 'primary' : 'success'}>
          {taskToUpdate ? 'Update Task' : 'Create Task'}
        </Button>
      </Grid>
    </form>
  );
};

export default TaskForm;
