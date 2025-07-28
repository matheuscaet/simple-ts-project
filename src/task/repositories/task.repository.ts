import { Injectable } from '@nestjs/common';
import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TaskRepository {
  private readonly dataPath = path.join(process.cwd(), 'data', 'tasks.json');

  private loadTasks(): Task[] {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private saveTasks(tasks: Task[]): void {
    const dataDir = path.dirname(this.dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(this.dataPath, JSON.stringify(tasks, null, 2));
  }

  findAll(): Task[] {
    return this.loadTasks();
  }

  findOne(id: number): Task | undefined {
    const tasks = this.loadTasks();
    return tasks.find(task => task.id === id);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const tasks = this.loadTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    const newTask: Task = {
      id: newId,
      desc: createTaskDto.desc,
      done: createTaskDto.done || false,
    };

    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task | undefined {
    const tasks = this.loadTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return undefined;
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updateTaskDto };
    this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  remove(id: number): Task | undefined {
    const tasks = this.loadTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return undefined;
    }

    const removedTask = tasks.splice(taskIndex, 1)[0];
    this.saveTasks(tasks);
    return removedTask;
  }
} 