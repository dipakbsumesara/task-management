import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';

class MockTaskModel {
  static data = [];
  static query = {};

  public save = jest.fn();

  constructor(public data) {
    this.save = jest.fn().mockResolvedValue(this); // Ensure this is still mocked as you've done previously
  }

  // Make find, skip, and limit jest mock functions
  static find = jest.fn((query) => {
    this.query = query;
    return this;
  });

  static findById = jest.fn((id) => {
    this.query = { _id: id };
    return this;
  });

  static findByIdAndUpdate = jest.fn((id, update, options) => {
    const response = new MockTaskModel({ _id: id, ...update });
    return {
      exec: jest.fn(() => Promise.resolve(response)),
    };
  });

  static findByIdAndDelete = jest.fn((id) => {
    const index = this.data.findIndex((d) => d._id === id);
    if (index !== -1) {
      return Promise.resolve(this.data.splice(index, 1)[0]);
    } else {
      return Promise.resolve(null);
    }
  });

  static deleteMany = jest.fn((filter) => {
    const filteredIds = filter._id.$in;
    return Promise.resolve({ deletedCount: filteredIds.length });
  });

  static countDocuments = jest.fn(() => {
    return Promise.resolve(this.data.length);
  });

  static skip = jest.fn((number) => {
    return this;
  });

  static limit = jest.fn((number) => {
    return this;
  });

  static exec = jest.fn(() => {
    return Promise.resolve(
      this.data.filter((d) => {
        for (let key in this.query) {
          if (d[key] !== this.query[key]) {
            return false;
          }
        }
        return true;
      })
    );
  });
}

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken(Task.name), useValue: MockTaskModel },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should properly create a task', async () => {
    const createTaskDto = { title: 'Test Task' };
    const result = await service.create(createTaskDto);
    expect(result).toBeInstanceOf(MockTaskModel);
    expect(result.save).toHaveBeenCalled();
  });

  it('findAll should retrieve tasks with pagination and search', async () => {
    const query = { skip: 0, take: 5, searchQuery: 'Test', filterBy: "status", filterValue: "To Do" };
    const result = await service.findAll(query);
    expect(MockTaskModel.find).toHaveBeenCalled();
    expect(MockTaskModel.skip).toHaveBeenCalledWith(0);
    expect(MockTaskModel.limit).toHaveBeenCalledWith(5);
    expect(result).toEqual({ count: 0, tasks: [] });
  });

  it('findAll should retrieve tasks with default pagination', async () => {
    const query = { skip: -1, take: -1 };
    const result = await service.findAll(query);
    expect(MockTaskModel.find).toHaveBeenCalled();
    expect(MockTaskModel.skip).toHaveBeenCalledWith(0);
    expect(MockTaskModel.limit).toHaveBeenCalledWith(10);
    expect(result).toEqual({ count: 0, tasks: [] });
  });

  it('findOne should retrieve task', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual([]);
  });

  it('updateOne should retrieve id', async () => {
    const result: any = await service.update('1', { title: 'Test' });
    console.log(':::::::::result:::::::::::::::::::::', result);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('_id');
    expect(result.data).toHaveProperty('title');
    expect(result.data).toHaveProperty('updatedAt');

    expect(result.data._id).toEqual('1');
    expect(result.data.title).toEqual('Test');
  });

  it('delete should remove a task by id', async () => {
    const id = '1';
    MockTaskModel.data = [{ _id: id, title: 'Task to be deleted' }]; // Pre-populate mock data

    const result = await service.delete(id);
    expect(result).toEqual({ _id: id, title: 'Task to be deleted' });
    expect(MockTaskModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(MockTaskModel.data).toEqual([]); // Data array should be empty after deletion
  });

  it('delete should return null if task not found', async () => {
    const id = '-1';
    const result = await service.delete(id);
    expect(result).toBeNull();
    expect(MockTaskModel.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  it('deleteMany should remove a tasks by ids', async () => {
    const ids = ['1', '507f1f77bcf86cd799439011'];
    MockTaskModel.data = [{ _id: ids[0], title: 'Task to be deleted' }]; // Pre-populate mock data

    const result = await service.deleteMany({ ids });
    expect(result).toEqual({ deletedCount: 1 });
  });
});
