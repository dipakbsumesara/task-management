// apps/task-manager-frontend/src/app/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';

import { ITask } from 'index';
import { getApi, removeApi } from '../services/axios.service';
import { getTaskColorCode } from '../constants/index';

import { objectCopy } from '../../../../src/lib/utils/util';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 150,
    filterable: false,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    resizable: false,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 500,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 400,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    filterable: false,
    disableColumnMenu: true,
  },
];

interface ITaskTable extends ITask {
  id: string;
}

const CreateNewTask = () => {
  const navigate = useNavigate();
  return (
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
  );
};

type SearchBySection = {
  searchQuery: string;
  setSearchQuery: any;
};

const SearchBySection = ({ searchQuery, setSearchQuery }: SearchBySection) => {
  return (
    <Grid
      container
      sx={{ flexDirection: 'row', gap: 2, alignItems: 'center', mb: 3, width: "fit-content" }}
    >
      <TextField onChange={(e) => setSearchQuery(e.target.value)} placeholder='Start typing to begin search' sx={{ width: "400px" }}></TextField>
    </Grid>
  );
};

type FilterBySection = {
  filterBySelectedStatus: string;
  setFilterBySelectedStatus: any;
};

const FilterBySection = ({
  filterBySelectedStatus,
  setFilterBySelectedStatus,
}: FilterBySection) => {
  return (
    <Grid
      container
      sx={{ flexDirection: 'row', gap: 2, alignItems: 'center', mb: 3, width: "fit-content" }}
    >
      <Typography>Filter By: </Typography>
      <Select
        value={filterBySelectedStatus}
        onChange={(e) => {
          setFilterBySelectedStatus(e.target.value);
        }}
        renderValue={(selected) =>
          !selected ? 'Select Status to filter' : selected
        }
        displayEmpty
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
    </Grid>
  );
};

const TaskList = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<ITaskTable[]>([]);
  const [tasksToUpdate, setTasksToUpdate] = useState<ITaskTable[]>([]);
  const [filterBySelectedStatus, setFilterBySelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [filterBySelectedStatus]);

  const fetchTasks = async () => {
    setTasksToUpdate([]);
    const response = filterBySelectedStatus
      ? await getApi(
          `/tasks?filterBy=status&filterValue=${filterBySelectedStatus}`
        )
      : await getApi('/tasks');
    setTasks(
      response.data.data.map((task: ITask, index: number) => {
        return { ...task, id: index + 1 };
      })
    );
  };

  const handleDelete = async () => {
    await removeApi('/tasks', { ids: tasksToUpdate.map((task) => task._id) });
    fetchTasks();
  };

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
      <CreateNewTask />

      <Grid
        container
        sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <SearchBySection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <FilterBySection
          filterBySelectedStatus={filterBySelectedStatus}
          setFilterBySelectedStatus={setFilterBySelectedStatus}
        />
      </Grid>

      <Grid item sx={{ height: '500px' }}>
        <DataGrid
          rows={tasks}
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
          rowSelectionModel={tasksToUpdate as any}
          checkboxSelection
        />
      </Grid>

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
              <Button
                color="primary"
                onClick={() => navigate(`/task/${tasksToUpdate[0]._id}`)}
                disabled={tasksToUpdate.length > 1}
              >
                Edit
              </Button>
              <Button color="error" onClick={handleDelete}>
                Delete
              </Button>
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
