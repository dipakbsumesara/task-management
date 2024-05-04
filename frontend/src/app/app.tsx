// apps/task-manager-frontend/src/app/app.jsx
import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
  console.log('App Rendered');
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default App;