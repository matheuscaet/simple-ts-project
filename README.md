# Simple TypeScript Project - Task Management API

A NestJS-based task management application with layered architecture implementing Repository, Service, and Controller patterns.

## Project Structure

```
simple-ts-project/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root application module
│   ├── app.controller.ts          # Root application controller
│   ├── app.service.ts             # Root application service
│   └── task/                      # Task domain module
│       ├── entities/
│       │   └── task.entity.ts     # Task entity and DTOs
│       ├── repositories/
│       │   └── task.repository.ts # Data access layer
│       ├── services/
│       │   └── task.service.ts    # Business logic layer
│       ├── controllers/
│       │   └── task.controller.ts # API request handling layer
│       └── task.module.ts         # Task module configuration
├── data/
│   └── tasks.json                 # Mock data storage
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
├── nest-cli.json                  # NestJS CLI configuration
└── README.md                      # Project documentation
```

## Architecture Layers

### 1. **Entity Layer** (`task.entity.ts`)
- Defines the Task interface and Data Transfer Objects (DTOs)
- Contains data structure definitions

### 2. **Repository Layer** (`task.repository.ts`)
- Handles data persistence and retrieval
- Manages JSON file operations
- Implements CRUD operations

### 3. **Service Layer** (`task.service.ts`)
- Contains business logic
- Validates data and enforces business rules
- Acts as an intermediary between controller and repository

### 4. **Controller Layer** (`task.controller.ts`)
- Handles HTTP requests and responses
- Defines API endpoints and routing
- Validates input parameters

## Task Entity

```typescript
interface Task {
  id: number;
  desc: string;
  done: boolean;
}
```

## API Endpoints

### General
- `GET /` - Welcome message
- `GET /health` - Health check

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/completed` - Get completed tasks
- `GET /tasks/pending` - Get pending tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `PUT /tasks/:id/complete` - Mark task as completed
- `PUT /tasks/:id/pending` - Mark task as pending
- `DELETE /tasks/:id` - Delete a task

## Sample API Usage

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"desc": "Learn NestJS", "done": false}'
```

### Get All Tasks
```bash
curl http://localhost:3000/tasks
```

### Update a Task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"desc": "Updated task description", "done": true}'
```

### Mark Task as Completed
```bash
curl -X PUT http://localhost:3000/tasks/1/complete
```

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Start the application in development mode:
```bash
npm run start:dev
```

3. The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Mock Data

The application comes with pre-populated mock data in `data/tasks.json` containing sample tasks to demonstrate the functionality. 