import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRepository } from '../repositories/task.repository';
import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';

describe('TaskService', () => {
  let service: TaskService;
  let repository: TaskRepository;

  const mockTasks: Task[] = [
    { id: 1, desc: 'Test task 1', done: false },
    { id: 2, desc: 'Test task 2', done: true },
    { id: 3, desc: 'Test task 3', done: false },
  ];

  const mockTaskRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<TaskRepository>(TaskRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return all tasks', () => {
      mockTaskRepository.findAll.mockReturnValue(mockTasks);

      const result = service.getAllTasks();

      expect(result).toEqual(mockTasks);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no tasks exist', () => {
      mockTaskRepository.findAll.mockReturnValue([]);

      const result = service.getAllTasks();

      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTaskById', () => {
    it('should return a task when it exists', () => {
      const taskId = 1;
      mockTaskRepository.findOne.mockReturnValue(mockTasks[0]);

      const result = service.getTaskById(taskId);

      expect(result).toEqual(mockTasks[0]);
      expect(repository.findOne).toHaveBeenCalledWith(taskId);
    });

    it('should throw NotFoundException when task does not exist', () => {
      const taskId = 999;
      mockTaskRepository.findOne.mockReturnValue(undefined);

      expect(() => service.getTaskById(taskId)).toThrow(
        new NotFoundException(`Task with id ${taskId} not found`),
      );
      expect(repository.findOne).toHaveBeenCalledWith(taskId);
    });
  });

  describe('createTask', () => {
    it('should create a new task successfully', () => {
      const createTaskDto: CreateTaskDto = {
        desc: 'New task',
        done: false,
      };
      const newTask: Task = { id: 4, desc: 'New task', done: false };
      mockTaskRepository.create.mockReturnValue(newTask);

      const result = service.createTask(createTaskDto);

      expect(result).toEqual(newTask);
      expect(repository.create).toHaveBeenCalledWith(createTaskDto);
    });

    it('should throw error when description is empty', () => {
      const createTaskDto: CreateTaskDto = {
        desc: '',
      };

      expect(() => service.createTask(createTaskDto)).toThrow(
        'Task description is required',
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should throw error when description is only whitespace', () => {
      const createTaskDto: CreateTaskDto = {
        desc: '   ',
      };

      expect(() => service.createTask(createTaskDto)).toThrow(
        'Task description is required',
      );
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', () => {
      const taskId = 1;
      const updateTaskDto: UpdateTaskDto = {
        desc: 'Updated task',
        done: true,
      };
      const updatedTask: Task = { id: 1, desc: 'Updated task', done: true };
      mockTaskRepository.update.mockReturnValue(updatedTask);

      const result = service.updateTask(taskId, updateTaskDto);

      expect(result).toEqual(updatedTask);
      expect(repository.update).toHaveBeenCalledWith(taskId, updateTaskDto);
    });

    it('should throw NotFoundException when task to update does not exist', () => {
      const taskId = 999;
      const updateTaskDto: UpdateTaskDto = { desc: 'Updated task' };
      mockTaskRepository.update.mockReturnValue(undefined);

      expect(() => service.updateTask(taskId, updateTaskDto)).toThrow(
        new NotFoundException(`Task with id ${taskId} not found`),
      );
      expect(repository.update).toHaveBeenCalledWith(taskId, updateTaskDto);
    });

    it('should update only description', () => {
      const taskId = 1;
      const updateTaskDto: UpdateTaskDto = { desc: 'Updated description' };
      const updatedTask: Task = {
        id: 1,
        desc: 'Updated description',
        done: false,
      };
      mockTaskRepository.update.mockReturnValue(updatedTask);

      const result = service.updateTask(taskId, updateTaskDto);

      expect(result).toEqual(updatedTask);
      expect(repository.update).toHaveBeenCalledWith(taskId, updateTaskDto);
    });

    it('should update only done status', () => {
      const taskId = 1;
      const updateTaskDto: UpdateTaskDto = { done: true };
      const updatedTask: Task = { id: 1, desc: 'Test task 1', done: true };
      mockTaskRepository.update.mockReturnValue(updatedTask);

      const result = service.updateTask(taskId, updateTaskDto);

      expect(result).toEqual(updatedTask);
      expect(repository.update).toHaveBeenCalledWith(taskId, updateTaskDto);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', () => {
      const taskId = 1;
      mockTaskRepository.remove.mockReturnValue(mockTasks[0]);

      const result = service.deleteTask(taskId);

      expect(result).toEqual(mockTasks[0]);
      expect(repository.remove).toHaveBeenCalledWith(taskId);
    });

    it('should throw NotFoundException when task to delete does not exist', () => {
      const taskId = 999;
      mockTaskRepository.remove.mockReturnValue(undefined);

      expect(() => service.deleteTask(taskId)).toThrow(
        new NotFoundException(`Task with id ${taskId} not found`),
      );
      expect(repository.remove).toHaveBeenCalledWith(taskId);
    });
  });

  describe('getCompletedTasks', () => {
    it('should return only completed tasks', () => {
      mockTaskRepository.findAll.mockReturnValue(mockTasks);

      const result = service.getCompletedTasks();

      expect(result).toEqual([mockTasks[1]]);
      expect(result).toHaveLength(1);
      expect(result[0].done).toBe(true);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no completed tasks exist', () => {
      const pendingTasks = mockTasks.filter((task) => !task.done);
      mockTaskRepository.findAll.mockReturnValue(pendingTasks);

      const result = service.getCompletedTasks();

      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPendingTasks', () => {
    it('should return only pending tasks', () => {
      mockTaskRepository.findAll.mockReturnValue(mockTasks);

      const result = service.getPendingTasks();

      expect(result).toEqual([mockTasks[0], mockTasks[2]]);
      expect(result).toHaveLength(2);
      expect(result.every((task) => !task.done)).toBe(true);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no pending tasks exist', () => {
      const completedTasks = mockTasks.filter((task) => task.done);
      mockTaskRepository.findAll.mockReturnValue(completedTasks);

      const result = service.getPendingTasks();

      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('markTaskAsCompleted', () => {
    it('should mark a task as completed', () => {
      const taskId = 1;
      const completedTask: Task = { id: 1, desc: 'Test task 1', done: true };
      mockTaskRepository.update.mockReturnValue(completedTask);

      const result = service.markTaskAsCompleted(taskId);

      expect(result).toEqual(completedTask);
      expect(result.done).toBe(true);
      expect(repository.update).toHaveBeenCalledWith(taskId, { done: true });
    });

    it('should throw NotFoundException when task does not exist', () => {
      const taskId = 999;
      mockTaskRepository.update.mockReturnValue(undefined);

      expect(() => service.markTaskAsCompleted(taskId)).toThrow(
        new NotFoundException(`Task with id ${taskId} not found`),
      );
      expect(repository.update).toHaveBeenCalledWith(taskId, { done: true });
    });
  });

  describe('markTaskAsPending', () => {
    it('should mark a task as pending', () => {
      const taskId = 2;
      const pendingTask: Task = { id: 2, desc: 'Test task 2', done: false };
      mockTaskRepository.update.mockReturnValue(pendingTask);

      const result = service.markTaskAsPending(taskId);

      expect(result).toEqual(pendingTask);
      expect(result.done).toBe(false);
      expect(repository.update).toHaveBeenCalledWith(taskId, { done: false });
    });

    it('should throw NotFoundException when task does not exist', () => {
      const taskId = 999;
      mockTaskRepository.update.mockReturnValue(undefined);

      expect(() => service.markTaskAsPending(taskId)).toThrow(
        new NotFoundException(`Task with id ${taskId} not found`),
      );
      expect(repository.update).toHaveBeenCalledWith(taskId, { done: false });
    });
  });
});

