// apps/task-manager-frontend/src/app/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { ITask } from 'index';

import { getApi, removeApi } from '../services/axios.service';

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getApi('/tasks');
    setTasks(response.data);
  };

  const handleDelete = async (id: any) => {
    await removeApi(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <TaskForm
        taskToUpdate={taskToUpdate}
        setTaskToUpdate={setTaskToUpdate}
        fetchTasks={fetchTasks}
      />
      {tasks.map((task) => (
        <div key={`${task._id}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <button onClick={() => setTaskToUpdate(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
