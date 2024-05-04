import React from 'react';
import {
  Routes,
  Route,
  Outlet,
  Link,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const RenderRoutes = () => {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<TaskList />} />
          <Route path="task" element={<TaskForm />} />
          <Route path="task/:id" element={<TaskForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
  );
};

export default RenderRoutes;
