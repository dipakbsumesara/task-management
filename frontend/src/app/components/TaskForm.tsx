// apps/task-manager-frontend/src/app/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';

import { getApi, patchApi, postApi } from '../services/axios.service';

import { ITask } from '../../../../index';

type Props = {
  taskToUpdate: any;
  setTaskToUpdate: any;
  fetchTasks: any;
};

const TaskForm = ({ taskToUpdate, setTaskToUpdate, fetchTasks }: Props) => {
  const [task, setTask] = useState<ITask>({
    title: '',
    description: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (taskToUpdate) setTask(taskToUpdate);
  }, [taskToUpdate]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = taskToUpdate ? `/tasks/${task._id}` : '/tasks';

    taskToUpdate ? await patchApi(url, task) : await postApi(url, task);

    fetchTasks();
    setTaskToUpdate(null);
    setTask({
      title: '',
      description: '',
      status: 'To Do',
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={(e) => handleChange(e)}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">
        {taskToUpdate ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
