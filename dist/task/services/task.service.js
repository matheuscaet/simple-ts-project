"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("../repositories/task.repository");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    getAllTasks() {
        return this.taskRepository.findAll();
    }
    getTaskById(id) {
        const task = this.taskRepository.findOne(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
    createTask(createTaskDto) {
        if (!createTaskDto.desc || createTaskDto.desc.trim() === '') {
            throw new Error('Task description is required');
        }
        return this.taskRepository.create(createTaskDto);
    }
    updateTask(id, updateTaskDto) {
        const updatedTask = this.taskRepository.update(id, updateTaskDto);
        if (!updatedTask) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return updatedTask;
    }
    deleteTask(id) {
        const deletedTask = this.taskRepository.remove(id);
        if (!deletedTask) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return deletedTask;
    }
    getCompletedTasks() {
        return this.taskRepository.findAll().filter(task => task.done);
    }
    getPendingTasks() {
        return this.taskRepository.findAll().filter(task => !task.done);
    }
    markTaskAsCompleted(id) {
        return this.updateTask(id, { done: true });
    }
    markTaskAsPending(id) {
        return this.updateTask(id, { done: false });
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map