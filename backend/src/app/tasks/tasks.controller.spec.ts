import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// Define a mock TasksService
class MockTasksService {
  async create(createTaskDto: any) {
    return { id: '1', ...createTaskDto };
  }

  async findAll(query: any) {
    return [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
    ];
  }

  async findOne(id: string) {
    if (id === '1') {
      return { id: '1', title: 'Task 1' };
    } else {
      return null;
    }
  }

  async update(id: string, updateTaskDto: any) {
    return { id, ...updateTaskDto };
  }

  async delete(id: string) {
    return { id, deleted: true };
  }

  async deleteMany(deleteManyDto: any) {
    return deleteManyDto.ids.map((id: string) => ({ id, deleted: true }));
  }
}

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TasksService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useClass: MockTasksService,
        },
      ],
    }).compile();
  
    taskService = module.get<TasksService>(TasksService);
    // taskController = module.get<TasksController>(TasksController);
    taskController = new TasksController(taskService);

    console.log("Task controller: ", taskController);
    console.log("Task service: ", taskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should create a task', async () => {
    const taskDto = { title: 'New Task' };
    const createdTask = await taskController.create(taskDto);
    console.log({ createdTask });
    expect(createdTask).toEqual({
      status: 'success',
      message: 'task created successfully!',
      data: { id: '1', title: 'New Task' },
    });
  });

  it('should find all tasks', async () => {
    const tasks = await taskController.findAll({});
    expect(tasks.data).toHaveLength(2);
  });

  it('should find one task', async () => {
    const taskId = '1';
    const task = await taskController.findOne(taskId);
    expect(task).toEqual({
      status: 'success',
      message: 'task fetched successfully!',
      data: { id: '1', title: 'Task 1' },
    });
  });

  it('should update a task', async () => {
    const taskId = '1';
    const updateDto = { title: 'Updated Task' };
    const updatedTask = await taskController.update(taskId, updateDto);
    expect(updatedTask).toEqual({
      status: 'success',
      message: 'task updated successfully',
      data: { id: '1', ...updateDto },
    });
  });

  it('should delete a task', async () => {
    const taskId = '1';
    const deletedTask = await taskController.remove(taskId);
    expect(deletedTask).toEqual({
      status: 'success',
      message: 'task removed successfully',
      data: { id: '1', deleted: true },
    });
  });

  it('should delete multiple tasks', async () => {
    const deleteManyDto = { ids: ['1', '2'] };
    const deletedTasks = await taskController.patchRemove(deleteManyDto);
    expect(deletedTasks).toEqual({
      data: [
        { deleted: true, id: '1' },
        { deleted: true, id: '2' },
      ],
      message: 'tasks removed successfully',
      status: 'success',
    });
  });

  it('should throw BadRequestException if no ids provided for patchRemove', async () => {
    const deleteManyDto = { ids: [] };
    await expect(
      taskController.patchRemove(deleteManyDto)
    ).rejects.toThrowError('ids are required field!');
  });
});
