import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('completed')
  getCompletedTasks(): Task[] {
    return this.taskService.getCompletedTasks();
  }

  @Get('pending')
  getPendingTasks(): Task[] {
    return this.taskService.getPendingTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Put(':id/complete')
  markTaskAsCompleted(@Param('id', ParseIntPipe) id: number): Task {
    return this.taskService.markTaskAsCompleted(id);
  }

  @Put(':id/pending')
  markTaskAsPending(@Param('id', ParseIntPipe) id: number): Task {
    return this.taskService.markTaskAsPending(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id', ParseIntPipe) id: number): void {
    this.taskService.deleteTask(id);
  }
} 