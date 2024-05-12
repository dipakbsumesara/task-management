// apps/task-manager-frontend/src/app/components/TaskForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, Grid, Snackbar, Typography } from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom';

import { getApi, patchApi, postApi } from '../services/axios.service';

import { FormConfig, ICustomBreadcrump, ITask } from '../../../../index';
import CustomBreadcrumps from '../UI/CustomBreadcrumps';
import FormBuilder from '../helpers/FormBuilder';

const TaskForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [apiResponseMessage, setApiResponseMessage] = useState('');

  const [task, setTask] = useState<ITask>({
    title: '',
    description: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (params.id) {
      (async () => {
        const response = await getApi(`/tasks/${params.id}`);
        setTask(response.data.data);
      })();
    }
  }, [params]);

  const taskToUpdate = useMemo(() => {
    return !!params.id;
  }, [params]);

  const handleSubmit = async (payload: ITask) => {
    const url = taskToUpdate ? `/tasks/${task._id}` : '/tasks';

    const response = taskToUpdate
      ? await patchApi(url, payload)
      : await postApi(url, payload);

    setApiResponseMessage(response.data.message);

    if (!taskToUpdate) {
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
  };

  const breadcrumps = useMemo(() => {
    const breadcrumps: ICustomBreadcrump[] = [];

    breadcrumps.push({ label: 'Task list', href: '/' });
    breadcrumps.push({
      label: task && taskToUpdate ? task.title : 'Create task',
    });

    return breadcrumps;
  }, [taskToUpdate, task]);

  // Define the configuration for the form
  const formConfig: FormConfig = useMemo(
    () => [
      {
        id: 'title',
        name: 'title',
        label: 'Title',
        inputType: 'text',
        fielType: 'text',
        placeholder: 'Enter your title',
        validation: { required: 'Title is required field' },
      },
      {
        id: 'description',
        name: 'description',
        label: 'Description',
        inputType: 'text',
        fieldType: 'text',
        placeholder: 'Enter your description',
        validation: { required: 'Description is required' },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Status',
        inputType: 'select',
        placeholder: 'Enter your status',
        validation: { required: 'Status is required' },
        options: [
          { value: 'To Do', label: 'To Do' },
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Done', label: 'Done' },
        ],
      },
    ],
    []
  );

  return (
    <Grid>
      <CustomBreadcrumps breadcrumps={breadcrumps} />
      <Grid
        container
        sx={{
          flexDirection: 'column',
          alignItems: 'baseline',
          gap: 2,
          borderRadius: '5px',
          px: 4,
          py: 2,
        }}
      >
        {params.id ? (
          task && (
            <FormBuilder
              config={formConfig}
              onSubmit={handleSubmit}
              defaultValues={{
                title: task.title,
                description: task.description,
                status: task.status,
              }}
              submitButtonProps={{
                label: "Update"
              }}
            />
          )
        ) : (
          <FormBuilder config={formConfig} onSubmit={handleSubmit} submitButtonProps={{ label: "Create" }} />
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!apiResponseMessage}
        onClose={() => {}}
      >
        <Alert severity="success">
          <Typography sx={{ mr: 3 }}>{apiResponseMessage}</Typography>
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default TaskForm;
