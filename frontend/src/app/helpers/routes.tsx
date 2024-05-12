import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Login from '../components/Login';
import ProtectedRoute from './ProtectedRoutes';
import Register from '../components/Register';
import PublicRoutes from './PublicRoutes';

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<PublicRoutes element={Login} />} />
          <Route
            path="register"
            element={<PublicRoutes element={Register} />}
          />
          <Route index element={<ProtectedRoute element={TaskList} />} />
          <Route path="task" element={<ProtectedRoute element={TaskForm} />} />
          <Route
            path="task/:id"
            element={<ProtectedRoute element={TaskForm} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
