import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getAllTasks(): Task[] {
    return this.taskRepository.findAll();
  }

  getTaskById(id: number): Task {
    const task = this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    if (!createTaskDto.desc || createTaskDto.desc.trim() === '') {
      throw new Error('Task description is required');
    }
    return this.taskRepository.create(createTaskDto);
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
    const updatedTask = this.taskRepository.update(id, updateTaskDto);
    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  deleteTask(id: number): Task {
    const deletedTask = this.taskRepository.remove(id);
    if (!deletedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return deletedTask;
  }

  getCompletedTasks(): Task[] {
    return this.taskRepository.findAll().filter(task => task.done);
  }

  getPendingTasks(): Task[] {
    return this.taskRepository.findAll().filter(task => !task.done);
  }

  markTaskAsCompleted(id: number): Task {
    return this.updateTask(id, { done: true });
  }

  markTaskAsPending(id: number): Task {
    return this.updateTask(id, { done: false });
  }
} 