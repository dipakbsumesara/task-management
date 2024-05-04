import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: any): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    createdTask.createdAt = new Date();
    createdTask.updatedAt = new Date();
    return createdTask.save();
  }

  async findAll(query: any): Promise<Task[]> {
    let findQuery = {};

    if ('filterBy' in query && 'filterValue' in query) {
      const { filterBy, filterValue } = query;
      findQuery[filterBy] = filterValue;
    }

    if ('searchQuery' in query) {
      const searchRegex = new RegExp(query.searchQuery, 'i'); // Case-insensitive search
      findQuery['$or'] = [{ title: searchRegex }, { description: searchRegex }];
    }

    return this.taskModel.find(findQuery).exec();
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
    return this.taskModel.findByIdAndDelete(id).exec();
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
      })
      .exec();
  }
}
