import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(['To Do', 'In Progress', 'Done'], {
    message: 'Status must be one of the following: To Do, In Progress, Done',
  })
  status: string;
}
