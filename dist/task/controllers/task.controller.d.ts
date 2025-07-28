import { TaskService } from '../services/task.service';
import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Task[];
    getCompletedTasks(): Task[];
    getPendingTasks(): Task[];
    getTaskById(id: number): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Task;
    markTaskAsCompleted(id: number): Task;
    markTaskAsPending(id: number): Task;
    deleteTask(id: number): void;
}
