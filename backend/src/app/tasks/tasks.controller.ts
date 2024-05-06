import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  Query,
} from '@nestjs/common';

import { TasksService } from '@backend/app/tasks/tasks.service';
import { sendApiResponse } from '@lib/utils/util';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: any) {
    const task = await this.tasksService.create(createTaskDto);
    return sendApiResponse('task created successfully!', task);
  }

  @Get()
  async findAll(@Query() query: any) {
    const tasks = await this.tasksService.findAll(query);
    return sendApiResponse('task fetched successfully!', tasks);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('invalid id provided!');
    }

    return sendApiResponse('task fetched successfully!', task);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: any) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);
    return sendApiResponse('task updated successfully', updatedTask);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedTask = await this.tasksService.delete(id);
    return sendApiResponse('task removed successfully', deletedTask);
  }

  @Delete()
  async patchRemove(@Body() deleteManyDto: any) {
    if (deleteManyDto?.ids?.length === 0) {
      throw new BadRequestException('ids are required field!');
    }
    const deletedTasks = await this.tasksService.deleteMany(deleteManyDto);
    return sendApiResponse('tasks removed successfully', deletedTasks);
  }
}
