import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsOptional()
  @IsIn(['To Do', 'In Progress', 'Done'], {
    message: 'Status must be one of the following: To Do, In Progress, Done',
  })
  status?: string;
}
