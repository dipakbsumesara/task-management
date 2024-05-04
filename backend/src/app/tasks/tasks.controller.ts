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
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: any) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.tasksService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('invalid id provided!');
    }

    return task;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Delete()
  patchRemove(@Body() deleteManyDto: any) {
    if (deleteManyDto?.ids?.length === 0) {
      throw new BadRequestException('ids are required field!');
    }
    return this.tasksService.deleteMany(deleteManyDto);
  }
}
