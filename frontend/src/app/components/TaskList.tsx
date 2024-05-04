// apps/task-manager-frontend/src/app/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import TaskForm from './TaskForm';
import { ITask } from 'index';
import { getApi, removeApi } from '../services/axios.service';
import { getTaskColorCode } from '../constants/index';

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getApi('/tasks');
    setTasks(response.data);
  };

  const handleDelete = async (id: any) => {
    await removeApi(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <TaskForm
        taskToUpdate={taskToUpdate}
        setTaskToUpdate={setTaskToUpdate}
        fetchTasks={fetchTasks}
      />
      <Grid
        container
        sx={{
          my: 3,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          gap: 2,
        }}
      >
        {tasks.map((task) => (
          <Grid item key={`${task._id}`} sx={{ border: '1px solid #efefef' }}>
            <Grid
              item
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: 'solid 1px #efefef',
                p: '10px 14px',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h5">{task.title}</Typography>
              <Typography fontSize="12px" color={getTaskColorCode(task.status)}>
                {task.status}
              </Typography>
            </Grid>
            <Typography padding="10px 14px" margin="5px 0px">
              {task.description}
            </Typography>

            <Grid
              item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                borderTop: '1px solid #efefef',
              }}
            >
              <Button color="primary" onClick={() => setTaskToUpdate(task)}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDelete(task._id)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;
