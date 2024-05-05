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

import useDebounce from '../hooks/useDebounce';

import { objectCopy, formatDate } from '../../../../src/lib/utils/util';

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
    width: 400,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    filterable: false,
    disableColumnMenu: true,
    width: 250,
  },
  {
    field: 'lastUpdatedAt',
    headerName: 'Last Updated At',
    filterable: false,
    disableColumnMenu: true,
    width: 240,
  },
];

interface ITaskTable extends ITask {
  id: string;
  lastUpdatedAt: string;
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
      sx={{
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        mb: 3,
        width: 'fit-content',
      }}
    >
      <TextField
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Start typing to begin search"
        sx={{ width: '400px' }}
      ></TextField>
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
      sx={{
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        mb: 3,
        width: 'fit-content',
      }}
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

  const [pagination, setPagination] = useState({
    skip: 0,
    take: 10,
  });

  const [tasks, setTasks] = useState<ITaskTable[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [tasksToUpdate, setTasksToUpdate] = useState<ITaskTable[]>([]);
  const [filterBySelectedStatus, setFilterBySelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchTerm = useDebounce({ delay: 500, value: searchQuery });

  useEffect(() => {
    fetchTasks();
  }, [filterBySelectedStatus, debouncedSearchTerm, pagination]);

  const fetchTasks = async () => {
    setTasksToUpdate([]);

    let url = `/tasks?skip=${pagination.skip}&take=${pagination.take}`;

    if (filterBySelectedStatus) {
      url = `${url}&filterBy=status&filterValue=${filterBySelectedStatus}`;
    }

    if (debouncedSearchTerm) {
      url = `${url}&searchQuery=${debouncedSearchTerm}`;
    }

    const response = await getApi(url);

    setTotalCount(response.data.data.count);

    setTasks(
      response.data.data.tasks.map((task: ITask, index: number) => {
        return {
          ...task,
          // @ts-ignore
          lastUpdatedAt: formatDate(task?.updatedAt || ''),
          id: index + 1,
        };
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
          checkboxSelection
          pagination
          rowCount={totalCount}
          paginationMode="server"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onPaginationModelChange={(e) => {
            setPagination({ ...pagination, skip: e.page * pagination.take });
          }}
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
