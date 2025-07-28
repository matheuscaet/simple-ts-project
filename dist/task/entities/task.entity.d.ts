export interface Task {
    id: number;
    desc: string;
    done: boolean;
}
export declare class CreateTaskDto {
    desc: string;
    done?: boolean;
}
export declare class UpdateTaskDto {
    desc?: string;
    done?: boolean;
}
