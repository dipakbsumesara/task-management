// apps/task-manager-frontend/src/app/app.jsx
import React from 'react';
import '../styles.css';
import RenderRoutes from './helpers/routes';
import { Typography } from '@mui/material';

const App = () => {
  return (
    <>
      <Typography variant="h4" textAlign="center">Task Management</Typography>
      <RenderRoutes />
    </>
  );
};

export default App;
