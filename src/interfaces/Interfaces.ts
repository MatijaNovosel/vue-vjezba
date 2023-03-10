export interface Task {
  title: string;
  description: string;
  createdAt: string;
  done: boolean;
  deleted: boolean;
}

export interface TasksState {
  tasks: Task[];

  editModal: boolean;
  editedTask: Task;
  editedTaskIndex: number;
  lang: string;
}
