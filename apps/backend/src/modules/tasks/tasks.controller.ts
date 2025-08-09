import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

class CreateTaskDto {
  @IsString()
  userId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get(':userId')
  list(@Param('userId') userId: string) {
    return this.tasks.list(userId);
  }

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasks.create(body.userId, body.title, body.description);
  }

  @Patch(':id/status')
  setStatus(@Param('id') id: string, @Body() body: UpdateTaskStatusDto) {
    return this.tasks.updateStatus(id, body.status);
  }
}


