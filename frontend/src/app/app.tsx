// apps/task-manager-frontend/src/app/app.jsx
import React from 'react';
import TaskList from './components/TaskList';

import "../styles.css";

const App = () => {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default App;