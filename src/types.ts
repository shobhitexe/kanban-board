export type IDType = string | number;

export type ColumnsType = { id: IDType; title: string };

export type TaskType = { id: IDType; columnId: IDType; content: string };
