// apps/task-manager-frontend/src/app/app.jsx
import React from 'react';
import '../styles.css';
import RenderRoutes from './helpers/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <RenderRoutes />
    </>
  );
};

export default App;
