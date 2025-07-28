import { Task, CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';
export declare class TaskRepository {
    private readonly dataPath;
    private loadTasks;
    private saveTasks;
    findAll(): Task[];
    findOne(id: number): Task | undefined;
    create(createTaskDto: CreateTaskDto): Task;
    update(id: number, updateTaskDto: UpdateTaskDto): Task | undefined;
    remove(id: number): Task | undefined;
}
