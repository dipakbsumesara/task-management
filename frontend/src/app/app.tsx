// apps/task-manager-frontend/src/app/app.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import RenderRoutes from './helpers/routes';

import '../styles.css';

const App = () => {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <RenderRoutes />
      <Outlet />
    </div>
  );
};

export default App;
