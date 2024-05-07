import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<TaskList />} />
          <Route path="task" element={<TaskForm />} />
          <Route path="task/:id" element={<TaskForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
