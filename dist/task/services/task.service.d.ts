import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    getAllTasks(): Task[];
    getTaskById(id: number): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Task;
    deleteTask(id: number): Task;
    getCompletedTasks(): Task[];
    getPendingTasks(): Task[];
    markTaskAsCompleted(id: number): Task;
    markTaskAsPending(id: number): Task;
}
