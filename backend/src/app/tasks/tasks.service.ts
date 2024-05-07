import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from '@backend/app/tasks/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: any): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    createdTask.createdAt = new Date();
    createdTask.updatedAt = new Date();
    return createdTask.save();
  }

  async findAll(query: any): Promise<{ tasks: Task[]; count: number }> {
    let findQuery = {};
    let skip = 0;
    let take = 10;

    if ('filterBy' in query && 'filterValue' in query) {
      const { filterBy, filterValue } = query;
      findQuery[filterBy] = filterValue;
    }

    if ('searchQuery' in query) {
      const searchRegex = new RegExp(query.searchQuery, 'i'); // Case-insensitive search
      findQuery['$or'] = [{ title: searchRegex }, { description: searchRegex }];
    }

    if ('skip' in query) {
      skip = parseInt(query.skip, 10);
      skip = isNaN(skip) || skip < 0 ? 0 : skip;
    }

    if ('take' in query) {
      take = parseInt(query.take, 10);
      take = isNaN(take) || take <= 0 ? 10 : take;
    }

    const tasks = await this.taskModel
      .find(findQuery)
      .skip(skip)
      .limit(take)
      .exec();

    const count = await this.taskModel.countDocuments(findQuery);

    return { tasks, count };
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: any): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(
        id,
        { ...updateTaskDto, updatedAt: new Date() },
        { new: true }
      )
      .exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async deleteMany(deleteManyDto: any): Promise<any> {
    const validIds = deleteManyDto.ids
      .filter((id) => {
        return Types.ObjectId.isValid(id);
      })
      .map((id) => new Types.ObjectId(id));
    return this.taskModel
      .deleteMany({
        _id: {
          $in: validIds,
        },
      });
  }
}
