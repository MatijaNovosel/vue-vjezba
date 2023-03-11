import { defineStore } from "pinia";
import { Task, TasksState } from "./../interfaces/Interfaces";

function updateTaskListData(this: TasksState): void {
  localStorage.setItem("tasks", JSON.stringify(this.tasks));
}

export const useTasksStore = defineStore({
  id: "tasks",
  state: (): TasksState => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    searchTerm: "",
    editModal: false,
    editedTask: {
      title: "",
      description: "",
      createdAt: "",
      done: false,
      deleted: false
    },
    editedTaskIndex: -1,
    lang: "en"
  }),
  actions: {
    addTask() {
      this.editModal = true;
      const now = new Date().toISOString();
      const task = {
        title: "",
        description: "",
        createdAt: now,
        done: false,
        deleted: false
      };
      this.tasks.push(task);
      this.editTask(task);
      updateTaskListData.call(this);
    },

    editTask(task: Task) {
      this.editedTask = task;
      this.editedTaskIndex = this.tasks.indexOf(task);
      this.editModal = true;
      updateTaskListData.call(this);
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
        done: false,
        deleted: false
      };
      this.editedTaskIndex = -1;
      updateTaskListData.call(this);
    },
    deleteTask(task: Task) {
      task.deleted = true;
      updateTaskListData.call(this);
    },
    markAsDone(task: Task) {
      task.done = true;
      updateTaskListData.call(this);
    },
    restoreTask(task: Task) {
      task.deleted = false;
      updateTaskListData.call(this);
    },
    changeLanguage(lang: string) {
      if (this.lang !== lang) {
        this.lang = lang;
      }
    },
    archiveAllActive() {
      if (this.tasks.length > 0) {
        this.tasks.forEach((task) => {
          if (task.done == false) task.deleted = true;
        });
      }
      updateTaskListData.call(this);
    },
    archiveAllDone(): void {
      if (this.tasks.length > 0) {
        this.tasks.forEach((task) => {
          if (task.done == true) task.deleted = true;
        });
      }
      updateTaskListData.call(this);
    },
    filterNotDoneTasks(searchTerm: string): Task[] {
      if (searchTerm == "") {
        return this.notDoneTasks;
      }
      return this.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !task.deleted &&
          !task.done
      );
    },
    filterDeletedTasks(searchTerm: string): Task[] {
      if (!searchTerm) {
        return this.deletedTasks;
      }
      return this.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          task.deleted &&
          !task.done
      );
    },
    filterInactiveTasks(searchTerm: string): Task[] {
      if (!searchTerm) {
        return this.doneTasks;
      }
      return this.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !task.deleted &&
          task.done
      );
    },
    closeEditModal() {
      this.editModal = false;
    },

    currentLanguage() {
      return this.lang;
    }
  },
  getters: {
    notDoneTasks(): Task[] {
      const filtered = this.tasks.filter((task) => !task.done && !task.deleted);
      console.log("filtriran", filtered);
      return filtered;
    },
    deletedTasks(): Task[] {
      return this.tasks.filter((task) => task.deleted);
    },
    doneTasks(): Task[] {
      return this.tasks.filter((task) => task.done && !task.deleted);
    }
  }
});
