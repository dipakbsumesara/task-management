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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTaskDto } from "@lib/DTO/createTask.dto";
import { UpdateTaskDto } from "@lib/DTO/updateTask.dto";

import { TasksService } from '@backend/app/tasks/tasks.service';
import { sendApiResponse } from '@lib/utils/util';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    return sendApiResponse('task created successfully!', task);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: any) {
    const tasks = await this.tasksService.findAll(query);
    return sendApiResponse('task fetched successfully!', tasks);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('invalid id provided!');
    }

    return sendApiResponse('task fetched successfully!', task);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);
    return sendApiResponse('task updated successfully', updatedTask);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedTask = await this.tasksService.delete(id);
    return sendApiResponse('task removed successfully', deletedTask);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async patchRemove(@Body() deleteManyDto: any) {
    if (deleteManyDto?.ids?.length === 0) {
      throw new BadRequestException('ids are required field!');
    }
    const deletedTasks = await this.tasksService.deleteMany(deleteManyDto);
    return sendApiResponse('tasks removed successfully', deletedTasks);
  }
}
