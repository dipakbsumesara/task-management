// apps/task-manager-frontend/src/app/app.jsx
import React, { useMemo } from 'react';
import '../styles.css';
import RenderRoutes from './helpers/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import { LOCAL_STORAGE_KEYS } from './helpers/constants';

const App = () => {
  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    location.href = '/';
  };

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <Button
          variant="contained"
          color="error"
          sx={{ float: 'right', ml: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <></>
      )}
      <RenderRoutes />
    </>
  );
};

export default App;
