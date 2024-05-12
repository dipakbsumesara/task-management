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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { ITask } from 'index';
import { getApi, removeApi } from '../services/axios.service';
import { getTaskColorCode } from '../constants/index';
import useDebounce from '../hooks/useDebounce';
import { objectCopy, formatDate } from '../../../../src/lib/utils/util';

interface ITaskTable extends ITask {
  id: string;
  lastUpdatedAt: string;
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 90,
    filterable: false,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    resizable: false,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    flex: 1, // Use flex for responsive widths
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    flex: 1.5, // Adjust flex accordingly
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    filterable: false,
    disableColumnMenu: true,
    width: 120,
    flex: 1, // Adjust flex accordingly
  },
  {
    field: 'lastUpdatedAt',
    headerName: 'Last Updated At',
    filterable: false,
    disableColumnMenu: true,
    width: 150,
    flex: 1, // Adjust flex accordingly
  },
];

const CreateNewTask = () => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ textAlign: 'right' }}>
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      sx={{
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        mb: 3,
        width: isSmallScreen ? '100%' : 'auto',
      }}
    >
      <TextField
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Start typing to begin search"
        sx={{ width: isSmallScreen ? '100%' : '400px' }}
      />
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      sx={{
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        mb: 3,
        width: isSmallScreen ? '100%' : 'auto',
      }}
    >
      <Typography>Filter By: </Typography>
      <Select
        value={filterBySelectedStatus}
        onChange={(e) => setFilterBySelectedStatus(e.target.value)}
        renderValue={(selected) =>
          !selected ? 'Select Status to filter' : selected
        }
        displayEmpty
        sx={{ width: isSmallScreen ? '100%' : '200px' }}
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchTasks();
  }, [filterBySelectedStatus, debouncedSearchTerm, pagination]);

  const fetchTasks = async () => {
    setTasksToUpdate([]);

    let url = `/tasks?skip=${pagination.skip}&take=${pagination.take}`;
    if (filterBySelectedStatus) {
      url += `&filterBy=status&filterValue=${filterBySelectedStatus}`;
    }
    if (debouncedSearchTerm) {
      url += `&searchQuery=${debouncedSearchTerm}`;
    }

    const response = await getApi(url);
    setTotalCount(response.data.data.count);
    setTasks(
      response.data.data.tasks.map((task: ITask, index: number) => ({
        ...task,
        // @ts-ignore
        lastUpdatedAt: formatDate(task?.updatedAt || ''),
        id: index + 1,
      }))
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
        sx={{
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
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

      <Grid item xs={12} sx={{ height: '500px', width: '100%' }}>
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
