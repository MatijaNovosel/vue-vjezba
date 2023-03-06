import { defineStore } from "pinia";

interface Task {
  title: string;
  description: string;
  createdAt: string;
  done: boolean;
}

interface TasksState {
  tasks: Task[];
  doneTasks: Task[];
  deleted: Task[];
  editModal: boolean;
  editedTask: Task;
  editedTaskIndex: number;
  lang: string;
}

export const useTasksStore = defineStore({
  id: "tasks",
  state: (): TasksState => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    doneTasks: JSON.parse(localStorage.getItem("doneTasks") || "[]"),
    deleted: JSON.parse(localStorage.getItem("deleted") || "[]"),
    editModal: false,
    editedTask: { title: "", description: "", createdAt: "", done: false },
    editedTaskIndex: -1,
    lang: "en" // set default language
  }),
  actions: {
    addTask(): void {
      this.editModal = true;
      const now = new Date().toISOString();
      this.tasks.push({
        title: "",
        description: "",
        createdAt: now,
        done: false
      });
      this.editTask(this.tasks.length - 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    editTask(index: number) {
      this.editedTask = this.tasks[index];
      this.editedTaskIndex = index;
      this.editModal = true;
    },
    saveTask() {
      if (this.editedTaskIndex === -1) {
        this.tasks.push(this.editedTask);
      } else {
        this.tasks.splice(this.editedTaskIndex, 1, this.editedTask);
      }
      this.editModal = false;
      this.editedTask = {
        title: "",
        description: "",
        createdAt: "",
        done: false
      };
      this.editedTaskIndex = -1;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(index: number): void {
      console.log("Tasks prije deletanja", this.tasks);
      const deletedTask = this.tasks[index];
      if (deletedTask) {
        this.deleted.push(deletedTask);
      }
      this.tasks.splice(index, 1);
      console.log("Tasks poslije deletanja", this.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("deleted", JSON.stringify(this.deleted));
    },
    markAsDone(index: number): void {
      this.doneTasks.push(this.tasks[index]);
      this.tasks.splice(index, 1);
      localStorage.setItem("doneTasks", JSON.stringify(this.doneTasks));
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    restoreTask(index: number): void {
      this.tasks.push(this.deleted[index]);
      this.deleted.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("deleted", JSON.stringify(this.deleted));
    },
    changeLanguage(lang: string): void {
      if (this.lang !== lang) {
        this.lang = lang;
      }
    },
    archiveAll(): void {
      if (this.tasks.length > 0) {
        this.deleted = this.deleted.concat(this.tasks);
        this.tasks = [];
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("deleted", JSON.stringify(this.deleted));
      }
    },
    archiveDone(): void {
      if (this.doneTasks.length > 0) {
        this.deleted = this.deleted.concat(this.doneTasks);
        this.doneTasks = [];
        localStorage.setItem("doneTasks", JSON.stringify(this.doneTasks));
        localStorage.setItem("deleted", JSON.stringify(this.deleted));
      }
    },
    filterTasks(query: string): void {
      const filteredTasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      this.tasks = filteredTasks;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    closeEditModal() {
      this.editModal = false;
    }
  },
  getters: {
    notDoneTasks(state) {
      return state.tasks.filter((task) => !task.done);
    },
    tasksDone(state) {
      return state.doneTasks;
    },
    currentLanguage(state): string {
      return state.lang;
    }
  }
});
