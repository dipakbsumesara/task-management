// apps/task-manager-frontend/src/app/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import { Alert, Button, Grid, Snackbar, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';

import { ITask } from 'index';
import { getApi, removeApi } from '../services/axios.service';
import { getTaskColorCode } from '../constants/index';

import { objectCopy } from '../../../../src/lib/utils/util';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'title', headerName: 'Title', width: 500 },
  { field: 'description', headerName: 'Description', width: 400 },
  { field: 'status', headerName: 'Status', width: 100 },
];

interface ITaskTable extends ITask {
  id: string;
}

const TaskList = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<ITaskTable[]>([]);
  const [tasksToUpdate, setTasksToUpdate] = useState<ITask[]>([]);

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

  const rows = [
    { id: 1, title: 'Snow', description: 'Jon', status: 'To Do' },
    { id: 2, title: 'Lannister', description: 'Cersei', status: 'To Do' },
    { id: 3, title: 'Lannister', description: 'Jaime', status: 'To Do' },
    { id: 4, title: 'Stark', description: 'Arya', status: 'To Do' },
    { id: 5, title: 'Targaryen', description: 'Daenerys', status: 'To Do' },
    { id: 6, title: 'Melisandre', description: null, status: 'To Do' },
    { id: 7, title: 'Clifford', description: 'Ferrara', status: 'To Do' },
    { id: 8, title: 'Frances', description: 'Rossini', status: 'To Do' },
    { id: 9, title: 'Roxie', description: 'Harvey', status: 'To Do' },
  ];

  const handleCheckboxSelection = (selected: ITaskTable) => {
    const updatedTasksToUpdate: ITaskTable[] = objectCopy(tasksToUpdate);

    const alreadyExistsIndex = updatedTasksToUpdate.findIndex(
      (task) => task.id === selected.id
    );

    if (alreadyExistsIndex !== -1) {
      updatedTasksToUpdate.splice(alreadyExistsIndex, 1);
    } else {
      updatedTasksToUpdate.push({ ...selected });
    }

    setTasksToUpdate(updatedTasksToUpdate);
  };

  return (
    <>
      <Grid item sx={{ width: '100%', textAlign: 'right' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate('/task')}
          sx={{ mb: 2 }}
        >
          Create new task
        </Button>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={(e) => {
          handleCheckboxSelection(e.row);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={tasksToUpdate.length > 0}
        onClose={() => {}}
      >
        <Alert
          severity="info"
          sx={{
            display: 'flex',
            backgroundColor: 'black',
            color: 'white',
            alignItems: 'center',
            '&>.MuiAlert-action': {
              p: 0,
            },
            '&>.MuiAlert-message': {
              mr: 4,
            },
          }}
          action={
            <React.Fragment>
              {tasksToUpdate.length === 1 ? (
                <Button color="primary">Edit</Button>
              ) : (
                <></>
              )}
              <Button color="error">Delete</Button>
            </React.Fragment>
          }
        >
          <Typography sx={{ mr: 3 }}>
            {tasksToUpdate.length} {tasksToUpdate.length > 1 ? 'tasks' : 'task'}{' '}
            selected!
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskList;
