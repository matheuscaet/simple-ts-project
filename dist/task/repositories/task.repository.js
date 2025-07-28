"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let TaskRepository = class TaskRepository {
    constructor() {
        this.dataPath = path.join(process.cwd(), 'data', 'tasks.json');
    }
    loadTasks() {
        try {
            const data = fs.readFileSync(this.dataPath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    saveTasks(tasks) {
        const dataDir = path.dirname(this.dataPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(this.dataPath, JSON.stringify(tasks, null, 2));
    }
    findAll() {
        return this.loadTasks();
    }
    findOne(id) {
        const tasks = this.loadTasks();
        return tasks.find(task => task.id === id);
    }
    create(createTaskDto) {
        const tasks = this.loadTasks();
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        const newTask = {
            id: newId,
            desc: createTaskDto.desc,
            done: createTaskDto.done || false,
        };
        tasks.push(newTask);
        this.saveTasks(tasks);
        return newTask;
    }
    update(id, updateTaskDto) {
        const tasks = this.loadTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return undefined;
        }
        tasks[taskIndex] = { ...tasks[taskIndex], ...updateTaskDto };
        this.saveTasks(tasks);
        return tasks[taskIndex];
    }
    remove(id) {
        const tasks = this.loadTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return undefined;
        }
        const removedTask = tasks.splice(taskIndex, 1)[0];
        this.saveTasks(tasks);
        return removedTask;
    }
};
TaskRepository = __decorate([
    (0, common_1.Injectable)()
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map