export interface Task {
  id: number;
  desc: string;
  done: boolean;
}

export class CreateTaskDto {
  desc: string;
  done?: boolean;
}

export class UpdateTaskDto {
  desc?: string;
  done?: boolean;
} 