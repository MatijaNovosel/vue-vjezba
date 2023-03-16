export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  done: boolean;
  deleted?: boolean;
}

export interface NewTask {
  title: string;
  description: string;
}

export interface TasksState {
  tasks: Task[];
  confirmModal: boolean;
  searchTerm: string;
  editModal: boolean;
  lang: string;
  newTask: NewTask;
  newTaskId: number;
}
